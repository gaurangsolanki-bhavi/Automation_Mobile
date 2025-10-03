import LoginActionsIOS from '../../../Pages/mobile/iOS/LoginiOSPage';
import ClaimReleaseNoVehicle from '../../../Pages/mobile/iOS/Claim-ReleaseNoVehiclePage';
import ZoneData from "../../../test-data/JSON/zone_data.json";
import ReusableMobilePage from '../../../Pages/ReusableMobilePage';
import Locatore from '../../../Pages/mobile/iOS/LocatoreiOSPage';

let loginActionsIOS: LoginActionsIOS;
let claimReleaseNoVehiclePage: ClaimReleaseNoVehicle;
let reusableMobilePage: ReusableMobilePage;
let email: string;
let zone: string;
let grid_park_zone: string;
let map_park_zone: string;

loginActionsIOS = new LoginActionsIOS();
claimReleaseNoVehiclePage = new ClaimReleaseNoVehicle();
reusableMobilePage = new ReusableMobilePage();

describe('Claim Release Test No Vehicles @ios', () => {
  before(async () => {
    console.log('Starting Claim Release Test No Vehicles...');
    await browser.pause(3000);
    const user = await loginActionsIOS.initializeAppAndLoginNoVehicle('NoVehicleUser', ZoneData.ZONE_SET1.XLXS_PATH);
    if (user && user.ZONE && user.GRID_PARK_ZONE) {
      zone = user.ZONE;
      grid_park_zone = user.GRID_PARK_ZONE;
      map_park_zone = user.MAP_CAR_ZONE;
      console.log(`ZONE: ${zone}, GRID_PARK_ZONE: ${grid_park_zone}, MAP_PARK_ZONE: ${map_park_zone}`);
    } else {
      console.error("❌ User data not loaded properly. Received:", user);
    }
  });
  it('Test_001: Verify a member can try to claim and release parking spot on the current day without vehicles', async () => {
    try {
      await claimReleaseNoVehiclePage.closePopupAddVehicle();
      await claimReleaseNoVehiclePage.navigateToCalandar();
      await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, zone);
      await claimReleaseNoVehiclePage.bookSpotCurrentDayFromCalendar();
    } catch (error: any) {
      throw error;
    }
  });
});