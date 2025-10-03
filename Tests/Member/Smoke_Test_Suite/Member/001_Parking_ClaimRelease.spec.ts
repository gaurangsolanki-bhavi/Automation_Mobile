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
  const user = await reusablePageClass.loginWithExcelUser("ValidUser", ZoneData.ZONE_SET1.PROD);
  zone = user.ZONE;
  grid_desk_zone = user.GRID_DESK_ZONE;
  map_car_zone = user.MAP_CAR_ZONE;

});

test.afterAll(async () => {

  await page.close();
  await context.close();
});

test.describe(`Verify Member Parking Spot Bookings`, () => {


  test('Test_001: Ensures a member can successfully claim and release parking spot on the current day', async () => {
    try {
      await reusablePageClass.checkAndAddVehicle();
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(zone);
      await parkingBookingPage.bookSpotCurruntDayFromCalendar();
      await parkingBookingPage.releaseSpotCurrentDayFromCalendar();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_002: Ensures a member can successfully claim and release parking spot on the next month`, async () => {
    try {
      await parkingBookingPage.nextMonthBooking();
      await parkingBookingPage.releaseSpotNextMonthFromCalendar();
    } catch (error: any) {
      throw error;
    } 
  });

  test(`Test_003: Ensures a member can successfully change their zone and claim and release parking spot on the next month`, async () => {
    try {
      await reusablePageClass.selectZone(grid_desk_zone);
      await parkingBookingPage.nextMonthBooking();
      await parkingBookingPage.releaseSpotNextMonthFromCalendar();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_004: Ensures a member can successfully check in and check out on Current Day claim and release`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(grid_desk_zone);
      await parkingBookingPage.bookSpotCurruntDayFromCalendar();
      await reusablePageClass.performCheckIn();
      await reusablePageClass.performCheckout();
      await parkingBookingPage.releaseSpotCurrentDayFromCalendar();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_005: Ensures a member can successfully change their zone and claim and release parking spot on the Current Day`, async () => {
    try {
      await reusablePageClass.selectZone(grid_desk_zone);
      await parkingBookingPage.bookSpotCurruntDayFromCalendar();
      await parkingBookingPage.releaseSpotCurrentDayFromCalendar();
    } catch (error: any) {
      throw error;
    }
  });


  test(`Test_006: Ensures a team member can successfully claim and release parking spot on the current day`, async () => {
    try {
      await reusablePageClass.selectZone(zone);
      await reusablePageClass.selectTeamMember(1);
      await parkingBookingPage.bookSpotCurruntDayFromCalendar();
      await parkingBookingPage.releaseSpotCurrentDayFromCalendar();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_007: Ensures a team member can successfully claim and release parking spot for the next month`, async () => {
    try {
      await reusablePageClass.selectTeamMember(2);
      await reusablePageClass.selectZone(zone);
      await parkingBookingPage.nextMonthBooking();
      await parkingBookingPage.releaseSpotNextMonthFromCalendar();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_008: Ensures a team member can change their zone and successfully claim and release parking spot`, async () => {
    try {
      await reusablePageClass.selectTeamMember(2);
      await reusablePageClass.selectZone(grid_desk_zone);
      await parkingBookingPage.bookSpotCurruntDayFromCalendar();
      await parkingBookingPage.releaseSpotCurrentDayFromCalendar();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_009: Ensures a team member can change their zone and successfully claim and release parking spot for the next month`, async () => {
    try {
      await reusablePageClass.selectTeamMember(2);
      await reusablePageClass.selectZone(grid_desk_zone);
      await parkingBookingPage.nextMonthBooking();
      await parkingBookingPage.releaseSpotNextMonthFromCalendar();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_010: Ensures a member can claim and release parking spot from the map layout on the current day`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(map_car_zone);
      await parkingBookingPage.bookSpotCurruntDayFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_011: Ensures a member can claim and release parking spot from the map layout for the next month`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(map_car_zone);
      await parkingBookingPage.bookSpotNextMonthFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_012: Ensures a member can change their zone and successfully claim and release parking spot from the map layout on the current day`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(grid_desk_zone);
      await parkingBookingPage.bookSpotCurruntDayFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });


  test(`Test_013: Ensures a member can change their zone and successfully claim and release parking spot from the map layout for the next month`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(grid_desk_zone);
      await parkingBookingPage.bookSpotNextMonthFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_014: Ensures a team member can claim and release a parking spot from the map layout on the current day`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(map_car_zone);
      await parkingBookingPage.bookSpotCurruntDayForTeamMemberFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_015: Ensures a team member can claim and release a parking spot from the map layout for the next month`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(map_car_zone);
      await parkingBookingPage.bookSpotForTeamMemberNextMonthFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_016: Ensures a team member can change their zone and successfully claim and release a parking spot from the map layout on the current day`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectTeamMember(2);
      await reusablePageClass.selectZone(grid_desk_zone);
      await parkingBookingPage.bookSpotCurruntDayFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_017: Ensures a team member can change their zone and successfully claim and release a parking spot from the map layout for the next month`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectTeamMember(2);
      await reusablePageClass.selectZone(grid_desk_zone);
      await parkingBookingPage.bookSpotNextMonthFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });


});
