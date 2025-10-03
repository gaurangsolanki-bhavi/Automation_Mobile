import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { createHandleSummary } from '../LoadTest/LoadUtils/summary.js';

const users = new SharedArray('users', () => JSON.parse(open('./UsersData/users05.json')));

const BASE_URL = 'https://staging.ronspot.ie/api/v4';

export const options = {
    scenarios: {
        user_based_iterations: {
            executor: 'per-vu-iterations',
            vus: users.length,
            iterations: 1,
            maxDuration: '5s',
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

    console.log(`VU ${__VU} logging in with user: ${user.username}`);

    const loginPayload = JSON.stringify({
        AppVersion: user.APPVERSION || '12.5.0',
        Language: user.LANGUAGE || 'english',
        DeviceID: user.DeviceID || 'k6_device',
        PasswordT: "87f63909c0c85fefc712cb53cd63807b",
        OsVersion: user.OSVERSION || "Android 12",
        ClientId: "8d76d67e5605ccf0f97a2ac5ac8bc3da",
        PrimaryEmail: user.username,
        ManufactureModel: user.MANUFACTUREMODEL || 'Generic Model',
        PasswordN: "fa356f259eb5e60ba777eae026393eb66e32ecf880424089ade9dbe6b419461822f8c1822de1a24bb7fbfb335157a683203afc5e81129696fb3f98f030892ea8",
    });

    const loginRes = http.post(`${BASE_URL}/User_login_api`, loginPayload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { name: 'Login API' }
    });

    let accessToken, guid, refreshToken;

    try {
        const body = loginRes.json();
        accessToken = body?.Data?.Records?.AccessToken;
        guid = body?.Data?.Records?.guid;
        refreshToken = body?.Data?.Records?.RefreshToken;

        //console.log(`VU ${__VU} ✅ AccessToken: ${accessToken || 'Not Found'}`);
        console.log(`VU ${__VU} ✅ GUID: ${guid || 'Not Found'}`);
        //console.log(`VU ${__VU} ✅ RefreshToken: ${refreshToken || 'Not Found'}`);
    } catch (e) {
        console.error(`VU ${__VU} ❌ JSON parsing failed: ${e.message}`);
    }

    check(loginRes, {
        'Login: status is 200': () => loginRes.status === 200,
        'Login: AccessToken exists': () => accessToken !== undefined,
        'Login: GUID exists': () => guid !== undefined,
    });

    // ✅ Call ZoneList_api with extracted GUID
    if (guid) {
        const zoneListPayload = JSON.stringify({
            AppVersion: user.APPVERSION || '12.5.0',
            SearchTeamID: "",
            Language: user.LANGUAGE || 'english',
            DeviceID: user.DeviceID || 'k6_device',
            OsVersion: user.OSVERSION || "Android 12",
            GuID: guid,
            ManufactureModel: user.MANUFACTUREMODEL || 'Generic Model',
            TeamID: ""
        });

        const zoneListRes = http.post(`${BASE_URL}/CarParkList_api`, zoneListPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            tags: { name: 'ZoneList API' }
        });

        const zoneCheck = check(zoneListRes, {
            'ZoneList: status is 200': () => zoneListRes.status === 200,
            'ZoneList: response contains zones': () => {
                try {
                    const zoneBody = zoneListRes.json();
                    return Array.isArray(zoneBody?.Data?.Records) && zoneBody.Data.Records.length > 0;
                } catch (e) {
                    console.error(`VU ${__VU} ❌ ZoneList JSON parse failed: ${e.message}`);
                    return false;
                }

            }

        });

        if (zoneCheck) {
            //console.log(`VU ${__VU} ✅ ZoneList response: ${zoneListRes.body}`);
        }


        sleep(1);
    }
}
export function handleSummary(data) {
    return createHandleSummary('List_Zone_Load_Test.js', users.length)(data);
}

