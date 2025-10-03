import LoginActions from '../../../Pages/mobile/android/LoginMobPage';
import ProfilePage from '../../../Pages/mobile/android/ProfilePage';
import ReusableMobilePage from '../../../Pages/ReusableMobilePage';
import ZoneData from "../../../test-data/JSON/zone_data.json"

let loginActions: LoginActions;
let profilePage: ProfilePage;
let reusableMobilePage: ReusableMobilePage;
let email: string;
let zone: string;
let grid_desk_zone: string;
let map_car_zone: string;

loginActions = new LoginActions();
profilePage = new ProfilePage();
reusableMobilePage = new ReusableMobilePage();

describe('Profile Page Test @Android', () => {
  before(async () => {
    console.log('Starting Profile Page Test...');
    await browser.pause(3000);
    const user = await loginActions.initializeAppAndLoginFromExcel('MobileUser', ZoneData.ZONE_SET1.XLXS_PATH);
    if (user && user.Email) {
    email = user.Email;
    }else {
    console.error("❌ User data not loaded properly. Received:", user);
    }
  });

  it('Test_001: Verify Profile Page Loads Correctly and Navigation Menu Work', async () => {
    await browser.pause(3000);
    await profilePage.navigateToProfile();
    await profilePage.verifyProfilePage();
    await profilePage.verifyingProfileScreenNavigations();
  });

  it('Test_002: Verify Edit Profile Page Loads Correctly and Allows Vehicle Deletion', async () => {
    await profilePage.verifyEditProfileSection();
    await profilePage.verifyEditProfilePage(email);
    await profilePage.deleteAllVehicleWithPopup();
  });

  it('Test_003: Verify Edit Vehicle Functionality on Edit Profile Page', async () => {
    await profilePage.editAndCheckingAndAddVehicle();
  });

  it('Test_004: Verify Error Message for Duplicate Car Plate Already Linked to Another Account', async () => {
    await profilePage.verifyingDuplicateCarpalte();
  });

  it('Test_005: Verify Add New Vehicle Functionality on Edit Profile Page', async () => {
    await profilePage.checkingAndAddVehicle();
  });

  // it('Test_006: Verify Maximum Vehicle Limit Validation and Popup Message Display', async () => {
  //   await profilePage.checkMaxAddVehiclePopupMobile();
  // });


});
