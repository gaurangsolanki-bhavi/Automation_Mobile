import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { createHandleSummary } from '../LoadTest/LoadUtils/summary.js';

// 🔹 Load users JSON (put zoneId + creds in users01.json)
const users = new SharedArray('users', () =>
  JSON.parse(open('./UsersData/usersH051Z.json'))
);

const BASE_URL = 'https://staging.ronspot.ie/api/v5'; // ⚡ v5.1 for booking
const BASE_URL2 = 'https://staging.ronspot.ie/api/v5.1';
const BOOKING_DATE = '2025-09-23'; // future date for booking

export const options = {
  scenarios: {
    user_based_iterations: {
      executor: 'per-vu-iterations',
      vus: users.length,
      iterations: 1,
      maxDuration: '1s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<4000'],
  },
};

export default function () {
  const user = users[(__VU - 1) % users.length];
  if (!user || !user.username) {
    console.warn(`VU ${__VU}: Missing or invalid user data`);
    sleep(1);
    return;
  }

  // 🔹 Login payload
  const loginPayload = JSON.stringify({
    AppVersion: user.APPVERSION || '12.5.0',
    Language: user.LANGUAGE || 'english',
    DeviceID: user.DeviceID || 'k6_device',
    PasswordT: user.PasswordT, // 🔑 use from JSON
    OsVersion: user.OSVERSION || 'Android 12',
    ClientId: '8d76d67e5605ccf0f97a2ac5ac8bc3da',
    PrimaryEmail: user.username,
    ManufactureModel: user.MANUFACTUREMODEL || 'Generic Model',
    PasswordN: user.PasswordN, // 🔑 use from JSON
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

  console.log(`VU ${__VU}✅ : ${user.username} | GUID: ${guid}`);

  check(loginRes, {
    'Login status 200': () => loginRes.status === 200,
    'AccessToken exists': () => accessToken !== undefined,
    'GUID exists': () => guid !== undefined,
  });
if (!accessToken || !guid) {
    console.error(`VU ${__VU}: login failed for ${user.username}`);
    return;
  }

  console.log(`VU ${__VU}✅ Logged in: ${user.username} | GUID: ${guid}`);

  //sleep(1);

  // 🔹 Book multiple zones for this user
  for (let zoneId of user.Zones) {
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

    const bookingRes = http.post(`${BASE_URL2}/MakeBooking_api`, bookingPayload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      tags: { name: 'Booking API' },
    });

    console.log(
      `VU ${__VU}📌 Booking Zone ${zoneId} → ${bookingRes.status}`
    );

    check(bookingRes, {
      'Booking 200': () => bookingRes.status === 200,
    });

    //sleep(0.5); // small pause to mimic real flow
  }
}

// 🔹 Summary handler
export function handleSummary(data) {
  return createHandleSummary('Booking_Load_Test.js', users.length)(data);
}


// To Run Load Scripts
