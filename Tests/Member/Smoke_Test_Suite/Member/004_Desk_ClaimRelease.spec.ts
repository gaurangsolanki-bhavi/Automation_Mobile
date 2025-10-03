import { test, context, page } from "../../../../Utils/GlobalFixture";
import { expect } from "@playwright/test";
import ReusablePage from "../../../../Pages/Member/ReusablePage"
import ReusableActions from "../../../../Actions/ReusableActions";
import UserSet from "../../../../test-data/JSON/admin_set_test.json"
import ZoneData from "../../../../test-data/JSON/zone_data.json"
import GroupOnePage from "../../../../Pages/Member/GroupOne";
import Memberdashboardpage from "../../../../Pages/Member/MemberDashboardPage";
import DeskBookingPage from "../../../../Pages/Member/DeskBookingPage";
import ParkingBookingPage from "../../../../Pages/Member/ParkingBookingPage";


let reusablePageClass: ReusablePage;
let reusableActionsClass: ReusableActions;
let groupOnePage: GroupOnePage;
let memberdashboardpage: Memberdashboardpage;
let deskbookingpage: DeskBookingPage;
let parkingBookingPage: ParkingBookingPage;
let zone: string;
let grid_desk_zone: string;
let map_car_zone: string;


test.beforeAll(async ({ sharedPage }) => {
  reusablePageClass = new ReusablePage(sharedPage);
  reusableActionsClass = new ReusableActions(sharedPage);
  groupOnePage = new GroupOnePage(sharedPage);
  memberdashboardpage = new Memberdashboardpage(sharedPage);
  deskbookingpage = new DeskBookingPage(sharedPage);
  parkingBookingPage = new ParkingBookingPage(sharedPage);
  const user = await reusablePageClass.loginWithExcelUser("DeskUser", ZoneData.ZONE_SET1.PROD);
  zone = user.ZONE;
  grid_desk_zone = user.GRID_DESK_ZONE;
  map_car_zone = user.MAP_CAR_ZONE;

});

test.afterAll(async () => {

  await page.close();
  await context.close();
});

test.describe(`Verify Only Desk Spot Claim Release`, () => {


  test(`Test_001: Ensures no map all-day desk popup elements are displayed and a member can claim and release a Desk spot on the current day`, async () => {
    try {
      await reusablePageClass.selectZone(zone);
      await deskbookingpage.bookDeskSpotCurruntDayFromCalendar();
      await parkingBookingPage.releaseSpotCurrentDayFromCalendar();
    } catch (error: any) {
      throw error;
    }
  });
  test(`Test_002: Ensures member can claim and release a Desk spot for the next day`, async () => {
    try {
      await reusablePageClass.selectZone(zone);
      await deskbookingpage.bookDeskNextAvailableSpotAfterToday();
      await reusablePageClass.releaseAnyBookedSpot();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_003: Ensures member can claim and release a Desk spot for the next month`, async () => {
    try {
      await reusablePageClass.selectZone(zone);
      await deskbookingpage.nextMonthDeskBooking();
      await parkingBookingPage.releaseSpotNextMonthFromCalendar();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_004: Ensures all-day desk popup elements are displayed in the grid layout and a member can claim and release a Desk spot on the current day`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(grid_desk_zone);
      await deskbookingpage.bookAllDayDeskSpotCurruntDayFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_005: Ensures in the grid layout and a member can claim and release a Desk spot on the next day`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(grid_desk_zone);
      await deskbookingpage.bookDeskNextAvailableSpotFromMapAfterToday();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_006: Ensures in the grid layout and a member can claim and release a Desk spot on the next month`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(grid_desk_zone);
      await deskbookingpage.bookDeskSpotNextMonthFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_007: Ensures hourly booking desk popup elements are displayed in the grid layout and a member can claim and release a Desk spot on the current day`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(grid_desk_zone);
      await memberdashboardpage.verifyMemberDashboardElemnts();
      await deskbookingpage.hourlyDeskbookSpotCurruntDayFromMapVerifyingWithPopup();
      await reusablePageClass.releaseAlHourlyBookedSpots();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_008: Ensures hourly booking desk popup elements are displayed in the grid layout and a member can claim and release a Desk spot for the next month`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(grid_desk_zone);
      await deskbookingpage.hourlyDeskbookSpotNextMonthfromMap();
      await reusablePageClass.releaseAlHourlyBookedSpots();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_009: Ensures all-day desk popup elements are displayed on the map layout and a member can claim and release a Desk spot on the current day`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(map_car_zone);
      await deskbookingpage.bookAllDayDeskSpotCurruntDayFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_010: Ensures all-day desk popup elements are displayed on the map layout and a member can claim and release a Desk spot on the next day.`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(map_car_zone);
      await deskbookingpage.bookDeskNextAvailableSpotFromMapAfterToday();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_011: Ensures all-day desk popup elements are displayed on the map layout and a member can claim and release a Desk spot for the next month`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(map_car_zone);
      await deskbookingpage.bookDeskSpotNextMonthFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });


  test(`Test_012: Ensures hourly booking desk popup elements are displayed on the map layout and a member can claim and release a Desk spot on the current day`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(map_car_zone);
      await memberdashboardpage.verifyMemberDashboardElemnts();
      await deskbookingpage.hourlyDeskbookSpotCurruntDayFromMapVerifyingWithPopup();
      await reusablePageClass.releaseAlHourlyBookedSpots();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_013: Ensures hourly booking desk popup elements are displayed on the map layout and a member can claim and release a Desk spot for the next month`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(map_car_zone);
      await deskbookingpage.hourlyDeskbookSpotNextMonthfromMap();
      await reusablePageClass.releaseAlHourlyBookedSpots();
    } catch (error: any) {
      throw error;
    }
  });






});
