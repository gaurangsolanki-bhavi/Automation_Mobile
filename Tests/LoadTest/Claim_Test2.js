import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';
import { createHandleSummary } from '../LoadTest/LoadUtils/summary.js';

// 🔹 Load users JSON (put zoneId + creds in usersH05.json)
const users = new SharedArray('users', () =>
  JSON.parse(open('./UsersData/usersH05.json'))
);

const BASE_URL = 'https://staging.ronspot.ie/api/v5';   // login
const BASE_URL2 = 'https://staging.ronspot.ie/api/v5.1'; // booking
const BOOKING_DATE = '2025-09-26'; // centralized future date

export const options = {
  scenarios: {
    user_based_iterations: {
      executor: 'per-vu-iterations',
      vus: users.length,   // one VU per user
      iterations: 1,       // each user runs once
      maxDuration: '500ms' // 🚀 tighter runtime
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<3000'], // faster SLA
  },
};

export default function () {
  const user = users[(__VU - 1) % users.length];
  if (!user || !user.username) {
    console.warn(`VU ${__VU}: Missing or invalid user data`);
    return;
  }

  // 🔹 Login payload
  const loginPayload = JSON.stringify({
    AppVersion: user.APPVERSION || '12.5.0',
    Language: user.LANGUAGE || 'english',
    DeviceID: user.DeviceID || 'k6_device',
    PasswordT: user.PasswordT,
    OsVersion: user.OSVERSION || 'Android 12',
    ClientId: '8d76d67e5605ccf0f97a2ac5ac8bc3da',
    PrimaryEmail: user.username,
    ManufactureModel: user.MANUFACTUREMODEL || 'Generic Model',
    PasswordN: user.PasswordN,
  });

  const loginRes = http.post(`${BASE_URL}/User_login_api`, loginPayload, {
    headers: { 'Content-Type': 'application/json' },
    tags: { name: 'Login API' },
  });

  let accessToken, guid;
  try {
    const body = loginRes.json();
    accessToken = body?.Data?.Records?.AccessToken;
    guid = body?.Data?.Records?.guid;
  } catch (e) {
    console.error(`VU ${__VU} ❌ JSON parsing failed: ${e.message}`);
  }

  check(loginRes, {
    'Login status 200': () => loginRes.status === 200,
    'AccessToken exists': () => !!accessToken,
    'GUID exists': () => !!guid,
  });

  if (!accessToken || !guid) {
    console.error(`VU ${__VU}: login failed for ${user.username}`);
    return;
  }

  console.log(`VU ${__VU}✅ Logged in: ${user.username} | GUID: ${guid}`);

  // 🔹 Prepare batch booking requests
  const requests = user.Zones.map(zoneId => {
    const bookingPayload = JSON.stringify({
      GuId: guid,
      BookingDate: BOOKING_DATE,
      ZoneId: zoneId,
      Tags: '',
      TeamLeaderGuId: guid,
      TeamMemberGuId: '',
      IsGuest: 0,
      VehicleTypeId: '2',
      VehicleFuelId: '1',
      VehicleAccessibleId: '0',
      VehicleShareableId: '',
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      CarRegistrationNumber: '',
      NationalId: '',
      AppVersion: user.APPVERSION || '12.5.0',
      DeviceId: user.DeviceID || 'k6_device',
      OsVersion: user.OSVERSION || 'Android 12',
      ManufactureModel: user.MANUFACTUREMODEL || 'Generic Model',
      Language: user.LANGUAGE || 'english',
      FireStoreId: 'wretesddfgg',
    });

    return {
      method: 'POST',
      url: `${BASE_URL2}/MakeBooking_api`,
      body: bookingPayload,
      params: {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        tags: { name: 'Booking API' },
      },
    };
  });

  // 🚀 Fire all zone bookings in parallel
  const responses = http.batch(requests);

  responses.forEach((res, i) => {
    console.log(
      `VU ${__VU}📌 Booking Zone ${user.Zones[i]} → ${res.status}`
    );
    check(res, { 'Booking 200': () => res.status === 200 });
  });
}

// 🔹 Summary handler
export function handleSummary(data) {
  return createHandleSummary('Booking_Load_Test.js', users.length)(data);
}
