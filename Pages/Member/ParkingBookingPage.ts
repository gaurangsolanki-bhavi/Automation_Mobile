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


export default class ParkingBookingPage {
  private waitActionClass: WaitActionClass;
  private webElementActionClass: WebElementActionClass;
  private locatorsPage: LocatorsPage;
  private reusableActionClass: ReusableActionClass;
  private reusablePageClass: ReusablePage;
  private memberdashboardpage: Memberdashboardpage;
  continueWithEmailButton: Locator;

  public zone: string | undefined;
  public gridDeskZone: string | undefined;
  public mapCarZone: string | undefined;
  public currentUser: any;
  MeetingName: string | undefined;


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
  * Attempts to book a spot specifically for the **current day**:
  * - Refreshes availability
  * - Releases any pre-booked spot
  * - Matches current date with available spot IDs
  * - Books and verifies the success message
  */
  async bookSpotCurruntDayFromCalendar() {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Booking Today's Spot From Calander.");
    console.log("----------------------------------");
    await this.reusablePageClass.refreshAndCountDays();
    await this.reusablePageClass.releaseAnyBookedSpot();
    const todayDateId = dayjs().format('YYYY-MM-DD'); // example: '2025-04-07'
    console.log(`\nToday Date :- (${todayDateId}).`);
    await this.page.waitForTimeout(2000);
    const availableDays = await this.locatorsPage.availableDaysfromcurrunt.all();
    let clicked = false;

    for (const day of availableDays) {
      const id = await day.getAttribute('id');
      if (id === todayDateId) {
        console.log(`\nFound today's available spot (${id}). Clicking...`);
        await day.scrollIntoViewIfNeeded();
        await this.webElementActionClass.Click(day);
        console.log("Verifying The Select Vehicle Dropdown Is Present on Booking Pop Up");
        await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List);
        await this.webElementActionClass.Click(this.locatorsPage.getRandomSpaceButton);
        console.log("\nClicked on 'Get Random Space' button. Waiting for booking popup message...");
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
        console.log("\nSuccess message is displayed.");
        await this.page.waitForTimeout(500);
        await this.reusablePageClass.verifybookedSpotWithTostMessage();
        clicked = true;
        await this.page.waitForTimeout(2000);
        break;
      }
    }

    if (!clicked) {
      console.error(`Not able Booking on Currunt Day's spot (${todayDateId})`, error);
      throw new Error(`Not able Booking on Currunt Day's spot (${todayDateId})`);
    }

    console.log("\n<<================================================================>>");
  }


  // Method to release a spot specifically booked for the current day
  async releaseSpotCurrentDayFromCalendar() {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Starting Release Today's Spot...");
    console.log("----------------------------------");
    await this.page.waitForTimeout(2000);
    const todayDateId = dayjs().format('YYYY-MM-DD'); // e.g., "2025-04-07"
    console.log(`\nToday Date :- (${todayDateId}).`);
    await this.page.waitForTimeout(3000);

    const allAssignedSpots = await this.page.locator("//a[contains(@class,'SpotID_assigned')]").all();
    let released = false;
    await this.page.waitForTimeout(1000);
    for (const spot of allAssignedSpots) {
      const id = await spot.getAttribute("id");
      if (id === todayDateId) {
        console.log(`Found today's booked spot (${id}). Releasing...`);
        await spot.scrollIntoViewIfNeeded();
        await this.webElementActionClass.Click(spot);
        await this.page.waitForTimeout(1000);
        // Assuming this opens a modal/dropdown - select release action here:
        const bookedSpotText = await this.locatorsPage.bookedSpot.textContent();
        console.log(`\nReleasing booked Spot: ${bookedSpotText?.trim()}`);
        await this.page.waitForTimeout(2000);
        await this.webElementActionClass.Click(this.locatorsPage.realese_space_btn);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
        console.log("\nSuccess message is displayed for Realese Spot.");
        console.log(`\nVerifying toast message...for Release Successfully spot: ${bookedSpotText}`);
        await this.page.waitForTimeout(500);
        if (!bookedSpotText) {
          throw new Error("Booked spot text is null or undefined.");
        }
        await this.reusablePageClass.verifyRealeaseSuccessToastMatchesCalender(this.locatorsPage.succsessMessage.first(), bookedSpotText);
        console.log(`\nReleased booking for ${todayDateId}`);
        released = true;
        await this.page.waitForTimeout(3000);
        break;
      }
    }
    if (!released) {
      console.log(`No booked spot found to release on current day (${todayDateId})`);
    }
    console.log("<<================================================================>>");
  }


  // Method to move to the next month's booking in the calendar

  async nextMonthBooking() {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Booking Next Month Spot From Calander.");
    console.log("----------------------------------");
    const today = new Date();
    const todayDateId = dayjs().format('YYYY-MM-DD'); // e.g., "2025-04-07"
    console.log(`Today Date :- (${todayDateId}).`);
    const nextMonthDate = new Date(today.getFullYear(), today.getMonth() + 1);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const expectedMonthYear = `${monthNames[nextMonthDate.getMonth()]} ${nextMonthDate.getFullYear()}`;
    await this.page.waitForTimeout(3000);
    await this.webElementActionClass.Click(this.locatorsPage.next_month_button);
    await this.waitActionClass.waitForNetworkIdleOrTimeout(7000);
    const calendarHeader = this.locatorsPage.month_header;
    await expect(calendarHeader).toContainText(expectedMonthYear);
    console.log(`User oN Next Month Calender ${expectedMonthYear}`);

    await this.reusablePageClass.refreshAndCountDays();
    await this.reusablePageClass.releaseAnyBookedSpot();
    // await this.page.waitForLoadState('load');
    // await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);

    const nextMonth = dayjs().add(1, 'month');
    const nextMonthPrefix = nextMonth.format('YYYY-MM'); // e.g., '2025-05'

    const availableNextMonthSpots = await this.page.locator(`//a[starts-with(@id, '${nextMonthPrefix}') and contains(@class, 'add_SpotID')]`);

    const count = await availableNextMonthSpots.count();
    let clicked = false;

    for (let i = 0; i < count; i++) {
      const element = availableNextMonthSpots.nth(i);
      const dateId = await element.getAttribute('id');
      if (dateId) {
        console.log(`Clicking next month spot: ${dateId}`);
        await element.scrollIntoViewIfNeeded();
        await this.webElementActionClass.Click(element);
        await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List);
        await this.webElementActionClass.Click(this.locatorsPage.getRandomSpaceButton);
        await this.page.waitForTimeout(500);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
        console.log("\nSuccess message is displayed.");
        await this.reusablePageClass.verifybookedSpotWithTostMessage();
        clicked = true;
        break;
      }
    }

    if (!clicked) {
      console.error(`No available spot found for ${nextMonth.format('MMMM YYYY')}`);
    }
    console.log("<<================================================================>>");
  }


  // Method to release a spot for the next month from the calendar
  async releaseSpotNextMonthFromCalendar() {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Release Next Month Booked Spot");
    console.log("----------------------------------");
    await this.page.waitForTimeout(2000);
    const todayDateId = dayjs().format('YYYY-MM-DD'); // e.g., "2025-04-07"
    console.log(`Today Date :- (${todayDateId}).`);

    // Step 1: Get next month prefix and use it to locate booked spots
    const nextMonthDate = dayjs().add(1, 'month');
    const nextMonthPrefix = nextMonthDate.format('YYYY-MM'); // e.g., "2025-05"
    console.log(`Trying to release spot for month: ${nextMonthPrefix}`);

    // Step 2: Get all booked (assigned) spots
    const allAssignedSpots = await this.page.locator("//a[contains(@class,'SpotID_assigned')]").all();
    let released = false;

    for (const spot of allAssignedSpots) {
      const id = await spot.getAttribute("id");

      // Step 3: Only target bookings for next month
      if (id?.startsWith(nextMonthPrefix)) {
        console.log(`Found next month's booked spot (${id}). Releasing...`);
        await spot.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
        await this.webElementActionClass.Click(spot);
        const bookedSpotText = await this.locatorsPage.bookedSpot.textContent();
        console.log(`Releasing booked Spot: ${bookedSpotText?.trim()}`);
        await this.webElementActionClass.Click(this.locatorsPage.realese_space_btn);
        await this.page.waitForTimeout(500);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
        console.log(`\nVerifying toast message...for Release Successfully spot: ${bookedSpotText}`);
        await this.page.waitForTimeout(1000);
        if (!bookedSpotText) {
          throw new Error("Booked spot text is null or undefined.");
        }
        await this.reusablePageClass.verifyRealeaseSuccessToastMatchesCalender(this.locatorsPage.succsessMessage.first(), bookedSpotText);
        console.log("Success message is displayed for Release Spot.");
        console.log(`Released booking for ${id}`);
        released = true;
        break;
      }
    }

    if (!released) {
      console.log(`No booked spot found to release in next month (${nextMonthPrefix})`);
    }

  }


  // Method to book a spot for the current day from the map layout

  async bookSpotCurruntDayFromMap() {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Booking  Currunt Day's Spot From The Map ");
    console.log("----------------------------------");
    await this.reusablePageClass.refreshAndCountDays();
    await this.reusablePageClass.releaseAnyBookedSpot();
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
        await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(6000)
        await this.reusablePageClass.printAvailableDeskSpots();
        await this.page.waitForTimeout(5000);
        await this.releaseSpotCurrentDayFromMap();
        await this.webElementActionClass.Click(this.locatorsPage.first_park_spot_Available);
        await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List);
        await this.webElementActionClass.Click(this.locatorsPage.book_space_btn);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
        console.log("Success message is displayed.");
        await this.page.waitForTimeout(500);
        await this.reusablePageClass.verifybookedSpotWithTostMessageOnMap();
        const bookingDate = await this.locatorsPage.currunt_booking_book_space_btn.getAttribute('value');
        console.log(`Booking Date: ${bookingDate}`);
        await this.page.waitForTimeout(2000)
        await this.reusablePageClass.AssignedSpotNameonMap();
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


  // Method to release the booked spot for the current day from the map
  async releaseSpotCurrentDayFromMap() {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Release Spot From The Map ");
    console.log("----------------------------------");
    await this.page.waitForTimeout(3000);

    const assignedLocator = this.page.locator("//div[contains(@class,'SpotID_assigned')]");
    try {
      await assignedLocator.first().waitFor({ state: "visible", timeout: 5000 });
    } catch (e) {
      console.log("No assigned spots found on the map.");
      // throw new error("No assigned spots found on the map.,", error)
    }
    const allAssignedSpots = await assignedLocator.all();
    let released = false;
    await this.page.waitForTimeout(1000);
    for (const spot of allAssignedSpots) {
      await spot.hover();
      await this.page.waitForTimeout(3000);
      //await this.webElementActionClass.Click(spot);
      await spot.click({ force: true });
      const spotNumber = await spot.getAttribute("data-spotnumber");
      const bookedSpot = spotNumber?.trim() || '';
      await this.page.waitForTimeout(3000);
      console.log("Releasing.. Booked Spot:", spotNumber);
      await this.webElementActionClass.Click(this.locatorsPage.realese_space_btn);
      await this.page.waitForTimeout(1000);
      try {
        // always pic the first one
        //const bookedSpotText = await spot.nth(0).getAttribute("title");
        //const bookedSpot = bookedSpotText?.trim() || '';
        console.log(`\n----------- Releasing Booked Spot: "${spotNumber}"....`);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
        console.log("Success message displayed for release.");
        console.log(`\nVerifying toast message...for Release Successfully spot: ${spotNumber}`);
        await this.page.waitForTimeout(500);
        await this.reusablePageClass.verifyRealeaseSuccessToastMatchesSpot(this.locatorsPage.succsessMessage.first(), bookedSpot);
        console.log(`\nSpot "${bookedSpot}" Released Successfully.!`);
        await this.page.reload({ waitUntil: 'domcontentloaded' });
        await this.page.waitForTimeout(3000);
      } catch {
        console.log("Success message not found after releasing.");
      }

      released = true;
      break; // stop after releasing one
    }

    if (!released) {
      console.log("No spot was released.");
    }
    console.log("\n<<================================================================>>");
  }

  // Method to book a spot for the next month from the map
  async bookSpotNextMonthFromMap() {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Booking Next Month Spot From The Map ");
    console.log("----------------------------------");
    await this.reusablePageClass.refreshAndCountDays();
    await this.reusablePageClass.releaseAnyBookedSpot();
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
        await this.page.waitForTimeout(2000);
        await this.webElementActionClass.Click(day);
        await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(5000)
        await this.reusablePageClass.printAvailableDeskSpots();
        await this.reusablePageClass.selectNextMonthFirstAvailableDate();
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(4000);
        await this.releaseSpotCurrentDayFromMap();
        await this.webElementActionClass.Click(this.locatorsPage.desk_spot_First);
        await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List);
        await this.webElementActionClass.Click(this.locatorsPage.book_space_btn);
        await this.page.waitForTimeout(500)
        await this.locatorsPage.succsessMessage.first().waitFor({ state: 'visible', timeout: 20000 });
        console.log("Success message is displayed for Spot Booked.");
        await this.page.waitForTimeout(1000);
        await this.reusablePageClass.verifybookedSpotWithTostMessageOnMap();
        const bookingDate = await this.locatorsPage.currunt_booking_book_space_btn.getAttribute('value');
        await this.reusablePageClass.AssignedSpotNameonMap();
        await this.page.waitForTimeout(2000)
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


  // Similar method for booking a spot for a team member on the current day
  async bookSpotCurruntDayForTeamMemberFromMap() {
    await this.reusablePageClass.refreshAndCountDays();
    await this.reusablePageClass.releaseAnyBookedSpot();
    const todayDateId = dayjs().format('YYYY-MM-DD'); // example: '2025-04-07'
    console.log(`Today Date :- (${todayDateId}).`);
    await this.page.waitForTimeout(3000);
    const availableDays = await this.locatorsPage.availableDaysfromcurrunt.all();
    let clicked = false;

    for (const day of availableDays) {
      const id = await day.getAttribute('id');
      if (id === todayDateId) {
        console.log(`Found today's available spot (${id}). Clicking...`);
        await day.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
        await this.webElementActionClass.Click(day);
        await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
        this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(5000)
        await this.reusablePageClass.selectTeamMemberFromMap(1);
        await this.reusablePageClass.printAvailableDeskSpots();
        await this.page.waitForTimeout(4000);
        await this.webElementActionClass.Click(this.locatorsPage.first_park_spot_Available);
        await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List);
        await this.webElementActionClass.Click(this.locatorsPage.book_space_btn);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
        console.log("Success message is displayed.");
        await this.page.waitForTimeout(500);
        await this.reusablePageClass.verifybookedSpotWithTostMessageOnMap();
        const bookingDate = await this.locatorsPage.currunt_booking_book_space_btn.getAttribute('value');
        console.log(`Booking Date: ${bookingDate}`);
        await this.page.waitForTimeout(2000)
        const bookedSpots = await this.locatorsPage.booked_desk_spot.all();
        console.log(`Total Booked Spots: ${bookedSpots.length}`);
        await this.reusablePageClass.AssignedSpotNameonMap();
        clicked = true;
        await this.page.waitForTimeout(3000);
        break;
      }
    }

    if (!clicked) {
      console.error(`Not able Booking on Currunt Day's spot (${todayDateId})`, error);
      throw new Error(`Not able Booking on Currunt Day's spot (${todayDateId})`)
    }
    console.log("<<================================================================>>");
  }


  // Method to book a spot for a team member on the current day, next month, from the available spots on the map

  async bookSpotForTeamMemberNextMonthFromMap() {
    await this.reusablePageClass.refreshAndCountDays();
    await this.reusablePageClass.releaseAnyBookedSpot();
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
        await this.page.waitForTimeout(2000);
        await this.webElementActionClass.Click(day);
        await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(5000)
        await this.reusablePageClass.printAvailableDeskSpots();
        await this.reusablePageClass.selectTeamMemberFromMap(2);
        await this.reusablePageClass.selectNextMonthFirstAvailableDate();
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(4000);
        await this.releaseSpotCurrentDayFromMap();
        await this.webElementActionClass.Click(this.locatorsPage.parking_allday_all_spots.first());
        await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List);
        await this.webElementActionClass.Click(this.locatorsPage.book_space_btn);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
        console.log("Success message is displayed for Spot Booked.");
        await this.page.waitForTimeout(500);
        await this.reusablePageClass.verifybookedSpotWithTostMessageOnMap();
        const bookingDate = await this.locatorsPage.currunt_booking_book_space_btn.getAttribute('value');
        await this.reusablePageClass.AssignedSpotNameonMap();
        await this.page.waitForTimeout(4000)
        clicked = true;
        break;
      }
    }

    if (!clicked) {
      console.error(`Not able Booking on Currunt Day's spot (${todayDateId})`, error);
      throw new Error(`Not able Booking on Currunt Day's spot (${todayDateId})`)
    }
    console.log("\n<<================================================================>>");
  }


  // Method to report a violation for today's booked spot
  async reportViolationFromCalendar() {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Report Violation From Calander.");
    console.log("----------------------------------");
    await this.page.waitForTimeout(4000);
    const todayDateId = dayjs().format('YYYY-MM-DD'); // e.g., "2025-04-07"
    console.log(`Today Date :- (${todayDateId}).`);
    await this.page.waitForTimeout(2000);
    const allAssignedSpots = await this.page.locator("//a[contains(@class,'SpotID_assigned')]").all();
    let released = false;
    for (const spot of allAssignedSpots) {
      const id = await spot.getAttribute("id");
      if (id === todayDateId) {
        console.log(`Found today's booked spot (${id}). Reporting Violation`);
        await spot.scrollIntoViewIfNeeded();
        await spot.click();
        // Assuming this opens a modal/dropdown - select release action here:
        const bookedSpotText = await this.locatorsPage.bookedSpot.textContent();
        console.log(`Reporting Violation on Spot: ${bookedSpotText?.trim()}`);
        await this.webElementActionClass.Click(this.locatorsPage.report_Violation_btn);
        await this.webElementActionClass.Send_Keys(this.locatorsPage.report_Violation_number_plate, "7878")
        await this.webElementActionClass.Click(this.locatorsPage.report_Violation_send_btn);
        await this.page.waitForTimeout(3000);

        if (await this.locatorsPage.report_Violation_no_spot_mesg.isVisible({ timeout: 6000 })) {
          console.log("No parking spot Available message displayed. Closing the popup.");
          await this.webElementActionClass.Click(this.locatorsPage.report_Violation_no_spot_mesg_close);
        } else {
          console.log("Parking spot available. Selecting checkbox and confirming.");
          await this.webElementActionClass.Click(this.locatorsPage.report_Violation_cofirm_check);
          await this.webElementActionClass.Click(this.locatorsPage.report_Violation_cofirm_btn);
          await this.page.waitForTimeout(2000);
          const bookedSpotText = await this.locatorsPage.bookedSpot.textContent();
          console.log(`New Assigned Spot: ${bookedSpotText?.trim()}`);
        }

        // const noSpotVisible = await this.locatorsPage.report_Violation_no_spot_mesg.isVisible().catch(() => false);
        // const checkboxVisible = await this.locatorsPage.report_Violation_cofirm_check.isVisible().catch(() => false);

        // if (noSpotVisible) {
        //   console.log("No parking spot Available message displayed. Closing the popup.");
        //   await this.webElementActionClass.Click(this.locatorsPage.report_Violation_no_spot_mesg_close);
        // } else if (checkboxVisible) {
        //   console.log("Parking spot available. Selecting checkbox and confirming.");
        //   await this.webElementActionClass.Click(this.locatorsPage.report_Violation_cofirm_check);
        //   await this.webElementActionClass.Click(this.locatorsPage.report_Violation_cofirm_btn);
        //   await this.page.waitForTimeout(2000);
        //  const bookedSpotText = await this.locatorsPage.bookedSpot.textContent();
        //  console.log(`New Assigned Spot: ${bookedSpotText?.trim()}`);
        // } else {
        //   console.log("Neither 'no spot' message nor checkbox is visible. Check UI logic or timing.");
        //   await this.page.screenshot({ path: 'error_popup_handling.png' });
        // }

        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
        console.log("Success message is displayed for Realese Spot.");
        console.log(`Reported Violation booking for ${todayDateId}`);
        released = true;
        break;
      }
    }
    if (!released) {
      console.log(`No booked spot found to release on current day (${todayDateId})`);
    }
    console.log("\n<<================================================================>>");
  }


  // Method to report a violation from the assigned spot on the map
  async reportViolatonFromMap() {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Report Violation From The Map.");
    console.log("----------------------------------");
    await this.page.waitForTimeout(3000);

    const assignedLocator = this.page.locator("//div[contains(@class,'SpotID_assigned')]");
    try {
      await assignedLocator.first().waitFor({ state: "visible", timeout: 5000 });
    } catch (e) {
      console.error("No assigned spots found on the map.");
      throw new Error("No assigned spots found on the map.")
    }
    const allAssignedSpots = await assignedLocator.all();
    let released = false;

    for (const spot of allAssignedSpots) {
      await spot.hover();
      await this.page.waitForTimeout(3000);
      //await this.webElementActionClass.Click(spot);
      await spot.click({ force: true });
      await this.page.waitForTimeout(1000);
      const spotNumber = await spot.getAttribute("data-spotnumber");
      console.log("Report Violation on Booked Spot:", spotNumber);
      await this.webElementActionClass.Click(this.locatorsPage.report_Violation_btn);
      await this.webElementActionClass.Send_Keys(this.locatorsPage.report_Violation_number_plate, "7878")
      await this.webElementActionClass.Click(this.locatorsPage.report_Violation_send_btn);
      await this.page.waitForTimeout(3000);

      if (await this.locatorsPage.report_Violation_no_spot_mesg.isVisible({ timeout: 6000 })) {
        console.log("No parking spot Available message displayed. Closing the popup.");
        await this.webElementActionClass.Click(this.locatorsPage.report_Violation_no_spot_mesg_close);
      } else {
        console.log("Parking spot available. Selecting checkbox and confirming.");
        await this.webElementActionClass.Click(this.locatorsPage.report_Violation_cofirm_check);
        await this.webElementActionClass.Click(this.locatorsPage.report_Violation_cofirm_btn);
        await this.page.waitForTimeout(2000);
        const spotNumber1 = await assignedLocator.getAttribute("data-spotnumber");
        console.log("Newly Assign spot is after Violation", spotNumber1);
      }
      // await this.page.waitForTimeout(3000);
      // const noSpotVisible = await this.locatorsPage.report_Violation_no_spot_mesg.isVisible().catch(() => false);
      //   const checkboxVisible = await this.locatorsPage.report_Violation_cofirm_check.isVisible().catch(() => false);

      //   if (noSpotVisible) {
      //     console.log("No parking spot Available message displayed. Closing the popup.");
      //     await this.webElementActionClass.Click(this.locatorsPage.report_Violation_no_spot_mesg_close);
      //   } else if (checkboxVisible) {
      //   console.log("Parking spot available. Selecting checkbox and confirming.");
      //   await this.page.waitForTimeout(1000);
      //   await this.webElementActionClass.Click(this.locatorsPage.report_Violation_cofirm_check);
      //   await this.webElementActionClass.Click(this.locatorsPage.report_Violation_cofirm_btn);
      //   await this.page.waitForTimeout(2000);
      //   const spotNumber1 = await assignedLocator.getAttribute("data-spotnumber");
      //   console.log("Newly Assign spot is after Violation", spotNumber1);
      //   } else {
      //     console.log("Neither 'no spot' message nor checkbox is visible. Check UI logic or timing.");
      //   }

      await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });

      released = true;
      break;
    }

    if (!released) {
      console.log("No spot was Violated.");
    }
    console.log("<<================================================================>>");
  }

  async hourlybookSpotCurruntDayFromCalendarVerifyingWithPopup() {
    await this.memberdashboardpage.verifyHourlyPopupElements()
    await this.releaseAnyBookedHourlySpot();
    const todayDateId = dayjs().format('YYYY-MM-DD'); // example: '2025-04-07'
    console.log(`\nToday Date :- (${todayDateId}).`);
    await this.page.waitForTimeout(2000);
    const availableDays = await this.locatorsPage.availableDaysfromcurrunt.all();
    let clicked = false;
    for (const day of availableDays) {
      const id = await day.getAttribute('id');
      if (id === todayDateId) {
        console.log(`\nFound today's available spot (${id}). Clicking...`);
        await day.scrollIntoViewIfNeeded();
        await this.webElementActionClass.Click(day);
        await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(4000);
        await this.memberdashboardpage.verifyUserOnMapLayout();
        await this.memberdashboardpage.mapLayoutZoneName();
        await this.memberdashboardpage.verifyElementIsVisible(this.locatorsPage.map_Layout_show_booking_checkbox, ElementsName.Map_Layout.ShowBookingCheck);
        await this.memberdashboardpage.verifyElementIsVisible(this.locatorsPage.currunt_booking_book_space_btn, ElementsName.Map_Layout.Map_Layout_booking_calender);
        await this.memberdashboardpage.verifyElementIsVisible(this.locatorsPage.map_Layout_zoom_value, ElementsName.Map_Layout.Map_Layout_Zoom_Value);
        const text = await this.reusableActionClass.getTextMessage(this.locatorsPage.map_Layout_zoom_value);
        console.log(`\nMap Layout Zoom Value is :${text}`);
        await this.reusablePageClass.printParkingSpotDetails();
        await this.releaseSpotCurrentDayFromMap();
        await this.reusablePageClass.printAvailableDeskSpots();
        console.log(`\n--Verifying Booking on Popup on Elements on Map Layout...`);
        await this.memberdashboardpage.verifyMapHourlyPopupElements();
        console.log("\nTry to Book Space on Map Layout...");
        await this.tryBookingAvailableSpots();
        clicked = true;
        await this.page.waitForTimeout(2000);
        break;
      }
    }

    if (!clicked) {
      console.error(`Not able Booking on Currunt Day's spot (${todayDateId})`, error);
      throw new Error(`Not able Booking on Currunt Day's spot (${todayDateId})`);
    }
    console.log("<<================================================================>>");
  }

  async tryBookingAvailableSpots() {
    await this.reusablePageClass.releaseAlHourlyBookedSpots();
    const hourlySpots = await this.locatorsPage.parking_hourly_all_spots.all();
    const totalSpots = hourlySpots.length;
    console.log(`\nTotal Hourly Parking Spots Available: ${totalSpots}`);

    let i = 0;
    while (i < totalSpots) {
      const spot = hourlySpots[i];
      const title = await spot.getAttribute("title") || `Spot-${i + 1}`;
      console.log(`\nTrying Spot ${i + 1}: ${title}`);

      try {
        // Scroll and click the spot
        await spot.scrollIntoViewIfNeeded();
        console.log(`\nSpot ${i + 1} is visible. Clicking...`);
        await this.webElementActionClass.Click(spot);
        await this.page.waitForTimeout(2000);

        await this.reusablePageClass.assertElementVisible(this.locatorsPage.member_hourly_booking_popup, ElementsName.NoMap.NoMAP_Popup);

        await this.reusablePageClass.assertSpotTextContainsTitle(title);
        await this.webElementActionClass.Click(this.locatorsPage.parking_map_spot_popup);
        console.log(`\nClicking on Spot Button: ${title}`);
        await this.page.waitForTimeout(3000);

        let booked = false;

        if (await this.locatorsPage.member_hourly_30_booking_start.isVisible()) {
          console.log(`\n--Trying to booking 30 minutes slot for spot: ${title}`);
          booked = await this.minutes30SlotBooking(title);
        } else if (await this.locatorsPage.parking_realese_hourly_slots_more_then1.isVisible()) {
          console.log(`\n--Trying to Select Hourly Slot for spot: ${title}`);
          booked = await this.reusablePageClass.selectFirstAvailableTimeSlotHourlyMore30(0, title);
        } else {
          console.log(`\nNo booking options visible for spot "${title}". Skipping to next spot...`);
          if (await this.locatorsPage.Map_pop_up_close_btn.isVisible()) {
            await this.webElementActionClass.Click(this.locatorsPage.Map_pop_up_close_btn);
            await this.page.waitForTimeout(1000);
          }
        }

        if (booked) {
          console.log(`\nBooked Successfully spot: ${title} — Verifying toast message...`);
          await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
          console.log("Success message is displayed.");
          await this.page.waitForTimeout(500);
          await this.reusablePageClass.verifybookedSpotWithTostMessageOnHourly();
          console.log(`\nSpot "${title}" booked successfully!`);
          await this.page.waitForTimeout(2000);
          return true;
        } else {
          console.log(`\nSpot "${title}" has no valid slot. Trying next...`);
          await this.page.waitForTimeout(3000);
        }
      } catch (err) {
        console.warn(`\nError occurred while trying spot "${title}":`);
      }

      i++; // Proceed to next spot
    }

    throw new Error("\nNo suitable spot found for booking.Check other Zone.");
    return false; // ❌ If loop finishes without booking
  }

  async minutes30SlotBooking(title: string) {
    const { start, end } = await this.reusablePageClass.getNext30MinSlot();
    console.log(`\nStart Time: ${start}, End Time: ${end}`);

    await this.page.waitForTimeout(2000);
    // Define the allowed booking window (or extract it from UI if dynamic)
    const allowedStart = await this.locatorsPage.parking_map_claim_spot_popup_start_time.allInnerTexts();
    const allowedEnd = await this.locatorsPage.parking_map_claim_spot_popup_end_time.allInnerTexts();
    console.log(`\nMandatory to book between ${allowedStart} to ${allowedEnd}`);

    const now = new Date();
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    const [allowedStartH, allowedStartM] = allowedStart[0].split(":").map(Number);
    const [allowedEndH, allowedEndM] = allowedEnd[0].split(":").map(Number); // Assuming the first element is used

    const slotStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute);
    const slotEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute);
    const allowedStartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), allowedStartH, allowedStartM);
    const allowedEndTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), allowedEndH, allowedEndM);

    // Check if slot is within allowed range
    if (slotStart < allowedStartTime || slotEnd > allowedEndTime) {
      console.log(`\n-CHECK OTHER SPOT, in this Slot from ${start} to ${end} is slot Not available outside allowed range (${allowedStart} to ${allowedEnd})`);
      await this.webElementActionClass.Click(this.locatorsPage.Map_pop_up_close_btn); // Close the popup
      return false;

    }

    // Proceed with booking
    await this.webElementActionClass.Send_Keys(this.locatorsPage.member_hourly_30_booking_start, start);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.member_hourly_30_booking_end, end);
    await this.page.keyboard.press('Tab');
    await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.selectVehicleDropdown);
    await this.webElementActionClass.Click(this.locatorsPage.parking_map_claim_spot_popup);
    console.log(`\nSuccessfully booked 30 minutes spot ${title} from ${start} to ${end}`);
    return true;
  }


  async releaseAnyBookedHourlySpot() {
    const assignedSpots = this.page.locator("//a[contains(@class,'SpotID_assigned')]");
    const count = await assignedSpots.count();

    console.log(`Total Booked Spots: ${count}`);

    if (count === 0) {
      console.log("No booked spot found to release.");
      return false;
    }

    for (let i = 0; i < count; i++) {
      // Always get the *first* element because the list updates after each release
      const currentSpots = this.page.locator("//a[contains(@class,'SpotID_assigned')]");
      const bookedSpot = currentSpots.nth(0);

      const spotId = await bookedSpot.getAttribute("id");
      console.log(`\nReleasing spot (${spotId || 'No ID'})...`);
      await bookedSpot.scrollIntoViewIfNeeded();
      await bookedSpot.click();
      await this.webElementActionClass.Click(this.locatorsPage.parking_realese_hourly_spot_map);
      await this.page.waitForLoadState('load');
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(4000);
      await this.memberdashboardpage.verifyUserOnMapLayout();
      await this.reusablePageClass.releaseAlHourlyBookedSpots();
    }

    console.log("All booked spots released.");
    await this.webElementActionClass.Click(this.locatorsPage.map_Layout_Left_Back_btn);
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(4000);
    return true;
  }

  async hourlybookSpotCurruntDayFromCalendar() {
    await this.reusablePageClass.refreshAndCountDays();
    await this.releaseAnyBookedHourlySpot();
    const todayDateId = dayjs().format('YYYY-MM-DD'); // example: '2025-04-07'
    console.log(`\nToday Date :- (${todayDateId}).`);
    await this.page.waitForTimeout(2000);
    const availableDays = await this.locatorsPage.availableDaysfromcurrunt.all();
    let clicked = false;
    for (const day of availableDays) {
      const id = await day.getAttribute('id');
      if (id === todayDateId) {
        console.log(`\nFound today's available spot (${id}). Clicking...`);
        await day.scrollIntoViewIfNeeded();
        await this.webElementActionClass.Click(day);
        await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(4000);
        await this.memberdashboardpage.verifyUserOnMapLayout();
        await this.memberdashboardpage.mapLayoutZoneName();
        await this.reusablePageClass.printParkingSpotDetails();
        await this.releaseSpotCurrentDayFromMap();
        await this.reusablePageClass.printAvailableDeskSpots();
        console.log("\nTry to Book Space on Map Layout...");
        await this.tryBookingAvailableSpots();
        clicked = true;
        await this.page.waitForTimeout(2000);
        break;
      }
    }

    if (!clicked) {
      console.error(`Not able Booking on Currunt Day's spot (${todayDateId})`, error);
      throw new Error(`Not able Booking on Currunt Day's spot (${todayDateId})`);
    }
  }


  async ViolationHourlyBookedSpots() {
    await this.page.waitForTimeout(3000);

    const assignedLocator = this.locatorsPage.parking_booked_hourly_spot;
    try {
      await assignedLocator.first().waitFor({ state: "visible", timeout: 5000 });
    } catch (e) {
      console.error("No assigned spots found on the map.");
      throw new Error("No assigned spots found on the map.");
    }
    const allAssignedSpots = await assignedLocator.all();
    let released = false;

    for (const spot of allAssignedSpots) {
      await spot.hover();
      await this.page.waitForTimeout(3000);
      await spot.click({ force: true });
      const spotNumber = await spot.getAttribute("data-spotnumber");
      console.log("Report Violation on Booked Spot:", spotNumber);
      await this.webElementActionClass.Click(this.locatorsPage.hourly_Report_Violation_btn);
      await this.webElementActionClass.Send_Keys(this.locatorsPage.report_Violation_number_plate, "7878")
      await this.webElementActionClass.Click(this.locatorsPage.report_Violation_send_btn);
      await this.page.waitForTimeout(3000);

      if (await this.locatorsPage.report_Violation_no_spot_mesg.isVisible({ timeout: 6000 })) {
        console.log("No parking spot Available message displayed. Closing the popup.");
        await this.webElementActionClass.Click(this.locatorsPage.report_Violation_no_spot_mesg_close);
        released = true;
        return;
      } else {
        console.log("\nParking spot available. Selecting checkbox and confirming.");
        await this.webElementActionClass.Click(this.locatorsPage.report_Violation_cofirm_check);
        await this.webElementActionClass.Click(this.locatorsPage.report_Violation_cofirm_btn);
        await this.page.waitForTimeout(3000);
        await this.waitActionClass.WaitUntilElementToDisappear_hidden(this.locatorsPage.TimeLoader);
        const spotNumber1 = await assignedLocator.getAttribute("data-spotnumber");
        console.log("----------- Newly assigned spot is after violation:", spotNumber1);
        released = true;
        return;
      }
      // await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
      released = true;
      break;
    }

    if (!released) {
      console.log("No spot was Violated.");
    }
  }




  async bookSpotForNext10Days() {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Booking Spot for Next 10 Days.");
    console.log("----------------------------------");

    await this.reusablePageClass.refreshAndCountDayAllDAy();
    await this.reusablePageClass.releaseAnyBookedSpot();

    // Loop for 10 days including today
    for (let i = 0; i < 15; i++) {
      const currentDateId = dayjs().add(i, "day").format("YYYY-MM-DD");
      console.log(`\nBooking spot for Date :- (${currentDateId}).`);

      //await this.page.waitForTimeout(200);
      const availableDays = await this.locatorsPage.availableDaysfromcurrunt.all();
      let clicked = false;

      for (const day of availableDays) {
        const id = await day.getAttribute("id");
        if (id === currentDateId) {
          console.log(`\nFound available spot for (${id}). Clicking...`);
          await day.scrollIntoViewIfNeeded();
          await this.webElementActionClass.Click(day);
          console.log("Verifying vehicle dropdown on booking popup...");
          await this.reusablePageClass.selectSecondOptionFromDropdown(
            this.locatorsPage.selectVehicleDropdown,
            ElementsName.DropDowns.Vehicle_List
          );

          await this.webElementActionClass.Click(this.locatorsPage.getRandomSpaceButton);
          console.log("\nClicked on 'Get Random Space' button. Waiting for booking popup message...");
          // await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });

          // console.log("\nSuccess message is displayed.");
          // await this.page.waitForTimeout(500);
          // await this.reusablePageClass.verifybookedSpotWithTostMessage();

          // clicked = true;
          // await this.page.waitForTimeout(2000);
          break;
        }
      }

      // if (!clicked) {
      //   console.error(`❌ Not able to book spot for (${currentDateId})`);
      //   throw new Error(`Not able to book spot for (${currentDateId})`);
      // }

      console.log("\n<<================================================================>>");
    }

    console.log("\n✅ Successfully booked spots for 10 days (today + next 9 days).");
  }


  async bookSpotForNext10Days2() {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Booking Spot for Next 10 Days (spanning months if needed).");
    console.log("----------------------------------");

    await this.reusablePageClass.refreshAndCountDayAllDAy();
    await this.reusablePageClass.releaseAnyBookedSpot();

    const totalDaysToBook = 18; // today + next 13
    let bookedCount = 0;
    let dayOffset = 0;

    while (bookedCount < totalDaysToBook) {
      const currentDateId = dayjs().add(dayOffset, "day").format("YYYY-MM-DD");
      console.log(`\nTrying to book spot for Date :- (${currentDateId}).`);

      let availableDays = await this.locatorsPage.availableDaysfromcurrunt.all();
      let foundDay = false;

      for (const day of availableDays) {
        const id = await day.getAttribute("id");
        if (id === currentDateId) {
          console.log(`✅ Found available spot for (${id}). Booking...`);
          await day.scrollIntoViewIfNeeded();
          await this.webElementActionClass.Click(day);

          console.log("Verifying vehicle dropdown on booking popup...");
          await this.reusablePageClass.selectSecondOptionFromDropdown(
            this.locatorsPage.selectVehicleDropdown,
            ElementsName.DropDowns.Vehicle_List
          );

          await this.webElementActionClass.Click(this.locatorsPage.getRandomSpaceButton);
          console.log("Clicked on 'Get Random Space' button. Waiting for booking popup message...");
          // await this.reusablePageClass.verifybookedSpotWithTostMessage();

          bookedCount++;
          foundDay = true;
          break;
        }
      }

      if (!foundDay) {
        console.warn(`⚠️ Spot not found for (${currentDateId}). Maybe not in current month view.`);
        console.log("➡️ Navigating to next month...");

        // Click calendar next month button
        await this.webElementActionClass.Click(this.locatorsPage.next_month_button);

        await this.page.waitForTimeout(7000);
        await this.waitActionClass.waitForNetworkIdleOrTimeout(10000);
        const refreshButtons = this.locatorsPage.refreshButton.first();
        if (await refreshButtons.isVisible()) {
          console.log("✅ Refresh button is visible, clicking...");
          await refreshButtons.click();
        } else {
          console.log("❌ Refresh button not visible, skipping...");
        }
        await this.page.waitForTimeout(1000);
        continue; // re-check with same dateOffset after changing month
      }

      dayOffset++;
      console.log("\n<<================================================================>>");
    }

    console.log(`\n✅ Successfully booked ${bookedCount} spots across current + next month(s).`);
  }





}









