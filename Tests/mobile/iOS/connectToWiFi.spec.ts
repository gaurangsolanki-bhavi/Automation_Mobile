import LoginActions from '../../../Pages/mobile/iOS/LoginiOSPage';
import ConnectWifi from '../../../Pages/mobile/iOS/connectToWiFi';
import ReusableMobilePage from '../../../Pages/ReusableMobilePage';
import ZoneData from "../../../test-data/JSON/zone_data.json";
import MobileData from '../../../test-data/JSON/MobileTestData.json';
import ProfilePage from '../../../Pages/mobile/iOS/ProfilePage';
import ClaimReleaseAndroidPage from '../../../Pages/mobile/iOS/Claim-ReleaseiOSPage';
import Locatore from '../../../Pages/mobile/iOS/LocatoreiOSPage';
import ClaimReleaseNoVehiclePage from '../../../Pages/mobile/iOS/Claim-ReleaseNoVehiclePage';
const fs = require('fs');

let loginActions: LoginActions;
let reusableMobilePage: ReusableMobilePage;
let connectToWifi: ConnectWifi;
let profilPage: ProfilePage;
let claimReleaseAndroidPage: ClaimReleaseAndroidPage;
let claimReleaseNoVehiclePage: ClaimReleaseNoVehiclePage;
let zone: string;
let grid_park_zone: string;
let ssid: string;
let wifi_pass: string;
let spot: string;
let zone1: string;
let mappingName: string;
let successCheckInNotification: string;

loginActions = new LoginActions();
reusableMobilePage = new ReusableMobilePage();
connectToWifi = new ConnectWifi();
profilPage = new ProfilePage();
claimReleaseAndroidPage = new ClaimReleaseAndroidPage();
claimReleaseNoVehiclePage = new ClaimReleaseNoVehiclePage();

describe('CheckIn Using Wifi @ios', () => {
  before(async () => {
    console.log('Starting Wifi check-in Test...');
    await browser.pause(5000);
    console.log("Using Excel path:", ZoneData.ZONE_SET1.PROD);
    console.log("Excel file exists?", fs.existsSync(ZoneData.ZONE_SET1.PROD));
    const user = await loginActions.initializeAppAndLoginFromExcel('WifiChecking', ZoneData.ZONE_SET1.PROD);
    if (user && user.ZONE && user.GRID_DESK_ZONE && user.SSID && user.Wifi_Pass) {
      zone = user.ZONE;
      grid_park_zone = user.GRID_DESK_ZONE;
      ssid = user.SSID;
      wifi_pass = user.Wifi_Pass;
      mappingName = user.Mapping_Name;
      console.log(`ZONE: ${zone}, GRID_PARK_ZONE: ${grid_park_zone}, SSID: ${ssid}`);
    } else {
      console.error("❌ User data not loaded properly. Received:", user);
    }
  }); 

   it('Test_001: Navigate to Profile Page and Enable the "Allow check-in with Wi-Fi" Toggle', async () => {
    try {
    //  await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
      await browser.pause(5000);
      await profilPage.navigateToProfile();
      await browser.pause(5000);
      await connectToWifi.toggleWifiCheckin('ON');
      await browser.pause(3000);
      await connectToWifi.clearAllNotification();
      await browser.pause(5000);
    //  await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
      await profilPage.navigateToHome();
    } catch (error: any) {
      throw error;
    }
  }); 

 it('Test_002: Connect to Wi-Fi on an iOS device', async () => {
    try {
      await browser.pause(3000);
      await connectToWifi.connectToWiFi(ssid, wifi_pass);
      await connectToWifi.backToRonspotApp();
    } catch (error: any) {
      throw error;
    }
  });

 it('Test_003: Book a spot for the current day', async () => {
    try {
      await claimReleaseAndroidPage.checkAndAddVehicle();
      await claimReleaseAndroidPage.navigateToCalandar();
      await browser.pause(5000);
    //   await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
      await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, zone);
      await browser.pause(5000);
    //   await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
      await reusableMobilePage.refreshAndCountDays();
      await browser.pause(5000);
    //   await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
      await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
      await browser.pause(5000);
    //   await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
      await connectToWifi.bookSpotCurrentDayFromCalendar();
    } catch (error: any) {
      throw error;
    }
  });

 it('Test_004: Verify that the user is successfully checked in and the checkout button is displayed on Calendar', async () => {
    try {
      await browser.pause(2000);
      await connectToWifi.toggleWiFi('off');
      await browser.pause(2000);
      await connectToWifi.toggleWiFi('on');
      await browser.pause(3000);
      await connectToWifi.backToRonspotApp();
      await browser.pause(5000);
    //   await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
      await profilPage.navigateToHome();
      await browser.pause(5000);
    //   await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
      spot = await connectToWifi.getSpotName();
      zone1 = await connectToWifi.getZoneName();
      await connectToWifi.navigateToCalandar();
      await browser.pause(5000);
    //   await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
      await connectToWifi.verifyCheckOutButtonFromCalendar();
      await connectToWifi.closePopupManageYourBooking();
    } catch (error: any) {
      throw error;
    }
  });

  it('Test_005: Verify that the user is successfully checked in and the checkout button is displayed on Home screen', async () => {
    try {
      await profilPage.navigateToHome();
      await browser.pause(5000);
    //   await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
      await connectToWifi.verifyCheckOutButtonFromHomeScreen();
    } catch (error: any) {
      throw error;
    }
  });

  it('Test_006: Verify that the user is successfully received notification in Notifications Panel from Profile', async () => {
    try {
      await profilPage.navigateToProfile();
      successCheckInNotification = `You’ve successfully checked into space ${spot} in zone ${zone1} using Wi-Fi check-in  (Wi-Fi connection to group ${mappingName}).`;
      await connectToWifi.verifyNotification(successCheckInNotification);
    } catch (error: any) {
      throw error;
    }
  });

/* it('Test_007: Verify that the user can check-in using toggle off-on', async () => {
    try {
      await connectToWifi.navigateToCalandar();
      await browser.pause(5000);
    //   await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
      await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
      await browser.pause(5000);
    //   await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
      await connectToWifi.bookSpotCurrentDayFromCalendar();
      await browser.pause(5000);
    //   await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
      await profilPage.navigateToProfile();
      await browser.pause(2000);
      await connectToWifi.clearAllNotification();
      await connectToWifi.toggleWifiCheckin('OFF');
      await browser.pause(2000);
      await connectToWifi.toggleWifiCheckin('ON');
      await browser.pause(2000);
      await connectToWifi.verifyNotification(successCheckInNotification);
    } catch (error: any) {
      throw error;
    }
  });

  it('Test_008: Verify that the user is successfully checked in and the checkout button is displayed on Calendar after toggle off-on', async () => {
    try {
      await connectToWifi.navigateToCalandar();
      await browser.pause(5000);
    //   await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
      await connectToWifi.verifyCheckOutButtonFromCalendar();
      await connectToWifi.closePopupManageYourBooking();
    } catch (error: any) {
      throw error;
    }
  });

  it('Test_009: Verify that the user is successfully checked in and the checkout button is displayed on Home screen after toggle off-on', async () => {
    try {
      await profilPage.navigateToHome();
      await browser.pause(5000);
    //   await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
      await connectToWifi.verifyCheckOutButtonFromHomeScreen();
    } catch (error: any) {
      throw error;
    }
  });

  it('Test_010: Verify that the user is successfully received notification in Notifications Panel from Profile after toggle off-on', async () => {
    try {
      await profilPage.navigateToProfile();
      await browser.pause(5000);
    //   await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
      await connectToWifi.verifyNotification(successCheckInNotification);
    } catch (error: any) {
      throw error;
    }
  }); */
});