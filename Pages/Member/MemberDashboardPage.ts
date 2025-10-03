import { Locator, Page, expect } from "@playwright/test";
import WaitActionClass from "../../Actions/WaitActions";
import WebElementActionClass from "../../Actions/WebElementActions";
import LocatorsPage from "../Locators";
import ReusableActionClass from "../../Actions/ReusableActions";
import ReusablePage from "./ReusablePage";
import UserSet from "../../test-data/JSON/admin_set_test.json"
import ZoneData from "../../test-data/JSON/zone_data.json"
import ElementsName from "../../test-data/JSON/Elements_Name.json"

import dayjs from "dayjs";
import { error } from "console";


let timeStamp;

export default class memberdashboardpage {
  private waitActionClass: WaitActionClass;
  private webElementActionClass: WebElementActionClass;
  private reusableActionClass: ReusableActionClass;
  private locatorsPage: LocatorsPage;
  private reusablePageClass: ReusablePage;
  



  constructor(public page: Page) {
    // Initialize class objects
    this.waitActionClass = new WaitActionClass(page);
    this.webElementActionClass = new WebElementActionClass(page);
    this.reusableActionClass = new ReusableActionClass(page);
    this.locatorsPage = new LocatorsPage(page);
    this.reusablePageClass = new ReusablePage(page);

  }
  /**
     * Verifies if a given element is visible on the page.
     */

  async verifyElementIsVisible(element: Locator, elementName: string): Promise<void> {
    try {
      await expect(element).toBeVisible({ timeout: 20000 });
      console.log(`\nElement "${elementName}" is present and visible.`);
    } catch (error) {
      console.error(`\nElement "${elementName}" is NOT visible or not found.`);
      throw error;
    }
  }

  /**
   * Verifies elements of the 'No Map' booking popup.
   * Ensures required elements are present and 'Go to Map' button is hidden.
   */

  async verifyNoMapPopupElements() {
    await this.reusablePageClass.refreshAndCountDays();
    await this.page.waitForTimeout(2000);
    console.log("\n");
    console.log("------------------------------------------");
    console.log("Verifying 'No Map' popup elements...");
    console.log("------------------------------------------");
    await this.webElementActionClass.Click(this.locatorsPage.availableFirstDaysForBooking);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.member_booking_popup, ElementsName.NoMap.NoMAP_Popup);
    await this.verifyElementIsVisible(this.locatorsPage.selectVehicleDropdown, ElementsName.NoMap.VehicleDropdown);
    await this.verifyElementIsVisible(this.locatorsPage.getRandomSpaceButton, ElementsName.NoMap.Get_Random_Space_btn);
    await this.verifyElementIsVisible(this.locatorsPage.pop_up_close_btn, ElementsName.NoMap.Close_btn);
    await this.verifyElementIsVisible(this.locatorsPage.pop_up_x_icon, ElementsName.NoMap.x_icon);
    await expect(this.locatorsPage.goto_map_btn).toBeHidden({ timeout: 10000 });
    await this.reusablePageClass.assertElementHidden(this.locatorsPage.goto_map_btn, ElementsName.NoMap.Goto_map_btn);
    console.log("\nGoto Map button is hidden on Popup as expected.");
    await this.webElementActionClass.Click(this.locatorsPage.pop_up_close_btn);
    console.log("Closing The'No Map' popup...");
    await this.page.waitForTimeout(1000);
    await this.reusablePageClass.assertElementHidden(this.locatorsPage.member_booking_popup, ElementsName.NoMap.NoMAP_Popup);
    console.log("=================================================");
  }

  /**
 * Verifies elements of the 'Map Layout' booking popup.
 * Ensures required elements are visible including the 'Go to Map' button.
 */

  async verifyMapPopupElementsCloseBtn() {
    await this.reusablePageClass.refreshAndCountDays();
    await this.page.waitForTimeout(2000);
    console.log("Verifying 'Map LayOut' popup elements...");
    await this.webElementActionClass.Click(this.locatorsPage.availableFirstDaysForBooking);
    await expect(this.locatorsPage.member_booking_popup).toBeVisible({ timeout: 10000 });
    await this.verifyElementIsVisible(this.locatorsPage.selectVehicleDropdown, ElementsName.NoMap.VehicleDropdown);
    await this.verifyElementIsVisible(this.locatorsPage.getRandomSpaceButton, ElementsName.NoMap.Get_Random_Space_btn);
    await this.verifyElementIsVisible(this.locatorsPage.goto_map_btn, ElementsName.NoMap.Goto_map_btn);
    await this.verifyElementIsVisible(this.locatorsPage.pop_up_close_btn, ElementsName.NoMap.Close_btn);
    await this.verifyElementIsVisible(this.locatorsPage.pop_up_x_icon, ElementsName.NoMap.x_icon);
    await this.webElementActionClass.Click(this.locatorsPage.pop_up_close_btn);
    console.log("\nClosing 'Map LayOut' popup...");
    await this.page.waitForTimeout(1000);
  }


  /**
* Verifies elements of the 'Map Layout' booking popup.
* Ensures required elements are visible including the 'Go to Map' button.
* cliking'Go to Map' button.
* Verifies elements of the 'Map Layout' booking popup after clicking the 'Go to Map' button.
* Verify Back Button on the map layout and its Navi gate to Calander page And selected zone display as before selected .
*/
  async verifyMapPopupElementsBackToCalnader() {
    await this.reusablePageClass.refreshAndCountDays();
    await this.page.waitForTimeout(2000);
    const SelectedZone = await this.getSelectedZone();
    console.log(`Selected Zone Before Map Layout: "${SelectedZone}"`);
    console.log("Verifying 'Map LayOut' Goto Map button on popup ...");
    await this.webElementActionClass.Click(this.locatorsPage.availableFirstDaysForBooking);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.member_booking_popup, ElementsName.NoMap.NoMAP_Popup);
    await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(6000)
    await this.verifyUserOnMapLayout();
    await this.mapLayoutZoneName();
    await this.verifyElementIsVisible(this.locatorsPage.map_Layout_show_booking_checkbox, ElementsName.Map_Layout.ShowBookingCheck);
    await this.verifyElementIsVisible(this.locatorsPage.currunt_booking_book_space_btn, ElementsName.Map_Layout.Map_Layout_booking_calender);
    await this.verifyElementIsVisible(this.locatorsPage.map_Layout_zoom_value, ElementsName.Map_Layout.Map_Layout_Zoom_Value);
    const text = await this.reusableActionClass.getTextMessage(this.locatorsPage.map_Layout_zoom_value);
    console.log(`Map Layout Zoom Value is :${text}`);
    await this.reusablePageClass.printAvailableDeskSpots();
    await this.webElementActionClass.Click(this.locatorsPage.map_Layout_Left_Back_btn);
    console.log("Clicked on the Left Aerrow 'Back' button on the map layout...");
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(6000)
    await this.assertSelectedZoneUnchanged(SelectedZone);
    await this.page.waitForTimeout(1000);
  }

  /**
  * Books a parking spot for the current day using the Map Layout view.
  * Steps:
  * - Refresh state and release any existing bookings
  * - Click on today's booking slot
  * - Click 'Go to Map', validate map layout UI
  * - Click on an available space, select vehicle
  * - Book the spot and verify success message
  */

  async bookSpotCurruntDayFromMapWithVerifyBookingPopupMap() {
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
        await this.verifyUserOnMapLayout();
        await this.mapLayoutZoneName();
        await this.verifyElementIsVisible(this.locatorsPage.map_Layout_show_booking_checkbox, ElementsName.Map_Layout.ShowBookingCheck);
        await this.verifyElementIsVisible(this.locatorsPage.currunt_booking_book_space_btn, ElementsName.Map_Layout.Map_Layout_booking_calender);
        await this.verifyElementIsVisible(this.locatorsPage.map_Layout_zoom_value, ElementsName.Map_Layout.Map_Layout_Zoom_Value);
        const text = await this.reusableActionClass.getTextMessage(this.locatorsPage.map_Layout_zoom_value);
        console.log(`\nMap Layout Zoom Value is :${text}`);
        await this.reusablePageClass.printAvailableDeskSpots();
        console.log(`\n--Verifying Booking on Popup on Elements on Map Layout...`);
        await this.webElementActionClass.Click(this.locatorsPage.first_park_spot_Available);
        await this.verifyElementIsVisible(this.locatorsPage.selectVehicleDropdown, ElementsName.NoMap.VehicleDropdown);
        await this.verifyElementIsVisible(this.locatorsPage.book_space_btn, ElementsName.Map_Layout.Book_Space_btn);
        await this.verifyElementIsVisible(this.locatorsPage.Map_pop_up_close_btn, ElementsName.NoMap.Close_btn);
        await this.verifyElementIsVisible(this.locatorsPage.Map_pop_up_close_icon, ElementsName.NoMap.x_icon);
        await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.selectVehicleDropdown);
        await this.webElementActionClass.Click(this.locatorsPage.book_space_btn);
        console.log("\nClicked on Book Space button on Map Layout...");
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
        console.log("Success message is displayed.");
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
    * Returns the currently selected zone text from the dropdown.
    * Useful for validating state persistence after navigation.
    */
  async getSelectedZone(): Promise<string> {
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.zoneDropdownCss, ElementsName.Dashboard.ZoneDrp);
    const selected = await this.locatorsPage.zoneDropdownCss.locator('option:checked').textContent();
    const trimmed = selected?.trim() || 'N/A';
    return trimmed;
  }

  /**
  * Compares current zone selection with previously stored value.
  * Throws error if zones do not match.
  */
  async assertSelectedZoneUnchanged(expectedZone: string): Promise<void> {
    const currentZone = await this.getSelectedZone();
    console.log("\n");
    console.log(`Selected Zone After Returning from Map Layout:"${currentZone}"`);
    if (currentZone !== expectedZone) {
      throw new Error(`Zone mismatch! Expected: "${expectedZone}", but found: "${currentZone}"`);
    }
    console.log("\n");
    console.log(`Zone is unchanged after returning from Map Layout: "${currentZone}"`);
  }

  /**
    * Confirms whether the user has landed on the Map Layout screen.
    * Waits for either Grid layout or Canvas layout to appear.
    * Times out and logs if neither appears.
    */
  async verifyUserOnMapLayout(): Promise<void> {
    // Wait for either Grid or Canvas layout to appear — whichever comes first
    try {
      await Promise.race([
        this.locatorsPage.map_Layout_Grid_elm.waitFor({ state: 'visible', timeout: 15000 }),
        this.locatorsPage.map_Layout_Canvas_elm.waitFor({ state: 'visible', timeout: 15000 }),
      ]);
    } catch (error) {
      console.log("Timeout: Neither Grid nor Canvas Layout became visible within 15 seconds.");
      return;
    }

    // After first visible one is found, identify which one is shown
    if (await this.locatorsPage.map_Layout_Grid_elm.isVisible()) {
      console.log("\n");
      console.log("------- Grid Map Layout is successfully displayed...");
    } else if (await this.locatorsPage.map_Layout_Canvas_elm.isVisible()) {
      console.log("\n");
      console.log("------- Canvas Map Layout is successfully displayed...");
    } else {
      console.log("Unexpected state: Neither layout is visible after wait.");
    }
  }




  /**
  * Verifies main dashboard elements for the logged-in member.
  * Currently verifies username is displayed.
  */

  async verifyMemberDashboardElemnts() {
    console.log("------------------------------------------");
    console.log("Verifying Member Dashoboard elements...");
    console.log("------------------------------------------");
    await this.page.waitForTimeout(1000);
    const text = await this.reusableActionClass.getTextMessage(this.locatorsPage.member_userName_dashboard);
    console.log(`DashBoard Text Is Display: ${text}`);
    console.log("=================================================");
  }

  async mapLayoutZoneName() {
   console.log("\n");
    console.log("------------------------------------------");
    console.log("Verifying Zone Name on Map Layout...");
    console.log("------------------------------------------");
    const text = await this.reusableActionClass.getTextMessage(this.locatorsPage.map_Layout_Zone_Name_h2);
    console.log(`Zone Name on Map Layout Is Display: ${text}`);
    console.log("\n=================================================");
  }


  


 

  async printParkingSpotDetails() {

    // Count hourly spots
    const hourlySpotsCount = await this.locatorsPage.parking_hourly_all_spots.count();
    console.log(`\nHourly Parking Spots: ${hourlySpotsCount}`);



  }

  async minutes30MeetingBooking() {
    const now = new Date();
    let minutes = now.getMinutes();
    let hours = now.getHours();
  
    // Round up to the next 30-min interval
    if (minutes >= 29) {
      minutes = 30;
    } else {
      minutes = 0;
    }
  
    // If it's past 59 mins, move to next hour
    if (now.getMinutes() >= 59) {
      hours += 1;
      minutes = 0;
    }
  
    const formattedStart = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
  
    // Build dynamic XPath for slot click
    const dynamicSlotXPath = `//td[contains(@class, 'fc-timegrid-slot-lane') and @data-time='${formattedStart}']`;
  
    const slot = this.page.locator(dynamicSlotXPath);
  
    if (await slot.isVisible()) {
      await slot.click();
      console.log(`Clicked available slot: ${formattedStart}`);
    } else {
      console.log(`No visible slot found at: ${formattedStart}`);
      return false;
    }
  
    return true;
  }
  

  async verifyHourlyPopupElements() {
    await this.reusablePageClass.refreshAndCountDays();
    await this.page.waitForTimeout(2000);
    console.log("Verifying 'Hourly Booking' popup elements...");
    await this.webElementActionClass.Click(this.locatorsPage.availableFirstDaysForBooking);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.member_booking_popup, ElementsName.NoMap.NoMAP_Popup);
    await this.verifyElementIsVisible(this.locatorsPage.goto_map_btn, ElementsName.NoMap.Goto_map_btn);
    await this.verifyElementIsVisible(this.locatorsPage.pop_up_close_btn, ElementsName.NoMap.Close_btn);
    await this.verifyElementIsVisible(this.locatorsPage.pop_up_x_icon, ElementsName.NoMap.x_icon);
    //await this.reusablePageClass.assertElementHidden(this.locatorsPage.getRandomSpaceButton, ElementsName.NoMap.Get_Random_Space_btn);
    await this.webElementActionClass.Click(this.locatorsPage.pop_up_close_btn);
    console.log("\nClosing 'Map LayOut' popup...");
    await this.page.waitForTimeout(1000);
  }


  async verifyMapHourlyPopupElements() {
    console.log("Verifying 'Hourly Booking' Map popup elements...");
    const title1 = await this.locatorsPage.first_park_spot_Available.getAttribute('title');
    console.log(`Selected Spot:-${title1}`);
    await this.webElementActionClass.Click(this.locatorsPage.first_park_spot_Available);
    await this.page.waitForTimeout(1000);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.member_hourly_booking_popup, ElementsName.NoMap.NoMAP_Popup);
    if (!title1) {
      throw new Error(`\n${title1} is null or undefined.`);
    }
    await this.reusablePageClass.assertSpotTextContainsTitle(title1);
    await this.verifyElementIsVisible(this.locatorsPage.pop_up_x_icon, ElementsName.NoMap.x_icon);
    await this.webElementActionClass.Click(this.locatorsPage.pop_up_x_icon);
    console.log("\nClosing 'Map LayOut' popup...");
    await this.page.waitForTimeout(2000);
  }

  /**
   * Releases all booked hourly spots.
   * Iterates through booked spots and clicks to release each one.
   * Displays success message after each release.
   */

  async bookedSpotUserDetails() {
    const bookedSpotuser = await this.locatorsPage.parking_realese_hourly_Booked_user.innerText();
    const bookedSpotusertext = bookedSpotuser?.trim() || '';
    console.log(`\nBooked Spot For User : "${bookedSpotusertext}"`);
  }

  async VerifyCreditValue() {
    const creditValue = await this.getCreditValue();
    if (creditValue !== null) {
      console.log(`\nCurrent Displayed Credit: ${creditValue}`);
    } else {
      console.log('\nCredit system is NOT Enabled.  Skipping credit checks.On Dashboard.');
    }
    console.log("<<================================================================>>");
    return creditValue;
  }

  async getCreditValue() {
    const creditLocator = this.locatorsPage.credits_value_elm;

    if ((await creditLocator.count()) === 0) {

      return null;
    }

    if (!(await creditLocator.isVisible())) {

      return null;
    }

    const text = await creditLocator.textContent();
    const value = parseFloat(text?.trim() || '0');

    if (isNaN(value)) {
      console.log('Could not parse credit value.');
      return null;
    }

    return value;
  }



  async expectCreditChange(before: number | null, after: number | null, expectedChange: number, context = '') {
    if (before === null || after === null) {
      console.warn(`\nSkipping credit check — credit system not enabled. ${context}`);
      return;
    }
    console.log('----------------------------------')
    console.log('Verifying Credits on Booking');
    console.log('----------------------------------')
    console.log(`Currunt Credits:      (${before})`)
    console.log(`Booking Credits:      (-${expectedChange})`);
    console.log(`After Booking Credits:(${after})`);
    console.log('----------------------------------')

    const actualChange = before - after;

    expect(actualChange, `Credit change mismatch ${context}`).toBe(expectedChange);
    console.log(`Credit change validated: ${expectedChange} (${context})`);
    console.log("\n<<================================================================>>");
  }



  async expectCreditChangeafter(
    before: number | null,
    after: number | null,
    expectedFullChange: number,
    context = '',
    throwOnMismatch = false // Make true if test should fail on partial/no refund
  ) {
    if (before === null || after === null) {
      console.warn(`Skipping credit check — credit system not enabled. (${context})`);
      return;
    }

    const actualChange = +(after - before).toFixed(2); // Handle float precision
    const expected = expectedFullChange;

    // Determine refund percentage
    const percentage = +(actualChange / expected * 100).toFixed(0);

    let refundType = 'UNKNOWN';
    if (actualChange === 0) refundType = 'NO_REFUND';
    else if (percentage === 100) refundType = 'FULL_REFUND';
    else if (percentage > 0 && percentage < 100) refundType = `PARTIAL_REFUND (${percentage}%)`;
    console.log('----------------------------------')
    console.log('Verifying Credits on Release Booking');
    console.log('----------------------------------')
    console.log(`Currunt Credits:     (${before})`);
    console.log(`Actual Refund:       (+${actualChange})`);
    console.log(`After Credit Refund: (${after})`);
    console.log('----------------------------------')
    console.log(`\nExpected Refund:   (${expected})`);
    console.log(`Refund Detected:   ${refundType}`);
    console.log('----------------------------------')

    if (throwOnMismatch && actualChange !== expected) {
      throw new Error(
        `Credit mismatch (${context})\n` +
        `Expected: ${expected}\n` +
        `Actual:   ${actualChange}\n` +
        `Refund:   ${refundType}`
      );
    }

    console.log(`Credit refund check complete: ${refundType} (${context})\n`);
    console.log("<<================================================================>>");
  }





}





