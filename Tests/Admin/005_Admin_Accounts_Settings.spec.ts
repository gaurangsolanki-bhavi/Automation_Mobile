import { test, context, page } from "../../Utils/GlobalFixture";
import { expect } from "@playwright/test";
import ReusablePage from "../../Pages/Member/ReusablePage";
import ReusableActions from "../../Actions/ReusableActions";
import AdminLoginPage from "../../Pages/Administration/AdminLogin";
import UserSet from "../../test-data/JSON/admin_set_test.json"
import ZoneData from "../../test-data/JSON/zone_data.json"
import SpacesMenuPage from "../../Pages/Administration/SpacesMenu"
import WifiCheckingPage from "../../Pages/Administration/WifiChecking"
import UsersMenuPage from "../../Pages/Administration/UsersMenu"
import AccountsMenuPage from "../../Pages/Administration/AccountsMenu"

let reusablePageClass: ReusablePage;
let reusableActionsClass: ReusableActions;
let adminloginPage: AdminLoginPage;
let spacesMenuPage: SpacesMenuPage;
let accountsMenuPage: AccountsMenuPage;
let usersMenuPage: UsersMenuPage;
let zone: string;
let grid_desk_zone: string;
let map_car_zone: string;
let Employee: string;
let wifiCheckingPage: WifiCheckingPage;
let desk: string;
let meeting: string;
let RESTUSER: string;
let userEmail: string;
let AdminEmail: string;

test.beforeAll(async ({ sharedPage }) => {
  // Load the global data before running the tests
  reusablePageClass = new ReusablePage(sharedPage);
  reusableActionsClass = new ReusableActions(sharedPage);
  adminloginPage = new AdminLoginPage(sharedPage);
  spacesMenuPage = new SpacesMenuPage(sharedPage)
  wifiCheckingPage = new WifiCheckingPage(sharedPage);
  usersMenuPage = new UsersMenuPage(sharedPage);
  accountsMenuPage = new AccountsMenuPage(sharedPage);
  const ENV = (process.env.ENV || 'STAGE') as keyof typeof ZoneData.ZONE_SET1;
  const user = await reusablePageClass.loginWithExcelAdminUser("AdminUser", ZoneData.ZONE_SET1[ENV]);
  zone = user.ZONE;
  grid_desk_zone = user.GRID_DESK_ZONE;
  map_car_zone = user.MAP_CAR_ZONE;
  Employee = user.employee;
  desk = user.DESK;
  meeting = user.MEETING;
  RESTUSER = user.RESTUSER;
  userEmail = user.Email;
  AdminEmail = user.AdminEmail;
  await accountsMenuPage.navigateToAccountGeneralSettingsMenu();
});

test.afterAll(async () => {
  await page.close();
  await context.close();
});

test.describe.serial(`Verify Admin Account Menus and Sub Menus`, () => {

  test(`Test_001: Verify Account Menu ,General settings Submenu,Company Settings Tab Navigation, Page Elements, Header, and Elements`, async () => {
    try {
      await accountsMenuPage.verifyAccountGeneralSettingsLabels();
      await accountsMenuPage.verifyCompanySettings();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_002: Verify Account Menu ,General settings Submenu,Employee settings Tab Navigation, Page Elements, Header, and User Management Buttons (Add, Import, Export)`, async () => {
    try {
      await accountsMenuPage.verifyAccountGeneralSettingsEmployeeSettingsLabels();
      await accountsMenuPage.verifyEmployeeSettings();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_003: Verify Account Menu ,General settings Submenu,Multi-zone settings Tab Navigation, Page Elements, Header, and Elements`, async () => {
    try {
      await accountsMenuPage.verifyAccountGeneralSettingsMultiZoneSettingsLabels();
      await accountsMenuPage.verifyMultiZoneSettings();
      await accountsMenuPage.verifyAndDeleteGroupZone();
    } catch (error: any) {
      throw error;
    }
  });
  test(`Test_004: Verify Account Menu ,Admin alerts Submenu Navigation, Page Elements, Header, and Elements`, async () => {
    try {
      await accountsMenuPage.verifyAccountAdminAlertsLabels();
      await accountsMenuPage.addAdminAlerts(userEmail);
      await accountsMenuPage.verifyAddedAdminAlert(userEmail);
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_005: Verify Account Menu ,Pre-booking questions Submenu Navigation, Page Elements, Header, and Elements`, async () => {
    try {
      await accountsMenuPage.verifyAccountPreBookingQuestionsLabels();
      await accountsMenuPage.verifyAddPreBookingQuestionsButton();
      await accountsMenuPage.EditPreBookingQuestions();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_006: Verify Account Menu ,Post-booking questions Submenu Navigation, Page Elements, Header, and Elements`, async () => {
    try {
      await accountsMenuPage.verifyAccountPostBookingQuestionsLabels();
      await accountsMenuPage.verifyAddPostBookingQuestionsButton();
      await accountsMenuPage.EditPostBookingQuestions();
    } catch (error: any) {
      throw error;
    }
  });

});
