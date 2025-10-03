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
import InsightsReportsMenuPage from "../../Pages/Administration/InsightsReportsMenu";

let reusablePageClass: ReusablePage;
let reusableActionsClass: ReusableActions;
let adminloginPage: AdminLoginPage;
let spacesMenuPage: SpacesMenuPage;
let usersMenuPage: UsersMenuPage;
let insightsReportsMenuPage: InsightsReportsMenuPage;
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
let Multizone: string;

test.beforeAll(async ({ sharedPage }) => {
  // Load the global data before running the tests
  reusablePageClass = new ReusablePage(sharedPage);
  reusableActionsClass = new ReusableActions(sharedPage);
  adminloginPage = new AdminLoginPage(sharedPage);
  spacesMenuPage = new SpacesMenuPage(sharedPage)
  wifiCheckingPage = new WifiCheckingPage(sharedPage);
  usersMenuPage = new UsersMenuPage(sharedPage);
  insightsReportsMenuPage = new InsightsReportsMenuPage(sharedPage);
  const user = await reusablePageClass.loginWithExcelAdminUser("AdminUser", ZoneData.ZONE_SET1.PROD);
  zone = user.ZONE;
  grid_desk_zone = user.GRID_DESK_ZONE;
  map_car_zone = user.MAP_CAR_ZONE;
  Employee = user.employee;
  desk = user.DESK;
  meeting = user.MEETING;
  RESTUSER = user.RESTUSER;
  userEmail = user.Email;
  AdminEmail = user.AdminEmail;
  Multizone = user.MULTIZONE;
  await insightsReportsMenuPage.navigateToReportsMenu();
});

test.afterAll(async () => {
  await page.close();
  await context.close();
});

test.describe.serial(`Verify Admin Insights Menus and Reports Menus`, () => {

  test(`Test_001: Verify Insights Menu ,Reports Submenu Navigation, Page Elements, Header, and Buttons (Export)`, async () => {
    try {
      await insightsReportsMenuPage.verifyReportsMenuLabels();
      await insightsReportsMenuPage.ExportBookingCancellations(grid_desk_zone);
      await insightsReportsMenuPage.Export_Booking_Cancel_data();
    } catch (error: any) {
      throw error;
    }
  });
  test(`Test_002: Verify Insights Menu ,Export Booking Cancellations 7 to 10 Reports Submenu Navigation, Page Elements, Header, and Buttons (Export)`, async () => {
    try {
      await insightsReportsMenuPage.navigateToReportsMenu();
      await insightsReportsMenuPage.ExportBookingCancellations7_10(Multizone);
      await insightsReportsMenuPage.Export_Booking_Cancel_7_10_data();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_003: Verify Insights Menu ,Export Booking forecast Submenu Navigation, Page Elements, Header, and Buttons (Export)`, async () => {
    try {
      await insightsReportsMenuPage.navigateToReportsMenu();
      await insightsReportsMenuPage.ExportBookingForecast(zone);
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_004: Verify Insights Menu ,Export Credit-free bookings Submenu Navigation, Page Elements, Header, and Buttons (Export)`, async () => {
    try {
      await insightsReportsMenuPage.navigateToReportsMenu();
      await insightsReportsMenuPage.ExportCreditFreeBookings(zone);
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_005: Verify Insights Menu ,Export Emergency roles Reports Submenu Navigation, Page Elements, Header, and Buttons (Export)`, async () => {
    try {
      await insightsReportsMenuPage.navigateToReportsMenu();
      await insightsReportsMenuPage.ExportEmergencyRolesBookings(zone);
      await insightsReportsMenuPage.EmergencyRolesExports();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_006: Verify Insights Menu ,Meeting rooms usage Reports Submenu Navigation, Page Elements, Header, and Buttons (Export)`, async () => {
    try {
      await insightsReportsMenuPage.navigateToReportsMenu();
      await insightsReportsMenuPage.ExportBookingMeetingRoomsUsage(Multizone);
      await insightsReportsMenuPage.Export_RoomUsageExportCSVButtondata();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_007: Verify Insights Menu ,Missed bookings Reports Submenu Navigation, Page Elements, Header, and Buttons (Export)`, async () => {
    try {
      await insightsReportsMenuPage.navigateToReportsMenu();
      await insightsReportsMenuPage.ExportMissedBookings(Multizone);
      await insightsReportsMenuPage.ExportMissedBookingsdata();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_008: Verify Insights Menu ,Occupancy Reports Submenu Navigation, Page Elements, Header, and Buttons (Export)`, async () => {
    try {
      await insightsReportsMenuPage.navigateToReportsMenu();
      await insightsReportsMenuPage.ExportOccupancyReport(Multizone);
      await insightsReportsMenuPage.Occupancyreportdata();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_009: Verify Insights Menu ,Office attendance Submenu Navigation, Page Elements, Header, and Buttons (Export)`, async () => {
    try {
      await insightsReportsMenuPage.navigateToReportsMenu();
      await insightsReportsMenuPage.ExportOfficeAttendanceReport(Multizone);
      await insightsReportsMenuPage.OfficeAttendanceData();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_010: Verify Insights Menu ,Parking violations Submenu Navigation, Page Elements, Header, and Buttons (Export)`, async () => {
    try {
      await insightsReportsMenuPage.navigateToReportsMenu();
      await insightsReportsMenuPage.ExportParkingViolationsReport(Multizone);
      await insightsReportsMenuPage.ParkingViolationsData();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_011: Verify Insights Menu ,Past bookings Submenu Navigation, Page Elements, Header, and Buttons (Export)`, async () => {
    try {
      await insightsReportsMenuPage.navigateToReportsMenu();
      await insightsReportsMenuPage.ExportPastBookingsReport(Multizone);
      await insightsReportsMenuPage.ParkingViolationsData();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_012: Verify Insights Menu ,Past bookings by staff Submenu Navigation, Page Elements, Header, and Buttons (Export)`, async () => {
    try {
      await insightsReportsMenuPage.navigateToReportsMenu();
      await insightsReportsMenuPage.ExportPastBookingsByStaffReport(Multizone);
      await insightsReportsMenuPage.PastBookingsByStaffData();
    } catch (error: any) {
      throw error;
    }
  });

    test(`Test_013: Verify Insights Menu ,Time of booking Submenu Navigation, Page Elements, Header, and Buttons (Export)`, async () => {
    try {
      await insightsReportsMenuPage.navigateToReportsMenu();
      await insightsReportsMenuPage.ExportTimeOfBookingReport(Multizone);
    } catch (error: any) {
      throw error;
    }
  });




});
