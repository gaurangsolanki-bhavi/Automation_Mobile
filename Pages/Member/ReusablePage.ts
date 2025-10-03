import { Page, Locator, expect, test } from "@playwright/test";
import WaitActionClass from "../../Actions/WaitActions";
import WebElementActionClass from "../../Actions/WebElementActions";
import LocatorsPage from "../../Pages/Locators";
import UserSet from "../../test-data/JSON/admin_set_test.json"
import ElementsName from "../../test-data/JSON/Elements_Name.json"
import dayjs from "dayjs";
import { error } from "console";
import ReusableActionClass from "../../Actions/ReusableActions";

export default class ReusablePage {
  private waitActionClass: WaitActionClass;
  private webElementActionClass: WebElementActionClass;
  private locatorsPage: LocatorsPage;
  private reusableActionClass: ReusableActionClass;
  continueWithEmailButton: Locator;

  public zone: string | undefined;
  public gridDeskZone: string | undefined;
  public mapCarZone: string | undefined;
  public currentUser: any;
  public firstName: string | undefined;
  public bookingDate_search: string | undefined;
  public SearchBooked_spot: string | undefined;

  constructor(public page: Page) {
    // Initialize class objects
    this.waitActionClass = new WaitActionClass(page);
    this.webElementActionClass = new WebElementActionClass(page);
    this.reusableActionClass = new ReusableActionClass(page);
    this.locatorsPage = new LocatorsPage(page);
    this.continueWithEmailButton = page.locator("//span[contains(text(), 'Continue with Email')]"); // Update if needed
  }
  /**
     * Navigates to base URL ('/')
     * @param url - Just logged for reference
     */

  async navigateToUrl(url: string) {
    await this.page.goto(url);
    console.log("Navigated to the 🌐 BASE_URL : " + url);
    await this.waitActionClass.waitForNetworkIdleOrTimeout();

  }


  /**
  * Navigates to Member-specific URL using data from UserSet
  * @param url - Base URL
  */
  async navigateMemberToUrl(url: string) {
    const fullUrl = url + UserSet.SET_1.MemberAppend;
    await this.page.goto(fullUrl);
    console.log("\nNavigated to the 🌐 BASE_URL :" + fullUrl);
    await this.waitActionClass.waitForNetworkIdleOrTimeout(20000);
    await this.page.waitForTimeout(2000);
  }



  /**
   * Change country
   */

  // async changeCountry() {
  //   await this.webElementActionClass.Click(this.locatorsPage.country_dropdown);
  //   await this.webElementActionClass.Click(this.locatorsPage.country_english);
  //   await this.waitActionClass.waitForElementVisible(this.locatorsPage.selected_country);
  //   console.log("Country changed Successfully on login page");
  // }

  /**
   * Send the username to the username field
   * @param userName
   */

  async sendUsername(userName: string) {
    await this.webElementActionClass.Send_Keys(this.locatorsPage.username_text_box, userName);
    console.log("Username sent successfully");
  }



  /**
   * Send the password to the password field
   * @param password
   */

  async sendPassword(password: string) {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Main_radio_login);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.password_text_box, password);
    //await this.webElementActionClass.Click(this.locatorsPage.sign_in);
    console.log("password sent successfully");
  }


  /**
   * Click on signIn
   */

  async clickOnSignIn() {
    await this.webElementActionClass.Click(this.locatorsPage.sign_in);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.icon_admin_btn);
    await this.waitActionClass.waitForNetworkIdleOrTimeout(7000)
    await expect(this.locatorsPage.icon_admin_btn).toBeVisible();
    console.log("Clicked on signIn");
  }
  /**
 * Sends username to username input box
 * @param userName - Username value
 */

  async sendMemberUsername(userName: string) {
    await this.webElementActionClass.Send_Keys(this.locatorsPage.member_email_text, userName);
    console.log("Member Username sent successfully");
  }
  /**
  * Sends password to password input box
  * @param password - Password value
  */

  async sendMemberPassword(password: string) {
    await this.webElementActionClass.Send_Keys(this.locatorsPage.member_password_text_box, password);
    console.log("password sent successfully");
  }

  /**
  * Clicks on Sign In and validates Admin dashboard visibility
  */

  async clickOnSignInMember() {
    await this.webElementActionClass.Click(this.locatorsPage.member_signIn_button);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.member_dashboard_text);
    await this.waitActionClass.waitForNetworkIdleOrTimeout(30000)
    await expect(this.locatorsPage.member_dashboard_text).toBeVisible({ timeout: 20000 });
    console.log("Clicked on signIn");
  }

  /**
   * Send the password to the password field
   * @param url
   * @param userName
   * @param password
   */

  async userLogin(url: string, userName: string, password: string) {
    await this.navigateToUrl(url);
    await this.sendUsername(userName);
    await this.sendPassword(password);
    await this.clickOnSignIn();
    console.log("User Logged in Successfully with username : " + userName);
  }

  // Member Methods 

  /**
    * Selects the radio button checkbox if not already selected
    */
  async selectCheckboxIfNotSelected() {
    await this.webElementActionClass.Click(this.locatorsPage.member_radio_button);
    console.log("Select Terms and Conditions Radio Button");
  }

  /**
  * Clicks on the confirm email button
  */
  async clickOnConfirmEmailbutton() {
    await this.webElementActionClass.Click(this.locatorsPage.member_confirm_btn);
    console.log("Clicked on Confirm Email Button.");
  }

  /**
   * Clicks on "Search bookings" button
   */
  async clickOnSearchBookingsButton() {
    await this.webElementActionClass.Click(this.locatorsPage.Member_Menu_Search_Bookings);
    console.log("Clicked on Search Bookings Button.");
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.Member_Menu_Search_Bookings_dropdown);
  }

  /**
  * Clicks on "Continue with Email" button if visible within 5 seconds
  */

  async clickOnContinueWithEmailButtonIfVisible() {
    try {
      await this.page.waitForSelector("//span[contains(text(), 'Continue with Email')]", { timeout: 5000, state: "attached" });
      if (await this.continueWithEmailButton.isVisible()) {
        await this.continueWithEmailButton.click();
        console.log("Clicked on the Continue With Email Button.");
      }
    } catch (error) {
      console.log("Button not found or not visible, skipping.");
    }
  }

  /**
   * Handles email login flow if "Continue with Email" button appears
   */

  async handleLoginWithEmailOrPassword() {
    try {
      // Wait for the button for up to 5 seconds

      await this.page.waitForTimeout(3000)
      // Check if the button is visible and click it if present
      if (await this.continueWithEmailButton.isVisible()) {
        await this.continueWithEmailButton.click();
        console.log("Clicked on the 'Continue with Email' button.");
        return; // Exit if button is clicked
      }
    } catch (error) {
      console.log("'Continue with Email' button not found, proceeding with password input.");
    }
  }

  /**
   * Complete login flow for Member user
   * @param url - Login URL
   * @param EuserName - Email ID
   * @param Epassword - Password
   */

  async MemberUserLogin(url: string, EuserName: string, Epassword: string) {

    console.log("=================================================");
    console.log("\n⏳============= Starting User Login ============⏳");
    await this.navigateMemberToUrl(url);
    await this.sendMemberUsername(EuserName);
    await this.selectCheckboxIfNotSelected();
    await this.clickOnConfirmEmailbutton();
    await this.handleLoginWithEmailOrPassword();
    await this.sendMemberPassword(Epassword);
    await this.clickOnSignInMember();
    console.log("User Logged in Successfully with username : " + EuserName);
    console.log("⏳=================================================⏳");
  }


  /**
    * Login using user data from Excel file
    * @param sheetName - Sheet name in Excel
    * @param excelPath - Path to Excel file
    * @returns user object from Excel
    */
  async loginWithExcelUser(sheetName: string, excelPath: string,): Promise<any> {
    try {
      const user = await this.reusableActionClass.getUserByIndex(sheetName, excelPath, 0);

      // Optional: Save current user if needed later
      this.currentUser = user;

      // Set zone info globally
      this.zone = user.ZONE;
      this.gridDeskZone = user.GRID_DESK_ZONE;
      this.mapCarZone = user.MAP_CAR_ZONE;
      // 🔑 Environment key (defaults to prod)
      const envKey = (process.env.ENV || "prod").toLowerCase(); // stage | preprod | prod

      // 🔑 Pick correct URL column from Excel

      const url = user[envKey];
      const email = user.Email;
      const password = user.Password;

      await this.MemberUserLogin(url, email, password);

      return user;

    } catch (error: any) {
      console.error(`Login failed for user: ${error.message}`);
      expect(false).toBe(true);
    }
  }

  async loginWithExcelAdminUser(sheetName: string, excelPath: string): Promise<any> {
    try {
      const user = await this.reusableActionClass.getUserByIndex(sheetName, excelPath, 0);

      // Optional: Save current user if needed later
      this.currentUser = user;

      // Set zone info globally
      this.zone = user.ZONE;
      this.gridDeskZone = user.GRID_DESK_ZONE;
      this.mapCarZone = user.MAP_CAR_ZONE;
      const envKey = (process.env.ENV || "stage").toLowerCase(); // stage | preprod | prod

      // 🔑 Pick correct URL column from Excel

      const url = user[envKey];
      const email = user.AdminEmail;
      const password = user.AdminPassword;

      await this.userLogin(url, email, password);

      return user;

    } catch (error: any) {
      console.error(`Login failed for user: ${error.message}`);
      expect(false).toBe(true);
    }
  }

  async loginWithExcelAdminUser2(sheetName: string, excelPath: string): Promise<any> {
    try {
      const user = await this.reusableActionClass.getUserByIndex(sheetName, excelPath, 0);

      // Optional: Save current user if needed later
      this.currentUser = user;

      // Set zone info globally
      this.zone = user.ZONE;
      this.gridDeskZone = user.GRID_DESK_ZONE;
      this.mapCarZone = user.MAP_CAR_ZONE;
      const url = user.url; // Optional field from sheet
      const email = user.AdminEmail;
      const password = user.AdminPassword;


      await this.userLogin(url, email, password);

      return user;

    } catch (error: any) {
      console.error(`Login failed for user: ${error.message}`);
      expect(false).toBe(true);
    }
  }

  /**
    * Login with user data from JSON UserSet
    * @param setKey - Key from UserSet JSON
    * @param reusablePage - Instance of ReusablePage
    */


  async loginWithUserSet(setKey: keyof typeof UserSet, reusablePage: any) {
    const user = UserSet[setKey];
    try {
      await reusablePage.MemberUserLogin(user.url, user.emp_user1, user.emp_user_Pass1);
    } catch (error: any) {
      console.error(`Test failed While Login with ${setKey}: ${error.message}`);
      expect(false).toBe(true);
    }
  }

  /**
  * Login with Admin user data from UserSet
  * @param setKey - Key from UserSet JSON
  * @param reusablePage - Instance of ReusablePage
  */
  async loginWithAdminUserSet(setKey: keyof typeof UserSet, reusablePage: any) {
    const user = UserSet[setKey];
    try {
      await reusablePage.userLogin(user.url, user.admin_username, user.admin_password);
    } catch (error: any) {
      console.error(`Test failed while Admin Login with ${setKey}: ${error.message}`);
      expect(false).toBe(true);
    }
  }


  /**
    * Selects a zone from dropdown based on:
    * - Specific option text
    * - Index of option
    * - Default index fallback
    * Logs the currently selected and newly selected values
    */

  async selectZone(optionText?: string, index?: number, defaultIndex: number = 0) {
    await this.page.waitForTimeout(1000);
    const dropdownSelector = "select#car_park_calendar";

    // Get all options
    const options = await this.page.$$eval(`${dropdownSelector} option`, (elements) =>
      elements.map(option => option.textContent?.trim() || '')
    );
    console.log("\n");
    console.log("*************************");
    console.log("Select Available Zones:");
    console.log("*************************");
    for (let i = 0; i < options.length; i++) {
      console.log(`Zone ${i + 1}: ${options[i]}`);
    }

    // Get the currently selected option
    const currentlySelected = await this.page.$eval(`${dropdownSelector} option:checked`, (option) =>
      option.textContent?.trim() || 'N/A'
    );
    console.log("\n");
    console.log(`Default Selected Zone: ${currentlySelected}`);

    let selectedText = optionText && options.includes(optionText) ? optionText :
      index !== undefined && index >= 0 && index < options.length ? options[index] :
        options[defaultIndex];

    if (currentlySelected === selectedText) {
      console.log("\n");
      console.log(`"${selectedText}" is already selected. Skipping selection.`);
      console.log("\n<<================================================================>>");
      return;
    }
    console.log("\n");
    console.log(`Selecting Zone: ${selectedText}`);
    console.log("=================================================");

    // Wait for possible page navigation
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => console.log("->")),
      this.page.selectOption(dropdownSelector, { label: selectedText })
    ]);

    await this.page.waitForTimeout(2000); // Ensure page settles

    const newSelected = await this.page.$eval(`${dropdownSelector} option:checked`, (option) =>
      option.textContent?.trim() || 'N/A'
    );

    console.log(`Newly Selected Zone: ${newSelected}`);
    console.log("\n");
    console.log("<<================================================================>>");
  }


  /**
   * Navigates to Member Settings and checks if a vehicle is already added.
   * If no vehicle or a placeholder vehicle is found, it adds a new vehicle
   * by selecting all dropdown options and saving the settings.
   */


  async checkAndAddVehicle() {
    // ✅ Navigate to Member Settings
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log("Checking if any vehicle is already added... If not, adding a new one");
    console.log("--------------------------------------------------------------------");
    await this.waitActionClass.waitForNetworkIdleOrTimeout(10000);
    await this.page.waitForTimeout(3000);
    console.log("\nClicking on 'Member Setting' menu...");
    await this.webElementActionClass.Click(this.locatorsPage.member_setting_menu);
    await this.page.waitForTimeout(2000);
    console.log("\nClicking on 'General Setting' under Member Settings...");
    await this.webElementActionClass.Click(this.locatorsPage.member_general_setting_menu);
    await this.waitActionClass.waitForNetworkIdleOrTimeout(10000);
    await this.page.waitForTimeout(1000);
    if (await this.locatorsPage.okButton.isVisible()) {
      console.log("✅ OK button visible, clicking...");
      await this.locatorsPage.okButton.click();
    } else {
      console.log("⏭️ OK button not found/visible, skipping...");
    }
    // ✅ Get all existing primary vehicle inputs
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.car_plates.first());
    const vehicles = await this.locatorsPage.car_plates.all();
    const vehicle = await this.locatorsPage.check_first_car_plate.all();
    const vehicleCount = vehicles.length;
    const firstVehicleValue = await vehicle[0].getAttribute('value') || '';

    let addNewVehicle = false;

    if (vehicleCount > 0) {

      // ✅ Condition to check
      if (firstVehicleValue.trim() === '') {
        console.log("\nNo primary vehicle exists. Adding a new vehicle...");
        addNewVehicle = true;
      } else {
        console.log("\nVehicle already added. No need to add a new vehicle.");
        console.log("\n**********************************");
        console.log(`Total Available Vehicles Found: ${vehicleCount}`);
        console.log("**********************************");
        for (let i = 0; i < vehicleCount; i++) {
          const vehicleValue = await vehicles[i].getAttribute('value') || '';
          console.log(`Vehicle ${i + 1}: "${vehicleValue}"`);
        }
        addNewVehicle = false;

      }
    } else {
      console.log("\nNo vehicle found. Need to add a vehicle.");
      addNewVehicle = true;
    }

    // ✅ If no vehicle added yet, add new vehicle
    if (addNewVehicle) {
      console.log("\n---Adding a new vehicle...");
      const carplateNumber = await this.generateRandomNumber();
      await this.webElementActionClass.Send_Keys(this.locatorsPage.car_plates, carplateNumber);
      await this.selectSecondOptionFromDropdown(this.locatorsPage.select_vehicle_size, ElementsName.DropDowns.Vehicle_Size);
      await this.selectSecondOptionFromDropdown(this.locatorsPage.select_vehicle_Fuel, ElementsName.DropDowns.Fuel_Type);
      await this.selectSecondOptionFromDropdown(this.locatorsPage.select_vehicle_accessibility, ElementsName.DropDowns.accessibleCategory);
      await this.selectSecondOptionFromDropdown(this.locatorsPage.select_vehicle_sharing, ElementsName.DropDowns.shareableCategory);
      await this.webElementActionClass.Click(this.locatorsPage.update_setting_button);
      await this.page.waitForTimeout(3000);

    }
    console.log("<<================================================================>>");
  }

  async checkMaxAddVehiclePopup() {
    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log("Checking if max vehicle popup appears after trying to add 11 vehicles...");
    console.log("--------------------------------------------------------------------");

    await this.waitActionClass.waitForNetworkIdleOrTimeout(10000);
    await this.page.waitForTimeout(3000);

    console.log("\nClicking on 'Member Setting' menu...");
    await this.webElementActionClass.Click(this.locatorsPage.member_setting_menu);
    await this.page.waitForTimeout(2000);

    console.log("\nClicking on 'General Setting' under Member Settings...");
    await this.webElementActionClass.Click(this.locatorsPage.member_general_setting_menu);
    await this.waitActionClass.waitForNetworkIdleOrTimeout(10000);
    await this.page.waitForTimeout(1000);

    // ✅ Get current number of vehicles
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.car_plates.first());
    const vehicles = await this.locatorsPage.car_plates.all();
    const vehicleCount = vehicles.length;

    console.log(`\nCurrent vehicle count: ${vehicleCount}`);

    const remainingClicks = 11 - vehicleCount;

    if (remainingClicks <= 0) {
      console.log("\nAlready 11 or more vehicles present. Cannot proceed with popup test.");
      return;
    }

    for (let i = 0; i < remainingClicks; i++) {
      console.log(`\n Click ${i + 1}: Clicking on '+ Add Vehicle' button...`);
      await this.webElementActionClass.Click(this.locatorsPage.add_primary_vehicle_btn);
      await this.page.waitForTimeout(1000);
    }

    // ✅ On the 11th click, the popup should appear
    console.log("\n Checking if popup appears after 11th add attempt...");

    // Adjust selector if needed
    const isPopupVisible = await this.locatorsPage.succsessMessage.isVisible();

    let PopText: string | undefined = undefined;
    if (isPopupVisible) {
      const popupText = await this.locatorsPage.succsessMessage.textContent();
      PopText = popupText?.trim();
      console.log(`\n✅ Popup appeared: "${PopText}"`);
    } else {
      console.warn("\n❌ No popup appeared. Expected 'Maximum 10 vehicles allowed' alert.");
    }

    console.log("<<================ Test Completed ===============>>");
    return PopText;
  }





  async generateRandomNumber() {
    const randomNumber = Math.floor(10000 + Math.random() * 90000).toString(); // Always 5 digits
    const carPlate = `CAR${randomNumber}`;
    console.log(`\nNew Car Plate Number: ${carPlate}`);
    return carPlate;
  }

  async generateRandomNumberMeetings() {
    const randomNumber = Math.floor(100 + Math.random() * 90000).toString(); // Always 5 digits
    const Meeting = `Meeting${randomNumber}`;
    console.log(`\n`);
    console.log(`New Meeting Name is: ${Meeting}`);
    return Meeting;
  }
  async generateRandomNumberSpot() {
    const randomNumber = Math.floor(100 + Math.random() * 9000).toString(); // Always 4 digits
    const Spot = `SPOT${randomNumber}`;
    console.log(`\n`);
    console.log(`New Spot Name is: ${Spot}`);
    return Spot;
  }


  /**
 * Waits for a dropdown to be visible and selects the second option if available.
 * Logs all dropdown options for reference and handles cases where only one or no options exist.
 * 
 * @param dropdownLocator - The Playwright locator for the dropdown element.
 */

  async selectSecondOptionFromDropdown(dropdownLocator: Locator, dropdownName?: string) {
    await dropdownLocator.waitFor();

    const options = (await dropdownLocator.locator("option").allTextContents()).map(text => text.trim());
    console.log("\n");
    console.log("***********************************");
    if (dropdownName) {
      console.log(`${dropdownName}: Dropdown Options`);
    } else {
      console.log("Dropdown Options:");
    }
    console.log("***********************************");

    options.forEach((text, index) => console.log(`${index + 1}: ${text}`));

    if (options.length > 1) {
      await dropdownLocator.selectOption({ index: 1 });
      console.log(`\nSuccessfully selected: ${options[1]}`);
    } else if (options.length > 0) {
      // ✅ If only one option exists, select the first option (index 0)
      await dropdownLocator.selectOption({ index: 0 });
      console.log(`\nOnly one option available. Selected: ${options[0]}`);
    } else {
      console.error("\nNo options available in the dropdown. Selection skipped.");
    }

    await this.page.waitForTimeout(1000);
    console.log("=================================================");
  }

  async selectOptionFromDropdown(dropdownLocator: Locator, preferredIndex: number, dropdownName?: string) {
    await dropdownLocator.waitFor();

    const options = await dropdownLocator.locator("option").allTextContents();
    console.log("\n");
    console.log("********************************************");
    if (dropdownName) {
      console.log(`${dropdownName}: Dropdown Options`);
    } else {
      console.log("Dropdown Options:");
    }
    console.log("********************************************");

    options.forEach((text, index) => console.log(`${index + 1}: ${text}`));

    let selectedOption: string | null = null;

    if (options.length > preferredIndex) {
      await dropdownLocator.selectOption({ index: preferredIndex });
      selectedOption = options[preferredIndex];
      console.log(`\nSuccessfully selected: ${selectedOption}`);
    } else if (options.length > 0) {
      console.warn(`\nPreferred index ${preferredIndex} not available. Falling back to index 0.`);
      await dropdownLocator.selectOption({ index: 0 });
      selectedOption = options[0];
      console.log(`Selected: ${selectedOption}`);
    } else {
      console.error("\nNo options available in the dropdown. Selection skipped.");
      selectedOption = null;
    }
    await this.page.waitForTimeout(1000);
    console.log("=================================================");
    return selectedOption;
  }

  async selectDropdownOptionByValue(dropdownLocator: Locator, optionValue: string, dropdownName?: string) {
    await dropdownLocator.waitFor();

    const optionValues = await dropdownLocator.locator('option').evaluateAll(opts =>
      opts.map(opt => (opt as HTMLOptionElement).value)
    );

    console.log('\n')
    console.log("********************************************");
    console.log(`${dropdownName ?? "Dropdown"}: Available Values`);
    console.log("********************************************");
    optionValues.forEach((val, i) => console.log(`${i + 1}: value="${val}"`));

    if (optionValues.includes(optionValue)) {
      await dropdownLocator.selectOption(optionValue);
      console.log(`\n✅ Successfully selected: value="${optionValue}"`);
    } else {
      console.error(`\n❌ Value "${optionValue}" not found in dropdown.`);
    }

    console.log("=================================================");
  }

  //   async selectDropdownOptionByValueByText(dropdownLocator: Locator, optionValue: string, dropdownName?: string) {
  //   await dropdownLocator.waitFor();

  //   const optionValues =await dropdownLocator.locator("option").allTextContents();
  //   console.log(`Selecting ${dropdownName} Dropdown........`);
  //   console.log('\n')
  //   console.log("********************************************");
  //   console.log(`${dropdownName ?? "Dropdown"}: Available Values`);
  //   console.log("********************************************");
  //   optionValues.forEach((val, i) => console.log(`${i + 1}:"${val}"`));

  //   if (optionValues.includes(optionValue)) {
  //     await dropdownLocator.selectOption(optionValue);
  //     console.log(`\n✅ Successfully selected: value="${optionValue}"`);
  //   } else {
  //     console.error(`\n❌ Value "${optionValue}" not found in dropdown.`);
  //   }

  //   console.log("=================================================");
  // }

  async selectDropdownOptionByValueByText(
    dropdownLocator: Locator,
    optionText: string,
    dropdownName?: string
  ) {
    await dropdownLocator.waitFor();

    // Get all option labels and clean them
    const optionValues = await dropdownLocator.locator("option").allTextContents();
    const cleanedOptions = optionValues.map(o => o.trim().replace(/\s+/g, " "));

    console.log(`Selecting ${dropdownName ?? "Dropdown"}........\n`);
    console.log("********************************************");
    console.log(`${dropdownName ?? "Dropdown"}: Available Values`);
    console.log("********************************************");
    cleanedOptions.forEach((val, i) => console.log(`${i + 1}:"${val}"`));

    // Compare ignoring extra spaces & case sensitivity
    const matchIndex = cleanedOptions.findIndex(opt => opt.toLowerCase() === optionText.trim().toLowerCase());

    if (matchIndex !== -1) {
      const matchingText = cleanedOptions[matchIndex];
      await dropdownLocator.selectOption({ label: matchingText });
      console.log(`\n✅ Successfully selected: "${matchingText}"`);
    } else {
      console.error(`\n❌ Value "${optionText}" not found in dropdown.`);
    }

    console.log("=================================================");
  }





  /**
 * Tries to find and book an available day without refresh.
 * If no day is found initially, it delegates to a refresh loop method to retry until success.
 */

  async refreshAndCountDays() {
    console.log("Starting booking attempt...");
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(6000);

    // ✅ Helper: Try to book the first available day
    const tryBookingFirstAvailableDay = async (): Promise<boolean> => {
      const availableDays = await this.locatorsPage.availableDaysfromcurrunt.all();
      if (availableDays.length > 0) {
        console.log("\n");
        console.log(`Found ${availableDays.length} available booking day(s). Proceeding...`);
        const firstAvailableDay = availableDays[0];
        return true;
      }
      return false;
    };

    // 🧠 Step 1: Try booking directly without refresh
    const bookedDirectly = await tryBookingFirstAvailableDay();
    if (bookedDirectly) return;

    console.log(`No available slots found initially. Starting refresh loop...`);

    // 🔁 Step 2: Refresh and retry until success or exit

    await this.refreshAndCountDayAll();

  }

  /**
   * Navigates to the dashboard, attempts to book a spot by:
   * - Refreshing until available day is found
   * - Selecting a vehicle
   * - Clicking "Get Random Space" button
   * - Validating the success message and booked spot
   */

  async bookSpotFromCalendar() {
    console.log("Starting Calendar Based Spot Booking...");
    await this.NavigateToDashboard();
    await this.refreshAndCountDays();
    await this.webElementActionClass.Click(this.locatorsPage.availableFirstDaysForBooking);
    await this.selectSecondOptionFromDropdown(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List);
    await this.webElementActionClass.Click(this.locatorsPage.getRandomSpaceButton);
    await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
    console.log("Success message is displayed.");
    const bookedSpotText = await this.locatorsPage.bookedSpot.textContent();
    await this.locatorsPage.availableFirstDaysForBookingDate.waitFor({ state: "visible" });
    const elementId = await this.locatorsPage.availableFirstDaysForBookingDate.getAttribute("id");
    console.log(`Booked Spot: ${bookedSpotText?.trim()}`, `On Date: ${elementId || "No ID found"}`);
  }





  async HoverSpotFromCalendar() {
    const text = await this.locatorsPage.credit_message_on_spot.textContent() || '';

    console.log("--------------------------------------------------");
    console.log(`Creadit Message on Hover Spot: ${text}`);
    console.log("--------------------------------------------------");
    const match = text.match(/([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;

  }

  async releaseAlHourlyBookedSpots(): Promise<void> {

    await this.page.waitForTimeout(2000);
    await this.waitActionClass.WaitUntilElementToDisappear_hidden(this.locatorsPage.TimeLoader);
    console.log("\n");

    let count = await this.locatorsPage.parking_booked_hourly_spot.count();
    if (count === 0) {
      console.log('No booked spots found.');
      return;
    }
    console.log(`\n---- Found ${count} booked spots. Releasing...`);
    
    while (count > 0) {
      const spot = this.locatorsPage.parking_booked_hourly_spot.nth(0); // always pick the first one
      const bookedSpotText = await this.locatorsPage.parking_booked_hourly_spot.nth(0).getAttribute("title");
      const bookedSpot = bookedSpotText?.trim() || '';
      console.log("\n");
      console.log(`----------- Releasing Booked Spot: "${bookedSpot}"....`);
      await spot.hover();
      await this.page.waitForTimeout(3000);
      await spot.click({ force: true });
      //await this.webElementActionClass.Force_Click(spot);
      //await spot.click();
      console.log(`\nClicked on a booked spot`);
      await this.page.waitForTimeout(2000);
      await this.webElementActionClass.Click(this.locatorsPage.parking_realese_hourly_spot);
      console.log(`\nClicked on a Cancel bookeing spot button`);
      await this.page.waitForTimeout(3000);
      await this.webElementActionClass.Click(this.locatorsPage.realese_space_btn);
      await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
      console.log("Success message displayed for release.");
      console.log(`\nVerifying toast message...for Release Successfully spot: ${bookedSpot}`);
      await this.page.waitForTimeout(1000);
      //await this.verifyRealeaseSuccessToastMatchesSpot(this.locatorsPage.succsessMessage.first(), bookedSpot);
      console.log(`\nSpot "${bookedSpot}" Released Successfully.!`);
      await this.page.waitForTimeout(4000);

      // Re-check how many are left after release
      count = await this.locatorsPage.parking_booked_hourly_spot.count();
    }

    console.log("All hourly booked spots have been released.");
  }

  async assertSpotTextContainsTitle(spot1: string) {
    const spotElement = this.locatorsPage.parking_map_spot_popup;
    await spotElement.waitFor({ state: 'visible' });
    const spotText = await spotElement.textContent();
    console.log("\nSpot Button Text On Popup:", spotText);
    expect(spotText).toContain(spot1) // case-sensitive match
    console.log("\nAssertion Pass on Text On Popup:", spotText, " Spot:", spot1);

  }

  async selectFirstAvailableTimeSlotHourlyMore30(index?: number, title?: string) {
    index = 0; // Adjust for zero-based index
    await this.locatorsPage.parking_realese_hourly_slots_more_then1.waitFor();
    const dropdownLocator = this.locatorsPage.parking_realese_hourly_slots_more_then1
    const options = await dropdownLocator.locator("option").allTextContents();
    console.log("\n");
    console.log("--------------------------------------");
    console.log("Available Slots Options For Booking:");
    console.log("--------------------------------------");
    options.forEach((text, i) => console.log(`${i + 1}: ${text}`));

    if (index < options.length) {
      await dropdownLocator.selectOption({ index });
      console.log(`\nSuccessfully selected: ${options[index]}`);
      await this.page.waitForTimeout(3000);
      await this.webElementActionClass.Click(this.locatorsPage.parking_map_claim_spot_popup);
      console.log(`\nSuccessfully clicked on Book Space button`);
      console.log(`\nSuccessfully booked spot ${title} slot ${options[index]}`);
      return true;
    } else if (options.length > 0) {
      // Fall back to first if index is out of range
      await dropdownLocator.selectOption({ index: 0 });
      console.log(`Index out of range. Defaulted to first option: ${options[0]}`);
      return false;
    } else {
      console.log("No options available in the dropdown. Selection skipped.");
      await this.webElementActionClass.Click(this.locatorsPage.Map_pop_up_close_btn);
      return false;
    }
  }

  /**
   * Attempts to book the **next available spot after today**:
   * - Checks for exact "tomorrow" date first
   * - Falls back to any future date if tomorrow isn’t available
   * - Selects vehicle, books, and verifies the success message
   */

  async bookNextAvailableSpotAfterToday() {
    await this.refreshAndCountDays();
    await this.releaseAnyBookedSpot();

    const todayDateId = dayjs().format('YYYY-MM-DD');
    const nextDateId = dayjs().add(1, 'day').format('YYYY-MM-DD');

    console.log(`\nTrying to book spot on next day (${nextDateId}) if available...`);

    await this.page.waitForTimeout(2000);
    const availableDays = await this.locatorsPage.availableDaysfromcurrunt.all();
    let nextDayElement: Locator | null = null;
    let fallbackDayElement: Locator | null = null;

    for (const day of availableDays) {
      const id = await day.getAttribute('id');

      if (!id || id <= todayDateId) continue;

      if (id === nextDateId) {
        nextDayElement = day;
        break; // prioritize exact next day
      }

      // save first available fallback after today (but only if next day is not found)
      if (!fallbackDayElement && id > todayDateId) {
        fallbackDayElement = day;
      }
    }

    const spotToBook = nextDayElement || fallbackDayElement;

    if (spotToBook) {
      const bookingId = await spotToBook.getAttribute('id');
      console.log(`Booking available on Next Dayspot on (${bookingId})...`);
      await spotToBook.scrollIntoViewIfNeeded();
      await this.webElementActionClass.Click(spotToBook);
      await this.selectSecondOptionFromDropdown(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List);
      await this.webElementActionClass.Click(this.locatorsPage.getRandomSpaceButton);
      await this.page.waitForTimeout(2000);
      await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
      console.log("\nSuccess message is displayed.");
      await this.verifybookedSpotWithTostMessage();
    } else {
      const errorMsg = `No available booking slots after today (${todayDateId}).`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
  }

  /**
     * Verifies if a given element is visible on the page.
     */

  async verifyElementIsVisible(element: Locator, elementName: string): Promise<void> {
    try {
      await expect(element).toBeVisible({ timeout: 20000 });
      console.log("\n");
      console.log(`Element "${elementName}" is present and visible.`);
    } catch (error) {
      console.error(`Element "${elementName}" is NOT visible or not found.`);
      throw error;
    }
  }


  /**
 * Waits for the success message (toast) to appear and returns its inner text.
 * Used for asserting correct booking confirmation.
 * 
 * @returns {Promise<string>} The success message text.
 */


  async getSuccessMessage(): Promise<string> {
    await this.locatorsPage.succsessMessage.waitFor({ state: 'visible', timeout: 15000 }); // wait until it's visible
    const messageText = await this.locatorsPage.succsessMessage.innerText();
    console.log(`Success message displayed: "${messageText}"`);
    return messageText;
  }

  /**
 * Compares the visible toast message with an expected booking confirmation text.
 * Logs both actual and expected values and highlights any mismatch.
 * 
 * @param toastLocator - Locator for the toast notification element.
 * @param expectedSpotText - The expected spot text to verify against.
 */

  async verifySuccessToastMatchesSpot(toastLocator: Locator, expectedSpotText: string): Promise<void> {
    console.log("\n");
    console.log("------------------------------------------");
    console.log("Verifying Booking Success PopUp message...");
    console.log("------------------------------------------");

    await toastLocator.waitFor({ state: "visible", timeout: 20000 });
    const toastText = await toastLocator.textContent();
    const trimmedToast = toastText?.trim() || '';

    const expectedmsg = `${expectedSpotText} Assigned successfully`;

    console.log(`Popup Message: "${trimmedToast}"`);
    console.log(`Expected Message: "${expectedmsg}"`);

    if (trimmedToast.includes(expectedSpotText)) {
      console.log(`\nSuccess message correctly displayed: "${expectedmsg}".`);
    } else {
      throw new Error(`Success message mismatch. Expected: "${expectedmsg}", but got: "${trimmedToast}"`);
    }
  }

  async verifyRealeaseSuccessToastMatchesSpot(toastLocator: Locator, expectedSpotText: string): Promise<void> {
    console.log("\n");
    console.log("------------------------------------------");
    console.log("Verifying Release Success PopUp message...");
    console.log("------------------------------------------");

    await toastLocator.waitFor({ state: "visible", timeout: 20000 });
    const toastText = await toastLocator.textContent();
    const trimmedToast = toastText?.trim() || '';

    const expectedmsg = `You have released space ${expectedSpotText} successfully`;


    console.log(`Popup Message: "${trimmedToast}"`);
    console.log(`Expected Message: "${expectedmsg}"`);

    if (trimmedToast.includes(expectedSpotText)) {
      console.log(`\nSuccess message correctly displayed: "${expectedmsg}".`);
    } else {
      throw new Error(`Success message mismatch. Expected: "${expectedmsg}", but got: "${trimmedToast}"`);
    }
  }
  async verifyAdminReleaseSuccessToastMatchesSpot(toastLocator: Locator, expectedSpotText: string): Promise<void> {
    console.log("\n");
    console.log("------------------------------------------");
    console.log("Verifying Release Success PopUp message...");
    console.log("------------------------------------------");

    await toastLocator.waitFor({ state: "visible", timeout: 20000 });
    const toastText = await toastLocator.textContent();
    const trimmedToast = toastText?.trim() || '';

    const expectedmsg = `Space ${expectedSpotText} has been successfully released`;

    console.log(`Popup Message: "${trimmedToast}"`);
    console.log(`Expected Message: "${expectedmsg}"`);

    if (trimmedToast.includes(expectedSpotText)) {
      console.log(`\nSuccess message correctly displayed: "${expectedmsg}".`);
    } else {
      throw new Error(`Success message mismatch. Expected: "${expectedmsg}", but got: "${trimmedToast}"`);
    }
  }

  async verifyAdminSuccessToastMatchesSpot(toastLocator: Locator, expectedSpotText: string): Promise<void> {
    console.log("\n");
    console.log("------------------------------------------");
    console.log("Verifying Success PopUp message...");
    console.log("------------------------------------------");

    await toastLocator.waitFor({ state: "visible", timeout: 20000 });
    const toastText = await toastLocator.textContent();
    const trimmedToast = toastText?.trim() || '';

    const expectedmsg = `Space ${expectedSpotText} has been successfully assigned`;

    console.log(`Popup Message: "${trimmedToast}"`);
    console.log(`Expected Message: "${expectedmsg}"`);

    if (trimmedToast.includes(expectedSpotText)) {
      console.log(`\nSuccess message correctly displayed: "${expectedmsg}".`);
    } else {
      throw new Error(`Success message mismatch. Expected: "${expectedmsg}", but got: "${trimmedToast}"`);
    }
  }

  async verifyRealeaseSuccessToastMatchesCalender(toastLocator: Locator, expectedSpotText: string): Promise<void> {
    console.log("\n");
    console.log("------------------------------------------");
    console.log(`Verifying Release Success PopUp message...`);
    console.log("------------------------------------------");
    await toastLocator.waitFor({ state: "visible", timeout: 20000 });
    const toastText = await toastLocator.textContent();
    const trimmedToast = toastText?.trim() || '';

    const expectedmsg = `Your booking ${expectedSpotText} has been released successfully`;


    console.log(`Popup Message: "${trimmedToast}"`);
    console.log(`Expected Message: "${expectedmsg}"`);

    if (trimmedToast.includes(expectedSpotText)) {
      console.log(`\nSuccess message correctly displayed: "${expectedmsg}".`);
    } else {
      throw new Error(`Success message mismatch. Expected: "${expectedmsg}", but got: "${trimmedToast}"`);
    }
  }







  // async releaseAnyBookedSpot() {
  //   const assignedSpots = this.page.locator("//a[contains(@class,'SpotID_assigned')]");

  //   const count = await assignedSpots.count();
  //   console.log(`Total Booked Spots: ${count}`);
  //   if (count === 0) {
  //     console.log("No booked spot found to release.");
  //     return false;
  //   }

  //   const firstBooked = assignedSpots.nth(0);
  //   const spotId = await firstBooked.getAttribute("id");

  //   console.log(`Found booked spot (${spotId || 'No ID'}). Releasing it...`);

  //   await firstBooked.scrollIntoViewIfNeeded();
  //   await firstBooked.click();

  //   const bookedSpotText = await this.locatorsPage.bookedSpot.textContent();
  //   console.log(`Releasing booked Spot: ${bookedSpotText?.trim()}`);

  //   await this.webElementActionClass.Click(this.locatorsPage.realese_space_btn);
  //   await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });

  //   console.log(`Released booking for ${spotId || 'unknown ID'}`);
  //   await this.page.waitForTimeout(3000);
  //   return true;
  // }

  // Method to release any booked spot from the current list of assigned spots
  async releaseAnyBookedSpot() {
    const assignedSpots = this.page.locator("//a[contains(@class,'SpotID_assigned')]");
    const count = await assignedSpots.count();

    console.log(`Total Booked Spots: ${count}`);

    if (count === 0) {
      console.log("No booked spot found to release.");
      return false;
    }

    for (let i = 0; i < count; i++) {
      // Always get the *first* element because the list updates after each release
      const currentSpots = this.page.locator("//a[contains(@class,'SpotID_assigned')]");
      const bookedSpot = currentSpots.nth(0);

      const spotId = await bookedSpot.getAttribute("id");
      console.log(`\nReleasing spot (${spotId || 'No ID'})...`);

      await bookedSpot.scrollIntoViewIfNeeded();
      await bookedSpot.click();

      const bookedSpotText = await this.locatorsPage.bookedSpot.textContent();
      console.log(`Booking details: ${bookedSpotText?.trim()}`);

      await this.webElementActionClass.Click(this.locatorsPage.realese_space_btn);
      await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });

      console.log(`Released booking for ${spotId || 'unknown ID'}`);
      await this.page.waitForTimeout(3000);
    }

    console.log("All booked spots released.");
    return true;

  }


  // Navigate to the member dashboard
  async NavigateToDashboard() {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Navigating to Dashboard...");
    console.log("----------------------------------");
    await this.page.reload();
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('domcontentloaded');
    await this.webElementActionClass.Click(this.locatorsPage.member_dashboard_text);
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(4000)
    console.log("\n<<================================================================>>");

  }

  // Book a desk spot from the grid layout

  async bookDeskSpotFromGrid() {
    console.log("Starting Grid Layout Desk Spot Booking...");
    await this.webElementActionClass.Click(this.locatorsPage.availableFirstDaysForBooking);
    await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
    await this.page.waitForTimeout(5000)
    await this.printAvailableDeskSpots();
    await this.printAvailableMeetingRooms();
    await this.webElementActionClass.Click(this.locatorsPage.desk_spot_First);
    await this.webElementActionClass.Click(this.locatorsPage.book_space_btn);
    await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });

    console.log("Success message is displayed.");

    const bookingDate = await this.locatorsPage.currunt_booking_book_space_btn.getAttribute('value');
    console.log(`Booking Date: ${bookingDate}`);
    await this.page.waitForTimeout(2000)
    const bookedSpots = await this.locatorsPage.booked_desk_spot.all();
    console.log(`Total Booked Desk Spots: ${bookedSpots.length}`);

    for (let i = 0; i < bookedSpots.length; i++) {
      const spotTitle = await bookedSpots[i].getAttribute('title');
      console.log(`Booked Desk Spot ${i + 1}: ${spotTitle}`);
    }
  }

  // Print available meeting rooms from the grid layout

  async printAvailableMeetingRooms() {
    const meetingRooms = await this.locatorsPage.meeting_Room_Available.all();
    console.log(`Total Meeting Rooms Available: ${meetingRooms.length}`);

    if (meetingRooms.length === 0) {
      throw new Error("No meeting rooms available for booking!");
    }

    for (let i = 0; i < meetingRooms.length; i++) {
      const title = await meetingRooms[i].getAttribute('title');
      console.log(`Meeting Room ${i + 1}: ${title}`);
    }
  }
  // Print available desk spots from the map layout
  async printAvailableDeskSpots() {
    //const deskSpots = await this.locatorsPage.desk_spot_Available.all();
    const deskSpots = await this.locatorsPage.park_spot_Available.all();
    console.log("\n");
    console.log(`Total Spots Available: ${deskSpots.length}`);

    if (deskSpots.length === 0) {
      throw new Error("No spots available for booking!");
    }
    console.log("\n");
    console.log("*********************");
    console.log("Available Spots:");
    console.log("*********************");
    for (let i = 0; i < deskSpots.length; i++) {
      const title = await deskSpots[i].getAttribute('title');
      console.log(`Spot:- ${i + 1}: ${title}`);
    }
  }

  async printAvailablePArkingSpotsOnAdmin() {
    //const deskSpots = await this.locatorsPage.desk_spot_Available.all();

    const availSpots = await this.locatorsPage.admin_All_Available_Spots.all();
    const bookedSpots = await this.locatorsPage.admin_All_Booked_Spots.all();
    console.log("\n");
    console.log(`Total Spots Available: ${availSpots.length}`);
    console.log("\n");
    console.log(`Total Booked Spot: ${bookedSpots.length}`);
    console.log("\n");
    const totalSpots = bookedSpots.length + availSpots.length;
    console.log(`Total Spots: ${totalSpots}`);


    if (availSpots.length === 0) {
      throw new Error("No spots available for booking!");
    }
    console.log("\n");
    console.log("*********************");
    console.log("Available Spots:");
    console.log("*********************");
    for (let i = 0; i < availSpots.length; i++) {
      const title = await availSpots[i].innerText();
      console.log(`Spot:- ${i + 1}: ${title}`);
    }
    console.log("<<================================================================>>");
  }

  // Book a spot from the map layout
  async bookSpotFromMap() {
    console.log("Starting Map Layout Car Spot Booking...");
    await this.webElementActionClass.Click(this.locatorsPage.availableFirstDaysForBooking);
    await this.webElementActionClass.Click(this.locatorsPage.goto_map_btn);
    await this.page.waitForTimeout(5000)
    await this.printAvailableDeskSpots();
    await this.webElementActionClass.Click(this.locatorsPage.desk_spot_First);
    await this.selectSecondOptionFromDropdown(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List);
    await this.webElementActionClass.Click(this.locatorsPage.book_space_btn);
    await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });

    console.log("Success message is displayed.");
    const bookingDate = await this.locatorsPage.currunt_booking_book_space_btn.getAttribute('value');
    console.log(`Booking Date: ${bookingDate}`);
    await this.page.waitForTimeout(2000)
    const bookedSpots = await this.locatorsPage.booked_desk_spot.all();
    console.log(`Total Booked Spots: ${bookedSpots.length}`);

    for (let i = 0; i < bookedSpots.length; i++) {
      const spotTitle = await bookedSpots[i].getAttribute('title');
      console.log(`Booked Spot ${i + 1}: ${spotTitle}`);
    }
  }


  // Perform user check-in operation
  async performCheckIn() {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Perform CheckIn...");
    console.log("----------------------------------");
    await this.page.waitForTimeout(3000)
    if (await this.locatorsPage.check_in_icon.isVisible()) {
      await this.webElementActionClass.Click(this.locatorsPage.check_in_out_button);
      await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
      console.log("Success message is displayed.");
      console.log('User checked in Successfully');
    } else {
      console.log('User already checked in');
    }
    console.log("\n=================================================");
    await this.page.waitForTimeout(3000)

  }
  // Perform user checkout operation
  async performCheckout() {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Perform CheckOut...");
    console.log("----------------------------------");
    await this.page.waitForTimeout(3000)
    if (await this.locatorsPage.check_out_icon.isVisible()) {
      await this.webElementActionClass.Click(this.locatorsPage.check_in_out_button);
      await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
      console.log("Success message is displayed.");
      console.log('User checked Out Successfully');
    } else {
      console.log('User already checked Out');
    }
    console.log("\n=================================================");
  }

  // Select a team member from the dropdown based on index
  async selectTeamMember(index: number) {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Selecting Team Member");
    console.log("----------------------------------");
    await this.locatorsPage.team_member_drp.waitFor();

    const options = await this.locatorsPage.team_member_drp.locator("option").allTextContents();
    console.log("\n********************************");
    console.log("Team Member Dropdown Options:");
    console.log("********************************");
    options.forEach((text, index) => console.log(`  ${index + 1}: ${text}`));

    if (options.length > 1) {
      await this.locatorsPage.team_member_drp.selectOption({ index });
      console.log(`--Successfully selected Team Member: ${options[index]}`);
    } else if (options.length > 0) {
      // ✅ If only one option exists, select the first option (index 0)
      await this.locatorsPage.team_member_drp.selectOption({ index: 0 });
      console.log(` Only one option available. Selected: ${options[0]}`);
    } else {
      console.log(" No options available in the dropdown. Selection skipped.");
    }

    await this.page.waitForTimeout(5000);
    console.log("=================================================");
  }

  // Select a team member from the map dropdown based on index
  async selectTeamMemberFromMap(index: number) {

    await this.locatorsPage.team_member_drp_map.waitFor();

    const options = await this.locatorsPage.team_member_drp_map.locator("option").allTextContents();

    console.log("Team Member Dropdown Options:");
    options.forEach((text, index) => console.log(`  ${index + 1}: ${text}`));

    if (options.length > 1) {
      await this.locatorsPage.team_member_drp_map.selectOption({ index });
      console.log(`--Successfully selected Team Member: ${options[index]}`);
    } else if (options.length > 0) {
      // ✅ If only one option exists, select the first option (index 0)
      await this.locatorsPage.team_member_drp_map.selectOption({ index: 0 });
      console.log(` Only one option available. Selected: ${options[0]}`);
    } else {
      console.log(" No options available in the dropdown. Selection skipped.");
    }

    await this.page.waitForTimeout(5000);
  }


  // Method to check and print the name of the assigned spot on the map
  async AssignedSpotNameonMap() {
    await this.page.waitForTimeout(3000);

    const assignedLocator = this.page.locator("//div[contains(@class,'SpotID_assigned')]");
    try {
      await assignedLocator.first().waitFor({ state: "visible", timeout: 5000 });
    } catch (e) {
      console.log("No assigned spots found on the map.");
      // throw new error("No assigned spots found on the map.,", error)
    }
    const allAssignedSpots = await assignedLocator.all();
    let released = false;

    for (const spot of allAssignedSpots) {
      await spot.hover();
      // await this.page.waitForTimeout(3000);
      //await this.webElementActionClass.Click(spot);
      // await spot.click({ force: true });
      const spotNumber = await spot.getAttribute("data-spotnumber");
      console.log("Newly Booked Spot:", spotNumber);
      released = true;
      break; // stop after releasing one
    }

    if (!released) {
      console.log("No spot was Booked.");
    }
  }


  // Method to select the first available date in the next month
  async selectNextMonthFirstAvailableDate() {
    // Open the datepicker by clicking the input field
    const datePickerInput = this.page.locator('#select_bookingdate');
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(datePickerInput);


    // Wait for calendar popup to appear
    const calendarNextBtn = this.page.locator('.datepicker-days .next');
    await expect(calendarNextBtn).toBeVisible();

    // Click next month arrow
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(calendarNextBtn);
    await this.page.waitForTimeout(1000); // wait for calendar to update

    // Select first available date in the next month
    const availableDates = this.page.locator('.datepicker-days td.day:not(.old):not(.new):not(.disabled)');
    const firstAvailable = availableDates.first();
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(firstAvailable);


    // Get selected value from input field and log it
    const selectedDate = await datePickerInput.inputValue();

    // Format the date to DD-MM-YYYY if needed (depends on input value format)
    const dateParts = selectedDate.split('-'); // assuming format is 'YYYY-MM-DD' or 'DD-MM-YYYY'

    let formattedDate = selectedDate;
    if (dateParts[0].length === 4) {
      // If format is YYYY-MM-DD
      formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    }

    console.log('Selected Date For Booking :', formattedDate);
  }

  // Method to refresh the page and count available and unavailable days

  async refreshAndCountDayAll() {

    // ✅ Get all refresh elements
    await this.page.waitForTimeout(3000);
    const refreshElements = await this.locatorsPage.refreshButton.all();
    console.log(`Total Refresh Element: ${refreshElements.length}`);

    // for (const element of refreshElements) {
    //   // ✅ Scroll and click the refresh element
    //   await element.scrollIntoViewIfNeeded();
    //   await this.page.waitForTimeout(3000);
    //   await element.click();
    //   console.log(`Clicked on Refresh icon`);
    //   await this.page.waitForTimeout(3000);
    // }

    await this.page.waitForTimeout(2000);

    while (true) {
      const refreshButtons = this.locatorsPage.refreshButton;
      const count = await refreshButtons.count();

      await this.page.waitForTimeout(2000);
      if (count === 0) {
        console.log('No more refresh buttons found. Exiting loop.');
        break;
      }

      const firstButton = refreshButtons.nth(0);

      const isDisabled = await firstButton.evaluate(el => (el as HTMLButtonElement).disabled).catch(() => true);
      const isVisible = await firstButton.isVisible().catch(() => false);

      if (!isDisabled && isVisible) {
        await firstButton.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
        await this.webElementActionClass.Click(firstButton);
        // Wait for success condition (optional)

        //await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000); // small delay between clicks
        console.log(`Clicked on Refresh icon`);
      }

      else {
        console.log('First refresh icon is disabled or not visible. Breaking loop.');
        break;
      }
    }



    // ✅ Count available booking days
    const availableDays = await this.locatorsPage.availableDays.all();
    console.log(`Total Available Days for Booking: ${availableDays.length}`);

    // ✅ Count not available booking days
    const notAvailableDays = await this.locatorsPage.notAvailableDays.all();
    console.log(`Total Not Available Days for Booking: ${notAvailableDays.length}`);

    // ✅ Check if no booking space is available
    if (availableDays.length === 0) {
      console.error("No space available for booking! Please contact the admin.");
      throw new Error("No space available for booking! Please contact the admin.");
    }
  }
  // Verifies if the booked spot is visible and matches the success toast message.
  async verifybookedSpotWithTostMessage() {
    try {
      await this.locatorsPage.bookedSpot.waitFor({ state: "visible", timeout: 20000 });
    } catch (error) {
      throw new Error("Error: `Facing Issue In Booking Spot");
    }
    const isBookedSpotVisible = await this.locatorsPage.bookedSpot.isVisible();

    if (!isBookedSpotVisible) {
      console.error('Booked Spot element is NOT visible.');
      console.log("=================================================");
      throw new Error(`Facing Issue In Booking Spot: ${error}`);

    } else {
      const bookedSpotText = await this.locatorsPage.bookedSpot.textContent();
      const bookedSpot = bookedSpotText?.trim() || '';
      console.log(`\nBooked Spot: "${bookedSpot}"`);
      await this.verifySuccessToastMatchesSpot(this.locatorsPage.succsessMessage.first(), bookedSpot);
    }


  }


  async verifybookedSpotWithTostMessageOnHourly() {
    await this.page.waitForTimeout(2000);
    await this.locatorsPage.parking_booked_hourly_spot.waitFor({ state: "visible", timeout: 20000 });
    const isBookedSpotVisible = await this.locatorsPage.parking_booked_hourly_spot.isVisible();
    if (!isBookedSpotVisible) {
      console.error('Booked Spot element is NOT visible.');
      throw new Error(`Facing Issue In Booking Spot: ${error}`);
    } else {
      const bookedSpotText = await this.locatorsPage.parking_booked_hourly_spot.getAttribute("title");
      const bookedSpot = bookedSpotText?.trim() || '';
      console.log(`\nBooked Spot: "${bookedSpot}"`);
      await this.verifySuccessToastMatchesSpot(this.locatorsPage.succsessMessage.first(), bookedSpot);
    }

  }

  async verifybookedSpotWithTostMessageOnMap() {
    await this.page.waitForTimeout(2000);
    await this.locatorsPage.booked_desk_spot.waitFor({ state: "visible", timeout: 20000 });
    const isBookedSpotVisible = await this.locatorsPage.booked_desk_spot.isVisible();
    if (!isBookedSpotVisible) {
      console.error('Booked Spot element is NOT visible.');
      throw new Error(`Facing Issue In Booking Spot: ${error}`);
    } else {
      const bookedSpotText = await this.locatorsPage.booked_desk_spot.getAttribute("title");
      const bookedSpot = bookedSpotText?.trim() || '';
      console.log(`\nBooked Spot: "${bookedSpot}"`);
      await this.verifySuccessToastMatchesSpot(this.locatorsPage.succsessMessage.first(), bookedSpot);
    }
  }




  // Generic method to assert if a given element is visible on the page.

  async assertElementVisible(element: Locator, errorMessageElement: string): Promise<void> {
    try {
      await expect(element).toBeVisible({ timeout: 20000 });
      console.log(`Assertion Passed: ${errorMessageElement} is visible.`);
    } catch (error) {
      throw new Error(`\nAssertion Failed on: ${errorMessageElement}`);
    }
  }
  // Generic method to assert if a given element is hidden on the page.
  async assertElementHidden(element: Locator, errorMessageElement: string): Promise<void> {
    try {
      await expect(element).toBeHidden({ timeout: 20000 });
      console.log("\n");
      console.log(`Assertion Pass On: ${errorMessageElement}`);
    } catch (error) {
      throw new Error(`\nAssertion Failed on: ${errorMessageElement}`);
    }
  }

  // Logs the counts of different types of parking spots displayed on the map.
  async printParkingSpotDetails() {
    // Count all spots
    const allSpotsCount = await this.locatorsPage.Map_parking_all_spots.count();
    // Count hourly spots
    const hourlySpotsCount = await this.locatorsPage.parking_hourly_all_spots.count();
    // Count all-day spots
    const allDaySpotsCount = await this.locatorsPage.parking_allday_all_spots.count();
    // Count inactive spots
    const inactiveSpotsCount = await this.locatorsPage.parking_inactive_all_spots.count();

    const totalSpotsCount = hourlySpotsCount + allDaySpotsCount + inactiveSpotsCount;
    console.log(`\nTotal Count from All Spots: ${totalSpotsCount}`);
    console.log(`\nHourly Spots: ${hourlySpotsCount}`);
    console.log(`\nAll-day Spots: ${allDaySpotsCount}`);
    console.log(`\nInactive Spots: ${inactiveSpotsCount}`);
    return {
      allSpotsCount,
      hourlySpotsCount,
      allDaySpotsCount,
      inactiveSpotsCount,
      totalSpotsCount
    };

  }

  async printMeetingSpotDetails() {
    // Count all spots
    const allSpotsCount = await this.locatorsPage.Map_Meeting_all_rooms.count();
    // Count hourly spots
    console.log("\n");
    console.log(`All Meeting Rooms: ${allSpotsCount}`);
    return {
      allSpotsCount,
    };

  }

  // Returns the next 30-minute time slot from the current time.
  // Example: if current time is 12:10 → returns 12:30 to 13:00
  //          if current time is 12:40 → returns 13:00 to 13:30
  async getNext30MinSlot(): Promise<{ start: string; end: string; }> {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();

    let startHour = hour;
    let startMinute = 0;
    let endHour = hour;
    let endMinute = 0;

    if (minute < 30) {
      // Book next half slot: hh:30 → hh+1:00
      startMinute = 30;
      endHour = hour + 1;
      endMinute = 0;
    } else {
      // Book next hour slot: hh+1:00 → hh+1:30
      startHour = hour + 1;
      startMinute = 0;
      endHour = hour + 1;
      endMinute = 30;
    }

    return {
      start: `${pad(startHour)}:${pad(startMinute)}`,
      end: `${pad(endHour)}:${pad(endMinute)}`
    };

    function pad(n: number): string {
      return n < 10 ? `0${n}` : `${n}`;
    }
  }

  async MeetingReapeatOptions(optionText?: string, index?: number, defaultIndex: number = 0) {
    await this.page.waitForTimeout(1000);
    const dropdownSelector = "select#mb_repeatoption";

    // Get all options
    const options = await this.page.$$eval(`${dropdownSelector} option`, (elements) =>
      elements.map(option => option.textContent?.trim() || '')
    );
    console.log("\n");
    console.log("*************************");
    console.log("Select Reapeat Options:");
    console.log("*************************");
    for (let i = 0; i < options.length; i++) {
      console.log(`Reapeat Options: ${i + 1}: ${options[i]}`);
    }

    // Get the currently selected option
    const currentlySelected = await this.page.$eval(`${dropdownSelector} option:checked`, (option) =>
      option.textContent?.trim() || 'N/A'
    );
    console.log("\n");
    console.log(`Default Options: ${currentlySelected}`);

    let selectedText = optionText && options.includes(optionText) ? optionText :
      index !== undefined && index >= 0 && index < options.length ? options[index] :
        options[defaultIndex];

    if (currentlySelected === selectedText) {
      console.log(`"${selectedText}" is already selected. Skipping selection.`);
      console.log("<<================================================================>>");
      return;
    }
    console.log("\n");
    console.log(`Selecting Option: ${selectedText}`);
    console.log("=================================================");

    // Wait for possible page navigation
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => console.log("->")),
      this.page.selectOption(dropdownSelector, { label: selectedText })
    ]);

    await this.page.waitForTimeout(2000); // Ensure page settles

    const newSelected = await this.page.$eval(`${dropdownSelector} option:checked`, (option) =>
      option.textContent?.trim() || 'N/A'
    );

    console.log(`Newly Selected Option: ${newSelected}`);
    console.log("<<================================================================>>");
    return newSelected;
  }



  async verifySuccessToastMatche(ActualText: any, expectedText: string) {
    console.log(`\n✅ Verifying success toast message...`);
    console.log(`Actual Text: "${ActualText}"`);
    console.log(`Expected Text: "${expectedText}"`);
    expect(ActualText).toBe(expectedText);
  }

  // ✅ Navigate to Member Settings
  async GeneralSettings_Elements() {

    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log("Checking if General Settings");
    console.log("--------------------------------------------------------------------");
    await this.waitActionClass.waitForNetworkIdleOrTimeout(10000);
    await this.page.waitForTimeout(3000);
    console.log("\nClicking on 'Member Setting' menu...");
    await this.webElementActionClass.Click(this.locatorsPage.member_setting_menu);
    await this.page.waitForTimeout(2000);
    console.log("\nClicking on 'General Setting' under Member Settings...");
    await this.webElementActionClass.Click(this.locatorsPage.member_general_setting_menu);
    await this.waitActionClass.waitForNetworkIdleOrTimeout(10000);
    await this.page.waitForTimeout(1000);
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.member_email_text);
    const email = await this.locatorsPage.member_email_text.getAttribute('value') || '';
    console.log(`Verifying Member Email: ${email}`);
    expect(email).toBe(this.currentUser.Email);
    this.firstName = await this.locatorsPage.member_first_name_text.getAttribute('value') || '';
    console.log(`Verifying Member First Name: ${this.firstName}`);
    const lastName = await this.locatorsPage.member_last_name_text.getAttribute('value') || '';
    console.log(`Verifying Member Last Name: ${lastName}`);
    this.firstName = this.firstName.trim() + " " + lastName.trim();
    await this.assertElementVisible(this.locatorsPage.member_zone_dropdown, "Default Zone Dropdown");
    await this.assertElementVisible(this.locatorsPage.member_group_dropdown, "Member Group Dropdown");

    console.log("<<================================================================>>");
  }

  async search_Bookings() {

    console.log("\n");
    console.log("--------------------------------------------------------------------");
    console.log("Search Bookings and Verifying Elements");
    console.log("--------------------------------------------------------------------");
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.member_Search_by_name);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.member_Search_by_name, this.firstName ?? "");
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
    await this.waitActionClass.waitForElementVisible(this.locatorsPage.member_first_Search_Year);
    const year = await this.locatorsPage.member_first_Search_Year.innerText() || '';
    console.log(`Verifying Search Year: ${year} and Booking Date: ${this.bookingDate_search}`);
    await this.assertSearchAndBookingDate(year, this.bookingDate_search ?? "");
    const date = await this.locatorsPage.member_first_Search_Date.innerText() || '';
    console.log(`Verifying Booking Date: ${date} and Booking Date: ${this.bookingDate_search}`);
    await this.assertSearchDayMatchesBookingDate(date, this.bookingDate_search ?? "");
    const SpotidZone = await this.locatorsPage.member_first_Search_Spot_Number.innerText() || '';
    console.log(`Get Booking info: ${SpotidZone} `);
    await this.assertBookingSpotMatches(SpotidZone, this.SearchBooked_spot ?? "");
    await this.assertUserZoneInBookingInfo(this.currentUser.ZONE, SpotidZone ?? "");

    console.log("<<================================================================>>");
  }

  async assertUserZoneInBookingInfo(userZoneText: string, bookingInfoText: string) {
    console.log(`Verifying Zone in Booking Info...${this.currentUser.ZONE}`);
    const userZone = userZoneText.replace('Get User Zone:', '').trim(); // "Parking-NOMAP-AD"

    // Extract the zone part inside parentheses from booking info
    const zoneInBooking = bookingInfoText.match(/\(\s*(.*?)\s*\)/)?.[1]; // "Parking-NOMAP-AD"
    console.log(`Verifying Expected Zone: ${zoneInBooking}`);
    console.log(`Verifying Actual Zone: "${userZone}"`);

    expect(zoneInBooking).toBe(userZone);
  }

  async assertBookingSpotMatches(bookingText: string, spotText: string) {
    console.log(`Verifying Spot in Booking Info...`);
    // Extract the spot ID from "Verifying Booking Spot ID: SPOTCAR1 ( Parking-NOMAP-AD )"
    const extractedSpotID = bookingText
      .replace('Verifying Booking Spot ID:', '')
      .split('(')[0] // Get text before (
      .trim();        // "SPOTCAR1"

    // Clean up the spot text if needed
    const expectedSpot = spotText.replace('Booking Spot:', '').trim(); // "SPOTCAR1"
    console.log(`Verifying Expected Spot: ${expectedSpot}`);
    console.log(`Verifying Actual Spot: "${extractedSpotID}"`);
    expect(extractedSpotID).toBe(expectedSpot);

  }

  async assertSearchAndBookingDate(searchText: string, bookingDate: string) {
    // Extract year and month from the searchText
    const expectedYearMonth = new Date(bookingDate).toLocaleString('default', { month: 'long', year: 'numeric' }); // e.g. "June 2025"
    // Normalize and compare
    console.log(`Verifying Expected Month: ${expectedYearMonth}`);
    console.log(`Verifying Actual Month: "${searchText.trim()}"`);
    expect(searchText.trim()).toBe(`${expectedYearMonth}`);
  }

  async assertSearchDayMatchesBookingDate(searchText: string, bookingDate: string) {
    const expectedDay = new Date(bookingDate).getDate().toString(); // "11"
    const actualDay = searchText.trim().replace('Verifying Search Date: ', '').trim();

    expect(actualDay).toBe(expectedDay);
  }


  async bookSpotCurruntDayFromCalendar_search() {
    console.log("\n");
    console.log("----------------------------------");
    console.log("Booking Today's Spot From Calander.");
    console.log("----------------------------------");
    await this.refreshAndCountDays();
    await this.releaseAnyBookedSpot();
    const todayDateId = dayjs().format('YYYY-MM-DD'); // example: '2025-04-07'
    console.log(`\nToday Date :- (${todayDateId}).`);
    await this.page.waitForTimeout(2000);
    const availableDays = await this.locatorsPage.availableDaysfromcurrunt.all();
    let clicked = false;

    for (const day of availableDays) {
      const id = await day.getAttribute('id');
      if (id === todayDateId) {
        console.log(`\nFound today's available spot (${id}). Clicking...`);
        this.bookingDate_search = id;
        await day.scrollIntoViewIfNeeded();
        await this.webElementActionClass.Click(day);
        console.log("Verifying The Select Vehicle Dropdown Is Present on Booking Pop Up");
        await this.selectSecondOptionFromDropdown(this.locatorsPage.selectVehicleDropdown, ElementsName.DropDowns.Vehicle_List);
        await this.webElementActionClass.Click(this.locatorsPage.getRandomSpaceButton);
        console.log("\nClicked on 'Get Random Space' button. Waiting for booking popup message...");
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
        console.log("\nSuccess message is displayed.");
        await this.page.waitForTimeout(1000);
        await this.verifybookedSpotWithTostMessage();
        const bookedSpotText = await this.locatorsPage.bookedSpot.textContent();
        this.SearchBooked_spot = bookedSpotText?.trim()
        console.log(`Verifying booked Spot: ${this.SearchBooked_spot}`);
        clicked = true;
        await this.page.waitForTimeout(2000);
        break;
      }
    }

    if (!clicked) {
      console.error(`Not able Booking on Currunt Day's spot (${todayDateId})`, error);
      throw new Error(`Not able Booking on Currunt Day's spot (${todayDateId})`);
    }

    console.log("\n<<================================================================>>");
  }



  async assertTextByXPath(xpath: Locator, expectedText: string, fieldName?: string) {
    await this.waitActionClass.waitForElementVisible(xpath);
    const actualText = (await xpath.textContent())?.trim(); // Trim the actual text
    const trimmedExpectedText = expectedText.trim(); // Trim the expected text (optional safety)

    console.log(`Verifying text of ${fieldName}:\n`);
    console.log(`Expected Text: "${trimmedExpectedText}"`);
    console.log(`Actual Text: "${actualText}"`);

    await expect(actualText).toBe(trimmedExpectedText);
    console.log('\n');

    console.log(`Assertion Pass Successfully on: ${fieldName}`);
  }

  async assertTextByXPathContains(xpath: Locator, expectedText: string, fieldName?: string) {
    await this.waitActionClass.waitForElementVisible(xpath);
    const actualText = (await xpath.textContent())?.trim(); // Trim the actual text
    const trimmedExpectedText = expectedText.trim(); // Trim the expected text (optional safety)

    console.log(`Verifying text of ${fieldName}:\n`);
    console.log(`Expected Text: "${trimmedExpectedText}"`);
    console.log(`Actual Text: "${actualText}"`);

    await expect(actualText).toContain(trimmedExpectedText);
    console.log('\n');

    console.log(`Assertion Pass Successfully on: ${fieldName}`);
  }

  async toggleSwitchById(switchLocator: Locator, fieldName: string, desiredState?: 'on' | 'off') {
    await switchLocator.waitFor({ state: 'visible' });

    const isChecked = await switchLocator.isChecked(); // true = on, false = off
    const currentState = isChecked ? 'on' : 'off';
    console.log('\n');
    console.log(`Current state of ${fieldName}: ${currentState} Toggle`);

    if (desiredState !== undefined) {
      console.log(`Desired state of ${fieldName}: ${desiredState}`);

      if (currentState !== desiredState) {
        await switchLocator.click();
        console.log(`Switched ${fieldName} to ${desiredState}`);
      } else {
        console.log(`${fieldName} is already in desired state: ${desiredState}`);
      }
    } else {
      console.log(`No desired state provided for ${fieldName}. Only current state checked.`);
    }
  }

  async selectCustomDropdownOptions(dropdownToggleLocator: Locator, optionLabels: string) {
    // Click to open dropdown
    await dropdownToggleLocator.click();

    for (const label of optionLabels) {
      // Construct the checkbox label locator dynamically
      const optionLocator = this.page.locator(`//label[contains(@class, 'checkbox') and contains(normalize-space(.), '${label}')]//input[@type='checkbox']`);

      const isChecked = await optionLocator.isChecked();
      if (!isChecked) {
        await optionLocator.click();
        console.log(`✅ Selected option: ${label}`);
      } else {
        console.log(`ℹ️ Option already selected: ${label}`);
      }
    }

    // Optional: Click outside or press Escape to close the dropdown if needed
    // await this.page.keyboard.press('Escape');
  }

  async toLowerIfAlphaPresent(input: string): Promise<string> {
    const containsAlphabet = /[a-zA-Z]/.test(input);
    return containsAlphabet ? input.toLowerCase() : input;
  }

  async toUpperIfAlphaPresent(input: string): Promise<string> {
    const containsAlphabet = /[a-zA-Z]/.test(input);
    return containsAlphabet ? input.toUpperCase() : input;
  }

  async validateLabelElementsMatchAllExpected(locator: Locator, expectedHeaders: string[], label: string): Promise<void> {
    await this.waitActionClass.waitForElementVisible(locator.first());
    const count = await locator.count();
    console.log('\n')
    console.log(`Validating "${label}" Labels: Found ${count} elements.`);
    console.log('------------------------------------');

    for (let i = 0; i < count; i++) {
      const text = (await locator.nth(i).textContent())?.trim();
      console.log(`Label ${i + 1}: "${text}"`);

      if (!text) {
        throw new Error(`❌ Label ${i + 1} text is empty or null.`);
      }
      expect(expectedHeaders).toContain(text);
    }
    console.log(`✅ All "${label}" labels matched expected list.`);
  }

  async validateMultipleHoverPopupsWithExpectedText(hoverTargets: Locator, expectedTexts: string[], label: string
  ) {
    const count = await hoverTargets.count();
    console.log('\n');
    console.log(`Validating "${label}" hover popups: Found ${count} hoverable elements.`);
    console.log('----------------------------------------------------');

    for (let i = 0; i < count; i++) {
      const hoverTarget = hoverTargets.nth(i);

      // Hover over the element
      await hoverTarget.hover();
      console.log(`Hovered over element ${i + 1}`);

      // Wait for the popup to appear
      await hoverTarget.waitFor({ state: 'visible', timeout: 5000 });

      // Get popup text
      const actualText = (await hoverTarget.getAttribute('aria-label'))?.trim();
      const expectedText = expectedTexts[i];
      console.log(`\n`);
      console.log(`Hover Popup ${i + 1}:`);
      console.log(`Expected = ${expectedText}`);
      console.log(`Actual   = ${actualText}`);


      if (!actualText) {
        throw new Error(`❌ Popup ${i + 1} text is empty or not visible.`);
      }

      // Assert
      expect(actualText, `❌ Mismatch at popup ${i + 1}`).toBe(expectedText);

      // Optional: Hide tooltip if it stays on screen
      await this.page.mouse.move(0, 0);
      await this.page.waitForTimeout(300); // wait before next hover
    }

    console.log(`✅ All "${label}" popup hover texts matched expected values.`);
  }

  async selectAllIfNotSelected(dropdownLocator: Locator, selectAllCheckboxLocator: Locator) {
    console.log('🔍 Checking Select All status...');

    // Open the dropdown
    await dropdownLocator.click();

    // Check if it's already selected
    const isActive = await selectAllCheckboxLocator.evaluate(el => el.classList.contains('active'));
    if (!isActive) {
      console.log('✅ Selecting all options...');
      await selectAllCheckboxLocator.check();
    } else {
      console.log('⚡ Already selected. Skipping...');
    }

    // Optional: Close dropdown (if needed)
    await dropdownLocator.click();
  }


  async typeString(password: string) {
    for (const char of password) {
      await this.page.keyboard.press(char);
      await this.page.waitForTimeout(100); // optional small delay between keystrokes
    }
  }

  async refreshAndCountDayAllDAy() {

    // ✅ Get all refresh elements
    await this.page.waitForTimeout(3000);
    const refreshElements = await this.locatorsPage.refreshButton.all();
    console.log(`Total Refresh Element: ${refreshElements.length}`);

    for (const element of refreshElements) {
      // ✅ Scroll and click the refresh element
      await element.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(3000);
      await element.click();
      console.log(`Clicked on Refresh icon`);
      await this.page.waitForTimeout(3000);
    }

    await this.page.waitForTimeout(2000);

    while (true) {
      const refreshButtons = this.locatorsPage.refreshButton;
      const count = await refreshButtons.count();

      await this.page.waitForTimeout(2000);
      if (count === 0) {
        console.log('No more refresh buttons found. Exiting loop.');
        break;
      }

      const firstButton = refreshButtons.nth(0);

      const isDisabled = await firstButton.evaluate(el => (el as HTMLButtonElement).disabled).catch(() => true);
      const isVisible = await firstButton.isVisible().catch(() => false);

      if (!isDisabled && isVisible) {
        await firstButton.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
        await this.webElementActionClass.Click(firstButton);
        // Wait for success condition (optional)

        //await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000); // small delay between clicks
        console.log(`Clicked on Refresh icon`);
      }

      else {
        console.log('First refresh icon is disabled or not visible. Breaking loop.');
        break;
      }
    }



    // ✅ Count available booking days
    const availableDays = await this.locatorsPage.availableDays.all();
    console.log(`Total Available Days for Booking: ${availableDays.length}`);

    // ✅ Count not available booking days
    const notAvailableDays = await this.locatorsPage.notAvailableDays.all();
    console.log(`Total Not Available Days for Booking: ${notAvailableDays.length}`);

    // ✅ Check if no booking space is available
    if (availableDays.length === 0) {
      console.error("No space available for booking! Please contact the admin.");
      throw new Error("No space available for booking! Please contact the admin.");
    }
  }




  /**
   * Ensures a checkbox is set to the desired state (checked/unchecked)
   * @param checkboxLocator - The Playwright locator for the checkbox
   * @param shouldBeChecked - true = checked, false = unchecked
   */
  async setCheckboxState(checkboxLocator: Locator, shouldBeChecked: boolean) {
    await checkboxLocator.waitFor({ state: "visible", timeout: 15000 });
    const isChecked = await checkboxLocator.isChecked();
    console.log(`Current status: ${isChecked}, Desired: ${shouldBeChecked}`);

    if (isChecked !== shouldBeChecked) {
      await checkboxLocator.click();
      console.log(`Checkbox updated -> ${shouldBeChecked ? "Checked" : "Unchecked"}`);
    } else {
      console.log("No action needed, already in desired state.");
    }

    // Final assert to make sure state is correct
    if (shouldBeChecked) {
      await expect(checkboxLocator).toBeChecked();
    } else {
      await expect(checkboxLocator).not.toBeChecked();
    }
  }


  async hoverAndAssert(Selector: Locator, expectedString: string, elementName: string) {

    console.log(`Hovering over element: ${elementName}...`);
    // Perform hover
    await Selector.hover();
    const actualText = (await Selector.getAttribute('aria-label'))?.trim();
    console.log(`Verifying text of ${elementName}:\n`);
    console.log(`Expected Text: "${expectedString}"\n`);
    console.log(`Actual Text: "${actualText}"`);
    expect(actualText).toBe(expectedString);
    console.log(`✅ Hover action verified successfully for: ${elementName}\n`);
  }
  async getRandomMessage(prefix: string = "Win") {
    return `${prefix}_${Math.floor(1000 + Math.random() * 9000)}`;
  }



  async validateHeaderElementsMatchExpected(locator: Locator, expectedHeaders: string[], label: string): Promise<void> {
    const count = await locator.count();
    console.log('\n')
    console.log(`Validating "${label}" Headers: Found ${count} elements.`);
    console.log('------------------------------------');

    for (let i = 0; i < count; i++) {
      const text = (await locator.nth(i).textContent())?.trim();
      console.log(`Header ${i + 1}: "${text}"`);

      if (!text) {
        throw new Error(`❌ Header ${i + 1} text is empty or null.`);
      }
      expect(expectedHeaders).toContain(text);
    }
    console.log(`✅ All "${label}" headers matched expected list.`);
  }



}




