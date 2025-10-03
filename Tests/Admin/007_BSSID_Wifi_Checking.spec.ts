import { test, context, page } from "../../Utils/GlobalFixture";
import { expect } from "@playwright/test";
import ReusablePage from "../../Pages/Member/ReusablePage";
import ReusableActions from "../../Actions/ReusableActions";
import AdminLoginPage from "../../Pages/Administration/AdminLogin";
import UserSet from "../../test-data/JSON/admin_set_test.json"
import ZoneData from "../../test-data/JSON/zone_data.json"
import SpacesMenuPage from "../../Pages/Administration/SpacesMenu"
import WifiCheckingPage from "../../Pages/Administration/WifiChecking"

let reusablePageClass: ReusablePage;
let reusableActionsClass: ReusableActions;
let adminloginPage: AdminLoginPage;
let spacesMenuPage: SpacesMenuPage;
let wifiCheckingPage: WifiCheckingPage;
let zone: string;
let grid_desk_zone: string;
let map_car_zone: string;
let Employee: string;
let intigration_name: string;
let SSID: string;
let SSID2: string;
let BSSID: string;
let BSSID2: string;
let Mapping_Name: string;
let Mapping_Name_2: string;

test.beforeAll(async ({ sharedPage }) => {
  // Load the global data before running the tests
  reusablePageClass = new ReusablePage(sharedPage);
  reusableActionsClass = new ReusableActions(sharedPage);
  adminloginPage = new AdminLoginPage(sharedPage);
  spacesMenuPage = new SpacesMenuPage(sharedPage)
  wifiCheckingPage = new WifiCheckingPage(sharedPage);
  const user = await reusablePageClass.loginWithExcelAdminUser("WifiChecking", ZoneData.ZONE_SET1.PROD);
  zone = user.ZONE;
  grid_desk_zone = user.GRID_DESK_ZONE;
  map_car_zone = user.MAP_CAR_ZONE;
  Employee = user.employee;
  intigration_name = user.Integration_name;
  SSID = user.SSID;
  SSID2 = user.SSID2;
  BSSID = user.BSSID;
  BSSID2 = user.BSSID2;
  Mapping_Name = user.Mapping_Name;
  Mapping_Name_2 = user.Mapping_Name_2;

  await wifiCheckingPage.navigateToAccountAndIntegrationsMenu();
});

test.afterAll(async () => {
  await page.close();
  await context.close();
});

test.describe.serial(`Verify Wifi Checking BSSID Menu`, () => {

  test(`Test_001: Admin user should access "WiFi Checking" submenu, validate UI elements, handle blank integration error, create a valid WiFi integration, and verify it via search`, async () => {
    try {
      await wifiCheckingPage.deleteIntegrationIfAvailableAll();
      await wifiCheckingPage.verifyingIntegration();
      await wifiCheckingPage.validateWifiButtonElements(intigration_name);
    } catch (error: any) {
      throw error;
    }
  });


  test(`Test_002: Verify that a new Wi-Fi integration mapping can be created successfully with valid Mapping Name, Zone, and SSID.`, async () => {
    try {
      await wifiCheckingPage.Create_Mapping_With_BSSID();
      await wifiCheckingPage.wifiMappingScreenBSSID(Mapping_Name, Mapping_Name_2, map_car_zone, BSSID);
      await wifiCheckingPage.Checking_Mapping_LowerCase_BSSID(Mapping_Name, zone, BSSID, map_car_zone, BSSID2);
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_003: Verify Add zone button Popup elements after clicking on it.`, async () => {
    try {
      await wifiCheckingPage.NavigateZoneCheckWfifichecking();
      await spacesMenuPage.SearchZoneAndVerifyZoneDetails(map_car_zone);
      await wifiCheckingPage.NavigateZoneCheckinTAb();
      await wifiCheckingPage.selectCheckinOptionIfNotSelected();
    } catch (error: any) {
      throw error;
    }
  });
});
