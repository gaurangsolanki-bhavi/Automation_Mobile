import { test, context, page } from "../../../../Utils/GlobalFixture";
import { expect } from "@playwright/test";
import ReusablePage from "../../../../Pages/Member/ReusablePage";
import ReusableActions from "../../../../Actions/ReusableActions";
import AdminLoginPage from "../../../../Pages/Administration/AdminLogin";
import UserSet from "../../../../test-data/JSON/admin_set_test.json"
import ZoneData from "../../../../test-data/JSON/zone_data.json"

let reusablePageClass: ReusablePage;
let reusableActionsClass: ReusableActions;
let adminloginPage: AdminLoginPage;
let zone: string;
let grid_desk_zone: string;
let map_car_zone: string;
let Employee: string;

test.beforeAll(async ({ sharedPage }) => {
  // Load the global data before running the tests
  reusablePageClass = new ReusablePage(sharedPage);
  reusableActionsClass = new ReusableActions(sharedPage);
  adminloginPage = new AdminLoginPage(sharedPage);
  const user = await reusablePageClass.loginWithExcelAdminUser("AdminUser", ZoneData.ZONE_SET1.PROD);
  zone = user.ZONE;
  grid_desk_zone = user.GRID_DESK_ZONE;
  map_car_zone = user.MAP_CAR_ZONE;
  Employee = user.employee;
});

test.afterAll(async () => {
  await page.close();
  await context.close();
});

test.describe.serial(`Verify Admin Login`, () => {

  test(`Test_001: Ensures an admin can view the live dashboard, verify the current date, check filters, view available parking spots, open sidebar, and navigate the admin panel`, async () => {
    try {
      await adminloginPage.selectAdminZone(zone);
      await adminloginPage.verifyCurrentCalendarDate();
      await adminloginPage.isFilterCollapsedAndElementsHiddenOrAbsent();
      await reusablePageClass.printAvailablePArkingSpotsOnAdmin();
      await adminloginPage.validateSpotSidebarAndBookingPopups();
      await adminloginPage.Verifying_Admin_Navigations();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_002: Ensures admin can claim and release a No Map parking spot from the Live Dashboard`, async () => {
    try {
      await adminloginPage.clickOnMenuInsight_LiveView();
      await adminloginPage.selectAdminZone(zone);
      await adminloginPage.bookSpotForUserViaLiveDashboard(Employee);
      await adminloginPage.releaseAllBookedSpotLiveDashboard();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_003:Ensures admin can claim and release a Map parking spot from the Live Dashboard`, async () => {
    try {
      await adminloginPage.clickOnMenuInsight_LiveView();
      await adminloginPage.selectAdminZone(grid_desk_zone);
      await adminloginPage.bookSpotForUserViaLiveDashboard_Map_Layout(Employee);
      await adminloginPage.releaseAllBookedSpotLiveDashboard_Map_Layout();
    } catch (error: any) {
      throw error;
    }
  });
});
