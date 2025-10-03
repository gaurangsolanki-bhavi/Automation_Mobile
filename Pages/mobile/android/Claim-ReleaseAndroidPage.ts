import Actions from '../../ActionWaitMob';
import Locatore from './LocatorePage';
import ReusableMobilePage from '../../ReusableMobilePage';
import ElementsName from "../../../test-data/JSON/Elements_Name.json"
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
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Vehicle is already added, No need to add a new vehicle.");
        console.log("--------------------------------------------------------------------");
        await browser.pause(3000);
        console.log("\nClicking on 'Profile' icon...");
        await this.actionClass.waitForElementAndClick(await Locatore.profileIcon);
        console.log("\nClicking on 'Edit Profile' button...");
        await this.actionClass.waitForElementAndClick(await Locatore.editProfile);
        console.log("\nScrolling to 'Add a Vehicle' button...");
        const btnAddVehicle = await Locatore.btnAddVehicle;
        await this.actionClass.scrollToTextAndroid('Delete my account');
        console.log("Scrolling completed.");
        await browser.pause(3000);
        console.log("\nChecking for existing vehicles...");
        const vehicles = await Locatore.vehicles;
        const vehicleInputs = Locatore.check_First_Vehicle;

        if (vehicles.length === 0) {
            console.log("❌ No vehicle found.");
        } else {
            await this.actionClass.waitForElementVisible(vehicles[0]);
            const vehicleCount = vehicles.length;
            const vehicleInputsCount = vehicleInputs.length;
            console.log("\n**********************************");
            console.log(`Total Available Vehicles Found: ${vehicleCount}`);
            console.log("**********************************");
            for (let i = 0; i < await vehicleInputsCount; i++) {
                const vehicleValue = await vehicleInputs[i].getText() || '';
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
        await this.actionClass.waitForElementAndClick(await Locatore.backButton);
        console.log("\nClicking on 'Calendar' icon...");
        await this.actionClass.waitForElementAndClick(await Locatore.CalendarNavigationBarItemIcon);
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
        const todayElement = await $(`(//android.widget.TextView[@text="${todayDay}"])[1]`);
        if (await todayElement.isDisplayed()) {
            await this.actionClass.waitForElementAndClick(todayElement);
            const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short' };
            const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(new Date());
            const weekday = parts.find(p => p.type === 'weekday')?.value;
            const day = parts.find(p => p.type === 'day')?.value;
            const month = parts.find(p => p.type === 'month')?.value;
            const formattedDate = `${weekday} ${day} ${month}`;
            const expectedText = `Book a space for ${formattedDate.replace(' ', ', ')}?`;
            console.log(`🗓️ Expecting text: ${expectedText}`);
            const element = await Locatore.textCurrentDate;
            const fullText = await element.getText();
            console.log('Full Text From Booking Popup:', fullText)
            await this.actionClass.assertElementTextEquals(fullText, expectedText);
            await this.actionClass.isElementDisplayed(await Locatore.usreNameOnBookingSpot, MobileData.Booking_Spot.User_Name);
            await this.actionClass.isElementDisplayed(await Locatore.creditAndStarIcon, MobileData.Booking_Spot.Credit_Star_Icon);
            const deductCreditOnBooking = (await Locatore.creditAndStarIcon).getAttribute('text');
            await this.reusableMobilePage.selectOptionIndexFromDropdownMobile(await Locatore.selectCarDropdown, 0, MobileData.Booking_Spot.Select_Car);
            await this.actionClass.isElementDisplayed(await Locatore.imageParkingOnBookingSpot, MobileData.Booking_Spot.Image_Parking);
            await this.actionClass.waitForElementAndClick(await Locatore.btnGetRandomSpace);
            // await browser.pause(5000);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loaderBooking);
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
            // const zone = await this.loadUserData();
            const txtZone = (await ((await Locatore.textZone).getAttribute('text'))).trim();
            await this.actionClass.assertElementTextEquals(txtZone, zone);
            const spotTimeAndDate = (await (await Locatore.textSpotTimeWithDate).getAttribute('text')).trim();
            await this.actionClass.assertElementTextEquals(spotTimeAndDate, `All day, ${formattedDate}`);
            await browser.pause(2000);
            await this.actionClass.isElementDisplayed(await Locatore.userNameonManageBooking, MobileData.Booking_Spot.User_Name2);
            await this.actionClass.isElementDisplayed(await Locatore.creditAndStarIcon, MobileData.Booking_Spot.Credit_Star_Icon);
            await this.actionClass.isElementDisplayed(await Locatore.btnCheckIn, MobileData.Booking_Spot.Button_CheckIn);
            await this.actionClass.waitForElementAndClick(await Locatore.btnCancleBooking);
            const txtCancel = (await (await Locatore.textCancelBooking).getAttribute('text')).trim();
            expect(txtCancel).toContain(MobileData.Booking_Spot.Cancel_Booking_Header);
            await this.actionClass.isElementDisplayed(await Locatore.usreNameOnBookingSpot, MobileData.Booking_Spot.User_Name3);
            const txtDate = (await (await Locatore.textDateOnCancelBooking).getAttribute('text')).trim();
            const expectedDate = `${formattedDate.replace(' ', ', ')}`;
            await this.actionClass.assertElementTextEquals(txtDate, expectedDate);
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
            await this.actionClass.waitForElementAndClick(await Locatore.next_month_button);
            // await browser.pause(7000);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
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
                const dayText = await dateElement.getAttribute('text');
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
                await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
                await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loaderBooking);
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

    async bookSpotForTeamMemberCurrentDayFromCalendar() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Booking Spot for Current Day...");
        console.log("--------------------------------------------------------------------");
        await browser.pause(2000);
        const todayDay = dayjs().date().toString();
        console.log(`\nToday's Date :- ${todayDay}`);
        let clicked = false;
        const todayElement = await $(`(//android.widget.TextView[@text="${todayDay}"])[1]`);
        if (await todayElement.isDisplayed()) {
            await this.actionClass.waitForElementAndClick(todayElement);
            await this.reusableMobilePage.selectOptionIndexFromDropdownMobile(await Locatore.selectCarDropdown, 0, MobileData.Booking_Spot.Select_Car);
            await this.actionClass.waitForElementAndClick(await Locatore.btnGetRandomSpace);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
            await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loaderBooking);
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

   /* async bookSpotForNext10Days(zone: string) {
        console.log("\n--------------------------------------------------------------------");
        console.log("Booking Spot for Current + Next 9 Days...");
        console.log("--------------------------------------------------------------------");

        const results: { date: string; status: string; credit?: string }[] = [];
        await browser.pause(5000);
        const targetDate = dayjs();
        const dayNumber = targetDate.date().toString();
        const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short' };
        const formattedDate = targetDate.toDate().toLocaleDateString('en-GB', options).replace(',', '');
        console.log(`\n📅 Attempting booking for: ${formattedDate}`);

        let clicked = false;

        let dayElement = await $(`(//android.widget.TextView[@text="${dayNumber}"])[1]`);
        if (await dayElement.isDisplayed()) {
            await this.actionClass.waitForElementAndClick(dayElement);
            await this.actionClass.waitForElementAndClick(await Locatore.btnGetRandomSpace);
        } else {
            console.error(`❌ Unable to find calendar element for day: ${dayNumber} even after moving to next month`);
            results.push({ date: formattedDate, status: 'Not Found' });
        }
        if (!clicked) {
            console.warn(`⚠️ Booking not completed for ${formattedDate}`);
        }

        // Get all available day elements
        await browser.pause(5000);
        let availableDays = await $$(`//android.view.ViewGroup[android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/availableSpotIv"]]/android.widget.TextView`);

        if (availableDays.length === 0) {
            console.warn(`⚠️ No available days found in current month. Navigating to next month...`);

            await this.actionClass.waitForElementAndClick(await Locatore.next_month_button);
            await browser.pause(3000);

            // Retry after switching month
            availableDays = await $$(`//android.view.ViewGroup[android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/availableSpotIv"]]/android.widget.TextView`);
        }

        if (availableDays.length > 0) {
            for (let i = 0; i < availableDays.length; i++) {
                const dayElement = availableDays[i];
                const dayText = await dayElement.getText();

                try {
                    if (await dayElement.isDisplayed()) {
                        console.log(`✅ Clicking available day: ${dayText}`);
                        await this.actionClass.waitForElementAndClick(dayElement);
                        await browser.pause(2000); // Let the day selection process

                        await this.actionClass.waitForElementAndClick(await Locatore.btnGetRandomSpace);

                        results.push({ date: dayText, status: 'Booked' });
                        clicked = true;
                        // break; // Stop after first successful booking, or remove if you want to book ALL
                    }
                } catch (err) {
                    console.error(`❌ Error interacting with available day ${dayText}: ${err}`);
                    results.push({ date: dayText, status: 'Error' });
                }
            }
        } else {
            console.error(`❌ No available days found even after moving to next month`);
            results.push({ date: formattedDate, status: 'Not Found' });
        }

        if (!clicked) {
            console.warn(`⚠️ Booking not completed for ${formattedDate}`);
        }


        // for (let i = 0; i < 10; i++) {

        //     let availableDay = await $(`//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/availableSpotIv"]//following-sibling::android.widget.TextView[1]`);

        //     if (!(await availableDay.isExisting())) {
        //         console.warn(`⚠️ Day ${dayNumber} not found in current month. Navigating to next month...`);

        //         // Go to next month (replace with your actual locator)
        //         await this.actionClass.waitForElementAndClick(await Locatore.next_month_button);
        //         await browser.pause(3000);

        //         // Retry after switching month
        //         availableDay = await $(`//android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/availableSpotIv"]//following-sibling::android.widget.TextView[1]`);
        //     }

        //     if (await availableDay.isDisplayed()) {
        //         await this.actionClass.waitForElementAndClick(availableDay);
        //         await this.actionClass.waitForElementAndClick(await Locatore.btnGetRandomSpace);
        //     } else {
        //         console.error(`❌ Unable to find calendar element for day: ${dayNumber} even after moving to next month`);
        //         results.push({ date: formattedDate, status: 'Not Found' });
        //     }

        //     if (!clicked) {
        //         console.warn(`⚠️ Booking not completed for ${formattedDate}`);
        //     }

        await browser.pause(1000);
        // }

        console.log("\n<<================== ✅ Booking Loop Completed ==================>>\n");
        console.table(results);

        return results;
    } */

    async bookSpotForNext10Days(zone: string) {
    console.log("\n--------------------------------------------------------------------");
    console.log("Booking Spot for Current + Next 9 Days...");
    console.log("--------------------------------------------------------------------");

    const results: { date: string; status: string; credit?: string }[] = [];
    const bookedDates: string[] = [];

    await browser.pause(5000);

    let clicked = false;
    let totalBooked = 0;
    let monthAttempts = 0;

    // Try booking for up to 2 months (adjust as needed)
    while (totalBooked < 11 && monthAttempts < 2) {
        const availableDays = await $$(`//android.view.ViewGroup[android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/availableSpotIv"]]/android.widget.TextView`);

        if (availableDays.length === 0) {
            console.warn(`⚠️ No available days found in current month. Navigating to next month...`);
            await this.actionClass.waitForElementAndClick(await Locatore.next_month_button);
            await browser.pause(3000);
            monthAttempts++;
            continue;
        }

        for (let i = 0; i < availableDays.length; i++) {
            const dayElement = availableDays[i];

            // Refresh the element to avoid stale reference
            const dayText = await dayElement.getText();

            // Skip if already booked
            if (bookedDates.includes(dayText)) {
                continue;
            }

            try {
                if (await dayElement.isDisplayed()) {
                    console.log(`✅ Clicking available day: ${dayText}`);
                    await this.actionClass.waitForElementAndClick(dayElement);
                    await browser.pause(2000);

                    await this.actionClass.waitForElementAndClick(await Locatore.btnGetRandomSpace);
                    await browser.pause(2000);

                    results.push({ date: dayText, status: 'Booked' });
                    bookedDates.push(dayText);
                    clicked = true;
                    totalBooked++;

                    if (totalBooked >= 11) break;
                }
            } catch (err) {
                console.error(`❌ Error booking day ${dayText}: ${err}`);
                results.push({ date: dayText, status: 'Error' });
            }
        }

        // After trying all in current month, move to next
        if (totalBooked < 11) {
            console.log(`➡️ Moving to next month...`);
            await this.actionClass.waitForElementAndClick(await Locatore.next_month_button);
            await browser.pause(3000);
            monthAttempts++;
        }
    }

    if (!clicked) {
        console.warn(`⚠️ No bookings were completed`);
    }

    console.log("\n<<================== ✅ Booking Loop Completed ==================>>\n");
    console.table(results);
    return results;
}

    async bookSpotForMultipleDays(zone: string, requiredBookings: number = 10) {
        console.log("\n--------------------------------------------------------------------");
        console.log(`📌 Booking Spot(s) for Current + Future Months... Required = ${requiredBookings}`);
        console.log("--------------------------------------------------------------------");

        const results: { date: string; status: string; credit?: string }[] = [];
        const bookedDates: string[] = [];

        await browser.pause(5000);

        let totalBooked = 0;
        let monthAttempts = 0;

        while (totalBooked < requiredBookings && monthAttempts < 12) { // safeguard for 12 months
            console.log(`\n📅 Checking Month Attempt: ${monthAttempts + 1}`);

            await this.reusableMobilePage.refreshAndCountDays();

            const availableDays = await $$(
                `//XCUIElementTypeImage[@name="availabeldayicon"]/.. | 
                //android.view.ViewGroup[android.widget.ImageView[@resource-id="ie.jemstone.ronspot:id/availableSpotIv"]]`
            );

            if (availableDays.length === 0) {
                console.warn(`⚠️ No available days found in this month. Moving to next month...`);
                await this.actionClass.waitForElementAndClick(await Locatore.next_month_button);
                await browser.pause(3000);
                monthAttempts++;
                continue;
            }

            for (let i = 0; i < availableDays.length; i++) {
                if (totalBooked >= requiredBookings) break;

                const dayElement = availableDays[i];
                let dayText = "";

                try {
                    dayText = (await dayElement.getText().catch(() => "")) || `Day-${i + 1}`;
                } catch { /* ignore getText error */ }

                // Skip already booked
                if (bookedDates.includes(dayText)) continue;

                try {
                    if (await dayElement.isDisplayed()) {
                        console.log(`✅ Booking available day: ${dayText}`);
                        await this.actionClass.waitForElementAndClick(dayElement);
                        await browser.pause(1500);

                        await this.actionClass.waitForElementAndClick(await Locatore.btnGetRandomSpace);
                        await browser.pause(1500);

                        results.push({ date: dayText, status: "Booked" });
                        bookedDates.push(dayText);
                        totalBooked++;
                    }
                } catch (err) {
                    console.error(`❌ Error booking day ${dayText}: ${err}`);
                    results.push({ date: dayText, status: "Error" });
                }
            }

            if (totalBooked < requiredBookings) {
                console.log(`➡️ Moving to next month...`);
                await this.actionClass.waitForElementAndClick(await Locatore.next_month_button);
                await browser.pause(3000);
                monthAttempts++;
            }
        }

        if (totalBooked === 0) {
            console.warn(`⚠️ No bookings were completed`);
        }

        console.log("\n<<================== ✅ Booking Loop Completed ==================>>\n");
        console.table(results);
        return results;
    }  //20 booked spot

}
export default ClaimReleaseiOSPage;