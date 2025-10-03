import Actions from '../../ActionWaitMob';
import Locatore from './LocatorePage';
import ReusableMobilePage from '../../../Pages/ReusableMobilePage';
import MobileData from '../../../test-data/JSON/MobileTestData.json'
import { expect } from 'chai';
import ElementsName from "../../../test-data/JSON//Elements_Name.json";


class ProfilePage {
    actionClass: Actions;
    reusableMobilePage: ReusableMobilePage;

    constructor() {
        this.actionClass = new Actions();
        this.reusableMobilePage = new ReusableMobilePage();
    }

    async navigateToProfile() {
        console.log("\nClicking on 'Profile' icon...");
        await this.actionClass.waitForElementAndClick(await Locatore.profileIcon);
        console.log("Profile Page opened successfully.");
    }
    async navigateToHome() {
        console.log("\nClicking on 'Home' icon...");
        await this.actionClass.waitForElementAndClick(await Locatore.homeMenuButton);
        console.log("Home Page opened successfully.");
    }

    async verifyProfilePage() {
        console.log("\nVerifying Profile Image Icon is Display");
        await this.actionClass.isElementDisplayed(await Locatore.profileImage, MobileData.Profile_Screen.User_Profile_image_icon);

        console.log("\nVerifying User Name is Display");
        await this.actionClass.isElementDisplayed(await Locatore.userName, MobileData.Profile_Screen.User_Name);
        const userNameText = await (await Locatore.userName).getText();
        console.log(`User Name: ${userNameText}`);

        console.log("\nVerifying User Email is Display");
        await this.actionClass.isElementDisplayed(await Locatore.userEmail, MobileData.Profile_Screen.User_Email);
        const userEmailText = await (await Locatore.userEmail).getText();
        console.log(`User Email: ${userEmailText}`);

        console.log("\nVerifying Star Icon is Display");
        await this.actionClass.isElementDisplayed(await Locatore.starIcon, MobileData.Profile_Screen.Star_icon);

        console.log("\nVerifying Credit Count is Display");
        await this.actionClass.isElementDisplayed(await Locatore.creditCount, MobileData.Profile_Screen.creditCount);
        const creditCountText = await (await Locatore.creditCount).getText();
        console.log(`Credit Count: ${creditCountText}`);

        console.log("\nVerifying Credit Text is Display");
        await this.actionClass.isElementDisplayed(await Locatore.creditText, MobileData.Profile_Screen.creditCountLabel);
        const creditText = await (await Locatore.creditText).getText();
        console.log(`Credit Text: ${creditText}`);

        console.log("\nVerifying Credit Refill Icon is Display");
        await this.actionClass.isElementDisplayed(await Locatore.creditRefillIcon, MobileData.Profile_Screen.creditrefillicon);

        console.log("\nVerifying Refill Days Count is Display");
        await this.actionClass.isElementDisplayed(await Locatore.refillDaysCount, MobileData.Profile_Screen.creditrefillCount);
        const refillDaysCountText = await (await Locatore.refillDaysCount).getText();
        console.log(`Refill Days Count: ${refillDaysCountText}`);

        console.log("\nVerifying Refill Days Text is Display");
        await this.actionClass.isElementDisplayed(await Locatore.refillDaysText, MobileData.Profile_Screen.creditrefillLabel);
        const refillDaysText = await (await Locatore.refillDaysText).getText();
        console.log(`Refill Days Text: ${refillDaysText}`);

        console.log("\nVerifying Sync with Calendar Text is Display");
        await this.actionClass.isElementDisplayed(await Locatore.syncWithCalendarText, MobileData.Profile_Screen.sync_with_calendar_Label);
        const syncWithCalendarText = await (await Locatore.syncWithCalendarText).getText();
        console.log(`Sync with Calendar Text: ${syncWithCalendarText}`);

        console.log("\nVerifying Sync Toggle Button is Display");
        await this.actionClass.isElementDisplayed(await Locatore.syncToggleButton, MobileData.Profile_Screen.sync_with_calendar_toggel_btn);

        console.log("\nVerifying Sync Toggle Button is ON or OFF");
        const isSyncToggleOn = await (await Locatore.syncToggleButton).getAttribute('checked');
        if (isSyncToggleOn === 'true') {
            console.log("🟢 Sync Toggle Button is ON");
        }
        else if (isSyncToggleOn === 'false') {
            console.log("⛔  Sync Toggle Button is OFF");
        } else {
            console.error("❌ Sync Toggle Button state is unknown");
        }


        console.log("\nVerifying Allow Check In with Wifi Text is Display");
        await this.actionClass.isElementDisplayed(await Locatore.allowCheckInWithWifiText, MobileData.Profile_Screen.Allow_checkin_Label);
        const allowCheckInWithWifiText = await (await Locatore.allowCheckInWithWifiText).getText();
        console.log(`Allow Check In with Wifi Text: ${allowCheckInWithWifiText}`);

        console.log("\nVerifying Wifi Toggle Button is Display");
        await this.actionClass.isElementDisplayed(await Locatore.wifiToggleButton, MobileData.Profile_Screen.Allow_checkin_toggel_btn);
        console.log("\nVerifying Wifi Toggle Button is ON or OFF");
        const isWifiToggleOn = await (await Locatore.wifiToggleButton).getAttribute('checked');
        if (isWifiToggleOn === 'true') {
            console.log("🟢 Wifi Toggle Button is ON");
        }
        else if (isWifiToggleOn === 'false') {
            console.log("⛔  Wifi Toggle Button is OFF");
        }
        else {
            console.error("❌ Wifi Toggle Button state is unknown");
        }
    }
    async verifyingProfileScreenNavigations() {
        await this.verifyEditProfileSection();
        await this.actionClass.waitForElementAndClick(await Locatore.backButton);
        await this.verifyNotificationSection();
        await this.actionClass.waitForElementAndClick(await Locatore.backButton);
        await this.verifyPrivacyPolicySection();
        await this.actionClass.waitForElementAndClick(await Locatore.backButton);
        await this.verifySupportSection();
        await this.actionClass.waitForElementAndClick(await Locatore.backButton);
        await this.verifyHealthAndSafetySection();
        await this.actionClass.waitForElementAndClick(await Locatore.backButton);
        await this.logoutSection();


    }
    async verifyNotificationSection() {
        console.log("\nVerifying", MobileData.Profile_Screen.Notifications_menu, "Menu Text is Display");
        await this.actionClass.isElementDisplayed(await Locatore.notificationMenuText, MobileData.Profile_Screen.Notifications_menu);
        const notificationMenuText = await (await Locatore.notificationMenuText).getText();
        console.log(`Menu Text: ${notificationMenuText}`);
        console.log("\nNavigating to", notificationMenuText, "Page...");
        await this.actionClass.waitForElementAndClick(await Locatore.notificationMenuText);
        await this.actionClass.isElementDisplayed(await Locatore.notificationPageTitle, MobileData.Screen_Title.Notifications);
        const notificationPageTitleText = await (await Locatore.notificationPageTitle).getText();
        console.log(`Verifying Title: ${notificationPageTitleText}`);
        await this.actionClass.assertElementTextEquals(notificationPageTitleText, MobileData.Screen_Title.Notifications)
    }
    async verifyEditProfileSection() {
        console.log("\nClicking on ", MobileData.Screen_Title.Edit_profile, "button...");
        const editProfileMenuText = await (await Locatore.editProfile).getText();
        console.log(`Menu Text: ${editProfileMenuText}`);
        console.log("\nNavigating to", editProfileMenuText, " Page...");
        await this.actionClass.waitForElementAndClick(await Locatore.editProfile);
        await this.actionClass.isElementDisplayed(await Locatore.editProfilePageTitle, MobileData.Screen_Title.Edit_profile);
        const editProfilePageTitleText = await (await Locatore.editProfilePageTitle).getText();
        console.log(`Verifying Title: ${editProfilePageTitleText}`);
        await this.actionClass.assertElementTextEquals(editProfilePageTitleText, MobileData.Screen_Title.Edit_profile)

    }

    async verifyPrivacyPolicySection() {
        console.log("\nVerifying ", MobileData.Profile_Screen.Privacy_policy_Menu, " Menu Text is Display");
        await this.actionClass.isElementDisplayed(await Locatore.privacyPolicyMenuText, MobileData.Profile_Screen.Privacy_policy_Menu);
        const privacyMenuText = await (await Locatore.privacyPolicyMenuText).getText();
        console.log(`Menu Text: ${privacyMenuText}`);
        console.log("\nNavigating to ", privacyMenuText, " Page...");
        await this.actionClass.waitForElementAndClick(await Locatore.privacyPolicyMenuText);
        await this.actionClass.isElementDisplayed(await Locatore.privacyPolicyPageTitle, MobileData.Screen_Title.Privacy_policy);
        const privacyPageTitleText = await (await Locatore.privacyPolicyPageTitle).getText();
        console.log(`Verifying Title: ${privacyPageTitleText}`);
        await this.actionClass.assertElementTextEquals(privacyPageTitleText, MobileData.Screen_Title.Privacy_policy)
    }

    async verifySupportSection() {

        console.log("\nVerifying", MobileData.Profile_Screen.Support_menu, " Menu Text is Display");
        await this.actionClass.isElementDisplayed(await Locatore.supportMenuText, MobileData.Profile_Screen.Support_menu);
        const supportMenuText = await (await Locatore.supportMenuText).getText();
        console.log(`Menu Text: ${supportMenuText}`);
        console.log("\nNavigating to", MobileData.Screen_Title.Support, "Page...");
        await this.actionClass.waitForElementAndClick(await Locatore.supportMenuText);
        await this.actionClass.isElementDisplayed(await Locatore.supportPageTitle, MobileData.Screen_Title.Support);
        const supportPageTitleText = await (await Locatore.supportPageTitle).getText();
        console.log(`Verifying Title: ${supportPageTitleText}`);
        await this.actionClass.assertElementTextEquals(supportPageTitleText, MobileData.Screen_Title.Support)
    }

    async verifyHealthAndSafetySection() {
        console.log("\nVerifying ", MobileData.Profile_Screen.Health_Safety_menu, " Menu Text is Display");
        await this.actionClass.isElementDisplayed(await Locatore.healthAndSafetyMenuText, MobileData.Profile_Screen.Health_Safety_menu);
        const healthAndSafetyMenuText = await (await Locatore.healthAndSafetyMenuText).getText();
        console.log(`Menu Text: ${healthAndSafetyMenuText}`);

        console.log("\nNavigating to", MobileData.Profile_Screen.Health_Safety_menu, "Page...");
        await this.actionClass.waitForElementAndClick(await Locatore.healthAndSafetyMenuText);
        await this.actionClass.isElementDisplayed(await Locatore.healthAndSafetyPageTitle, MobileData.Screen_Title.Health_Safety);
        const healthAndSafetyPageTitleText = await (await Locatore.healthAndSafetyPageTitle).getText();
        console.log(`Verifying Title: ${healthAndSafetyPageTitleText}`);
        await this.actionClass.assertElementTextEquals(healthAndSafetyPageTitleText, MobileData.Screen_Title.Health_Safety)
    }

    async logoutSection() {

        console.log("\nVerifying Logout Menu Text is Display");
        await this.actionClass.simpleScrollAndroid('up');
        console.log("Scrolling completed.");
        await this.actionClass.isElementDisplayed(await Locatore.logoutMenuText, MobileData.Profile_Screen.Log_out_btn);
        const logoutMenuText = await (await Locatore.logoutMenuText).getText();
        console.log(`Logout Menu Text: ${logoutMenuText}`);

        console.log("\nNavigating to Logout Confirmation Popup...");
        await this.actionClass.waitForElementAndClick(await Locatore.logoutMenuText);
        await this.actionClass.isElementDisplayed(await Locatore.popupLogoutText, MobileData.Profile_Screen.Log_out_Text);
        const popupLogoutText = await (await Locatore.popupLogoutText).getText();
        console.log(`Popup Logout Text: ${popupLogoutText}`);
        await this.actionClass.assertElementTextEquals(popupLogoutText, MobileData.Profile_Screen.Log_out_Text)

        console.log("\nVerifying Popup Logout Button is Display");
        await this.actionClass.isElementDisplayed(await Locatore.popupLogoutBtn, MobileData.Profile_Screen.Log_out_btn);
        await this.actionClass.waitForElementAndClick(await Locatore.popupCancelBtn);
    }

    async verifyEditProfilePage(email: string) {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("\nVerifying Edit Profile page Elements....");
        console.log("--------------------------------------------------------------------");
        await this.actionClass.isElementDisplayed(await Locatore.firstNameLabeleditProfilePage, MobileData.Edit_Profile_Screen.First_Name_Label);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.firstNameLabeleditProfilePage, MobileData.Edit_Profile_Screen.First_Name_Label);
        await this.actionClass.isElementDisplayed(await Locatore.firstNameInputEditProfilePage, MobileData.Edit_Profile_Screen.First_Name_Input);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.lastNameLabeleditProfilePage, MobileData.Edit_Profile_Screen.Last_Name_Label);
        await this.actionClass.isElementDisplayed(await Locatore.lastNameInputEditProfilePage, MobileData.Edit_Profile_Screen.Last_Name_Input);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.emailLabeleditProfilePage, MobileData.Edit_Profile_Screen.Email_Label);
        await this.actionClass.isElementDisplayed(await Locatore.emailInputEditProfilePage, MobileData.Edit_Profile_Screen.Email_Input);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.emailInputEditProfilePage, email);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.changePasswordBtnEditProfilePage, MobileData.Edit_Profile_Screen.Change_Password_btn);
        await this.actionClass.waitForElementAndClick(await Locatore.changePasswordBtnEditProfilePage);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.changePasswordPopupHeaderEditProfilePage, MobileData.Edit_Profile_Screen.Change_Password_btn);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.curruntPasswordLabeleditProfilePage, MobileData.Edit_Profile_Screen.Current_password_Label);
        await this.actionClass.isElementDisplayed(await Locatore.curruntPasswordInputeditProfilePage, MobileData.Edit_Profile_Screen.Current_password_Input);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.newPasswordLabeleditProfilePage, MobileData.Edit_Profile_Screen.New_Password_Label);
        await this.actionClass.isElementDisplayed(await Locatore.newPasswordInputeditProfilePage, MobileData.Edit_Profile_Screen.New_Password_Input);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.confirmPasswordLabeleditProfilePage, MobileData.Edit_Profile_Screen.Confirm_password_Label);
        await this.actionClass.isElementDisplayed(await Locatore.confirmPasswordInputeditProfilePage, MobileData.Edit_Profile_Screen.Confirm_password_Input);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.forgotPasswordLinkeditProfilePage, MobileData.Edit_Profile_Screen.Forgot_password_Link);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.saveBtnEditProfilePage, MobileData.Edit_Profile_Screen.Save_btn_text);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.backBtnEditProfilePage, MobileData.Edit_Profile_Screen.Back_btn_text);
        await this.actionClass.waitForElementAndClick(await Locatore.backBtnEditProfilePage);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.languageLabeleditProfilePage, MobileData.Edit_Profile_Screen.LanguageLabel);
        await this.actionClass.isElementDisplayed(await Locatore.languageDropdownEditProfilePage, MobileData.Edit_Profile_Screen.Language_DropDown);
        await this.reusableMobilePage.dropDownOptionPrintMobile(await Locatore.languageDropdownEditProfilePage, await Locatore.languageDropdownsOptionsEditProfile, MobileData.Edit_Profile_Screen.Language_DropDown);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.groupLabeleditProfilePage, MobileData.Edit_Profile_Screen.GroupLabel);
        await this.actionClass.isElementDisplayed(await Locatore.groupDropdownEditProfilePage, MobileData.Edit_Profile_Screen.Group_DropDown);
        await this.reusableMobilePage.dropDownOptionPrintMobile(await Locatore.groupDropdownEditProfilePage, await Locatore.languageDropdownsOptionsEditProfile, MobileData.Edit_Profile_Screen.Group_DropDown);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.defaultZoneLabeleditProfilePage, MobileData.Edit_Profile_Screen.Zone_default_Label);
        await this.actionClass.isElementDisplayed(await Locatore.defaultZoneDropdownEditProfilePage, MobileData.Edit_Profile_Screen.Zone_default_DropDown);
        await this.reusableMobilePage.dropDownOptionPrintMobile(await Locatore.defaultZoneDropdownEditProfilePage, await Locatore.languageDropdownsOptionsEditProfile, MobileData.Edit_Profile_Screen.Zone_default_DropDown);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.vehiclesLabeleditProfilePage, MobileData.Edit_Profile_Screen.Vehicles_Label);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.addVehicleBtnEditProfilePage, MobileData.Edit_Profile_Screen.Add_vehicle_btn);
        console.log("--------------------------------------------------------------------");

    }
    async checkingAndAddVehicle() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Checking and Add Vehicle Elements....");
        console.log("--------------------------------------------------------------------");
        await this.actionClass.scrollToTextAndroid('Delete my account');
        console.log("Scrolling completed.");
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.saveBtnEditProfilePage, MobileData.Edit_Profile_Screen.Save_btn_text);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.backBtnEditProfilePage, MobileData.Edit_Profile_Screen.Back_btn_text);
        await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.deleteAccountLink, MobileData.Edit_Profile_Screen.delete_account_Link);
        let vehicleCounts = await this.checkVehicles();
        console.log("Before Adding Vehchle counts:", vehicleCounts);
        console.log("Adding a new vehicle...")
        await this.actionClass.waitForElementAndClick(await Locatore.addVehicleBtnEditProfilePage);
        const carplateNumber = await this.reusableMobilePage.generateRandomNumber();
        await this.actionClass.clearAndSendKey(await Locatore.addVehicleNumber, carplateNumber);
        await this.reusableMobilePage.selectOptionFromDropdownMobile(await Locatore.select_Vehicle_Size, ElementsName.DropDowns.Vehicle_Size);
        await this.reusableMobilePage.selectOptionFromDropdownMobile(await Locatore.select_Vehicle_Fuel, ElementsName.DropDowns.Fuel_Type);
        await this.actionClass.waitForElementAndClick(await Locatore.saveButtonVehicleOptionsEditProfile);
        await browser.pause(3000);
        let vehicleCounts2 = await this.checkVehicles();
        console.log("After Adding Vehchle counts:", vehicleCounts2);
        if (vehicleCounts2 > vehicleCounts) {
            console.log("✅ Vehicle added successfully Total Vehicles are :", vehicleCounts2);
        } else {
            console.error("❌ Vehicle not added. Please check if the process failed.");
        }
        console.log("--------------------------------------------------------------------");
    }


    async checkVehicles(): Promise<number> {

        console.log("Checking for existing vehicles...");
        const vehicles = await Locatore.vehicles;
        const vehicleInputs = await Locatore.check_First_Vehicle;

        if (vehicles.length === 0) {
            console.log("❌ No vehicle found.");
            return 0;
        } else {
            await this.actionClass.waitForElementVisible(vehicles[0]);
            const vehicleCount = vehicles.length;
            const vehicleInputsCount = vehicleInputs.length;
            console.log("\n");
            console.log("**********************************");
            console.log(`Total Available Vehicles Found: ${vehicleCount}`);
            console.log("**********************************");
            for (let i = 0; i < vehicleInputsCount; i++) {
                const vehicleValue = await vehicleInputs[i].getAttribute('text') || '';
                console.log(`Vehicle ${i + 1}: "${vehicleValue}"`);
            }
            return vehicleCount;
        }

    }
    async checkVehiclesForEdit(): Promise<{ count: number; firstValue: string | null }> {
        await this.actionClass.scrollToTextAndroid('Delete my account');
        console.log("Scrolling completed.");
        await browser.pause(3000);
        console.log("Checking for existing vehicles...");

        const vehicles = await Locatore.vehicles;
        const vehicleInputs = await Locatore.check_First_Vehicle;

        if (vehicles.length === 0 || vehicleInputs.length === 0) {
            console.log("❌ No vehicle found.");
            return { count: 0, firstValue: null };
        } else {
            await this.actionClass.waitForElementVisible(vehicles[0]);
            const vehicleCount = vehicles.length;
            const firstVehicleValue = await vehicleInputs[0].getAttribute('text') || '';

            console.log("**********************************");
            console.log(`Total Available Vehicles Found: ${vehicleCount}`);
            console.log(`First Vehicle: "${firstVehicleValue}"`);
            console.log("**********************************");

            return { count: vehicleCount, firstValue: firstVehicleValue };
        }
    }


    async deleteAllVehicleWithPopup() {
        console.log("--------------------------------------------------------------------");
        console.log("Delete The Vehicle And Verifying the Minimum Vehicle Toast Message..");
        console.log("--------------------------------------------------------------------");
        await this.actionClass.scrollToTextAndroid('Delete my account');
        console.log("Scrolling completed.");
        while (true) {
            const deleteButtons = await Locatore.deleteButtonVehicleOptionsEditProfile;

            if (deleteButtons.length === 0) {
                console.log("✅ No more delete buttons found.");
                break;
            }

            const deleteBtn = deleteButtons[0];

            if (await deleteBtn.isDisplayed()) {
                console.log("🗑️ Clicking delete button...");
                await this.actionClass.waitForElementAndClick(deleteBtn);
                await browser.pause(500); // short pause for UI update

                const confirmBtn = await Locatore.deleteButtonVehiclePopOptionsEditProfile;
                const isConfirmDisplayed = await confirmBtn.isDisplayed().catch(() => false);

                if (isConfirmDisplayed) {
                    console.log("✅ Confirm button displayed. Clicking...");
                    await this.actionClass.waitForElementAndClick(confirmBtn);
                    await browser.pause(3000);


                } else {
                    console.log("ℹ️ Confirm button not shown. Waiting before checking for toast...");
                    try {
                        const toast = await Locatore.toastPopUpMessage;
                        const toastText = await toast.getText();
                        console.log("⚠️  Toast message:", toastText);
                        console.log("\n")
                        await this.actionClass.assertElementTextEquals(toastText, MobileData.PopUp_Messages.Delete_Vehicles_Msg)

                        if (toastText.includes("You must have at least one vehicle in your account")) {
                            console.warn("🚫 Stopping deletion: You must have at least one vehicle in your account.");
                            break;
                        } else {
                            console.warn("⚠️ Unknown toast. Stopping.");
                            break;
                        }
                    } catch (toastError) {
                        console.warn("⚠️ No confirm or toast appeared. Likely missed toast. Stopping.");
                        break;
                    }
                }
            } else {
                console.log("ℹ️ Delete button not visible. Exiting.");
                break;
            }
        }
        console.log("--------------------------------------------------------------------");
    }

    async editAndCheckingAndAddVehicle() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Edit and Checking Vehicle ....");
        console.log("--------------------------------------------------------------------");
        const BeforeResult = await this.checkVehiclesForEdit();
        const count = BeforeResult.count;
        console.log("Vehicle Count:", count);
        const BeforeEditfirstVehicleValue = BeforeResult.firstValue;
        console.log(`🚗 Vehicle Plate Number Before Edit: ${BeforeEditfirstVehicleValue}`);
        await this.actionClass.waitForElementAndClick(await Locatore.editButtonVehicleOptionsEditProfile);
        const carplateNumber = await this.reusableMobilePage.generateRandomNumber();
        await this.actionClass.clearAndSendKey(await Locatore.addVehicleNumber, carplateNumber);
        await this.actionClass.waitForElementAndClick(await Locatore.saveButtonVehicleOptionsEditProfile);
        const AfterResult = await this.checkVehiclesForEdit();
        const afterfirstVehicleValue = AfterResult.firstValue;
        console.log(`🚗 Vehicle Plate Number After Edit: ${afterfirstVehicleValue}`);
        console.log('\n')
        if (afterfirstVehicleValue !== BeforeEditfirstVehicleValue) {
            console.log("✅ Vehicle Plate Number Edit successfully:", afterfirstVehicleValue);
        } else {
            console.error("❌ Vehicle Plate Number Edit Not Edit. Please check if the process failed.");
        }
        console.log("--------------------------------------------------------------------");
    }


    async checkMaxAddVehiclePopupMobile() {
        console.log("\n--------------------------------------------------------------------");
        console.log("Checking if max vehicle popup appears after trying to add 11 vehicles...");
        console.log("--------------------------------------------------------------------");

        let vehicleCount = await this.checkVehicles();
        console.log(`Current vehicle count: ${vehicleCount}`);

        const remainingToAdd = 11 - vehicleCount;
        if (remainingToAdd <= 0) {
            console.log("❌ Already 10 or more vehicles present. Skipping test.");
            return;
        }

        for (let i = 0; i < remainingToAdd; i++) {
            console.log(`\n🚗 Add Attempt ${i + 1}: Trying to add a vehicle...`);
            await this.actionClass.waitForElementAndClick(await Locatore.addVehicleBtnEditProfilePage);

            const carplateNumber = await this.reusableMobilePage.generateRandomNumber();
            await this.actionClass.clearAndSendKey(await Locatore.addVehicleNumber, carplateNumber);

            await this.reusableMobilePage.selectOptionFromDropdownMobile(
                await Locatore.select_Vehicle_Size,
                ElementsName.DropDowns.Vehicle_Size
            );

            await this.reusableMobilePage.selectOptionFromDropdownMobile(
                await Locatore.select_Vehicle_Fuel,
                ElementsName.DropDowns.Fuel_Type
            );

            await this.actionClass.waitForElementAndClick(await Locatore.saveButtonVehicleOptionsEditProfile);

            await browser.pause(1000); // Wait for potential popup
        }

        console.log("\n🔍 Checking for 'Maximum vehicles reached' popup...");

        const popupElement = await Locatore.MaxVehiclePopUpEditProfile
        const isDisplayed = await popupElement.isDisplayed().catch(() => false);

        if (isDisplayed) {
            const popupText = await popupElement.getText();
            console.log(`✅ Popup appeared: "${popupText}"`);
            await this.actionClass.assertElementTextEquals(popupText, MobileData.PopUp_Messages.Max_Vehicles_Msg);
            await this.actionClass.waitForElementAndClick(await Locatore.confirmButtonMaxVehiclePopUpEditProfile);
            await this.actionClass.waitForElementAndClick(await Locatore.backBtnEditProfilePage);
            return popupText;
        } else {
            console.warn("❌ No popup appeared. Expected a warning after 10th vehicle.");
            await this.actionClass.waitForElementAndClick(await Locatore.backBtnEditProfilePage);
            return null;
        }
    }


    async verifyingDuplicateCarpalte() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log(" Verify Duplicate CarPlate Should Display Already Linked Error Message ....");
        console.log("--------------------------------------------------------------------");
        const BeforeResult = await this.checkVehiclesForEdit();
        const count = BeforeResult.count;
        console.log("Vehicle Count:", count);
        const BeforeEditfirstVehicleValue = BeforeResult.firstValue;
        console.log(`🚗 Vehicle Plate Number Before Edit: ${BeforeEditfirstVehicleValue}`);
        await this.actionClass.waitForElementAndClick(await Locatore.addVehicleBtnEditProfilePage);
        await this.actionClass.clearAndSendKey(await Locatore.addVehicleNumber, BeforeEditfirstVehicleValue ?? "");
        await this.actionClass.waitForElementAndClick(await Locatore.saveButtonVehicleOptionsEditProfile);
        console.log("\n🔍 Checking for 'Maximum vehicles reached' popup...");
        await browser.pause(3000);
        const popupElement = await Locatore.errorPopupText
        const isDisplayed = await popupElement.isDisplayed().catch(() => false);

        if (isDisplayed) {
            const popupText = await popupElement.getText();
            console.log(`✅ Popup appeared: "${popupText}"`);
            await this.actionClass.assertElementTextEquals(popupText, MobileData.PopUp_Messages.Duplicate_Vehicles_Msg);
            await this.actionClass.waitForElementAndClick(await Locatore.confirmButtonMaxVehiclePopUpEditProfile);
            return popupText;
        } else {
            console.warn("❌ No popup appeared. Expected a warning for Duplicate car Plate");
            return null;
        }
        console.log("--------------------------------------------------------------------");
    }

}
export default ProfilePage;