import LoginActions from '../../../Pages/mobile/android/LoginMobPage';
import ClaimReleaseNoVehiclePage from '../../../Pages/mobile/android/Claim-ReleaseNoVehiclePage';
import ZoneData from "../../../test-data/JSON/zone_data.json";
import ReusableMobilePage from '../../../Pages/ReusableMobilePage';
import Locatore from '../../../Pages/mobile/android/LocatorePage';

let loginActions: LoginActions;
let claimReleaseNoVehiclePage: ClaimReleaseNoVehiclePage;
let reusableMobilePage: ReusableMobilePage;
let zone: string;
let grid_desk_zone: string;

loginActions = new LoginActions();
claimReleaseNoVehiclePage = new ClaimReleaseNoVehiclePage();
reusableMobilePage = new ReusableMobilePage();

describe('Claim Release Test @android', () => {
  before(async () => {
    console.log('Starting Claim Release Test...');
    await browser.pause(3000);
    const user = await loginActions.initializeAppAndLoginNoVehicle('NoVehicleUser', ZoneData.ZONE_SET1.XLXS_PATH);
    if (user && user.ZONE && user.GRID_DESK_ZONE) {
      zone = user.ZONE;
      grid_desk_zone = user.GRID_DESK_ZONE;
      console.log(`ZONE: ${zone}, GRID_DESK_ZONE: ${grid_desk_zone}`);
    } else {
      console.error("❌ User data not loaded properly. Received:", user);
}
  });
  it('Test_001: Verify a member can successfully claim and release parking spot on the current day', async () => {
    try{
    await claimReleaseNoVehiclePage.closePopupAddVehicle();
    await claimReleaseNoVehiclePage.navigateToCalandar();
    await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown,zone);
    await claimReleaseNoVehiclePage.bookSpotCurrentDayFromCalendar();
    } catch (error: any) {
      throw error; 
    }
  });
});