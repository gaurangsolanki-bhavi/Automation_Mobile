import { Locator, Page, expect } from "@playwright/test";
import WaitActionClass from "../../Actions/WaitActions";
import WebElementActionClass from "../../Actions/WebElementActions";
import LocatorsPage from "../Locators";
import ReusableActionClass from "../../Actions/ReusableActions";
import ReusablePage from "./ReusablePage";
import UserSet from "../../test-data/JSON/admin_set_test.json"
import ZoneData from "../../test-data/JSON/zone_data.json"
import Memberdashboardpage from "./MemberDashboardPage";
import ElementsName from "../../test-data/JSON/Elements_Name.json"

let timeStamp;

export default class loginvalidationpage {
  private waitActionClass: WaitActionClass;
  private webElementActionClass: WebElementActionClass;
  private reusableActionClass: ReusableActionClass;
  private locatorsPage: LocatorsPage;
  private reusablePageClass: ReusablePage;
  private memberdashboardpage: Memberdashboardpage;


  constructor(public page: Page) {
    // Initialize class objects
    this.waitActionClass = new WaitActionClass(page);
    this.webElementActionClass = new WebElementActionClass(page);
    this.reusableActionClass = new ReusableActionClass(page);
    this.locatorsPage = new LocatorsPage(page);
    this.reusablePageClass = new ReusablePage(page);
    this.memberdashboardpage = new Memberdashboardpage(page);
  }
  // Get error message from the provided element
  async getErrorMessage(element: Locator): Promise<string> {
    await this.page.waitForTimeout(4000);
    return await element.innerText();
  }
  // Verify that the actual error message matches the expected one
  async verifyErrorMessage(expectedMessage: string, element: Locator) {
    try {
      const actualMessage = await this.getErrorMessage(element);
      expect(actualMessage.trim()).toContain(expectedMessage.trim());
      console.log('Error message matched successfully.');
    } catch (error) {
      console.error('Error message verification failed.');
      console.error(`Expected: "${expectedMessage}"`);
      console.error(`Actual:   "${await this.getErrorMessage(element)}"`);
      throw error; // re-throw to mark the test as failed
    }
    await this.page.reload();
  }

  // Loop through user data and validate login attempt with invalid users (with checkbox selected)
  async ValidateInvalidUserLogin(users: any[]) {

    for (const [index, user] of users.entries()) {
      console.log(`\nTest Data Row #${index + 1}`);
      console.log("Email:", user.Email ?? '');
      console.log("Expected Error Message:", user.Status);
      await this.page.waitForTimeout(5000);
      await this.reusablePageClass.sendMemberUsername(user.Email ?? '');
      await this.reusablePageClass.selectCheckboxIfNotSelected();
      await this.reusablePageClass.clickOnConfirmEmailbutton();
      await this.page.waitForTimeout(2000);
      await this.verifyErrorMessage(user.Status, this.locatorsPage.member_login_landing_email_error); // Status from same row is used for assertion
      // Optional: refresh after every user to reset the form
      await this.page.reload();
      await this.page.waitForLoadState('domcontentloaded');
    }
    console.log("\n<<================================================================>>");
  }
  // Verify that all elements on the login landing page are visible and contain correct text
  async verifyLandingPageElements() {
    console.log("\nVerifying 'Landing LoginPage 'elements...");
    await this.memberdashboardpage.verifyElementIsVisible(this.locatorsPage.member_landing_email_label, ElementsName.Landing_Login_page.EMAIL_LABEL);
    await this.memberdashboardpage.verifyElementIsVisible(this.locatorsPage.member_email_text, ElementsName.Landing_Login_page.EMAIL_Textbox);
    await this.memberdashboardpage.verifyElementIsVisible(this.locatorsPage.member_confirm_btn, ElementsName.Landing_Login_page.CONFIRM_BTN);
    await this.memberdashboardpage.verifyElementIsVisible(this.locatorsPage.member_radio_button, ElementsName.Landing_Login_page.Radio_btn);
    await this.memberdashboardpage.verifyElementIsVisible(this.locatorsPage.member_login_term_and_condition_link, ElementsName.Landing_Login_page.Radio_link);
    await this.memberdashboardpage.verifyElementIsVisible(this.locatorsPage.member_login_as_admin_btn, ElementsName.Landing_Login_page.LOGIN_AS_ADMIN_BTN);
    await this.memberdashboardpage.verifyElementIsVisible(this.locatorsPage.member_login_country_dropdown_click, ElementsName.Landing_Login_page.Country_Language_Btn);
    await this.verifyElementText("H1 Text", ElementsName.Landing_Login_page.H1_TEXT, this.locatorsPage.member_login_h1_text);
    await this.verifyElementText("P Text", ElementsName.Landing_Login_page.P_TEXT, this.locatorsPage.member_login_p_text);
    await this.verifyElementText("Check List Text", ElementsName.Landing_Login_page.CHECK_LIST, this.locatorsPage.member_login_check_list_text);
    await this.selectLanguage();
    await this.page.waitForTimeout(1000);
    console.log("\n<<================================================================>>");
  }
  // Validate login attempt without selecting terms & conditions checkbox
  async ValidateInValidUserLoginWithoutTermAndCondition(users: any[]) {

    for (const [index, user] of users.entries()) {
      console.log(`\nTest Data Row #${index + 1}`);
      console.log("Email:", user.Email ?? '');
      console.log("Expected Error Message:", user.Status);
      await this.page.waitForTimeout(5000);
      await this.reusablePageClass.sendMemberUsername(user.Email ?? '');
      await this.reusablePageClass.clickOnConfirmEmailbutton();
      await this.page.waitForTimeout(2000);
      await this.verifyErrorMessage(user.Status, this.locatorsPage.member_login_landing_TermAndCondition_error); // Status from same row is used for assertion
      // Optional: refresh after every user to reset the form
      await this.page.reload();
      await this.page.waitForLoadState('domcontentloaded');
    }
    console.log("\n<<================================================================>>");
  }



  // Select language from dropdown (default = English, or select by index/text)
  async selectLanguage(value?: string | number) {
    const dropdownButton = this.locatorsPage.member_login_country_dropdown;
    const dropdownItems = this.locatorsPage.member_login_country_dropdown_itm;

    // Open dropdown
    //await dropdownButton.click();
    await this.webElementActionClass.Click(this.locatorsPage.member_login_country_dropdown_click);

    await dropdownItems.first().waitFor({ state: 'visible' });

    // Print default selected
    const defaultSelected = await dropdownButton.textContent();
    console.log(`\nDefault selected: ${defaultSelected?.trim()}`);

    const items = await dropdownItems.all();

    // Print all available values
    console.log('---------------------------');
    console.log('Available languages:');
    console.log('---------------------------');

    for (let i = 0; i < items.length; i++) {
      const label = await items[i].innerText();
      console.log(`   ${i + 1}: ${label.trim()}`);
    }

    if (typeof value === 'number') {
      // Select by index
      if (value >= 0 && value < items.length) {
        await items[value].click();
        console.log(`Selected by index: ${value}`);
      } else {
        throw new Error(`Invalid index: ${value}`);
      }
    } else if (typeof value === 'string') {
      // Select by label
      const match = dropdownItems.filter({ hasText: value }).first();
      if (await match.count()) {
        await match.click();
        console.log(`Selected by label: ${value}`);
      } else {
        throw new Error(`Language "${value}" not found`);
      }
    } else {
      // Select default: English
      const englishOption = dropdownItems.filter({ hasText: 'English' }).first();
      if (await englishOption.count()) {
        await englishOption.click();
        console.log(`\nNo input provided. Defaulted to: English`);
      } else {
        throw new Error(`'English' option not found`);
      }
    }

    // Final selected print
    const finalSelected = await dropdownButton.textContent();
    console.log(`\nFinal selected: ${finalSelected?.trim()}`);
    console.log("\n<<================================================================>>");
  }

  // Verify actual text of element matches expected text (with trimming)
  async verifyElementText(elementName: string, expectedText: string, element: Locator) {
    const actualText = await element.textContent();
    const actual = (actualText || '')
      .split('\n')
      .map(line => line.trim())
      .join('\n');
    const trimmedText = actual?.trim() || '';
    console.log(`\nVerifying text for: ${elementName}`);
    console.log(`\nExpected: "${expectedText}"`);
    console.log(`\nActual:   "${trimmedText}"`);
    console.log(`-------------------------------------`);
    expect(trimmedText).toBe(expectedText);
    console.log(`${elementName} text matched successfully!\n`);
    console.log("\n<<================================================================>>");
  }


  // Validate that clicking on Terms & Conditions link opens a new tab with the correct URL
  async termAndConditionLinkNavigation(): Promise<void> {
    // Start listening for the new tab BEFORE the click
    await this.webElementActionClass.Click(this.locatorsPage.member_login_term_and_condition_link)
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'), // Waits for a new tab to open
    ]);

    // Wait for new tab to load
    await newPage.waitForLoadState('load');

    // ✅ Assert URL (replace with your expected URL)
    const expectedUrl = ElementsName.Landing_Login_page.expectedTermsUrl;
    const actualUrl = newPage.url();
    console.log(`\nExpected URL: ${expectedUrl}`);
    console.log(`\nActual URL:   ${actualUrl}`);
    if (actualUrl !== expectedUrl) {
      throw new Error(`Unexpected URL! Expected: ${expectedUrl}, but got: ${actualUrl}`);
    }

    console.log(`\nNew tab opened with URL: ${actualUrl}`);
    console.log("\n<<================================================================>>");
    await newPage.close();
  }
  // Validate redirection when clicking "Login as Admin" link and verify the redirected URL
  async Login_AsAdminLinkNavigation(): Promise<void> {
    // Click the link and wait for the page to navigate (same page redirection)
    await Promise.all([
      this.webElementActionClass.Click(this.locatorsPage.member_login_as_admin_btn), // Click link
      this.page.waitForNavigation({ waitUntil: 'load' }), // Wait for the page to load (same page redirection)
    ]);

    // Now, we can check the URL after the navigation
    const expectedUrl = ElementsName.Landing_Login_page.expectedAdminUrl;
    const actualUrl = this.page.url(); // Get the URL of the current page after redirection
    console.log(`\nExpected URL: ${expectedUrl}`);
    console.log(`\nActual URL:   ${actualUrl}`);

    if (actualUrl !== expectedUrl) {
      throw new Error(`Unexpected URL! Expected: ${expectedUrl}, but got: ${actualUrl}`);
    }

    console.log(`\nPage redirected successfully with URL: ${actualUrl}`);

    await this.page.goBack();
    await this.page.waitForLoadState('load');
    console.log("\n<<================================================================>>");
  }

  async navigateAtInterval(url: string, intervalMs: number = 3000, repeatCount?: number): Promise<void> {
  let counter = 0;
  
  while (true) {
    counter++;
    console.log(`Navigating to ${url} - Attempt ${counter}`);
    await this.page.goto(url);

    // Stop if repeatCount is provided and reached
    if (repeatCount && counter >= repeatCount) {
      console.log('Navigation loop complete.');
      break;
    }

    await this.page.waitForTimeout(intervalMs);
  }
}








}

