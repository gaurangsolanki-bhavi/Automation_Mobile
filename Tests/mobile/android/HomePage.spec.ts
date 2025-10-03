import LoginActions from '../../../Pages/mobile/android/LoginMobPage';
import ProfilePage from '../../../Pages/mobile/android/ProfilePage';
import ReusableMobilePage from '../../../Pages/ReusableMobilePage';
import ZoneData from "../../../test-data/JSON/zone_data.json";
import HomePage from "../../../Pages/mobile/android/HomePage";
import ClaimReleaseAndroidPage from '../../../Pages/mobile/android/Claim-ReleaseAndroidPage';
import ClaimReleaseNoVehicle from '../../../Pages/mobile/android/Claim-ReleaseNoVehiclePage';
import Locatore from '../../../Pages/mobile/android/LocatorePage';
import MobileData from '../../../test-data/JSON/MobileTestData.json';

let loginActions: LoginActions;
let profilePage: ProfilePage;
let reusableMobilePage: ReusableMobilePage;
let claimReleaseAndroidPage: ClaimReleaseAndroidPage;
let claimReleaseNoVehiclePage: ClaimReleaseNoVehicle;
let email: string;
let zone: string;
let no_map_park_zone: string;
let map_car_zone: string;
let homePage: HomePage;

loginActions = new LoginActions();
profilePage = new ProfilePage();
claimReleaseAndroidPage = new ClaimReleaseAndroidPage();
claimReleaseNoVehiclePage =new ClaimReleaseNoVehicle();
reusableMobilePage = new ReusableMobilePage();
homePage = new HomePage();

describe('Home Page Test @Android', () => {
  before(async () => {
    console.log('Starting Home Page Test...');
    await browser.pause(3000);
    const user = await loginActions.initializeAppAndLoginFromExcel('MobileUser', ZoneData.ZONE_SET1.XLXS_PATH);
     if (user && user.ZONE && user.NO_MAP_PARK_ZONE && user.MAP_CAR_ZONE) {
      zone = user.ZONE;
      no_map_park_zone = user.NO_MAP_PARK_ZONE;
      map_car_zone = user.MAP_CAR_ZONE;
      console.log(`ZONE: ${zone}, NO_MAP_PARK_ZONE: ${no_map_park_zone}, MAP_CAR_ZONE: ${map_car_zone}`);
    } else {
      console.error("❌ User data not loaded properly. Received:", user);
    }
  });
  it('Test_001: Verify Credit Icon Button Functionality and Popup Display', async () => {
    await browser.pause(3000);
    await profilePage.navigateToHome();
    await homePage.verifyHeaderCreditSection();
  });

  it('Test_002: Verify Info Icon Click Opens Info Page and Validate Page Elements', async () => {
    await browser.pause(3000);
    await homePage.verifyInfoSection();
  });

  it('Test_003: Verify Notification Icon and Redirection to Notification Page', async () => {
    await browser.pause(3000);
    await homePage.verifyNotification();
  });

  it('Test_004: Verify Today’s Bookings and Upcoming Bookings Section on Home Page', async () => {
    await browser.pause(3000);
    await homePage.navigateToCalandar();
    await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
    await homePage.bookSpotCurrentDayFromCalendar(zone);
    await homePage.bookSpotNextDayFromCalendar(zone);
    await homePage.bookSpotCurrentDayFromCalendar(map_car_zone);
    await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
    await homePage.bookSpotNextToNextDayFromCalendar(map_car_zone);
    await profilePage.navigateToHome();
    await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
    await homePage.verifyTodayBookingCount();
    await homePage.verifyTodayBookingElements(MobileData.Home_Screen.TodayBookings);
    await homePage.verifyUpcomingBookingCount();
    await homePage.verifyUpcomingBookingElements(MobileData.Home_Screen.UpComingBookings);
  }); 

});
