import LoginActions from '../../../Pages/mobile/android/LoginMobPage';
import ProfilePage from '../../../Pages/mobile/android/ProfilePage';
import ReusableMobilePage from '../../../Pages/ReusableMobilePage';
import ZoneData from "../../../test-data/JSON/zone_data.json";
import CreateNewBookingFlow from "../../../Pages/mobile/android/CreateNewBookingFlow";
import CreateNewBookingFlowDesk from "../../../Pages/mobile/android/CreateNewBookingFlowDesk";
import ClaimReleaseAndroidPage from '../../../Pages/mobile/android/Claim-ReleaseAndroidPage';
import ClaimReleaseNoVehicle from '../../../Pages/mobile/android/Claim-ReleaseNoVehiclePage';

let loginActions: LoginActions;
let profilePage: ProfilePage;
let reusableMobilePage: ReusableMobilePage;
let claimReleaseAndroidPage: ClaimReleaseAndroidPage;
let claimReleaseNoVehiclePage: ClaimReleaseNoVehicle;
let createNewBookingDesk: CreateNewBookingFlowDesk
let zone: string;
let no_map_park_zone: string;
let map_car_zone: string;
let createNewBookingPage: CreateNewBookingFlow;
let beforeCredits: number | null;
let desk_all_day: string;
let desk_hourly: string;
let desk_mix: string;
let meeting_room_only: string;

loginActions = new LoginActions();
profilePage = new ProfilePage();
claimReleaseAndroidPage = new ClaimReleaseAndroidPage();
claimReleaseNoVehiclePage = new ClaimReleaseNoVehicle();
createNewBookingDesk = new CreateNewBookingFlowDesk();
createNewBookingPage = new CreateNewBookingFlow();
reusableMobilePage = new ReusableMobilePage();

describe('Create New Desk Booking Test @Android', () => {
  before(async () => {
    console.log('Starting Create New Desk Booking Test...');
    await browser.pause(3000);
    const user = await loginActions.initializeAppAndLoginFromExcel('MobileUser', ZoneData.ZONE_SET1.PROD);
    if (user && user.DESK_ALL_DAY && user.DESK_HOURLY && user.DESK_MIX) {
      zone = user.ZONE;
      no_map_park_zone = user.NO_MAP_PARK_ZONE;
      map_car_zone = user.MAP_CAR_ZONE;
      desk_all_day = user.DESK_ALL_DAY;
      desk_hourly = user.DESK_HOURLY;
      desk_mix = user.DESK_MIX;
      meeting_room_only = user.MEETING_ROOM_ONLY;

      console.log(`Desk All Day: ${desk_all_day}, Desk Hourly: ${desk_hourly}, Desk_Mix: ${desk_mix}`);
    } else {
      console.error("❌ User data not loaded properly. Received:", user);
    }
  });
  it('Test_001: Verify Desk All Day Create New Booking Flow for First Step', async () => {
    await createNewBookingDesk.navigateToProfile();
    beforeCredits = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.navigateToCreateNewBooking();
    await createNewBookingDesk.verifyCreateNewBookingDeskAllDay(desk_all_day);
  });

  it('Test_002: Verify Desk All Day Create New Booking Flow for Second Step', async () => {
    await createNewBookingDesk.verifyCreateNewBookingSecondPage();
  });

  it('Test_003: Verify Desk All Day Create New Booking Flow for Third Step and Credit Deduction', async () => {
    const deductedCredit = await createNewBookingDesk.verifyCreateNewBookingConfirmationPage(desk_all_day);
    await profilePage.navigateToProfile();
    const afterBooking = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.expectCreditChange(beforeCredits, afterBooking, deductedCredit, "After Desk All Day booking");
    await profilePage.navigateToHome();
    await createNewBookingPage.cancelBookingIfExists();
    await profilePage.navigateToProfile();
    const afterRelease = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.expectCreditChangeAfter(afterBooking, afterRelease, deductedCredit, "After Desk All Day release");
  });

  it('Test_004: Verify Desk Hourly Create New Booking Flow for First Step', async () => {
    beforeCredits = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.navigateToCreateNewBooking();
    await createNewBookingDesk.verifyCreateNewBookingDeskHourly(desk_hourly);
  });

  it('Test_005: Verify Desk Hourly Create New Booking Flow for Second Step', async () => {
    await createNewBookingDesk.verifyCreateNewBookingSecondPage();
  });

  it('Test_006: Verify Desk Hourly Create New Booking Flow for Third Step and Credit Deduction', async () => {
    const deductedCredit = await createNewBookingDesk.verifyCreateNewBookingConfirmationPage(desk_hourly);
    await profilePage.navigateToProfile();
    const afterBooking = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.expectCreditChange(beforeCredits, afterBooking, deductedCredit, "After Desk Hourly booking");
    await profilePage.navigateToHome();
    await createNewBookingPage.cancelBookingIfExists();
    await profilePage.navigateToProfile();
    const afterRelease = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.expectCreditChangeAfter(afterBooking, afterRelease, deductedCredit, "After Desk Hourly release");
  });

  it('Test_007: Verify Desk Hourly Create New Booking Flow Select Time from Second Step', async () => {
    beforeCredits = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.navigateToCreateNewBooking();
    await createNewBookingDesk.verifyCreateNewBookingDeskHourly2(desk_hourly);
    await createNewBookingDesk.verifyCreateNewBookingSecondPage();
  });

  it('Test_008: Verify Desk Hourly Create New Booking Flow Select Time from Third Step', async () => {
    const deductedCredit = await createNewBookingDesk.verifyCreateNewBookingConfirmationPage(desk_hourly);
    await createNewBookingDesk.navigateToProfile();
    const afterBooking = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.expectCreditChange(beforeCredits, afterBooking, deductedCredit, "After Desk Hourly booking");
    await profilePage.navigateToHome();
    await createNewBookingPage.cancelBookingIfExists();
    await createNewBookingDesk.navigateToProfile();
    const afterRelease = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.expectCreditChangeAfter(afterBooking, afterRelease, deductedCredit, "After Desk Hourly release");
  });

  it('Test_009: Verify Desk Mix Zone Create New Booking Flow', async () => {
    beforeCredits = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.navigateToCreateNewBooking();
    await createNewBookingDesk.verifyCreateNewBookingDeskHourlyMixZone(desk_mix);
    await createNewBookingDesk.verifyCreateNewBookingSecondPage();
    const deductedCredit = await createNewBookingDesk.verifyCreateNewBookingConfirmationPage(desk_mix);
    await profilePage.navigateToProfile();
    const afterBooking = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.expectCreditChange(beforeCredits, afterBooking, deductedCredit, "After Desk Hourly booking");
    await profilePage.navigateToHome();
    await createNewBookingPage.cancelBookingIfExists();
    await profilePage.navigateToProfile();
    const afterRelease = await createNewBookingPage.getCreditBalanceFromProfile();
    await createNewBookingPage.expectCreditChangeAfter(afterBooking, afterRelease, deductedCredit, "After Desk Hourly release");
  });
}); 