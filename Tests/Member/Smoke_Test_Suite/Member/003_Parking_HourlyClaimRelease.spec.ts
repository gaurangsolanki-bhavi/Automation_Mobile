import { test, context, page } from "../../../../Utils/GlobalFixture";
import { expect } from "@playwright/test";
import ReusablePage from "../../../../Pages/Member/ReusablePage"
import ReusableActions from "../../../../Actions/ReusableActions";
import UserSet from "../../../../test-data/JSON/admin_set_test.json"
import ZoneData from "../../../../test-data/JSON/zone_data.json"
import GroupOnePage from "../../../../Pages/Member/GroupOne";
import Memberdashboardpage from "../../../../Pages/Member/MemberDashboardPage";
import ParkingBookingPage from "../../../../Pages/Member/ParkingBookingPage";

let reusablePageClass: ReusablePage;
let reusableActionsClass: ReusableActions;
let groupOnePage: GroupOnePage;
let memberdashboardpage: Memberdashboardpage;
let parkingBookingPage: ParkingBookingPage;
let zone: string;
let grid_desk_zone: string;
let map_car_zone: string;


test.beforeAll(async ({ sharedPage }) => {
  reusablePageClass = new ReusablePage(sharedPage);
  reusableActionsClass = new ReusableActions(sharedPage);
  groupOnePage = new GroupOnePage(sharedPage);
  memberdashboardpage = new Memberdashboardpage(sharedPage);
  parkingBookingPage = new ParkingBookingPage(sharedPage);
  const user = await reusablePageClass.loginWithExcelUser("HourlyParking", ZoneData.ZONE_SET1.PROD);

  zone = user.ZONE;
  grid_desk_zone = user.GRID_DESK_ZONE;
  map_car_zone = user.MAP_CAR_ZONE;

});

test.afterAll(async () => {

  await page.close();
  await context.close();
});

test.describe(`Verify Only Parking Hourly Claim Release Parking Spot`, () => {


  test(`Test_001: Ensures only hourly popup elements are displayed on the map layout and a member can claim and release a parking spot on the current day`, async () => {
    try {
      await reusablePageClass.checkAndAddVehicle();
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(zone);
      await memberdashboardpage.verifyMemberDashboardElemnts();
      await parkingBookingPage.hourlybookSpotCurruntDayFromCalendarVerifyingWithPopup();
      await reusablePageClass.releaseAlHourlyBookedSpots();
    } catch (error: any) {
      throw error;
    }
  });
  test(`Test_002: Ensures only hourly popup elements are displayed on the map layout and a member can claim, release a parking spot, and perform a violation on the current day`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(zone);
      await parkingBookingPage.hourlybookSpotCurruntDayFromCalendar();
      await parkingBookingPage.ViolationHourlyBookedSpots();
      await reusablePageClass.releaseAlHourlyBookedSpots();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_003: Ensures only hourly popup elements are displayed in the grid layout and a member can claim and release a parking spot on the current day`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(grid_desk_zone);
      await memberdashboardpage.verifyMemberDashboardElemnts();
      await parkingBookingPage.hourlybookSpotCurruntDayFromCalendarVerifyingWithPopup();
      await reusablePageClass.releaseAlHourlyBookedSpots();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_004: Ensures only hourly popup elements are displayed in the grid layout and a member can claim, release a parking spot, and perform a violation on the current day`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(grid_desk_zone);
      await parkingBookingPage.hourlybookSpotCurruntDayFromCalendar();
      await parkingBookingPage.ViolationHourlyBookedSpots();
      await reusablePageClass.releaseAlHourlyBookedSpots();
    } catch (error: any) {
      throw error;
    }
  });

});
