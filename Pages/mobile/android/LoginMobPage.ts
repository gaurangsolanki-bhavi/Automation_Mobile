import Actions from '../../ActionWaitMob';
import Locatore from './LocatorePage';
import ReusableMobilePage from '../../../Pages/ReusableMobilePage';
import path from 'path';
import ElementsName from "../../../test-data/JSON/Elements_Name.json";
import MobileData from '../../../test-data/JSON/MobileTestData.json'


class LoginActionsAndroid extends Actions {

  actionClass: Actions;
  reusableMobilePage = new ReusableMobilePage();
  currentUser: any;
  zone: any;
  gridDeskZone: any;
  mapCarZone: any;
  email: any;
  password: any;

  constructor() {
    super();
    this.actionClass = new Actions();
    this.reusableMobilePage = new ReusableMobilePage();
  }

  async initializeAppAndLoginFromExcel(sheetName: string, filePath: string, maxRetries: number = 1): Promise<any> {
    let attempt = 0;
    let lastError: Error | null = null;
    const screenshotDir = './error-screenshots';

    while (attempt <= maxRetries) {
      try {
        console.log(`Attempt ${attempt + 1}: Launching app...`);

        await driver.execute('mobile: activateApp', {
          appId: 'ie.jemstone.ronspot',
        });
        await driver.pause(100000);
        const loginBtn = await (await Locatore.loginBtn).isDisplayed().catch(() => false);
        let user: any = null;
        if (loginBtn) {

          console.log('App launched. Proceeding with login...');
          user = await this.loginWithExcelUser(sheetName, filePath);
        }

        // 🚫 Check for fatal login error popup FIRST
        const isPopupVisible = await (await Locatore.errorPopup).isDisplayed().catch(() => false);
        if (isPopupVisible) {
          const messageText = await Locatore.errorPopupText.getText().catch(() => 'Unable to retrieve error text');
          console.log('❌ Login failed: Error popup detected.');
          console.log(`🔴 Error Message: ${messageText}`);
          await driver.saveScreenshot(`${screenshotDir}/login-failed-${Date.now()}.png`);
          throw new Error(`Login failed due to error popup. Message: ${messageText}`);
        }

        await browser.pause(5000);
        await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        const selector = '//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/titleTxt" and contains(@text, "Hi")]';
        const isLoggedIn = await $(selector).isDisplayed().catch(() => false);

        if (isLoggedIn) {
          console.log(`✅ User already logged in. Skipping login and stopping further attempts.`);
           if (!user) {
            console.log('🔄 Reading user from Excel to return context...');
            user = await this.reusableMobilePage.getUserByIndex(sheetName, filePath, 0);
          }
          return user;
        }

        await browser.pause(5000);
        const noVehiclesRegistered = await Locatore.popupNoVehiclesRegistered.isExisting()
          .then(exists => exists && Locatore.popupNoVehiclesRegistered.isDisplayed())
          .catch(() => false);
        if (noVehiclesRegistered) {
          console.log("\n");
          console.log("--------------------------------------------------------------------");
          console.log("\nNo vehicles registered. Adding a new vehicle...");
          console.log("--------------------------------------------------------------------");
          const carplateNumber = await this.reusableMobilePage.generateRandomNumber();
          await this.actionClass.clearAndSendKey(await Locatore.addVehicleNumber, carplateNumber);
          //await this.actionClass.waitForElementAndClick(await Locatore.btnDone);
          await this.hideKeyboardIfVisible();
          await this.reusableMobilePage.selectOptionFromDropdownMobile(await Locatore.select_Vehicle_Size, ElementsName.DropDowns.Vehicle_Size);
          await this.reusableMobilePage.selectOptionFromDropdownMobile(await Locatore.select_Vehicle_Fuel, ElementsName.DropDowns.Fuel_Type);
          /* const isAccessibilityDropdown = await Locatore.select_Vehicle_Accessibility.isExisting();
           if (isAccessibilityDropdown) {
             await this.reusableMobilePage.selectDropdownOptionByValueMobile(await Locatore.select_Vehicle_Accessibility,'Reduced mobility');
             // await browser.pause(3000);
             await this.actionClass.swipeUpIOS();
             await this.reusableMobilePage.selectDropdownOptionByValueMobile(await Locatore.select_Vehicle_Sharing,'Company car');
           } */
          await this.actionClass.waitForElementAndClick(await Locatore.popUpBtnSave_Vehicle);
          await browser.pause(3000);
        }
        return user;
      } catch (error: any) {
        lastError = error;

        if (error.message?.includes('Login failed due to error popup')) {
          console.error(`❌ Fatal login error: ${error.message} (will not retry)`);
          throw error;
        }

        console.error(`Error on attempt ${attempt + 1}: ${error.message}`);
        await driver.saveScreenshot(`${screenshotDir}/failure-${Date.now()}.png`);

        if (attempt < maxRetries) {
          console.log('Closing and retrying...');
          await driver.execute('mobile: terminateApp', {
            appId: 'ie.jemstone.ronspot.view.activities.SplashActivity'
          });
          await driver.pause(2000);
        }
        attempt++;
      }
    }

    throw new Error(`Failed after ${maxRetries + 1} attempts: ${lastError?.message}`);
  }

   async loginWithExcelUser(sheetName: string, filePath: string): Promise<any> {
    const user = await this.reusableMobilePage.getUserByIndex(sheetName, filePath, 0);
    this.currentUser = user;
    this.zone = user.ZONE;
    this.gridDeskZone = user.GRID_DESK_ZONE;
    this.mapCarZone = user.MAP_CAR_ZONE;
    this.email = user.Email;
    this.password = user.Password;

    await this.loginWithEmail(this.email, this.password);
    return user;
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log('Trying Login With :', email);
    console.log("--------------------------------------------------------------------");

    console.log('Clicking initial login button');
    await this.waitForElementAndClick(await Locatore.loginBtn);
    await browser.pause(2000);
    console.log('Entering email');
    // await this.waitForElementAndClick(await Locatore.withoutAccountGmailButton);
    await this.waitForElementAndClick(await Locatore.emailInput);

    await this.clearAndSendKey(await Locatore.emailInput, email);

    console.log('Hide Keyboard');
    await this.hideKeyboardIfVisible();

    console.log('Selecting employee radio option');
    await this.waitForElementAndClick(await Locatore.radioEmployeeOption);
    await browser.pause(2000);
    console.log('Clicking confirm email button');
    await this.waitForElementAndClick(await Locatore.confirmEmailBtn);
    await browser.pause(15000);
    console.log('Clicking continue with email button');
    await this.waitForElementAndClick(await Locatore.continueWithEmailBtn);
    await browser.pause(3000);
    console.log('Entering password');
    await this.clearAndSendKey(await Locatore.passwordInput, password);

    console.log('Hide Keyboard');
    await this.hideKeyboardIfVisible();
    await browser.pause(3000);
    console.log('Clicking login submit button');
    await this.waitForElementAndClick(await Locatore.loginSubmitBtn);
    await browser.pause(5000);

    console.log('Handling confirmation popup');
    await this.waitForElementAndClick(await Locatore.clickHereButtonOrOk);
    await browser.pause(3000);
    const isSavePasswordPopupVisible = await (await Locatore.savePasswordPopupFirefox).isDisplayed().catch(() => false);
    if (isSavePasswordPopupVisible) {
      await this.waitForElementAndClick(await Locatore.savePasswordPopupFirefox);
    }
    await this.waitForElementAndClick(await Locatore.btnClickHereFirefox);
    console.log("--------------------------------------------------------------------");

  }

  async initializeAppAndGmailLoginFromExcel(sheetName: string, filePath: string, maxRetries: number = 1): Promise<any> {
    let attempt = 0;
    let lastError: Error | null = null;
    const screenshotDir = './error-screenshots';

    while (attempt <= maxRetries) {
      try {
        console.log(`Attempt ${attempt + 1}: Launching app...`);

        await driver.execute('mobile: activateApp', {
          appId: 'ie.jemstone.ronspot',
        });

        const loginBtn = await (await Locatore.loginBtn).isDisplayed().catch(() => false);
        let user: any = null;
        if (loginBtn) {
          console.log('App launched. Proceeding with login...');
          user = await this.loginWithExcelGmailUser(sheetName, filePath);
        }
        else {
          await this.logoutUser();
        }

        // 🚫 Check for fatal login error popup FIRST
        const isPopupVisible = await (await Locatore.errorPopup).isDisplayed().catch(() => false);
        if (isPopupVisible) {
          const messageText = await Locatore.errorPopupText.getText().catch(() => 'Unable to retrieve error text');
          console.log('❌ Login failed: Error popup detected.');
          console.log(`🔴 Error Message: ${messageText}`);
          await driver.saveScreenshot(`${screenshotDir}/login-failed-${Date.now()}.png`);
          throw new Error(`Login failed due to error popup. Message: ${messageText}`);
        }

        await browser.pause(5000);
         await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        const selector = '//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/titleTxt" and contains(@text, "Hi")]';
        const isLoggedIn = await $(selector).isDisplayed().catch(() => false);

        if (isLoggedIn) {
          console.log(`✅ User already logged in. Skipping login and stopping further attempts.`);
          if (!user) {
            console.log('🔄 Reading user from Excel to return context...');
            user = await this.reusableMobilePage.getUserByIndex(sheetName, filePath, 0);
          }
          return user;
        }

        const loginBtn1 = await (await Locatore.loginBtn).isDisplayed().catch(() => false);
        if (loginBtn1) {

          console.log('App launched. Proceeding with login...');
          await this.loginWithExcelGmailUser(sheetName, filePath);
        }

        await browser.pause(5000);
        const noVehiclesRegistered = await Locatore.popupNoVehiclesRegistered.isExisting()
          .then(exists => exists && Locatore.popupNoVehiclesRegistered.isDisplayed())
          .catch(() => false);
        if (noVehiclesRegistered) {
          console.log("\n");
          console.log("--------------------------------------------------------------------");
          console.log("\nNo vehicles registered. Adding a new vehicle...");
          console.log("--------------------------------------------------------------------");
          const carplateNumber = await this.reusableMobilePage.generateRandomNumber();
          await this.actionClass.clearAndSendKey(await Locatore.addVehicleNumber, carplateNumber);
          //await this.actionClass.waitForElementAndClick(await Locatore.btnDone);
          await this.hideKeyboardIfVisible();
          await this.reusableMobilePage.selectOptionFromDropdownMobile(await Locatore.select_Vehicle_Size, ElementsName.DropDowns.Vehicle_Size);
          await this.reusableMobilePage.selectOptionFromDropdownMobile(await Locatore.select_Vehicle_Fuel, ElementsName.DropDowns.Fuel_Type);
          /* const isAccessibilityDropdown = await Locatore.select_Vehicle_Accessibility.isExisting();
           if (isAccessibilityDropdown) {
             await this.reusableMobilePage.selectDropdownOptionByValueMobile(await Locatore.select_Vehicle_Accessibility,'Reduced mobility');
             // await browser.pause(3000);
             await this.actionClass.swipeUpIOS();
             await this.reusableMobilePage.selectDropdownOptionByValueMobile(await Locatore.select_Vehicle_Sharing,'Company car');
           } */
          await this.actionClass.waitForElementAndClick(await Locatore.popUpBtnSave_Vehicle);
          await browser.pause(3000);
        }
        return user;
      } catch (error: any) {
        lastError = error;

        if (error.message?.includes('Login failed due to error popup')) {
          console.error(`❌ Fatal login error: ${error.message} (will not retry)`);
          throw error;
        }

        console.error(`Error on attempt ${attempt + 1}: ${error.message}`);
        await driver.saveScreenshot(`${screenshotDir}/failure-${Date.now()}.png`);

        if (attempt < maxRetries) {
          console.log('Closing and retrying...');
          await driver.execute('mobile: terminateApp', {
            appId: 'ie.jemstone.ronspot.view.activities.SplashActivity'
          });
          await driver.pause(2000);
        }
        attempt++;
      }
    }

    throw new Error(`Failed after ${maxRetries + 1} attempts: ${lastError?.message}`);
  }

  async loginWithGmail(email: string, password: string): Promise<void> {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log('Trying Gmail Login With :', email);
    console.log("--------------------------------------------------------------------");

    console.log('Clicking initial login button');
    await this.waitForElementAndClick(await Locatore.loginBtn);

    console.log('Entering email');
    await this.waitForElementAndClick(await Locatore.withoutAccountGmailButton);
    await this.waitForElementAndClick(await Locatore.emailInput);
    await this.clearAndSendKey(await Locatore.emailInput, email);
    await browser.pause(2000);  
    console.log('Hide Keyboard');
    await this.hideKeyboardIfVisible();
    await browser.pause(2000);  

    console.log('Selecting employee radio option');
    await this.waitForElementAndClick(await Locatore.radioEmployeeOption);
    await browser.pause(2000);  
    console.log('Clicking confirm email button');
    await this.waitForElementAndClick(await Locatore.confirmEmailBtn);
    await browser.pause(2000);  
    console.log('Clicking continue with Gmail button');
    await this.waitForElementAndClick(await Locatore.continueWithGmailBtn);
    await browser.pause(2000); 
    const skip = (await Locatore.skipAccountGmailButton).isDisplayed();
    if (await skip) {
      await this.waitForElementAndClick(await Locatore.skipAccountGmailButton);
    }
    await this.waitForElementAndClick(await Locatore.nextGmailButton);

    await driver.pause(4000);

    console.log('Entering password');
    await this.clearAndSendKey(await Locatore.PasswordGmailInbox, password);
    console.log('Hide Keyboard');
    await browser.pause(2000);  
    await this.hideKeyboardIfVisible();
    await browser.pause(2000);  
    await this.waitForElementAndClick(await Locatore.nextGmailButton);
    await browser.pause(10000);
    console.log('Handling confirmation popup');
    await this.waitForElementAndClick(await Locatore.clickHereButtonOrOk);
    console.log("--------------------------------------------------------------------");


  }

  async logoutUser() {
    console.log("\n")
    console.log("---------------------------------------");
    console.log("Attempting to log out the user...");
    console.log("Clicking on 'Profile' icon...");
    await this.actionClass.waitForElementAndClick(await Locatore.profileIcon);
    console.log("Profile Page opened successfully.");
    await driver.pause(2000);
    await this.actionClass.simpleScrollAndroid('up');
    console.log("Scrolling completed.");
    console.log("Navigating to Logout Confirmation Popup...");
    await this.actionClass.waitForElementAndClick(await Locatore.logoutMenuText);
    console.log("Clicking on the logout button in the popup...");
    await this.actionClass.waitForElementAndClick(await Locatore.popupLogoutBtn);
    console.log("✅ User has been logged out successfully.");
    console.log("------------------------------------------");
    console.log("\n");
    await driver.pause(5000);

  }

  async loginWithExcelGmailUser(sheetName: string, filePath: string): Promise<any> {
    const user = await this.reusableMobilePage.getUserByIndex(sheetName, filePath, 0);
    this.currentUser = user;
    this.zone = user.ZONE;
    this.gridDeskZone = user.GRID_DESK_ZONE;
    this.mapCarZone = user.MAP_CAR_ZONE;
    this.email = user.Email;
    this.password = user.Password;

    await this.loginWithGmail(this.email, this.password);
    return user;
  }


  async initializeAppAndMSLoginFromExcel(sheetName: string, filePath: string, maxRetries: number = 1): Promise<any> {
    let attempt = 0;
    let lastError: Error | null = null;
    const screenshotDir = './error-screenshots';

    while (attempt <= maxRetries) {
      try {
        console.log(`Attempt ${attempt + 1}: Launching app...`);

        await driver.execute('mobile: activateApp', {
          appId: 'ie.jemstone.ronspot',
        });

        const loginBtn = await (await Locatore.loginBtn).isDisplayed().catch(() => false);
        let user: any = null;
        if (loginBtn) {
          console.log('App launched. Proceeding with login...');
          await this.loginWithExcelMSUser(sheetName, filePath);
        }
        else {
          await this.logoutUser();
        }

        // 🚫 Check for fatal login error popup FIRST
        const isPopupVisible = await (await Locatore.errorPopup).isDisplayed().catch(() => false);
        if (isPopupVisible) {
          const messageText = await Locatore.errorPopupText.getText().catch(() => 'Unable to retrieve error text');
          console.log('❌ Login failed: Error popup detected.');
          console.log(`🔴 Error Message: ${messageText}`);
          await driver.saveScreenshot(`${screenshotDir}/login-failed-${Date.now()}.png`);
          throw new Error(`Login failed due to error popup. Message: ${messageText}`);
        }

        await browser.pause(5000);
        const selector = '//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/titleTxt" and contains(@text, "Hi")]';
        const isLoggedIn = await $(selector).isDisplayed().catch(() => false);

        if (isLoggedIn) {
          console.log(`✅ User already logged in. Skipping login and stopping further attempts.`);
          if (!user) {
            console.log('🔄 Reading user from Excel to return context...');
            user = await this.reusableMobilePage.getUserByIndex(sheetName, filePath, 0);
          }
          return user;
        }

        const loginBtn1 = await (await Locatore.loginBtn).isDisplayed().catch(() => false);
        if (loginBtn1) {

          console.log('App launched. Proceeding with login...');
          await this.loginWithExcelMSUser(sheetName, filePath);
        }

        await browser.pause(5000);
        const noVehiclesRegistered = await Locatore.popupNoVehiclesRegistered.isExisting()
          .then(exists => exists && Locatore.popupNoVehiclesRegistered.isDisplayed())
          .catch(() => false);
        if (noVehiclesRegistered) {
          console.log("\n");
          console.log("--------------------------------------------------------------------");
          console.log("\nNo vehicles registered. Adding a new vehicle...");
          console.log("--------------------------------------------------------------------");
          const carplateNumber = await this.reusableMobilePage.generateRandomNumber();
          await this.actionClass.clearAndSendKey(await Locatore.addVehicleNumber, carplateNumber);
          //await this.actionClass.waitForElementAndClick(await Locatore.btnDone);
          await this.hideKeyboardIfVisible();
          await this.reusableMobilePage.selectOptionFromDropdownMobile(await Locatore.select_Vehicle_Size, ElementsName.DropDowns.Vehicle_Size);
          await this.reusableMobilePage.selectOptionFromDropdownMobile(await Locatore.select_Vehicle_Fuel, ElementsName.DropDowns.Fuel_Type);
          /* const isAccessibilityDropdown = await Locatore.select_Vehicle_Accessibility.isExisting();
           if (isAccessibilityDropdown) {
             await this.reusableMobilePage.selectDropdownOptionByValueMobile(await Locatore.select_Vehicle_Accessibility,'Reduced mobility');
             // await browser.pause(3000);
             await this.actionClass.swipeUpIOS();
             await this.reusableMobilePage.selectDropdownOptionByValueMobile(await Locatore.select_Vehicle_Sharing,'Company car');
           } */
          await this.actionClass.waitForElementAndClick(await Locatore.popUpBtnSave_Vehicle);
          await browser.pause(3000);
        }
        return user;
      } catch (error: any) {
        lastError = error;

        if (error.message?.includes('Login failed due to error popup')) {
          console.error(`❌ Fatal login error: ${error.message} (will not retry)`);
          throw error;
        }

        console.error(`Error on attempt ${attempt + 1}: ${error.message}`);
        await driver.saveScreenshot(`${screenshotDir}/failure-${Date.now()}.png`);

        if (attempt < maxRetries) {
          console.log('Closing and retrying...');
          await driver.execute('mobile: terminateApp', {
            appId: 'ie.jemstone.ronspot.view.activities.SplashActivity'
          });
          await driver.pause(2000);
        }
        attempt++;
      }
    }

    throw new Error(`Failed after ${maxRetries + 1} attempts: ${lastError?.message}`);
  }

  async loginWithExcelMSUser(sheetName: string, filePath: string): Promise<any> {
    const user = await this.reusableMobilePage.getUserByIndex(sheetName, filePath, 0);
    this.currentUser = user;
    this.zone = user.ZONE;
    this.gridDeskZone = user.GRID_DESK_ZONE;
    this.mapCarZone = user.MAP_CAR_ZONE;
    this.email = user.Email;
    this.password = user.Password;

    await this.loginWithMS(this.email, this.password);
    return user;
  }

  async loginWithMS(email: string, password: string): Promise<void> {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log('Trying Microsoft Login With :', email);
    console.log("--------------------------------------------------------------------");

    console.log('Clicking initial login button');
    await this.waitForElementAndClick(await Locatore.loginBtn);

    console.log('Entering email');
    await this.waitForElementAndClick(await Locatore.withoutAccountGmailButton);
    await this.waitForElementAndClick(await Locatore.emailInput);
    await browser.pause(1000);
    await this.clearAndSendKey(await Locatore.emailInput, email);

    console.log('Hide Keyboard');
    await this.hideKeyboardIfVisible();
    await browser.pause(1000);
    console.log('Selecting employee radio option');
    await this.waitForElementAndClick(await Locatore.radioEmployeeOption);

    console.log('Clicking confirm email button');
    await this.waitForElementAndClick(await Locatore.confirmEmailBtn);
    await browser.pause(2000);
    console.log('Clicking continue with Microsoft button');
    await this.waitForElementAndClick(await Locatore.continueWithMicrosoftButton);
     await browser.pause(6000);
    console.log('Entering password');
    await this.clearAndSendKey(await Locatore.passwordMicrosoftInput, password);
    console.log('Hide Keyboard');
    await this.hideKeyboardIfVisible();
    await browser.pause(2000);
    await this.waitForElementAndClick(await Locatore.signInMicrosoftbutton);
    await browser.pause(4000);
    console.log('Handling confirmation popup');
    await driver.execute('mobile: performEditorAction', { action: 'Go' });
    await browser.pause(5000);
    await this.waitForElementAndClick(await Locatore.clickHereButtonOrOk);
    console.log("--------------------------------------------------------------------");

  }

  async initializeAppAndOktaLoginFromExcel(sheetName: string, filePath: string, maxRetries: number = 1): Promise<any> {
    let attempt = 0;
    let lastError: Error | null = null;
    const screenshotDir = './error-screenshots';

    while (attempt <= maxRetries) {
      try {
        console.log(`Attempt ${attempt + 1}: Launching app...`);

        await driver.execute('mobile: activateApp', {
          appId: 'ie.jemstone.ronspot',
        });

        const loginBtn = await (await Locatore.loginBtn).isDisplayed().catch(() => false);
        let user: any = null;
        if (loginBtn) {
          console.log('App launched. Proceeding with login...');
          await this.loginWithExcelOktaUser(sheetName, filePath);
        }
        else {
          await this.logoutUser();
        }

        // 🚫 Check for fatal login error popup FIRST
        const isPopupVisible = await (await Locatore.errorPopup).isDisplayed().catch(() => false);
        if (isPopupVisible) {
          const messageText = await Locatore.errorPopupText.getText().catch(() => 'Unable to retrieve error text');
          console.log('❌ Login failed: Error popup detected.');
          console.log(`🔴 Error Message: ${messageText}`);
          await driver.saveScreenshot(`${screenshotDir}/login-failed-${Date.now()}.png`);
          throw new Error(`Login failed due to error popup. Message: ${messageText}`);
        }

        await browser.pause(5000);
        const selector = '//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/titleTxt" and contains(@text, "Hi")]';
        const isLoggedIn = await $(selector).isDisplayed().catch(() => false);

        if (isLoggedIn) {
          console.log(`✅ User already logged in. Skipping login and stopping further attempts.`);
          if (!user) {
            console.log('🔄 Reading user from Excel to return context...');
            user = await this.reusableMobilePage.getUserByIndex(sheetName, filePath, 0);
          }
          return user;
        }

        const loginBtn1 = await (await Locatore.loginBtn).isDisplayed().catch(() => false);
        if (loginBtn1) {

          console.log('App launched. Proceeding with login...');
          await this.loginWithExcelOktaUser(sheetName, filePath);
        }

        await browser.pause(5000);
        const noVehiclesRegistered = await Locatore.popupNoVehiclesRegistered.isExisting()
          .then(exists => exists && Locatore.popupNoVehiclesRegistered.isDisplayed())
          .catch(() => false);
        if (noVehiclesRegistered) {
          console.log("\n");
          console.log("--------------------------------------------------------------------");
          console.log("\nNo vehicles registered. Adding a new vehicle...");
          console.log("--------------------------------------------------------------------");
          const carplateNumber = await this.reusableMobilePage.generateRandomNumber();
          await this.actionClass.clearAndSendKey(await Locatore.addVehicleNumber, carplateNumber);
          //await this.actionClass.waitForElementAndClick(await Locatore.btnDone);
          await this.hideKeyboardIfVisible();
          await this.reusableMobilePage.selectOptionFromDropdownMobile(await Locatore.select_Vehicle_Size, ElementsName.DropDowns.Vehicle_Size);
          await this.reusableMobilePage.selectOptionFromDropdownMobile(await Locatore.select_Vehicle_Fuel, ElementsName.DropDowns.Fuel_Type);
          /* const isAccessibilityDropdown = await Locatore.select_Vehicle_Accessibility.isExisting();
           if (isAccessibilityDropdown) {
             await this.reusableMobilePage.selectDropdownOptionByValueMobile(await Locatore.select_Vehicle_Accessibility,'Reduced mobility');
             // await browser.pause(3000);
             await this.actionClass.swipeUpIOS();
             await this.reusableMobilePage.selectDropdownOptionByValueMobile(await Locatore.select_Vehicle_Sharing,'Company car');
           } */
          await this.actionClass.waitForElementAndClick(await Locatore.popUpBtnSave_Vehicle);
          await browser.pause(3000);
        }
        return user;
      } catch (error: any) {
        lastError = error;

        if (error.message?.includes('Login failed due to error popup')) {
          console.error(`❌ Fatal login error: ${error.message} (will not retry)`);
          throw error;
        }

        console.error(`Error on attempt ${attempt + 1}: ${error.message}`);
        await driver.saveScreenshot(`${screenshotDir}/failure-${Date.now()}.png`);

        if (attempt < maxRetries) {
          console.log('Closing and retrying...');
          await driver.execute('mobile: terminateApp', {
            appId: 'ie.jemstone.ronspot.view.activities.SplashActivity'
          });
          await driver.pause(2000);
        }
        attempt++;
      }
    }

    throw new Error(`Failed after ${maxRetries + 1} attempts: ${lastError?.message}`);
  }

  async loginWithExcelOktaUser(sheetName: string, filePath: string): Promise<any> {
    const user = await this.reusableMobilePage.getUserByIndex(sheetName, filePath, 0);
    this.currentUser = user;
    this.zone = user.ZONE;
    this.gridDeskZone = user.GRID_DESK_ZONE;
    this.mapCarZone = user.MAP_CAR_ZONE;
    this.email = user.Email;
    this.password = user.Password;

    await this.loginWithOkta(this.email, this.password);
    return user;
  }

  async loginWithOkta(email: string, password: string): Promise<void> {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log('Trying OKTA Login With :', email);
    console.log("--------------------------------------------------------------------");

    console.log('Clicking initial login button');
    await this.waitForElementAndClick(await Locatore.loginBtn);

    console.log('Entering email');
    await this.waitForElementAndClick(await Locatore.withoutAccountGmailButton);
    await this.waitForElementAndClick(await Locatore.emailInput);

    await this.clearAndSendKey(await Locatore.emailInput, email);

    console.log('Hide Keyboard');
    await this.hideKeyboardIfVisible();
    await browser.pause(2000);
    console.log('Selecting employee radio option');
    await this.waitForElementAndClick(await Locatore.radioEmployeeOption);
    await browser.pause(2000);
    console.log('Clicking confirm email button');
    await this.waitForElementAndClick(await Locatore.confirmEmailBtn);
    await driver.pause(5000);
    console.log('Entering Email', email);
    await this.clearAndSendKey(await Locatore.oktaUsernameInput, email);
    console.log('Hide Keyboard');
    await this.hideKeyboardIfVisible();
    console.log('Entering Password', password);
    await browser.pause(2000);
    await this.clearAndSendKey(await Locatore.oktaPasswordInput, password);
    console.log('Hide Keyboard');
    await this.hideKeyboardIfVisible();
    await browser.pause(2000);
    await this.waitForElementAndClick(await Locatore.oktaSigninButton);
    await browser.pause(4000);
    console.log('Handling confirmation popup');
    //await driver.execute('mobile: performEditorAction', { action: 'Go' });
    await browser.pause(5000);
    await this.waitForElementAndClick(await Locatore.clickHereButtonOrOk);
    console.log("--------------------------------------------------------------------");

  }



  async initializeAppAndManualLoginFromExcel(sheetName: string, filePath: string, maxRetries: number = 1): Promise<any> {
    let attempt = 0;
    let lastError: Error | null = null;
    const screenshotDir = './error-screenshots';

    while (attempt <= maxRetries) {
      try {
        console.log(`Attempt ${attempt + 1}: Launching app...`);

        await driver.execute('mobile: activateApp', {
          appId: 'ie.jemstone.ronspot',
        });

        const loginBtn = await (await Locatore.loginBtn).isDisplayed().catch(() => false);
        let user: any = null;
        if (loginBtn) {
          console.log('App launched. Proceeding with login...');
          await this.loginWithExcelManualUser(sheetName, filePath);
        }
        else {
          await this.logoutUser();
        }

        // 🚫 Check for fatal login error popup FIRST
        const isPopupVisible = await (await Locatore.errorPopup).isDisplayed().catch(() => false);
        if (isPopupVisible) {
          const messageText = await Locatore.errorPopupText.getText().catch(() => 'Unable to retrieve error text');
          console.log('❌ Login failed: Error popup detected.');
          console.log(`🔴 Error Message: ${messageText}`);
          await driver.saveScreenshot(`${screenshotDir}/login-failed-${Date.now()}.png`);
          throw new Error(`Login failed due to error popup. Message: ${messageText}`);
        }

        await browser.pause(5000);
        const selector = '//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/titleTxt" and contains(@text, "Hi")]';
        const isLoggedIn = await $(selector).isDisplayed().catch(() => false);

        if (isLoggedIn) {
          console.log(`✅ User already logged in. Skipping login and stopping further attempts.`);
          if (!user) {
            console.log('🔄 Reading user from Excel to return context...');
            user = await this.reusableMobilePage.getUserByIndex(sheetName, filePath, 0);
          }
          return user;
        }

        const loginBtn1 = await (await Locatore.loginBtn).isDisplayed().catch(() => false);
        if (loginBtn1) {

          console.log('App launched. Proceeding with login...');
          await this.loginWithExcelManualUser(sheetName, filePath);
        }

        await browser.pause(5000);
        const noVehiclesRegistered = await Locatore.popupNoVehiclesRegistered.isExisting()
          .then(exists => exists && Locatore.popupNoVehiclesRegistered.isDisplayed())
          .catch(() => false);
        if (noVehiclesRegistered) {
          console.log("\n");
          console.log("--------------------------------------------------------------------");
          console.log("\nNo vehicles registered. Adding a new vehicle...");
          console.log("--------------------------------------------------------------------");
          const carplateNumber = await this.reusableMobilePage.generateRandomNumber();
          await this.actionClass.clearAndSendKey(await Locatore.addVehicleNumber, carplateNumber);
          //await this.actionClass.waitForElementAndClick(await Locatore.btnDone);
          await this.hideKeyboardIfVisible();
          await this.reusableMobilePage.selectOptionFromDropdownMobile(await Locatore.select_Vehicle_Size, ElementsName.DropDowns.Vehicle_Size);
          await this.reusableMobilePage.selectOptionFromDropdownMobile(await Locatore.select_Vehicle_Fuel, ElementsName.DropDowns.Fuel_Type);
          /* const isAccessibilityDropdown = await Locatore.select_Vehicle_Accessibility.isExisting();
           if (isAccessibilityDropdown) {
             await this.reusableMobilePage.selectDropdownOptionByValueMobile(await Locatore.select_Vehicle_Accessibility,'Reduced mobility');
             // await browser.pause(3000);
             await this.actionClass.swipeUpIOS();
             await this.reusableMobilePage.selectDropdownOptionByValueMobile(await Locatore.select_Vehicle_Sharing,'Company car');
           } */
          await this.actionClass.waitForElementAndClick(await Locatore.popUpBtnSave_Vehicle);
          await browser.pause(3000);
        }
        return user;
      } catch (error: any) {
        lastError = error;

        if (error.message?.includes('Login failed due to error popup')) {
          console.error(`❌ Fatal login error: ${error.message} (will not retry)`);
          throw error;
        }

        console.error(`Error on attempt ${attempt + 1}: ${error.message}`);
        await driver.saveScreenshot(`${screenshotDir}/failure-${Date.now()}.png`);

        if (attempt < maxRetries) {
          console.log('Closing and retrying...');
          await driver.execute('mobile: terminateApp', {
            appId: 'ie.jemstone.ronspot.view.activities.SplashActivity'
          });
          await driver.pause(2000);
        }
        attempt++;
      }
    }

    throw new Error(`Failed after ${maxRetries + 1} attempts: ${lastError?.message}`);
  }

  async loginWithExcelManualUser(sheetName: string, filePath: string): Promise<any> {
    const user = await this.reusableMobilePage.getUserByIndex(sheetName, filePath, 0);
    this.currentUser = user;
    this.zone = user.ZONE;
    this.gridDeskZone = user.GRID_DESK_ZONE;
    this.mapCarZone = user.MAP_CAR_ZONE;
    this.email = user.Email;
    this.password = user.Password;

    await this.loginWithManualUser(this.email, this.password);
    return user;
  }

  async loginWithManualUser(email: string, password: string): Promise<void> {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log('Trying Manual Login With :', email);
    console.log("--------------------------------------------------------------------");

    console.log('Clicking initial login button');
    await this.waitForElementAndClick(await Locatore.loginBtn);

     console.log('Entering email');
    await this.waitForElementAndClick(await Locatore.withoutAccountGmailButton);
    await this.waitForElementAndClick(await Locatore.emailInput);

    await this.clearAndSendKey(await Locatore.emailInput, email);

    console.log('Hide Keyboard');
    await this.hideKeyboardIfVisible();
    await browser.pause(2000);
    console.log('Selecting employee radio option');
    await this.waitForElementAndClick(await Locatore.radioEmployeeOption);
    await browser.pause(2000);
    console.log('Clicking confirm email button');
    await this.waitForElementAndClick(await Locatore.confirmEmailBtn);
    await browser.pause(2000);
    console.log('Clicking continue with email button');
    await this.waitForElementAndClick(await Locatore.continueWithEmailBtn);
    await browser.pause(2000);
    console.log('Entering password');
    await this.clearAndSendKey(await Locatore.passwordInput, password);
    await browser.pause(2000);
    console.log('Hide Keyboard');
    await this.hideKeyboardIfVisible();
    await browser.pause(2000);
    console.log('Clicking login submit button');
    await this.waitForElementAndClick(await Locatore.loginSubmitBtn);
    await browser.pause(5000);
    console.log('Handling confirmation popup');
    await this.waitForElementAndClick(await Locatore.clickHereButtonOrOk);
    console.log("--------------------------------------------------------------------");

  }

  async initializeAppAndLoginNoVehicle(sheetName: string, filePath: string, maxRetries: number = 1): Promise<any> {
    let attempt = 0;
    let lastError: Error | null = null;
    const screenshotDir = './error-screenshots';
 
    while (attempt <= maxRetries) {
      try {
        console.log(`Attempt ${attempt + 1}: Launching app...`);
 
        await driver.execute('mobile: activateApp', {
          appId: 'ie.jemstone.ronspot',
        });
 
        const loginBtn = await (await Locatore.loginBtn).isDisplayed().catch(() => false);
        let user: any = null;
        if (loginBtn) {
 
          console.log('App launched. Proceeding with login...');
          user = await this.loginWithExcelUser(sheetName, filePath);
        }
 
        // 🚫 Check for fatal login error popup FIRST
        const isPopupVisible = await (await Locatore.errorPopup).isDisplayed().catch(() => false);
        if (isPopupVisible) {
          const messageText = await Locatore.errorPopupText.getText().catch(() => 'Unable to retrieve error text');
          console.log('❌ Login failed: Error popup detected.');
          console.log(`🔴 Error Message: ${messageText}`);
          await driver.saveScreenshot(`${screenshotDir}/login-failed-${Date.now()}.png`);
          throw new Error(`Login failed due to error popup. Message: ${messageText}`);
        }
 
        await browser.pause(5000);
        await this.reusableMobilePage.waitForLoaderToDisappear(await Locatore.loader);
        const selector = '//android.widget.TextView[@resource-id="ie.jemstone.ronspot:id/titleTxt" and contains(@text, "Hi")]';
        const isLoggedIn = await $(selector).isDisplayed().catch(() => false);
 
        const addVehiclePopupVisible = await (await Locatore.popupNoVehiclesHeader).isDisplayed().catch(() => false);
        if (isLoggedIn || addVehiclePopupVisible) {
          console.log(`✅ User already logged in. Skipping login and stopping further attempts.`);
           if (!user) {
            console.log('🔄 Reading user from Excel to return context...');
            user = await this.reusableMobilePage.getUserByIndex(sheetName, filePath, 0);
          }
          return user;
        }
        throw new Error('Neither welcome text nor Add Vehicle popup appeared after login.');
      } catch (error: any) {
        lastError = error;
 
        if (error.message?.includes('Login failed due to error popup')) {
          console.error(`❌ Fatal login error: ${error.message} (will not retry)`);
          throw error;
        }
 
        console.error(`Error on attempt ${attempt + 1}: ${error.message}`);
        await driver.saveScreenshot(`${screenshotDir}/failure-${Date.now()}.png`);
 
        if (attempt < maxRetries) {
          console.log('Closing and retrying...');
          await driver.execute('mobile: terminateApp', {
            appId: 'ie.jemstone.ronspot.view.activities.SplashActivity'
          });
          await driver.pause(2000);
        }
        attempt++;
      }
    }
 
    throw new Error(`Failed after ${maxRetries + 1} attempts: ${lastError?.message}`);
  }
}
export default LoginActionsAndroid;