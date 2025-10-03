import { test, context, page } from "../../Utils/GlobalFixture";
import { expect } from "@playwright/test";
import ReusablePage from "../../Pages/Member/ReusablePage";
import ReusableActions from "../../Actions/ReusableActions";
import AdminLoginPage from "../../Pages/Administration/AdminLogin";
import UserSet from "../../test-data/JSON/admin_set_test.json"
import ZoneData from "../../test-data/JSON/zone_data.json"
import SpacesMenuPage from "../../Pages/Administration/SpacesMenu"
import WifiCheckingPage from "../../Pages/Administration/WifiChecking"

let reusablePageClass: ReusablePage;
let reusableActionsClass: ReusableActions;
let adminloginPage: AdminLoginPage;
let spacesMenuPage: SpacesMenuPage
let zone: string;
let grid_desk_zone: string;
let map_car_zone: string;
let Employee: string;
let wifiCheckingPage: WifiCheckingPage;
let desk: string;
let meeting: string;
let RESTUSER: string;

test.beforeAll(async ({ sharedPage }) => {
  // Load the global data before running the tests
  reusablePageClass = new ReusablePage(sharedPage);
  reusableActionsClass = new ReusableActions(sharedPage);
  adminloginPage = new AdminLoginPage(sharedPage);
  spacesMenuPage = new SpacesMenuPage(sharedPage)
  wifiCheckingPage = new WifiCheckingPage(sharedPage);
  const user = await reusablePageClass.loginWithExcelAdminUser("AdminUser", ZoneData.ZONE_SET1.PROD);
  zone = user.ZONE;
  grid_desk_zone = user.GRID_DESK_ZONE;
  map_car_zone = user.MAP_CAR_ZONE;
  Employee = user.employee;
  desk = user.DESK;
  meeting = user.MEETING;
  RESTUSER = user.RESTUSER;
  await spacesMenuPage.verifySpacesSubMenuNavigation();
});

test.afterAll(async () => {
  await page.close();
  await context.close();
});

test.describe.serial(`Verify Admin Parking , Meeting and Desk Spot Menu`, () => {

  test(`Test_001: Verify that the admin user can access the "Parking Spot" submenu and validate the Elements and Create Spot`, async () => {
    try {
      await spacesMenuPage.parkingSpacesElements(zone);
      await spacesMenuPage.verifyingparkingSpacesLabels();
      await spacesMenuPage.AddparkingSpot(zone);
      await spacesMenuPage.EditParkingSpot(RESTUSER);
      await spacesMenuPage.deleteParkingSpot();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_002: Verify that the admin user can access the "Desk Spot" submenu and validate the Elements and Create Spot`, async () => {
    try {
      await spacesMenuPage.deskSpacesElements(desk);
      await spacesMenuPage.verifyingdeskSpacesLabels();
      await spacesMenuPage.AdddeskSpot(desk);
      await spacesMenuPage.EditDeskSpot(RESTUSER);
      await spacesMenuPage.deleteDeskSpot();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_003: Verify that the admin user can access the "Meeting Room" submenu and validate the Elements and Create Spot`, async () => {
    try {
      await spacesMenuPage.meetingSpacesElements(meeting);
      await spacesMenuPage.verifyingmeetingSpacesLabels();
      await spacesMenuPage.AddMeetingSpot(meeting);
      await spacesMenuPage.EditMeetingSpot(RESTUSER);
      await spacesMenuPage.deleteMeetingSpot();
    } catch (error: any) {
      throw error;
    }
  });
});
