import LoginActions from '../../../../Pages/mobile/iOS/LoginiOSPage';
import { testConfig } from '../../../../wdio.conf';
import ProfilePage from '../../../../Pages/mobile/iOS/ProfilePage';
import ReusableMobilePage from '../../../../Pages/ReusableMobilePage';

let loginActions: LoginActions;
let profilePage: ProfilePage;
let reusableMobilePage: ReusableMobilePage;

loginActions = new LoginActions();
profilePage = new ProfilePage();
reusableMobilePage = new ReusableMobilePage();

describe('Manual Login Test @ios', () => {
  before(async () => {
    console.log('Starting Microsft SSO Login Test...');
    await reusableMobilePage.forceClearLoginSessions();
    await browser.pause(5000);
    await loginActions.initializeAppAndManualLoginFromExcel('MobileUser',testConfig.excelPath);
  });

  it('Test_001: Verify Profile Page Loads Correctly and Navigation Menu Work', async () => {
    await browser.pause(3000);
    await loginActions.logoutUser();
  });
});