import LoginActionsIOS from '../../../Pages/mobile/iOS/LoginiOSPage';
import ZoneData from "../../../test-data/JSON/zone_data.json"


let loginActionsIOS: LoginActionsIOS;
loginActionsIOS = new LoginActionsIOS();

describe('Mobile Login Test @ios', () => {
  it('Test_001: Verify Login Functionality with Valid Credentials', async () => {
    await browser.pause(3000);
    await loginActionsIOS.initializeAppAndLoginFromExcel('MobileUser', ZoneData.ZONE_SET1.XLXS_PATH);
  });
});