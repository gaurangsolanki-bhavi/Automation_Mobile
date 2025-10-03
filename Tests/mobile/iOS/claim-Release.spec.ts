import LoginActionsIOS from '../../../Pages/mobile/iOS/LoginiOSPage';
import ClaimReleaseiOSPage from '../../../Pages/mobile/iOS/Claim-ReleaseiOSPage';
import ZoneData from "../../../test-data/JSON/zone_data.json";
import ReusableMobilePage from '../../../Pages/ReusableMobilePage';
import Locatore from '../../../Pages/mobile/iOS/LocatoreiOSPage';

let loginActionsIOS: LoginActionsIOS;
let claimReleaseiOSPage: ClaimReleaseiOSPage;
let reusableMobilePage: ReusableMobilePage;
let email: string;
let zone: string;
let grid_park_zone: string;
let map_park_zone: string;

loginActionsIOS = new LoginActionsIOS();
claimReleaseiOSPage = new ClaimReleaseiOSPage();
reusableMobilePage = new ReusableMobilePage();

describe('Claim Release Test @ios', () => {
  before(async () => {
    console.log('Starting Claim Release Test...');
    await browser.pause(3000);
    const user = await loginActionsIOS.initializeAppAndLoginFromExcel('MobileUser', ZoneData.ZONE_SET1.XLXS_PATH);
    if (user && user.ZONE && user.GRID_PARK_ZONE) {
      zone = user.ZONE;
      grid_park_zone = user.GRID_PARK_ZONE;
      map_park_zone = user.MAP_CAR_ZONE;
      console.log(`ZONE: ${zone}, GRID_PARK_ZONE: ${grid_park_zone}, MAP_PARK_ZONE: ${map_park_zone}`);
    } else {
      console.error("❌ User data not loaded properly. Received:", user);
    }
  });
  it('Test_001: Verify a member can successfully claim and release parking spot on the current day', async () => {
    try {
      await claimReleaseiOSPage.checkAndAddVehicle();
      await claimReleaseiOSPage.navigateToCalandar();
      await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, zone);
      await reusableMobilePage.refreshAndCountDays();
      await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
      await claimReleaseiOSPage.bookSpotCurrentDayFromCalendar(zone);
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
    try {
      await claimReleaseiOSPage.nextMonthBooking();
      await reusableMobilePage.releaseSpotNextMonthFromCalendar(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking);
    } catch (error: any) {
      throw error;
    }
  });

  it(`Test_003: Verify a member can successfully change their zone and claim and release parking spot on the next month`, async () => {
    try {
      await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, grid_park_zone);
      await claimReleaseiOSPage.nextMonthBooking();
      await reusableMobilePage.releaseSpotNextMonthFromCalendar(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking);
    } catch (error: any) {
      throw error;
    }
  });

  it(`Test_004: Verify a member can successfully check in and check out on Current Day claim and release from calendar`, async () => {
    try {
      await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, grid_park_zone);
      await reusableMobilePage.refreshAndCountDays();
      await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
      await claimReleaseiOSPage.bookSpotCurrentDayFromCalendar(grid_park_zone);
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
      await reusableMobilePage.refreshAndCountDays();
      await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
      await claimReleaseiOSPage.bookSpotCurrentDayFromCalendar(grid_park_zone);
      await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
    } catch (error: any) {
      throw error;
    }
  }); 

  it(`Test_006: Verify a team member can successfully claim and release parking spot on the current day`, async () => {
    try {
      await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, zone);
      await reusableMobilePage.selectTeamMember(1, await Locatore.teamDropdownDeactive, await Locatore.teamDropdownActive, await Locatore.teamDropdown, Locatore.teamDropdownOptions);
      await reusableMobilePage.refreshAndCountDays();
      await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
      await claimReleaseiOSPage.bookSpotForTeamMemberCurrentDayFromCalendar();
      await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
    } catch (error: any) {
      throw error;
    }
  }); 

   it(`Test_007: Verify a team member can successfully claim and release parking spot for the next month`, async () => {
    try {
      await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, zone);
      await reusableMobilePage.selectTeamMember(2, await Locatore.teamDropdownDeactive, await Locatore.teamDropdownActive, await Locatore.teamDropdown, Locatore.teamDropdownOptions);
      await claimReleaseiOSPage.nextMonthBooking();
      await reusableMobilePage.releaseSpotNextMonthFromCalendar(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking);
    } catch (error: any) {
      throw error;
    }
  });

   it(`Test_008: Verify a team member can change their zone and successfully claim and release parking spot`, async () => {
    try {
      await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, grid_park_zone);
      await reusableMobilePage.selectTeamMember(2, await Locatore.teamDropdownDeactive, await Locatore.teamDropdownActive, await Locatore.teamDropdown, Locatore.teamDropdownOptions);
      await reusableMobilePage.refreshAndCountDays();
      await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
      await claimReleaseiOSPage.bookSpotForTeamMemberCurrentDayFromCalendar();
      await reusableMobilePage.releaseSpotNextMonthFromCalendar(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking);
    } catch (error: any) {
      throw error;
    }
  });

  it(`Test_009: Verify a team member can change their zone and successfully claim and release parking spot for the next month`, async () => {
    try {
      await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, grid_park_zone);
      await reusableMobilePage.selectTeamMember(2, await Locatore.teamDropdownDeactive, await Locatore.teamDropdownActive, await Locatore.teamDropdown, Locatore.teamDropdownOptions);
      await claimReleaseiOSPage.nextMonthBooking();
      await reusableMobilePage.releaseSpotNextMonthFromCalendar(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking);
    } catch (error: any) {
      throw error;
    }
  }); 

  /* it(`Test_010: Verify a member can claim and release parking spot from the map layout on the current day`, async () => {
    try {
      await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, map_park_zone);
      await browser.pause(10000);
      await reusableMobilePage.countActiveAndInactiveSpots(await Locatore.headerText_BookingSpot, await Locatore.popupCancelBtnMap)
      // await parkingBookingPage.bookSpotCurruntDayFromMap();
      // await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  }); */

  /* test(`Test_011: Ensures a member can claim and release parking spot from the map layout for the next month`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(map_car_zone);
      await parkingBookingPage.bookSpotNextMonthFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_012: Ensures a member can change their zone and successfully claim and release parking spot from the map layout on the current day`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(grid_desk_zone);
      await parkingBookingPage.bookSpotCurruntDayFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });


  test(`Test_013: Ensures a member can change their zone and successfully claim and release parking spot from the map layout for the next month`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(grid_desk_zone);
      await parkingBookingPage.bookSpotNextMonthFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_014: Ensures a team member can claim and release a parking spot from the map layout on the current day`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(map_car_zone);
      await parkingBookingPage.bookSpotCurruntDayForTeamMemberFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_015: Ensures a team member can claim and release a parking spot from the map layout for the next month`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectZone(map_car_zone);
      await parkingBookingPage.bookSpotForTeamMemberNextMonthFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_016: Ensures a team member can change their zone and successfully claim and release a parking spot from the map layout on the current day`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectTeamMember(2);
      await reusablePageClass.selectZone(grid_desk_zone);
      await parkingBookingPage.bookSpotCurruntDayFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_017: Ensures a team member can change their zone and successfully claim and release a parking spot from the map layout for the next month`, async () => {
    try {
      await reusablePageClass.NavigateToDashboard();
      await reusablePageClass.selectTeamMember(2);
      await reusablePageClass.selectZone(grid_desk_zone);
      await parkingBookingPage.bookSpotNextMonthFromMap();
      await parkingBookingPage.releaseSpotCurrentDayFromMap();
    } catch (error: any) {
      throw error;
    }
  }); */

});