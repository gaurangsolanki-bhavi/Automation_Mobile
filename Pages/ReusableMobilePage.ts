import * as XLSX from 'xlsx';
import Actions from './ActionWaitMob';
import Locatore from './mobile/iOS/LocatoreiOSPage';
import MobileData from '../test-data/JSON/MobileTestData.json';
import { testConfig } from '../wdio.conf';
import dayjs from 'dayjs';
import { remote } from 'webdriverio';
import * as fs from 'fs';
import path from 'path';

export default class ReusableMobilePage {

  actionClass = new Actions();

  async getTestData(sheetName: string, excelPath: string): Promise<any[]> {
    const workbook = XLSX.readFile(excelPath);
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      throw new Error(`Sheet "${sheetName}" not found in file "${excelPath}"`);
    }
    return XLSX.utils.sheet_to_json(sheet);
  }


  /**
 * Get user by index
 */
  async getUserByIndex(sheetName: string, excelPath: string, index: number): Promise<any> {
    const users = await this.getTestData(sheetName, excelPath);
    if (index >= users.length) {
      throw new Error(`Index ${index} is out of range. Total users: ${users.length}`);
    }
    return users[index];
  }

  async readExcelData(filePath: string, sheetName: string): Promise<any[]> {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      throw new Error(`Sheet "${sheetName}" not found in ${filePath}`);
    }
    const datas = XLSX.utils.sheet_to_json(sheet);
    return datas.map((data: any) => {
      const normalized: Record<string, any> = {};
      for (const key in data) {
        normalized[key.toLowerCase()] = data[key];
      }
      return normalized;
    });
  }

  async generateRandomNumber() {
    const randomNumber = Math.floor(10000 + Math.random() * 90000).toString(); // Always 5 digits
    const carPlate = `CAR${randomNumber}`;
    console.log(`\nNew Car Plate Number: ${carPlate}`);
    return carPlate;
  }

  async generateRandomNumberMeetings() {
    const randomNumber = Math.floor(100 + Math.random() * 90000).toString(); // Always 5 digits
    const Meeting = `Meeting${randomNumber}`;
    console.log(`\n`);
    console.log(`New Meeting Name is: ${Meeting}`);
    return Meeting;
  }

  async selectOptionFromDropdownMobile(dropdownElement: WebdriverIO.Element, dropdownName?: string): Promise<void> {
    try {
      console.log("\n🔽 Tapping on dropdown to show options...");
      await this.actionClass.waitForElementAndClick(dropdownElement);
      await browser.pause(1000);

      const options = await $$('//android.widget.LinearLayout[@resource-id="ie.jemstone.ronspot:id/itemLl"]//android.widget.TextView | //XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeStaticText');
      console.log('\n')
      console.log("***********************************");
      console.log(`${dropdownName ?? 'Dropdown'}: Available Options`);
      console.log("***********************************");

      for (let i = 0; i < options.length; i++) {
        const txt = await options[i].getText();
        console.log(`${i + 1}: ${txt}`);
      }

      if (options.length > 0) {
        console.log('\n')
        console.log(`✅ Selecting first option: ${await options[0].getText()}`);
        await options[0].click();
      }
      else {
        console.error('❌ No options found. Cannot select.');
      }

      await browser.pause(1000);
      console.log("=================================================");
    } catch (error) {
      console.error(`❌ Failed to select dropdown option: ${dropdownName}`, error);
      throw error;
    }
  }

  async selectOptionIndexFromDropdownMobile(
    dropdownElement: WebdriverIO.Element,
    preferredIndex: number,
    dropdownName?: string
  ): Promise<void> {
    try {
      console.log(`\n🔽 Opening dropdown: ${dropdownName ?? 'Dropdown'}`);
      await this.actionClass.waitForElementAndClick(dropdownElement);
      await browser.pause(1000);

      const options = await $$('//android.widget.ListView//android.widget.LinearLayout//android.widget.TextView | //XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeStaticText');

      console.log("\n***********************************");
      console.log(`${dropdownName ?? 'Dropdown'}: Available Options`);
      console.log("***********************************");

      for (let i = 0; i < options.length; i++) {
        const txt = await options[i].getText();
        console.log(`${i + 1}: ${txt}`);
      }

      if (options.length > preferredIndex) {
        console.log(`\n✅ Selecting preferred index ${preferredIndex + 1}: ${await options[preferredIndex].getText()}`);
        await options[preferredIndex].click();
      } else if (options.length > 0) {
        console.warn(`\nPreferred index not found. Selecting first: ${await options[0].getText()}`);
        await options[0].click();
      } else {
        console.error('\n❌ No options found. Cannot select.');
      }

      await browser.pause(2000);
      console.log("=================================================");
    } catch (error) {
      console.error(`❌ Failed to select option from dropdown: ${dropdownName}`, error);
      throw error;
    }
  }

  async selectDropdownOptionByValueMobile(
    dropdownElement: WebdriverIO.Element,
    optionText: string,
    dropdownName?: string
  ): Promise<void> {
    try {
      console.log(`\n🔽 Opening dropdown: ${dropdownName ?? 'Dropdown'}`);
      await this.actionClass.waitForElementAndClick(dropdownElement);
      await browser.pause(3000);

      const options = await $$('//XCUIElementTypeCell//XCUIElementTypeStaticText | //android.widget.CheckedTextView');

      console.log("\n***********************************");
      console.log(`${dropdownName ?? 'Dropdown'}: Available Options`);
      console.log("***********************************");

      let matched = false;
      for (let i = 0; i < options.length; i++) {
        const txt = await options[i].getText();
        console.log(`${i + 1}: ${txt}`);

        if (txt.trim().toLowerCase() === optionText.trim().toLowerCase()) {
          console.log(`\n✅ Selecting matching option: ${txt}`);
          await options[i].click();
          matched = true;
        }
      }
      if (!matched) {
        console.error(`\n❌ Option "${optionText}" not found in dropdown.`);
      }

      await browser.pause(1000);
      console.log("=================================================");
    } catch (error) {
      console.error(`❌ Failed to select option "${optionText}" from dropdown: ${dropdownName}`, error);
      throw error;
    }
  }

  async selectZoneMobile(
    dropdownElement: WebdriverIO.Element,
    optionText: string,
    dropdownName?: string
  ): Promise<void> {
    try {
      console.log(`\n🔽 Opening dropdown: ${dropdownName ?? 'Zone Selector'}`);
      await this.actionClass.waitForElementAndClick(dropdownElement);
      await browser.pause(3000);

      const options = await $$('//XCUIElementTypeTable//XCUIElementTypeCell//XCUIElementTypeStaticText | //android.widget.TextView');

      console.log("\n***********************************");
      console.log(`${dropdownName ?? 'Zone Selector'}: Available Zones`);
      console.log("***********************************");

      let matchedIndex = -1;

      for (let i = 0; i < options.length; i++) {
        const txt = await options[i].getText();
        console.log(`Zone ${i + 1}: ${txt}`);

        if (txt.trim().toLowerCase() === optionText.trim().toLowerCase()) {
          matchedIndex = i;
        }
      }

      if (matchedIndex >= 0) {
        console.log(`\n✅ Selecting matching zone: ${await options[matchedIndex].getText()}`);
        await options[matchedIndex].click();
        await browser.pause(1000);
        console.log("=================================================");
      } else {
        console.error(`\n❌ Zone "${optionText}" not found in dropdown.`);
        throw new Error(`Zone "${optionText}" not found.`);
      }
    } catch (error) {
      console.error(`❌ Failed to select zone "${optionText}" from dropdown: ${dropdownName ?? 'Zone Selector'}`, error);
      throw error;
    }
  }

  async refreshAndCountDaysMobile(): Promise<void> {
    try {
      await driver.pause(3000);

      const refreshElements = await $$('//XCUIElementTypeImage[@name="refreshicon"] | //android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/refreshIv"]');
      console.log(`Total Refresh Elements: ${refreshElements.length}`);

      await driver.pause(2000);

      while (true) {
        const refreshButtons = refreshElements;
        const count = refreshButtons.length;

        await driver.pause(2000);

        if (count === 0) {
          console.log('No more refresh buttons found. Exiting loop.');
          break;
        }

        const firstButton = refreshButtons[0];

        const isEnabled = await firstButton.isEnabled().catch(() => false);
        const isDisplayed = await firstButton.isDisplayed().catch(() => false);

        if (isEnabled && isDisplayed) {
          await this.actionClass.waitForElementAndClick(firstButton);
          console.log(`✅ Clicked on Refresh icon`);
          await driver.pause(2000);
        } else {
          console.log('First refresh icon is disabled or not visible. Breaking loop.');
          break;
        }
      }

      // ✅ Count available booking days
      const availableDays = await $$('//XCUIElementTypeImage[@name="availabeldayicon"] | //android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/availableSpotIv"]');
      console.log(`Total Available Days for Booking: ${availableDays.length}`);

      // ✅ Count not available booking days
      // const notAvailableDays = await $$('//*[@content-desc="not-available-day" or @label="not-available-day"]'); // Adjust locator
      // console.log(`Total Not Available Days for Booking: ${notAvailableDays.length}`);

      // ✅ Check if no booking space is available
      if (availableDays.length === 0) {
        console.error("❌ No space available for booking! Please contact the admin.");
        throw new Error("No space available for booking! Please contact the admin.");
      }

    } catch (error) {
      console.error('❌ Error during refresh and count booking days:', error);
      throw error;
    }
  }

  async dropDownOptionPrintMobile(
    dropdownElement: WebdriverIO.Element,
    dropdownElementdrpdown: string,
    dropdownName?: string
  ): Promise<void> {
    console.log(`🔽  Opening dropdown: ${dropdownName ?? 'Dropdown'}`);
    await this.actionClass.waitForElementAndClick(dropdownElement);
    await browser.pause(1000); // Small wait for options to load

    const options = await $$(dropdownElementdrpdown || 'android.widget.TextView');
    console.log('\n')
    console.log("***********************************");
    console.log(`${dropdownName ?? 'Dropdown'}: Available Options`);
    console.log("***********************************");

    if (options.length === 0) {
      console.log("❌ No options found.");
    } else {
      for (let i = 0; i < options.length; i++) {
        const txt = await options[i].getText();
        console.log(`${i + 1}: ${txt}`);
      }
      await browser.pause(1000);
      //await this.actionClass.waitForElementAndClick(await LocatorePage.selectedDropdownsOptionsEditProfile);
      await driver.back();
    }
    console.log("=================================================");
  }

  async selectOptionFromDropdown(
    dropdownElement: WebdriverIO.Element,
    dropdownName?: string
  ): Promise<void> {
    try {
      console.log(`\n🔽 Opening dropdown: ${dropdownName ?? 'Dropdown'}`);
      await this.actionClass.waitForElementAndClick(dropdownElement);
      await browser.pause(1000); // Wait for options to appear

      const options = await $$(
        '//android.widget.LinearLayout[@resource-id="ie.jemstone.ronspot:id/itemLl"]//android.widget.TextView | //XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeStaticText'
      );

      if (options.length > 0) {
        console.log(`✅ Selecting first available option...`);
        await options[0].click();
      } else {
        console.error('❌ No dropdown options found to select.');
      }

      await browser.pause(1000); // Wait after selection
    } catch (error) {
      console.error(`❌ Failed to select option from dropdown: ${dropdownName}`, error);
      throw error;
    }
  }

  async releaseAnyBookedSpot(
    bookedSpotElements: () => Promise<WebdriverIO.ElementArray>,
    cancelButton: () => Promise<WebdriverIO.Element>,
    confirmCancelButton: () => Promise<WebdriverIO.Element>,
    monthHeader: () => Promise<WebdriverIO.Element>,
    previousMonthButton: () => Promise<WebdriverIO.Element>): Promise<boolean> {

    const today = new Date();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const expectedMonthYear = `${monthNames[today.getMonth()]} ${today.getFullYear()}`;

    const calendarHeaderElement = await monthHeader();
    const currentHeaderText = await calendarHeaderElement.getText();
    console.log(`📅 Current Calendar Header: ${currentHeaderText}`);

    if (!currentHeaderText.includes(expectedMonthYear)) {
      console.log(`🔄 Navigating to current month: ${expectedMonthYear}`);
      const previousMonthBtn = await previousMonthButton();
      const location = await previousMonthBtn.getLocation();
      const size = await previousMonthBtn.getSize();
      const x = location.x + size.width / 2;
      const y = location.y + size.height / 2;

      if (driver.isIOS) {
        // iOS: use mobile: tap
        await driver.execute('mobile: tap', { x, y });
      } else if (driver.isAndroid) {
        // Android: try click, fallback to mobile: clickGesture
        try {
          await previousMonthBtn.click();
        } catch (e) {
          console.log('⚠️ .click() failed. Using mobile: clickGesture instead.');
          await driver.execute('mobile: clickGesture', { x, y });
        }
      }
      await browser.pause(5000);
    } else {
      console.log("✅ Already on current month.");
    }

    let assignedSpots = await bookedSpotElements();
    let count = assignedSpots.length;

    console.log(`🔍 Total Booked Spots: ${count}`);

    if (count === 0) {
      console.log("✅ No booked spot found to release.");
      return true;
    }

    for (let i = 0; i < count; i++) {
      // Re-fetch updated element list after each release
      assignedSpots = await bookedSpotElements();

      if (assignedSpots.length === 0) {
        console.log("ℹ️ Booked spots list became empty during iteration.");
        break;
      }

      const bookedSpot = assignedSpots[0];

      await this.actionClass.waitForElementAndClick(bookedSpot);
      await this.actionClass.waitForElementAndClick(await cancelButton());
      await this.actionClass.waitForElementAndClick(await confirmCancelButton());

      await browser.pause(3000);
    }

    // Final check to ensure all spots are released
    const remainingSpots = await bookedSpotElements();
    const remainingCount = remainingSpots.length;

    if (remainingCount === 0) {
      console.log("✅ All booked spots have been successfully released.");
      return true;
    } else {
      console.warn(`⚠️ ${remainingCount} booked spot(s) still remain after release attempt.`);
      return false;
    }
  }

  async refreshAndCountDays(): Promise<void> {
    console.log("📲 Starting booking attempt on mobile...");
    await browser.pause(2000);
    const availableDays = await $$('//XCUIElementTypeImage[@name="availabeldayicon"] | //android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/availableSpotIv"]');

    if (availableDays.length > 1) {
      console.log(`✅ Found ${availableDays.length} available booking day(s). Proceeding with booking...`);
      const firstAvailableDay = availableDays[0];
      return;
    }
    console.log("♻️ No available days found initially. Triggering refresh...");
    await this.refreshAndCountDaysMobile();
  }

  async refreshAndCountDaysForMultiDays(): Promise<void> {
    console.log("📲 Starting booking attempt on mobile...");
    await browser.pause(2000);
    const availableDays = await $$('//XCUIElementTypeImage[@name="availabeldayicon"] | //android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/availableSpotIv"]');

    if (availableDays.length > 10) {
      console.log(`✅ Found ${availableDays.length} available booking day(s). Proceeding with booking...`);
      const firstAvailableDay = availableDays[0];
      return;
    }
    console.log("♻️ No available days found initially. Triggering refresh...");
    await this.refreshAndCountDaysMobile();
  }

  async loadUserData() {
    const users = await this.readExcelData(testConfig.excelPath, 'MobileUser');
    if (users.length === 0) {
      throw new Error('No credentials found in Excel file.');
    }
    return users[0].zone;
  }

  public async selectZoneByTextMobile(
    dropdownElement: WebdriverIO.Element,
    optionText: string,
    dropdownName?: string
  ): Promise<void> {
    console.log(`\n🔽 Opening dropdown: ${dropdownName ?? 'Zone Selector'}`);
    await this.actionClass.waitForElementAndClick(dropdownElement);
    await browser.pause(1500);

    let found = false;
    let scrollCount = 0;

    let printedOptions = false;

    while (!found && scrollCount < 10) {
      const matchingElements = await $$('//XCUIElementTypeTable//XCUIElementTypeCell//XCUIElementTypeStaticText | //android.widget.ListView//android.widget.LinearLayout//android.widget.TextView');

      if (!printedOptions) {
        for (let i = 0; i < matchingElements.length; i++) {
          const text = await matchingElements[i].getText();
          console.log(`Zone ${i + 1}: ${text}`);
        }
        printedOptions = true;
      }
      for (const el of matchingElements) {
        const text = await el.getText();
        if ((text ?? '').trim().toLowerCase() === (optionText ?? '').trim().toLowerCase()) {
          console.log(`✅ Found match, trying to click parent cell of: ${text}`);
          if (await el.isDisplayed()) {
            await el.click();
            found = true;
            break;
          } else {
            console.warn(`⚠️ Cell for "${text}" is not visible. Will scroll more.`);
          }
        }
      }
      if (!found) {
        console.log(`↕️ Scrolling inside dropdown (attempt ${scrollCount + 1})...`);
        await this.actionClass.swipeInsideDropdown(); // scrolls inside the table only
        scrollCount++;
      }
    }
    if (!found) {
      console.error(`❌ Zone "${optionText}" not found after scrolling.`);
      throw new Error(`Zone "${optionText}" not found in dropdown.`);
    }
    console.log("✅ Zone selection complete.");
  }

  async releaseSpotNextMonthFromCalendar(
    bookedSpotElements: () => Promise<WebdriverIO.ElementArray>,
    cancelButton: () => Promise<WebdriverIO.Element>,
    confirmCancelButton: () => Promise<WebdriverIO.Element>): Promise<boolean> {

    let assignedSpots = await bookedSpotElements();
    let count = assignedSpots.length;

    console.log(`🔍 Total Booked Spots: ${count}`);

    if (count === 0) {
      console.log("✅ No booked spot found to release.");
      return true;
    }

    for (let i = 0; i < count; i++) {
      // Re-fetch updated element list after each release
      assignedSpots = await bookedSpotElements();

      if (assignedSpots.length === 0) {
        console.log("ℹ️ Booked spots list became empty during iteration.");
        break;
      }
      const bookedSpot = assignedSpots[0];
      await this.actionClass.waitForElementAndClick(bookedSpot);
      await this.actionClass.waitForElementAndClick(await cancelButton());
      await this.actionClass.waitForElementAndClick(await confirmCancelButton());
      await browser.pause(5000);
    }

    // Final check to ensure all spots are released
    const remainingSpots = await bookedSpotElements();
    const remainingCount = remainingSpots.length;

    if (remainingCount === 0) {
      console.log("✅ All booked spots have been successfully released.");
      return true;
    } else {
      console.warn(`⚠️ ${remainingCount} booked spot(s) still remain after release attempt.`);
      return false;
    }
  }

  async performCheckInFromCalendar(checkInBtnLocator: WebdriverIO.Element, checkOutBtnLocator: WebdriverIO.Element, btnCancleBooking: WebdriverIO.Element, btnBack: WebdriverIO.Element) {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Perform CheckIn From Calendar...");
    console.log("----------------------------------");
    const todayDate = dayjs().date().toString();
    console.log(`📅 Today's Date: ${todayDate}`);
    await browser.pause(3000);
    const todaySpotSelector = `(//XCUIElementTypeStaticText[@name="${todayDate}"])[1] | (//android.widget.TextView[@text="${todayDate}"])[1]`;
    const todaySpot = await $(todaySpotSelector);
    await this.actionClass.waitForElementAndClick(todaySpot);
    console.log(`✅ Clicked on today's date: ${todayDate}`);
    await browser.pause(2000);
    await this.actionClass.waitForElementAndClick(checkInBtnLocator);
    console.log(`🟢 Check-in button clicked`);
    await browser.pause(3000);
    await this.actionClass.waitForElementAndClick(todaySpot);
    console.log(`🔁 Clicked again on today's date: ${todayDate}`);
    await browser.pause(2000);
    const isCheckOutVisible = await checkOutBtnLocator.isDisplayed();
    if (isCheckOutVisible) {
      console.log(`➡️ User Check-In Successfully`);
    } else {
      console.warn(`❌ User Not Check-In Successfully`);
    }
    await this.actionClass.waitForElementAndClick(btnCancleBooking);
    await this.actionClass.waitForElementAndClick(btnBack);
  }

  async performCheckOutFromCalendar(checkOutBtnLocator: WebdriverIO.Element, checkInBtnLocator: WebdriverIO.Element, btnCancleBooking: WebdriverIO.Element, btnBack: WebdriverIO.Element) {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Perform CheckOut From Calendar...");
    console.log("----------------------------------");
    const todayDate = dayjs().date().toString();
    console.log(`📅 Today's Date: ${todayDate}`);
    await browser.pause(3000);
    const todaySpotSelector = `(//XCUIElementTypeStaticText[@name="${todayDate}"])[1] | (//android.widget.TextView[@text="${todayDate}"])[1]`;
    const todaySpot = await $(todaySpotSelector);
    await this.actionClass.waitForElementAndClick(todaySpot);
    console.log(`✅ Clicked on today's date: ${todayDate}`);
    await browser.pause(2000);
    await this.actionClass.waitForElementAndClick(checkOutBtnLocator);
    console.log(`🟢 Check-Out button clicked`);
    await browser.pause(3000);
    await this.actionClass.waitForElementAndClick(todaySpot);
    console.log(`🔁 Clicked again on today's date: ${todayDate}`);
    await browser.pause(2000);
    const isCheckInVisible = await checkInBtnLocator.isDisplayed();
    if (isCheckInVisible) {
      console.log(`⬅️ User CheckOut Successfully`);
    } else {
      console.warn(`❌ User Not CheckOut Successfully`);
    }
    await this.actionClass.waitForElementAndClick(btnCancleBooking);
    await this.actionClass.waitForElementAndClick(btnBack);
  }

  async selectTeamMember(index: number, teamInactiveBtn: WebdriverIO.Element, teamActiveBtn: WebdriverIO.Element, teamDropdown: WebdriverIO.Element, teamOptionsSelector: string) {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Selecting Team Member");
    console.log("----------------------------------");

    if (await teamInactiveBtn.isDisplayed()) {
      console.log("🔘 Team dropdown is closed. Opening...");
      await this.actionClass.waitForElementAndClick(teamInactiveBtn);
      await browser.pause(1000);
      await this.actionClass.waitForElementAndClick(teamDropdown);
      await browser.pause(1000);
    } else if (await teamActiveBtn.isDisplayed()) {
      console.log("✅ Team dropdown is already open.");
      await this.actionClass.waitForElementAndClick(teamDropdown);
    } else {
      console.warn("⚠️ Could not find Team selector button.");
      return;
    }
    const userOptions = await $$(teamOptionsSelector);
    console.log("\n********************************");
    console.log("Team Member Dropdown Options:");
    console.log("********************************");
    if (userOptions.length === 0) {
      console.warn("❌ No Team options found.");
      return;
    }
    for (let i = 0; i < userOptions.length; i++) {
      const optionText = await userOptions[i].getText();
      console.log(`🔹 [${i}] ${optionText}`);
    }
    if (index >= 0 && index < userOptions.length) {
      console.log(`👤 Selecting user at index ${index}`);
      await this.actionClass.waitForElementAndClick(userOptions[index]);
    } else {
      console.warn(`❌ Invalid index ${index}. Options available: ${userOptions.length}`);
    }
  }

  async selectTeamMemberAndroid(index: number, showEmployee: WebdriverIO.Element, teamDropdown: WebdriverIO.Element, teamOptionsSelector: string) {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Selecting Team Member");
    console.log("----------------------------------");
    await browser.pause(2000);
    if (!await teamDropdown.isDisplayed()) {
      console.log("🔘 Team dropdown is closed. Opening...");
      await this.actionClass.waitForElementAndClick(showEmployee);
      await browser.pause(1000);
      await this.actionClass.waitForElementAndClick(teamDropdown);
      await browser.pause(1000);
    } else if (await teamDropdown.isDisplayed()) {
      await this.actionClass.waitForElementAndClick(teamDropdown);
    }
    else {
      console.warn("⚠️ Could not find Team selector button.");
      return;
    }
    const userOptions = await $$(teamOptionsSelector);
    console.log("\n********************************");
    console.log("Team Member Dropdown Options:");
    console.log("********************************");
    if (userOptions.length === 0) {
      console.warn("❌ No Team options found.");
      return;
    }
    for (let i = 0; i < userOptions.length; i++) {
      const optionText = await userOptions[i].getText();
      console.log(`🔹 [${i}] ${optionText}`);
    }
    if (index >= 0 && index < userOptions.length) {
      console.log(`👤 Selecting user at index ${index}`);
      await this.actionClass.waitForElementAndClick(userOptions[index]);
    } else {
      console.warn(`❌ Invalid index ${index}. Options available: ${userOptions.length}`);
    }
  }
  async countActiveAndInactiveSpots(
    bookingPopupSelector: WebdriverIO.Element,
    cancelBtn: WebdriverIO.Element
  ) {
    const spots = await $$('//XCUIElementTypeScrollView/XCUIElementTypeOther/XCUIElementTypeButton');
    let active = 0;
    let inactive = 0;

    for (let i = 0; i < spots.length; i++) {
      const spot = spots[i];
      console.log(`🟢 Checking spot index ${i}`);

      try {
        await spot.click();
        await driver.pause(3000); // Allow time for popup to load

        const isPopupDisplayed = await bookingPopupSelector.isDisplayed();
        console.log('Title Text :', isPopupDisplayed);

        if (isPopupDisplayed) {
          active++;
          console.log(`✅ Spot ${i} is Active`);

          if (await cancelBtn.isDisplayed()) {
            await cancelBtn.click();
            await driver.pause(2000);
          }
        } else {
          inactive++;
          console.log(`❌ Spot ${i} is Inactive`);
        }
      } catch (err) {
        inactive++;
        console.log(`⚠️ Spot ${i} interaction failed: counting as Inactive`);
      }
    }

    console.log(`\n🔍 Total Active Spots: ${active}`);
    console.log(`🔍 Total Inactive Spots: ${inactive}`);
  }

/* async forceClearLoginSessions(): Promise<void> {
  const bundleId = 'ie.jemstone.ronspot'; // ✅ Your app bundle ID
  const appPath = '/Users/bhavitechnologies/Automation_Hybrid/test_automation_ronspot/apps/RonSpot_Staging.app'; // or .app for simulator

  console.log('\n🔁 Uninstalling and reinstalling app to clear login sessions...\n');

  try {
    const isInstalled = await driver.isAppInstalled(bundleId);

    if (isInstalled) {
      await driver.removeApp(bundleId);
      console.log('❌ App removed successfully');
    }
    await driver.installApp(appPath);
    console.log('📦 App installed successfully');

    // await driver.execute('mobile: launchApp', { bundleId });
    // console.log('🚀 App launched');
  } catch (error: any) {
    console.error('❌ Failed to reinstall app:', error.message);
    throw error;
  }
} */

async forceClearLoginSessions(): Promise<void> {
  const bundleId = 'ie.jemstone.ronspot';

  const isRealDevice = (driver.capabilities as any).realDevice === true;
  const appPath = isRealDevice
    ? '/Users/krayonstechnology/test_automation_ronspot/apps/RonSpot_Staging.ipa'
    : '/Users/krayonstechnology/test_automation_ronspot/apps/RonSpot_Staging.app';

  console.log('\n🔁 Uninstalling and reinstalling app to clear login sessions...\n');

  try {
    const isInstalled = await driver.isAppInstalled(bundleId);

    if (isInstalled) {
      await driver.removeApp(bundleId);
      console.log('❌ App removed successfully');
    }

    // Only install correct file type
    if (isRealDevice && appPath.endsWith('.ipa')) {
      console.log('📱 Installing .ipa on real device...');
      await driver.installApp(appPath);
    } else if (!isRealDevice && appPath.endsWith('.app')) {
      console.log('🖥️ Installing .app on simulator...');
      await driver.installApp(appPath);
    } else {
      throw new Error(`❌ Invalid app file for ${isRealDevice ? 'real device' : 'simulator'}: ${appPath}`);
    }

    console.log('📦 App installed successfully');
  } catch (error: any) {
    console.error('❌ Failed to reinstall app:', error.message);
    throw error;
  }
}

async waitForLoaderToDisappear(loader: WebdriverIO.Element,timeout: number = 60000): Promise<void> {
  try {
    if (await loader.isDisplayed()) {
      await loader.waitForDisplayed({ timeout, reverse: true });
     console.log('🌀 Loader disappeared.');
    } else {
      console.log('🌀 Loader not visible initially.');
    }
  } catch (error) {
    console.warn('Loader not found or already disappeared.');
  }
}

}