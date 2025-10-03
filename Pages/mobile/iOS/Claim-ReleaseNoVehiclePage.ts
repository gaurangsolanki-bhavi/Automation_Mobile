import Actions from '../../ActionWaitMob';
import Locatore from './LocatoreiOSPage';
import ReusableMobilePage from '../../ReusableMobilePage';
import ElementsName from "../../../test-data/JSON/Elements_Name.json"
import dayjs from 'dayjs';
import MobileData from '../../../test-data/JSON/MobileTestData.json';
import { testConfig } from '../../../wdio.conf';

class ClaimReleaseNoVehicle {
    actionClass: Actions;
    reusableMobilePage: ReusableMobilePage;

    constructor() {
        this.actionClass = new Actions();
        this.reusableMobilePage = new ReusableMobilePage();
    }

    async closePopupAddVehicle() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Closing Popup Add Vehicle");
        console.log("--------------------------------------------------------------------");
        const modal = await $('//XCUIElementTypeOther[contains(@name, "Hold on")]');
        await driver.execute('mobile: swipe', {
            elementId: modal.elementId,
            direction: 'down'
        });
    }

    async navigateToCalandar() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Navigating to Calendar Page...");
        console.log("--------------------------------------------------------------------");
        await browser.pause(3000);
        await this.actionClass.waitForElementAndClick(await Locatore.iconCalendar);
        console.log("\nCalendar page opened successfully.");
    }

    async bookSpotCurrentDayFromCalendar() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Booking Spot for Current Day...");
        console.log("--------------------------------------------------------------------");
        await browser.pause(5000);
        const todayDay = dayjs().date().toString();
        console.log(`\nToday's Date :- ${todayDay}`);
        const todayElement = await $(`(//XCUIElementTypeStaticText[@name="${todayDay}"])[1]`);
        if (await todayElement.isDisplayed()) {
            try {
                await this.actionClass.waitForElementAndClick(todayElement);
                await browser.pause(3000);
                try {
                    const monthHeader = await Locatore.month_header;
                    const isHeaderVisible = await monthHeader.isDisplayed();

                    if (!isHeaderVisible) {
                        throw new Error("❌ App crashed after clicking today's date.");
                    } else {
                        throw new Error("ℹ️ Booking is not available for today's date or No Vehicle is available.");
                    }
                } catch (err) {
                    throw err;
                }
            } catch (err) {
                throw err;
            }
        } else {
            throw new Error(`❌ Could not find today's date (${todayDay}) in calendar.`);
        }
    }
}
export default ClaimReleaseNoVehicle;