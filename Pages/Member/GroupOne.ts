import { Page, expect } from "@playwright/test";
import WaitActionClass from "../../Actions/WaitActions";
import WebElementActionClass from "../../Actions/WebElementActions";
import LocatorsPage from "../Locators";
import ReusableActionClass from "../../Actions/ReusableActions";
import ReusablePage from "./ReusablePage";
import UserSet from "../../test-data/JSON/admin_set_test.json"
import ZoneData from "../../test-data/JSON/zone_data.json"

let timeStamp;

export default class grouponePage {
  private waitActionClass: WaitActionClass;
  private webElementActionClass: WebElementActionClass;
  private reusableActionClass: ReusableActionClass;
  private locatorsPage: LocatorsPage;
  private reusablePageClass: ReusablePage;
  public zone: string | undefined;
  public gridDeskZone: string | undefined;
  public mapCarZone: string | undefined;
  public currentUser: any;


  constructor(public page: Page) {
    // Initialize class objects
    this.waitActionClass = new WaitActionClass(page);
    this.webElementActionClass = new WebElementActionClass(page);
    this.reusableActionClass = new ReusableActionClass(page);
    this.locatorsPage = new LocatorsPage(page);
    this.reusablePageClass = new ReusablePage(page);
  }

  /**
   * Clicks on the "Login with Gmail" button.
   * Waits for a short period after the click to allow the page to react.
   */

  async clickOnLoginWithGmail() {
    await this.webElementActionClass.Click(this.locatorsPage.login_with_gmail_btn);
    console.log("click on login with gmail button");
    await this.page.waitForTimeout(5000)
  }
  /**
  * Simulates pressing the 'Enter' key, typically used to proceed after entering credentials
  * in a login flow, such as clicking a 'Next' button implicitly.
  */
  async clickOnGmailNextbtn() {
    await this.page.keyboard.press('Enter');
    console.log("click on Login button");
    await this.page.waitForTimeout(1000)
  }
  /**
 * Performs the login process for a Member user using Gmail authentication.
 * Navigates to the URL, enters username, selects a checkbox, confirms email,
 * proceeds with Gmail login, enters password, and verifies successful login.
 * @param url The URL to navigate to for login.
 * @param EuserName The email/username for login.
 * @param Epassword The password for login.
 */

  async MemberUserLogin(url: string, EuserName: string, Epassword: string) {
    await this.reusablePageClass.navigateMemberToUrl(url);
    await this.reusablePageClass.sendMemberUsername(EuserName);
    await this.reusablePageClass.selectCheckboxIfNotSelected();
    await this.reusablePageClass.clickOnConfirmEmailbutton();
    await this.clickOnLoginWithGmail();
    await this.page.waitForTimeout(4000)
    await this.clickOnGmailNextbtn();
    await this.page.waitForTimeout(3000)
    await this.sendMemberPassword(Epassword)
    await this.clickOnGmailNextbtn();
    await this.page.waitForTimeout(7000)
    await this.waitActionClass.waitForNetworkIdleOrTimeout(30000)
    await this.page.waitForTimeout(2000)
    await expect(this.locatorsPage.member_dashboard_text).toBeVisible({ timeout: 20000 });
    console.log("User Logged in With Gmail Successfully with username : " + EuserName + " and password : " + Epassword);
  }

  /**
   * Performs the login process for a Member user using Okta authentication.
   * Navigates to the URL, enters username, selects a checkbox, confirms email,
   * then proceeds with Okta-specific password entry and login, and verifies successful login.
   * @param url The URL to navigate to for login.
   * @param EuserName The email/username for login.
   * @param Epassword The password for login.
   */

  async oktaMemberUserLogin(url: string, EuserName: string, Epassword: string) {
    await this.reusablePageClass.navigateMemberToUrl(url);
    await this.reusablePageClass.sendMemberUsername(EuserName);
    await this.reusablePageClass.selectCheckboxIfNotSelected();
    await this.page.waitForTimeout(2000)
    await this.reusablePageClass.clickOnConfirmEmailbutton();
     await this.page.waitForTimeout(2000)
    await this.webElementActionClass.Click(this.locatorsPage.oktaContinueButton);
    await this.page.waitForTimeout(10000)
    console.log('Clicking on Login With OKTA button')
    await this.sendMemberPassword(EuserName)
    await this.page.keyboard.press('Tab');
    await this.page.waitForTimeout(1000)
    await this.sendMemberPassword(Epassword)
    await this.clickOnGmailNextbtn();
    await this.page.waitForTimeout(5000)
    await this.waitActionClass.waitForNetworkIdleOrTimeout(20000)
    await expect(this.locatorsPage.member_dashboard_text).toBeVisible({ timeout: 20000 });
    console.log("User Logged in With OKTA Successfully with username : " + EuserName + " and password : " + Epassword);
  }

  /**
  * Performs the login process for a Member user using Microsoft authentication.
  * Navigates to the URL, enters username, selects a checkbox, confirms email,
  * then proceeds with Microsoft-specific password entry and login.
  * @param url The URL to navigate to for login.
  * @param EuserName The email/username for login.
  * @param Epassword The password for login.
  */

  async MicrosoftMemberUserLogin(url: string, EuserName: string, Epassword: string) {
    await this.reusablePageClass.navigateMemberToUrl(url);
    await this.reusablePageClass.sendMemberUsername(EuserName);
    await this.reusablePageClass.selectCheckboxIfNotSelected();
    await this.reusablePageClass.clickOnConfirmEmailbutton();
    console.log('Clicking on Login With Microsoft button')
    await this.webElementActionClass.Click(this.locatorsPage.login_with_microsoft_btn);
    //await this.page.keyboard.press('Tab');
    await this.page.waitForTimeout(5000)
    await this.sendMemberPassword(Epassword)
    await this.clickOnGmailNextbtn();
    await this.clickOnGmailNextbtn();
    await this.page.waitForTimeout(10000)
    console.log("User Logged in With Microsoft Successfully with username : " + EuserName + " and password : " + Epassword);
  }
  /**
 * Sends the provided password by typing each character individually.
 * This method uses `typePassword` internally.
 * @param password The password string to send.
 */

  async sendMemberPassword(password: string) {
    await this.typePassword(password);
    await this.page.waitForTimeout(1000)
    console.log("password sent successfully");
  }
  /**
  * Types the given password character by character with a small delay between each key press.
  * This can help simulate human-like typing and avoid issues with fast input.
  * @param password The password string to type.
  */

  async typePassword(password: string) {
    for (const char of password) {
      await this.page.keyboard.press(char);
      await this.page.waitForTimeout(100); // optional small delay between keystrokes
    }
  }


  // async loginWithUserSet(setKey: keyof typeof UserSet, reusablePage: any) {
  //   const user = UserSet[setKey];
  //   try {
  //     await this.MemberUserLogin(user.url, user.emp_user1, user.emp_user_Pass1);
  //   } catch (error: any) {
  //     console.error(`Test failed While Login with Gmail ${setKey}: ${error.message}`);
  //     expect(false).toBe(true);
  //   }
  // }

  /**
  * Logs in a user using Gmail authentication, retrieving user credentials from an Excel sheet.
  * It fetches the user at index 0 from the specified sheet, sets global user and zone properties,
  * and then calls the `MemberUserLogin` method.
  * @param sheetName The name of the Excel sheet.
  * @param excelPath The path to the Excel file.
  * @returns A Promise that resolves to the user object, or rejects if login fails.
  */

  async loginGmailWithExcelUser(sheetName: string, excelPath: string): Promise<any> {
    try {
      const user = await this.reusableActionClass.getUserByIndex(sheetName, excelPath, 0);

      // Optional: Save current user if needed later
      this.currentUser = user;

      // Set zone info globally
      this.zone = user.ZONE;
      this.gridDeskZone = user.GRID_DESK_ZONE;
      this.mapCarZone = user.MAP_CAR_ZONE;

      const envKey = (process.env.ENV || "prod").toLowerCase(); // stage | preprod | prod

      // 🔑 Pick correct URL column from Excel

      const url = user[envKey];
      const email = user.Email;
      const password = user.Password;
      await this.MemberUserLogin(url, email, password);

      return user;

    } catch (error: any) {
      console.error(`Test failed While Login with Gmail : ${error.message}`);
      expect(false).toBe(true);
    }
  }

  /**
 * Logs in a user using Okta authentication, retrieving user credentials from an Excel sheet.
 * It fetches the user at index 0 from the specified sheet, sets global user and zone properties,
 * and then calls the `oktaMemberUserLogin` method.
 * @param sheetName The name of the Excel sheet.
 * @param excelPath The path to the Excel file.
 * @returns A Promise that resolves to the user object, or rejects if login fails.
 */

  async loginOktaWithExcelUser(sheetName: string, excelPath: string): Promise<any> {
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
      const email = user.Email;
      const password = user.Password;
      await this.oktaMemberUserLogin(url, email, password);

      return user;

    } catch (error: any) {
      console.error(`Test failed While Login with OKTA: ${error.message}`);
      expect(false).toBe(true);
    }
  }


  async loginMicrosoftWithExcelUser(sheetName: string, excelPath: string): Promise<any> {
    try {
      const user = await this.reusableActionClass.getUserByIndex(sheetName, excelPath, 0);

      // Optional: Save current user if needed later
      this.currentUser = user;

      // Set zone info globally
      this.zone = user.ZONE;
      this.gridDeskZone = user.GRID_DESK_ZONE;
      this.mapCarZone = user.MAP_CAR_ZONE;

      const envKey = (process.env.ENV || "preprod").toLowerCase(); // stage | preprod | prod

      // 🔑 Pick correct URL column from Excel
      const url = user[envKey];
      const email = user.Email;
      const password = user.Password;
      await this.MicrosoftMemberUserLogin(url, email, password);

      return user;

    } catch (error: any) {
      console.error(`Test failed While Login with Microsoft: ${error.message}`);
      expect(false).toBe(true);
    }
  }

  // async loginWithOKTAUserSet(setKey: keyof typeof UserSet, reusablePage: any) {
  //   const user = UserSet[setKey];
  //   try {
  //     await this.oktaMemberUserLogin(user.url, user.emp_user1, user.emp_user_Pass1);
  //   } catch (error: any) {
  //     console.error(`Test failed While Login with OKTA ${setKey}: ${error.message}`);
  //     expect(false).toBe(true);
  //   }
  // }
}
