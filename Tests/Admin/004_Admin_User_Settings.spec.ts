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

let reusablePageClass: ReusablePage;
let reusableActionsClass: ReusableActions;
let adminloginPage: AdminLoginPage;
let spacesMenuPage: SpacesMenuPage;
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
  await usersMenuPage.navigateToUsersEmployeeMenu();
});

test.afterAll(async () => {
  await page.close();
  await context.close();
});

test.describe.serial(`Verify Admin User Menus and Sub Menus`, () => {

  test(`Test_001: Verify User Menu ,Employee Submenu Navigation, Page Elements, Header, and User Management Buttons (Add, Import, Export)`, async () => {
    try {
      await usersMenuPage.verifyUserEmployeeLabels();
      await usersMenuPage.AddEmployeeButton();
      await usersMenuPage.ExportEmployeesButton(userEmail, AdminEmail);
      await usersMenuPage.ImportEmployeesButton();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_002: Verify User Menu ,Administrators Submenu Navigation, Page Elements, Header, and User Management Buttons (Add, Import, Export)`, async () => {
    try {
      await usersMenuPage.verifyUserAdminLabels();
      await usersMenuPage.verifyAddAdminButtonLabels();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_003: Verify User Menu ,Login methods Submenu Navigation, Page Elements, Header`, async () => {
    try {
      await usersMenuPage.verifyUserLoginMethodsLabels();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_004: Verify User Menu Group Setting Submenu Navigation, Page Elements, Header`, async () => {
    try {
      await usersMenuPage.verifyUserGroupSettingsLabels();
      await usersMenuPage.verifyAddGroupSettings();
      await usersMenuPage.Export_group_data();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_005: Verify User Menu Team permissions Submenu Navigation, Page Elements, Header`, async () => {
    try {
      await usersMenuPage.verifyUserTeamPermissionsLabels();
      await usersMenuPage.AddTeam();
      await usersMenuPage.EditGroupSetting(RESTUSER);
      await usersMenuPage.team_data_delete();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_006: Verify User Menu Emergency roles Submenu Navigation, Page Elements, Header`, async () => {
    try {
      await usersMenuPage.verifyUserEmergencyRolesLabels();
      await usersMenuPage.AddEmergencyRole();
      await usersMenuPage.EditEmergencyRole();
      await usersMenuPage.emergency_role_data_delete();
    } catch (error: any) {
      throw error;
    }
  });



});
