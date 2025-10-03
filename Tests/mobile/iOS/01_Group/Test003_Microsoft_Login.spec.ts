import LoginActions from '../../../../Pages/mobile/iOS/LoginiOSPage';
import { testConfig } from '../../../../wdio.conf';
import ReusableMobilePage from '../../../../Pages/ReusableMobilePage';

let loginActions: LoginActions;
let reusableMobilePage: ReusableMobilePage;

loginActions = new LoginActions();
reusableMobilePage = new ReusableMobilePage();

describe('Microsft SSO Login Test @ios', () => {
  before(async () => {
    console.log('Starting Microsft SSO Login Test...');
    await reusableMobilePage.forceClearLoginSessions();
    await browser.pause(5000);
    await loginActions.initializeAppAndMSLoginFromExcel('MSLoginUser', testConfig.excelPath);
  });

  it('Test_001: Verify Profile Page Loads Correctly and User Can Logout Successfully', async () => {
    await browser.pause(3000);
    await loginActions.logoutUser();
  });
});