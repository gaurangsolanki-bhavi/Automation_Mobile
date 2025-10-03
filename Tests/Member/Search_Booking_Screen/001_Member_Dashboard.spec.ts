import { test, context, page } from "../../../Utils/GlobalFixture";
import { expect } from "@playwright/test";
import ReusablePage from "../../../Pages/Member/ReusablePage"
import ReusableActions from "../../../Actions/ReusableActions";
import UserSet from "../../../test-data/JSON/admin_set_test.json"
import ZoneData from "../../../test-data/JSON/zone_data.json"
import GroupOnePage from "../../../Pages/Member/GroupOne";
import ParkingBookingPage from "../../../Pages/Member/ParkingBookingPage";

let reusablePageClass: ReusablePage;
let reusableActionsClass: ReusableActions;
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
  // Login with Json data
  // const setKey: keyof typeof UserSet = "SET_1"; 
  // zone = UserSet[setKey].ZONE;
  // grid_desk_zone=UserSet[setKey].GRID_DESK_ZONE;
  // map_car_zone=UserSet[setKey].MAP_CAR_ZONE;
  // await reusablePageClass.loginWithUserSet(setKey, reusablePageClass);

  const user = await reusablePageClass.loginWithExcelUser("ValidUser", ZoneData.ZONE_SET1.XLXS_PATH);
  zone = user.ZONE;
  grid_desk_zone = user.GRID_DESK_ZONE;
  map_car_zone = user.MAP_CAR_ZONE;

});

test.afterAll(async () => {

  await page.close();
  await context.close();
});

test.describe(`Verify Member Search bookings`, () => {

  test(`Test_001: Member claims a spot, searches bookings, verifies booking details in search results, and releases the spot`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(zone);
      await reusablePageClass.bookSpotCurruntDayFromCalendar_search();
      await reusablePageClass.GeneralSettings_Elements();
      await reusablePageClass.clickOnSearchBookingsButton();
      await reusablePageClass.search_Bookings();
      await reusablePageClass.NavigateToDashboard();
      await parkingBookingPage.releaseSpotCurrentDayFromCalendar();
    } catch (error: any) {
      throw error;
    }
  });


});
