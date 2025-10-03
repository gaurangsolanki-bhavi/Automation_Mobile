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

claimReleaseAndroidPage = new ClaimReleaseAndroidPage();
claimReleaseNoVehiclePage = new ClaimReleaseNoVehicle();
reusableMobilePage = new ReusableMobilePage();
profilePage = new ProfilePage();

class HomePage {
    actionClass: Actions;
    reusableMobilePage: ReusableMobilePage;

    constructor() {
        this.actionClass = new Actions();
        this.reusableMobilePage = new ReusableMobilePage();
    }

    async verifyHeaderCreditSection() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Verifying Credit Section on Home Page....");
        console.log("--------------------------------------------------------------------");
        console.log("\nVerifying Home Screen Logo is Display");
        await this.actionClass.isElementDisplayed(await Locatore.logoHomeScreen, MobileData.Home_Screen.Logo_Home_Screen);
        console.log("\nVerifying Ronspot Name Logo is Display");
        await this.actionClass.isElementDisplayed(await Locatore.logoRonspotName, MobileData.Home_Screen.Logo_Ronspot_Name);
        console.log("\nVerifying Credit and StartIcon is Display");
        await this.actionClass.isElementDisplayed(await Locatore.iconCreditHome, MobileData.Home_Screen.Credit_Star_Icon);
        const creditNumber = (await Locatore.iconCreditHome).getAttribute('text');
        console.log(`\nCredit: ${await creditNumber}`);
        await this.actionClass.waitForElementAndClick(await Locatore.iconCreditHome);
        console.log("\nVerifying Profile icon is Display");
        await this.actionClass.isElementDisplayed(await Locatore.iconProfileHomeCredit, MobileData.Home_Screen.Credit_Profile_Icon);
        console.log("\nVerifying User Name is Display");
        await this.actionClass.isElementDisplayed(await Locatore.txtUserNameCredit, MobileData.Home_Screen.User_Name);
        const creditRemainingText = await (await Locatore.txtCreditRemaining).getText();
        console.log(`\nCredit Remaining Text: ${creditRemainingText}`);
        await this.actionClass.assertElementTextEquals(creditRemainingText, MobileData.Home_Screen.Credit_Remaining_Text);
        const creditNumberText = await (await Locatore.numberCredit).getText();
        console.log(`\nCredit on Popup: ${creditNumberText}`);
        await this.actionClass.assertElementTextEquals(creditNumberText, await creditNumber);
        const element = await Locatore.txtCreditsReset;
        let textCreditReset = "";

        if (await element.isDisplayed()) {
            textCreditReset = await element.getText();
        }

        const actual = textCreditReset.trim();
        console.log(`\n🔎 Actual Text: "${actual}"`);

        let creditType: string = "None";

        if (!actual) {
            // Element not displayed or empty → Admin selected None
            creditType = "None";
            console.log(`\nElement not displayed or empty → Admin selected : ${creditType}`);
        } else {
            const regex = /^Your credits reset automatically each(?: (week|month))?$/i;
            const match = actual.match(regex);

            if (!match) {
                throw new Error(`❌ Text assertion failed!
            Expected: "Your credits reset automatically each [week|month]"
            Actual:   "${actual}"`);
            }

            if (match[1]?.toLowerCase() === "week") {
                creditType = "Weekly";
                console.log(`\n✅ Expected Text: "Your credits reset automatically each week"`);
            } else if (match[1]?.toLowerCase() === "month") {
                creditType = "Monthly";
                console.log(`\n✅ Expected Text: "Your credits reset automatically each month"`);
            }

            console.log(`\n✔ Text assertion passed! Credit type detected: ${creditType}`);
        }
        const creditRequireText = await (await Locatore.txtCreditsRequired).getText();
        console.log(`\nCredit Remaining Text: ${creditRequireText}`);
        await this.actionClass.assertElementTextEquals(creditRequireText, MobileData.Home_Screen.Credit_Required_Text);
        const noCreditRequireText = await (await Locatore.txtNoCreditsRequired).getText();
        console.log(`\nCredit Remaining Text: ${noCreditRequireText}`);
        await this.actionClass.assertElementTextEquals(noCreditRequireText, MobileData.Home_Screen.No_Credit_Required);
        const creditBackText = await (await Locatore.txtCreditsBack).getText();
        console.log(`\nCredit Remaining Text: ${creditBackText}`);
        await this.actionClass.assertElementTextEquals(creditBackText, MobileData.Home_Screen.Credit_Back);
        await driver.back();
        console.log("--------------------------------------------------------------------");
    }

    async verifyInfoSection() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Verifying Info Section on Home page....");
        console.log("--------------------------------------------------------------------");
        await this.actionClass.isElementDisplayed(await Locatore.iconInfo, MobileData.Home_Screen.Info_Section);
        await this.actionClass.waitForElementAndClick(await Locatore.iconInfo);

        const bookInFewSecondsText = await (await Locatore.txtHeaderInfo).getText();
        await this.actionClass.assertElementTextEquals(bookInFewSecondsText, MobileData.Home_Screen.Book_In_Few_Seconds);

        const bookInFullBodyText = await (await Locatore.txtFullBodyText).getText();
        await this.actionClass.assertElementTextEquals(bookInFullBodyText, MobileData.Home_Screen.Book_In_Full_Text);
        await this.actionClass.isElementDisplayed(await Locatore.imageBackground, MobileData.Home_Screen.Book_In_Just_BG_Image);
        await this.actionClass.isElementDisplayed(await Locatore.iconProgressBar, MobileData.Home_Screen.Progress_Bar);
        await this.actionClass.waitForElementAndClick(await Locatore.iconButtonNextInfo);

        const realTimeAvailability = await (await Locatore.txtHeaderInfo).getText();
        await this.actionClass.assertElementTextEquals(realTimeAvailability, MobileData.Home_Screen.Real_Time_Availability);

        const redBookedSpaces = await (await Locatore.txtFullBodyText).getText();
        await this.actionClass.assertElementTextEquals(redBookedSpaces, MobileData.Home_Screen.Red_Booked_Spaces);

        const greenBookedSpaces = await (await Locatore.txtFullBodyText2).getText();
        await this.actionClass.assertElementTextEquals(greenBookedSpaces, MobileData.Home_Screen.Green_Booked_Spaces);

        const greyBookedSpaces = await (await Locatore.txtFullBodyText3).getText();
        await this.actionClass.assertElementTextEquals(greyBookedSpaces, MobileData.Home_Screen.Grey_Booked_Spaces);

        const blueBookedSpaces = await (await Locatore.txtFullBodyText4).getText();
        await this.actionClass.assertElementTextEquals(blueBookedSpaces, MobileData.Home_Screen.Blue_Booked_Spaces);
        await this.actionClass.isElementDisplayed(await Locatore.imageBackground, MobileData.Home_Screen.Real_Time_Availability_BG_Image);
        await this.actionClass.isElementDisplayed(await Locatore.iconProgressBar, MobileData.Home_Screen.Progress_Bar);
        await this.actionClass.waitForElementAndClick(await Locatore.btnPreviousStep);
        await this.actionClass.waitForElementAndClick(await Locatore.iconButtonNextInfo);
        await this.actionClass.waitForElementAndClick(await Locatore.iconButtonNextInfo);

        const switchZone = await (await Locatore.txtHeaderInfo).getText();
        await this.actionClass.assertElementTextEquals(switchZone, MobileData.Home_Screen.Switch_Zones);
        const switchZoneBodyText = await (await Locatore.txtFullBodyText).getText();
        await this.actionClass.assertElementTextEquals(switchZoneBodyText, MobileData.Home_Screen.Switch_Zones_Body_Text);
        await this.actionClass.isElementDisplayed(await Locatore.imageBackground, MobileData.Home_Screen.Switch_Zones_BG_Image);
        await this.actionClass.isElementDisplayed(await Locatore.iconProgressBar, MobileData.Home_Screen.Progress_Bar);
        await this.actionClass.isElementDisplayed(await Locatore.btnPreviousStep, MobileData.Home_Screen.Previous_Step_Button);
        await this.actionClass.waitForElementAndClick(await Locatore.iconButtonNextInfo);

        const manageCredits = await (await Locatore.txtHeaderInfo).getText();
        await this.actionClass.assertElementTextEquals(manageCredits, MobileData.Home_Screen.Manage_Credits);
        const manageCreditsBodyText = await (await Locatore.txtFullBodyText).getText();
        await this.actionClass.assertElementTextEquals(manageCreditsBodyText, MobileData.Home_Screen.Manage_Credits_Body_Text);
        await this.actionClass.isElementDisplayed(await Locatore.imageBackground, MobileData.Home_Screen.Manage_Credit_BG_Image);
        await this.actionClass.isElementDisplayed(await Locatore.iconProgressBar, MobileData.Home_Screen.Progress_Bar);
        await this.actionClass.isElementDisplayed(await Locatore.btnPreviousStep, MobileData.Home_Screen.Previous_Step_Button);
        await this.actionClass.waitForElementAndClick(await Locatore.iconButtonNextInfo);

        const notComing = await (await Locatore.txtHeaderInfo).getText();
        await this.actionClass.assertElementTextEquals(notComing, MobileData.Home_Screen.Not_Coming);
        const notComingBodyText1 = await (await Locatore.txtFullBodyText).getText();
        await this.actionClass.assertElementTextEquals(notComingBodyText1, MobileData.Home_Screen.Not_Coming_Body_Text1);
        const notComingBodyText2 = await (await Locatore.txtFullBodyText2).getText();
        await this.actionClass.assertElementTextEquals(notComingBodyText2, MobileData.Home_Screen.Not_Coming_Body_Text2);
        await this.actionClass.isElementDisplayed(await Locatore.imageBackground, MobileData.Home_Screen.Not_Coming_BG_Image);
        await this.actionClass.isElementDisplayed(await Locatore.iconProgressBar, MobileData.Home_Screen.Progress_Bar);
        await this.actionClass.isElementDisplayed(await Locatore.btnPreviousStep, MobileData.Home_Screen.Previous_Step_Button);
        await this.actionClass.waitForElementAndClick(await Locatore.iconButtonNextInfo);

        const couldntFind = await (await Locatore.txtHeaderInfo).getText();
        await this.actionClass.assertElementTextEquals(couldntFind, MobileData.Home_Screen.Couldnt_Find_Answer);
        await this.actionClass.waitForElementAndClick(await Locatore.btn_Visit_Help_Center);
        const helpPageTitle = await (await Locatore.title_Help_Center).getText();
        await this.actionClass.assertElementTextEquals(helpPageTitle, MobileData.Home_Screen.Title_Help_Center);
        await this.actionClass.waitForElementAndClick(await Locatore.backButton);
        await this.actionClass.waitForElementAndClick(await Locatore.btn_Contact_Support);
        const needHelpTitle = await (await Locatore.supportPageTitle).getText();
        await this.actionClass.assertElementTextEquals(needHelpTitle, MobileData.Home_Screen.Title_Need_Help);
        await this.actionClass.waitForElementAndClick(await Locatore.backButton);
        await this.actionClass.isElementDisplayed(await Locatore.imageBackground, MobileData.Home_Screen.Couldnt_Find_BG_Image);
        await this.actionClass.isElementDisplayed(await Locatore.iconProgressBar, MobileData.Home_Screen.Progress_Bar);
        await this.actionClass.isElementDisplayed(await Locatore.btnPreviousStep, MobileData.Home_Screen.Previous_Step_Button);
        await this.actionClass.waitForElementAndClick(await Locatore.iconCross);
        console.log("--------------------------------------------------------------------");
    }

    async verifyNotification() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Verifying Notification icon Button and Redirection on Home page....");
        console.log("--------------------------------------------------------------------");
        await this.actionClass.waitForElementAndClick(await Locatore.iconNotification);
        const notificationTitleText = await (await Locatore.notificationPageTitle).getText();
        await this.actionClass.assertElementTextEquals(notificationTitleText, MobileData.Screen_Title.Notifications);
        await this.actionClass.waitForElementAndClick(await Locatore.backButton);
        console.log("--------------------------------------------------------------------");
    }

    async bookSpotForOffsetDay(offset: number, label: string) {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log(`Booking Spot for ${label}...`);
        console.log("--------------------------------------------------------------------");

        await browser.pause(3000);
        const today = new Date();
        const targetDate = new Date();
        targetDate.setDate(today.getDate() + offset);

        const day = targetDate.getDate().toString();
        // const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short' };
        // const formattedDate = targetDate.toLocaleDateString('en-US', options).replace(',', '');
        const weekday = targetDate.toLocaleDateString('en-US', { weekday: 'short' });
        const date = targetDate.getDate().toString().padStart(2, '0'); // ensures 2-digit
        const month = targetDate.toLocaleDateString('en-US', { month: 'short' });
        const formattedDate = `${weekday} ${date} ${month}`;
        const expectedText = `Book a space for ${formattedDate.replace(' ', ' ')}?`;

        console.log(`\n🗓️ Attempting booking for: ${formattedDate} (Day: ${day})`);
        let clicked = false;
        await browser.pause(2000);
        const dayElement = await $(`(//android.widget.TextView[@text="${day}"])[1]`);

        if (await dayElement.isDisplayed()) {
            await this.actionClass.waitForElementAndClick(dayElement);

            console.log(`🗓️ Expecting popup text: ${expectedText}`);
            const popupElement = await Locatore.textCurrentDate;
            const popupText = await popupElement.getText();
            console.log('Popup Text From Booking:', popupText);
            await this.actionClass.assertElementTextEquals(popupText, expectedText);
            // Select car & book
            await this.reusableMobilePage.selectOptionIndexFromDropdownMobile(
                await Locatore.selectCarDropdown,
                0,
                MobileData.Booking_Spot.Select_Car
            );

            await this.actionClass.waitForElementAndClick(await Locatore.btnGetRandomSpace);
            await browser.pause(5000);

            // Verify booking
            const bookedSpots = await Locatore.countBookedSpot;
            const bookedCount = bookedSpots.length;

            if (bookedCount > 0) {
                console.log(`✅ Spot successfully booked for ${formattedDate}. Total booked spots: ${bookedCount}`);
                clicked = true;
            } else {
                console.error(`❌ Booking failed: No booked spot detected for ${formattedDate}.`);
            }
        } else {
            console.error(`❌ Unable to find calendar element for day: ${day}`);
        }

        if (!clicked) {
            throw new Error(`Booking not completed for day: ${day} (${formattedDate}).`);
        }

        console.log(`\n<<================== ✅ Booking Process Completed for ${label} ==================>>\n`);
    }

    async bookSpotCurrentDayFromCalendar(zone: string) {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log(`Booking Spot for Current Day...`);
        console.log("--------------------------------------------------------------------");
        await reusableMobilePage.selectZoneByTextMobile(await Locatore.iconZoneDropdown, zone);
        await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        await reusableMobilePage.refreshAndCountDays();
        await reusableMobilePage.releaseAnyBookedSpot(() => Locatore.countBookedSpot, () => Locatore.btnCancleBooking, () => Locatore.btnConfirmCancelBooking, () => Locatore.month_header, () => Locatore.previous_Month_Button);
        await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        await this.bookSpotForOffsetDay(0, "Current Day");
        await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
    }

    async bookSpotNextDayFromCalendar(zone: string) {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log(`Booking Spot for Next Day...`);
        console.log("--------------------------------------------------------------------");
        await this.bookSpotForOffsetDay(1, "Next Day");
        await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
    }

    async bookSpotNextToNextDayFromCalendar(zone: string) {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log(`Booking Spot for Next-to-Next Day...`);
        console.log("--------------------------------------------------------------------");
        await this.bookSpotForOffsetDay(2, "Next-to-Next Day");
        await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
    }

    async verifyTodayBookingCount() {
        console.log("\n------------------------------------------------------");
        console.log("Verifying Today's Booking Count...");
        console.log("------------------------------------------------------");

        const bookingCards = await Locatore.todaysBookingCardViewHome;
        const cardCount = bookingCards.length;
        console.log(`📌 Found ${cardCount} booking card(s) in today's list.`);

        const summaryElement = await Locatore.bookingCountOnHeader;
        const summaryText = await summaryElement.getText();
        console.log(`📌 Summary text displayed: "${summaryText}"`);

        const match = summaryText.match(/(\d+)/);
        let summaryCount = 0;
        if (match) {
            summaryCount = parseInt(match[1], 10);
        }
        console.log(`📌 Extracted booking count from summary: ${summaryCount}`);

        if (cardCount === summaryCount) {
            console.log(`✅ Today's Booking count matches: ${cardCount}`);
        } else {
            throw new Error(`❌ Mismatch! Today's Booking count: ${cardCount}, Summary says: ${summaryCount}`);
        }
        console.log("\n<<================== ✅ Booking Count Verification Completed ==================>>\n");
    }


    async verifyTodayBookingElements(expectedBookings: {
        zone: string,
        spot: string,
        time: string,
        messages: { zone: string, spot: string, time: string }
    }[]) {
        console.log("\n-------------------------------------------------------");
        console.log("📌 Verifying today's booking elements...");
        console.log("-------------------------------------------------------");

        const bookingElements = await Locatore.zoneSpotAndTime;

        await browser.waitUntil(
            async () => (await bookingElements.length) > 0,
            { timeout: 5000, timeoutMsg: '❌ No booking elements found in today’s booking list' }
        );

        const actualTexts: string[] = [];
        for (const el of bookingElements) {
            actualTexts.push(await el.getText());
        }

        console.log(`📌 Extracted booking texts: ${JSON.stringify(actualTexts, null, 2)}`);

        const expectedCount = expectedBookings.length * 3;
        expect(actualTexts.length).to.equal(
            expectedCount,
            `❌ Booking element count mismatch. Found ${actualTexts.length}, expected ${expectedCount}`
        );

        for (let i = 0; i < expectedBookings.length; i++) {
            const expected = expectedBookings[i];

            const zone = actualTexts[i * 3];
            const spot = actualTexts[i * 3 + 1];
            const time = actualTexts[i * 3 + 2];

            console.log(`\n🔍 Booking ${i + 1}:`);

            // Replace ${index} with booking number (i+1)
            const zoneMessage = expected.messages.zone.replace("${index}", (i + 1).toString());
            const spotMessage = expected.messages.spot.replace("${index}", (i + 1).toString());
            const timeMessage = expected.messages.time.replace("${index}", (i + 1).toString());

            await this.actionClass.assertElementTextEquals(zone, expected.zone, zoneMessage);
            await this.actionClass.assertElementTextEquals(spot, expected.spot, spotMessage);
            await this.actionClass.assertElementTextEquals(time, expected.time, timeMessage);

            console.log(`✅ Booking ${i + 1} matches expected JSON data`);
        }

        await this.actionClass.isElementDisplayed(await Locatore.btnCheckIn, MobileData.Booking_Spot.Button_CheckIn);
        await this.actionClass.waitForElementAndClick(await Locatore.iconOptionButtonTodaysBooking);
        await browser.pause(500);
        const todaysZone1 = await (await Locatore.txtZoneTodaysBooking).getText();
        await this.actionClass.assertElementTextEquals(todaysZone1, MobileData.Home_Screen.TodaysZoneFirst);
        const time1 = await (await Locatore.bookingSpotTime).getText();
        await this.actionClass.assertElementTextEquals(time1, MobileData.Home_Screen.Time);
        const todaysSpot1 = await (await Locatore.txtSpotTodaysBooking).getText();
        await this.actionClass.assertElementTextEquals(todaysSpot1, MobileData.Home_Screen.TodaysSpotFirst);
        await this.actionClass.isElementDisplayed(await Locatore.btnCheckIn, MobileData.Booking_Spot.Button_CheckIn);
        await this.actionClass.waitForElementAndClick(await Locatore.btnSpaceTaken);
        const spaceTakenHeaderText = await (await Locatore.spaceTakenHeaderText).getText();
        expect(spaceTakenHeaderText).contains(MobileData.Home_Screen.TodaysSpotFirst);
        console.log("✅ Space Taken header text", spaceTakenHeaderText);
        await this.actionClass.assertElementTextEquals(todaysSpot1, MobileData.Home_Screen.TodaysSpotFirst);
        const spaceTaken_BodyText1 = await (await Locatore.spaceTaken_BodyText1).getText();
        await this.actionClass.assertElementTextEquals(spaceTaken_BodyText1, MobileData.Home_Screen.SpaceTakenBodyText1);
        const textboxHeader = await (await Locatore.textBoxHeader).getText();
        await this.actionClass.assertElementTextEquals(textboxHeader, MobileData.Home_Screen.Textbox_Header);
        await this.actionClass.isElementDisplayed(await Locatore.textBoxInput, MobileData.Home_Screen.Textbox);
        const spaceTaken_BodyText2 = await (await Locatore.spaceTaken_BodyText2).getText();
        await this.actionClass.assertElementTextEquals(spaceTaken_BodyText2, MobileData.Home_Screen.SpaceTakenBodyText2);
        await this.actionClass.waitForElementAndClick(await Locatore.btnNextInSpaceTaken);
        await browser.pause(500);
        const Textbox_Validation_Message = await (await Locatore.textboxValidationMsg).getText();
        console.log("Textbox Validation Message:", Textbox_Validation_Message);
        await this.actionClass.assertElementTextEquals(Textbox_Validation_Message, MobileData.Home_Screen.Textbox_Validation_Message);
        const carplateNumber = await this.reusableMobilePage.generateRandomNumber();
        await this.actionClass.clearAndSendKey(await Locatore.textBoxInput, carplateNumber);
        await this.actionClass.waitForElementAndClick(await Locatore.btnNextInSpaceTaken);
        await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        const violationReport_HeaderText = await (await Locatore.violationReportHeaderText).getText();
        await this.actionClass.assertElementTextEquals(violationReport_HeaderText, MobileData.Home_Screen.ViolationReport_Header);
        await this.actionClass.isElementDisplayed(await Locatore.iconUserViolationReport, MobileData.Home_Screen.Icon_User_Violation_Report);
        const txt_NumberPlate = await (await Locatore.txtNumberPlate).getText();
        console.log("Violation Number Plate Text:", txt_NumberPlate);
        await this.actionClass.assertElementTextEquals(txt_NumberPlate, carplateNumber);
        const txt_ParkingInfo1 = await (await Locatore.txtParkingInfo1).getText();
        await this.actionClass.assertElementTextEquals(txt_ParkingInfo1, MobileData.Home_Screen.Parking_Info1);
        await this.actionClass.isElementDisplayed(await Locatore.imageParkingViolation, MobileData.Home_Screen.image_Parking_Violation);
        const txt_ParkingInfo2 = await (await Locatore.txtParkingInfo2).getText();
        expect(txt_ParkingInfo2).contains(MobileData.Home_Screen.Parking_Info2);
        const txtAlternative_Parking_Spot = await (await Locatore.txtAlternative_Parking_Spot).getText();
        console.log("Alternative Parking Spot Text:", txtAlternative_Parking_Spot);
        const cancelBtn = await Locatore.popupCancelBtn;
        const clickableAttr = await cancelBtn.getAttribute("clickable");
        const enabledAttr = await cancelBtn.getAttribute("enabled");
        expect(clickableAttr, "❌ Cancel button is not clickable").to.equal("true");
        expect(enabledAttr, "❌ Cancel button is not enabled").to.equal("true");
        console.log("✅ Cancel button is clickable and enabled");
        await this.actionClass.waitForElementAndClick(await Locatore.btnYesTakeThisSpace);
        await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        console.log("✅ Successfully clicked on Yes, take this space button and Violation Reported");
        const spotAfterViolation = await (await Locatore.txtSpotTodaysBooking).getText();
        await this.actionClass.assertElementTextEquals(spotAfterViolation, txtAlternative_Parking_Spot);
        await browser.pause(3000);
        await this.actionClass.waitForElementAndClick(await Locatore.iconOptionButtonTodaysBooking);
        await this.actionClass.waitForElementAndClick(await Locatore.btnSpaceTaken);
        await this.actionClass.clearAndSendKey(await Locatore.textBoxInput, carplateNumber);
        await this.actionClass.waitForElementAndClick(await Locatore.btnNextInSpaceTaken);
        await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        const btnConfirm = await Locatore.btnConfirmNoSpotAvailable;
        if (await btnConfirm.isDisplayed()) {
            const noSpotAvailableText = await (await Locatore.txtParkingInfo2).getText();
            await this.actionClass.assertElementTextEquals(noSpotAvailableText, MobileData.Home_Screen.No_Spot_Available_Text);
            console.log("No Spot Available Text:", noSpotAvailableText);
            await this.actionClass.waitForElementAndClick(await Locatore.btnConfirmNoSpotAvailable);
            await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        }
        await browser.pause(2000);
        await this.actionClass.waitForElementAndClick(await Locatore.iconOptionButtonTodaysBooking);
        await this.actionClass.waitForElementAndClick(await Locatore.btnGoToMap);
        console.log("Navigate to Map Layout");
        await this.actionClass.isElementDisplayed(await Locatore.imageMapLayout, MobileData.Home_Screen.Image_Map_Layout);
        await profilePage.navigateToHome();
        await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        await browser.pause(2000);
        await this.actionClass.waitForElementAndClick(await Locatore.iconOptionButtonTodaysBooking);
        await this.actionClass.waitForElementAndClick(await Locatore.btnCancelBookingHome);
        const txtCancelBooking = (await (await Locatore.textCancelBooking).getAttribute('text')).trim();
        expect(txtCancelBooking).contains(MobileData.Booking_Spot.Cancel_Booking_Header);
        await this.actionClass.isElementDisplayed(await Locatore.usreNameOnBookingSpot, MobileData.Booking_Spot.User_Name3);
        const txtDate = (await (await Locatore.textDateOnCancelBooking).getAttribute('text')).trim();
        const today = new Date();
        const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short' };
        // const formattedDate = today.toLocaleDateString('en-GB', options).replace(',', '');
        // const expectedDate = `${formattedDate.replace(' ', ', ')}`;
        const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(today);
        const day = new Intl.DateTimeFormat('en-GB', { day: '2-digit' }).format(today);
        const month = monthMap[today.getMonth()];
        const expectedDate = `${weekday} ${day} ${month}`;
        await this.actionClass.assertElementTextEquals(txtDate, expectedDate);
        await this.actionClass.waitForElementAndClick(await Locatore.btnConfirmCancelBooking);
        await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        await browser.pause(2000);
        const parkingMap = await Locatore.txtParkingMap;
        if (await parkingMap.isDisplayed()) {
            throw new Error("❌ Parking Map is visible, but it should not be!");
        } else {
            console.log("✅ Parking Map Zone is not visible as expected, Booking Cancelled Successfully");
        }
        await this.actionClass.waitForElementAndClick(await Locatore.iconOptionButtonTodaysBooking);
        await browser.pause(500);
        const todaysZone2 = await (await Locatore.txtZone2TodaysBooking).getText();
        await this.actionClass.assertElementTextEquals(todaysZone2, MobileData.Home_Screen.TodaysZoneSecond);
        const time2 = await (await Locatore.bookingSpotTime).getText();
        await this.actionClass.assertElementTextEquals(time2, MobileData.Home_Screen.Time);
        const todaysSpot2 = await (await Locatore.txtSpotTodaysBooking).getText();
        await this.actionClass.assertElementTextEquals(todaysSpot2, MobileData.Home_Screen.TodaysSpotSecond);
        await this.actionClass.isElementDisplayed(await Locatore.btnCheckIn, MobileData.Booking_Spot.Button_CheckIn);
        await this.actionClass.waitForElementAndClick(await Locatore.btnSpaceTaken);
        await driver.back();
        await this.actionClass.waitForElementAndClick(await Locatore.btnCancelBookingHome);
        await this.actionClass.waitForElementAndClick(await Locatore.btnBack);
        await this.actionClass.waitForElementAndClick(await Locatore.iconOptionButtonTodaysBooking);
        console.log("\n<<================== ✅ All booking elements verified successfully ==================>>\n");
    }

    async verifyUpcomingBookingCount() {
        console.log("\n------------------------------------------------------");
        console.log("Verifying Upcoming Booking Count...");
        console.log("------------------------------------------------------");

        const upComingBookingText = await (await Locatore.txtUpcomingBooking).getText();
        await this.actionClass.assertElementTextEquals(upComingBookingText, MobileData.Home_Screen.UpComing_Booking_Text);
        const bookingCards = await Locatore.upComingBookingsCardViewHome;
        const cardCount = bookingCards.length;
        console.log(`📌 Found ${cardCount} UpComing booking(s) in upcoming list.`);
    }

    async verifyUpcomingBookingElements(expectedBookings: {
        zone: string,
        spot: string,
        offset: number,
        messages: { zone: string, spot: string }
    }[]) {
        console.log("\n-------------------------------------------------------");
        console.log("📌 Verifying upcoming booking elements...");
        console.log("-------------------------------------------------------");

        const bookingElements = await Locatore.upComingZoneSpotAndTime;
        await browser.waitUntil(
            async () => (await bookingElements.length) > 0,
            { timeout: 5000, timeoutMsg: '❌ No booking elements found in upcoming booking list' }
        );
        const actualTexts: string[] = [];
        for (const el of bookingElements) {
            actualTexts.push(await el.getText());
        }
        console.log(`📌 Extracted booking texts: ${JSON.stringify(actualTexts, null, 2)}`);
        const expectedCount = expectedBookings.length * 3;
        expect(actualTexts.length).to.equal(
            expectedCount,
            `❌ Booking element count mismatch. Found ${actualTexts.length}, expected ${expectedCount}`
        );
        for (let i = 0; i < expectedBookings.length; i++) {
            const expected = expectedBookings[i];
            const zone = actualTexts[i * 3];
            const spot = actualTexts[i * 3 + 1];
            const time = actualTexts[i * 3 + 2]; // UI time
            console.log(`\n🔍 Upcoming Booking ${i + 1}:`);

            const zoneMessage = expected.messages.zone.replace("${index}", (i + 1).toString());
            const spotMessage = expected.messages.spot.replace("${index}", (i + 1).toString());

            await this.actionClass.assertElementTextEquals(zone, expected.zone, zoneMessage);
            await this.actionClass.assertElementTextEquals(spot, expected.spot, spotMessage);

            const today = new Date();
            const targetDate = new Date();
            targetDate.setDate(today.getDate() + expected.offset);

            let expectedTime: string;
            if (expected.offset === 1) {
                expectedTime = "All day, tomorrow";
            } else {
                const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(targetDate);
                const day = new Intl.DateTimeFormat("en-GB", { day: "2-digit" }).format(targetDate);
                const month = monthMap[targetDate.getMonth()];
                const formattedDate = `${weekday} ${day} ${month}`;
                expectedTime = `All day, ${formattedDate}`;
                // const options: Intl.DateTimeFormatOptions = {
                //     weekday: "short",
                //     day: "2-digit",
                //     month: "short",
                // };
                // const formattedDate = targetDate
                //     .toLocaleDateString("en-GB", options)
                //     .replace(",", "");
                // expectedTime = `All day, ${formattedDate}`;
            }
            await this.actionClass.assertElementTextEquals(
                time,
                expectedTime,
                `Expected upcoming booking time to be "${expectedTime}" but got "${time}"`
            );
            console.log(`✅ Upcoming Booking ${i + 1} matches expected Zone, Spot, and dynamic Time`);
        }

        await this.actionClass.waitForElementAndClick(await Locatore.iconOptionButtonUpComingBookings);
        await browser.pause(500);
        const upComingZone1 = await (await Locatore.txtZoneUpComingBookings).getText();
        await this.actionClass.assertElementTextEquals(upComingZone1, MobileData.Home_Screen.UpComingZoneFirst);
        const upComingtime1 = await (await Locatore.upComingBookingSpotTime).getText();
        await this.actionClass.assertElementTextEquals(upComingtime1, MobileData.Home_Screen.UpComingTimeFirst);
        const upComingSpot1 = await (await Locatore.txtSpotUpComingBookings).getText();
        await this.actionClass.assertElementTextEquals(upComingSpot1, MobileData.Home_Screen.UpComingSpotFirst);
        await this.actionClass.waitForElementAndClick(await Locatore.btnCancelBookingHome);

        const txtCancelBooking = (await (await Locatore.textCancelBooking).getAttribute('text')).trim();
        expect(txtCancelBooking).contains(MobileData.Booking_Spot.Cancel_Booking_Header);
        await this.actionClass.isElementDisplayed(await Locatore.usreNameOnBookingSpot, MobileData.Booking_Spot.User_Name3);
        await this.actionClass.isElementDisplayed(await Locatore.textDateOnCancelBooking, MobileData.Home_Screen.UpComingDateWithTime);
        await this.actionClass.waitForElementAndClick(await Locatore.btnConfirmCancelBooking);
        await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        await browser.pause(2000);
        const parkingAllDay = await Locatore.txtUpComingParkingAllDay;
        if (await parkingAllDay.isDisplayed()) {
            throw new Error("❌ Parking_All_Day Zone is visible, but it should not be!");
        } else {
            console.log("✅ Parking_All_Day Zone is not visible as expected, Booking Cancelled Successfully");
        }
        await browser.pause(2000);
        await this.actionClass.waitForElementAndClick(await Locatore.iconOptionButtonUpComingBookings);
        await browser.pause(500);
        const upComingZone = await (await Locatore.txtZoneUpComingBookings).getText();
        await this.actionClass.assertElementTextEquals(upComingZone, MobileData.Home_Screen.UpComingZoneSecond);
        await this.actionClass.isElementDisplayed(await Locatore.upComingBookingSpotTime, MobileData.Home_Screen.UpComingDateWithTime);
        const upComingSpot = await (await Locatore.txtSpotUpComingBookings).getText();
        await this.actionClass.assertElementTextEquals(upComingSpot, MobileData.Home_Screen.UpComingSpotSecond);
        await this.actionClass.waitForElementAndClick(await Locatore.btnGoToMap);
        console.log("Navigate to Map Layout");
        await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        await this.actionClass.isElementDisplayed(await Locatore.imageMapLayout, MobileData.Home_Screen.Image_Map_Layout);
        await profilePage.navigateToHome();
        await reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        await browser.pause(2000);
        await this.actionClass.waitForElementAndClick(await Locatore.iconOptionButtonUpComingBookings);
        await this.actionClass.waitForElementAndClick(await Locatore.btnCancelBookingHome);
        await this.actionClass.waitForElementAndClick(await Locatore.btnBack);
        const time = await (await Locatore.bookingSpotTime).getText();
        await this.actionClass.assertElementTextEquals(time, MobileData.Home_Screen.Time);
        console.log("\n<<================== ✅ All upcoming booking elements verified successfully ==================>>\n");
    }

    async navigateToCalandar() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Navigating to Calendar Page...");
        console.log("--------------------------------------------------------------------");
        console.log("\nClicking on 'Calendar' icon...");
        await browser.pause(3000);
        await this.actionClass.waitForElementAndClick(await Locatore.CalendarNavigationBarItemIcon);
        await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        console.log("\nCalendar page opened successfully.");
    }
}
export default HomePage;