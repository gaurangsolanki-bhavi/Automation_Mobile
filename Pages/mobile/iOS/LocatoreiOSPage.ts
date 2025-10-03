import { $ } from '@wdio/globals';

class LoginPageISO {
  //Login Page Locators for iOS App
  get loginBtn() {
    return $('//XCUIElementTypeStaticText[@name="Continue"]');
  }
  get emailInput() {
    const locator1 = $('//XCUIElementTypeTextField[@name="Your email"]');
    const locator2 = $('//XCUIElementTypeTextField');
    return locator1.isExisting().then(exists => exists ? locator1 : locator2);
  }
  get radioEmployeeOption() {
    return $('//XCUIElementTypeStaticText[@name="I agree to the"]');
  }
  get confirmEmailBtn() {
    return $('//XCUIElementTypeButton[@name="Confirm"]');
  }
  get continueWithEmailBtn() {
    return $('//XCUIElementTypeStaticText[@name="Continue with Email"]');
  }
  get continueWithGmailBtn() {
    return $('//XCUIElementTypeLink[@name="Continue with Gmail"]');
  }
  get continueWithMicrosoftButton() {
    return $('//XCUIElementTypeLink[@name="Continue with Microsoft"]');
  }
  get oktaUsernameInput() {
    return $('//XCUIElementTypeTextField[@name="Username "]');
  }
  get passwordInput() {
    const locator1 = $('//XCUIElementTypeSecureTextField[@name="Password"]');
    const locator2 = $('//XCUIElementTypeSecureTextField');
    return locator1.isExisting().then(exists => exists ? locator1 : locator2);
  }
  get loginSubmitBtn() {
    return $('//XCUIElementTypeButton[@name="Log in"]');
  }
  get nextGmailButton() {
    return $('(//XCUIElementTypeButton[@name="Next"])[1]');
  }
  get passwordGmailInput() {
    return $('//XCUIElementTypeSecureTextField[@name="Enter your password"]');
  }
  get passwordMicrosoftInput() {
    return $('//XCUIElementTypeSecureTextField[@value="Password"]');
  }
  get oktaPasswordInput() {
    return $('//XCUIElementTypeSecureTextField[@name="Password "]');
  }
  get oktaSigninButton() {
    return $('//XCUIElementTypeButton[@name="Sign In"]');
  }
  get signInMicrosoftbutton() {
    return $('//XCUIElementTypeButton[@name="Sign in"]');
  }
  get savePasswordPopup() {
    return $('//XCUIElementTypeButton[@name="Not Now"]');
  }
  get staySignedInbutton() {
    return $('//XCUIElementTypeButton[@name="Yes"]');
  }
  get errorPopup() {
    return $('//XCUIElementTypeStaticText[@name="Authentication process not completed or failed"]//preceding::XCUIElementTypeButton[1]');   //XCUIElementTypeStaticText[@name="An error occurred"]
  }
  get errorPopupText() {
    return $('//XCUIElementTypeStaticText[@name="Authentication process not completed or failed"]');
  }
  get btnDone() {
    return $('~Done');
  }
  // Home Page Vehicle AddLocators and Edit Profile Locators
  get homeMenuButton() {
    return $('//XCUIElementTypeButton[@name="Home"]')
  }
  get popupNoVehiclesRegistered() {
    return $('//XCUIElementTypeImage[@name="addvehicle"]'); // Please check this locator
  }
  get popupNoVehiclesHeader() {
    return $('//XCUIElementTypeStaticText[contains(@name,"Hold on")]');
  }
  get btnCheckOutHome() {
    return $('//XCUIElementTypeButton[@name="Check out"]')
  }
  get profileIcon() {
    return $('//XCUIElementTypeButton[@name="Profile"]');
  }
  get editProfile() {
    return $('//XCUIElementTypeStaticText[@name="Edit profile"]');
  }
  get btnAddVehicle() {
    return $('//XCUIElementTypeStaticText[@name="Add a vehicle"]');
  }
  get addVehicleNumber() {
    return $('//XCUIElementTypeStaticText[@name="Vehicle number plate"]//following::XCUIElementTypeTextField[1]');   //XCUIElementTypeTextField[@value="XYZ 000"] Please check this locator
  }
  get select_Vehicle_Size() {
    return $('//XCUIElementTypeStaticText[@name="Size"]//following::XCUIElementTypeButton[1]');
  }
  get select_Vehicle_Fuel() {
    return $('//XCUIElementTypeStaticText[@name="Fuel"]//following::XCUIElementTypeButton[1]');
  }
  get select_Vehicle_Accessibility() {
    return $('//XCUIElementTypeStaticText[@name="Reduced mobility"]//following::XCUIElementTypeButton[1]'); //XCUIElementTypeStaticText[@name="Accessible"]//following::XCUIElementTypeButton[1]
  }
  get select_Vehicle_Sharing() {
    return $('//XCUIElementTypeStaticText[@name="Vehicle sharing"]//following::XCUIElementTypeButton[1]'); //XCUIElementTypeStaticText[@name="Shareable"]//following::XCUIElementTypeButton[1]
  }
  get popUpBtnSave_Vehicle() {
    return $('//XCUIElementTypeStaticText[@name="Save vehicle"]//following::XCUIElementTypeButton');
  }
  get vehicles() {
    return $$('//XCUIElementTypeCollectionView/XCUIElementTypeCell');
  }
  get check_First_Vehicle() {
    return $$('//XCUIElementTypeCollectionView/XCUIElementTypeCell/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeStaticText[2]')
  }
  get iconBack() {
    return $('//XCUIElementTypeStaticText[@name="Back"]//preceding-sibling::XCUIElementTypeButton');
  }
  get spotNameHomeScreen() {
    return $('//XCUIElementTypeStaticText[contains(@name,"ALL")]');
  }
  get zoneNameHomeScreen() {
    return $('//XCUIElementTypeStaticText[@name="Parking-NOMAP-AD"]');
  }
  // Calendar Page Locators
  get iconCalendar() {
    return $('//XCUIElementTypeButton[@name="Calendar"]');
  }
  get iconZoneDropdown() {
    return $('//XCUIElementTypeButton[@name="calendardropdown"]//preceding-sibling::XCUIElementTypeButton');
  }
  get countBookedSpot(){
    return $$('//XCUIElementTypeImage[@name="calanderbookingcountimage"]//following-sibling::XCUIElementTypeStaticText');
  }
  get btnCancleBooking() {
    return $('//XCUIElementTypeButton[@name="Cancel"]');
  }
  get btnBack() {
    return $('//XCUIElementTypeStaticText[@name="Back"]//following-sibling::XCUIElementTypeButton');
  }
  get btnConfirmCancelBooking() {
    return $('//XCUIElementTypeStaticText[@name="Confirm"]//following-sibling::XCUIElementTypeButton');
  }
  get availableDayIcon() {
    return $$('//XCUIElementTypeImage[@name="availabeldayicon"]');
  }
  get dateElement(){
    return $$('//XCUIElementTypeStaticText[not(contains(@name, "/")) and string(number(@name)) = @name]');
  }
  get textCurrentDate() {
    return $('//XCUIElementTypeStaticText[contains(@name,"Book a space for")]');
  }
  get selectCarDropdown() {
    return $('//XCUIElementTypeTextField[contains(@value,"")]//preceding-sibling::XCUIElementTypeButton');
  }
  get btnGetRandomSpace() {
    return $('//XCUIElementTypeStaticText[contains(@name,"Get random space")]//preceding-sibling::XCUIElementTypeButton');
  }
  get next_Month_Button() {
    return $('//XCUIElementTypeButton[@name="rightarrowgreen"]');
  }
  get previous_Month_Button() {
    return $('//XCUIElementTypeButton[@name="leftarrowgreen"]');
  }
  get creditDeductForBooking() {
    return $('//XCUIElementTypeImage[@name="popupstar"]//following-sibling::XCUIElementTypeStaticText');
  }
  get month_header() {
    return $('//XCUIElementTypeButton[@name="rightarrowgreen"]//preceding::XCUIElementTypeStaticText[1]');
  }
  get header_ManageBooking() {
    return $('//XCUIElementTypeStaticText[contains(@name,"Manage your booking for")]');
  }
  get bookedSpotOnHomeContainer() {
    return $('//XCUIElementTypeCell[1]//child::XCUIElementTypeStaticText[1]');
  }
  get profileIconOnBookingSpot() {
    return $('//XCUIElementTypeImage[@name="popupusergreen"]');
  }
  get usreNameOnBookingSpot() {
    return $('//XCUIElementTypeImage[@name="popupusergreen"]//following-sibling::XCUIElementTypeStaticText');
  }
  get iconCreditStar() {
    return $('//XCUIElementTypeImage[@name="popupstar"]');
  }
  get imageParkingOnBookingSpot() {
    return $('//XCUIElementTypeImage[@name="parkingicon"]');
  }
  get iconPinLocation() {
    return $('//XCUIElementTypeImage[@name="pinicon"]');
  }
  get textZone() {
    return $('//XCUIElementTypeImage[@name="pinicon"]//following-sibling::XCUIElementTypeStaticText[1]');
  }
  get iconTime() {
    return $('//XCUIElementTypeImage[@name="timeicon"]');
  }
  get textSpotTimeWithDate() {
    return $('//XCUIElementTypeStaticText[contains(@name,"All day")]');
  }
  get btnCheckIn() {
    return $('//XCUIElementTypeButton[@name="Check in"]');
  }
  get btnCheckOut() {
    return $('//XCUIElementTypeButton[@name="Check out"]');
  }
  get textCancelBooking() {
    return $('//XCUIElementTypeImage[@name="popupusergreen"]//preceding::XCUIElementTypeStaticText[1]');
  }
  get iconCalendarCancleBooking() {
    return $('//XCUIElementTypeImage[@name="popupcalandericon"]')
  }
  get dateOnCancelBooking() {
    return $('//XCUIElementTypeImage[@name="popupcalandericon"]//following-sibling::XCUIElementTypeStaticText[1]');
  }
  get btnConfirm() {
    return $('//XCUIElementTypeStaticText[@name="Confirm"]//following-sibling::XCUIElementTypeButton');
  }
  get teamDropdownDeactive() {
    return $('//XCUIElementTypeButton[@name="calendaruserdeactive"]');
  }
  get teamDropdownActive() {
    return $('//XCUIElementTypeButton[@name="calendaruseractive"]');
  }
  get teamDropdown() {
    return $('//XCUIElementTypeButton[@name="calendaruseractive"]//following::XCUIElementTypeButton[1]');
  }
  get teamDropdownOptions() {
    return '//XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeStaticText';
  }
  get spotCount() {
    return '//XCUIElementTypeScrollView/XCUIElementTypeOther/XCUIElementTypeButton';
  }
  get headerText_BookingSpot() {
    return $('//XCUIElementTypeStaticText[contains(@name,"Book space")]');
  }
  // Profile Page Locators
  get profileImage() {
    return $('//XCUIElementTypeImage[@name="profileroundedicon"]//following-sibling::XCUIElementTypeStaticText');
  }
  get userName() {
    return $('//XCUIElementTypeImage[@name="profileroundedicon"]//following::XCUIElementTypeStaticText[2]');
  }
  get userEmail() { 
    return $('//XCUIElementTypeImage[@name="profileroundedicon"]//following::XCUIElementTypeStaticText[3]');
  }
  get editProfileTitle() {
    return $('//XCUIElementTypeStaticText[@name="Edit profile"]');
  }
  get starIcon() {
    return $('//XCUIElementTypeImage[@name="staricon"]');
  }
  get creditCount() {
    return $('//XCUIElementTypeImage[@name="staricon"]//following::XCUIElementTypeStaticText[1]');
  }
  get creditText() {
    return $('//XCUIElementTypeImage[@name="staricon"]//following::XCUIElementTypeStaticText[2]');
  }
  get creditRefillIcon() {
    return $('//XCUIElementTypeImage[@name="creditrefilicon"]');
  }
  get refillDaysCount() {
    return $('//XCUIElementTypeImage[@name="creditrefilicon"]//following::XCUIElementTypeStaticText[1]');
  }
  get refillDaysText() {
    return $('//XCUIElementTypeImage[@name="creditrefilicon"]//following::XCUIElementTypeStaticText[2]');
  }
  get syncIcon() {
    return $('//XCUIElementTypeImage[@name="syncicon"]');
  }
  get syncWithCalendarText() {
    return $('//XCUIElementTypeStaticText[@name="Sync bookings with calendar"]');
  }
  get syncToggleButton() {
    return $('//XCUIElementTypeStaticText[@name="Sync bookings with calendar"]//following-sibling::XCUIElementTypeImage');
  }
  get allowCheckInWithWifiIcon() {
    return $('//XCUIElementTypeImage[@name="allowcheckinwithwifiicon"]');
  }
  get allowCheckInWithWifiText() {
    return $('//XCUIElementTypeStaticText[@name="Allow check-in with Wi-Fi"]');
  }
  get wifiToggleButton() {
    return $('//XCUIElementTypeStaticText[@name="Allow check-in with Wi-Fi"]//following-sibling::XCUIElementTypeImage');
  }
  get wifiToggleButton1() {
    return $('//XCUIElementTypeStaticText[@name="Allow check-in with Wi-Fi"]//preceding::XCUIElementTypeButton[1]');
  }
  get notificationBellIcon() {
    return $('//XCUIElementTypeImage[@name="bellicon"]');
  }
  get notificationMenuText() {
    return $('//XCUIElementTypeStaticText[@name="Notifications"]');
  }
  get notificationButton() {
    return $('//XCUIElementTypeStaticText[@name="Notifications"]//preceding-sibling::XCUIElementTypeButton');
  }
  get notificationCheckIn() {
    return $('//XCUIElementTypeStaticText[@name="Check-in confirmed"]');
  }
  get notificationPageTitle() {
    return $('//XCUIElementTypeStaticText[@name="Notifications"]');
  }
  get notificationCheckInDetailTxt() {
    return $('//XCUIElementTypeStaticText[contains(@name,"You’ve successfully checked")]');
  }
  get clearAllNotification() {
    return $('//XCUIElementTypeButton[@name="Clear all"]');
  }
  get privacyPolicyIcon() {
    return $('//XCUIElementTypeImage[@name="policy"]');
  }
  get privacyPolicyMenuText() {
    return $('//XCUIElementTypeStaticText[@name="Terms of use and privacy"]');
  }
  get privacyPolicyButton() {
    return $('//XCUIElementTypeStaticText[@name="Terms of use and privacy"]//preceding-sibling::XCUIElementTypeButton');
  }
  get privacyPolicyPageTitle() {
    return $('//XCUIElementTypeStaticText[@name="Terms of Use and Privacy Policy"]');
  }
  get supportIcon() {
    return $('//XCUIElementTypeImage[@name="support"]');
  }
  get supportMenuText() {
    return $('//XCUIElementTypeStaticText[@name="Need help?"]');
  }
  get supportButton() {
    return $('//XCUIElementTypeStaticText[@name="Need help?"]//preceding-sibling::XCUIElementTypeButton');
  }
  get supportPageTitle() {
    return $('//XCUIElementTypeStaticText[@name="Need help?"]');
  }
  get healthAndSafetyIcon() {
    return $('//XCUIElementTypeImage[@name="employeerole"]');
  }
  get healthAndSafetyMenuText() {
    return $('//XCUIElementTypeStaticText[@name="Emergency roles"]');
  }
  get healthAndSafetyButton() {
    return $('//XCUIElementTypeStaticText[@name="Emergency roles"]//preceding-sibling::XCUIElementTypeButton');
  }
  get healthAndSafetyPageTitle() {
    return $('//XCUIElementTypeStaticText[@name="Emergency roles"]');
  }
  get backIconArrow() {
    return $('//XCUIElementTypeButton[@name="btnback"]');
  }
  get logoutIcon() {
    return $('//XCUIElementTypeImage[@name="logout"]');
  }
  get logoutMenuText() {
    return $('//XCUIElementTypeStaticText[@name="Log out"]');
  }
  get logoutButton() {
    return $('//XCUIElementTypeStaticText[@name="Log out"]//preceding-sibling::XCUIElementTypeButton');
  }
  get popupLogoutText() {
    return $('//XCUIElementTypeStaticText[@name="Confirm you wish to log out?"]');
  }
  get popupLogoutBtn() {
    return $('(//XCUIElementTypeStaticText[@name="Log out"])[3]//following-sibling::XCUIElementTypeButton');
  }
  get popupCancelBtn() {
    return $('//XCUIElementTypeStaticText[@name="Cancel"]//following::XCUIElementTypeButton');
  }
  get popupCancelBtnMap() {
    return $('//XCUIElementTypeButton[@name="Cancel"]');
  }
  //Edit Profile Page Locators
  get firstNameLabelEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="First name*"]');
  }
  get firstNameInputEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="First name*"]//following::XCUIElementTypeTextField[1]');
  }
  get lastNameLabelEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Last name*"]');
  }
  get lastNameInputEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Last name*"]//following::XCUIElementTypeTextField[1]');
  }
  get emailLabelEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Email"]');
  }
  get emailInputEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Email"]//following::XCUIElementTypeTextField[1]');
  }
  get changePasswordBtnEditProfilePage() {
    return $('//XCUIElementTypeButton[@name="Change password"]');
  }
  get changePasswordPopupHeaderEditProfilePage() {
    return $('(//XCUIElementTypeStaticText[@name="Change password"])[2]');
  }
  get curruntPasswordLabeleditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Current password"]');
  }
  get curruntPasswordInputeditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Current password"]//following-sibling::XCUIElementTypeOther[1]');
  }
  get newPasswordLabeleditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="New password"]');
  }
  get newPasswordInputeditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="New password"]//following-sibling::XCUIElementTypeOther[1]');
  }
  get confirmPasswordLabeleditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Confirm new password"]');
  }
  get confirmPasswordInputeditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Confirm new password"]//following-sibling::XCUIElementTypeOther[1]');
  }
  get saveBtnEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Save"]//preceding-sibling::XCUIElementTypeButton');
  }
  get languageLabelEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Language"]');
  }
  get languageDropdownEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Language"]//following::XCUIElementTypeButton[1]');
  }
  get groupLabelEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Group"]');
  }
  get groupDropdownEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Group"]//following::XCUIElementTypeButton[1]');
  }
  get defaultZoneLabelEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Default zone"]');
  }
  get defaultZoneDropdownEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Default zone"]//following::XCUIElementTypeButton[1]');
  }
  get vehiclesLabelEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="vehicles"]');
  }
  get addVehicleBtnTextEditProfilePage(){
    return $('//XCUIElementTypeStaticText[@name="Add a vehicle"]');
  }
  get addVehicleBtnEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Add a vehicle"]//preceding-sibling::XCUIElementTypeButton');
  }
  get saveButtonVehicleOptionsEditProfile() {
    return $('//XCUIElementTypeStaticText[@name="Save"]//following-sibling::XCUIElementTypeButton');
  }
  get dropdownOptions() {
    return '//XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeStaticText';
  }
  get warningMsgText() {
    return $('(//XCUIElementTypeStaticText[@name="Warning"])[2]//following-sibling::XCUIElementTypeStaticText');
  }
  get cancelBtnDeleteVehicle () {
    return $('//XCUIElementTypeStaticText[@name="Cancel"]//following-sibling::XCUIElementTypeButton');
  }
  get editButtonVehicleOptionsEditProfile() {
    return $('//XCUIElementTypeButton[@name="editiconwhite"]');
  }
  get deleteIconVehicleEditProfile(): string {
    return '//XCUIElementTypeButton[@name="deleteiconwhite"]';
  }
  get MaxVehiclePopUpEditProfile() {
    return $('//XCUIElementTypeStaticText[@name="Alert"]//following-sibling::XCUIElementTypeStaticText');
  }
  get confirmButtonMaxVehiclePopUpEditProfile() {
    return $('//XCUIElementTypeStaticText[@name="Confirm"]//following-sibling::XCUIElementTypeButton');
  }
  get lastVehicleWarningPopup() {
    return $('(//XCUIElementTypeStaticText[@name="Confirm"]//following-sibling::XCUIElementTypeButton)[2]');
  }
  get duplicateVehiclePopUpEditProfile() {
    return $('//XCUIElementTypeStaticText[contains(@name,"Uh-oh! This")]');
  }
  get duplicateVehiclePopup(){
    return $('//XCUIElementTypeStaticText[@name="Confirm"]//following-sibling::XCUIElementTypeButton')
  }
  get saveBtnTextEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="save"]');
  }
  get saveBtnEditProfilePage2() {
    return $('//XCUIElementTypeStaticText[@name="Save"]//preceding-sibling::XCUIElementTypeButton');
  }
  get backBtnTextEditProfilePage() {
    return $('//XCUIElementTypeStaticText[@name="Back"]');
  }
  get backBtnEditProfilePage2() {
    return $('//XCUIElementTypeStaticText[@name="Back"]//preceding-sibling::XCUIElementTypeButton');
  }
  get deleteAccountLink() {
    return $('//XCUIElementTypeStaticText[@name="Delete my account"]');
  }
  // Mobile Setting (Wifi)
  get toggleWifi() {
    return $('//XCUIElementTypeStaticText[@name="Wi-Fi"]');
  }  
  get connectedSSID() {
    return $('//XCUIElementTypeImage[@name="checkmark"]//preceding::XCUIElementTypeStaticText[1]');
  }
  get passwordWifi() {
    return $('//XCUIElementTypeSecureTextField');
  }
  get btnJoin() {
    return $('//XCUIElementTypeButton[@name="Join"]');
  }
  get internetWarring() {
    return $('//XCUIElementTypeStaticText[@name="Confirm"]//following::XCUIElementTypeButton');
  }
}

export default new LoginPageISO();
