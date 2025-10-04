import { $ } from '@wdio/globals';

class AndroidLocatorPage {
  get loginBtn() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/continueTv"]');
  }

  get emailInput() {
    const locator1 = $('//android.widget.EditText[@resource-id="email"]');
    const locator2 = $('//android.widget.EditText');
    return locator1.isExisting().then(exists => exists ? locator1 : locator2);
  }

  get radioEmployeeOption() {
    const locator1 = $('//android.widget.TextView[@text="I agree to the "]');
    const locator2 = $('//android.webkit.WebView[@text="Employee | Login"]/android.view.View/android.view.View/android.view.View[1]/android.view.View[3]/android.view.View/android.widget.TextView');
    const locator3 = $('//android.view.View[@text="I agree to the "]');
    return locator1.isExisting().then(exists => exists ? locator1 : (locator2.isExisting().then(exists2 => exists2 ? locator2 : locator3)));
  }

  get confirmEmailBtn() {

    const locator1 = $('//android.widget.Button[@resource-id="emailConfirmButton"]');
    const locator2 = $('//android.widget.Button[@text="Confirm"]');
    return locator1.isExisting().then(exists => exists ? locator1 : locator2);

  }

  get continueWithEmailBtn() {
    const locator1 = $('//android.widget.TextView[@text="Continue with Email"]');
    const locator2 = $('//android.view.View[@text="Continue with Email"]');
    const locator3 = $('//android.view.View[@content-desc="Continue with Email"]');
    return locator1.isExisting().then(exists => exists ? locator1 : (locator2.isExisting().then(exists2 => exists2 ? locator2 : locator3)));
  }

  get continueWithGmailBtn() {
    const locator1 = $('//android.widget.TextView[@text="Continue with Gmail"]');
    const locator2 = $('//android.view.View[@text="Continue with Email"]');
    return locator1.isExisting().then(exists => exists ? locator1 : locator2);
  }

  get passwordInput() {
    const locator1 = $('//android.widget.EditText[@resource-id="password"]');
    const locator2 = $('//android.webkit.WebView[@text="Employee | Login"]/android.view.View/android.view.View/android.view.View[1]/android.view.View[2]/android.view.View/android.view.View/android.view.View[3]/android.widget.EditText');
    return locator1.isExisting().then(exists => exists ? locator1 : locator2);

  }

  get loginSubmitBtn() {
    const locator1 = $('//android.widget.Button[@resource-id="loginBtn"]');
    const locator2 = $('//android.widget.Button[@text="Log in"]');
    return locator1.isExisting().then(exists => exists ? locator1 : locator2);

  }
  get loader(){
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/loadingImageView"]');
  }
  get clickHereButtonOrOk() {
    const locator1 = $('//android.view.View[@text="Click here"]');
    const locator2 = $('//android.widget.ImageButton[@content-desc="Confirm"]');
    return locator1.isExisting().then(exists => exists ? locator1 : locator2);
  }
  get savePasswordPopupFirefox() {
    return $('//android.widget.Button[@resource-id="org.mozilla.firefox:id/save_cancel"]');
  }
  get btnClickHereFirefox() {
    return $('//android.view.View[@text="Click here"]');
  }
  get popupNoVehiclesHeader() {
    return $('//android.widget.TextView[contains(@text,"Hold on")]');
  }
  get profileIcon() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/navigation_bar_item_small_label_view" and @text="Profile"]');
  }
  get editProfile() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/editProfileBtn"]');
  }
  get confirmPopupBtn() {
    return $('//android.widget.ImageButton[@content-desc="Confirm"]');
  }
  get spotNameHomeScreen(){
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/spotNameTxt"]');
  }
  get zoneNameHomeScreen() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/bookingTitleTxt"]');
  }

  get CalendarNavigationBarItemIcon() {
    return $('(//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/navigation_bar_item_icon_view"])[2]');
  }
   get calendarZoneDropdown () {
    return $('//android.widget.Spinner[@resource-id="ie.jemstone.ronspot:id/zoneSp"]');
  }
  get iconZoneDropdown() {
    return $('//android.widget.Spinner[@resource-id="ie.jemstone.ronspot:id/zoneSp"]');
  }
  get textCurrentDate() {
    return $('//android.widget.TextView[contains(@text,"Book a space for")]');
  }
  get selectCarDropdown() {
    return $('//android.widget.Spinner[@resource-id="ie.jemstone.ronspot:id/vehicleTypeSpinner"]');
  }
  get btnCancleBooking() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/releaseBookingBtn"]');
  }
  get btnConfirmCancelBooking() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/confirmBtn"]');
  }
  get btnGetRandomSpace() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/randomSpaceBtn"]');
  }
  get loaderBooking(){
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/gifLoaderIv"]');
  }
  get usreNameOnBookingSpot() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/userNameTxt"]')
  }
  get userNameonManageBooking() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/nameTxt"]');
  }
  get creditAndStarIcon() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/creditCountBtn"]');
  }
  get imageParkingOnBookingSpot() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/claimPlaceHolderIv"]');
  }
  get header_ManageBooking() {
    return $('//android.widget.TextView[contains(@text,"Manage your booking for")]');
  }
  get textZone() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/zoneNameTxt"]');
  }
  get textSpotTimeWithDate() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/dateTimeTxt"]');
  }
  get btnCheckIn() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/checkInBtn"]');
  }
  get btnCheckOut() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/checkOutBtn"]');
  }
  get btnCheckOutHome() {
    return $('//android.widget.Button[contains(@text,"Check out")]');
  }
  get textCancelBooking() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/cancelBookingTxt"]');
  }
  get textDateOnCancelBooking() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/dateTxt"]');
  }
  get btnConfirm() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/confirmBtn"]');
  }
  get btnBack() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/backBtn"]');
  }
  get countBookedSpot() {
    return $$('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/bookingCountTxt"]');
  }
  get next_month_button() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/monthNextIv"]');
  }
  get previous_Month_Button() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/monthPreviousIv"]')
  }
  get month_header() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/monthNameTv"]');
  }
  get availableDayIcon() {
    return $$('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/availableSpotIv"]');
  }
  get dateElement() {
    return $$('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/dateTxt"]');
  }
  get errorPopup() {
    return $('//android.view.ViewGroup[@resource-id="ie.jemstone.ronspot:id/detailCl"]');
  }

  get errorPopupText() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/bodyTxt"]');
  }
  get popupNoVehiclesRegistered() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/parkingSpotIv"]');
  }
  get addVehicleNumber() {
    return $('//android.widget.EditText[@resource-id="ie.jemstone.ronspot:id/plateNumberEt"]');
  }

  get select_Vehicle_Size() {
    return $('//android.widget.Spinner[@resource-id="ie.jemstone.ronspot:id/vehicleTypeSpinner"]');
  }

  get select_Vehicle_Fuel() {
    return $('//android.widget.Spinner[@resource-id="ie.jemstone.ronspot:id/vehicleFuelSpinner"]');
  }
  get popUpBtnSave_Vehicle() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/saveVehicleBtn"]');
  }

  get btnAddVehicle() {
    return $('//android.widget.Button[@text="Add a vehicle"]');
  }
  get vehicles() {
    return $$('//androidx.cardview.widget.CardView[@resource-id="ie.jemstone.ronspot:id/vehicleMc"]/android.view.ViewGroup');
  }

  get check_First_Vehicle() {
    return $$('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/plateNumberTxt"]');
  }
  get teamDropdownDeactive() {
    return $('//android.widget.ImageButton[@resource-id="ie.jemstone.ronspot:id/showEmployeeIv"]');
  }
  get teamDropdown() {
    return $('//android.widget.Spinner[@resource-id="ie.jemstone.ronspot:id/memberSp"]');
  }
  get teamDropdownOptions() {
    return '//android.widget.ListView/android.widget.LinearLayout/android.widget.TextView';
  }
  get bookingLoder() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/gifLoaderIv"]');
  }
  
  // Profile Screen Locator

  get profileImage() {
    return $('//android.view.ViewGroup[@resource-id="ie.jemstone.ronspot:id/profileCl"]')
  }

  get userName() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/userNameTxt"]')
  }

  get userEmail() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/userEmailTxt"]')
  }

  get starIcon() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/creditIv"]')
  }
  get creditCount() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/creditPointTxt"]')
  }
  get creditText() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/creditLabelTxt"]')
  }
  get creditRefillIcon() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/refillIv"]')
  }
  get refillDaysCount() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/refillDaysTxt"]')
  }


  get refillDaysText() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/refillLabelTxt"]')
  }
  get syncWithCalendarText() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/syncCalendarBtn"]')
  }
  get syncToggleButton() {
    return $('//android.widget.Switch[@resource-id="ie.jemstone.ronspot:id/syncCalendarSwitch"]')
  }
  get allowCheckInWithWifiText() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/checkInWithWifiBtn"]')
  }
  get wifiToggleButton() {
    return $('//android.widget.Switch[@resource-id="ie.jemstone.ronspot:id/checkInWithWifiSwitch"]')
  }
  get notificationMenuText() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/notificationBtn"]')
  }
  get notificationPageTitle() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/moduleNameTxt"]')
  }
  get privacyPolicyMenuText() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/privacyPolicyBtn"]')
  }


  get privacyPolicyPageTitle() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/moduleNameTxt"]')
  }
  get supportMenuText() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/supportBtn"]')
  }
  get supportPageTitle() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/moduleNameTxt"]')
  }
  get healthAndSafetyMenuText() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/employeeRoleBtn"]')
  }
  get healthAndSafetyPageTitle() {
    return $('//android.widget.TextView[@text="Emergency roles"]')
  }



  get logoutMenuText() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/logoutBtn"]')
  }
  get popupLogoutText() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/bodyTxt"]')
  }
  get popupLogoutBtn() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/logoutBtn"]')
  }

  get popupCancelBtn() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/cancelBtn"]')
  }

  get editProfilePageTitle() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/moduleNameTxt"]')
  }

  get backButton() {
    const locator1 = $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/moduleBackBtn"]');
    const locator2 = $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/backBtn"]');
    return locator1.isExisting().then(exists => exists ? locator1 : locator2);
  }

  //Edit Profile screen

  get firstNameLabeleditProfilePage() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/firstNameTxt"]')
  }

  get lastNameLabeleditProfilePage() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/lastNameTxt"]')
  }

  get emailLabeleditProfilePage() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/emailTxt"]')
  }

  get languageLabeleditProfilePage() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/languageTxt"]')
  }

  get groupLabeleditProfilePage() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/groupTxt"]')
  }

  get defaultZoneLabeleditProfilePage() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/defaultZoneTxt"]')
  }

  get vehiclesLabeleditProfilePage() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/vehiclesTxt"]')
  }

  get firstNameInputEditProfilePage() {
    return $('//android.widget.EditText[@resource-id="ie.jemstone.ronspot:id/firstNameEt"]')
  }

  get lastNameInputEditProfilePage() {
    return $('//android.widget.EditText[@resource-id="ie.jemstone.ronspot:id/lastNameEt"]')
  }

  get emailInputEditProfilePage() {
    return $('//android.widget.EditText[@resource-id="ie.jemstone.ronspot:id/emailEt"]')
  }

  get languageDropdownEditProfilePage() {
    return $('//android.widget.Spinner[@resource-id="ie.jemstone.ronspot:id/languageSp"]')
  }

  get groupDropdownEditProfilePage() {
    return $('//android.widget.Spinner[@resource-id="ie.jemstone.ronspot:id/groupSp"]')
  }

  get defaultZoneDropdownEditProfilePage() {
    return $('//android.widget.Spinner[@resource-id="ie.jemstone.ronspot:id/defaultZoneSp"]')
  }

  get changePasswordBtnEditProfilePage() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/changePasswordBtn"]')
  }


  get curruntPasswordLabeleditProfilePage() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/passwordTxt"]')
  }

  get curruntPasswordInputeditProfilePage() {
    return $('//android.widget.EditText[@resource-id="ie.jemstone.ronspot:id/passwordEt"]')
  }

  get newPasswordLabeleditProfilePage() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/newPasswordTxt"]')
  }

  get newPasswordInputeditProfilePage() {
    return $('//android.widget.EditText[@resource-id="ie.jemstone.ronspot:id/newPasswordEt"]')
  }

  get confirmPasswordLabeleditProfilePage() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/confirmPasswordTxt"]')
  }

  get confirmPasswordInputeditProfilePage() {
    return $('//android.widget.EditText[@resource-id="ie.jemstone.ronspot:id/confirmPasswordEt"]')
  }


  get forgotPasswordLinkeditProfilePage() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/forgotPasswordBtn"]')
  }

  get backBtnEditProfilePage() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/backBtn"]')
  }

  get saveBtnEditProfilePage() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/saveBtn"]')
  }

  get addVehicleBtnEditProfilePage() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/addVehicleBtn"]')
  }

  get changePasswordPopupHeaderEditProfilePage() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/headerTv"]')
  }

  get languageDropdownsOptionsEditProfile() {
    return 'android.widget.TextView';
  }

  get selectedDropdownsOptionsEditProfile() {
    return $('//android.widget.ImageView[@content-desc="RONSPOT"]')
  }

  get saveButtonVehicleOptionsEditProfile() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/updateVehicleInfoBtn"]')
  }

  get deleteButtonVehicleOptionsEditProfile() {
    return $$('//android.widget.ImageButton[@resource-id="ie.jemstone.ronspot:id/deleteVehicleIv"]')
  }

  get editButtonVehicleOptionsEditProfile() {
    return $('(//android.widget.ImageButton[@resource-id="ie.jemstone.ronspot:id/editVehicleIv"])[1]')
  }

  get MaxVehiclePopUpEditProfile() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/bodyTxt"]')
  }

  get confirmButtonMaxVehiclePopUpEditProfile() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/confirmBtn"]')
  }

  get deleteButtonVehiclePopOptionsEditProfile() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/deleteVehicleBtn"]')
  }

  get toastPopUpMessage() {
    return $('//android.widget.Toast')
  }

  get deleteAccountLink() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/deleteAccountBtn"]')
  }

  get withoutAccountGmailButton() {
    return $('//android.widget.Button[@resource-id="com.android.chrome:id/signin_fre_dismiss_button"]')
  }

  get skipAccountGmailButton() {
    return $('//android.widget.Button[@text="Skip"]')
  }

  get nextGmailButton() {
    return $('//android.widget.Button[@text="Next"]')
  }

  get PasswordGmailInbox() {
    return $('//android.widget.EditText')
  }

  get continueWithMicrosoftButton() {
    return $('//android.widget.TextView[@text="Continue with Microsoft"]')
  }

  get passwordMicrosoftInput() {
    return $('//android.widget.EditText')
  }

  get signInMicrosoftbutton() {
    return $('//android.widget.Button[@text="Sign in"]')
  }

  get homeMenuButton() {
    return $('//android.widget.TextView[@text="Home"]')
  }

  get oktaUsernameInput() {
    return $('(//android.view.View/android.widget.EditText)[1]')
  }

  get oktaPasswordInput() {
    return $('(//android.view.View/android.widget.EditText)[2]')
  }

   get oktaSigninButton() {
    return $('//android.widget.Button[@text="Sign In"]')
  }
  get notificationCheckIn() {
    return $('(//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/titleTxt"])[1]');
  }
  get notificationCheckInDetailTxt(){
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/detailTxt"]');
  }
  get clearAllNotification() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/clearAllTxt"]');
  }

  //Home Page
  get logoHomeScreen() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/noRecordsIv"]');
  }
  get logoRonspotName() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/companyIv"]');
  }
  get iconCreditHome() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/creditBtn"]');
  }
  get iconProfileHomeCredit() {
    return $('//android.view.ViewGroup[@resource-id="ie.jemstone.ronspot:id/userBackgroundCl"]');
  }
  get txtUserNameCredit() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/nameTxt"]');
  }
  get txtCreditRemaining() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/creditBalanceTxt"]');
  }
  get numberCredit() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/creditCountTxt"]')
  }
  get txtCreditsReset() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/creditResetInfoTxt"]');
  }
  get txtCreditsRequired() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/useCreditsTxt"]');
  }
  get txtNoCreditsRequired() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/noCreditsNeededTxt"]');
  }
  get txtCreditsBack() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/releaseRefundTxt"]');
  }
  get iconInfo() {
    return $('//android.widget.ImageButton[@resource-id="ie.jemstone.ronspot:id/infoBtn"]');
  }
  get txtHeaderInfo() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/headerTxt"]');
  }
  get txtFullBodyText() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/body1Txt"]');
  }
  get txtFullBodyText2() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/body2Txt"]');
  }
  get txtFullBodyText3() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/body3Txt"]');
  }
  get txtFullBodyText4() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/body4Txt"]');
  }
  get imageBackground() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/backgroundIv"]');
  }
  get iconProgressBar() {
    return $('//android.widget.ProgressBar[@resource-id="ie.jemstone.ronspot:id/progressBar"]');
  }
  get iconButtonNextInfo() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/nextBtn"]');
  }
  get btnPreviousStep() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/previousStepBtn"]');
  }
  get iconCross() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/close_iv"]');
  }
  get btnVisitHelpCenter() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/helpCentreBtn"]');
  }
  get txtTitleHelpCenter() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/moduleNameTxt"]');
  }
  get iconButtonBack() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/moduleBackBtn"]');
  }
  get btnContactSupport() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/contactSupportBtn"]');
  }
  get iconInviteInfoButton() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/inviteInfoBtn"]');
  }
  get btnMyInvitation() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/invitationTv"]');
  }
  get btnUserName() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/nameTv"]');
  }
  get iconNotification() {
    return $('//android.widget.ImageButton[@resource-id="ie.jemstone.ronspot:id/unReadNotificationBtn"]');
  }
  get todaysBookingCardViewHome() {
    return $$('//androidx.recyclerview.widget.RecyclerView[@resource-id="ie.jemstone.ronspot:id/currentBookingRv"]//child::androidx.cardview.widget.CardView');
  }
  get bookingCountOnHeader() {
    return $('//android.widget.TextView[contains(@text, "bookings today")]');
  }
  get txtUpcomingBooking() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/upcomingHeaderTxt"]');
  }
  get upComingBookingsCardViewHome() {
    return $$('//androidx.recyclerview.widget.RecyclerView[@resource-id="ie.jemstone.ronspot:id/upcomingBookingRv"]//child::androidx.cardview.widget.CardView');
  }
  get txtZoneTodaysBooking() {
    return $('(//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/bookingTitleTxt"])[1]');
  }
  get txtZone2TodaysBooking() {
    return $('(//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/bookingTitleTxt"])[2]');
  }
  get txtSpotTodaysBooking() {
    return $('(//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/spotNameTxt"])[1]');
  }
  get txtSpot2TodaysBooking() {
    return $('(//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/spotNameTxt"])[2]');
  }
  get bookingSpotTime() {
    return $('(//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/dateTimeTxt"])[1]');
  }
  get bookingSpotTime2() {
    return $('(//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/dateTimeTxt"])[2]');
  } 
  get zoneSpotAndTime() {
    return $$('//androidx.recyclerview.widget.RecyclerView[@resource-id="ie.jemstone.ronspot:id/currentBookingRv"]//child::android.widget.TextView');
  }
  get upComingZoneSpotAndTime() {
    return $$('//androidx.recyclerview.widget.RecyclerView[@resource-id="ie.jemstone.ronspot:id/upcomingBookingRv"]//child::android.widget.TextView');
  }
  get iconOptionButtonTodaysBooking() {
    return $('(//androidx.recyclerview.widget.RecyclerView[@resource-id="ie.jemstone.ronspot:id/currentBookingRv"]//child::android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/optionIv"])[1]');
  }
  get iconOptionButtonTodaysBooking2() {
    return $('(//androidx.recyclerview.widget.RecyclerView[@resource-id="ie.jemstone.ronspot:id/currentBookingRv"]//child::android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/optionIv"])[2]');
  }
  get btnSpaceTaken() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/spaceTakenBtn"]');
  }
  get spaceTakenHeaderText() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/vehiclePlateNoTxt"]');
  }
  get spaceTaken_BodyText1() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/vehicleOffenderInfoTxt"]');
  }
  get textBoxHeader() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/PlateNumberTxt"]');
  }
  get textBoxInput() {
    return $('//android.widget.EditText[@resource-id="ie.jemstone.ronspot:id/licencePlateEt"]');
  }
  get spaceTaken_BodyText2() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/vehicleOffenderInfo2Txt"]');
  }
  get textboxValidationMsg() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/textinput_error"]');
  }
  get btnNextInSpaceTaken() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/reportBtn"]');
  }
  get violationReportHeaderText() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/titleTxt"]');
  }
  get iconUserViolationReport() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/personIv"]');
  }
  get txtNumberPlate() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/plateNumberTxt"]')
  }
  get txtParkingInfo1() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/parkingInfo1Txt"]');
  }
  get imageParkingViolation() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/parkingSpotIv"]')
  }
  get txtParkingInfo2() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/parkingInfo2Txt"]');
  }
  get txtAlternative_Parking_Spot() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/parkingSpotTxt"]');
  }
  get btnYesTakeThisSpace() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/confirmBtn"]');
  }
  get btnConfirmNoSpotAvailable() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/confirmBtn"]');
  }
  get btnGoToMap() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/goToMapBtn"]');
  }
  get imageMapLayout() {
    return $('//android.widget.FrameLayout[@resource-id="ie.jemstone.ronspot:id/canvasFl"]');
  }
  get btnCancelBookingHome() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/releaseBooking"]');
  }
  get txtParkingMap() {
    return $('(//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/dateTimeTxt"])[1]//preceding-sibling::android.widget.TextView[@text = "Parking Map"]');
  }
  get txtUpComingParkingAllDay() {
    return $('//androidx.recyclerview.widget.RecyclerView[@resource-id="ie.jemstone.ronspot:id/upcomingBookingRv"]//child::android.widget.TextView[@text="Parking_All_Day"]');
  }
  get txtZoneUpComingBookings() {
    return $('(//androidx.recyclerview.widget.RecyclerView[@resource-id="ie.jemstone.ronspot:id/upcomingBookingRv"]//child::android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/bookingTitleTxt"])[1]');
  }
  get txtZone2UpComingBookings() {
    return $('(//androidx.recyclerview.widget.RecyclerView[@resource-id="ie.jemstone.ronspot:id/upcomingBookingRv"]//child::android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/bookingTitleTxt"])[2]');
  }
  get txtSpotUpComingBookings() {
    return $('(//androidx.recyclerview.widget.RecyclerView[@resource-id="ie.jemstone.ronspot:id/upcomingBookingRv"]//child::android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/spotNameTxt"])[1]')
  }
  get txtSpot2UpComingBookings() {
    return $('(//androidx.recyclerview.widget.RecyclerView[@resource-id="ie.jemstone.ronspot:id/upcomingBookingRv"]//child::android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/spotNameTxt"])[1]')
  }
  get upComingBookingSpotTime() {
    return $('(//androidx.recyclerview.widget.RecyclerView[@resource-id="ie.jemstone.ronspot:id/upcomingBookingRv"]//child::android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/dateTimeTxt"])[1]');
  }
  get upComingBookingSpotTime2() {
    return $('(//androidx.recyclerview.widget.RecyclerView[@resource-id="ie.jemstone.ronspot:id/upcomingBookingRv"]//child::android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/dateTimeTxt"])[2]');
  }
  get iconOptionButtonUpComingBookings(){
    return $('(//androidx.recyclerview.widget.RecyclerView[@resource-id="ie.jemstone.ronspot:id/upcomingBookingRv"]//child::android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/optionIv"])[1]');
  }
  get iconOptionButtonUpComingBookings2(){
    return $('(//androidx.recyclerview.widget.RecyclerView[@resource-id="ie.jemstone.ronspot:id/upcomingBookingRv"]//child::android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/optionIv"])[2]');
  }
  get btn_Visit_Help_Center() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/helpCentreBtn"]');
  }
  get title_Help_Center() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/moduleNameTxt"]');
  }
  get btn_Contact_Support() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/contactSupportBtn"]');
  }

  //Create New Booking, QR Scanner and Find Colleagues
  get btn_Icon_Plus() {
    return $('//android.widget.ImageButton[@resource-id="ie.jemstone.ronspot:id/fab"]');
  }
  get btnFindColleagues() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/searchBtn"]');
  }
  get btnCreateNewBooking() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/createNewBookingBtn"]');
  }
  get btnScanQRcode() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/qrScanBtn"]');
  }
  get txtNewBooking() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/moduleNameTxt"]');
  }
  get iconSteps() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/stepperIv"]');
  }
  get btnParking() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/parkingBtn"]');
  }
  get btnIconBackFromNewBooking() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/moduleBackBtn"]');
  }
  get LabelZoneDropdown() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/zoneTxt"]');
  }
  get zoneDropdownFromNewBooking() {
    return $('//android.widget.Spinner[@resource-id="ie.jemstone.ronspot:id/zoneSpinner"]');
  }
  get LabelDate() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/dateTxt"]');
  }
  get dateContainer() {
    return $('//android.widget.LinearLayout[@resource-id="ie.jemstone.ronspot:id/dateContainer"]');
  }
  get btnCancelDatePicker() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/mdtp_cancel"]');
  }
  get LabelType() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/typeTxt"]');
  }
  get typeAllDay() {
    return $('//android.widget.RadioButton[@resource-id="ie.jemstone.ronspot:id/dailyRb"]');
  }
  get typeHourly() {
    return $('//android.widget.RadioButton[@resource-id="ie.jemstone.ronspot:id/hourlyRb"]');
  }
  get labelVehicle() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/vehicleTxt"]');
  }
  get selectCarDropdownFromNewBooking() {
    return $('//android.widget.Spinner[@resource-id="ie.jemstone.ronspot:id/vehicleSpinner"]');
  }
  get vehicleErrorIcon() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/vehicleErrorIv"]');
  }
  get vehicleErrorMsg() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/vehicleErrorTxt"]');
  }
  get labelTags() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/tagsTxt"]');
  }
  get txtTags() {
    return $$('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/chipTxt"]');
  }
  get btnNextFromNewBooking() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/nextBtn"]');
  }
  get btnCancelFromNewBooking() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/cancelBtn"]');
  }
  get titleNewBookingStep2() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/moduleNameTxt"]');
  }
  get labelSpaceDropdown() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/spotTxt"]');
  }
  get spaceDropdownFromNewBooking() {
    return $('//android.widget.Spinner[@resource-id="ie.jemstone.ronspot:id/spotSpinner"]');
  }
  get spaceDropdownPlaceholder() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/tv_name"]');
  }
  get popupNoSpaceAvailable() {
    return $('//android.view.ViewGroup[@resource-id="ie.jemstone.ronspot:id/detailCl"]');
  }
  get popupTitle() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/titleTxt"]');
  }
  get popupBodyMessage() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/bodyTxt"]');
  }
  get btnOkFromNoSpacePopup() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/confirmBtn"]');
  }
  get imageNoSpaceAvailable() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/failurePlaceHolderIv"]');
  }
  get textNoSpace() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/noSpaceText"]');
  }
  get textDiscriptionNoSpace() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/descriptionText"]');
  }
  get btnBackNewBooking() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/cancelBtn"]');
  }
  get titleNewBookingStep3() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/moduleNameTxt"]');
  }
  get bookingConfirmedMessage() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/bookingApprovalTxt"]');
  }
  get btnNewBookingFromConfirmation() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/nextBtn"]');
  }
  get userNameNewBookingFlow() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/nameTxt"]');
  }
  get dateNewBookingFlow() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/dateTxt"]');
  }
  get textZoneNewBookingFlow() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/zoneNameTxt"]');
  }
  get textSpotNameNewBookingFlow() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/spotNameTxt"]');
  }
  get imageBookingConfirmed() {
    const locator1 = $('(//android.widget.ImageView[@content-desc="RONSPOT"])[4]');
    const locator2 = $('(//android.widget.ImageView[@content-desc="Ronspot"])[4]');
    return locator1.isExisting().then(exists => exists ? locator1 : locator2);
  }
  get bookedSpotOnHome() {
    const locator1 = $('(//androidx.cardview.widget.CardView[@resource-id="ie.jemstone.ronspot:id/todayViewCv"])[1]');
    const locator2 = $('(//androidx.cardview.widget.CardView)[1]');
    return locator1.isExisting().then(exists => exists ? locator1 : locator2);
  }
  get popupCreditLimitMessage() {
    return $('//android.view.ViewGroup[@resource-id="ie.jemstone.ronspot:id/detailCl"]');
  }
  get popupTitleCreditLimit() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/titleTxt"]');
  }
  get popupBodyMessageCreditLimit() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/bodyTxt"]');
  }
  get btnConfirmFromCreditLimitPopup() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/confirmBtn"]');
  }
  get labelSelectTime() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/timeTxt"]');
  }
  get labelFromTime() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/fromTxt"]');
  }
  get labelToTime() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/toTxt"]');
  }
  get iconGreaterThanFromTime() {
    return $('//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/rightArrowIv"]');
  }
  get timeFromContainer() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/fromTimeTxt"]');
  }
  get timeToContainer() {
    return $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/toTimeTxt"]');
  }
  get timeSlot() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/timeSlotChip"]');
  }
  get timeSlotSecondStep() {
    return $('//android.widget.GridView[@resource-id="ie.jemstone.ronspot:id/timeSlotRv"]');
  }
  get allTimeSlots() {
    return $$('//android.widget.CheckBox[@resource-id="ie.jemstone.ronspot:id/timeSlotCheckBox"]');
  }
  get btnDesk() {
    return $('//android.widget.Button[@resource-id="ie.jemstone.ronspot:id/deskBtn"]');
  }
}

export default new AndroidLocatorPage();
