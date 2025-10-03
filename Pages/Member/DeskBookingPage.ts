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
import ParkingBookingPage from "./ParkingBookingPage";


export default class DeskBookingPage {
  private waitActionClass: WaitActionClass;
  private webElementActionClass: WebElementActionClass;
  private locatorsPage: LocatorsPage;
  private reusableActionClass: ReusableActionClass;
  private reusablePageClass: ReusablePage;
  private memberdashboardpage: Memberdashboardpage;
  private parkingBookingPage: ParkingBookingPage;
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
    this.parkingBookingPage = new ParkingBookingPage(page);

    this.continueWithEmailButton = page.locator("//span[contains(text(), 'Continue with Email')]"); // Update if needed
  }

  /**
  * Attempts to book a Desk spot specifically for the **current day**:
  * - Refreshes availability
  * - Releases any pre-booked spot
  * - Matches current date with available spot IDs
  * - Books and verifies the success message
  */
  async bookDeskSpotCurruntDayFromCalendar() {
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
        console.log("\n");
        console.log(`Found today's available spot (${id}). Clicking...`);
        await day.scrollIntoViewIfNeeded();
        await this.webElementActionClass.Click(day);
        console.log("\n");
        console.log("Verifying that the 'Select Vehicle' dropdown is not present \nAnd 'Get Random Space Buttonon' is present on the Desk Booking pop-up.");
        await this.reusablePageClass.assertElementVisible(this.locatorsPage.getRandomSpaceButton, ElementsName.NoMap.Get_Random_Space_btn)
        await this.reusablePageClass.assertElementHidden(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List)
        await this.webElementActionClass.Click(this.locatorsPage.getRandomSpaceButton);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
        console.log("Success message is displayed.");
        await this.page.waitForTimeout(1000);
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
  }

  /**
 * Attempts to book a Desk spot for the next available day after today from the calendar view.
 * - Refreshes availability.
 * - Releases any pre-booked spot.
 * - Finds the next available day, prioritizing the exact next day.
 * - Clicks the found spot and completes the booking process.
 * - Verifies the success message.
 * Throws an error if no available slots are found after today.
 */
  async bookDeskNextAvailableSpotAfterToday() {
    await this.reusablePageClass.refreshAndCountDays();
    await this.reusablePageClass.releaseAnyBookedSpot();

    const todayDateId = dayjs().format('YYYY-MM-DD');
    const nextDateId = dayjs().add(1, 'day').format('YYYY-MM-DD');

    console.log(`\nTrying to book Desk Spot on next day (${nextDateId}) if available...`);

    await this.page.waitForTimeout(2000);
    const availableDays = await this.locatorsPage.availableDaysfromcurrunt.all();
    let nextDayElement: Locator | null = null;
    let fallbackDayElement: Locator | null = null;

    for (const day of availableDays) {
      const id = await day.getAttribute('id');

      if (!id || id <= todayDateId) continue;

      if (id === nextDateId) {
        nextDayElement = day;
        break; // prioritize exact next day
      }

      // save first available fallback after today (but only if next day is not found)
      if (!fallbackDayElement && id > todayDateId) {
        fallbackDayElement = day;
      }
    }

    const spotToBook = nextDayElement || fallbackDayElement;

    if (spotToBook) {
      const bookingId = await spotToBook.getAttribute('id');
      console.log("\n");
      console.log(`Booking available on Next Day Desk spot on (${bookingId})...`);
      await spotToBook.scrollIntoViewIfNeeded();
      await this.webElementActionClass.Click(spotToBook);
      //await this.selectSecondOptionFromDropdown(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List);
      await this.webElementActionClass.Click(this.locatorsPage.getRandomSpaceButton);
      await this.page.waitForTimeout(2000);
      await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
      console.log("\nSuccess message is displayed.");
      await this.reusablePageClass.verifybookedSpotWithTostMessage();
    } else {
      const errorMsg = `No available booking slots after today (${todayDateId}).`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
  }

  /**
   * Navigates to the next month in the calendar and attempts to book a Desk spot.
   * - Determines the expected next month and year.
   * - Clicks the "next month" button and verifies the calendar header.
   * - Refreshes availability and releases any pre-booked spots.
   * - Finds the first available spot in the next month and books it.
   * - Verifies the success message.
   * Throws an error if no available spot is found in the next month.
   */

  async nextMonthDeskBooking() {
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
        console.log("\nVerifying that the 'Select Vehicle' dropdown is not present \nAnd 'Get Random Space Buttonon' is present on the Desk Booking pop-up.");
        await this.reusablePageClass.assertElementVisible(this.locatorsPage.getRandomSpaceButton, ElementsName.NoMap.Get_Random_Space_btn)
        await this.reusablePageClass.assertElementHidden(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List)
        await this.webElementActionClass.Click(this.locatorsPage.getRandomSpaceButton);
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
  }


  // Method to book a spot for the current day from the map layout

  async bookAllDayDeskSpotCurruntDayFromMap() {
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
        console.log("\nVerifying that the 'Select Vehicle' dropdown is not present \nAnd 'Get Random Space Buttonon' is present on the Desk Booking pop-up.");
        //await this.reusablePageClass.assertElementVisible(this.locatorsPage.getRandomSpaceButton, ElementsName.NoMap.Get_Random_Space_btn)
        await this.reusablePageClass.assertElementHidden(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List)
        await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(6000)
        await this.memberdashboardpage.verifyUserOnMapLayout();
        await this.memberdashboardpage.mapLayoutZoneName();
        const spotDetails = await this.reusablePageClass.printParkingSpotDetails();
        if (spotDetails.allDaySpotsCount === 0) {
          throw new Error("No all-day Desk spots available in this zone");
        }
        await this.parkingBookingPage.releaseSpotCurrentDayFromMap();
        await this.reusablePageClass.printAvailableDeskSpots();
        await this.page.waitForTimeout(5000);
        await this.webElementActionClass.Click(this.locatorsPage.parking_allday_all_spots.first());
        await this.webElementActionClass.Click(this.locatorsPage.book_space_btn);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
        console.log("Success message is displayed.");
        await this.page.waitForTimeout(1000);
        await this.reusablePageClass.verifybookedSpotWithTostMessageOnMap();
        await this.page.reload({ waitUntil: 'domcontentloaded' });
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
  }

  /**
   * Attempts to book an all-day Desk spot for the next available day after today from the Map layout.
   * - Refreshes availability and releases any pre-booked spots.
   * - Finds and clicks the next available date on the calendar.
   * - Navigates to the map view, verifies map elements, and checks for all-day Desk spots.
   * - Releases any existing booked spots on the map.
   * - Clicks the first available all-day spot on the map and books it.
   * - Verifies success message and booked spot details on the map.
   * Throws an error if no all-day Desk spots are available or booking fails.
   */

  async bookDeskNextAvailableSpotFromMapAfterToday() {
    await this.reusablePageClass.refreshAndCountDays();
    await this.reusablePageClass.releaseAnyBookedSpot();

    const todayDateId = dayjs().format('YYYY-MM-DD');
    const nextDateId = dayjs().add(1, 'day').format('YYYY-MM-DD');

    console.log(`\nTrying to book Desk Spot on next day (${nextDateId}) if available...`);

    await this.page.waitForTimeout(2000);
    const availableDays = await this.locatorsPage.availableDaysfromcurrunt.all();
    let nextDayElement: Locator | null = null;
    let fallbackDayElement: Locator | null = null;

    for (const day of availableDays) {
      const id = await day.getAttribute('id');

      if (!id || id <= todayDateId) continue;

      if (id === nextDateId) {
        nextDayElement = day;
        break; // prioritize exact next day
      }

      // save first available fallback after today (but only if next day is not found)
      if (!fallbackDayElement && id > todayDateId) {
        fallbackDayElement = day;
      }
    }

    const spotToBook = nextDayElement || fallbackDayElement;
    let clicked = false;

    if (spotToBook) {
      const bookingId = await spotToBook.getAttribute('id');
      console.log(`\nBooking available on Next Day Desk spot on (${bookingId})...`);
      await spotToBook.scrollIntoViewIfNeeded();
      await this.webElementActionClass.Click(spotToBook);
      //await this.selectSecondOptionFromDropdown(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List);
      await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForLoadState('load');
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(6000)

      const spotDetails = await this.reusablePageClass.printParkingSpotDetails();
      if (spotDetails.allDaySpotsCount === 0) {
        throw new Error("No all-day Desk spots available in this zone");
      }
      await this.parkingBookingPage.releaseSpotCurrentDayFromMap();
      await this.reusablePageClass.printAvailableDeskSpots();
      await this.page.waitForTimeout(5000);
      await this.webElementActionClass.Click(this.locatorsPage.parking_allday_all_spots.first());
      await this.page.waitForTimeout(2000);
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
      return;
    } else {
      if (!clicked) {
        console.error(`Not able Booking on Currunt Day's spot (${todayDateId})`, error);
        throw new Error(`Not able Booking on Currunt Day's spot (${todayDateId})`)
      }
      const errorMsg = `No available booking slots after today (${todayDateId}).`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
  }

  /**
    * Attempts to book an all-day Desk spot for the **next month** from the Map layout.
    * - Refreshes availability and releases any pre-booked spots.
    * - Clicks today's date (to get to the booking flow), then navigates to the map.
    * - Verifies map elements and checks for all-day Desk spots.
    * - Releases any existing booked spots on the map for the current day.
    * - Selects the first available date in the *next month* on the map calendar.
    * - Releases any existing booked spots on the map for the next month (after date change).
    * - Clicks the first available all-day spot on the map for the selected next month date and books it.
    * - Verifies success message and booked spot details on the map.
    * Throws an error if no all-day Desk spots are available or booking fails.
    */

  async bookDeskSpotNextMonthFromMap() {
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
        await this.page.waitForTimeout(2000);
        console.log("\nVerifying that the 'Select Vehicle' dropdown is not present \nAnd 'Get Random Space Buttonon' is present on the Desk Booking pop-up.");
        await this.reusablePageClass.assertElementVisible(this.locatorsPage.getRandomSpaceButton, ElementsName.NoMap.Get_Random_Space_btn)
        await this.reusablePageClass.assertElementHidden(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List)
        await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(6000)
        await this.memberdashboardpage.verifyUserOnMapLayout();
        await this.memberdashboardpage.mapLayoutZoneName();
        await this.parkingBookingPage.releaseSpotCurrentDayFromMap();
        const spotDetails = await this.reusablePageClass.printParkingSpotDetails();
        if (spotDetails.allDaySpotsCount === 0) {
          throw new Error("No all-day Desk spots available in this zone");
        }
        await this.page.waitForTimeout(5000);
        await this.reusablePageClass.selectNextMonthFirstAvailableDate();
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(4000);
        await this.parkingBookingPage.releaseSpotCurrentDayFromMap();
        await this.webElementActionClass.Click(this.locatorsPage.parking_allday_all_spots.first());
        await this.page.waitForTimeout(3000);
        await this.webElementActionClass.Click(this.locatorsPage.book_space_btn);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
        console.log("Success message is displayed for Spot Booked.");
        await this.page.waitForTimeout(1000);
        await this.reusablePageClass.verifybookedSpotWithTostMessageOnMap();
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

  }
  /**
   * Books an hourly Desk spot for the **current day** from the Map layout,
   * including verification of hourly popup elements.
   * - Verifies hourly popup elements.
   * - Releases any pre-booked hourly spots.
   * - Finds and clicks today's date on the calendar.
   * - Navigates to the map view and verifies map elements (zoom, checkboxes).
   * - Checks for hourly Desk spots availability.
   * - Attempts to book an available hourly spot using `tryDeskBookingAvailableSpots`.
   * Throws an error if no hourly Desk spots are available or booking fails.
   */

  async hourlyDeskbookSpotCurruntDayFromMapVerifyingWithPopup() {
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
        await this.page.waitForTimeout(3000);
        await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(4000);
        await this.memberdashboardpage.verifyUserOnMapLayout();
        await this.memberdashboardpage.mapLayoutZoneName();
        await this.reusablePageClass.verifyElementIsVisible(this.locatorsPage.map_Layout_show_booking_checkbox, ElementsName.Map_Layout.ShowBookingCheck);
        await this.reusablePageClass.verifyElementIsVisible(this.locatorsPage.currunt_booking_book_space_btn, ElementsName.Map_Layout.Map_Layout_booking_calender);
        await this.reusablePageClass.verifyElementIsVisible(this.locatorsPage.map_Layout_zoom_value, ElementsName.Map_Layout.Map_Layout_Zoom_Value);
        const text = await this.reusableActionClass.getTextMessage(this.locatorsPage.map_Layout_zoom_value);
        console.log(`\nMap Layout Zoom Value is :${text}`);
        await this.parkingBookingPage.releaseSpotCurrentDayFromMap();
        const spotDetails = await this.reusablePageClass.printParkingSpotDetails();
        if (spotDetails.hourlySpotsCount === 0) {
          throw new Error("No hourly Desk spots available in this zone");
        }
        // console.log(`\n--Verifying Booking on Popup on Elements on Map Layout...`);
        // await this.verifyMapHourlyPopupElements();
        console.log("\nTry to Book Space on Map Layout...");
        await this.tryDeskBookingAvailableSpots();
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

  /**
 * Releases any currently booked hourly spots displayed on the map.
 * It iterates through assigned spots, clicks them, and then clicks the release button.
 * Navigates back to the main view after releasing all spots.
 * @returns A boolean indicating if any spots were released (true) or if none were found (false).
 */

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
      await this.reusablePageClass.releaseAlHourlyBookedSpots()
    }

    console.log("All booked spots released.");
    await this.webElementActionClass.Click(this.locatorsPage.map_Layout_Left_Back_btn);
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(4000);
    return true;
  }
  /**
   * Attempts to book available hourly Desk spots on the map.
   * It iterates through available hourly spots, clicks each, checks for booking options (30 min or hourly),
   * attempts to book, and verifies success.
   * It prioritizes 30-minute slots if available, otherwise looks for general hourly slots.
   * Throws an error if no suitable spot can be booked after checking all.
   * @returns A boolean indicating if a spot was successfully booked (true) or not (false).
   */

  async tryDeskBookingAvailableSpots() {
    await this.reusablePageClass.releaseAlHourlyBookedSpots();
    const hourlySpots = await this.locatorsPage.parking_hourly_all_spots.all();
    const totalSpots = hourlySpots.length;
    console.log(`\nTotal Hourly DESK Spots Available: ${totalSpots}`);

    let i = 0;
    while (i < totalSpots) {
      await this.reusablePageClass.releaseAlHourlyBookedSpots();
      const spot = hourlySpots[i];
      const title = await spot.getAttribute("title") || `Spot-${i + 1}`;
      console.log(`\nTrying DESK Spot ${i + 1}: ${title}`);

      try {
        // Scroll and click the spot
        await spot.scrollIntoViewIfNeeded();
        console.log(`\nSpot ${i + 1} is visible. Clicking...`);
        await this.page.waitForTimeout(2000); 
        await this.webElementActionClass.Click(spot);
        await this.page.waitForTimeout(2000);

        await this.reusablePageClass.assertElementVisible(this.locatorsPage.member_hourly_booking_popup, ElementsName.NoMap.NoMAP_Popup);

        await this.reusablePageClass.assertSpotTextContainsTitle(title);
        await this.page.waitForTimeout(2000); 
        await this.webElementActionClass.Click(this.locatorsPage.parking_map_spot_popup);
        console.log(`\nClicking on DESK Spot Button: ${title}`);
        await this.page.waitForTimeout(3000);

        let booked = false;

        if (await this.locatorsPage.member_hourly_30_booking_start.isVisible()) {
          console.log(`\n--Trying to booking 30 minutes slot for spot: ${title}`);
          booked = await this.Deskminutes30SlotBooking(title);
        } else if (await this.locatorsPage.parking_realese_hourly_slots_more_then1.isVisible()) {
          console.log(`\n--Trying to Select Hourly Slot for spot: ${title}`);
          booked = await this.reusablePageClass.selectFirstAvailableTimeSlotHourlyMore30(0, title);
        } else {
          console.log(`\nNo booking options visible for spot "${title}". Skipping to next spot...`);
          if (await this.locatorsPage.Map_pop_up_close_btn.isVisible()) {
            await this.page.waitForTimeout(2000); 
            await this.webElementActionClass.Click(this.locatorsPage.Map_pop_up_close_btn);
            await this.page.waitForTimeout(1000);
          }
        }

        if (booked) {
          console.log(`\nBooked Successfully spot: ${title} — Verifying toast message...`);
          await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
          console.log("Success message is displayed.");
          await this.page.waitForTimeout(1000);
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

  /**
   * Attempts to book a 30-minute hourly Desk slot for a given spot.
   * It calculates the next available 30-minute slot, checks if it falls within allowed booking times,
   * fills in the start and end times, and attempts to claim the spot.
   * @param title - The title/name of the Desk spot being booked.
   * @returns A boolean indicating if the 30-minute slot was successfully booked (true) or not (false).
   */


  async Deskminutes30SlotBooking(title: string) {
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
      console.log(`\n-CHECK OTHER DESK SPOT, in this Slot from ${start} to ${end} is slot Not available outside allowed range (${allowedStart} to ${allowedEnd})`);
      await this.webElementActionClass.Click(this.locatorsPage.Map_pop_up_close_btn); // Close the popup
      return false;

    }

    // Proceed with booking
    await this.webElementActionClass.Send_Keys(this.locatorsPage.member_hourly_30_booking_start, start);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.member_hourly_30_booking_end, end);
    await this.page.keyboard.press('Tab');
    await this.webElementActionClass.Click(this.locatorsPage.parking_map_claim_spot_popup);
    console.log(`\nSuccessfully booked 30 minutes spot ${title} from ${start} to ${end}`);
    return true;
  }

  /**
  * Books an hourly Desk spot for the **next month** from the Map layout.
  * - Releases any pre-booked hourly spots.
  * - Clicks today's date (to initiate the booking flow).
  * - Navigates to the map view, verifies map elements.
  * - Checks for hourly Desk spots availability.
  * - Selects the first available date in the *next month* on the map calendar.
  * - Releases any existing hourly booked spots (after date change).
  * - Attempts to book an available hourly spot using `tryDeskBookingAvailableSpots`.
  * Throws an error if no hourly Desk spots are available or booking fails.
  */


  async hourlyDeskbookSpotNextMonthfromMap() {
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
         await this.page.waitForTimeout(2000);
        await this.webElementActionClass.Click(day);
        await this.page.waitForTimeout(2000);
        await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(4000);
        await this.memberdashboardpage.verifyUserOnMapLayout();
        await this.memberdashboardpage.mapLayoutZoneName();
        await this.reusablePageClass.verifyElementIsVisible(this.locatorsPage.map_Layout_show_booking_checkbox, ElementsName.Map_Layout.ShowBookingCheck);
        await this.reusablePageClass.verifyElementIsVisible(this.locatorsPage.currunt_booking_book_space_btn, ElementsName.Map_Layout.Map_Layout_booking_calender);
        await this.reusablePageClass.verifyElementIsVisible(this.locatorsPage.map_Layout_zoom_value, ElementsName.Map_Layout.Map_Layout_Zoom_Value);
        const text = await this.reusableActionClass.getTextMessage(this.locatorsPage.map_Layout_zoom_value);
        console.log(`\nMap Layout Zoom Value is :${text}`);
        await this.parkingBookingPage.releaseSpotCurrentDayFromMap();
        const spotDetails = await this.reusablePageClass.printParkingSpotDetails();
        if (spotDetails.hourlySpotsCount === 0) {
          throw new Error("No hourly Desk spots available in this zone");
        }
        await this.reusablePageClass.selectNextMonthFirstAvailableDate();
        console.log("\nTry to Booking Hourly Desk on Map Layout...");
        await this.reusablePageClass.releaseAlHourlyBookedSpots();
        await this.tryDeskBookingAvailableSpots();
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


}









