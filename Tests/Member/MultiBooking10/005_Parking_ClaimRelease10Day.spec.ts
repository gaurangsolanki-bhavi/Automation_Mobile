import { test, context, page } from "../../../Utils/GlobalFixture";
import { expect } from "@playwright/test";
import ReusablePage from "../../../Pages/Member/ReusablePage"
import ReusableActions from "../../../Actions/ReusableActions";
import UserSet from "../../../test-data/JSON/admin_set_test.json"
import ZoneData from "../../../test-data/JSON/zone_data.json"
import GroupOnePage from "../../../Pages/Member/GroupOne";
import ParkingBookingPage from "../../../Pages/Member/ParkingBookingPage";
import AdminLoginPage from "../../../Pages/Administration/AdminLogin";

let reusablePageClass: ReusablePage;
let reusableActionsClass: ReusableActions;
let className: string, customerName: string;
let groupOnePage: GroupOnePage;
let parkingBookingPage:ParkingBookingPage;
let zone: string;
let grid_desk_zone: string;
let map_car_zone: string;
let adminloginPage: AdminLoginPage;
let userEmail: string;


test.beforeAll(async ({ sharedPage }) => {
  reusablePageClass = new ReusablePage(sharedPage);
  reusableActionsClass = new ReusableActions(sharedPage);
  groupOnePage = new GroupOnePage(sharedPage);
  parkingBookingPage = new ParkingBookingPage(sharedPage);
  adminloginPage = new AdminLoginPage(sharedPage);

  const ENV = (process.env.ENV || 'STAGE') as keyof typeof ZoneData.ZONE_SET1;
  const user = await reusablePageClass.loginWithExcelAdminUser2("MultiBook", ZoneData.ZONE_SET1[ENV]);
 // const user =  await reusablePageClass.loginWithExcelUser("ValidUser2", ZoneData.ZONE_SET1[ENV]);
  zone = user.ZONE;
  grid_desk_zone = user.GRID_DESK_ZONE;
  map_car_zone = user.MAP_CAR_ZONE;
  userEmail = user.Email;
  await adminloginPage.navigateTOUserAndClearBookings(userEmail);
  await reusablePageClass.loginWithExcelUser("MultiBook", ZoneData.ZONE_SET1[ENV]);



});

test.afterAll(async () => {

  await page.close();
  await context.close();
});

test.describe(`Verify Member Parking Spot Bookings`, () => {


  test('Test_001: Ensures a member can successfully claim and release parking spot on the current day', async () => {
    try {
      // await reusablePageClass.checkAndAddVehicle();
      // await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(zone);
      //await parkingBookingPage.bookSpotForNext10Days();
      await parkingBookingPage.bookSpotForNext10Days2();
      await parkingBookingPage.releaseSpotCurrentDayFromCalendar();
    } catch (error: any) {
      throw error; 
    }
  });
});

//npx playwright test Tests/Member/MultiBookings  - Run Tests 
