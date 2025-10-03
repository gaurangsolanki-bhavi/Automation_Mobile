// import LoginActions from '../../../../Pages/mobile/android/LoginMobPage';
// import { testConfig } from '../../../../wdio.conf';
// import ProfilePage from '../../../../Pages/mobile/android/ProfilePage';
// import ReusableMobilePage from '../../../../Pages/ReusableMobilePage';
// import { execSync } from 'child_process';

// let loginActions: LoginActions;
// let profilePage: ProfilePage;
// let reusableMobilePage: ReusableMobilePage;
// let email: string;
// let zone: string;
// let grid_desk_zone: string;
// let map_car_zone: string;

// loginActions = new LoginActions();
// profilePage = new ProfilePage();
// reusableMobilePage = new ReusableMobilePage();


// describe('Manual Login Test @Android', () => {
//   before(async () => {
//     console.log('Starting Manual Login Test...');
//      const packageName = 'com.android.chrome';
//     try {
//       console.log(`\n🔄 Clearing app cache and data for: ${packageName}`);
//       execSync(`adb shell pm clear ${packageName}`);
//       console.log(`✅ Cache and data cleared\n`);
//     } catch (error) {
//       console.error(`❌ Failed to clear cache: ${error}`);
//     }
//     await browser.pause(6000);
//     await loginActions.initializeAppAndManualLoginFromExcel('MobileUser',testConfig.excelPath);
//   });

//   it('Test_001: Verify Profile Page Loads Correctly and Navigation Menu Work', async () => {
//     await browser.pause(3000);
//     await profilePage.navigateToProfile();
//     await profilePage.navigateToHome();
//   });
// });