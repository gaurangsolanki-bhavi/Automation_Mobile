import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { createHandleSummary } from '../LoadTest/LoadUtils/summary.js';

const users = new SharedArray('users', () => JSON.parse(open('./UsersData/users10.json')));


const BASE_URL = 'https://staging.ronspot.ie/api/v4';

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
        http_req_duration: ['p(95)<10000'],
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
        console.error(`VU ${__VU} ❌ JSON parsing failed for Login API: ${e.message}`);
    }

    check(loginRes, {
        '<<------------------API:01--User_login_api----------->>': () => loginRes.status === 200,
        'Login: status is 200': () => loginRes.status === 200,
        'Login: AccessToken exists': () => accessToken !== undefined,
        'Login: GUID exists': () => guid !== undefined,
    });

    // Only proceed if GUID and AccessToken are successfully extracted
    if (!guid || !accessToken) {
        console.error(`VU ${__VU} ❌ Login failed, skipping subsequent APIs.`);
        sleep(1);
        return;
    }

    // ✅ Call CarParkList_api with extracted GUID
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
        tags: { name: 'CarParkList API' } // Corrected tag name
    });

    let defaultZoneId = null;
    let zoneBody;

    try {
        zoneBody = zoneListRes.json();
        const records = zoneBody?.Data?.Records || [];
        const defaultZone = records.find(r => r.DefaultID === "1" || r.DefaultID === 1); // string or number
        if (defaultZone) {
            defaultZoneId = defaultZone.id;
            console.log(`VU ${__VU} ✅ Default zone ID: ${defaultZoneId}`);
        } else {
            console.warn(`VU ${__VU} ⚠️ No zone found with DefaultID="1" in CarParkList_api response.`);
        }
    } catch (e) {
        console.error(`VU ${__VU} ❌ Failed to parse CarParkList_api JSON: ${e.message}`);
    }

    check(zoneListRes, {
        '<<------------------API:02--CarParkList_api----------->>': () => zoneListRes.status === 200,
        'CarParkList: status is 200': () => zoneListRes.status === 200,
        'CarParkList: response contains records': () => Array.isArray(zoneBody?.Data?.Records), // Check if it's an array
        'CarParkList: response has default zone ID': () => defaultZoneId !== null, // Check if defaultZoneId was found
    });

    // Only proceed if defaultZoneId is successfully extracted
    if (!defaultZoneId) {
        console.error(`VU ${__VU} ❌ No default zone ID found, skipping Calendar and subsequent APIs.`);
        sleep(1);
        return;
    }

    // ✅ Call Calendar_api using extracted data
    const calendarPayload = JSON.stringify({
        SearchTeamID: user.SearchTeamID || "",
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
        month: "6", // Current month is 5 (May), so 6 for June 2025
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

    let currentWeekStartDate = '';
    let carParkID = '';
    let extractedGuid = ''; // Renamed to avoid confusion with top-level guid
    let vehicleRegistrationID = '';
    let fuelId = '';
    let sizeId = '';
    let calendarResponseBody; // Store the parsed body for easier access

    try {
        calendarResponseBody = calendarRes.json();
        // Extract the desired values only if Data.Records exists
        if (calendarResponseBody && calendarResponseBody.Data && calendarResponseBody.Data.Records) {
            currentWeekStartDate = calendarResponseBody.Data.Records.currentWeekStartDate;
            carParkID = calendarResponseBody.Data.Records.CarParkID;
            extractedGuid = calendarResponseBody.Data.Records.guid;

            // Extracting from the first item in the 'Schedule' array (if it exists)
            if (calendarResponseBody.Data.Records.Schedule && calendarResponseBody.Data.Records.Schedule.length > 0) {
                const firstScheduleItem = calendarResponseBody.Data.Records.Schedule[0];
                if (firstScheduleItem.vehicleTypeInfo && firstScheduleItem.vehicleTypeInfo.length > 0) {
                    const firstVehicleTypeInfo = firstScheduleItem.vehicleTypeInfo[0];
                    vehicleRegistrationID = firstVehicleTypeInfo.VehicleRegistrationID;
                    fuelId = firstVehicleTypeInfo.fuel_id;
                    sizeId = firstVehicleTypeInfo.size_id;
                }
            }

            // Print the extracted values
            console.log(`\n`);
            console.log(`VU ${__VU} Extracted currentWeekStartDate: ${currentWeekStartDate || 'Not Found'}`);
            console.log(`VU ${__VU} Extracted CarParkID: ${carParkID || 'Not Found'}`);
            console.log(`VU ${__VU} Extracted GUID (from Calendar): ${extractedGuid || 'Not Found'}`);
            console.log(`VU ${__VU} Extracted VehicleRegistrationID: ${vehicleRegistrationID || 'Not Found'}`);
            console.log(`VU ${__VU} Extracted Fuel ID: ${fuelId || 'Not Found'}`);
            console.log(`VU ${__VU} Extracted Size ID: ${sizeId || 'Not Found'}`);

        } else {
            console.error(`VU ${__VU} ❌ Calendar API response did not contain expected Data.Records structure.`);
        }
    } catch (e) {
        console.error(`VU ${__VU} ❌ Failed to parse Calendar API response body: ${e.message}`);
    }

    check(calendarRes, {
        '<<------------------API:03--Calendar_api----------->>': () => calendarRes.status === 200,
        'Calendar API: status is 200': () => calendarRes.status === 200,
        'Calendar API: currentWeekStartDate is not empty': () => currentWeekStartDate !== '',
        'Calendar API: carParkID is extracted': () => carParkID !== '',
        'Calendar API: VehicleRegistrationID is extracted': () => vehicleRegistrationID !== '',
        'Calendar API: fuel_id is extracted': () => fuelId !== '',
        'Calendar API: size_id is extracted': () => sizeId !== '',
    });

    // Only proceed if critical data for ClaimParkingSpot is available
    if (!currentWeekStartDate || !carParkID || !extractedGuid) {
        console.error(`VU ${__VU} ❌ Missing required data (currentWeekStartDate, CarParkID, or GUID from Calendar API) for ClaimParkingSpot_api. Skipping call.`);
        sleep(1);
        return;
    }

    // --- 2. Call ClaimParkingSpot_api using extracted data ---
    const claimDate = currentWeekStartDate; // Using the extracted date directly

    const claimPayload = JSON.stringify({
        Tags: "",
        ManufactureModel: user.MANUFACTUREMODEL || "Generic Model",
        Language: user.LANGUAGE || "english",
        FirstName: "",
        OsVersion: user.OSVERSION || "Android 12",
        Date: claimDate,
        AppVersion: user.APPVERSION || "12.5.0",
        GuID: extractedGuid, // Use the extracted GUID from Calendar API
        EmailAddress: "",
        NationalId: "",
        ShareableType: "",
        LastName: "",
        isGuest: 0,
        VehicleTypeId: sizeId,
        CarRegistrationNumber: vehicleRegistrationID,
        VehicalType: sizeId, // Often same as VehicleTypeId
        CarParkID: carParkID, // Use the extracted CarParkID from Calendar API
        SearchTeamID: user.SearchTeamID || "",
        TeamLeaderID: user.TeamLeaderID || "",
        FuleType: fuelId,
        DeviceID: user.DeviceID || "k6_device",
        AccessibleType: ""
    });

    //console.log(`VU ${__VU} ➡️ Calling ClaimParkingSpot_api with payload: ${claimPayload}`);

    const claimRes = http.post(`${BASE_URL}/ClaimParkingSpot_api`, claimPayload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        tags: { name: 'ClaimParkingSpot API' }
    });

    let QueueProcessId1 = null; // Initialize to null for explicit check
    let claimResponseBody;

    try {
        claimResponseBody = claimRes.json();
        // Check if the response indicates success and extract QueueProcessId
        if (claimResponseBody && claimResponseBody.Data && claimResponseBody.Data.Message === "Success") {
            //console.error(`VU ${__VU} 🔍 Raw response body: ${claimRes.body}`);
            QueueProcessId1 = claimResponseBody.Data.Records.QueueProcessId;
            console.log(`VU ${__VU} 🅿️ ClaimParkingSpot - QueueProcessId: ${QueueProcessId1}`);
        } else {
            console.error(`VU ${__VU} ❌ ClaimParkingSpot API response was not successful or missing QueueProcessId. Body: ${JSON.stringify(claimResponseBody)}`);
        }
    } catch (e) {
        console.error(`VU ${__VU} ❌ Failed to parse ClaimParkingSpot API response body: ${e.message}`);
    }


    check(claimRes, {
        '<<------------------API:04--ClaimParkingSpot_api----------->>': (r) => r.status === 200,
        'ClaimParkingSpot API: status is 200': (r) => r.status === 200,
        'ClaimParkingSpot API: Success message': (r) => claimResponseBody && claimResponseBody.Data && claimResponseBody.Data.Message === "Success",
        'ClaimParkingSpot API: QueueProcessId is extracted': () => QueueProcessId1 !== null, // Check if it was successfully extracted
    });

    // Only proceed if QueueProcessId1 is successfully extracted
    if (!QueueProcessId1) {
        console.error(`VU ${__VU} ❌ QueueProcessId not found for ClaimParkingSpot_api, skipping GetQueueParkingSpot.`);
        sleep(1);
        return;
    }

    // --- 3. Call GetQueueParkingSpot using extracted data ---
    const getQueuePayload = JSON.stringify({
        GuID: extractedGuid, // Use the extracted GUID here
        CarParkID: carParkID, // Use the extracted CarParkID here
        Language: user.LANGUAGE || "english",
        OsVersion: user.OSVERSION || "Android 12",
        VehicleTypeId: sizeId,
        ManufactureModel: user.MANUFACTUREMODEL || "Generic Model",
        AppVersion: user.APPVERSION || "12.5.0",
        DeviceID: user.DeviceID || "k6_device",
        QueueID: QueueProcessId1, // Use the extracted QueueProcessId1 here
        SearchTeamID: user.SearchTeamID || "",
        isGuest: 0,

    });

    sleep(5);
    const getQueueRes = http.post(`${BASE_URL}/ClaimParkingSpot_api/GetQueueParkingSpot`, getQueuePayload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        tags: { name: '/ClaimParkingSpot_api/GetQueueParkingSpot' }
    });

    let SpotID = ''; // Initialize SpotID

    // Parse the response body for GetQueueParkingSpot
    let getQueueResponseBody;
    try {
        getQueueResponseBody = getQueueRes.json();
        if (getQueueResponseBody && getQueueResponseBody.Data && getQueueResponseBody.Data.Records) {
            SpotID = getQueueResponseBody.Data.Records.SpotID; // Assuming SpotID is directly under Records
            console.log(`VU ${__VU} ✅ GetQueueParkingSpot - SpotID: ${SpotID || 'Not Found'}`);
        } else {
            console.warn(`VU ${__VU} ⚠️ GetQueueParkingSpot response did not contain expected Data.Records structure.`);
        }
    } catch (e) {
        console.error(`VU ${__VU} ❌ Failed to parse GetQueueParkingSpot API response body: ${e.message}`);
    }


    check(getQueueRes, {
        '<<------------------API:05--GetQueueParkingSpot_api----------->>': (r) => r.status === 200,
        'GetQueueParkingSpot API: status is 200': (r) => r.status === 200,
        'GetQueueParkingSpot API: response has SpotID': () => SpotID !== '',
        'GetQueueParkingSpot API: Success message': () => getQueueResponseBody && getQueueResponseBody.Data && getQueueResponseBody.Data.Message === "Success"
    });
    //console.log(`\nVU ${__VU} 📅 GetQueueParkingSpot response body: ${getQueueRes.body}`);
    sleep(1);
}

export function handleSummary(data) {
    return createHandleSummary('ClaimSpot_Load_Test.js', users.length)(data);
}

//npm run runload -- Calendar_Load_Test.js