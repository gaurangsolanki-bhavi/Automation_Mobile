import { execSync } from 'child_process';
import Actions from '../../ActionWaitMob';
import Locatore from '../../../Pages/mobile/iOS/LocatoreiOSPage';
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
    const todayElement = await $(`(//XCUIElementTypeStaticText[@name="${todayDay}"])[1]`);
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
    await this.actionClass.waitForElementAndClick(await Locatore.iconCalendar);
    console.log("\nCalendar page opened successfully.");
  }

  // async connectToWiFi(ssid: string, password: string) {
  //   console.log("\n");
  //   console.log("--------------------------------------------------------------------");
  //   console.log("🛜 Connecting to Wi-Fi on iOS Device...");
  //   console.log("--------------------------------------------------------------------");
  //   console.log(`Wi-Fi SSID: ${ssid}`);

  //   // ✅ Detect if real iOS device
  //   const capabilities = driver.capabilities as any;
  //   const deviceName = (capabilities.deviceName || '').toLowerCase();
  //   const isSimulator = capabilities.isSimulator || deviceName.includes('simulator');
  //   const isRealDevice = !isSimulator;

  //   if (!isRealDevice) {
  //     console.log("🧪 iOS simulator detected — skipping Wi-Fi connection logic.");
  //     return;
  //   }

  //   // Step 1: Launch Settings app
  //   console.log("🚀 Launching Settings app...");
  //   await driver.execute('mobile: launchApp', { bundleId: 'com.apple.Preferences' });
  //   await browser.pause(5000);

  //   // Step 2: Tap on Wi-Fi
  //   console.log("📶 Navigating to Wi-Fi menu...");
  //   const wifiMenu = await $('~Wi-Fi');
  //   if (!(await wifiMenu.isDisplayed())) {
  //     throw new Error("❌ Could not find 'Wi-Fi' option in Settings.");
  //   }
  //   await this.actionClass.waitForElementAndClick(wifiMenu);
  //   await browser.pause(5000);

  //   // Step 3: Toggle Wi-Fi ON if OFF
  //   const wifiToggle = await $('//XCUIElementTypeSwitch');
  //   const toggleState = await wifiToggle.getAttribute('value'); // '1' = ON, '0' = OFF
  //   if (toggleState === '0') {
  //     console.log("🔄 Wi-Fi is OFF — turning it ON...");
  //     await browser.pause(3000);
  //     await this.actionClass.waitForElementAndClick(wifiToggle);
  //     await browser.pause(5000);
  //   } else {
  //     console.log("✅ Wi-Fi is already ON.");
  //   }

  //   // Step 4: Locate your SSID
  //   console.log(`📡 Searching for SSID: ${ssid}`);
  //   await browser.pause(5000);
  //   let ssidElement;
  //   try {
  //     ssidElement = await $(`~${ssid}`);
  //     await ssidElement.waitForDisplayed({ timeout: 15000 });
  //     await browser.pause(5000);
  //     await this.actionClass.waitForElementAndClick(wifiToggle);
  //     await browser.pause(5000);
  //   } catch {
  //     throw new Error(`❌ SSID "${ssid}" not found in Wi-Fi list.`);
  //   }

  //   // Step 5: Enter password (if required)
  //   try {
  //     const passwordField = await $('//XCUIElementTypeSecureTextField');
  //     if (await passwordField.isDisplayed()) {
  //       console.log("🔐 Entering Wi-Fi password...");
  //       await passwordField.setValue(password);
  //       await browser.pause(2000);

  //       const joinBtn = await $('~Join');
  //       if (await joinBtn.isDisplayed()) {
  //         await this.actionClass.waitForElementAndClick(joinBtn);
  //         console.log("🔗 Tapped 'Join'. Waiting for connection...");
  //       }
  //     }
  //   } catch {
  //     console.log("ℹ️ Password field not shown — possibly already saved or open network.");
  //   }

  //   // Step 6: Optional verification (not 100% reliable)
  //   await browser.pause(5000);
  //   console.log(`✅ Connection attempt to SSID: ${ssid} complete.`);
  // }

  async connectToWiFi(targetSSID: string, wifiPassword: string): Promise<void> {
    console.log("\n");
    console.log("------------------------------------------------------------");
    console.log(`📶 iOS Wi-Fi Automation: Connecting to '${targetSSID}'`);
    console.log("------------------------------------------------------------");

    // 1. Launch iOS Settings app
    console.log("⚙️ Opening iOS Settings...");
    await driver.activateApp("com.apple.Preferences");
    await browser.pause(2000);

    // 2. Tap "Wi-Fi" in Settings
    // const wifiMenu = await $('//XCUIElementTypeStaticText[@name="Wi-Fi"]');
    const wifiMenu = await Locatore.toggleWifi;
    await wifiMenu.waitForDisplayed({ timeout: 5000 });
    await this.actionClass.waitForElementAndClick(wifiMenu);
    await browser.pause(2000);

    // Helper: Get current connected SSID via checkmark
  const getConnectedSSID = async (): Promise<string | null> => {
    // const connectedEl = await $('//XCUIElementTypeImage[@name="checkmark"]//preceding::XCUIElementTypeStaticText[1]');
    await browser.pause(3000);
    const connectedEl = await Locatore.connectedSSID;
    if (await connectedEl.isDisplayed()) {
      return connectedEl.getText();
    }
    return null;
  };

  // 3. Check if already connected to target
  let currentSSID = await getConnectedSSID();
  if (currentSSID === targetSSID) {
    console.log(`✅ Already connected to '${targetSSID}'`);
    return;
  }

 // 3. Connected to another network → just click target SSID (no forgetting)
    if (currentSSID) {
        console.log(`🔄 Connected to another network: '${currentSSID}', switching to '${targetSSID}'...`);
    } else {
        console.log(`📡 Not connected, connecting to '${targetSSID}'...`);
    }

  // 4. Tap target SSID
    const targetNetwork = await $(`//XCUIElementTypeStaticText[@name="${targetSSID}"]`);
    await targetNetwork.waitForDisplayed({ timeout: 60000 });
    await this.actionClass.waitForElementAndClick(targetNetwork);
    await browser.pause(3000);

    // 5. Enter password if prompted
    // const passwordField = await $('//XCUIElementTypeSecureTextField');
    const passwordField = await Locatore.passwordWifi;
    if (await passwordField.isDisplayed()) {
        await passwordField.setValue(wifiPassword);
        const joinBtn = await Locatore.btnJoin;
        await this.actionClass.waitForElementAndClick(joinBtn);
        console.log("🔑 Password entered, joining network...");
    }

    // 6. Wait & verify connection
    await browser.pause(7000);
    currentSSID = await getConnectedSSID();
    if (currentSSID === targetSSID) {
        console.log(`✅ Successfully connected to '${targetSSID}'`);
    } else {
        throw new Error(`❌ Failed to connect to '${targetSSID}'`);
    }
  }

  async toggleWifiCheckin(desiredState: 'ON' | 'OFF'): Promise<void> {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log("🛜 Allow check-in with Wi-Fi");
    console.log("--------------------------------------------------------------------");
    await browser.pause(5000);
    const toggleElement = await Locatore.wifiToggleButton;
    const isToggleEnabled = await toggleElement.isEnabled();

    if (!isToggleEnabled) {
      throw new Error("❌ No Wifi Configuration is Setup or Check Zone CheckIn type it should be WiFi");
    }

    const currentState = (await toggleElement.getAttribute('name'))?.toLowerCase();

    if (desiredState === 'ON') {
      if (currentState === 'profiletoggleon') {
        console.log("🛜 Wi-Fi Check-in Toggle is already 🟢 ON");
      } else if (currentState === 'profiletoggleoff') {
        console.log("⚙️ Turning ON the Wi-Fi Check-in Toggle...");
        await this.actionClass.waitForElementAndClick(await Locatore.wifiToggleButton1);
        // const toast = await Locatore.toastPopUpMessage;
        // const toastText = await toast.getText();
        // console.log("⚠️ Wifi CheckIn Toggle Toast Message:", toastText);
        // console.log("\n")
        // await this.actionClass.assertElementTextEquals(toastText, MobileData.PopUp_Messages.Wifi_CheckIn_Enabled_Msg);
      } else {
        throw new Error("❌ Unknown toggle state for Wi-Fi Check-in");
      }
    } else if (desiredState === 'OFF') {
      if (currentState === 'profiletoggleoff') {
        console.log("🛜 Wi-Fi Check-in Toggle is already 🔴 OFF");
      } else if (currentState === 'profiletoggleon') {
        console.log("⚙️ Turning OFF the Wi-Fi Check-in Toggle...");
        await this.actionClass.waitForElementAndClick(await Locatore.wifiToggleButton1);
        // const toast = await Locatore.toastPopUpMessage;
        // const toastText = await toast.getText();
        // console.log("⚠️ Wifi CheckIn Toggle Toast Message:", toastText);
        // console.log("\n")
        // await this.actionClass.assertElementTextEquals(toastText, MobileData.PopUp_Messages.Wifi_CheckIn_Disabled_Msg);
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
    console.log("Zone Name:", zoneName);
    return zoneName;
  }

  async backToRonspotApp() {
    await browser.pause(2000);
    await driver.activateApp('ie.jemstone.ronspot');
    await browser.pause(2000);
    console.log('🚀 Switched back to Ronspot app after Wi-Fi connection.');
    const warringbtn = await Locatore.internetWarring;
    if (await warringbtn.isDisplayed()) {
    await this.actionClass.waitForElementAndClick(warringbtn);
    await browser.pause(3000);
    }
  }

  async toggleWiFi(state: 'on' | 'off') {
    console.log(`🛜 Toggling Wi-Fi on iOS: ${state.toUpperCase()}`);

    const capabilities = driver.capabilities as any;
    const deviceName = (capabilities.deviceName || '').toLowerCase();
    const isSimulator = capabilities.isSimulator || deviceName.includes('simulator');

    if (isSimulator) {
      console.log("🧪 iOS simulator detected — Wi-Fi toggling is not supported.");
      return;
    }

    // Step 1: Launch Settings app
    await driver.execute('mobile: launchApp', { bundleId: 'com.apple.Preferences' });
    await browser.pause(3000);

    // Step 2: Tap "Wi-Fi"
    const wifiMenu = await $('~Wi-Fi');
    if (!(await wifiMenu.isDisplayed())) {
      throw new Error("❌ Could not find 'Wi-Fi' option in Settings.");
    }
    await wifiMenu.click();
    await browser.pause(3000);

    // Step 3: Find Wi-Fi switch and determine current state
    const wifiSwitch = await $('//XCUIElementTypeSwitch');
    const value = await wifiSwitch.getAttribute('value'); // '1' = ON, '0' = OFF
    const shouldBeOn = state === 'on';

    if ((shouldBeOn && value === '0') || (!shouldBeOn && value === '1')) {
      console.log(`🔄 Wi-Fi is currently ${value === '1' ? 'ON' : 'OFF'} — toggling to ${state.toUpperCase()}...`);
      await wifiSwitch.click();
      await browser.pause(5000);
      console.log(`✅ Wi-Fi toggled ${state.toUpperCase()}`);
    } else {
      console.log(`✅ Wi-Fi is already ${state.toUpperCase()}`);
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
    const todayElement = await $(`(//XCUIElementTypeStaticText[@name="${todayDay}"])[1]`);
    if (await todayElement.isDisplayed()) {
      await this.actionClass.waitForElementAndClick(todayElement);
    }
    await this.actionClass.isElementDisplayed(await Locatore.btnCheckOut, MobileData.Booking_Spot.Button_CheckOut);
    const modalContainer = await $('//XCUIElementTypeStaticText[contains(@name,"Manage your booking")]');
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
    await this.actionClass.waitForElementAndClick(await Locatore.notificationButton);
    await this.actionClass.waitForElementAndClick(await Locatore.clearAllNotification);
    await browser.pause(3000);
    await this.actionClass.tapElementByCoordinates('~btnback', 'Back Icon');
  }

  async verifyNotification(expectedStaticText: string) {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log("Verify notification title and details text");
    console.log("--------------------------------------------------------------------");
    await this.actionClass.waitForElementAndClick(await Locatore.notificationButton);
    await browser.pause(5000);
    // await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
    await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.notificationCheckIn, MobileData.Notification_Screen.CheckIn_Notification);
    await this.actionClass.waitForElementAndClick(await Locatore.notificationCheckIn);
    // await browser.pause(2000);
    // await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
    await browser.pause(5000);
    const actualText = await (await Locatore.notificationCheckInDetailTxt).getText();
    console.log("🔍 Actual Notification Text:", actualText);
    console.log("🔍 Expected Notification Text:", expectedStaticText);
    expect(actualText).toContain(expectedStaticText);
    await this.actionClass.tapElementByCoordinates('~btnback', 'Back Icon');
    // await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
    await browser.pause(5000);
    await this.actionClass.tapElementByCoordinates('~btnback', 'Back Icon');
  }

  async closePopupManageYourBooking() {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log("Closing Popup Manage Your Booking");
    console.log("--------------------------------------------------------------------");
    await browser.pause(3000);
    const modal = await $('//XCUIElementTypeStaticText[contains(@name,"Manage your booking")]');
    // if (await modal.isDisplayed()) {
    //   console.log('Model is Visible............')
    //   await driver.execute('mobile: swipe', {
    //         elementId: modal.elementId,
    //         direction: 'down'
    //     });
    //   await browser.pause(1000);
    // }
    if (await modal.isDisplayed()) {
        await this.actionClass.waitForElementAndClick(await Locatore.btnCancleBooking);
        await browser.pause(2000);
        await this.actionClass.waitForElementAndClick(await Locatore.btnBack);
      }
  }
}
export default ConnectWifi;