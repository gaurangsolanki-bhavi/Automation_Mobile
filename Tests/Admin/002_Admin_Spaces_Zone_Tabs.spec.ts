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
let spacesMenuPage: SpacesMenuPage
let zone: string;
let grid_desk_zone: string;
let map_car_zone: string;
let Employee: string;
let wifiCheckingPage: WifiCheckingPage;

test.beforeAll(async ({ sharedPage }) => {
  // Load the global data before running the tests
  reusablePageClass = new ReusablePage(sharedPage);
  reusableActionsClass = new ReusableActions(sharedPage);
  adminloginPage = new AdminLoginPage(sharedPage);
  spacesMenuPage = new SpacesMenuPage(sharedPage)
  wifiCheckingPage = new WifiCheckingPage(sharedPage);
  const user = await reusablePageClass.loginWithExcelAdminUser("AdminUser", ZoneData.ZONE_SET1.PROD);
  zone = user.ZONE;
  grid_desk_zone = user.GRID_DESK_ZONE;
  map_car_zone = user.MAP_CAR_ZONE;
  Employee = user.employee;
  await spacesMenuPage.navigateToZoneAndMapMenu();
});

test.afterAll(async () => {
  await page.close();
  await context.close();
});

test.describe.serial(`Verify Admin Spaces Menu`, () => {

  test(`Test_001: Verify that the admin user can access the "Zones and Maps" submenu and validate the presence of all expected UI elements within it.`, async () => {
    try {
      await spacesMenuPage.zoneAndMapPageElements();
      await spacesMenuPage.verifyingZoneHeader();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_002: Verify Add zone button Popup elements after clicking on it.`, async () => {
    try {
      await spacesMenuPage.validateAddZonePopupElements();
      await spacesMenuPage.validateAddZonePopupToggledOn()
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_003: Test_003: Verify that admin can search for a zone and validate the General tab elements on the Edit Zone Details page`, async () => {
    try {
      await spacesMenuPage.SearchZoneAndVerifyZoneDetails(zone);
      await spacesMenuPage.verifyingSpotHeader();
      await spacesMenuPage.generalSpotHoverText();
      await spacesMenuPage.verifyingGeneralLabels();
      await spacesMenuPage.SpotGeneralTabsElements();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_004: Verify and validate the Display tab elements on the Edit Zone Details page`, async () => {
    try {
      await spacesMenuPage.ZoneDisplayTabsElements();
      await spacesMenuPage.verifyingDisplayLabels();
      await spacesMenuPage.DisplaySpotHoverText();
    } catch (error: any) {
      throw error;
    }
  });
  test(`Test_005: Verify and validate the Reminder tab elements on the Edit Zone Details page`, async () => {
    try {
      await spacesMenuPage.ZoneRemindersTabsElements();
      await spacesMenuPage.verifyingRemindersLabels();
      await spacesMenuPage.RemindersSpotHoverText();
      await spacesMenuPage.verifyingRemindersColumnHeaders();
    } catch (error: any) {
      throw error;
    }
  });
  test(`Test_006: Verify and validate the Credits tab elements on the Edit Zone Details page`, async () => {
    try {
      await spacesMenuPage.ZoneCreditsTabsElements();
      await spacesMenuPage.verifyingCreditsLabels();
      await spacesMenuPage.CreditsSpotHoverText();
    } catch (error: any) {
      throw error;
    }
  });
  test(`Test_007: Verify and validate the Check-in tab elements on the Edit Zone Details page`, async () => {
    try {
      await wifiCheckingPage.NavigateZoneCheckinTAb();
      await spacesMenuPage.selectCheckinOptionIfNotSelectedOnlyOne();
      await spacesMenuPage.ZoneCheckinTabsElements();
      await spacesMenuPage.verifyingCheckinLabels();
      await spacesMenuPage.verifyingCheckinColumnHeaders();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_008: Verify and validate the Advanced settings tab elements on the Edit Zone Details page`, async () => {
    try {
      await wifiCheckingPage.NavigateZoneAdvancedSettingsTAb();
      await spacesMenuPage.ZoneAdvancedSettingsTabsElements();
      await spacesMenuPage.verifyingAdvancedSettingsLabels();
    } catch (error: any) {
      throw error;
    }
  });
  test(`Test_009: Verify and validate the Privacy tab elements on the Edit Zone Details page`, async () => {
    try {
      await wifiCheckingPage.NavigateZoneprivacyTAb();
      await spacesMenuPage.ZonePrivacyTabsElements();
      await spacesMenuPage.PrivacySpotHoverText();
      await spacesMenuPage.verifyingPrivacyLabels();
    } catch (error: any) {
      throw error;
    }
  });




});
