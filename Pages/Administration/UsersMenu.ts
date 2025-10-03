import { Locator, Page, expect } from "@playwright/test";
import WaitActionClass from "../../Actions/WaitActions";
import WebElementActionClass from "../../Actions/WebElementActions";
import LocatorsPage from "../Locators";
import ReusableActionClass from "../../Actions/ReusableActions";
import ReusablePage from "../Member/ReusablePage";
import ElementsName from "../../test-data/JSON/Elements_Name.json";
import Path from "../../test-data/JSON/zone_data.json";
import AdminLoginPage from "./AdminLogin"
import dayjs from "dayjs";
import fs from "fs";
import path from "path";


let timeStamp;
let grpName;

export default class UsersMenuPage {
  private waitActionClass: WaitActionClass;
  private webElementActionClass: WebElementActionClass;
  private reusableActionClass: ReusableActionClass;
  private locatorsPage: LocatorsPage;
  private reusablePageClass: ReusablePage;
  private adminLoginPage: AdminLoginPage;
  public randomSpotName: string | undefined;
  private downloadDir: string;
  grpName: string | undefined;
  teamName: string | undefined;
  roleName: string | undefined;



  constructor(public page: Page) {
    // Initialize class objects
    this.waitActionClass = new WaitActionClass(page);
    this.webElementActionClass = new WebElementActionClass(page);
    this.reusableActionClass = new ReusableActionClass(page);
    this.locatorsPage = new LocatorsPage(page);
    this.reusablePageClass = new ReusablePage(page);
    this.adminLoginPage = new AdminLoginPage(page);
    this.downloadDir = path.join(process.cwd(), "Employee_CSV_Downloads");
  }
  async navigateToUsersEmployeeMenu() {
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Main_Menu_Users);
    console.log("Verifying Users Sub Menus Navigations...");
    console.log("\n");
    await this.page.waitForTimeout(2000);
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Employees, ElementsName.Admin_Navigation_Menu.Employees_menu);
    await this.page.waitForTimeout(5000);
  }

  async verifyUserEmployeeLabels() {
    await this.scrollRightUntilVisible(this.locatorsPage.admin_Parking_Spaces_Header_text.nth(13));
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Parking_Spaces_Header_text, ElementsName.UserEmployeeLabels, "Employee Table Headers")
  }

  async scrollRightUntilVisible(targetLocator: Locator) {
    for (let i = 0; i < 10; i++) {
      const isVisible = await targetLocator.isVisible();
      if (isVisible) {
        console.log('Target element is visible.');
        return;
      }

      // Scroll the container to the right by 300 pixels
      await this.page.evaluate(() => {
        const container = document.querySelector('div.ag-body-horizontal-scroll-viewport');
        if (container) {
          container.scrollLeft += 300;
        }
      });

      // Wait a bit to let content load/render
      await this.page.waitForTimeout(300);
    }

    throw new Error('Element not visible after scrolling right.');
  }

  async AddEmployeeButton() {
    console.log("👉 Clicking on 'Add Employee' button...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_Button);
    console.log("✅ Clicked 'Add Employee' button.");
    console.log("🔍 Validating 'Add Employee' form labels...");
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_form_labels, ElementsName.AddEmployeeLabels, "ADD Employee Form Labels");
    console.log("✅ Validation completed for 'Add Employee' form labels.");
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_form_PrimaryEmail_Input, ElementsName.AddEmployeeLabels[0]);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_form_FirstName_Input, ElementsName.AddEmployeeLabels[1]);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_form_LastName_Input, ElementsName.AddEmployeeLabels[2]);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_form_Password_Input, ElementsName.AddEmployeeLabels[3]);
    await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_form_Group_Select, ElementsName.AddEmployeeLabels[4]);
    await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_form_Zone_Select, ElementsName.AddEmployeeLabels[5]);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_form_NotifyRegUser_Checkbox, ElementsName.AddEmployeeLabels[4]);
    await this.reusablePageClass.setCheckboxState(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_form_NotifyRegUser_Checkbox, true);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_form_Add_Button, 'ADD Button');
    await this.webElementActionClass.Click(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_form_Cancel_Button);

  }

  async ExportEmployeesButton(...expectedEmails: string[]) {
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_form_Upload_Button, 'UPLOAD Employee Button');
    console.log("👉 Clicking on 'Export Employees' button...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_form_Export_Button);
    console.log("✅ Clicked 'Export Employees' button.");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_form_Export_Modal_Header, ElementsName.Space_Popup_Expected.Export_the_employee_list, ElementsName.Space_Popup_Expected.Export_the_employee_list);
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_form_Export_Modal_Text, ElementsName.ExportEmployeePopup, ElementsName.Space_Popup_Expected.Export_the_employee_list);
    await this.page.waitForTimeout(2000);
    const filePath = await this.downloadEmployeeListAndVerifyEmails(...expectedEmails);
    console.log("📂 CSV stored at:", filePath);
    await this.webElementActionClass.Click(this.locatorsPage.admin_User_Tab_Employee_Export_Employee_Form_Close_Button);
  }




  async ImportEmployeesButton() {
    await this.navigateViaHref(this.locatorsPage.admin_User_Tab_Employee_Add_Employee_form_Upload_Button, 'import_user');
    await this.page.waitForTimeout(2000);
  }

  /**
   * Download Employee List CSV and verify one or more emails
   */

  async downloadEmployeeListAndVerifyEmails(...expectedEmails: string[]): Promise<string> {
    // 1️⃣ Reset folder
    if (fs.existsSync(this.downloadDir)) {
      fs.rmSync(this.downloadDir, { recursive: true, force: true });
    }
    fs.mkdirSync(this.downloadDir, { recursive: true });

    // 2️⃣ Click download button & wait for file
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.locator("#exportEmployeeListModalBtn").click(),
    ]);

    // 3️⃣ Save file
    const fileName = await download.suggestedFilename();
    const filePath = path.join(this.downloadDir, fileName);
    await download.saveAs(filePath);

    // 4️⃣ Verify file exists
    expect(fs.existsSync(filePath)).toBeTruthy();
    console.log(`✅ Employee CSV downloaded: ${filePath}`);

    // 5️⃣ Read CSV content
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // 6️⃣ Loop over all expected emails
    for (const email of expectedEmails) {
      expect(fileContent).toContain(email);
      console.log(`✅ Verified email "${email}" exists in CSV`);
    }

    return filePath;
  }

  async navigateViaHref(locator: Locator, expectedUrlPart?: string) {
    // 1️⃣ Get href attribute
    const href = await locator.getAttribute('href');
    if (!href) {
      throw new Error("❌ No href attribute found for the provided locator.");
    }
    console.log("🔗 Extracted HREF:", href);

    // 2️⃣ Navigate to the href
    // await locator.click();  // OR: await this.page.goto(href);
    //await this.webElementActionClass.Click(locator);
    await this.page.goto(href);
    await this.page.waitForLoadState('load');
    await this.page.waitForTimeout(2000);
    // 3️⃣ Verify navigation
    const currentUrl = this.page.url();
    console.log("🌐 Current URL:", currentUrl);

    if (expectedUrlPart) {
      if (!currentUrl.includes(expectedUrlPart)) {
        throw new Error(`❌ Navigation failed. Expected URL part "${expectedUrlPart}" not found in "${currentUrl}"`);
      }
      console.log("✅ Navigation verified.");
    }

    // 4️⃣ Go back to previous page
    await this.page.goBack();
    await this.page.waitForLoadState('load');
    console.log("↩️ Returned back to the original page.");
  }



  async verifyUserAdminLabels() {
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Administrators, ElementsName.Admin_Navigation_Menu.Administrators_menu);
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Parking_Spaces_Header_text, ElementsName.UserAdminLabels, "Admin Table Headers")
  }

  async verifyAddAdminButtonLabels() {
    console.log("▶️ Clicking on 'Add Admin' button...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_User_Tab_Admin_Add_Admin_Button);

    console.log(`✅ Verifying label text: "${ElementsName.AddAdminLabeles[0]}" ...`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_User_Tab_Employee_Export_Employee_Form_Email_Label,
      ElementsName.AddAdminLabeles[0],
      ElementsName.AddAdminLabeles[0]
    );

    console.log(`🔍 Checking if Email input field is visible for: "${ElementsName.AddAdminLabeles[0]}"`);
    await this.reusablePageClass.assertElementVisible(
      this.locatorsPage.admin_Add_Admin_Email_Input,
      ElementsName.AddAdminLabeles[0]
    );


    console.log(`✅ Verifying label text: "${ElementsName.AddAdminLabeles[1]}" ...\n`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Add_Admin_First_Name_Label,
      ElementsName.AddAdminLabeles[1],
      ElementsName.AddAdminLabeles[1]
    );

    console.log(`🔍 Checking if First Name input field is visible for: "${ElementsName.AddAdminLabeles[1]}"`);
    await this.reusablePageClass.assertElementVisible(
      this.locatorsPage.admin_Add_Admin_First_Name_Input,
      ElementsName.AddAdminLabeles[1]
    );

    console.log(`✅ Verifying label text: "${ElementsName.AddAdminLabeles[2]}" ...\n`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Add_Admin_Last_Name_Label,
      ElementsName.AddAdminLabeles[2],
      ElementsName.AddAdminLabeles[2]
    );

    console.log(`🔍 Checking if Last Name input field is visible for: "${ElementsName.AddAdminLabeles[2]}"`);
    await this.reusablePageClass.assertElementVisible(
      this.locatorsPage.admin_Add_Admin_Last_Name_Input,
      ElementsName.AddAdminLabeles[2]
    );

    console.log(`✅ Verifying label text: "${ElementsName.AddAdminLabeles[3]}" ...\n`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Add_Admin_Multifactor_Authentication_Label,
      ElementsName.AddAdminLabeles[3],
      ElementsName.AddAdminLabeles[3]
    );

    console.log(`🔍 Checking Multifactor Authentication Toggle: "${ElementsName.AddAdminLabeles[3]}"`);
    await this.reusablePageClass.setCheckboxState(this.locatorsPage.admin_Add_Admin_Multifactor_Authentication_Input, true);

    console.log(`✅ Verifying label text: "${ElementsName.AddAdminLabeles[4]}" ...\n`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Add_Admin_Permission_Level_Label,
      ElementsName.AddAdminLabeles[4],
      ElementsName.AddAdminLabeles[4]
    );

    console.log(`🔍 Checking Dropdown : "${ElementsName.AddAdminLabeles[4]}"`);
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Add_Admin_Permission_Level_Input, "Full");

    console.log(`✅ Verifying label text: "${ElementsName.AddAdminLabeles[5]}" ...\n`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Add_Admin_Zone_Label,
      ElementsName.AddAdminLabeles[5],
      ElementsName.AddAdminLabeles[5]
    );

    console.log(`🔍 Checking Dropdown : "${ElementsName.AddAdminLabeles[5]}"`);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Add_Admin_Zone_Input_Click);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Add_Admin_Zone_Input_Multiselect_All);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Add_Admin_Zone_Label);
    console.log("🎉 Add Admin form labels and fields verified successfully!");


    console.log(`✅ Verifying label text: "${ElementsName.AddAdminLabeles[6]}" ...\n`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Add_Admin_Password_Label,
      ElementsName.AddAdminLabeles[6],
      ElementsName.AddAdminLabeles[6]
    );

    console.log(`🔍 Checking if Password input field is visible for: "${ElementsName.AddAdminLabeles[6]}"`);
    await this.reusablePageClass.assertElementVisible(
      this.locatorsPage.admin_Add_Admin_Password_Input,
      ElementsName.AddAdminLabeles[6]
    );

    console.log(`✅ Verifying label text: "${ElementsName.AddAdminLabeles[7]}" ...\n`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Add_Admin_New_User_Signup_Alerts_Label,
      ElementsName.AddAdminLabeles[7],
      ElementsName.AddAdminLabeles[7]
    );

    console.log(`🔍 Checking Toggle visible for: "${ElementsName.AddAdminLabeles[7]}"`);
    await this.reusablePageClass.assertElementVisible(
      this.locatorsPage.admin_Add_Admin_New_User_Signup_Alerts_Input,
      ElementsName.AddAdminLabeles[7]
    );

    console.log(`Checking Add administrator Button visibility\n`);
    await this.reusablePageClass.assertElementVisible(
      this.locatorsPage.admin_Add_Admin_Submit_Button,
      "Add administrator Button"
    );

    await this.webElementActionClass.Click(this.locatorsPage.admin_Add_Admin_Close_Button);
  }

  async verifyUserLoginMethodsLabels() {
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Login_Methods, ElementsName.Admin_Navigation_Menu.Login_methods_menu);
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Parking_Spaces_Header_text, ElementsName.AdminLoginMethodLabels, "Admin Login Methods Headers")

    await this.reusablePageClass.assertElementVisible(
      this.locatorsPage.admin_Add_Admin_Domain_Input,
      "Domain Input Fields"
    );
    await this.reusablePageClass.assertElementVisible(
      this.locatorsPage.admin_Add_Admin_Domain_Input_Update_Button,
      "Domain Input Update Button"
    );

    await this.reusablePageClass.validateMultipleHoverPopupsWithExpectedText(this.locatorsPage.admin_Add_Admin_Submit_Button_Header_text, ElementsName.AdminLoginMethodLabelsHover, "Classic login SSO LOGIN")


    await this.assertGoogleSSO("bhavitech.com", "active");
  }


  async assertGoogleSSO(domain: string, expectedState: "active" | "inactive") {
    console.log(`\n🔎 Checking Google SSO state for domain: ${domain}\n`);

    const googleIcon = this.page.locator(
      `//div[text()='${domain}']/following-sibling::div[@col-id='Google']//img`
    );

    const expectedFile =
      expectedState === "active" ? "google-active.png" : "google-inactive.png";

    const src = await googleIcon.getAttribute("src");
    console.log(`➡️ Found Google SSO image src for ${domain}: ${src}`);
    console.log(`✅ Expecting state: ${expectedState} (${expectedFile})\n`);

    await expect(googleIcon).toHaveAttribute("src", new RegExp(expectedFile));

    console.log(`🎉 Assertion passed: Google SSO is ${expectedState} for ${domain}`);
  }


  async verifyUserGroupSettingsLabels() {
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Group_Settings, ElementsName.Admin_Navigation_Menu.Group_settings_menu);
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Parking_Spaces_Header_text, ElementsName.AdminGroupSettingsLabels, "Admin Group Settings Headers")

  }


  async verifyAddGroupSettings() {

    await this.webElementActionClass.Click(this.locatorsPage.admin_Add_Admin_Add_Group_Button);

    console.log(`✅ Verifying label text: "${ElementsName.AdminAddGroupLabels[0]}" ...\n`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Add_Group_Name_Label,
      ElementsName.AdminAddGroupLabels[0],
      ElementsName.AdminAddGroupLabels[0]
    );

    await this.reusablePageClass.hoverAndAssert(this.locatorsPage.admin_Add_Group_Name_Hover, ElementsName.AdminAddGroupLabelsHoverTexts[0], ElementsName.AdminAddGroupLabels[0]);

    this.grpName = await this.reusablePageClass.getRandomMessage('Grp');

    console.log(`🔍 Entering Group Name: "${this.grpName}"\n`);

    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Add_Group_Name_Input, this.grpName);

    console.log(`✅ Verifying label text: "${ElementsName.AdminAddGroupLabels[1]}" ...\n`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Add_Group_Default_Zone_Label,
      ElementsName.AdminAddGroupLabels[1],
      ElementsName.AdminAddGroupLabels[1]
    );
    await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_Add_Group_Default_Zone_Select, "Default Group");

    await this.reusablePageClass.hoverAndAssert(this.locatorsPage.admin_Add_Group_Default_Zone_Hover, ElementsName.AdminAddGroupLabelsHoverTexts[1], ElementsName.AdminAddGroupLabels[1]);

    console.log(`✅ Verifying label text: "${ElementsName.AdminAddGroupLabels[2]}" ...\n`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Add_Group_Available_Days_Label,
      ElementsName.AdminAddGroupLabels[2],
      ElementsName.AdminAddGroupLabels[2]
    );
    console.log(`🔍 Entering Available Days: "10"\n`);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Add_Group_Available_Days_Input, "10");

    await this.reusablePageClass.hoverAndAssert(this.locatorsPage.admin_Add_Group_Available_Days_Hover, ElementsName.AdminAddGroupLabelsHoverTexts[2], ElementsName.AdminAddGroupLabels[2]);

    console.log(`✅ Verifying label text: "${ElementsName.AdminAddGroupLabels[3]}" ...\n`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Add_Group_Join_Waitlist_Label,
      ElementsName.AdminAddGroupLabels[3],
      ElementsName.AdminAddGroupLabels[3]
    );
    await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_Add_Group_Queue_User_Select, "Daily Booking");
    await this.reusablePageClass.hoverAndAssert(this.locatorsPage.admin_Add_Group_Join_Waitlist_Hover, ElementsName.AdminAddGroupLabelsHoverTexts[3], ElementsName.AdminAddGroupLabels[3]);

    console.log(`✅ Verifying label text: "${ElementsName.AdminAddGroupLabels[4]}" ...\n`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Add_Group_Daily_Booking_Limit_Label,
      ElementsName.AdminAddGroupLabels[4],
      ElementsName.AdminAddGroupLabels[4]
    );
    console.log(`🔍 Entering Daily Booking Limit: "5"\n`);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Add_Group_Booking_Limit_Input, "5");
    await this.reusablePageClass.hoverAndAssert(this.locatorsPage.admin_Add_Group_Daily_Booking_Limit_Hover, ElementsName.AdminAddGroupLabelsHoverTexts[4], ElementsName.AdminAddGroupLabels[4]);

    console.log(`✅ Verifying label text: "${ElementsName.AdminAddGroupLabels[5]}" ...\n`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Add_Group_Credit_Refill_Label,
      ElementsName.AdminAddGroupLabels[5],
      ElementsName.AdminAddGroupLabels[5]
    );
    console.log(`🔍 Entering Group Credit Refill: "100"\n`);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Add_Group_Credit_Refill_Input, "100");

    await this.reusablePageClass.hoverAndAssert(this.locatorsPage.admin_Add_Group_Credit_Refill_Hover, ElementsName.AdminAddGroupLabelsHoverTexts[5], ElementsName.AdminAddGroupLabels[5]);

    console.log(`✅ Verifying label text: "${ElementsName.AdminAddGroupLabels[6]}" ...\n`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Add_Group_Credit_Refill_Cycle_Label,
      ElementsName.AdminAddGroupLabels[6],
      ElementsName.AdminAddGroupLabels[6]
    );

    await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_Add_Group_Credit_Refill_Cycle_Select, "Monthly");
    await this.reusablePageClass.hoverAndAssert(this.locatorsPage.admin_Add_Group_Credit_Refill_Cycle_Hover, ElementsName.AdminAddGroupLabelsHoverTexts[6], ElementsName.AdminAddGroupLabels[6]);

    console.log(`✅ Verifying label text: "${ElementsName.AdminAddGroupLabels[7]}" ...\n`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Add_Group_Default_Credit_Balance_Label,
      ElementsName.AdminAddGroupLabels[7],
      ElementsName.AdminAddGroupLabels[7]

    );
    console.log(`🔍 Entering Group Default Credit Balance: "100"\n`);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Add_Group_Default_Credit_Balance_Input, "10");
    await this.reusablePageClass.hoverAndAssert(this.locatorsPage.admin_Add_Group_Default_Credit_Balance_Hover, ElementsName.AdminAddGroupLabelsHoverTexts[7], ElementsName.AdminAddGroupLabels[7]);

    await this.waitActionClass.waitForElementVisible(this.locatorsPage.admin_Add_Group_Submit_Button);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Add_Group_Submit_Button);

    await this.page.waitForTimeout(1000);
    await this.locatorsPage.succsessMessageAdmin.first().waitFor({ state: "visible", timeout: 20000 });


  }

  async Export_group_data() {
    console.log(`Search Group Name: ${this.grpName}`);
    await this.locatorsPage.admin_Add_Group_Name_Filter_Input.waitFor({ state: "visible", timeout: 15000 });
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Add_Group_Name_Filter_Input, this.grpName ?? '');
    await this.page.waitForTimeout(3000);
    await this.locatorsPage.admin_Created_Group_Button_First.waitFor({ state: "visible", timeout: 15000 });
    await this.page.waitForTimeout(5000);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Created_Group_Button_First, this.grpName || '', "Created Group Name");

    const filePath = await this.downloadGroupListAndVerifyEmails(this.grpName || '');
    console.log("📂 CSV stored at:", filePath);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Parking_Spaces_Delete_Parking_Space_Button_first);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Delete_Group_Confirm_Button);
    await this.page.waitForTimeout(1000);
    await this.locatorsPage.succsessMessageAdmin.first().waitFor({ state: "visible", timeout: 20000 });

  }




  /**
   * Download Employee List CSV and verify one or more emails
   */

  async downloadGroupListAndVerifyEmails(...expectedEmails: string[]): Promise<string> {
    // 1️⃣ Reset folder
    if (fs.existsSync(this.downloadDir)) {
      fs.rmSync(this.downloadDir, { recursive: true, force: true });
    }
    fs.mkdirSync(this.downloadDir, { recursive: true });

    // 2️⃣ Click download button & wait for file
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.locator("#groupsettingexportCSVButton").click(),
    ]);

    // 3️⃣ Save file
    const fileName = await download.suggestedFilename();
    const filePath = path.join(this.downloadDir, fileName);
    await download.saveAs(filePath);

    // 4️⃣ Verify file exists
    expect(fs.existsSync(filePath)).toBeTruthy();
    console.log(`✅ Group CSV downloaded: ${filePath}`);

    // 5️⃣ Read CSV content
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // 6️⃣ Loop over all expected emails
    for (const email of expectedEmails) {
      expect(fileContent).toContain(email);
      console.log(`✅ Verified Group Name "${email}" exists in CSV`);
    }

    return filePath;
  }


  async verifyUserTeamPermissionsLabels() {
    console.log(`🔍 Verifying User Team Permissions Labels`);
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Team_Permissions, ElementsName.Admin_Navigation_Menu.Team_permissions_menu);
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Parking_Spaces_Header_text, ElementsName.AdminUserTeamPermissionsHeader, "Admin User Team Permissions Header");
  }


async AddTeam() {
  this.teamName = await this.reusablePageClass.getRandomMessage('Team');
  console.log(`🔍 Generating random team name: "${this.teamName}"`);

  console.log("🖱️ Clicking on 'Add Team' button...");
  await this.webElementActionClass.Click(this.locatorsPage.admin_Add_Team_Button);

  console.log("⏳ Waiting for 'Add Team' popup header to be visible...");
  await this.locatorsPage.admin_Add_Teame_Name_popuo_header.waitFor({ state: "visible", timeout: 15000 });

  console.log(`⌨️ Entering team name: "${this.teamName}" into input field...`);
  await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Add_Teame_Name_Input, this.teamName ?? '');

  console.log("🖱️ Clicking 'Add' button inside the popup...");
  await this.webElementActionClass.Click(this.locatorsPage.admin_Add_Teame_Name_popuo_header_add_button);

  console.log("⏳ Waiting for success message...");
  await this.page.waitForTimeout(1000);
  await this.locatorsPage.succsessMessageAdmin.first().waitFor({ state: "visible", timeout: 20000 });

  console.log("✅ Team created successfully!");
  await this.page.waitForTimeout(2000);
}


async EditGroupSetting(Restuser: string) {
  console.log(`🔍 Filtering teams by name: "${this.teamName}"...`);
  await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Team_Name_Filter_Input, this.teamName ?? '');
  await this.page.waitForTimeout(2000);

  console.log("🖱️ Clicking on team members count link...");
  await this.webElementActionClass.Click(this.locatorsPage.admin_Group_Team_Members_Count_Link);
  await this.page.waitForTimeout(1000);

  console.log("🔎 Verifying Edit Team header contains the team name...");
  await this.reusablePageClass.assertTextByXPathContains(
    this.locatorsPage.admin_Group_Team_Members_Edit_Header_Text,
    this.teamName || '',
    "Edit Team Header Name"
  );

  console.log("⌨️ Searching for user: 'Automation' in the Edit Members search box...");
  await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Group_Team_Members_Edit_CheckBox_search, "Automation");
  await this.page.waitForTimeout(1000);

  console.log("✅ Setting status checkbox to 'checked'...");
  await this.reusablePageClass.setCheckboxState(this.locatorsPage.admin_Group_Team_Members_Edit_Status_Checkbox, true);

  console.log("⬅️ Navigating back to previous page...");
  await this.page.goBack();

  console.log("🎯 Edit group setting flow completed successfully!");
}



async team_data_delete() {
  console.log(`🔍 Searching for team with name: "${this.teamName}"...`);
  await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Team_Name_Filter_Input, this.teamName ?? '');
  await this.page.waitForTimeout(2000);

  console.log("🗑️ Clicking on the first 'Delete Team' button...");
  await this.webElementActionClass.Click(this.locatorsPage.admin_Edit_Team_Delete_Button_First);

  console.log("⚠️ Confirming delete action...");
  await this.webElementActionClass.Click(this.locatorsPage.admin_Team_Delete_Button);

  console.log("⏳ Waiting for success message after deletion...");
  await this.page.waitForTimeout(1000);
  await this.locatorsPage.succsessMessageAdmin.first().waitFor({ state: "visible", timeout: 20000 });

  console.log(`✅ Team "${this.teamName}" deleted successfully!`);
}


  async verifyUserEmergencyRolesLabels() {
    console.log(`🔍 Verifying User Emergency Roles Labels`);
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Health_and_Safety, ElementsName.Admin_Navigation_Menu.Health_and_safety_menu);
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Parking_Spaces_Header_text, ElementsName.AdminUserEmergencyRolesHeader, "Admin User Emergency Roles Header");
  }

async AddEmergencyRole() {
  console.log("🖱️ Clicking on 'Add Role' button...");
  await this.webElementActionClass.Click(this.locatorsPage.admin_Add_Role_Button);

  console.log("⏳ Waiting for 'Add Role' popup header to appear...");
  await this.locatorsPage.admin_Add_Role_Popup_Header.waitFor({ state: "visible", timeout: 15000 });

  this.roleName = await this.reusablePageClass.getRandomMessage('Role');
  console.log(`🔍 Generated random role name: "${this.roleName}"`);

  console.log("⌨️ Entering role name into input field...");
  await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Add_Role_Input, this.roleName ?? '');

  console.log("⬇️ Selecting second option from dropdown...");
  await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_Add_Role_Select_icon);

  console.log("🖱️ Clicking 'Submit' button to add role...");
  await this.webElementActionClass.Click(this.locatorsPage.admin_Add_Group_Submit_Button);

  console.log("⏳ Waiting for success message after role creation...");
  await this.page.waitForTimeout(1000);
  await this.locatorsPage.succsessMessageAdmin.first().waitFor({ state: "visible", timeout: 20000 });

  console.log(`✅ Emergency Role "${this.roleName}" created successfully!`);
}


async EditEmergencyRole() {
  console.log("🖱️ Clicking on the first role (No employee assigned)...");
  await this.webElementActionClass.Click(this.locatorsPage.admin_Add_Role_Select_icon_No_employee_first);

  console.log("⏳ Waiting for Edit Role popup header to appear...");
  await this.locatorsPage.admin_Add_Role_Select_icon_No_employee_first_Header.waitFor({ state: "visible", timeout: 15000 });

  console.log("⌨️ Searching for user: 'Automation' inside Edit Role popup...");
  await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Add_Role_Select_icon_No_employee_first_Input, "Automation");
  await this.page.waitForTimeout(2000);

  console.log("✅ Checking the 'Automation' user checkbox...");
  await this.reusablePageClass.setCheckboxState(this.locatorsPage.admin_Add_Role_Select_icon_No_employee_first_Checkbox, true);

  console.log("🖱️ Closing the Edit Role popup...");
  await this.webElementActionClass.Click(this.locatorsPage.admin_Add_Role_Select_icon_No_employee_first_Close_Button);

  console.log("🎯 Edit Emergency Role completed successfully!");
}


async emergency_role_data_delete() {
  console.log(`🔍 Searching for Emergency Role with name: "${this.roleName}"...`);
  await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Add_Role_Name_Input, this.roleName ?? '');
  await this.page.waitForTimeout(2000);

  console.log("🗑️ Clicking on the first 'Delete Emergency Role' button...");
  await this.webElementActionClass.Click(this.locatorsPage.admin_Edit_Team_Delete_Button_First);

  console.log("📌 Activating cancel/confirmation input field...");
  await this.webElementActionClass.Click(this.locatorsPage.admin_Add_Role_Select_icon_No_employee_first_Cancel_Button_text);

  console.log('⌨️ Typing confirmation text: "DELETE"...');
  await this.reusablePageClass.typeString("DELETE");
  await this.page.waitForTimeout(1000);

  console.log("⚠️ Confirming Emergency Role deletion...");
  await this.webElementActionClass.Click(this.locatorsPage.admin_Emergency_Role_Delete_Button);

  console.log("⏳ Waiting for success message after deletion...");
  await this.page.waitForTimeout(1000);
  await this.locatorsPage.succsessMessageAdmin.first().waitFor({ state: "visible", timeout: 20000 });
  await this.page.waitForTimeout(2000);

  console.log(`✅ Emergency Role "${this.roleName}" deleted successfully!`);
}

}