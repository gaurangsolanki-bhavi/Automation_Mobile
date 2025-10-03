import LoginActions from '../../../Pages/mobile/android/LoginMobPage';
import ClaimReleaseAndroidPage from '../../../Pages/mobile/android/Claim-ReleaseAndroidPage';
import ZoneData from "../../../test-data/JSON/zone_data.json";
import ReusableMobilePage from '../../../Pages/ReusableMobilePage';
import Locatore from '../../../Pages/mobile/android/LocatorePage';
import ClaimReleaseNoVehiclePage from '../../../Pages/mobile/android/Claim-ReleaseNoVehiclePage';

let loginActions: LoginActions;
let claimReleaseAndroidPage: ClaimReleaseAndroidPage;
let claimReleaseNoVehiclePage: ClaimReleaseNoVehiclePage;
let reusableMobilePage: ReusableMobilePage;
let zone: string;
let grid_desk_zone: string;

loginActions = new LoginActions();
claimReleaseAndroidPage = new ClaimReleaseAndroidPage();
reusableMobilePage = new ReusableMobilePage();
claimReleaseNoVehiclePage = new ClaimReleaseNoVehiclePage();

describe('Claim Release Test @android', () => {
  before(async () => {
    console.log('Starting Claim Release Test...');
    await browser.pause(3000);
    const user = await loginActions.initializeAppAndLoginFromExcel('ValidUser', ZoneData.ZONE_SET1.XLXS_PATH);
    if (user && user.ZONE) {
        zone = user.ZONE;
      console.log(`ZONE: ${zone}`);
    } else {
      console.error("❌ User data not loaded properly. Received:", user);
}
  });
  it('Test_001: Verify a member can successfully claim and release parking spot on the current day', async () => {
    await claimReleaseNoVehiclePage.navigateToCalandar();
    // await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown,zone);
    await reusableMobilePage.refreshAndCountDaysForMultiDays();
    await claimReleaseAndroidPage.bookSpotForMultipleDays(zone);
    //await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot,() => Locatore.btnCancleBooking,() => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
  }); 
});