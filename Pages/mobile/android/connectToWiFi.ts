import { execSync } from 'child_process';
import Actions from '../../ActionWaitMob';
import Locatore from '../../../Pages/mobile/android/LocatorePage';
import ReusableMobilePage from '../../ReusableMobilePage';
import dayjs from 'dayjs';
import MobileData from '../../../test-data/JSON/MobileTestData.json';


class ConnectWifi {

  actionClass: Actions;
  reusableMobilePage: ReusableMobilePage;

  constructor() {
    this.actionClass = new Actions();
    this.reusableMobilePage = new ReusableMobilePage();
  }

  async bookSpotCurrentDayFromCalendar() {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log("Booking Spot for Current Day...");
    console.log("--------------------------------------------------------------------");
    await browser.pause(5000);
    const today = new Date();
    await browser.pause(2000);
    const todayDay = dayjs().date().toString();
    console.log(`\nToday's Date :- ${todayDay}`);
    let clicked = false;
    await browser.pause(3000);
    const todayElement = await $(`(//android.widget.TextView[@text="${todayDay}"])[1]`);
    if (await todayElement.isDisplayed()) {
      await this.actionClass.waitForElementAndClick(todayElement);
      await this.reusableMobilePage.selectOptionIndexFromDropdownMobile(await Locatore.selectCarDropdown, 0, MobileData.Booking_Spot.Select_Car);
      await this.actionClass.waitForElementAndClick(await Locatore.btnGetRandomSpace);
      await browser.pause(8000);
      const bookedSpots = await Locatore.countBookedSpot;
      const bookedCount = bookedSpots.length;
      if (bookedCount > 0) {
        console.log(`✅ Spot successfully booked. Total booked spots: ${bookedCount}`);
        clicked = true;
      } else {
        console.error("❌ Booking failed: No booked spot detected after action.");
      }
    }
    else {
      console.error(`❌ Unable to find today's calendar element for day: ${todayDay}`);
    }
    if (!clicked) {
      throw new Error(`Booking not completed for today (${todayDay}).`);
    }
    console.log("\n<<================== ✅ Booking Process Completed ==================>>\n");
  }

  async navigateToCalandar() {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log("Navigating to Calendar Page...");
    console.log("--------------------------------------------------------------------");
    await browser.pause(3000);
    console.log("\nClicking on 'Calendar' icon...");
    await this.actionClass.waitForElementAndClick(await Locatore.CalendarNavigationBarItemIcon);
    console.log("\nCalendar page opened successfully.");
  }

  async connectToWiFi(ssid: string, password: string) {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log("🛜 Connecting to Wi-fi using SSID");
    console.log("--------------------------------------------------------------------");
    console.log(`Wi-fi SSID: ${ssid}`);

    // ✅ Skip logic if device is a virtual emulator
    const capabilities = driver.capabilities as any;
    const deviceName = (capabilities.deviceName || '').toLowerCase();
    const isEmulator = deviceName.includes('emulator') || deviceName.includes('sdk');
    const isRealDevice = !isEmulator;

    if (!isRealDevice) {
      console.log("📱 Virtual device (emulator) detected — skipping Wi-Fi connection logic.");
      return;
    }

    await driver.activateApp('com.android.settings');
    await browser.pause(3000);

    const labels = [
      "Network & Internet",
      "Connections",
      "Wi-Fi & Network",
      "Wi-Fi"
    ];

    let networkOption;
    let alreadyConnectedToTarget = false;
    let connectedToOther = false;
    let connectedSSIDText = "";
    let found = false;
    for (const label of labels) {
      try {
        networkOption = await $(`android=new UiSelector().textContains("${label}")`);
        if (await networkOption.isDisplayed()) {
          console.log(`✅ Found network option: "${label}"`);
          await networkOption.click();
          found = true;
          break;
        }
      } catch { /* ignore and try next */ }
    }

    if (!found) {
      throw new Error("❌ Could not find a supported Network Settings option.");
    }
    await browser.pause(2000);

    const wifiOption = await $('android=new UiSelector().textContains("Wi-Fi")');
    await wifiOption.click();
    await browser.pause(2000);

    const wifiSwitch = await $('android=new UiSelector().className("android.widget.Switch")');
    const isChecked = await wifiSwitch.getAttribute('checked');

    if (isChecked === 'false') {
      console.log("🔄 Wi-Fi is OFF — turning it ON...");
      await wifiSwitch.click();
      await browser.pause(3000);
    } else {
      console.log("✅ Wi-Fi is already ON");
    }
    await browser.pause(3000);
    const connectedElements = await $$('android=new UiSelector().textContains("Connected")');
    for (const el of connectedElements) {
      const text = await el.getText();
      connectedSSIDText = text;

      if (text.includes(ssid)) {
        alreadyConnectedToTarget = true;
        break;
      } else {
        connectedToOther = true;
      }
    }

    if (alreadyConnectedToTarget) {
      console.log(`✅ Already connected to SSID: ${ssid} — skipping connection.`);
      return;
    }

    if (connectedToOther) {
      console.log(`🔁 Connected to different SSID (${connectedSSIDText}) — switching to ${ssid}...`);
    } else {
      console.log(`🛜 No current connection — attempting to connect to ${ssid}...`);
    }

    try {
      const ssidElement = await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("${ssid}")`);
      await ssidElement.click();
      await browser.pause(2000);
    } catch (err) {
      throw new Error(`❌ SSID "${ssid}" not found in list.`);
    }
    const passwordField = await $('android.widget.EditText');
    if (await passwordField.isDisplayed()) {
      await passwordField.setValue(password);
      await browser.pause(2000);
      await driver.pressKeyCode(66);
      console.log("ℹ️ Password field not shown — maybe already saved or open network.");
    }

    console.log(`🔐 Connection attempt to SSID: ${ssid} complete.`);
    await browser.pause(2000);
  }

  async toggleWifiCheckin(desiredState: 'ON' | 'OFF'): Promise<void> {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log("🛜 Allow check-in with Wi-Fi");
    console.log("--------------------------------------------------------------------");
    const toggleElement = await Locatore.wifiToggleButton;
    const isToggleEnabled = await toggleElement.isEnabled();

    if (!isToggleEnabled) {
      throw new Error("❌ No Wifi Configuration is Setup or Check Zone CheckIn type it should be WiFi");
    }

    const currentState = await toggleElement.getAttribute('checked');

    if (desiredState === 'ON') {
      if (currentState === 'true') {
        console.log("🛜 Wi-Fi Check-in Toggle is already 🟢 ON");
      } else if (currentState === 'false') {
        console.log("⚙️ Turning ON the Wi-Fi Check-in Toggle...");
        await this.actionClass.waitForElementAndClick(toggleElement);
        const toast = await Locatore.toastPopUpMessage;
        const toastText = await toast.getText();
        console.log("⚠️ Wifi CheckIn Toggle Toast Message:", toastText);
        console.log("\n")
        await this.actionClass.assertElementTextEquals(toastText, MobileData.PopUp_Messages.Wifi_CheckIn_Enabled_Msg);
      } else {
        throw new Error("❌ Unknown toggle state for Wi-Fi Check-in");
      }
    } else if (desiredState === 'OFF') {
      if (currentState === 'false') {
        console.log("🛜 Wi-Fi Check-in Toggle is already 🔴 OFF");
      } else if (currentState === 'true') {
        console.log("⚙️ Turning OFF the Wi-Fi Check-in Toggle...");
        await this.actionClass.waitForElementAndClick(toggleElement);
        const toast = await Locatore.toastPopUpMessage;
        const toastText = await toast.getText();
        console.log("⚠️ Wifi CheckIn Toggle Toast Message:", toastText);
        console.log("\n")
        await this.actionClass.assertElementTextEquals(toastText, MobileData.PopUp_Messages.Wifi_CheckIn_Disabled_Msg);
      } else {
        throw new Error("❌ Unknown toggle state for Wi-Fi Check-in");
      }
    } else {
      throw new Error(`❌ Invalid desired state passed: ${desiredState}`);
    }
  }

  async getSpotName(): Promise<string> {
    const spotName = await (await Locatore.spotNameHomeScreen).getText();
    console.log("Spot Name:", spotName);
    return spotName;
  }
  async getZoneName(): Promise<string> {
    await browser.pause(2000);
    const zoneName = await (await Locatore.zoneNameHomeScreen).getText();
    console.log("Spot Name:", zoneName);
    return zoneName;
  }

  async backToRonspotApp() {
    await browser.pause(2000);
    await driver.activateApp('ie.jemstone.ronspot');
    await browser.pause(2000);
    console.log('🚀 Switched back to Ronspot app after Wi-Fi connection.');
  }

  async toggleWiFi(state: 'on' | 'off') {
    console.log(`🛜 Toggling Wi-Fi: ${state.toUpperCase()}`);

    const capabilities = driver.capabilities as any;
    const deviceName = (capabilities.deviceName || '').toLowerCase();
    const isEmulator = deviceName.includes('emulator') || deviceName.includes('sdk');
    const isRealDevice = !isEmulator;

    if (!isRealDevice) {
      // ================= Emulator Logic =================
      console.log("📱 Emulator detected — toggling Wi-Fi (no SSID handling)");

      await driver.activateApp('com.android.settings');
      await browser.pause(3000);

      // Step 1: Try to click "Network & Internet" or alternates, skip if none found
      const labels = ["Network & Internet", "Connections", "Wi-Fi & Network"];
      let networkOptionFound = false;

      for (const label of labels) {
        try {
          const option = await $(`android=new UiSelector().textContains("${label}")`);
          if (await option.isDisplayed()) {
            await option.click();
            console.log(`✅ Found and clicked: "${label}"`);
            await browser.pause(2000);
            networkOptionFound = true;
            break;
          }
        } catch { /* skip */ }
      }

      if (!networkOptionFound) {
        console.log("⚠️ 'Network & Internet' option not found — skipping.");
      }

      // Step 2: Try to click "Internet" if visible
      try {
        const internetOption = await $('android=new UiSelector().textContains("Internet")');
        if (await internetOption.isDisplayed()) {
          await internetOption.click();
          console.log("✅ Clicked on 'Internet'");
          await browser.pause(2000);
        }
      } catch {
        console.log("⚠️ 'Internet' option not visible — skipping.");
      }

      // Step 3: Toggle Wi-Fi
      try {
        const wifiSwitch = await $('android=new UiSelector().className("android.widget.Switch")');
        if (await wifiSwitch.isDisplayed()) {
          const currentState = await wifiSwitch.getAttribute('checked');
          const shouldBeOn = state === 'on';

          if ((shouldBeOn && currentState === 'false') || (!shouldBeOn && currentState === 'true')) {
            console.log(`🔄 Wi-Fi is ${shouldBeOn ? 'OFF' : 'ON'} — toggling it ${state.toUpperCase()}...`);
            await wifiSwitch.click();
            await browser.pause(3000);
            console.log(`✅ Wi-Fi turned ${state.toUpperCase()}.`);
          } else {
            console.log(`✅ Wi-Fi is already ${state.toUpperCase()}`);
          }
        } else {
          console.log("❌ Wi-Fi switch is not visible on the screen.");
        }
      } catch (err) {
        throw new Error("❌ Failed to toggle Wi-Fi.");
      }

      await browser.pause(3000);
      return;
    } else {
      console.log("📱 Real device detected — handling Wi-Fi with SSID if needed");

      await driver.activateApp('com.android.settings');
      await browser.pause(3000);

      try {
        const wifiSubOption = await $('android=new UiSelector().textContains("Wi-Fi")');
        if (await wifiSubOption.isDisplayed()) {
          await wifiSubOption.click();
          await browser.pause(3000);
        }
      } catch { /* maybe already in Wi-Fi settings */ }

      try {
        const wifiSwitch = await $('android=new UiSelector().className("android.widget.Switch")');
        if (await wifiSwitch.isDisplayed()) {
          const currentState = await wifiSwitch.getAttribute('checked');
          const shouldBeOn = state === 'on';

          if ((shouldBeOn && currentState === 'false') || (!shouldBeOn && currentState === 'true')) {
            console.log(`🔄 Wi-Fi is ${shouldBeOn ? 'OFF' : 'ON'} — toggling it ${state.toUpperCase()}...`);
            await wifiSwitch.click();
            await browser.pause(3000);
          } else {
            console.log(`✅ Wi-Fi is already ${state.toUpperCase()}`);
          }
          return;
        }
      } catch {
        console.log("⚠️ Wi-Fi switch not found. Trying alternative Connect/Disconnect method...");
      }

      try {
        if (state === 'off') {
          const disconnectBtn = await $('//android.widget.Button[@text="Disconnect"]');
          if (await disconnectBtn.isDisplayed()) {
            console.log("🚫 Disconnecting Wi-Fi...");
            await disconnectBtn.click();
            await browser.pause(5000);
          }
        } else if (state === 'on') {
          const connectBtn = await $('//android.widget.Button[@text="Connect"]');
          if (await connectBtn.isDisplayed()) {
            console.log("🛜 Connecting Wi-Fi...");
            await connectBtn.click();
            await browser.pause(3000);
          }
        }
      } catch (err) {
        console.log("❌ Neither switch nor Connect/Disconnect buttons were found.");
      }
    }
  }

  async verifyCheckOutButtonFromCalendar() {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log("Verify CheckOut Button From Calendar");
    console.log("--------------------------------------------------------------------");
    await browser.pause(5000);
    const todayDay = dayjs().date().toString();
    console.log(`\nToday's Date :- ${todayDay}`);
    await browser.pause(3000);
    const todayElement = await $(`(//android.widget.TextView[@text="${todayDay}"])[1]`);
    if (await todayElement.isDisplayed()) {
      await this.actionClass.waitForElementAndClick(todayElement);
    }
    await this.actionClass.isElementDisplayed(await Locatore.btnCheckOut, MobileData.Booking_Spot.Button_CheckOut);
    const modalContainer = await $('//android.widget.TextView[contains(@text,"Manage your bookings")]');
    if (await modalContainer.isDisplayed()) {
      await driver.back();
      await browser.pause(1000);
    }
  }

  async verifyCheckOutButtonFromHomeScreen() {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log("Verify CheckOut Button From Home Screen");
    console.log("--------------------------------------------------------------------");
    await browser.pause(3000);
    await this.actionClass.isElementDisplayed(await Locatore.btnCheckOutHome, MobileData.Home_Screen.Button_Checkout_Home);
  }

  async clearAllNotification() {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log("Clear all notification befour check-in");
    console.log("--------------------------------------------------------------------");
    await this.actionClass.waitForElementAndClick(await Locatore.notificationMenuText);
    await this.actionClass.waitForElementAndClick(await Locatore.clearAllNotification);
    await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
    await this.actionClass.waitForElementAndClick(await Locatore.backButton);
  }

  async verifyNotification(expectedStaticText: string) {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log("Verify notification title and details text");
    console.log("--------------------------------------------------------------------");
    await this.actionClass.waitForElementAndClick(await Locatore.notificationMenuText);
    await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
    await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.notificationCheckIn, MobileData.Notification_Screen.CheckIn_Notification);
    await this.actionClass.waitForElementAndClick(await Locatore.notificationCheckIn);
    // await browser.pause(2000);
    await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
    const actualText = await (await Locatore.notificationCheckInDetailTxt).getText();
    console.log("🔍 Actual Notification Text:", actualText);
    console.log("🔍 Expected Notification Text:", expectedStaticText);
    expect(actualText).toContain(expectedStaticText);
    await this.actionClass.waitForElementAndClick(await Locatore.backButton);
    await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
    await this.actionClass.waitForElementAndClick(await Locatore.backButton);
  }

  async closePopupManageYourBooking() {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log("Closing Popup Manage Your Booking");
    console.log("--------------------------------------------------------------------");
    await browser.pause(3000);
    const modalContainer = await $('//android.widget.TextView[contains(@text,"Manage your booking for")]');
    if (await modalContainer.isDisplayed()) {
      await driver.back();
      await browser.pause(1000);
    }
  }

  /* async clearAllNotificationsIfPresent(): Promise<void> {
    console.log("🧹 Opening notification panel...");
    await driver.openNotifications();
    await browser.pause(2000);
  
    const clearSelectors = [
      'android=new UiSelector().descriptionContains("Clear all")',
      'android=new UiSelector().textContains("Clear all")',
      'android=new UiSelector().descriptionContains("CLEAR")',
      'android=new UiSelector().textContains("CLEAR")',
      'android=new UiSelector().resourceIdMatches(".*clear.*")',
      'android=new UiSelector().descriptionMatches("(?i)clear")',
      'android=new UiSelector().textMatches("(?i)clear")',
      'android=new UiSelector().descriptionContains("Dismiss all")',
      'android=new UiSelector().className("android.widget.ImageView").descriptionContains("X")',
      'android=new UiSelector().textContains("X")'
    ];
  
    let foundAndClicked = false;
  
    for (const selector of clearSelectors) {
      try {
        const element = await $(selector);
        if (await element.isDisplayed()) {
          console.log(`✅ Found button: ${selector} — clicking to clear notifications`);
          await element.click();
          foundAndClicked = true;
          await browser.pause(2000);
          break;
        }
      } catch {
        // Element not found; move to next
      }
    }
  
    if (!foundAndClicked) {
      console.log("ℹ️ No 'Clear All' or 'X' found. Closing notification panel.");
      await driver.back();
    }
  
    // Always close the notification panel safely
    // try {
    //   await driver.back(); // Attempt to close via back button
    // } catch (e) {
    //   console.log("⚠️ driver.back() failed — using swipe to close panel");
    //   const { width, height } = await driver.getWindowRect();
    //   await driver.touchAction([
    //     { action: 'press', x: width / 2, y: height * 0.3 },
    //     { action: 'wait', ms: 300 },
    //     { action: 'moveTo', x: width / 2, y: height },
    //     'release',
    //   ]);
    // }
  } */

  /* async verifyNotificationContainsText(): Promise<void> {
    console.log("🔔 Opening notification panel...");
    await driver.openNotifications();
    await browser.pause(3000);
  
    const expandSelectors = [
    'android=new UiSelector().resourceId("android:id/expand_button_touch_container")',
    'android=new UiSelector().descriptionContains("Expand")',
    'android=new UiSelector().descriptionContains("More")',
    'android=new UiSelector().descriptionContains("Show")',
    'android=new UiSelector().className("android.widget.ImageView")', // fallback for icon-based expand
  ];
  
  for (const selector of expandSelectors) {
    try {
      const expandBtn = await $(selector);
      if (await expandBtn.isDisplayed()) {
        console.log(`📂 Found and clicking expand button: ${selector}`);
        await expandBtn.click();
        await browser.pause(1000);
        break;
      }
    } catch {
      // Continue trying next selector
    }
  }
  
  // Fetch all visible text views in the notification shade
    // const textElements = await $$('//android.widget.TextView[@resource-id="android:id/big_text"]');
    let found = false;
    const expectedText = this.getExpectedCheckInText();
    const textElements = await $$('//android.widget.TextView[@resource-id="android:id/big_text"]');
  
    for (const element of textElements) {
      try {
        const text = await element.getText();
        if (!text || text.trim() === '') continue;
        console.log("🔍 Actual Notification Text:", text);
        console.log("🔍 Expected Notification Text:", expectedText);
        expect(text).toContain(expectedText);
        if (text && text.includes(expectedText)) {
          console.log(`✅ Found matching notification on device notification panel: "${text}"`);
          found = true;
          break;
        }
      } catch {
        // Skip unreadable elements
      }
    }
  
    // Close notification panel (press back or swipe down)
    try {
      await driver.back();
    } catch {
      // Fallback swipe if back doesn't work
      const { width, height } = await driver.getWindowRect();
      await driver.touchAction([
        { action: 'press', x: width / 2, y: height * 0.3 },
        { action: 'wait', ms: 300 },
        { action: 'moveTo', x: width / 2, y: height },
        'release',
      ]);
    }
  
    if (!found) {
      throw new Error(`❌ Notification with text "${expectedText}" not found.`);
    }
  } */

  /* async verifyNotificationTextAutoWifiCheckin(expectedText: string): Promise<void> {
  
    await driver.openNotifications();
    await browser.pause(3000);
  
    // Fetch all visible text views in the notification shade
    const textElements = await $$('//android.widget.TextView[@resource-id="android:id/text"]');
    let found = false;
    const expectedText1 = this.getExpectedCheckInText();
    for (const element of textElements) {
      try {
        const text = await element.getText();
        console.log("🔍 Actual Notification Text:", text);
        console.log("🔍 Expected Notification Text:", expectedText1);
        expect(text).toContain(expectedText1);
        if (text && text.includes(expectedText1)) {
          console.log(`✅ Found matching notification on device notification panel: "${text}"`);
          found = true;
          break;
        }
      } catch {
        // Skip unreadable elements
      }
    }
  
    // Close notification panel (press back or swipe down)
    try {
      await driver.back();
    } catch {
      // Fallback swipe if back doesn't work
      const { width, height } = await driver.getWindowRect();
      await driver.touchAction([
        { action: 'press', x: width / 2, y: height * 0.3 },
        { action: 'wait', ms: 300 },
        { action: 'moveTo', x: width / 2, y: height },
        'release',
      ]);
    }
  
    if (!found) {
      throw new Error(`❌ Notification with text "${expectedText}" not found.`);
    }
  } */


}
export default ConnectWifi;