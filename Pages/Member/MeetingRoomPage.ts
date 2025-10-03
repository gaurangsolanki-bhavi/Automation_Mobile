import { Page, Locator, expect, test } from "@playwright/test";
import WaitActionClass from "../../Actions/WaitActions";
import WebElementActionClass from "../../Actions/WebElementActions";
import LocatorsPage from "../Locators";
import UserSet from "../../test-data/JSON/admin_set_test.json"
import ElementsName from "../../test-data/JSON/Elements_Name.json"
import dayjs from "dayjs";
import { error } from "console";
import ReusableActionClass from "../../Actions/ReusableActions";
import ReusablePage from "./ReusablePage";
import Memberdashboardpage from "./MemberDashboardPage";


export default class MeetingRoomPage {
  private waitActionClass: WaitActionClass;
  private webElementActionClass: WebElementActionClass;
  private locatorsPage: LocatorsPage;
  private reusableActionClass: ReusableActionClass;
  private reusablePageClass: ReusablePage;
  private memberdashboardpage: Memberdashboardpage;
  continueWithEmailButton: Locator;

  public zone: string | any;
  public gridDeskZone: string | any;
  public mapCarZone: string | any;
  public currentUser: any;
  MeetingName: string | any;
  startDate: string | any;
  endDate: string | any;
  RoomName: string | any;
  WeekDay: string | any;
  WeekDay2: string | any;
  TodayName: string | any;
  TomorrowName: string | any;

  constructor(public page: Page) {
    // Initialize class objects
    this.waitActionClass = new WaitActionClass(page);
    this.webElementActionClass = new WebElementActionClass(page);
    this.reusableActionClass = new ReusableActionClass(page);
    this.locatorsPage = new LocatorsPage(page);
    this.reusablePageClass = new ReusablePage(page);
    this.memberdashboardpage = new Memberdashboardpage(page);
    this.continueWithEmailButton = page.locator("//span[contains(text(), 'Continue with Email')]"); // Update if needed
  }
  /**
    * Books a meeting for the current day from the map view.
    * This method first releases any existing meetings, refreshes the day count,
    * navigates to the map, selects an available meeting room, sets meeting details,
    * adds participants, and confirms the booking.
    * @param Participants The name or email of a participant to add to the meeting.
    * @param index The index used for meeting repeat options (e.g., 'once', 'daily').
    */

  async bookMeetingCurruntDayFromMap(Participants: string, index: string) {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Booking Currunt Day Meeting From Calender...");
    console.log("------------------------------------------------")
    await this.releaseAllMeetingsFromMenu();
    await this.reusablePageClass.refreshAndCountDays();
    const todayDateId = dayjs().format('YYYY-MM-DD'); // example: '2025-04-07'
    console.log(`Today Date :- (${todayDateId}).`);
    await this.page.waitForTimeout(2000);
    const availableDays = await this.locatorsPage.availableDaysfromcurrunt.all();
    let clicked = false;

    for (const day of availableDays) {
      const id = await day.getAttribute('id');
      if (id === todayDateId) {
        console.log(`Found today's available spot (${id}). Clicking...`);
        await day.scrollIntoViewIfNeeded();
        await this.webElementActionClass.Click(day);
        console.log("\n");
        console.log("Verifying that the 'Select Vehicle' dropdown is not present \nAnd 'Go To Map Button' is present on the Booking pop-up.");
        //await this.reusablePageClass.assertElementVisible(this.locatorsPage.getRandomSpaceButton, ElementsName.NoMap.Get_Random_Space_btn)
        await this.reusablePageClass.assertElementHidden(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List)
        await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(6000)
        await this.memberdashboardpage.verifyUserOnMapLayout();
        await this.memberdashboardpage.mapLayoutZoneName();
        const spotDetails = await this.reusablePageClass.printMeetingSpotDetails();
        if (spotDetails.allSpotsCount === 0) {
          throw new Error("No Meeting Room available in this zone");
        }
        await this.reusablePageClass.printAvailableDeskSpots();
        await this.page.waitForTimeout(5000);
        const spotId = await this.locatorsPage.parking_allday_all_spots.first().getAttribute('data-spotid');
        const RoomName = await this.locatorsPage.parking_allday_all_spots.first().getAttribute('title');
        await this.webElementActionClass.Click(this.locatorsPage.parking_allday_all_spots.first());
        console.log(`Clicking on Meeting Room.... ${RoomName}`);
        await this.page.waitForTimeout(3000);
        await this.minutes30MeetingBooking();
        await this.page.waitForTimeout(2000);
        await this.webElementActionClass.Click(this.locatorsPage.meeting_Next_Btn);
        this.MeetingName = await this.meetingDetailsOnGrid(index);
        await this.webElementActionClass.Click(this.locatorsPage.meeting_Next_Btn2);
        await this.meetingAddParticipants(Participants);
        await this.addGuestuser();
        await this.webElementActionClass.Click(this.locatorsPage.meeting_Confirm_btn);
        console.log(`Clicked on Confirm Meeting Buttom...`);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
        console.log("Success message is displayed for Spot Booked.");
        await this.verifybookedMeetingWithTostMessageOnMap(spotId);
        clicked = true;
        break;
      }
    }

    if (!clicked) {
      console.error(`Not able Booking on Currunt Day's spot (${todayDateId})`, error);
      throw new Error(`Not able Booking on Currunt Day's spot (${todayDateId})`)
    }
    console.log("<<================================================================>>");
  }

  /**
 * Searches for and adds participants to a meeting.
 * It types the participant's name into the search field and clicks the first result.
 * @param Participants The name or email of the participant to search and add.
 */

  async meetingAddParticipants(Participants: string) {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Search And Add Participants in Meeting...");
    console.log("------------------------------------------------")
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.meeting_Search_Participants);
    await this.page.waitForTimeout(5000);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.meeting_Search_Participants, Participants);
    await this.page.waitForTimeout(3000);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.meeting_First_Participants);
    await this.webElementActionClass.Click(this.locatorsPage.meeting_First_Participants);
    console.log("Participant added successfully.");
  }

  /**
 * Adds a guest user to the meeting by filling out their details.
 * This includes first name, last name, email, and a national ID (or similar).
 */

  async addGuestuser() {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Add Guest Participants in Meeting...");
    console.log("------------------------------------------------")
    await this.page.waitForTimeout(3000);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.meeting_guest_Participants_btn);
    await this.webElementActionClass.Click(this.locatorsPage.meeting_guest_Participants_btn);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.add_Guest_Participant_First_name_input);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.add_Guest_Participant_First_name_input, "Test");
    await this.webElementActionClass.Send_Keys(this.locatorsPage.add_Guest_Participant_Last_name_input, "User");
    await this.webElementActionClass.Send_Keys(this.locatorsPage.add_Guest_Participant_EmailAddress_input, "TestUser@test.com");
    await this.webElementActionClass.Send_Keys(this.locatorsPage.add_Guest_Participant_Nationals_input, "00007");
    await this.webElementActionClass.Click(this.locatorsPage.meeting_guest_Participants_save_btn);
    await this.page.waitForTimeout(2000);
    console.log("Guest Participants added successfully.");
  }

  /**
  * Fills in the meeting details on the grid view, including meeting name and notes.
  * It also handles meeting repeat options based on the provided index.
  * @param index The index for selecting the meeting repeat option (e.g., 'once', 'daily').
  * @returns The generated meeting name.
  */

  async meetingDetailsOnGrid(index: string) {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Creating New Meeting ...");
    console.log("------------------------------------------------")
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.meeting_Name_TextBox);
    const Meeting_Name = await this.reusablePageClass.generateRandomNumberMeetings();
    await this.webElementActionClass.Send_Keys(this.locatorsPage.meeting_Name_TextBox, Meeting_Name);
    await this.reusablePageClass.MeetingReapeatOptions(index);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.meeting_Note_TextBox, "Created New Meeting:" + Meeting_Name);
    return Meeting_Name
  }

  /**
   * Releases (cancels) a specific meeting from the menu.
   * It navigates to the meeting tab, searches for the meeting by name,
   * verifies its details, and then proceeds to cancel it.
   * @param repeat The expected repeat option of the meeting (e.g., 'Does not repeat').
   */

  async releaseMeetingFromMenu(repeat: string) {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Cancel Currunt Day Meeting ...");
    console.log("------------------------------------------------")
    await this.page.waitForTimeout(2000);
    await this.navigateToMeetingTab();
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.Meeting_Search);
    console.log("\n");
    console.log('Search Recently Created Meeting: ' + this.MeetingName)
    await this.webElementActionClass.Send_Keys(this.locatorsPage.Meeting_Search, this.MeetingName);
    await this.page.waitForTimeout(5000);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.First_Name_Meeting_Main_Menu);
    const MeetingName = await this.locatorsPage.First_Name_Meeting_Main_Menu.innerText(); // or use innerText() for rendered text
    console.log("\n");
    console.log('Find First Meeting Name is:', MeetingName);
    console.log('Verifying Created Meeting Name on Meeting Tab');
    expect(this.MeetingName).toBe(MeetingName);
    const first_meeting_repeat_option = await this.locatorsPage.Meeting_Repeat_Option.innerText();
    console.log("\n");
    console.log('Find First Meeting Repeat Option is:', first_meeting_repeat_option);
    console.log('Verifying Created Meeting Repeat Option on Meeting Tab');
    expect(repeat).toBe(first_meeting_repeat_option);
    console.log("\n");
    const StartDate = await this.locatorsPage.Meeting_Start_Date.innerText();
    console.log('Ensuring Created Booking Start Date on Meeting Tab', StartDate);

    // Convert '21-05-2025' to '2025-05-21'
    const [day, month, year] = StartDate.split("-");
    const formattedStartDate = `${year}-${month}-${day}`;

    if (this.startDate !== undefined) {
      console.log('Verified Start Date:', formattedStartDate);
      expect(formattedStartDate).toBe(this.startDate);
    } else {
      console.log('Skipping start date assertion: this.startDate is undefined');
    }

    const EndDateRaw = await this.locatorsPage.Meeting_End_Date.innerText();
    const EndDate = EndDateRaw.trim();
    console.log('Ensuring Created Booking End Date on Meeting Tab:', EndDate);

    // Convert '21-05-2025' -> '2025-05-21'
    const [endDay, endMonth, endYear] = EndDate.split("-");
    const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;
    if (this.endDate !== undefined) {
      console.log('Verified End Date:', formattedEndDate);
      expect(formattedEndDate).toBe(this.endDate);
    } else {
      console.log('Skipping end date assertion: this.endDate is undefined');
    }
    console.log("\n");
    console.log('Right Scrolling...');
    await this.scrollRightUntilVisible(this.locatorsPage.First_Meeting_Cancel);
    console.log("\n");
    console.log('Clicked On Cancel Meeting Button..');
    await this.webElementActionClass.Click(this.locatorsPage.First_Meeting_Cancel);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.Meeting_Cancel_pop_name);
    const PopupMettingName = await this.locatorsPage.Meeting_Cancel_pop_name.innerText(); // or use innerText() for rendered text
    console.log('Verifying Meeting Name on Cancel Meeting PopUp:', PopupMettingName);
    await this.webElementActionClass.Click(this.locatorsPage.Meeting_Cancel_pop_Confirm);
    console.log("Meeting Cancel...Successfully");
    // await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
    // console.log("Release Success PopUp message is displayed.");
    await this.page.waitForTimeout(2000);
    console.log("<<================================================================>>");

  }

  /**
 * Releases (cancels) a weekly repeat meeting from the menu.
 * This method is similar to `releaseMeetingFromMenu` but specifically targets weekly bookings.
 * It navigates to the meeting tab, searches, verifies, and cancels the meeting.
 * @param repeat The expected repeat option of the meeting (e.g., 'Weekly').
 */

  async releaseWeekDayMeetingFromMenu(repeat: string) {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Cancel Currunt Day Meeting ...");
    console.log("------------------------------------------------")
    await this.page.waitForTimeout(2000);
    await this.navigateToMeetingTab();
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.Meeting_Search);
    console.log("\n");
    console.log('Search Recently Created Meeting: ' + this.MeetingName)
    await this.webElementActionClass.Send_Keys(this.locatorsPage.Meeting_Search, this.MeetingName);
    await this.page.waitForTimeout(5000);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.First_Name_Meeting_Main_Menu);
    const MeetingName = await this.locatorsPage.First_Name_Meeting_Main_Menu.innerText(); // or use innerText() for rendered text
    console.log("\n");
    console.log('Find First Meeting Name is:', MeetingName);
    console.log('Verifying Created Meeting Name on Meeting Tab');
    expect(this.MeetingName).toBe(MeetingName);
    const first_meeting_repeat_option = await this.locatorsPage.Meeting_Repeat_Option.innerText();
    console.log("\n");
    console.log('Find First Meeting Repeat Option is:', first_meeting_repeat_option);
    console.log('Verifying Created Meeting Repeat Option on Meeting Tab');
    expect(repeat).toBe(first_meeting_repeat_option);
    console.log("\n");
    console.log("\n");
    console.log('Right Scrolling...');
    await this.scrollRightUntilVisible(this.locatorsPage.First_Meeting_Cancel);
    console.log("\n");
    console.log('Clicked On Cancel Meeting Button..');
    await this.webElementActionClass.Click(this.locatorsPage.First_Meeting_Cancel);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.Meeting_Cancel_pop_name);
    const PopupMettingName = await this.locatorsPage.Meeting_Cancel_pop_name.innerText(); // or use innerText() for rendered text
    console.log('Verifying Meeting Name on Cancel Meeting PopUp:', PopupMettingName);
    await this.webElementActionClass.Click(this.locatorsPage.Meeting_Cancel_pop_Confirm);
    console.log("Meeting Cancel...Successfully");
    // await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
    // console.log("Release Success PopUp message is displayed.");
    await this.page.waitForTimeout(2000);
    console.log("<<================================================================>>");

  }

    /**
   * Releases (cancels) all currently booked meetings displayed in the menu.
   * It navigates to the meeting tab and repeatedly cancels meetings until none are left.
   */

  async releaseAllMeetingsFromMenu() {
    const assignedSpots = this.page.locator("//a[contains(@class,'SpotID_assigned')]");
    const count = await assignedSpots.count();

    console.log(`Total Booked Spots: ${count}`);

    if (count === 0) {
      console.log("No booked spot found to release.");
      return false;
    }
    await this.page.waitForTimeout(4000);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.meeting_Main_Menu);
    await this.webElementActionClass.Click(this.locatorsPage.meeting_Main_Menu);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(3000);
    // Keep releasing while meeting name elements are visible
    const isMeetingVisible = async () => {
      return await this.locatorsPage.First_Name_Meeting_Main_Menu.isVisible().catch(() => false);
    };
    while (await isMeetingVisible()) {
      await this.waitActionClass.waitForElementVisible(this.locatorsPage.First_Name_Meeting_Main_Menu);
      const meetingName = await this.locatorsPage.First_Name_Meeting_Main_Menu.innerText();
      console.log('Releasing Meeting:', meetingName);

      await this.scrollRightUntilVisible(this.locatorsPage.First_Meeting_Cancel);
      await this.webElementActionClass.Click(this.locatorsPage.First_Meeting_Cancel);

      await this.waitActionClass.waitForElementVisible(this.locatorsPage.Meeting_Cancel_pop_name);
      const popupMeetingName = await this.locatorsPage.Meeting_Cancel_pop_name.innerText();
      console.log('Meeting Name on Cancel Meeting Popup:', popupMeetingName);

      await this.webElementActionClass.Click(this.locatorsPage.Meeting_Cancel_pop_Confirm);
      console.log('Released meeting:', popupMeetingName);

      await this.page.waitForTimeout(4000);
    }
    console.log('All meetings released.');
    await this.reusablePageClass.NavigateToDashboard();
    console.log("=================================================");
  }
 /**
   * Verifies a newly booked meeting by checking its presence and details on the map view.
   * It hovers over the spot, extracts the meeting name, and verifies the success toast message.
   * @param spotId The data-spotid attribute of the booked spot.
   */

  async verifybookedMeetingWithTostMessageOnMap(spotId: string | null) {
    await this.page.waitForTimeout(2000);
    const dynamicXPath = `//div[contains(@class, 'facing_') and contains(@class, 'SpotID_blank_mb') and @data-spotid='${spotId}' and @data-spottype='3']`;
    await this.page.locator(dynamicXPath).hover();
    const dynamicMeeting = `((//div[contains(@class, 'facing_') and contains(@class, 'SpotID_blank_mb') and @data-spotid='${spotId}' and @data-spottype='3']//tr)[1])/td[3]`;
    const dynamicMeetingText = await this.page.locator(dynamicMeeting).innerText();
    console.log("\n");
    console.log(`Booked Meeting Name: "${dynamicMeetingText}"`);

    const isBookedSpotVisible = await this.page.locator(dynamicXPath).isVisible();
    if (!isBookedSpotVisible) {
      console.error('Booked Spot element is NOT visible.');
      throw new Error(`Facing Issue In Booking Spot: ${error}`);
    } else {
      //const bookedSpotText1 = await this.page.locator(dynamicXPath).getAttribute("title");
      const bookedSpotText = await this.page.locator(dynamicXPath).getAttribute("title");
      const bookedSpot = bookedSpotText?.trim() || '';
      console.log("\n");
      console.log(`Booked Meeting Room: "${bookedSpot}"`);
      await this.verifySuccessToastMatchesForMeeting(this.locatorsPage.succsessMessage.first(), bookedSpot);
    }
  }

    /**
   * Verifies that the success toast message displayed after booking a meeting
   * matches the expected message.
   * @param toastLocator The Playwright Locator for the toast message element.
   * @param expectedSpotText The expected text related to the booked spot (currently unused in this method, but good for context).
   */

  async verifySuccessToastMatchesForMeeting(toastLocator: Locator, expectedSpotText: string): Promise<void> {
    console.log("\n");
    console.log("---------------------------------------------------");
    console.log("Verifying Meeting Booking Success PopUp message...");
    console.log("---------------------------------------------------");

    await toastLocator.waitFor({ state: "visible", timeout: 20000 });
    const toastText = await toastLocator.textContent();
    const trimmedToast = toastText?.trim() || '';

    const expectedmsg = `The meeting has been successfully scheduled`;

    console.log(`Popup Message: "${trimmedToast}"`);
    console.log(`Expected Message: "${expectedmsg}"`);

    if (trimmedToast === expectedmsg) {
      console.log("\n");
      console.log(`Success message correctly displayed: "${expectedmsg}".`);
    } else {
      throw new Error(`Success message mismatch. Expected: "${expectedmsg}", but got: "${trimmedToast}"`);
    }
    console.log("=================================================");
  }
 /**
   * Verifies that the booked meeting was scheduled on the expected weekday.
   * This is typically used for weekly repeating meetings.
   */
  async verifyBookedWeekDayForMeeting(): Promise<void> {
    console.log("\n");
    console.log("---------------------------------------------------");
    console.log("Verifying Booked Day of Meeting...");
    console.log("---------------------------------------------------");


    console.log(`Expected Day: "${this.TodayName}"`);
    console.log(`Actual Day: "${this.WeekDay}"`);

    if (this.TodayName === this.WeekDay) {
      console.log("\n");
      console.log(`Verified Meeting Weekly Meeting Booked on : "${this.WeekDay}".`);
    } else {
      throw new Error(`Weekly Meeting Day mismatch. Expected: "${this.TodayName}", but got: "${this.WeekDay}"`);
    }
    console.log("=================================================");
  }

   /**
   * Verifies that the booked meeting was scheduled on two expected weekdays, typically for bi-weekly bookings.
   */
  async verifyBookedBiWeeklyDayForMeeting(): Promise<void> {
    console.log("\n");
    console.log("---------------------------------------------------");
    console.log("Verifying Booked Day of Meeting...");
    console.log("---------------------------------------------------");


    console.log(`Expected Week Day 1: "${this.TodayName}"`);
    console.log(`Actual Week Day 1: "${this.WeekDay}"`);
    console.log("\n");
    console.log("---------------------------------------------------");
    console.log(`Expected Week Day 2: "${this.TomorrowName}"`);
    console.log(`Actual Week Day 2: "${this.WeekDay2}"`);

    if (this.TodayName === this.WeekDay && this.TomorrowName === this.WeekDay2) {
      console.log("\n");
      console.log(`Verified Meeting Bi-Weekly Meeting Booked on : "${this.WeekDay} and ${this.WeekDay2}" .`);
    } else {
      throw new Error(`Weekly Meeting Day mismatch. Expected: "${this.TodayName}", but got: "${this.WeekDay}"`);
    }
    console.log("=================================================");
  }

   /**
   * Logs a message indicating that the meeting was booked on the last weekday of the month.
   * This method is primarily for logging and does not perform assertions.
   */

  async verifyBookedWeekDayForMeetingLastDay(): Promise<void> {
    console.log("\n");
    console.log("---------------------------------------------------");
    console.log("Verifying Booked Day of Meeting...");
    console.log("---------------------------------------------------");
    console.log("\n");
    console.log(`Booked on the last weekday of the month: "${this.WeekDay}"`);
    console.log("=================================================");
  }

    /**
   * Navigates to the "Meeting" tab in the application's main menu.
   * It waits for the menu to be visible and then clicks it, waiting for page load states.
   */

  async navigateToMeetingTab() {
    console.log("\n");
    console.log("---------------------------------------------------");
    console.log("Navigate To Meeting Menu Tab...");
    console.log("---------------------------------------------------");
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.meeting_Main_Menu);
    await this.webElementActionClass.Click(this.locatorsPage.meeting_Main_Menu);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(3000);

  }

  /**
   * Selects the first available 30-minute meeting slot for the current day.
   * It calculates the current time and attempts to click on the corresponding slot,
   * ensuring the time falls within the allowed booking window.
   * @returns A Promise that resolves to true if a slot is successfully clicked, false otherwise.
   */
  async minutes30MeetingBooking() {
    console.log("\n");
    console.log("---------------------------------------------------");
    console.log("Select the first available meeting slot for today...");
    console.log("---------------------------------------------------");

    // Get all time slot labels (e.g., 8am, 6pm)
    const slotLabels = await this.locatorsPage.Meeting_All_Slots;
    const count = await slotLabels.count();

    if (count === 0) {
      console.log("No matching time slot elements found.");
      return false;
    }

    const firstText = await slotLabels.first().innerText(); // e.g., '8am'
    const lastText = await slotLabels.nth(count - 1).innerText(); // e.g., '6pm'


    console.log("Start Time Booking Slot:", firstText);
    console.log("End Time Booking Slot:", lastText);
    console.log("\n");
    console.log(`Booking Slot Must Be Between ${firstText} - ${lastText}`);
    // Convert '8am' and '6pm' to 24h format
    const parseTime = (t: string) => {
      const [_, time, meridian] = t.match(/(\d+)(am|pm)/i) || [];
      let hour = parseInt(time, 10);
      if (meridian.toLowerCase() === 'pm' && hour !== 12) hour += 12;
      if (meridian.toLowerCase() === 'am' && hour === 12) hour = 0;
      return hour;
    };

    const allowedStartHour = parseTime(firstText); // 8
    const allowedEndHour = parseTime(lastText);    // 18

    // Get current time rounded up to nearest 30-min slot
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (minutes >= 29) {
      minutes = 30;
    } else {
      minutes = 0;
    }

    // Only book if within allowed window
    if (hours < allowedStartHour || hours >= allowedEndHour) {
      throw new Error(`Current time (${hours}:${minutes}) is outside booking window (${allowedStartHour} - ${allowedEndHour}).`);
      return false;

    }


    const formattedStart = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    const dynamicSlotXPath = `//td[contains(@class, 'fc-timegrid-slot-lane') and @data-time='${formattedStart}']`;
    const slot = this.page.locator(dynamicSlotXPath);

    if (await slot.isVisible()) {
      await slot.click();
      console.log(`Clicked on first available slot: ${formattedStart}`);
      return true;
    } else {
      console.log(`No visible slot found at: ${formattedStart}`);
      return false;
    }
  }


  /**
   * Scrolls horizontally to the right until the target locator becomes visible.
   * This is useful for tables or grids with horizontal scrollbars.
   * It attempts to scroll a maximum of 10 times.
   * @param targetLocator The Playwright Locator of the element to scroll into view.
   * @throws Error if the element is not visible after all scroll attempts.
   */


  async scrollRightUntilVisible(targetLocator: Locator) {
    for (let i = 0; i < 10; i++) {
      const isVisible = await targetLocator.isVisible();
      if (isVisible) {
        console.log('Target element is visible.');
        return;
      }

      // Scroll the container to the right by 300 pixels
      await this.page.evaluate(() => {
        const container = document.querySelector('div.ag-body-horizontal-scroll-viewport');
        if (container) {
          container.scrollLeft += 300;
        }
      });

      // Wait a bit to let content load/render
      await this.page.waitForTimeout(300);
    }

    throw new Error('Element not visible after scrolling right.');
  }

   /**
   * Books a daily repeating meeting from the map view.
   * This method encompasses the full flow: releasing old meetings, navigating,
   * selecting a room, setting daily repeat options, adding participants,
   * and confirming the booking.
   * @param Participants The name or email of a participant to add.
   * @param index The index for meeting repeat options (e.g., 'Daily').
   * @param Endby The option for when the daily repeat should end (e.g., after N occurrences).
   */

  async bookDailyRepeatMeetingBooking(Participants: string, index: string, Endby: number) {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Booking Daily Repeat Meeting From Map...");
    console.log("------------------------------------------------")
    await this.releaseAllMeetingsFromMenu();
    await this.reusablePageClass.refreshAndCountDays();
    const todayDateId = dayjs().format('YYYY-MM-DD'); // example: '2025-04-07'
    console.log(`Today Date :- (${todayDateId}).`);
    await this.page.waitForTimeout(2000);
    const availableDays = await this.locatorsPage.availableDaysfromcurrunt.all();
    let clicked = false;

    for (const day of availableDays) {
      const id = await day.getAttribute('id');
      if (id === todayDateId) {
        console.log(`Found today's available spot (${id}). Clicking...`);
        await day.scrollIntoViewIfNeeded();
        await this.webElementActionClass.Click(day);
        console.log("\n");
        console.log("Verifying that the 'Select Vehicle' dropdown is not present \nAnd 'Go To Map Button' is present on the Booking pop-up.");
        //await this.reusablePageClass.assertElementVisible(this.locatorsPage.getRandomSpaceButton, ElementsName.NoMap.Get_Random_Space_btn)
        await this.reusablePageClass.assertElementHidden(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List)
        await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(6000)
        await this.memberdashboardpage.verifyUserOnMapLayout();
        await this.memberdashboardpage.mapLayoutZoneName();
        const spotDetails = await this.reusablePageClass.printMeetingSpotDetails();
        if (spotDetails.allSpotsCount === 0) {
          throw new Error("No Meeting Room available in this zone");
        }
        await this.reusablePageClass.printAvailableDeskSpots();
        await this.page.waitForTimeout(5000);
        const spotId = await this.locatorsPage.parking_allday_all_spots.first().getAttribute('data-spotid');
        this.RoomName = (await this.locatorsPage.parking_allday_all_spots.first().getAttribute('title')) ?? '';
        await this.webElementActionClass.Click(this.locatorsPage.parking_allday_all_spots.first());
        console.log(`Clicking on Meeting Room.... ${this.RoomName}`);
        await this.page.waitForTimeout(3000);
        await this.minutes30MeetingBooking();
        await this.page.waitForTimeout(2000);
        await this.webElementActionClass.Click(this.locatorsPage.meeting_Next_Btn);
        const meetingDetails = await this.dailyRepeatMeetingDetailsOnGrid(index, Endby);
        this.MeetingName = meetingDetails.Meeting_Name;
        this.startDate = meetingDetails.startTime;
        this.endDate = meetingDetails.endTime;
        await this.webElementActionClass.Click(this.locatorsPage.meeting_Next_Btn2);
        await this.meetingAddParticipants(Participants);
        await this.addGuestuser();
        await this.webElementActionClass.Click(this.locatorsPage.meeting_Confirm_btn);
        console.log(`Clicked on Confirm Meeting Buttom...`);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
        console.log("Success message is displayed for Spot Booked.");
        await this.verifybookedMeetingWithTostMessageOnMap(spotId);
        await this.reusablePageClass.NavigateToDashboard();
        clicked = true;
        break;
      }
    }

    if (!clicked) {
      console.error(`Not able Booking on Currunt Day's spot (${todayDateId})`, error);
      throw new Error(`Not able Booking on Currunt Day's spot (${todayDateId})`)
    }
    console.log("<<================================================================>>");
  }

   /**
   * Fills in the details for a daily repeating meeting on the grid view.
   * This includes setting the meeting name, repeat options (daily),
   * the end-by option, and selecting an end date.
   * @param index The index for selecting the meeting repeat option (e.g., 'Daily').
   * @param Endby The option for when the daily repeat should end (e.g., after N occurrences).
   * @returns An object containing the generated meeting name, start time, and end time.
   */

  async dailyRepeatMeetingDetailsOnGrid(index: string, Endby: number) {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Creating New Daily Repeat Meeting ...");
    console.log("------------------------------------------------")
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.meeting_Name_TextBox);
    const Meeting_Name = await this.reusablePageClass.generateRandomNumberMeetings();
    await this.webElementActionClass.Send_Keys(this.locatorsPage.meeting_Name_TextBox, Meeting_Name);
    await this.reusablePageClass.MeetingReapeatOptions(index);
    const startTime = await this.locatorsPage.Meeting_bookingdate.inputValue();
    await this.reusablePageClass.selectOptionFromDropdown(this.locatorsPage.Meeting_EndBy, Endby, ElementsName.DropDowns.End_By);
    await this.selectTwoMonthsAheadFirstAvailableEndDate();
    const endTime = await this.locatorsPage.Meeting_enddate.inputValue();
    console.log("Start Meeting Date:", startTime);
    console.log("End Meeting Date:", endTime);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.meeting_Note_TextBox, "Created New Meeting:" + Meeting_Name);
    return {
      Meeting_Name,
      startTime,
      endTime
    };
  }

  /**
   * Fills in the details for a monthly repeating meeting on the grid view.
   * This includes setting the meeting name, repeat options (monthly),
   * and selecting an end date.
   * @param index The index for selecting the meeting repeat option (e.g., 'Monthly').
   * @param Endby The option for when the monthly repeat should end (e.g., after N occurrences).
   * @returns An object containing the generated meeting name, start time, and end time.
   */

  async MonthlyRepeatMeetingDetailsOnGrid(index: string, Endby: number) {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Creating New Daily Repeat Meeting ...");
    console.log("------------------------------------------------")
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.meeting_Name_TextBox);
    const Meeting_Name = await this.reusablePageClass.generateRandomNumberMeetings();
    await this.webElementActionClass.Send_Keys(this.locatorsPage.meeting_Name_TextBox, Meeting_Name);
    await this.reusablePageClass.MeetingReapeatOptions(index);
    const startTime = await this.locatorsPage.Meeting_bookingdate.inputValue();
    await this.reusablePageClass.selectOptionFromDropdown(this.locatorsPage.Meeting_EndBy, Endby, ElementsName.DropDowns.End_By);
    const endTime = await this.locatorsPage.Meeting_enddate.inputValue();
    console.log("Start Meeting Date:", startTime);
    console.log("End Meeting Date:", endTime);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.meeting_Note_TextBox, "Created New Meeting:" + Meeting_Name);
    return {
      Meeting_Name,
      startTime,
      endTime
    };
  }



  // Method to select the first available date in the next month
  async selectNextMonthFirstAvailableEndDate() {
    // Open the datepicker by clicking the input field
    const datePickerInput = this.page.locator('input#mb_enddate');
    await datePickerInput.click();

    // Wait for calendar popup to appear
    const calendarNextBtn = this.page.locator('.datepicker-days .next');
    await expect(calendarNextBtn).toBeVisible();

    // Click next month arrow
    await calendarNextBtn.click();
    await this.page.waitForTimeout(1000); // wait for calendar to update

    // Select first available date in the next month
    const availableDates = this.page.locator('.datepicker-days td.day:not(.old):not(.new):not(.disabled)');
    const firstAvailable = availableDates.first();

    await firstAvailable.click();

    // Get selected value from input field and log it
    const selectedDate = await datePickerInput.inputValue();

    // Format the date to DD-MM-YYYY if needed (depends on input value format)
    const dateParts = selectedDate.split('-'); // assuming format is 'YYYY-MM-DD' or 'DD-MM-YYYY'

    let formattedDate = selectedDate;
    if (dateParts[0].length === 4) {
      // If format is YYYY-MM-DD
      formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    }

    console.log('Selected Date For End Date Booking :', formattedDate);
  }

  /**
   * Selects the first available end date two months ahead in the datepicker.
   * This method clicks the next button twice to navigate to the month two months ahead,
   * then selects the first available date in that month.
   */

  async selectTwoMonthsAheadFirstAvailableEndDate() {
    // Open the datepicker by clicking the input field
    const datePickerInput = this.page.locator('input#mb_enddate');
    await datePickerInput.click();

    // Wait for calendar popup to appear
    const calendarNextBtn = this.page.locator('.datepicker-days .next');
    await expect(calendarNextBtn).toBeVisible();

    // Click "Next" button twice to go two months ahead
    await calendarNextBtn.click();
    await this.page.waitForTimeout(500); // optional wait
    await calendarNextBtn.click();
    await this.page.waitForTimeout(1000); // wait for calendar to update

    // Select first available date in the 2nd next month
    const availableDates = this.page.locator('.datepicker-days td.day:not(.old):not(.new):not(.disabled)');
    const firstAvailable = availableDates.first();
    await firstAvailable.click();

    // Get selected value from input field and log it
    const selectedDate = await datePickerInput.inputValue();

    // Format the date to DD-MM-YYYY if needed
    const dateParts = selectedDate.split('-'); // assuming 'YYYY-MM-DD' or 'DD-MM-YYYY'

    let formattedDate = selectedDate;
    if (dateParts[0].length === 4) {
      formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    }

    console.log('📅 Selected Date for End Date Booking (2 months ahead):', formattedDate);
  }



  async CheckingBookedMeetingOnCalendar() {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Checking Created Daily Repeat Meeting on This Month...");
    console.log("------------------------------------------------")
    await this.refreshAndCountDaysMeeting();
    const assignedSpots = this.page.locator("//a[contains(@class,'SpotID_assigned')]");
    const count = await assignedSpots.count();
    if (count === 0) {
      console.log("No booked meeting found to release.");
      return false;
    }
    const bookedMeetingDay = await assignedSpots.first().getAttribute('id'); // e.g. "28-05-2025"

    if (bookedMeetingDay) {
      const [year, month, day] = bookedMeetingDay.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day); // Month is 0-indexed

      const shortDay = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
      this.WeekDay = shortDay;
      console.log(`Meeting booked for: ${bookedMeetingDay} ➜ Day: ${shortDay}`);
    } else {
      console.log("Invalid or missing date format.");
    }

    await this.webElementActionClass.Click(assignedSpots.first());
    await this.page.waitForTimeout(1000);
    const popMeetingRoomName = await this.locatorsPage.Meeting_Booked_Room_name_On_Pop.innerText();
    const popBookingStartDate = await this.locatorsPage.Meeting_Booked_Date_On_Pop.innerText();
    console.log(`Total Booked Meetings on This Month: ${count}`);
    console.log(`All Booked Meetings are in Room : ${popMeetingRoomName}`);
    console.log(`Booking Start Date on Pop Up: ${popBookingStartDate}`);
    console.log("\n");
    console.log('Ensuring Created Meeting Room', popMeetingRoomName);
    expect(popMeetingRoomName).toBe(this.RoomName);
    console.log("\n");
    console.log('Ensuring Created Booking Start Date on Pop Up', popBookingStartDate);
    expect(popBookingStartDate).toBe(this.startDate);
    await this.webElementActionClass.Click(this.locatorsPage.Meeting_Cancel_pop_button);
    //await this.reusablePageClass.NavigateToDashboard();
    console.log("=================================================");
  }


  async CheckingBookedMeetingOnCalendarWeekDay() {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Checking Created Monthly Repeat Meeting on This Month...");
    console.log("------------------------------------------------")
    await this.refreshAndCountDaysMeeting();
    const assignedSpots = this.page.locator("//a[contains(@class,'SpotID_assigned')]");
    const count = await assignedSpots.count();
    if (count === 0) {
      console.log("No booked meeting found to release.");
      return false;
    }
    const bookedMeetingDay = await assignedSpots.first().getAttribute('id'); // e.g. "28-05-2025"

    if (bookedMeetingDay) {
      const [year, month, day] = bookedMeetingDay.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day); // Month is 0-indexed

      const shortDay = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
      this.WeekDay = shortDay;
      console.log(`Meeting booked for: ${bookedMeetingDay} ➜ Day: ${shortDay}`);
    } else {
      console.log("Invalid or missing date format.");
    }

    await this.webElementActionClass.Click(assignedSpots.first());
    await this.page.waitForTimeout(1000);
    const popMeetingRoomName = await this.locatorsPage.Meeting_Booked_Room_name_On_Pop.innerText();
    const popBookingStartDate = await this.locatorsPage.Meeting_Booked_Date_On_Pop.innerText();
    console.log(`Total Booked Meetings on This Month: ${count}`);
    console.log(`All Booked Meetings are in Room : ${popMeetingRoomName}`);
    console.log(`Booking Start Date on Pop Up: ${popBookingStartDate}`);
    console.log("\n");
    console.log('Ensuring Created Meeting Room', popMeetingRoomName);
    expect(popMeetingRoomName).toBe(this.RoomName);
    console.log("\n");
    await this.webElementActionClass.Click(this.locatorsPage.Meeting_Cancel_pop_button);
    //await this.reusablePageClass.NavigateToDashboard();
    console.log("=================================================");
  }

  async CheckingBookedMeetingOnCalendarBiWeekDay() {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Checking Created BiWeekly Repeat Meeting on This Month...");
    console.log("------------------------------------------------")
    await this.refreshAndCountDaysMeeting();
    const assignedSpots = this.page.locator("//a[contains(@class,'SpotID_assigned')]");
    const count = await assignedSpots.count();
    if (count === 0) {
      console.log("No booked meeting found to release.");
      return false;
    }
    const bookedMeetingDay = await assignedSpots.first().getAttribute('id'); // e.g. "28-05-2025"
    const bookedMeetingDay2 = await assignedSpots.nth(1).getAttribute('id');
    if (bookedMeetingDay && bookedMeetingDay2) {
      const [year, month, day] = bookedMeetingDay.split('-').map(Number);
      const [year2, month2, day2] = bookedMeetingDay2.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day); // Month is 0-indexed
      const dateObj2 = new Date(year2, month2 - 1, day2);
      const shortDay = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
      const shortDay2 = dateObj2.toLocaleDateString('en-US', { weekday: 'short' });
      this.WeekDay = shortDay;
      this.WeekDay2 = shortDay2;
      console.log(`Meeting booked for Week Day 1: ${bookedMeetingDay} ➜ Day: ${shortDay}`);
      console.log(`Meeting booked for Week Day 2: ${bookedMeetingDay2} ➜ Day: ${shortDay2}`);
    } else {
      console.log("Invalid or missing date format.");
    }

    await this.webElementActionClass.Click(assignedSpots.first());
    await this.page.waitForTimeout(1000);
    const popMeetingRoomName = await this.locatorsPage.Meeting_Booked_Room_name_On_Pop.innerText();
    const popBookingStartDate = await this.locatorsPage.Meeting_Booked_Date_On_Pop.innerText();
    console.log(`Total Booked Meetings on This Month: ${count}`);
    console.log(`All Booked Meetings are in Room : ${popMeetingRoomName}`);
    console.log(`Booking Start Date on Pop Up: ${popBookingStartDate}`);
    console.log("\n");
    console.log('Ensuring Created Meeting Room', popMeetingRoomName);
    expect(popMeetingRoomName).toBe(this.RoomName);
    console.log("\n");
    await this.webElementActionClass.Click(this.locatorsPage.Meeting_Cancel_pop_button);
    //await this.reusablePageClass.NavigateToDashboard();
    console.log("=================================================");
  }

  async refreshAndCountDaysMeeting() {
    // ✅ Get all refresh elements
    await this.page.waitForTimeout(3000);
    const refreshElements = await this.locatorsPage.refreshButton.all();
    //console.log(`Total Refresh Elements For this Month Meeting: ${refreshElements.length}`);


    await this.page.waitForTimeout(2000);

    while (true) {
      const refreshButtons = this.locatorsPage.refreshButton;
      const count = await refreshButtons.count();

      await this.page.waitForTimeout(2000);
      if (count === 0) {
        break;
      }

      const firstButton = refreshButtons.nth(0);

      const isDisabled = await firstButton.evaluate(el => (el as HTMLButtonElement).disabled).catch(() => true);
      const isVisible = await firstButton.isVisible().catch(() => false);

      if (!isDisabled && isVisible) {
        await firstButton.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
        await this.webElementActionClass.Click(firstButton);
        await this.page.waitForTimeout(3000); // small delay between clicks
      }

      else {
        break;
      }
    }



    // // ✅ Count available booking days
    // const availableDays = await this.locatorsPage.availableDays.all();
    // console.log(`Total Available Days for Booking: ${availableDays.length}`);

    // // ✅ Count not available booking days
    // const notAvailableDays = await this.locatorsPage.notAvailableDays.all();
    // console.log(`Total Not Available Days for Booking: ${notAvailableDays.length}`);

    // // ✅ Check if no booking space is available
    // if (availableDays.length === 0) {
    //   // console.error("No space available for booking! Please contact the admin.");
    //   // throw new Error("No space available for booking! Please contact the admin.");
    // }


  }


  async bookWeeklyRepeatMeetingBooking(Participants: string, index: string, Endby: number) {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Booking Weekly Repeat Meeting From Map...");
    console.log("------------------------------------------------")
    await this.releaseAllMeetingsFromMenu();
    await this.reusablePageClass.refreshAndCountDays();
    const todayDateId = dayjs().format('YYYY-MM-DD'); // example: '2025-04-07'
    console.log(`Today Date :- (${todayDateId}).`);
    this.TodayName = new Date(todayDateId).toLocaleDateString('en-US', { weekday: 'short' });
    await this.page.waitForTimeout(2000);
    const availableDays = await this.locatorsPage.availableDaysfromcurrunt.all();
    let clicked = false;

    for (const day of availableDays) {
      const id = await day.getAttribute('id');
      if (id === todayDateId) {
        console.log(`Found today's available spot (${id}). Clicking...`);
        await day.scrollIntoViewIfNeeded();
        await this.webElementActionClass.Click(day);
        console.log("\n");
        console.log("Verifying that the 'Select Vehicle' dropdown is not present \nAnd 'Go To Map Button' is present on the Booking pop-up.");
        //await this.reusablePageClass.assertElementVisible(this.locatorsPage.getRandomSpaceButton, ElementsName.NoMap.Get_Random_Space_btn)
        await this.reusablePageClass.assertElementHidden(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List)
        await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(6000)
        await this.memberdashboardpage.verifyUserOnMapLayout();
        await this.memberdashboardpage.mapLayoutZoneName();
        const spotDetails = await this.reusablePageClass.printMeetingSpotDetails();
        if (spotDetails.allSpotsCount === 0) {
          throw new Error("No Meeting Room available in this zone");
        }
        await this.reusablePageClass.printAvailableDeskSpots();
        await this.page.waitForTimeout(5000);
        const spotId = await this.locatorsPage.parking_allday_all_spots.first().getAttribute('data-spotid');
        this.RoomName = (await this.locatorsPage.parking_allday_all_spots.first().getAttribute('title')) ?? '';
        await this.webElementActionClass.Click(this.locatorsPage.parking_allday_all_spots.first());
        console.log(`Clicking on Meeting Room.... ${this.RoomName}`);
        await this.page.waitForTimeout(3000);
        await this.minutes30MeetingBooking();
        await this.page.waitForTimeout(2000);
        await this.webElementActionClass.Click(this.locatorsPage.meeting_Next_Btn);
        const meetingDetails = await this.dailyRepeatMeetingDetailsOnGrid(index, Endby);
        this.MeetingName = meetingDetails.Meeting_Name;
        this.startDate = meetingDetails.startTime;
        this.endDate = meetingDetails.endTime;
        const dynamicXPath = `//label[contains(text(), '${this.TodayName}')]`;
        const label = await this.page.locator(dynamicXPath);
        console.log(`Select Day For Weekly Repeat Meeting: ${this.TodayName}`);
        await this.webElementActionClass.Click(label);
        await this.webElementActionClass.Click(this.locatorsPage.meeting_Next_Btn2);
        await this.meetingAddParticipants(Participants);
        await this.addGuestuser();
        await this.webElementActionClass.Click(this.locatorsPage.meeting_Confirm_btn);
        console.log(`Clicked on Confirm Meeting Buttom...`);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
        console.log("Success message is displayed for Spot Booked.");
        await this.verifybookedMeetingWithTostMessageOnMap(spotId);
        await this.reusablePageClass.NavigateToDashboard();
        clicked = true;
        break;
      }
    }

    if (!clicked) {
      console.error(`Not able Booking on Currunt Day's spot (${todayDateId})`, error);
      throw new Error(`Not able Booking on Currunt Day's spot (${todayDateId})`)
    }
    console.log("<<================================================================>>");
  }

  async bookBiWeeklyRepeatMeetingBooking(Participants: string, index: string, Endby: number) {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Booking Weekly Repeat Meeting From Map...");
    console.log("------------------------------------------------")
    await this.releaseAllMeetingsFromMenu();
    await this.reusablePageClass.refreshAndCountDays();
    const todayDate = dayjs();
    const tomorrowDate = todayDate.add(1, 'day');

    const todayDateId = todayDate.format('YYYY-MM-DD');
    const tomorrowDateId = tomorrowDate.format('YYYY-MM-DD');

    this.TodayName = todayDate.format('ddd');      // 'Mon', 'Tue', etc.
    this.TomorrowName = tomorrowDate.format('ddd'); // 'Tue', 'Wed', etc.

    console.log(`Today Date :- (${todayDateId}), Weekday :- (${this.TodayName})`);
    console.log(`Tomorrow Date :- (${tomorrowDateId}), Weekday :- (${this.TomorrowName})`);

    await this.page.waitForTimeout(2000);
    await this.page.waitForTimeout(2000);
    const availableDays = await this.locatorsPage.availableDaysfromcurrunt.all();
    let clicked = false;

    for (const day of availableDays) {
      const id = await day.getAttribute('id');
      if (id === todayDateId) {
        console.log(`Found today's available spot (${id}). Clicking...`);
        await day.scrollIntoViewIfNeeded();
        await this.webElementActionClass.Click(day);
        console.log("\n");
        console.log("Verifying that the 'Select Vehicle' dropdown is not present \nAnd 'Go To Map Button' is present on the Booking pop-up.");
        //await this.reusablePageClass.assertElementVisible(this.locatorsPage.getRandomSpaceButton, ElementsName.NoMap.Get_Random_Space_btn)
        await this.reusablePageClass.assertElementHidden(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List)
        await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(6000)
        await this.memberdashboardpage.verifyUserOnMapLayout();
        await this.memberdashboardpage.mapLayoutZoneName();
        const spotDetails = await this.reusablePageClass.printMeetingSpotDetails();
        if (spotDetails.allSpotsCount === 0) {
          throw new Error("No Meeting Room available in this zone");
        }
        await this.reusablePageClass.printAvailableDeskSpots();
        await this.page.waitForTimeout(5000);
        const spotId = await this.locatorsPage.parking_allday_all_spots.first().getAttribute('data-spotid');
        this.RoomName = (await this.locatorsPage.parking_allday_all_spots.first().getAttribute('title')) ?? '';
        await this.webElementActionClass.Click(this.locatorsPage.parking_allday_all_spots.first());
        console.log(`Clicking on Meeting Room.... ${this.RoomName}`);
        await this.page.waitForTimeout(3000);
        await this.minutes30MeetingBooking();
        await this.page.waitForTimeout(2000);
        await this.webElementActionClass.Click(this.locatorsPage.meeting_Next_Btn);
        const meetingDetails = await this.dailyRepeatMeetingDetailsOnGrid(index, Endby);
        this.MeetingName = meetingDetails.Meeting_Name;
        this.startDate = meetingDetails.startTime;
        this.endDate = meetingDetails.endTime;
        const dynamicXPath = `//label[contains(text(), '${this.TodayName}')]`;
        const dynamicXPath2 = `//label[contains(text(), '${this.TomorrowName}')]`;
        const label2 = await this.page.locator(dynamicXPath2);
        const label = await this.page.locator(dynamicXPath);
        console.log(`Select Days For BiWeekly Repeat Meeting: ${this.TodayName} and ${this.TomorrowName}`);
        await this.webElementActionClass.Click(label);
        await this.webElementActionClass.Click(label2);
        await this.webElementActionClass.Click(this.locatorsPage.meeting_Next_Btn2);
        await this.meetingAddParticipants(Participants);
        await this.addGuestuser();
        await this.webElementActionClass.Click(this.locatorsPage.meeting_Confirm_btn);
        console.log(`Clicked on Confirm Meeting Buttom...`);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
        console.log("Success message is displayed for Spot Booked.");
        //await this.verifybookedMeetingWithTostMessageOnMap(spotId);
        await this.reusablePageClass.NavigateToDashboard();
        clicked = true;
        break;
      }
    }

    if (!clicked) {
      console.error(`Not able Booking on Currunt Day's spot (${todayDateId})`, error);
      throw new Error(`Not able Booking on Currunt Day's spot (${todayDateId})`)
    }
    console.log("<<================================================================>>");
  }


  async bookMonthlyRepeatMeetingBooking(Participants: string, index: string, Endby: number) {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Booking Monthly Repeat Meeting From Map...");
    console.log("------------------------------------------------")
    await this.releaseAllMeetingsFromMenu();
    await this.reusablePageClass.refreshAndCountDays();
    const todayDateId = dayjs().format('YYYY-MM-DD'); // example: '2025-04-07'
    console.log(`Today Date :- (${todayDateId}).`);
    this.TodayName = new Date(todayDateId).toLocaleDateString('en-US', { weekday: 'short' });
    await this.page.waitForTimeout(2000);
    const availableDays = await this.locatorsPage.availableDaysfromcurrunt.all();
    let clicked = false;

    for (const day of availableDays) {
      const id = await day.getAttribute('id');
      if (id === todayDateId) {
        console.log(`Found today's available spot (${id}). Clicking...`);
        await day.scrollIntoViewIfNeeded();
        await this.webElementActionClass.Click(day);
        console.log("\n");
        console.log("Verifying that the 'Select Vehicle' dropdown is not present \nAnd 'Go To Map Button' is present on the Booking pop-up.");
        //await this.reusablePageClass.assertElementVisible(this.locatorsPage.getRandomSpaceButton, ElementsName.NoMap.Get_Random_Space_btn)
        await this.reusablePageClass.assertElementHidden(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List)
        await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(6000)
        await this.memberdashboardpage.verifyUserOnMapLayout();
        await this.memberdashboardpage.mapLayoutZoneName();
        const spotDetails = await this.reusablePageClass.printMeetingSpotDetails();
        if (spotDetails.allSpotsCount === 0) {
          throw new Error("No Meeting Room available in this zone");
        }
        await this.reusablePageClass.printAvailableDeskSpots();
        await this.page.waitForTimeout(5000);
        const spotId = await this.locatorsPage.parking_allday_all_spots.first().getAttribute('data-spotid');
        this.RoomName = (await this.locatorsPage.parking_allday_all_spots.first().getAttribute('title')) ?? '';
        await this.webElementActionClass.Click(this.locatorsPage.parking_allday_all_spots.first());
        console.log(`Clicking on Meeting Room.... ${this.RoomName}`);
        await this.page.waitForTimeout(3000);
        await this.minutes30MeetingBooking();
        await this.page.waitForTimeout(2000);
        await this.webElementActionClass.Click(this.locatorsPage.meeting_Next_Btn);
        const meetingDetails = await this.MonthlyRepeatMeetingDetailsOnGrid(index, Endby);
        this.MeetingName = meetingDetails.Meeting_Name;
        this.startDate = meetingDetails.startTime;
        await this.reusablePageClass.selectOptionFromDropdown(this.locatorsPage.Meeting_Monthly_Week_Day_drp, 32, ElementsName.DropDowns.Monthly_Week_Day);
        await this.webElementActionClass.Click(this.locatorsPage.meeting_Next_Btn2);
        await this.meetingAddParticipants(Participants);
        await this.addGuestuser();
        await this.webElementActionClass.Click(this.locatorsPage.meeting_Confirm_btn);
        console.log(`Clicked on Confirm Meeting Buttom...`);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
        console.log("Success message is displayed for Spot Booked.");
        // await this.verifybookedMeetingWithTostMessageOnMap(spotId);
        await this.reusablePageClass.NavigateToDashboard();
        clicked = true;
        break;
      }
    }

    if (!clicked) {
      console.error(`Not able Booking on Currunt Day's spot (${todayDateId})`, error);
      throw new Error(`Not able Booking on Currunt Day's spot (${todayDateId})`)
    }
    console.log("<<================================================================>>");
  }


  async rescheduleAndReleaseMeetingFromMenu(repeat: string) {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Reschedule Day Meeting ...");
    console.log("------------------------------------------------")
    await this.page.waitForTimeout(2000);
    await this.navigateToMeetingTab();
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.Meeting_Search);
    console.log("\n");
    console.log('Search Recently Created Meeting: ' + this.MeetingName)
    await this.webElementActionClass.Send_Keys(this.locatorsPage.Meeting_Search, this.MeetingName);
    await this.page.waitForTimeout(5000);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.First_Name_Meeting_Main_Menu);
    const MeetingName = await this.locatorsPage.First_Name_Meeting_Main_Menu.innerText(); // or use innerText() for rendered text
    console.log("\n");
    console.log('Find First Meeting Name is:', MeetingName);
    console.log('Verifying Created Meeting Name on Meeting Tab');
    expect(this.MeetingName).toBe(MeetingName);
    const first_meeting_repeat_option = await this.locatorsPage.Meeting_Repeat_Option.innerText();
    console.log("\n");
    console.log('Find First Meeting Repeat Option is:', first_meeting_repeat_option);
    console.log('Verifying Created Meeting Repeat Option on Meeting Tab');
    expect(repeat).toBe(first_meeting_repeat_option);
    console.log("\n");
    const StartDate = await this.locatorsPage.Meeting_Start_Date.innerText();

    const BeforeStartTime = await this.locatorsPage.Meeting_Start_Time_On_Tab.innerText();
    const BeforeEndTime = await this.locatorsPage.Meeting_End_Time_On_Tab.innerText();


    // Convert '21-05-2025' to '2025-05-21'
    const [day, month, year] = StartDate.split("-");
    const formattedStartDate = `${year}-${month}-${day}`;

    if (this.startDate !== undefined) {
      console.log('Verified Start Date:', formattedStartDate);
      expect(formattedStartDate).toBe(this.startDate);
    } else {
      console.log('Skipping start date assertion: this.startDate is undefined');
    }

    const EndDateRaw = await this.locatorsPage.Meeting_End_Date.innerText();
    const EndDate = EndDateRaw.trim();
    console.log('Ensuring Created Booking Start Date on Meeting Tab', StartDate);
    console.log('Ensuring Created Booking End Date on Meeting Tab:', EndDate);
    console.log("\n");
    // Convert '21-05-2025' -> '2025-05-21'
    const [endDay, endMonth, endYear] = EndDate.split("-");
    const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;
    if (this.endDate !== undefined) {
      console.log('Verified End Date:', formattedEndDate);
      expect(formattedEndDate).toBe(this.endDate);
    } else {
      console.log('Skipping end date assertion: this.endDate is undefined');
    }
    console.log("\n");
    console.log('Right Scrolling...');
    await this.scrollRightUntilVisible(this.locatorsPage.Meeting_Reschedule_Btn);
    console.log("\n");
    console.log('Clicked On Reschedule Meeting Button..');
    await this.webElementActionClass.Click(this.locatorsPage.Meeting_Reschedule_Btn);
    await this.page.waitForTimeout(2000);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.Meeting_Rescheduled_Name);
    const PopupMettingNameRescheduled = await this.locatorsPage.Meeting_Rescheduled_Name.innerText(); // or use innerText() for rendered text
    console.log('Verifying Meeting Name on Rescheduled Meeting PopUp:', PopupMettingNameRescheduled);
    await this.rescheduleMeetingTimeFromMenu(0);
    await this.page.waitForTimeout(5000);
    const RescheduledStartTime = await this.locatorsPage.Meeting_Start_Time_On_Tab.innerText();
    const RescheduledEndTime = await this.locatorsPage.Meeting_End_Time_On_Tab.innerText();
    console.log("\n");
    console.log('Ensuring Created Meeting Booking Start Time ', BeforeStartTime);
    console.log('Ensuring Created Meeting Booking End Time', BeforeEndTime);
    console.log("\n");
    console.log('Ensuring Rescheduled Meeting Booking Start Time on Meeting Tab', RescheduledStartTime);
    console.log('Ensuring Rescheduled Meeting Booking End Time on Meeting Tab', RescheduledEndTime);
    console.log("\n");

    if (
      RescheduledStartTime !== BeforeStartTime ||
      RescheduledEndTime !== BeforeEndTime
    ) {
      console.log("\n");
      console.log('✅ Meeting was successfully rescheduled.');
      console.log(`Meeting: ${MeetingName} | Repeat Option: ${first_meeting_repeat_option} | Date: ${StartDate}`);
      console.log("\n");
      console.log('Before Rescheduled Start Time:', BeforeStartTime, 'After Rescheduled Start Time:', RescheduledStartTime);
      console.log('Before Rescheduled End Time:', BeforeEndTime, 'After Rescheduled End Time:', RescheduledEndTime);
    } else {
      console.error('❌ Meeting reschedule failed or no changes were made.');
    }
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Cancel Currunt Day Meeting ...");
    console.log("------------------------------------------------")
    console.log('Right Scrolling...');
    await this.scrollRightUntilVisible(this.locatorsPage.First_Meeting_Cancel);
    console.log("\n");
    console.log('Clicked On Cancel Meeting Button..');
    await this.webElementActionClass.Click(this.locatorsPage.First_Meeting_Cancel);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.Meeting_Cancel_pop_name);
    const PopupMettingName = await this.locatorsPage.Meeting_Cancel_pop_name.innerText(); // or use innerText() for rendered text
    console.log('Verifying Meeting Name on Cancel Meeting PopUp:', PopupMettingName);
    await this.webElementActionClass.Click(this.locatorsPage.Meeting_Cancel_pop_Confirm);
    console.log("Meeting Cancel...Successfully");
    await this.page.waitForTimeout(2000);
    console.log("<<================================================================>>");
  }

  async rescheduleMeetingTimeFromMenu(index: number) {
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.Meeting_Start_Time_Drp_On_PopUp);
    if (await this.locatorsPage.Meeting_Rescheduled_Booking_Option.isVisible()) {
      await this.reusablePageClass.selectOptionFromDropdown(this.locatorsPage.Meeting_Rescheduled_Booking_Option, index, ElementsName.DropDowns.Rescheduled_Booking_Option);
    } else {
      console.log("Meeting Rescheduled Booking Option is not available");
    }
    await this.reusablePageClass.selectOptionFromDropdown(this.locatorsPage.Meeting_Start_Time_Drp_On_PopUp, 2, ElementsName.DropDowns.Start_Time);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.Meeting_End_Time_Drp_On_PopUp);
    await this.reusablePageClass.selectOptionFromDropdown(this.locatorsPage.Meeting_End_Time_Drp_On_PopUp, 3, ElementsName.DropDowns.End_Time);
    await this.webElementActionClass.Click(this.locatorsPage.Meeting_Rescheduled_Confirm_Btn);
    console.log("Meeting Reschedule...Successfully");
  }

  async rescheduleReleaseWeekDayMeetingFromMenu(repeat: string) {
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Reschedule Day Meeting ...");
    console.log("------------------------------------------------")
    await this.page.waitForTimeout(2000);
    await this.navigateToMeetingTab();
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.Meeting_Search);
    console.log("\n");
    console.log('Search Recently Created Meeting: ' + this.MeetingName)
    await this.webElementActionClass.Send_Keys(this.locatorsPage.Meeting_Search, this.MeetingName);
    await this.page.waitForTimeout(5000);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.First_Name_Meeting_Main_Menu);
    const MeetingName = await this.locatorsPage.First_Name_Meeting_Main_Menu.innerText(); // or use innerText() for rendered text
    console.log("\n");
    console.log('Find First Meeting Name is:', MeetingName);
    console.log('Verifying Created Meeting Name on Meeting Tab');
    expect(this.MeetingName).toBe(MeetingName);
    const first_meeting_repeat_option = await this.locatorsPage.Meeting_Repeat_Option.innerText();
    console.log("\n");
    console.log('Find First Meeting Repeat Option is:', first_meeting_repeat_option);
    console.log('Verifying Created Meeting Repeat Option on Meeting Tab');
    expect(repeat).toBe(first_meeting_repeat_option);
    console.log("\n");
    const StartDate = await this.locatorsPage.Meeting_Start_Date.innerText();

    const BeforeStartTime = await this.locatorsPage.Meeting_Start_Time_On_Tab.innerText();
    const BeforeEndTime = await this.locatorsPage.Meeting_End_Time_On_Tab.innerText();

    console.log("\n");
    console.log('Right Scrolling...');
    await this.scrollRightUntilVisible(this.locatorsPage.Meeting_Reschedule_Btn);
    console.log("\n");
    console.log('Clicked On Reschedule Meeting Button..');
    await this.webElementActionClass.Click(this.locatorsPage.Meeting_Reschedule_Btn);
    await this.page.waitForTimeout(2000);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.Meeting_Rescheduled_Name);
    const PopupMettingNameRescheduled = await this.locatorsPage.Meeting_Rescheduled_Name.innerText(); // or use innerText() for rendered text
    console.log('Verifying Meeting Name on Rescheduled Meeting PopUp:', PopupMettingNameRescheduled);
    await this.rescheduleMeetingTimeFromMenu(0);
    await this.page.waitForTimeout(5000);
    const RescheduledStartTime = await this.locatorsPage.Meeting_Start_Time_On_Tab.innerText();
    const RescheduledEndTime = await this.locatorsPage.Meeting_End_Time_On_Tab.innerText();
    console.log("\n");
    console.log('Ensuring Created Meeting Booking Start Time ', BeforeStartTime);
    console.log('Ensuring Created Meeting Booking End Time', BeforeEndTime);
    console.log("\n");
    console.log('Ensuring Rescheduled Meeting Booking Start Time on Meeting Tab', RescheduledStartTime);
    console.log('Ensuring Rescheduled Meeting Booking End Time on Meeting Tab', RescheduledEndTime);
    console.log("\n");

    if (
      RescheduledStartTime !== BeforeStartTime ||
      RescheduledEndTime !== BeforeEndTime
    ) {
      console.log("\n");
      console.log('✅ Meeting was successfully rescheduled.');
      console.log(`Meeting: ${MeetingName} | Repeat Option: ${first_meeting_repeat_option} | Date: ${StartDate}`);
      console.log("\n");
      console.log('Before Rescheduled Start Time:', BeforeStartTime, 'After Rescheduled Start Time:', RescheduledStartTime);
      console.log('Before Rescheduled End Time:', BeforeEndTime, 'After Rescheduled End Time:', RescheduledEndTime);
    } else {
      console.error('❌ Meeting reschedule failed or no changes were made.');
    }
    console.log("\n");
    console.log("------------------------------------------------");
    console.log("Cancel Currunt Day Meeting ...");
    console.log("------------------------------------------------")
    console.log('Right Scrolling...');
    await this.scrollRightUntilVisible(this.locatorsPage.First_Meeting_Cancel);
    console.log("\n");
    console.log('Clicked On Cancel Meeting Button..');
    await this.webElementActionClass.Click(this.locatorsPage.First_Meeting_Cancel);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.Meeting_Cancel_pop_name);
    const PopupMettingName = await this.locatorsPage.Meeting_Cancel_pop_name.innerText(); // or use innerText() for rendered text
    console.log('Verifying Meeting Name on Cancel Meeting PopUp:', PopupMettingName);
    await this.webElementActionClass.Click(this.locatorsPage.Meeting_Cancel_pop_Confirm);
    console.log("Meeting Cancel...Successfully");
    await this.page.waitForTimeout(2000);
    console.log("<<================================================================>>");

  }

}









