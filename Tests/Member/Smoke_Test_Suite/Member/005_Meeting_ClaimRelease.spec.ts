import { test, context, page } from "../../../../Utils/GlobalFixture";
import { expect } from "@playwright/test";
import ReusablePage from "../../../../Pages/Member/ReusablePage"
import ReusableActions from "../../../../Actions/ReusableActions";
import UserSet from "../../../../test-data/JSON/admin_set_test.json"
import ZoneData from "../../../../test-data/JSON/zone_data.json"
import GroupOnePage from "../../../../Pages/Member/GroupOne";
import Memberdashboardpage from "../../../../Pages/Member/MemberDashboardPage";
import MeetingRoomPage from "../../../../Pages/Member/MeetingRoomPage";
import ElementsName from "../../../../test-data/JSON/Elements_Name.json"

let reusablePageClass: ReusablePage;
let reusableActionsClass: ReusableActions;
let groupOnePage: GroupOnePage;
let memberdashboardpage: Memberdashboardpage;
let meetingroompage: MeetingRoomPage;
let zone: string;
let grid_desk_zone: string;
let map_car_zone: string;
let Participants: string;


test.beforeAll(async ({ sharedPage }) => {
  reusablePageClass = new ReusablePage(sharedPage);
  reusableActionsClass = new ReusableActions(sharedPage);
  groupOnePage = new GroupOnePage(sharedPage);
  memberdashboardpage = new Memberdashboardpage(sharedPage);
  meetingroompage = new MeetingRoomPage(sharedPage);
  const user = await reusablePageClass.loginWithExcelUser("Meeting01", ZoneData.ZONE_SET1.PROD);
  zone = user.ZONE;
  grid_desk_zone = user.GRID_DESK_ZONE;
  map_car_zone = user.MAP_CAR_ZONE;
  Participants = user.Participant;

});

test.afterAll(async () => {

  await page.close();
  await context.close();
});

test.describe(`Verify Meeting Booking and Release`, () => {


  test(`Test_001: Ensure a member can book, reschedule, and cancel a "No Repeat" meeting on the current day, and all meeting room popup elements are correctly displayed on the map layout`, async () => {
    try {
      await reusablePageClass.selectZone(zone);
      await meetingroompage.bookMeetingCurruntDayFromMap(Participants, ElementsName.Meeting_Repeat_Options.No_Repeat);
      await meetingroompage.rescheduleAndReleaseMeetingFromMenu(ElementsName.Meeting_Repeat_Options.No_Repeat);
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_002: Ensure meeting room popup elements are displayed on the map layout and a member can book, reschedule, and cancel Daily All Recurring meeting`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(zone);
      await meetingroompage.bookDailyRepeatMeetingBooking(Participants, ElementsName.Meeting_Repeat_Options.Daily, 1);
      await meetingroompage.CheckingBookedMeetingOnCalendar()
      await meetingroompage.rescheduleAndReleaseMeetingFromMenu(ElementsName.Meeting_Repeat_Options.Daily);
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_003: Ensure meeting room popup elements are displayed on the map layout and a member can book, reschedule, and cancel Weekly All Recurring meeting`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(zone);
      await meetingroompage.bookWeeklyRepeatMeetingBooking(Participants, ElementsName.Meeting_Repeat_Options.Weekly, 1);
      await meetingroompage.CheckingBookedMeetingOnCalendar();
      await meetingroompage.verifyBookedWeekDayForMeeting();
      await meetingroompage.rescheduleAndReleaseMeetingFromMenu(ElementsName.Meeting_Repeat_Options.Weekly);
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_004: Ensure meeting room popup elements are displayed on the map layout and a member can book, reschedule, and cancel Monthly All Recurring meeting`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(zone);
      await meetingroompage.bookMonthlyRepeatMeetingBooking(Participants, ElementsName.Meeting_Repeat_Options.Monthly, 0);
      await meetingroompage.CheckingBookedMeetingOnCalendarWeekDay();
      await meetingroompage.verifyBookedWeekDayForMeetingLastDay();
      await meetingroompage.rescheduleReleaseWeekDayMeetingFromMenu(ElementsName.Meeting_Repeat_Options.Monthly);
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_005: Ensure meeting room popup elements are displayed on the map layout and a member can book, reschedule, and cancel a BiWeekly All Recurring meeting`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(zone);
      await meetingroompage.bookBiWeeklyRepeatMeetingBooking(Participants, ElementsName.Meeting_Repeat_Options.Biweekly, 1);
      await meetingroompage.CheckingBookedMeetingOnCalendarBiWeekDay();
      await meetingroompage.verifyBookedBiWeeklyDayForMeeting();
      await meetingroompage.rescheduleAndReleaseMeetingFromMenu(ElementsName.Meeting_Repeat_Options.Biweekly);
    } catch (error: any) {
      throw error;
    }
  });

});
