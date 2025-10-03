import LoginActions from '../../../Pages/mobile/android/LoginMobPage';
import ClaimReleaseAndroidPage from '../../../Pages/mobile/android/Claim-ReleaseAndroidPage';
import ZoneData from "../../../test-data/JSON/zone_data.json";
import ReusableMobilePage from '../../../Pages/ReusableMobilePage';
import Locatore from '../../../Pages/mobile/android/LocatorePage';

let loginActions: LoginActions;
let claimReleaseAndroidPage: ClaimReleaseAndroidPage;
let reusableMobilePage: ReusableMobilePage;
let zone: string;
let grid_park_zone: string;

loginActions = new LoginActions();
claimReleaseAndroidPage = new ClaimReleaseAndroidPage();
reusableMobilePage = new ReusableMobilePage();

describe('Claim Release Test @android', () => {
  before(async () => {
    console.log('Starting Claim Release Test...');
    await browser.pause(3000);
    const user = await loginActions.initializeAppAndLoginFromExcel('MobileUser', ZoneData.ZONE_SET1.XLXS_PATH);
    if (user && user.ZONE && user.GRID_PARK_ZONE) {
      zone = user.ZONE;
      grid_park_zone = user.GRID_PARK_ZONE;
      console.log(`ZONE: ${zone}, GRID_PARK_ZONE: ${grid_park_zone}`);
    } else {
      console.error("❌ User data not loaded properly. Received:", user);
}
  });
  it('Test_001: Verify a member can successfully claim and release parking spot on the current day', async () => {
    try{
    await claimReleaseAndroidPage.checkAndAddVehicle();
    await claimReleaseAndroidPage.navigateToCalandar();
    await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown,zone);
    await reusableMobilePage.refreshAndCountDays();
    await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot,() => Locatore.btnCancleBooking,() => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
    await claimReleaseAndroidPage.bookSpotCurrentDayFromCalendar(zone);
    // const beforeBooking = await claimReleaseiOSPage.VerifyCreditValue();
    // console.log('Befour Booking Credit',beforeBooking);
    // const creditDeductOnCurrentDay = await claimReleaseiOSPage.bookSpotCurrentDayFromCalendar();
    // const afterBooking = await claimReleaseiOSPage.VerifyCreditValue();
    // await claimReleaseiOSPage.expectCreditChange(beforeBooking, afterBooking, creditDeductOnCurrentDay, 'after booking');
    } catch (error: any) {
      throw error; 
    }
  });
  it(`Test_002: Verify a member can successfully claim and release parking spot on the next month`, async () => {
    try{
    await claimReleaseAndroidPage.nextMonthBooking();
    await reusableMobilePage.releaseSpotNextMonthFromCalendar(() => Locatore.countBookedSpot,() => Locatore.btnCancleBooking,() => Locatore.btnConfirmCancelBooking);
    } catch (error: any) {
      throw error; 
    }
  }); 
  it(`Test_003: Verify a member can successfully change their zone and claim and release parking spot on the next month`, async () => {
    try {
      await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown,grid_park_zone);
      await claimReleaseAndroidPage.nextMonthBooking();
      await reusableMobilePage.releaseSpotNextMonthFromCalendar(() => Locatore.countBookedSpot,() => Locatore.btnCancleBooking,() => Locatore.btnConfirmCancelBooking);
    } catch (error: any) {
      throw error;
    }
  });

  it(`Test_004: Verify a member can successfully check in and check out on Current Day claim and release from calendar`, async () => {
      try {
        await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, grid_park_zone);
        await reusableMobilePage.refreshAndCountDays();
        await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
        await claimReleaseAndroidPage.bookSpotCurrentDayFromCalendar(grid_park_zone);
        await reusableMobilePage.performCheckInFromCalendar(await Locatore.btnCheckIn, await Locatore.btnCheckOut, await Locatore.btnCancleBooking, await Locatore.btnBack);
        await reusableMobilePage.performCheckOutFromCalendar(await Locatore.btnCheckOut, await Locatore.btnCheckIn, await Locatore.btnCancleBooking, await Locatore.btnBack);
        await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
      } catch (error: any) {
        throw error;
      }
    });
  
    it(`Test_005: Verify a member can successfully change their zone and claim and release parking spot on the Current Day`, async () => {
      try {
        await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, grid_park_zone);
        await claimReleaseAndroidPage.bookSpotCurrentDayFromCalendar(grid_park_zone);
        await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
      } catch (error: any) {
        throw error;
      }
    });
  
   it(`Test_006: Verify a team member can successfully claim and release parking spot on the current day`, async () => {
       try {
         await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, zone);
         await reusableMobilePage.selectTeamMemberAndroid(1, await Locatore.teamDropdownDeactive, await Locatore.teamDropdown, Locatore.teamDropdownOptions);
         await reusableMobilePage.refreshAndCountDays();
         await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
         await claimReleaseAndroidPage.bookSpotForTeamMemberCurrentDayFromCalendar();
         await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
       } catch (error: any) {
         throw error;
       }
     }); 
   
      it(`Test_007: Verify a team member can successfully claim and release parking spot for the next month`, async () => {
       try {
         await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, zone);
         await reusableMobilePage.selectTeamMemberAndroid(2, await Locatore.teamDropdownDeactive, await Locatore.teamDropdown, Locatore.teamDropdownOptions);
         await claimReleaseAndroidPage.nextMonthBooking();
         await reusableMobilePage.releaseSpotNextMonthFromCalendar(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking);
       } catch (error: any) {
         throw error;
       }
     });
   
      it(`Test_008: Verify a team member can change their zone and successfully claim and release parking spot`, async () => {
       try {
         await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, grid_park_zone);
         await reusableMobilePage.selectTeamMemberAndroid(2, await Locatore.teamDropdownDeactive, await Locatore.teamDropdown, Locatore.teamDropdownOptions);
         await reusableMobilePage.refreshAndCountDays();
         await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
         await claimReleaseAndroidPage.bookSpotForTeamMemberCurrentDayFromCalendar();
         await reusableMobilePage.releaseSpotNextMonthFromCalendar(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking);
       } catch (error: any) {
         throw error;
       }
     });
   
     it(`Test_009: Verify a team member can change their zone and successfully claim and release parking spot for the next month`, async () => {
       try {
         await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, grid_park_zone);
         await reusableMobilePage.selectTeamMemberAndroid(2, await Locatore.teamDropdownDeactive, await Locatore.teamDropdown, Locatore.teamDropdownOptions);
         await claimReleaseAndroidPage.nextMonthBooking();
         await reusableMobilePage.releaseSpotNextMonthFromCalendar(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking);
       } catch (error: any) {
         throw error;
       }
     }); 
});