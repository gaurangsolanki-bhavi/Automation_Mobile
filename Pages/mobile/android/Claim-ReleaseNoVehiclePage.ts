import Actions from '../../ActionWaitMob';
import Locatore from './LocatorePage';
import ReusableMobilePage from '../../ReusableMobilePage';
import ElementsName from "../../../test-data/JSON/Elements_Name.json"
import dayjs from 'dayjs';
import MobileData from '../../../test-data/JSON/MobileTestData.json';
import { testConfig } from '../../../wdio.conf';

class ClaimReleaseNoVehiclePage {
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
        await browser.pause(3000);
        const modalContainer = await $('//android.widget.TextView[contains(@text,"Hold on")]');
        if (await modalContainer.isDisplayed()) {
            await driver.back();
            await browser.pause(1000);
        }
    }

    async navigateToCalandar() {
        console.log("\n");
        console.log("--------------------------------------------------------------------");
        console.log("Navigating to Calendar Page...");
        console.log("--------------------------------------------------------------------");
        await browser.pause(3000);
        await this.actionClass.waitForElementAndClick(await Locatore.CalendarNavigationBarItemIcon);
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
        let clicked = false;
        const todayElement = await $(`(//android.widget.TextView[@text="${todayDay}"])[1]`);
        if (await todayElement.isDisplayed()) {
            try {
                await this.actionClass.waitForElementAndClick(todayElement);
                await browser.pause(3000);
                try {
                    const monthHeader = await Locatore.month_header;
                    const isHeaderVisible = await monthHeader.isDisplayed();

                    if (!isHeaderVisible) {
                        const isPopupVisible = await (await Locatore.errorPopup).isDisplayed();
                        if (isPopupVisible) {
                            const popupText = await Locatore.errorPopupText.getText();
                            await this.actionClass.assertElementTextEquals(popupText, MobileData.PopUp_Messages.Calendar_No_Vehicle);
                            await this.actionClass.waitForElementAndClick(await Locatore.btnConfirm);
                        } else {
                            const appState = await driver.queryAppState("ie.jemstone.ronspot");
                            if (appState !== 4) {
                                throw new Error(`❌ App crashed or not in foreground. State code: ${appState}`);
                            }
                        }
                    } else {
                        const isHeaderVisible = await monthHeader.isDisplayed();
                        if (!isHeaderVisible) {
                            throw new Error("❌ App crashed after clicking today's date.");
                        } else {
                            console.log("ℹ️ Month header is visible Booking is not available for today's date");
                        }
                    }
                } catch (err) {
                    throw err;
                }
            } catch (err) {
                console.error("🚨 Error while verifying app state:", err);
                throw err;
            }
        } else {
            throw new Error(`❌ Could not find today's date (${todayDay}) in calendar.`);
        }
    }
}
export default ClaimReleaseNoVehiclePage;