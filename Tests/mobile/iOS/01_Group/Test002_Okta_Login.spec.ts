import LoginActions from '../../../../Pages/mobile/iOS/LoginiOSPage';
import { testConfig } from '../../../../wdio.conf';
import ProfilePage from '../../../../Pages/mobile/android/ProfilePage';
import ReusableMobilePage from '../../../../Pages/ReusableMobilePage';
import { execSync } from 'child_process';

let loginActions: LoginActions;
let profilePage: ProfilePage;
let reusableMobilePage: ReusableMobilePage;
let email: string;

loginActions = new LoginActions();
profilePage = new ProfilePage();
reusableMobilePage = new ReusableMobilePage();

describe('OKTA SSO Login Test @ios', () => {
  before(async () => {
    console.log('Starting Microsft SSO Login Test...');
    await reusableMobilePage.forceClearLoginSessions();
    await browser.pause(5000);
    await loginActions.initializeAppAndOktaLoginFromExcel('OktaLoginUser',testConfig.excelPath);
  });

  it('Test_001: Verify Profile Page Loads Correctly and User Can Logout Successfully', async () => {
    await browser.pause(3000);
    await loginActions.logoutUser();
  });
});