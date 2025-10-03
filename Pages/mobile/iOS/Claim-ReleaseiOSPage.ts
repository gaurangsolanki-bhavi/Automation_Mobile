import Actions from '../../ActionWaitMob';
import Locatore from './LocatoreiOSPage';
import ReusableMobilePage from '../../../Pages/ReusableMobilePage';
import ElementsName from "../../../test-data/JSON//Elements_Name.json"
import dayjs from 'dayjs';
import MobileData from '../../../test-data/JSON/MobileTestData.json';
import { testConfig } from '../../../wdio.conf';

class ClaimReleaseiOSPage {
    actionClass: Actions;
    reusableMobilePage: ReusableMobilePage;

    constructor() {
        this.actionClass = new Actions();
        this.reusableMobilePage = new ReusableMobilePage();
    }

    async loadUserData() {
        const users = await this.reusableMobilePage.readExcelData(testConfig.excelPath, 'MobileUser');
        if (users.length === 0) {
            throw new Error('No credentials found in Excel file.');
        }
        return users[0].zone;
    }

    async checkAndAddVehicle() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Add Vehicle if not added");
        console.log("--------------------------------------------------------------------");
        await browser.pause(3000);
        console.log("<<================================================================>>");
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Vehicle is already added, No need to add a new vehicle.");
        console.log("--------------------------------------------------------------------");
        await browser.pause(3000);
        console.log("\nClicking on 'Profile' icon...");
        await browser.pause(5000);
        await this.actionClass.waitForElementAndClick(await Locatore.profileIcon);
        console.log("\nClicking on 'Edit Profile' button...");
        await this.actionClass.waitForElementAndClick(await Locatore.editProfile);
        console.log("\nScrolling to 'Add a Vehicle' button...");
        await browser.pause(3000);
        const btnAddVehicle = await Locatore.btnAddVehicle;
        await this.actionClass.scrollToElementIOS(btnAddVehicle, 'up');
        console.log("Scrolling completed.");
        await browser.pause(3000);
        console.log("\nChecking for existing vehicles...");
        const vehicles = await Locatore.vehicles;
        const vehicleInputs = await Locatore.check_First_Vehicle;

        if (vehicles.length === 0) {
            console.log("❌ No vehicle found.");
        } else {
            await this.actionClass.waitForElementVisible(vehicles[0]);
            const vehicleCount = vehicles.length;
            const vehicleInputsCount = vehicleInputs.length;
            console.log("\n**********************************");
            console.log(`Total Available Vehicles Found: ${vehicleCount}`);
            console.log("**********************************");
            for (let i = 0; i < vehicleInputsCount; i++) {
                const vehicleValue = await vehicleInputs[i].getAttribute('value') || '';
                console.log(`Vehicle ${i + 1}: "${vehicleValue}"`);
            }
        }
    }

    async navigateToCalandar() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Navigating to Calendar Page...");
        console.log("--------------------------------------------------------------------");
        await browser.pause(3000);
        console.log("\nClick on Back icon from edit profile...");
        await this.actionClass.waitForElementAndClick(await Locatore.iconBack);
        console.log("\nClicking on 'Calendar' icon...");
        await this.actionClass.waitForElementAndClick(await Locatore.iconCalendar);
        console.log("\nCalendar page opened successfully.");
    }

    async bookSpotCurrentDayFromCalendar(zone: string) {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Booking Spot for Current Day...");
        console.log("--------------------------------------------------------------------");
        await browser.pause(5000);
        const today = new Date();
        await browser.pause(2000);
        const todayDay = dayjs().date().toString();
        console.log(`\nToday's Date :- ${todayDay}`);
        let clicked = false;
        const todayElement = await $(`(//XCUIElementTypeStaticText[@name="${todayDay}"])[1]`);
        if (await todayElement.isDisplayed()) {
            await this.actionClass.waitForElementAndClick(todayElement);
            const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short' };
            const formattedDate = today.toLocaleDateString('en-GB', options).replace(',', '');
            const expectedText = `Book a space for ${formattedDate.replace(' ', ', ')}?`;
            console.log(`🗓️ Expecting text: ${expectedText}`);
            const element = await Locatore.textCurrentDate;
            const fullText = await element.getText();
            console.log('Full Text From Booking Popup:', fullText);
            await this.actionClass.assertElementTextEquals(fullText, expectedText);
            await this.actionClass.isElementDisplayed(await Locatore.profileIconOnBookingSpot, MobileData.Booking_Spot.Profile_Icon);
            await this.actionClass.isElementDisplayed(await Locatore.usreNameOnBookingSpot, MobileData.Booking_Spot.User_Name);
            await this.actionClass.isElementDisplayed(await Locatore.iconCreditStar, MobileData.Booking_Spot.Credit_Star_Icon);
            await this.actionClass.isElementDisplayed(await Locatore.creditDeductForBooking,MobileData.Booking_Spot.Credit_Deduct_For_Booking);
            const deductCreditOnBooking = (await Locatore.creditDeductForBooking).getText();
            await this.reusableMobilePage.selectOptionIndexFromDropdownMobile(await Locatore.selectCarDropdown, 0, MobileData.Booking_Spot.Select_Car);
            await this.actionClass.isElementDisplayed(await Locatore.imageParkingOnBookingSpot, MobileData.Booking_Spot.Image_Parking);
            await this.actionClass.waitForElementAndClick(await Locatore.btnGetRandomSpace);
            await browser.pause(5000);
            const bookedSpots = await Locatore.countBookedSpot;
            const bookedCount = bookedSpots.length;
            if (bookedCount > 0) {
                console.log(`✅ Spot successfully booked. Total booked spots: ${bookedCount}`);
                clicked = true;
            } else {
                console.error("❌ Booking failed: No booked spot detected after action.");
            }
            await this.actionClass.waitForElementAndClick(todayElement);
            const headerText = (await Locatore.header_ManageBooking.getText()).trim();
            expect(headerText).toContain(MobileData.Booking_Spot.Manage_Booking);
            await this.actionClass.isElementDisplayed(await Locatore.iconPinLocation, MobileData.Booking_Spot.Pin_Location_Icon);
            // const zone = await this.loadUserData();
            await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.textZone, zone);
            await this.actionClass.isElementDisplayed(await Locatore.iconTime, MobileData.Booking_Spot.Time_Icon);
            await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.textSpotTimeWithDate, `All day, ${formattedDate}`);
            await this.actionClass.isElementDisplayed(await Locatore.profileIconOnBookingSpot, MobileData.Booking_Spot.Profile_Icon2);
            await this.actionClass.isElementDisplayed(await Locatore.usreNameOnBookingSpot, MobileData.Booking_Spot.User_Name2);
            await this.actionClass.isElementDisplayed(await Locatore.iconCreditStar, MobileData.Booking_Spot.Credit_Star_Icon);
            await this.actionClass.isElementDisplayed(await Locatore.creditDeductForBooking,MobileData.Booking_Spot.Credit_Deduct_For_Booking);
            await this.actionClass.isElementDisplayed(await Locatore.btnCheckIn, MobileData.Booking_Spot.Button_CheckIn);
            await this.actionClass.waitForElementAndClick(await Locatore.btnCancleBooking);
            const txtCancel = (await Locatore.textCancelBooking.getText()).trim();
            expect(txtCancel).toContain(MobileData.Booking_Spot.Cancel_Booking_Header);
            await this.actionClass.isElementDisplayed(await Locatore.profileIconOnBookingSpot, MobileData.Booking_Spot.Profile_Icon3);
            await this.actionClass.isElementDisplayed(await Locatore.usreNameOnBookingSpot, MobileData.Booking_Spot.User_Name3);
            await this.actionClass.isElementDisplayed(await Locatore.iconCalendarCancleBooking, MobileData.Booking_Spot.Calendar_Icon);
            const expectedDate = `${formattedDate.replace(' ', ', ')}`;
            await this.actionClass.assertElementTextEqualsWithLocator(await Locatore.dateOnCancelBooking, expectedDate);
            await this.actionClass.isElementDisplayed(await Locatore.btnConfirm, MobileData.Booking_Spot.Button_Confirm);
            await this.actionClass.waitForElementAndClick(await Locatore.btnBack);
            return deductCreditOnBooking;
        }
        else {
            console.error(`❌ Unable to find today's calendar element for day: ${todayDay}`);
        }
        if (!clicked) {
            throw new Error(`Booking not completed for today (${todayDay}).`);
        }
        console.log("\n<<================== ✅ Booking Process Completed ==================>>\n");
    }

    async nextMonthBooking() {
        console.log("\n");
        console.log("----------------------------------");
        console.log("Booking Next Month Spot From Calendar.");
        console.log("----------------------------------");
        const today = new Date();
        const todayDateId = dayjs().format('YYYY-MM-DD');
        console.log(`Today Date :- (${todayDateId}).`);
        // ➤ Calculate next month
        const nextMonthDate = new Date(today.getFullYear(), today.getMonth() + 1);
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const expectedMonthYear = `${monthNames[nextMonthDate.getMonth()]} ${nextMonthDate.getFullYear()}`;
        // ➤ Check current calendar header
        await browser.pause(3000);
        const calendarHeaderElement = await Locatore.month_header;
        const currentCalendarHeader = await calendarHeaderElement.getText();
        console.log(`Current Calendar Header: ${currentCalendarHeader}`);

        if (!currentCalendarHeader.includes(expectedMonthYear)) {
            console.log("Navigating to next month...");
            await this.actionClass.waitForElementAndClick(await Locatore.next_Month_Button);
            await browser.pause(7000);
        } else {
            console.log("Already on next month calendar.");
        }

        const updatedCalendarHeader = await calendarHeaderElement.getText();
        await expect(updatedCalendarHeader).toContain(expectedMonthYear);
        console.log(`User on Next Month Calendar: ${expectedMonthYear}`);

        // ➤ Refresh and prepare
        await this.reusableMobilePage.refreshAndCountDays();
        await browser.pause(3000);
        const availableDayIcons = await Locatore.availableDayIcon;
        const dateElements = await Locatore.dateElement;
        console.log(`Found ${availableDayIcons.length} available icons.`);
        console.log(`Found ${dateElements.length} date elements.`);
        const availableDates: { day: number, element: WebdriverIO.Element }[] = [];
        for (let i = 0; i < availableDayIcons.length && i < dateElements.length; i++) {
            try {
                const icon = availableDayIcons[i];
                const dateElement = dateElements[i];
                const dayText = await dateElement.getAttribute('name');
                const dayNumber = parseInt(dayText);
                if (!isNaN(dayNumber)) {
                    availableDates.push({ day: dayNumber, element: icon });
                }
            } catch (err) {
                console.warn(`⚠️ Skipping index ${i}: couldn't get date`, err);
            }
        }
        // Sort by day
        availableDates.sort((a, b) => a.day - b.day);
        let clicked = false;
        for (const { day, element } of availableDates) {
            try {
                console.log(`🟡 Trying to book day: ${day}`);
                await this.actionClass.waitForElementAndClick(element);
                await this.reusableMobilePage.selectOptionIndexFromDropdownMobile(await Locatore.selectCarDropdown, 0, MobileData.Booking_Spot.Select_Car);
                await this.actionClass.waitForElementAndClick(await Locatore.btnGetRandomSpace);
                await browser.pause(5000);
                const bookingCount = await Locatore.countBookedSpot;
                const actualCount = bookingCount[0];
                await this.actionClass.assertElementTextEqualsWithLocator(actualCount, '1');
                console.log(`✅ Booking successful on day ${day}`);
                clicked = true;
                break;
            } catch (err) {
                console.warn(`❌ Booking failed on day ${day}, checking next...`);
            }
        }
        if (!clicked) {
            console.error(`❌ No available spot found on next month`);
        }
        console.log("<<================================================================>>");
    }

    async VerifyCreditValue() {
        await this.actionClass.waitForElementAndClick(await Locatore.profileIcon);
        const creditValue = await this.getCreditValue();
        if (creditValue !== null) {
            console.log(`\nCurrent Displayed Credit: ${creditValue}`);
        } else {
            console.log('\nCredit system is NOT Enabled.  Skipping credit checks.On Dashboard.');
        }
        await this.actionClass.waitForElementAndClick(await Locatore.iconCalendar)
        console.log("<<================================================================>>");
        return creditValue;
    }

    async getCreditValue() {
        const creditLocator = await $(Locatore.creditCount);
        const isPresent = await creditLocator.isExisting();
        if (!isPresent) {
            console.log('Credit element not found.');
            return null;
        }
        const isVisible = await creditLocator.isDisplayed();
        if (!isVisible) {
            console.log('Credit element is not visible.');
            return null;
        }
        const text = await creditLocator.getText();
        const value = parseFloat(text.trim() || '0');
        if (isNaN(value)) {
            console.log('Could not parse credit value.');
            return null;
        }
        return value;
    }

    async expectCreditChange(
        before: number | null,
        after: number | null,
        expectedChange: number,
        context = ''
    ) {
        if (before === null || after === null) {
            console.warn(`⚠️ Skipping credit check — credit value not available. ${context}`);
            return;
        }

        console.log('\n📲 [MOBILE CREDIT VALIDATION]');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`💳 Credits Before:       ${before}`);
        console.log(`🧾 Expected Deduction:   -${expectedChange}`);
        console.log(`💰 Credits After:        ${after}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const actualChange = Number((before - after).toFixed(2)); // handle float precision
        const expected = Number(expectedChange.toFixed(2));

        try {
            expect(actualChange).toBe(expected);
            console.log(`✅ Credit change validated: ${expected} (${context})`);
        } catch (error) {
            console.error(`❌ Credit change mismatch! Expected: ${expected}, Got: ${actualChange} (${context})`);
            throw error; // rethrow to let test fail
        }

        console.log("✅ Credit validation complete.\n<<==============================================>>\n");
    }

    async bookSpotForTeamMemberCurrentDayFromCalendar() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Booking Spot for Current Day...");
        console.log("--------------------------------------------------------------------");
        await browser.pause(2000);
        const todayDay = dayjs().date().toString();
        console.log(`\nToday's Date :- ${todayDay}`);
        let clicked = false;
        const todayElement = await $(`(//XCUIElementTypeStaticText[@name="${todayDay}"])[1]`);
        if (await todayElement.isDisplayed()) {
            await this.actionClass.waitForElementAndClick(todayElement);
            await this.reusableMobilePage.selectOptionIndexFromDropdownMobile(await Locatore.selectCarDropdown, 0, MobileData.Booking_Spot.Select_Car);
            await this.actionClass.waitForElementAndClick(await Locatore.btnGetRandomSpace);
            await browser.pause(5000);
            const bookedSpots = await Locatore.countBookedSpot;
            const bookedCount = bookedSpots.length;
            if (bookedCount > 0) {
                console.log(`✅ Spot successfully booked. Total booked spots: ${bookedCount}`);
                clicked = true;
            } else {
                console.error("❌ Booking failed: No booked spot detected after action.");
            }
            await this.actionClass.waitForElementAndClick(todayElement);
            await this.actionClass.waitForElementAndClick(await Locatore.btnCancleBooking);
            await this.actionClass.waitForElementAndClick(await Locatore.btnBack);
        }
        else {
            console.error(`❌ Unable to find today's calendar element for day: ${todayDay}`);
        }
        if (!clicked) {
            throw new Error(`Booking not completed for today (${todayDay}).`);
        }
        console.log("\n<<================== ✅ Booking Process Completed ==================>>\n");
    }

    async bookSpotCurruntDayFromMap() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Booking Spot for Current Day...");
        console.log("--------------------------------------------------------------------");
        await browser.pause(2000);
        const todayDay = dayjs().date().toString();
        console.log(`\nToday's Date :- ${todayDay}`);
        let clicked = false;
        const todayElement = await $(`(//XCUIElementTypeStaticText[@name="${todayDay}"])[1]`);
        if (await todayElement.isDisplayed()) {
            await this.actionClass.waitForElementAndClick(todayElement);
            await this.reusableMobilePage.selectOptionIndexFromDropdownMobile(await Locatore.selectCarDropdown, 0, MobileData.Booking_Spot.Select_Car);
            await this.actionClass.waitForElementAndClick(await Locatore.btnGetRandomSpace);
            await browser.pause(5000);
            const bookedSpots = await Locatore.countBookedSpot;
            const bookedCount = bookedSpots.length;
            if (bookedCount > 0) {
                console.log(`✅ Spot successfully booked. Total booked spots: ${bookedCount}`);
                clicked = true;
            } else {
                console.error("❌ Booking failed: No booked spot detected after action.");
            }
            await this.actionClass.waitForElementAndClick(todayElement);
            await this.actionClass.waitForElementAndClick(await Locatore.btnCancleBooking);
            await this.actionClass.waitForElementAndClick(await Locatore.btnBack);
        }
        else {
            console.error(`❌ Unable to find today's calendar element for day: ${todayDay}`);
        }
        if (!clicked) {
            throw new Error(`Booking not completed for today (${todayDay}).`);
        }
        console.log("\n<<================== ✅ Booking Process Completed ==================>>\n");
    }

}
export default ClaimReleaseiOSPage;