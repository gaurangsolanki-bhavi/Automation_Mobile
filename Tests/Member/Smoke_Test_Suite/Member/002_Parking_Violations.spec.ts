import { test, context, page } from "../../../../Utils/GlobalFixture";
import { expect } from "@playwright/test";
import ReusablePage from "../../../../Pages/Member/ReusablePage"
import ReusableActions from "../../../../Actions/ReusableActions";
import UserSet from "../../../../test-data/JSON/admin_set_test.json"
import ZoneData from "../../../../test-data/JSON/zone_data.json"
import GroupOnePage from "../../../../Pages/Member/GroupOne";
import ParkingBookingPage from "../../../../Pages/Member/ParkingBookingPage";

let reusablePageClass: ReusablePage;
let reusableActionsClass: ReusableActions;
let className: string, customerName: string;
let groupOnePage: GroupOnePage;
let parkingBookingPage: ParkingBookingPage;
let zone: string;
let grid_desk_zone: string;
let map_car_zone: string;


test.beforeAll(async ({ sharedPage }) => {
  reusablePageClass = new ReusablePage(sharedPage);
  reusableActionsClass = new ReusableActions(sharedPage);
  groupOnePage = new GroupOnePage(sharedPage);
  parkingBookingPage = new ParkingBookingPage(sharedPage);
  const user = await reusablePageClass.loginWithExcelUser("ValidUser2", ZoneData.ZONE_SET1.PROD);
  zone = user.ZONE;
  grid_desk_zone = user.GRID_DESK_ZONE;
  map_car_zone = user.MAP_CAR_ZONE;
});

test.afterAll(async () => {

  await page.close();
  await context.close();
});

test.describe(`Verify Member Parking Spot Violations`, () => {

  test(`Test_001: Ensures a member performs a violation on the current day`, async () => {
    try {
      await reusablePageClass.checkAndAddVehicle();
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(zone);
      await parkingBookingPage.bookSpotCurruntDayFromCalendar();
      await parkingBookingPage.reportViolationFromCalendar();
      await parkingBookingPage.releaseSpotCurrentDayFromCalendar();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_002: Ensures a member can change their zone, claim a Parking Spot, and perform violations`, async () => {
    try {
      await reusablePageClass.selectZone(grid_desk_zone);
      await parkingBookingPage.bookSpotCurruntDayFromCalendar();
      await parkingBookingPage.reportViolationFromCalendar();
      await parkingBookingPage.releaseSpotCurrentDayFromCalendar();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_003: Ensures a member can claim a Parking spot and perform violations from the map Layout on the current day`, async () => {
    try {

      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(grid_desk_zone);
      await parkingBookingPage.bookSpotCurruntDayFromMap();
      await parkingBookingPage.reportViolatonFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_004: Ensures a member can change their zone, claim a Parking spot, and perform violations from the map Layout on the current day`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(map_car_zone);
      await parkingBookingPage.bookSpotCurruntDayFromMap();
      await parkingBookingPage.reportViolatonFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

});
