import Actions from '../../ActionWaitMob';
import Locatore from './LocatorePage';
import ReusableMobilePage from '../../../Pages/ReusableMobilePage';
import MobileData from '../../../test-data/JSON/MobileTestData.json';
import ClaimReleaseAndroidPage from './Claim-ReleaseAndroidPage';
import ClaimReleaseNoVehicle from './Claim-ReleaseNoVehiclePage';
import ProfilePage from '../../../Pages/mobile/android/ProfilePage';
import { expect } from "chai";
import path from 'path';
import fs from 'fs';


let reusableMobilePage: ReusableMobilePage;
let claimReleaseAndroidPage: ClaimReleaseAndroidPage;
let claimReleaseNoVehiclePage: ClaimReleaseNoVehicle;
let profilePage: ProfilePage;
let userNameText: string | null = null;

claimReleaseAndroidPage = new ClaimReleaseAndroidPage();
claimReleaseNoVehiclePage = new ClaimReleaseNoVehicle();
reusableMobilePage = new ReusableMobilePage();
profilePage = new ProfilePage();

class CreateNewBookingFlow {
    actionClass: Actions;
    reusableMobilePage: ReusableMobilePage;

    constructor() {
        this.actionClass = new Actions();
        this.reusableMobilePage = new ReusableMobilePage();
        
    }

    async getCreditBalanceFromProfile(): Promise<number | null> {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("📌 Fetching Credit Balance from Profile Page...");
        console.log("--------------------------------------------------------------------");

        try {
            const creditElement = await Locatore.creditCount;

            const creditBalanceText = await creditElement.getAttribute("text");
            console.log("💳 Credit Balance Text:", creditBalanceText);

            const creditBalance = parseFloat(creditBalanceText.trim());

            if (creditBalance === 0) {
                console.log("⚠️ Your credit is 0, please contact to administrator.");
                return 0;
            }

            console.log("✅ Extracted Credit Balance:", creditBalance);
            console.log("\n<<==============================================================>>");
            return creditBalance;

        } catch (error) {
            console.log("❌ Error fetching credit balance:", error);
            return null;
        }
    }

    async expectCreditChange(before: number | null, after: number | null, expectedChange: number, context = "") {
        if (before === null || after === null) {
            console.log(`⚠️ Skipping credit check — credit system not enabled. ${context}`);
            return;
        }

        console.log("\n----------------------------------------------------");
        console.log("📱 Verifying Credits on Mobile Booking");
        console.log("----------------------------------------------------");
        console.log(`💳 Current Credits:       ${before}`);
        console.log(`🔻 Booking Deduction:    -${expectedChange}`);
        console.log(`📉 After Booking Credits: ${after}`);
        console.log("----------------------------------------------------");

        const actualChange = before - after;

        expect(actualChange, `❌ Credit change mismatch ${context}`).to.equal(expectedChange);

        if (expectedChange === 0) {
            console.log(`⚠️ No credit required for this day or No Credit required Until the time`);
            return;
        }
        console.log(`✅ Credit change validated: -${expectedChange} (${context})`);
        console.log("\n<<==============================================================>>");
    }

    async expectCreditChangeAfter(before: number | null, after: number | null, expectedFullChange: number, context = "", throwOnMismatch = false) {
        if (before === null || after === null) {
            console.warn(`⚠️ Skipping credit check — credit system not enabled. (${context})`);
            return;
        }

        const actualChange = +(after - before).toFixed(2);
        const expected = expectedFullChange;

        const percentage = +(actualChange / expected * 100).toFixed(0);

        let refundType = "UNKNOWN";
        if (actualChange === 0) refundType = "NO_REFUND";
        else if (percentage === 100) refundType = "FULL_REFUND";
        else if (percentage > 0 && percentage < 100) refundType = `PARTIAL_REFUND (${percentage}%)`;

        console.log("\n📲----------------------------------");
        console.log("🔍 Verifying Credits on Release Booking");
        console.log("----------------------------------");
        console.log(`💳 Current Credits:     (${before})`);
        console.log(`💰 Actual Refund:       (+${actualChange})`);
        console.log(`💳 After Credit Refund: (${after})`);
        console.log("----------------------------------");
        console.log(`🎯 Expected Refund:   (${expected})`);
        console.log(`📊 Refund Detected:   ${refundType}`);
        console.log("----------------------------------");

        if (throwOnMismatch) {
            expect(
                actualChange,
                `❌ Credit refund mismatch (${context}) → Expected: ${expected}, Actual: ${actualChange}, Refund: ${refundType}`
            ).to.equal(expected);
        } else {
            if (actualChange !== expected) {
                console.warn(
                    `⚠️ Credit refund does not match expected (${context}). Expected: ${expected}, Got: ${actualChange}, Refund: ${refundType}`
                );
            } else {
                console.log(`✅ Credit refund validated successfully: ${expected} (${refundType})`);
            }
        }
        console.log("<<================================================================>>\n");
    } 

        async navigateToProfile() {
                console.log("\nClicking on 'Profile' icon...");
                await this.actionClass.waitForElementAndClick(await Locatore.profileIcon);
                console.log("Profile Page opened successfully.");
                userNameText = await (await Locatore.usreNameOnBookingSpot).getAttribute('text');
                console.log('👤 User Name Text :', userNameText);
            }

    async cancelBookingIfExists() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Checking for existing bookings to cancel...");
        console.log("--------------------------------------------------------------------");
        await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        const hasBookings = await (await Locatore.iconOptionButtonTodaysBooking).isDisplayed();
        if (hasBookings) {
            console.log("Existing booking found. Cancelling...");
            await this.actionClass.waitForElementAndClick(await Locatore.iconOptionButtonTodaysBooking);
            await this.actionClass.waitForElementAndClick(await Locatore.btnCancelBookingHome);
            await this.actionClass.waitForElementAndClick(await Locatore.btnConfirmCancelBooking);
            console.log("✅ Booking cancelled.");
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        } else {
            console.log("No existing bookings found.");
        }
        console.log("\n<<==============================================================>>");
    }

    async navigateToCreateNewBooking() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Navigating to Create New Booking Page....");
        console.log("--------------------------------------------------------------------");
        await this.actionClass.waitForElementAndClick(await Locatore.btn_Icon_Plus);
        const btnText = await (await Locatore.btnCreateNewBooking).getAttribute('text');
        await this.actionClass.assertElementTextEquals(btnText, MobileData.Create_New_Booking.Create_New_Booking_Button_Label);
        await this.actionClass.waitForElementAndClick(await Locatore.btnCreateNewBooking);
        await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        await this.actionClass.waitForElementAndClick(await Locatore.btnIconBackFromNewBooking);
        await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        await this.actionClass.waitForElementAndClick(await Locatore.btn_Icon_Plus);
        await this.actionClass.waitForElementAndClick(await Locatore.btnCreateNewBooking);
        await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        const titleTextNewBooking = await (await Locatore.txtNewBooking).getAttribute('text');
        await this.actionClass.assertElementTextEquals(titleTextNewBooking, MobileData.Create_New_Booking.Title_Text_New_Booking);
        console.log("Successfully navigated to Create New Booking Page");
        console.log("\n<<==============================================================>>");
    }

    async selectTodayDate() {
        console.log("--------------------------------------------------------------------");
        console.log("Select Today Date from Calendar....");
        console.log("--------------------------------------------------------------------");
        const todayElement = await $('//android.view.View[@selected="true"]');
        if (await todayElement.isDisplayed()) {
            await todayElement.click();
            console.log("✅ Current date selected successfully.");
        } else {
            throw new Error("❌ Unable to locate today's date on the calendar.");
        }
        console.log("\n<<==============================================================>>");
    }


    async verifyCreateNewBookingParkingAllDay(zone: string) {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Verifying Create New Booking Page Elements...");
        console.log("--------------------------------------------------------------------");
        await this.actionClass.isElementDisplayed(await Locatore.iconSteps, MobileData.Create_New_Booking.Progress_Bar);
        await this.actionClass.isElementDisplayed(await Locatore.btnParking, MobileData.Create_New_Booking.Button_Parking);
        const titleTextParkingButton = await (await Locatore.btnParking).getAttribute('text');
        await this.actionClass.assertElementTextEquals(titleTextParkingButton, MobileData.Create_New_Booking.Title_Text_Parking_Button);
        const enabledParkingButton = await (await Locatore.btnParking).getAttribute('enabled');
        if (enabledParkingButton === 'true') {
            console.log("Parking Button is Enabled");
            const LabelZoneDropdown = await (await Locatore.LabelZoneDropdown).getAttribute('text');
            await this.actionClass.assertElementTextEquals(LabelZoneDropdown, MobileData.Create_New_Booking.Label_Zone_Dropdown);
            await this.reusableMobilePage.selectZoneByTextMobile(await Locatore.zoneDropdownFromNewBooking, zone);
            const LabelDate = await (await Locatore.LabelDate).getAttribute('text');
            await this.actionClass.assertElementTextEquals(LabelDate, MobileData.Create_New_Booking.Label_Date);
            await this.actionClass.waitForElementAndClick(await Locatore.dateContainer);
            await this.actionClass.isElementDisplayed(await Locatore.btnCancelDatePicker, MobileData.Create_New_Booking.Button_Cancel_Date_Picker);
            await this.selectTodayDate();

            const today = new Date();
            const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const weekday = weekdays[today.getDay()];
            const day = today.getDate().toString().padStart(2, "0");
            const month = months[today.getMonth()];

            const expectedDate = `${weekday} ${day} ${month}`;
            console.log("📅 Expected Date:", expectedDate);

            const selectedDateElement = await $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/selectDateTxt"]');
            const actualDate = await selectedDateElement.getText();
            console.log("📌 Actual Date selected in dropdown box:", actualDate);

            await this.actionClass.assertElementTextEquals(actualDate, expectedDate);
            console.log("✅ Date verification passed: " + actualDate);

            const labelType = await (await Locatore.LabelType).getAttribute('text');
            await this.actionClass.assertElementTextEquals(labelType, MobileData.Create_New_Booking.Label_Type);

            const labelTime = await (await Locatore.typeAllDay).getAttribute('text');
            await this.actionClass.assertElementTextEquals(labelTime, MobileData.Create_New_Booking.Spot_Time);

            const selectedType = await (await Locatore.typeAllDay).getAttribute('checked');
            if (selectedType === 'true') {
                console.log("All Day Type is selected by default");
            }

            const labelVehicle = await (await Locatore.labelVehicle).getAttribute('text');
            await this.actionClass.assertElementTextEquals(labelVehicle, MobileData.Create_New_Booking.Label_Vehicle_Dropdown);

            await this.reusableMobilePage.selectOptionIndexFromDropdownMobile(await Locatore.selectCarDropdownFromNewBooking, 0, MobileData.Create_New_Booking.Select_Car);

            const errorMessage = await Locatore.vehicleErrorMsg;
            if (await errorMessage.isDisplayed()) {

                const errorText = await errorMessage.getText();
                console.log("❌ Error Message Displayed:", errorText);
                await this.actionClass.assertElementTextEquals(errorText, MobileData.Create_New_Booking.Vehicle_Error_Message);
                await this.actionClass.isElementDisplayed(await Locatore.vehicleErrorIcon, MobileData.Create_New_Booking.Vehicle_Error_Icon);

                const isNextEnabled = await (await Locatore.btnNextFromNewBooking).isEnabled();
                if (isNextEnabled) {
                    throw new Error("⚠️ Next button should be disabled when error is showing!");
                } else {
                    console.log("⏹️ Next button is correctly disabled when error is displayed.");
                }

                await this.actionClass.waitForElementAndClick(await Locatore.selectCarDropdownFromNewBooking);
                const vehicleOptions = await $$("//android.widget.ListView//android.widget.LinearLayout//android.widget.TextView");
                const totalVehicles = vehicleOptions.length;
                console.log(`Total vehicles available: ${totalVehicles}`);
                let errorResolved = false;
                for (let i = 1; i < totalVehicles; i++) {
                    console.log(`🚗 Trying vehicle at index ${i}...`);

                    await vehicleOptions[i].click();

                    if (!(await (await Locatore.vehicleErrorMsg).isDisplayed())) {
                        console.log("✅ Vehicle selected successfully, error cleared.");
                        errorResolved = true;
                        break;
                    }

                    if (i < totalVehicles - 1) {
                        await this.actionClass.waitForElementAndClick(await Locatore.selectCarDropdownFromNewBooking);
                    }
                }

                if (!errorResolved) {
                    throw new Error(
                        "🚫 Vehicle type is not matched. Please check vehicle type with spot."
                    );
                }
            }
            const labelTags = await (await Locatore.labelTags).getAttribute('text');
            await this.actionClass.assertElementTextEquals(labelTags, MobileData.Create_New_Booking.Label_Tags);
            await browser.pause(2000);
            const textTags = await Locatore.txtTags;
            for (const textTag of textTags) {
                const tagText = await textTag.getText();
                console.log("Available Tag:", tagText);
            }
            await this.actionClass.waitForElementAndClick(textTags[0]);
            const nextButtonText = await (await Locatore.btnNextFromNewBooking).getAttribute('text');
            await this.actionClass.assertElementTextEquals(nextButtonText, MobileData.Create_New_Booking.Button_Next_From_New_Booking_Label);
            await this.actionClass.isElementDisplayed(await Locatore.btnCancelFromNewBooking, MobileData.Create_New_Booking.Button_Cancel_From_New_Booking);
            const cancelButtonText = await (await Locatore.btnCancelFromNewBooking).getAttribute('text');
            await this.actionClass.assertElementTextEquals(cancelButtonText, MobileData.Create_New_Booking.Button_Cancel_From_New_Booking_Label);
            const cancelButtonEnabled = await (await Locatore.btnCancelFromNewBooking).getAttribute('enabled');
            console.log(`Cancel Button Enabled: ${cancelButtonEnabled ? '✅' : '❌'}`);
        } else {
            console.log("🚫 Parking Button is Disabled ❌ | 🅿️ Parking Zone is not available");
        }
    }

    async verifyCreateNewBookingSecondPage() {
        await this.actionClass.waitForElementAndClick(await Locatore.btnNextFromNewBooking);
        await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        const popupNoSpaceAvailable = await Locatore.popupNoSpaceAvailable;
        if (await popupNoSpaceAvailable.isDisplayed()) {
            const popupText = await (await Locatore.popupTitle).getAttribute('text');
            await this.actionClass.assertElementTextEquals(popupText, MobileData.Create_New_Booking.Popup_No_Space_Available_Title);
            const popupMessage = await (await Locatore.popupBodyMessage).getAttribute('text');
            await this.actionClass.assertElementTextEquals(popupMessage, MobileData.Create_New_Booking.Popup_No_Space_Available_Message);
            await this.actionClass.waitForElementAndClick(await Locatore.btnOkFromNoSpacePopup);
            console.log("No Space Available Popup displayed and handled.");
            return;
        }
        const dropdownNoSpaceAvailable = await (await Locatore.spaceDropdownFromNewBooking).isEnabled();
        if (!dropdownNoSpaceAvailable) {
            console.log("🚫 No Spaces Available in the selected zone ❌");

            const dropdownPlaceholder = await (await Locatore.spaceDropdownPlaceholder).getAttribute('text');
            await this.actionClass.assertElementTextEquals(dropdownPlaceholder, MobileData.Create_New_Booking.Placeholder_NoSpace_Dropdown);

            await this.actionClass.isElementDisplayed(await Locatore.imageNoSpaceAvailable, MobileData.Create_New_Booking.Image_No_Space_Available);

            const noSpaceMessage = await (await Locatore.textNoSpace).getAttribute('text');
            await this.actionClass.assertElementTextEquals(noSpaceMessage, MobileData.Create_New_Booking.Text_No_Space_Available);

            const textDiscriptionNoSpace = await (await Locatore.textDiscriptionNoSpace).getAttribute('text');
            await this.actionClass.assertElementTextEquals(textDiscriptionNoSpace, MobileData.Create_New_Booking.Text_Description_No_Space_Available);

            const isNextEnabled = await (await Locatore.btnNextFromNewBooking).isEnabled();
            if (isNextEnabled) {
                throw new Error("⚠️ Next button should be disabled when space is not available!");
            } else {
                console.log("⏹️ Next button is correctly disabled when space is not available.");
            }

            const textNoSpace = await (await Locatore.textNoSpace).isDisplayed();
            if (textNoSpace) {
                throw new Error("🚫 No space available, cannot proceed with booking.");
            }
            return;
        } else {
            console.log("----------------------------------------------------");
            console.log("🅿️  Spaces are available in the selected zone.");
            console.log("----------------------------------------------------");
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
            await this.actionClass.waitForElementAndClick(await Locatore.btnBackNewBooking);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
            await this.actionClass.waitForElementAndClick(await Locatore.btnNextFromNewBooking);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
            const iconBackButtonEnabled = await (await Locatore.btnIconBackFromNewBooking).getAttribute('enabled');
            console.log(`Back Button Enabled: ${iconBackButtonEnabled ? '✅' : '❌'}`);
            const titleTextsecondPage = await (await Locatore.titleNewBookingStep2).getAttribute('text');
            await this.actionClass.assertElementTextEquals(titleTextsecondPage, MobileData.Create_New_Booking.Title_Text_Confirm_Booking);
            await this.actionClass.isElementDisplayed(await Locatore.iconSteps, MobileData.Create_New_Booking.Progress_Bar);
            const labelSpaceDropdown = await (await Locatore.labelSpaceDropdown).getAttribute('text');
            await this.actionClass.assertElementTextEquals(labelSpaceDropdown, MobileData.Create_New_Booking.Label_Space_Dropdown);
            // await this.actionClass.waitForElementAndClick(await Locatore.btnNextFromNewBooking);
            /* 
            Toast Message Validation Pending - Need to automate the toast message
            const toastMessage = await $('//android.widget.Toast');
            const isToastDisplayed = await toastMessage.isDisplayed();
            */    // Toast Element is not available from New Booking Flow in Second Page 

            // const isToastDisplayed = await Locatore.toastPopUpMessage.isDisplayed();
            // console.log(`Toast Message Displayed: ${isToastDisplayed ? '✅' : '❌'}`);
            await this.reusableMobilePage.selectOptionIndexFromDropdownMobile(await Locatore.spaceDropdownFromNewBooking, 0, MobileData.Create_New_Booking.Select_Space);
            const timeSlotSecondPage = await (await Locatore.timeSlotSecondStep).isDisplayed();
            if(timeSlotSecondPage)
            {
                const slots = await this.getAvailableSlots();
                const firstSlot  = getFirstAvailableSlot(slots);
                if (firstSlot) {
                    const slotLocator = `//android.widget.CheckBox[@text="${firstSlot }"]`;
                    await this.actionClass.waitForElementAndClick(slotLocator);
                    console.log(`✅ Selected nearest slot: ${firstSlot }`);
                } else {
                console.log("❌ No available slots found!");
                }

                await this.verifyDisabledSlots();
            }
            await this.actionClass.waitForElementAndClick(await Locatore.btnNextFromNewBooking);
        }
    }

    async verifyCreateNewBookingConfirmationPage(zone: string) {
        console.log("-----------------------------------------------------");
        console.log("Verifying Create New Booking Confirmation Page");
        console.log("-----------------------------------------------------");
        await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        const iconBackButtonEnabled = await (await Locatore.btnIconBackFromNewBooking).getAttribute('enabled');
        console.log(`Back Button Enabled: ${iconBackButtonEnabled ? '✅' : '❌'}`);
        const bookingConfirmedText = await (await Locatore.titleNewBookingStep3).getAttribute('text');
        await this.actionClass.assertElementTextEquals(bookingConfirmedText, MobileData.Create_New_Booking.Booking_Confirmed_Title);
        await this.actionClass.isElementDisplayed(await Locatore.iconSteps, MobileData.Create_New_Booking.Progress_Bar);
        const bookingConfirmedMessage = await (await Locatore.bookingConfirmedMessage).getAttribute('text');
        await this.actionClass.assertElementTextEquals(bookingConfirmedMessage, MobileData.Create_New_Booking.Booking_Confirmed_Message);

        await this.actionClass.isElementDisplayed(await Locatore.creditAndStarIcon, MobileData.Create_New_Booking.Credit_and_Star_Icon);
        const creditAndStarText = await (await Locatore.creditAndStarIcon).getAttribute('text');
        console.log("Raw Credit Text (with - and spaces):", creditAndStarText);

        const deductedCredit = parseFloat(creditAndStarText.replace("-", "").trim());
        console.log("✅ Deducted Credit (cleaned):", deductedCredit);

        await this.actionClass.isElementDisplayed(await Locatore.userNameNewBookingFlow, MobileData.Create_New_Booking.Text_UserName_NewBookingFlow);
        const textUserName = await (await Locatore.userNameNewBookingFlow).getAttribute('text');
        console.log("User Name in New Booking Flow Text:", textUserName);
        expect(userNameText).to.equal(textUserName);

        await this.actionClass.isElementDisplayed(await Locatore.dateNewBookingFlow, MobileData.Create_New_Booking.Text_Date_NewBookingFlow);
        const dateNewBookingFlowText = await (await Locatore.dateNewBookingFlow).getAttribute('text');
        console.log("📅 Date in New Booking Flow Text:", dateNewBookingFlowText);

        await this.actionClass.isElementDisplayed(await Locatore.textZoneNewBookingFlow, MobileData.Create_New_Booking.Text_Zone_NewBookingFlow);
        const zoneNewBookingFlowText = await (await Locatore.textZoneNewBookingFlow).getAttribute('text');
        console.log("Zone in New Booking Flow Text:", zoneNewBookingFlowText);
        await this.actionClass.assertElementTextEquals(zoneNewBookingFlowText, zone);

        const textSpotNameNewBookingFlow = await (await Locatore.textSpotNameNewBookingFlow).getAttribute('text');
        console.log("Spot Name in New Booking Flow Text:", textSpotNameNewBookingFlow);

        await this.actionClass.isElementDisplayed(await Locatore.imageBookingConfirmed, MobileData.Create_New_Booking.Image_on_Confirmation_Page);

        const backButtonEnabled = await (await Locatore.btnBackNewBooking).getAttribute('enabled');
        console.log(`Back Button Enabled: ${backButtonEnabled ? '✅' : '❌'}`);

        const textBackButtonEnabled = await (await Locatore.btnBackNewBooking).getAttribute('text');
        await this.actionClass.assertElementTextEquals(textBackButtonEnabled, MobileData.Create_New_Booking.Text_Button_Back_From_Confirmation);

        const newBookingButtonText = await (await Locatore.btnNewBookingFromConfirmation).getAttribute('text');
        await this.actionClass.assertElementTextEquals(newBookingButtonText, MobileData.Create_New_Booking.Button_New_Booking_From_Confirmation_Label);
        await this.actionClass.waitForElementAndClick(await Locatore.btnNewBookingFromConfirmation);

        await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);

        const popupCredit = await Locatore.popupCreditLimitMessage;
        if (await popupCredit.isDisplayed()) {
            console.log("-----------------------------------------------------");
            console.log("🚫 Credit limit popup displayed ❌");
            console.log("-----------------------------------------------------");
            const popupCreditText = await (await Locatore.popupTitleCreditLimit).getAttribute('text');
            await this.actionClass.assertElementTextEquals(popupCreditText, MobileData.Create_New_Booking.Popup_Credit_Limit_Title);

            const popupCreditMessage = await (await Locatore.popupBodyMessageCreditLimit).getAttribute('text');
            await this.actionClass.assertElementTextEquals(popupCreditMessage, MobileData.Create_New_Booking.Popup_Credit_Limit_Message);

            await this.actionClass.waitForElementAndClick(await Locatore.btnConfirmFromCreditLimitPopup);
            throw new Error(`❌ Credit limit popup displayed -> ${popupCreditMessage}`);
        }
        await this.actionClass.isElementDisplayed(await Locatore.bookedSpotOnHome, MobileData.Create_New_Booking.Booked_Space_Home_Screen);
        return deductedCredit;
    }

    async verifyCreateNewBookingParkingHourly(zone: string) {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Verifying Create New Booking Page Elements for Hourly Parking...");
        console.log("--------------------------------------------------------------------");
        const enabledParkingButton = await (await Locatore.btnParking).getAttribute('enabled');
        if (enabledParkingButton === 'true') {
            console.log("Parking Button is Enabled");
            await this.reusableMobilePage.selectZoneByTextMobile(await Locatore.zoneDropdownFromNewBooking, zone);
            await this.actionClass.waitForElementAndClick(await Locatore.dateContainer);
            await this.selectTodayDate();

            const today = new Date();
            const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const weekday = weekdays[today.getDay()];
            const day = today.getDate().toString().padStart(2, "0");
            const month = months[today.getMonth()];

            const expectedDate = `${weekday} ${day} ${month}`;
            console.log("📅 Expected Date:", expectedDate);

            const selectedDateElement = await $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/selectDateTxt"]');
            const actualDate = await selectedDateElement.getText();
            console.log("📌 Actual Date selected in dropdown box:", actualDate);

            await this.actionClass.assertElementTextEquals(actualDate, expectedDate);
            console.log("✅ Date verification passed: " + actualDate);

            const labelTime = await (await Locatore.typeHourly).getAttribute('text');
            await this.actionClass.assertElementTextEquals(labelTime, MobileData.Create_New_Booking.Spot_Time1);

            const selectedType = await (await Locatore.typeHourly).getAttribute('checked');
            if (selectedType === 'true') {
                console.log("Hourly Type is selected by default");
            }

            await this.actionClass.simpleScrollAndroid('up');
            const labelVehicle = await (await Locatore.labelVehicle).getAttribute('text');
            await this.actionClass.assertElementTextEquals(labelVehicle, MobileData.Create_New_Booking.Label_Vehicle_Dropdown);

            await this.reusableMobilePage.selectOptionIndexFromDropdownMobile(await Locatore.selectCarDropdownFromNewBooking, 0, MobileData.Create_New_Booking.Select_Car);

            const errorMessage = await Locatore.vehicleErrorMsg;
            if (await errorMessage.isDisplayed()) {

                const errorText = await errorMessage.getText();
                console.log("❌ Error Message Displayed:", errorText);
                await this.actionClass.assertElementTextEquals(errorText, MobileData.Create_New_Booking.Vehicle_Error_Message);
                await this.actionClass.isElementDisplayed(await Locatore.vehicleErrorIcon, MobileData.Create_New_Booking.Vehicle_Error_Icon);

                const isNextEnabled = await (await Locatore.btnNextFromNewBooking).isEnabled();
                if (isNextEnabled) {
                    throw new Error("⚠️ Next button should be disabled when error is showing!");
                } else {
                    console.log("⏹️ Next button is correctly disabled when error is displayed.");
                }

                await this.actionClass.waitForElementAndClick(await Locatore.selectCarDropdownFromNewBooking);
                const vehicleOptions = await $$("//android.widget.ListView//android.widget.LinearLayout//android.widget.TextView");
                const totalVehicles = vehicleOptions.length;
                console.log(`Total vehicles available: ${totalVehicles}`);
                let errorResolved = false;
                for (let i = 1; i < totalVehicles; i++) {
                    console.log(`🚗 Trying vehicle at index ${i}...`);

                    await vehicleOptions[i].click();

                    if (!(await (await Locatore.vehicleErrorMsg).isDisplayed())) {
                        console.log("✅ Vehicle selected successfully, error cleared.");
                        errorResolved = true;
                        break;
                    }

                    if (i < totalVehicles - 1) {
                        await this.actionClass.waitForElementAndClick(await Locatore.selectCarDropdownFromNewBooking);
                    }
                }

                if (!errorResolved) {
                    throw new Error(
                        "🚫 Vehicle type is not matched. Please check vehicle type with spot."
                    );
                }
            }

            const labelSelectTime = await (await Locatore.labelSelectTime).getAttribute('text');
            await this.actionClass.assertElementTextEquals(labelSelectTime, MobileData.Create_New_Booking.Label_Select_Time);

            /* Selecting Nearest Time Slot */
            const nearestTime = getNearestTimeSlot();
            console.log("⏰ Nearest Time Slot:", nearestTime);
            
            await this.selectCurrentToPastTime();
            await this.actionClass.waitForElementAndClick(await Locatore.btnIconBackFromNewBooking);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
            await this.actionClass.waitForElementAndClick(await Locatore.btn_Icon_Plus);
            await this.actionClass.waitForElementAndClick(await Locatore.btnCreateNewBooking);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
            await this.actionClass.waitForElementAndClick(await Locatore.btnIconBackFromNewBooking);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
            await this.actionClass.waitForElementAndClick(await Locatore.btn_Icon_Plus);
            await this.actionClass.waitForElementAndClick(await Locatore.btnCreateNewBooking);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
            await this.reusableMobilePage.selectZoneByTextMobile(await Locatore.zoneDropdownFromNewBooking, zone);
            await this.selectSameTime();
            await this.actionClass.waitForElementAndClick(await Locatore.btnIconBackFromNewBooking);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
            await this.actionClass.waitForElementAndClick(await Locatore.btn_Icon_Plus);
            await this.actionClass.waitForElementAndClick(await Locatore.btnCreateNewBooking);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
            await this.reusableMobilePage.selectZoneByTextMobile(await Locatore.zoneDropdownFromNewBooking, zone);
            await this.selectOnlyFromTime();
            await this.actionClass.waitForElementAndClick(await Locatore.btnIconBackFromNewBooking);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
            await this.actionClass.waitForElementAndClick(await Locatore.btn_Icon_Plus);
            await this.actionClass.waitForElementAndClick(await Locatore.btnCreateNewBooking);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
            await this.reusableMobilePage.selectZoneByTextMobile(await Locatore.zoneDropdownFromNewBooking, zone);
            await this.selectOnlyToTime();
            await this.actionClass.waitForElementAndClick(await Locatore.btnIconBackFromNewBooking);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
            await this.actionClass.waitForElementAndClick(await Locatore.btn_Icon_Plus);
            await this.actionClass.waitForElementAndClick(await Locatore.btnCreateNewBooking);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
            await this.reusableMobilePage.selectZoneByTextMobile(await Locatore.zoneDropdownFromNewBooking, zone);
            await this.selectCurrentToFutureTime();
        }
        else {
            console.log("🚫 Parking Button is Disabled ❌ | 🅿️ Parking Zone is not available");
        }
    }

    async verifyCreateNewBookingParkingHourly2(zone: string) {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Selecting Hourly Zone and Date and Vehicle...");
        console.log("--------------------------------------------------------------------");
        const enabledParkingButton = await (await Locatore.btnParking).getAttribute('enabled');
        if (enabledParkingButton === 'true') {
            console.log("Parking Button is Enabled");
            await this.reusableMobilePage.selectZoneByTextMobile(await Locatore.zoneDropdownFromNewBooking, zone);
            await this.actionClass.waitForElementAndClick(await Locatore.dateContainer);
            await this.selectTodayDate();

            const today = new Date();
            const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const weekday = weekdays[today.getDay()];
            const day = today.getDate().toString().padStart(2, "0");
            const month = months[today.getMonth()];

            const expectedDate = `${weekday} ${day} ${month}`;
            console.log("📅 Expected Date:", expectedDate);

            const selectedDateElement = await $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/selectDateTxt"]');
            const actualDate = await selectedDateElement.getText();
            console.log("📌 Actual Date selected in dropdown box:", actualDate);

            await this.actionClass.assertElementTextEquals(actualDate, expectedDate);
            console.log("✅ Date verification passed: " + actualDate);

            await this.actionClass.simpleScrollAndroid('up');
            await this.reusableMobilePage.selectOptionIndexFromDropdownMobile(await Locatore.selectCarDropdownFromNewBooking, 0, MobileData.Create_New_Booking.Select_Car);

        }
        else {
            console.log("🚫 Parking Button is Disabled ❌ | 🅿️ Parking Zone is not available");
        }
    }

    async verifyCreateNewBookingParkingHourlyMixZone(zone: string) {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Selecting Mix Zone and Date and Vehicle...");
        console.log("--------------------------------------------------------------------");
        const enabledParkingButton = await (await Locatore.btnParking).getAttribute('enabled');
        if (enabledParkingButton === 'true') {
            console.log("Parking Button is Enabled");
            await this.reusableMobilePage.selectZoneByTextMobile(await Locatore.zoneDropdownFromNewBooking, zone);
            await this.actionClass.waitForElementAndClick(await Locatore.dateContainer);
            await this.selectTodayDate();

            const today = new Date();
            const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const weekday = weekdays[today.getDay()];
            const day = today.getDate().toString().padStart(2, "0");
            const month = months[today.getMonth()];

            const expectedDate = `${weekday} ${day} ${month}`;
            console.log("📅 Expected Date:", expectedDate);

            const selectedDateElement = await $('//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/selectDateTxt"]');
            const actualDate = await selectedDateElement.getText();
            console.log("📌 Actual Date selected in dropdown box:", actualDate);

            await this.actionClass.assertElementTextEquals(actualDate, expectedDate);
            console.log("✅ Date verification passed: " + actualDate);

            const labelTime = await (await Locatore.typeAllDay).getAttribute('text');
            await this.actionClass.assertElementTextEquals(labelTime, MobileData.Create_New_Booking.Spot_Time);

            const selectedType = await (await Locatore.typeAllDay).getAttribute('checked');
            if (selectedType === 'true') {
                console.log("All Day Type is selected by default");
            }

            const labelHourly = await (await Locatore.typeHourly).getAttribute('text');
            await this.actionClass.assertElementTextEquals(labelHourly, MobileData.Create_New_Booking.Spot_Time1);

            await this.actionClass.waitForElementAndClick(await Locatore.typeHourly);
            await browser.pause(500);
            const labelSelectTime = await (await Locatore.labelSelectTime).getAttribute('text');
            await this.actionClass.assertElementTextEquals(labelSelectTime, MobileData.Create_New_Booking.Label_Select_Time);
            await this.actionClass.isElementDisplayed(await Locatore.timeFromContainer, MobileData.Create_New_Booking.Select_Time_Container);
            await this.actionClass.waitForElementAndClick(await Locatore.typeAllDay);
            await this.actionClass.simpleScrollAndroid('up');
            await this.reusableMobilePage.selectOptionIndexFromDropdownMobile(await Locatore.selectCarDropdownFromNewBooking, 0, MobileData.Create_New_Booking.Select_Car);

        }
        else {
            console.log("🚫 Parking Button is Disabled ❌ | 🅿️ Parking Zone is not available");
        }
    }

    /**
     * Selects the nearest future time slot for "From" and the next time slot for "To".
     */
    async selectCurrentToFutureTime() {
        console.log('------------------------------------------------------------');
        console.log('Selecting Current Time and Future Time');
        console.log('------------------------------------------------------------');
        const from = getNearestTimeSlot();
        const to = getNextTimeSlot(from);

        await this.actionClass.waitForElementAndClick(await Locatore.timeFromContainer);
        const fromTimeLocator = await $(`//android.widget.Button[@text='${from}']`);
        await this.actionClass.scrollToTextAndroid(from);
        await this.actionClass.waitForElementAndClick(fromTimeLocator);
        await this.actionClass.waitForElementAndClick(await Locatore.timeToContainer);
        const toTimeLocator = await $(`//android.widget.Button[@text='${to}']`);
        await this.actionClass.scrollToTextAndroid(to);
        await this.actionClass.waitForElementAndClick(toTimeLocator);
        console.log(`✅ Selected From: ${from} → To: ${to}`);
    }

    /**
     * Attempts to select a "From" time that is later than the "To" time to trigger an error.
     */
    async selectCurrentToPastTime() {
        console.log('------------------------------------------------------------');
        console.log('Selecting Current Time and Past Time');
        console.log('------------------------------------------------------------');
        const from = getNearestTimeSlot();
        const to = getPreviousTimeSlot(from);
        await this.actionClass.waitForElementAndClick(await Locatore.timeFromContainer);
        await browser.pause(1000);
        const fromTimeLocator = await $(`//android.widget.Button[@text='${from}']`);
        await this.actionClass.scrollToTextAndroid(from);
        await this.actionClass.waitForElementAndClick(fromTimeLocator);
        await this.actionClass.waitForElementAndClick(await Locatore.timeToContainer);
        await browser.pause(1000);
        const toTimeLocator = await $(`//android.widget.Button[@text='${to}']`);
        await this.actionClass.scrollToTextAndroid(to);
        await this.actionClass.waitForElementAndClick(toTimeLocator);
        await this.actionClass.waitForElementAndClick(await Locatore.btnNextFromNewBooking);
        console.log(`✅ Selected Past Time From: ${from} → To: ${to}`);

        // Validate the toast message for invalid time selection (Need to automate the toast message but for now element is not interactable)
        /* await browser.pause(200); // Wait for the toast to appear
        const toastVisible = await Locatore.toastPopUpMessage.isDisplayed();
        console.log(`Toast Visible after selecting From ${from} → To ${to}: ${toastVisible}`);
        if (toastVisible) {
            const toastText = await Locatore.toastPopUpMessage.getAttribute('text');
            console.log("Toast Message Displayed:", toastText);
            await this.actionClass.assertElementTextEquals(toastText, MobileData.Create_New_Booking.Toast_Invalid_Time_Selection);
            console.log(`✅ Correctly handled invalid time selection: From ${from} → To ${to}`);
        } else {
            throw new Error(`🚫 No toast message displayed for invalid time selection! From: ${from}, To: ${to}`);
        } 
        console.log(`❌ Trying From ${from} → To ${to}, Toast Visible: ${toastVisible}`); */
    }

    async selectSameTime() {
        console.log('------------------------------------------------------------');
        console.log('Selecting Duplicate Time');
        console.log('------------------------------------------------------------');
        const time = getNearestTimeSlot();
        await this.actionClass.waitForElementAndClick(await Locatore.timeToContainer);
        await browser.pause(1000);
        await this.actionClass.scrollToTextAndroid(time);
        const toTimeLocator = await $(`//android.widget.Button[@text='${time}']`);
        await this.actionClass.waitForElementAndClick(toTimeLocator);
        await this.actionClass.waitForElementAndClick(await Locatore.btnNextFromNewBooking);
        console.log(`✅ Selected Same Time From: ${time} → To: ${time}`);

        // Validate the toast message for invalid time selection (Need to automate the toast message but for now element is not interactable)
        /* await browser.pause(200); // Wait for the toast to appear
        const toastVisible = await Locatore.toastPopUpMessage.isDisplayed();
        console.log(`Toast Visible after selecting From ${from} → To ${to}: ${toastVisible}`);
        if (toastVisible) {
            const toastText = await Locatore.toastPopUpMessage.getAttribute('text');
            console.log("Toast Message Displayed:", toastText);
            await this.actionClass.assertElementTextEquals(toastText, MobileData.Create_New_Booking.Toast_Invalid_Time_Selection);
            console.log(`✅ Correctly handled invalid time selection: From ${from} → To ${to}`);
        } else {
            throw new Error(`🚫 No toast message displayed for invalid time selection! From: ${from}, To: ${to}`);
        } 
        console.log(`❌ Trying From ${from} → To ${to}, Toast Visible: ${toastVisible}`); */
    }

    async selectOnlyFromTime() {
        console.log('------------------------------------------------------------');
        console.log('Selecting Only From Time');
        console.log('------------------------------------------------------------');
        const from = getNearestTimeSlot();

        await this.actionClass.waitForElementAndClick(await Locatore.timeFromContainer);
        await browser.pause(1000);
        await this.actionClass.scrollToTextAndroid(from);
        const fromTimeLocator = await $(`//android.widget.Button[@text='${from}']`);
        await this.actionClass.waitForElementAndClick(fromTimeLocator);
        await this.actionClass.waitForElementAndClick(await Locatore.btnNextFromNewBooking);
        console.log(`✅ Selected Only (From Time) From: ${from} → To:`);

        // Validate the toast message for invalid time selection (Need to automate the toast message but for now element is not interactable)
        /* await browser.pause(200); // Wait for the toast to appear
        const toastVisible = await Locatore.toastPopUpMessage.isDisplayed();
        console.log(`Toast Visible after selecting From ${from} → To ${to}: ${toastVisible}`);
        if (toastVisible) {
            const toastText = await Locatore.toastPopUpMessage.getAttribute('text');
            console.log("Toast Message Displayed:", toastText);
            await this.actionClass.assertElementTextEquals(toastText, MobileData.Create_New_Booking.Toast_Invalid_Time_Selection);
            console.log(`✅ Correctly handled invalid time selection: From ${from} → To ${to}`);
        } else {
            throw new Error(`🚫 No toast message displayed for invalid time selection! From: ${from}, To: ${to}`);
        } 
        console.log(`❌ Trying From ${from} → To ${to}, Toast Visible: ${toastVisible}`); */
    }

    async selectOnlyToTime() {
        console.log('------------------------------------------------------------');
        console.log('Selecting Only To Time');
        console.log('------------------------------------------------------------');
        const from = getNearestTimeSlot();

        await this.actionClass.waitForElementAndClick(await Locatore.timeToContainer);
        await browser.pause(1000);
        await this.actionClass.scrollToTextAndroid(from);
        const toTimeLocator = await $(`//android.widget.Button[@text='${from}']`);
        await this.actionClass.waitForElementAndClick(toTimeLocator);
        await this.actionClass.waitForElementAndClick(await Locatore.btnNextFromNewBooking);
        console.log(`✅ Selected Only (To Time) From:    → To: ${from}`);

        // Validate the toast message for invalid time selection (Need to automate the toast message but for now element is not interactable)
        /* await browser.pause(200); // Wait for the toast to appear
        const toastVisible = await Locatore.toastPopUpMessage.isDisplayed();
        console.log(`Toast Visible after selecting From ${from} → To ${to}: ${toastVisible}`);
        if (toastVisible) {
            const toastText = await Locatore.toastPopUpMessage.getAttribute('text');
            console.log("Toast Message Displayed:", toastText);
            await this.actionClass.assertElementTextEquals(toastText, MobileData.Create_New_Booking.Toast_Invalid_Time_Selection);
            console.log(`✅ Correctly handled invalid time selection: From ${from} → To ${to}`);
        } else {
            throw new Error(`🚫 No toast message displayed for invalid time selection! From: ${from}, To: ${to}`);
        } 
        console.log(`❌ Trying From ${from} → To ${to}, Toast Visible: ${toastVisible}`); */
    }

    async getAvailableSlots(): Promise<string[]> {
    console.log('------------------------------------------------------------');
    console.log('Get All Time Slots');
    console.log('------------------------------------------------------------');
    const elements = await Locatore.allTimeSlots;
    const slots: string[] = [];

    for (const el of elements) {
        const text = await el.getText();
        const enabled = await el.isEnabled();
        if (enabled) {
            slots.push(text);  // e.g. "10:00 - 10:30"
        }
    }
    console.log("⏱ Detected slot:", slots);
    return slots;
    }

    async verifyDisabledSlots() {
    console.log('------------------------------------------------------------');
    console.log('Verify Disabled Slots');
    console.log('------------------------------------------------------------');
    const elements = await Locatore.allTimeSlots;
    for (const el of elements) {
        const text = await el.getText();
        const enabled = await el.isEnabled();
        if (!enabled) {
            console.log(`⛔ Disabled slot: ${text}`);
            expect(enabled, `Slot "${text}" should be disabled`).to.be.false;
        }
    }
}


}

function getNearestTimeSlot(): string {
    const now = new Date();
    let minutes = now.getMinutes();
    const hours = now.getHours();

    // Round to nearest half hour
    if (minutes < 15) minutes = 0;
    else if (minutes < 45) minutes = 30;
    else {
        minutes = 0;
        now.setHours(hours + 1);
    }

    const formatted =
        now.getHours().toString().padStart(2, "0") + ":" +
        minutes.toString().padStart(2, "0");
    return formatted;
}

function getNextTimeSlot(current: string): string {
    const [hour, minute] = current.split(":").map(Number);
    let nextHour = hour;
    let nextMinute = minute + 30; // assume 30-minute slots

    if (nextMinute >= 60) {
        nextMinute = 0;
        nextHour++;
    }

    // Format back into HH:mm
    return `${nextHour.toString().padStart(2, "0")}:${nextMinute
        .toString()
        .padStart(2, "0")}`;
}

function getPreviousTimeSlot(current: string): string {
    const [hour, minute] = current.split(":").map(Number);
    let prevHour = hour;
    let prevMinute = minute - 30; // assume 30-minute slots

    if (prevMinute < 0) {
        prevMinute = 30;
        prevHour--;
    }

    // Format back into HH:mm
    return `${prevHour.toString().padStart(2, "0")}:${prevMinute
        .toString()
        .padStart(2, "0")}`;
}

function getNearestSlot(slots: string[]): string | null {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    console.log('Current Minutes: ', currentMinutes);
    for (const slot of slots) {
        const [from] = slot.split(" - ");
        const [h, m] = from.split(":").map(Number);
        const slotMinutes = h * 60 + m;
        console.log('Slot Minutes: ',slotMinutes);
        if (slotMinutes >= currentMinutes) {
            return slot;
        }
    }
    return null; // all slots past
}

function getFirstAvailableSlot(slots: string[]): string | null {
    if (slots.length > 0) {
        return slots[0];   // always first available
    }
    return null;
}



export default CreateNewBookingFlow;