import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { createHandleSummary } from '../LoadTest/LoadUtils/summary.js'; // ✅ if in same folder
// Load users
const users = new SharedArray('users', () => JSON.parse(open('./UsersData/users10.json')));;

const BASE_URL = 'https://staging.ronspot.ie/api/v5';
//const BASE_URL = 'https://staging.ronspot.ie/prod-arrora-db/api/v4'; 

export const options = {
    scenarios: {
        user_based_iterations: {
            executor: 'per-vu-iterations',
            vus: users.length,
            iterations: 1,
            maxDuration: '1m',
        },
    },
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<60000'],
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
            // console.log(`VU ${__VU} ✅ ZoneList response: ${zoneListRes.body}`);
        }

        // ✅ Extract ID where DefaultID == "1"
        let defaultZoneId = null;
        try {
            const zoneBody = zoneListRes.json();
            const records = zoneBody?.Data?.Records || [];
            const defaultZone = records.find(r => r.DefaultID === "1" || r.DefaultID === 1); // string or number
            if (defaultZone) {
                defaultZoneId = defaultZone.id;
                console.log(`VU ${__VU} ✅ Default zone ID: ${defaultZoneId}`);
            } else {
                console.error('VU ${__VU} ❌ No zone found with DefaultID="1"');
            }
        } catch (e) {
            console.error(`VU ${__VU} ❌ Failed to parse zone list JSON: ${e}`);
        }

        // Example use in next API call
        if (defaultZoneId) {
            const calendarPayload = JSON.stringify({
                SearchTeamID: user.SearchTeamID || "", // Optional: fill based on user or static
                GuID: guid,
                AppVersion: user.APPVERSION || "12.5.0",
                DeviceID: user.DeviceID || "k6_device",
                OsVersion: user.OSVERSION || "Android 12",
                ManufactureModel: user.MANUFACTUREMODEL || "Generic Model",
                Language: user.LANGUAGE || "english",
                Facility: "",
                ZoneID: defaultZoneId,
                filterByaccessibleCategory: "",
                StartTime: "",
                month: "6",
                EndTime: "",
                filterByshareableCategory: "",
                isFromAppHome: "0",
                Tags: "",
                year: "2025",
                filterByfuelCategory: "",
                isGuest: "0",
                VehicleType: "",
                StartDate: ""
            });

            const calendarRes = http.post(`${BASE_URL}/Calendar_api`, calendarPayload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                tags: { name: 'Calendar API' }
            });
            // --- Data extraction and logging should happen here, after the request ---
            // Parse the JSON response body
            let currentWeekStartDate = '';
            let carParkID = '';
            let extractedGuid = '';
            let vehicleRegistrationID = '';
            let fuelId = '';
            let sizeId = '';


            try {
                const responseBody = calendarRes.json(); // k6's .json() method directly parses the body

                // Extract the desired values only if Data.Records exists
                if (responseBody && responseBody.Data && responseBody.Data.Records) {
                    currentWeekStartDate = responseBody.Data.Records.currentWeekStartDate;
                    carParkID = responseBody.Data.Records.CarParkID;
                    extractedGuid = responseBody.Data.Records.guid;

                    // Extracting from the first item in the 'Schedule' array (if it exists)
                    if (responseBody.Data.Records.Schedule && responseBody.Data.Records.Schedule.length > 0) {
                        const firstScheduleItem = responseBody.Data.Records.Schedule[0];
                        if (firstScheduleItem.vehicleTypeInfo && firstScheduleItem.vehicleTypeInfo.length > 0) {
                            const firstVehicleTypeInfo = firstScheduleItem.vehicleTypeInfo[0];
                            vehicleRegistrationID = firstVehicleTypeInfo.VehicleRegistrationID;
                            fuelId = firstVehicleTypeInfo.fuel_id;
                            sizeId = firstVehicleTypeInfo.size_id;
                        }
                    }

                    // Print the extracted values
                    //console.log(`\n`);
                    console.log(`\nVU ${__VU} 📅 Calendar response body: ${calendarRes.body}`);
                    // console.log(`VU ${__VU} Extracted currentWeekStartDate: ${currentWeekStartDate}`);
                    // console.log(`VU ${__VU} Extracted CarParkID: ${carParkID}`);
                    // console.log(`VU ${__VU} Extracted GUID: ${extractedGuid}`);
                    console.log(`VU ${__VU} Extracted VehicleRegistrationID: ${vehicleRegistrationID || 'Not Found'}`);
                    // console.log(`VU ${__VU} Extracted Fuel ID: ${fuelId || 'Not Found'}`);
                    // console.log(`VU ${__VU} Extracted Size ID: ${sizeId || 'Not Found'}`);

                } else {
                    console.error(`VU ${__VU} ❌ Calendar API response did not contain expected Data.Records structure.`);
                }
            } catch (e) {
                console.error(`VU ${__VU} ❌ Failed to parse Calendar API response body: ${e.message}`);
            }
            // --- End of data extraction and logging ---

            check(calendarRes, {
                'Calendar API: status is 200': () => calendarRes.status === 200,
                // 'Calendar API: currentWeekStartDate is not empty': () => currentWeekStartDate !== '',
                // 'Calendar API: carParkID is extracted': () => carParkID !== '',
                'Calendar API: VehicleRegistrationID is extracted': () => vehicleRegistrationID !== '',
                // 'Calendar API: fuel_id is extracted': () => fuelId !== '',
                // 'Calendar API: size_id is extracted': () => sizeId !== '',
            });
        }
    }

    sleep(1);
}

export function handleSummary(data) {
    return createHandleSummary('Calendar_Load_Test.js', users.length)(data);
}
