import LoginActions from '../../../Pages/mobile/android/LoginMobPage';
import ProfilePage from '../../../Pages/mobile/android/ProfilePage';
import ReusableMobilePage from '../../../Pages/ReusableMobilePage';
import ZoneData from "../../../test-data/JSON/zone_data.json";
import CreateNewBookingFlow from "../../../Pages/mobile/android/CreateNewBookingFlow";
import ClaimReleaseAndroidPage from '../../../Pages/mobile/android/Claim-ReleaseAndroidPage';
import ClaimReleaseNoVehicle from '../../../Pages/mobile/android/Claim-ReleaseNoVehiclePage';

let loginActions: LoginActions;
let profilePage: ProfilePage;
let reusableMobilePage: ReusableMobilePage;
let claimReleaseAndroidPage: ClaimReleaseAndroidPage;
let claimReleaseNoVehiclePage: ClaimReleaseNoVehicle;
let zone: string;
let no_map_park_zone: string;
let map_car_zone: string;
let createNewBookingPage: CreateNewBookingFlow;
let beforeCredits: number | null;
let parking_hourly: string;
let parking_mix: string;
let desk_all_day: string;
let desk_hourly: string;
let desk_mix: string;
let meeting_room_only: string;

loginActions = new LoginActions();
profilePage = new ProfilePage();
claimReleaseAndroidPage = new ClaimReleaseAndroidPage();
claimReleaseNoVehiclePage =new ClaimReleaseNoVehicle();
createNewBookingPage = new CreateNewBookingFlow();
reusableMobilePage = new ReusableMobilePage();

describe('Create New Booking Test @Android', () => {
  before(async () => {
    console.log('Starting Create New Booking Test...');
    await browser.pause(3000);
    const user = await loginActions.initializeAppAndLoginFromExcel('MobileUser', ZoneData.ZONE_SET1.XLXS_PATH);
     if (user && user.ZONE && user.NO_MAP_PARK_ZONE && user.MAP_CAR_ZONE) {
      zone = user.ZONE;
      no_map_park_zone = user.NO_MAP_PARK_ZONE;
      map_car_zone = user.MAP_CAR_ZONE;
      parking_hourly = user.PARKING_HOURLY;
      parking_mix = user.PARKING_MIX;
      desk_all_day = user.DESK_ALL_DAY;
      desk_hourly = user.DESK_HOURLY;
      desk_mix = user.DESK_MIX;
      meeting_room_only = user.MEETING_ROOM_ONLY;

      console.log(`ZONE: ${zone}, NO_MAP_PARK_ZONE: ${no_map_park_zone}, MAP_CAR_ZONE: ${map_car_zone}`);
    } else {
      console.error("❌ User data not loaded properly. Received:", user);
    }
  });
   it('Test_001: Verify Parking All Day Create New Booking Flow for First Step', async () => {
    await createNewBookingPage.navigateToProfile();
    beforeCredits = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.navigateToCreateNewBooking();
    await createNewBookingPage.verifyCreateNewBookingParkingAllDay(zone);
  });

  it('Test_002: Verify Parking All Day Create New Booking Flow for Second Step', async () => {
    await createNewBookingPage.verifyCreateNewBookingSecondPage();
  });

  it('Test_003: Verify Parking All Day Create New Booking Flow for Third Step and Credit Deduction', async () => {
    const deductedCredit = await createNewBookingPage.verifyCreateNewBookingConfirmationPage(zone);
    await profilePage.navigateToProfile();
    const afterBooking = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.expectCreditChange(beforeCredits, afterBooking, deductedCredit, "after Parking All Day booking");
    await profilePage.navigateToHome();
    await createNewBookingPage.cancelBookingIfExists();
    await profilePage.navigateToProfile();
    const afterRelease = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.expectCreditChangeAfter(afterBooking, afterRelease, deductedCredit, "after Parking All Day release");
  }); 

  it('Test_004: Verify Parking Hourly Create New Booking Flow for First Step', async () => {
    beforeCredits = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.navigateToCreateNewBooking();
    await createNewBookingPage.verifyCreateNewBookingParkingHourly(parking_hourly);
  });

  it('Test_005: Verify Parking Hourly Create New Booking Flow for Second Step', async () => {
    await createNewBookingPage.verifyCreateNewBookingSecondPage();
  });

  it('Test_006: Verify Parking Hourly Create New Booking Flow for Third Step and Credit Deduction', async () => {
    const deductedCredit = await createNewBookingPage.verifyCreateNewBookingConfirmationPage(parking_hourly);
    await profilePage.navigateToProfile();
    const afterBooking = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.expectCreditChange(beforeCredits, afterBooking, deductedCredit, "after Parking All Day booking");
    await profilePage.navigateToHome();
    await createNewBookingPage.cancelBookingIfExists();
    await profilePage.navigateToProfile();
    const afterRelease = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.expectCreditChangeAfter(afterBooking, afterRelease, deductedCredit, "after Parking All Day release");
  });

   it('Test_007: Verify Parking Hourly Create New Booking Flow Select Time from Second Step', async () => {
    beforeCredits = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.navigateToCreateNewBooking();
    await createNewBookingPage.verifyCreateNewBookingParkingHourly2(parking_hourly);
    await createNewBookingPage.verifyCreateNewBookingSecondPage();
  });

  it('Test_008: Verify Parking Hourly Create New Booking Flow Select Time from Third Step', async () => {
    const deductedCredit = await createNewBookingPage.verifyCreateNewBookingConfirmationPage(parking_hourly);
    await createNewBookingPage.navigateToProfile();
    const afterBooking = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.expectCreditChange(beforeCredits, afterBooking, deductedCredit, "after Parking All Day booking");
    await profilePage.navigateToHome();
    await createNewBookingPage.cancelBookingIfExists();
    await createNewBookingPage.navigateToProfile();
    const afterRelease = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.expectCreditChangeAfter(afterBooking, afterRelease, deductedCredit, "after Parking All Day release");
  }); 

  it('Test_009: Verify Parking Mix Zone Create New Booking Flow', async () => {
    beforeCredits = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.navigateToCreateNewBooking();
    await createNewBookingPage.verifyCreateNewBookingParkingHourlyMixZone(parking_mix);
    await createNewBookingPage.verifyCreateNewBookingSecondPage();
    const deductedCredit = await createNewBookingPage.verifyCreateNewBookingConfirmationPage(parking_mix);
    await profilePage.navigateToProfile();
    const afterBooking = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.expectCreditChange(beforeCredits, afterBooking, deductedCredit, "after Parking All Day booking");
    await profilePage.navigateToHome();
    await createNewBookingPage.cancelBookingIfExists();
    await profilePage.navigateToProfile();
    const afterRelease = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.expectCreditChangeAfter(afterBooking, afterRelease, deductedCredit, "after Parking All Day release");
  });
});