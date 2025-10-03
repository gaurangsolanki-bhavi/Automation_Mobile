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

export default class AccountsMenuPage {
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
  async navigateToAccountGeneralSettingsMenu() {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Main_Menu_Account);
    console.log("Verifying Account Sub Menus Navigations...");
    console.log("\n");
    await this.page.waitForTimeout(2000);
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_General_Settings, ElementsName.Admin_Navigation_Menu.General_settings_menu);
    await this.page.waitForTimeout(5000);
  }

  async verifyAccountGeneralSettingsLabels() {
    console.log("Verifying Account General Settings Labels...");
    await this.page.waitForTimeout(1000);
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Accounts_general_settings_tabs, ElementsName.AdminAccountGeneralSettingsHeader, "Account General Settings Tabs")
  }
  async verifyCompanySettings() {
    console.log("Verifying Company Settings...");
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_general_settings_tabs.first());

    console.log(`✅ Verifying label text: "${ElementsName.Company_settings_labels[0]}" ...`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_general_Company_settings_Company_name_labels,
      ElementsName.Company_settings_labels[0],
      ElementsName.Company_settings_labels[0]
    );
    await this.reusablePageClass.hoverAndAssert(this.locatorsPage.admin_Accounts_general_Company_settings_Company_name_hover, ElementsName.Company_settings_labels_HoverTexts[0], ElementsName.AdminAddGroupLabels[0]);

    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Accounts_general_Company_settings_Company_name_input, "Ronspot Automation Company Name");

    console.log(`✅ Verifying label text: "${ElementsName.Company_settings_labels[1]}" ...`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_general_Company_settings_Time_zone_labels,
      ElementsName.Company_settings_labels[1],
      ElementsName.Company_settings_labels[1]
    );
    await this.reusablePageClass.hoverAndAssert(this.locatorsPage.admin_Accounts_general_Company_settings_Time_zone_hover, ElementsName.Company_settings_labels_HoverTexts[1], ElementsName.AdminAddGroupLabels[1]);
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Accounts_general_Company_settings_Time_zone_input, "Asia/Kolkata");
    console.log(`✅ Verifying label text: "${ElementsName.Company_settings_labels[2]}" ...`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_general_Company_settings_Default_language_labels,
      ElementsName.Company_settings_labels[2],
      ElementsName.Company_settings_labels[2]
    );

    await this.reusablePageClass.hoverAndAssert(this.locatorsPage.admin_Accounts_general_Company_settings_Default_language_hover, ElementsName.Company_settings_labels_HoverTexts[2], ElementsName.AdminAddGroupLabels[2]);
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Accounts_general_Company_settings_Default_language_input, "English");
    console.log(`✅ Verifying label text: "${ElementsName.Company_settings_labels[3]}" ...`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_general_Company_settings_Support_email_address_labels,
      ElementsName.Company_settings_labels[3],
      ElementsName.Company_settings_labels[3]
    );


    await this.reusablePageClass.hoverAndAssert(this.locatorsPage.admin_Accounts_general_Company_settings_Support_email_address_hover, ElementsName.Company_settings_labels_HoverTexts[3], ElementsName.AdminAddGroupLabels[3]);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Add_Admin_Email_Input, "support@ronspot.com");
    console.log(`✅ Verifying label text: "${ElementsName.Company_settings_labels[4]}" ...`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_general_Company_settings_Rectangular_logo_labels,
      ElementsName.Company_settings_labels[4],
      ElementsName.Company_settings_labels[4]
    );
    await this.page.waitForTimeout(1000);
    await this.locatorsPage.admin_Accounts_general_Company_settings_Square_logo_input.setInputFiles(".\\test-data\\ronspotlogo.png");
    await this.page.waitForTimeout(2000);
    await this.reusablePageClass.hoverAndAssert(this.locatorsPage.admin_Accounts_general_Company_settings_Rectangular_logo_hover, ElementsName.Company_settings_labels_HoverTexts[4], ElementsName.AdminAddGroupLabels[4]);

    console.log(`✅ Verifying label text: "${ElementsName.Company_settings_labels[5]}" ...`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_general_Company_settings_Square_logo_labels,
      ElementsName.Company_settings_labels[5],
      ElementsName.Company_settings_labels[5]
    );
    await this.page.waitForTimeout(1000);
    await this.locatorsPage.admin_Accounts_general_Company_settings_Rectangular_logo_input.setInputFiles(".\\test-data\\squerLogo.png");
    await this.page.waitForTimeout(2000);
    await this.reusablePageClass.hoverAndAssert(this.locatorsPage.admin_Accounts_general_Company_settings_Square_logo_hover, ElementsName.Company_settings_labels_HoverTexts[5], ElementsName.AdminAddGroupLabels[5]);

    await this.page.waitForTimeout(5000);
  }


  async verifyAccountGeneralSettingsEmployeeSettingsLabels() {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_general_settings_tabs.nth(1));
    console.log("Verifying Account General Settings ,Employee settings Labels...");
    await this.page.waitForTimeout(1000);

  }

  async verifyEmployeeSettings() {
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Accounts_general_Employee_settings_labels, ElementsName.Employee_settings_labels, "Employee Settings Tabs");
    await this.reusablePageClass.validateMultipleHoverPopupsWithExpectedText(this.locatorsPage.admin_Accounts_general_Employee_settings_hover, ElementsName.Employee_settings_labels_HoverTexts, "Employee Settings Tabs");
    await this.page.waitForTimeout(1000);
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Accounts_general_Employee_settings_input, ElementsName.Employee_settings_labels[0], 'on');
    await this.page.waitForTimeout(1000);
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Accounts_general_Employee_settings_Disable_Access_Car_Plate_input, ElementsName.Employee_settings_labels[1], 'on');
    await this.page.waitForTimeout(1000);
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Accounts_general_Employee_settings_IsSessionATimeoutRequired_input, ElementsName.Employee_settings_labels[2], 'on');
    await this.page.waitForTimeout(2000);

    await this.reusablePageClass.verifyElementIsVisible(this.locatorsPage.admin_Accounts_general_Employee_settings_Save_button, "Employee Settings Save Button");
  }

  async verifyAccountGeneralSettingsMultiZoneSettingsLabels() {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_general_settings_tabs.nth(2));
    console.log("Verifying Account General Settings ,Multi-zone settings Labels...");
    await this.page.waitForTimeout(1000);
    await this.reusablePageClass.validateHeaderElementsMatchExpected(this.locatorsPage.admin_Parking_Spaces_Header_text, ElementsName.MultiZoneTableHeaders, "Multi-Zone Settings Tabs");
  }

  async verifyMultiZoneSettings() {
    console.log("Verifying Add Group zones Buttons Settings...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_general_Group_zones_add_groupButton);
    await this.page.waitForTimeout(1000);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Accounts_general_Group_zones_popup_header_text, ElementsName.Space_Popup_Expected.Group_zones_header, "Group Zones Popup headers");
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Accounts_general_Group_zones_popup_group_name_label, ElementsName.MultiZoneLabels, "Multi-Zone PopUp Labels");
    this.grpName = await this.reusablePageClass.getRandomMessage('grpName');
    console.log("Generated Group Name: " + this.grpName);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Accounts_general_Group_zones_popup_group_name_input, this.grpName);
    await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_Accounts_general_Group_zones_popup_group_type_select);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_select_ZoneToGroup);
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_select_MultipleZone);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_general_Group_zones_popup_group_name_input);

    console.log(`✅ Verifying label text: "${ElementsName.MultiZoneLabels[3]}" ...`);
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_general_Group_zones_popup_restrict_employee_booking_label,
      ElementsName.MultiZoneLabels[3],
      "Group Zones Restrict Employee Booking Label"
    );
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Accounts_general_Group_zones_popup_restrict_employee_single_booking_input, "Restrict Employee for Single Booking", 'on');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_general_Group_zones_popup_confirm_button);
    await this.page.waitForTimeout(1000);
    await this.locatorsPage.succsessMessageAdmin.first().waitFor({ state: "visible", timeout: 20000 });
  }
  async verifyAndDeleteGroupZone() {
    console.log("Verifying Created Group Zone...");
    await this.page.waitForTimeout(2000);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Accounts_general_Group_zones_created_group_first, this.grpName!, "Created Group Zone Name");
    console.log("Deleting Created Group Zone...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Edit_Team_Delete_Button_First);
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_general_Group_zones_delete_button);
    await this.page.waitForTimeout(1000);
    await this.locatorsPage.succsessMessageAdmin.first().waitFor({ state: "visible", timeout: 20000 });
    await this.page.waitForTimeout(2000);
  }

  async verifyAccountAdminAlertsLabels() {
    await this.page.waitForTimeout(2000);
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Admin_alerts, ElementsName.Admin_Navigation_Menu.Admin_alerts_menu);
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Parking_Spaces_Header_text, ElementsName.AdminAlertsLabelTexts, "Admin Alerts Table Headers")
  }



  async addAdminAlerts(recipients: string) {
    console.log("▶️ Starting addAdminAlerts flow...");

    await this.page.waitForTimeout(1000);

    console.log("🖱️ Clicking on 'Add Question' button...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_general_Security_questions_add_question_button);

    await this.page.waitForTimeout(1000);

    console.log("🔍 Verifying 'Add admin alert' header...");
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_admin_alert_sidebar_header,
      "Add admin alert",
      "Add admin alert Header"
    );

    console.log("🔍 Verifying Zone Name label and selecting second option...");
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_admin_alert_sidebar_zone_name_label,
      ElementsName.AdminAlertsSidebarTexts[0],
      ElementsName.AdminAlertsSidebarTexts[0]
    );
    await this.reusablePageClass.selectSecondOptionFromDropdown(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_admin_alert_sidebar_zone_name_input
    );

    await this.page.waitForTimeout(1000);

    console.log("🔍 Verifying Alert Type label and selecting second option...");
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_admin_alert_sidebar_Alert_type_label,
      ElementsName.AdminAlertsSidebarTexts[1],
      ElementsName.AdminAlertsSidebarTexts[1]
    );
    await this.reusablePageClass.selectSecondOptionFromDropdown(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_admin_alert_sidebar_Alert_type_input
    );

    await this.page.waitForTimeout(1000);

    console.log("🔍 Verifying Email Template label and selecting second option...");
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_admin_alert_sidebar_Email_Template_label,
      ElementsName.AdminAlertsSidebarTexts[2],
      ElementsName.AdminAlertsSidebarTexts[2]
    );
    await this.reusablePageClass.selectSecondOptionFromDropdown(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_admin_alert_sidebar_Email_Template_input
    );

    console.log("🔍 Verifying Alert Preview label...");
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_admin_alert_sidebar_Alert_preview_label,
      ElementsName.AdminAlertsSidebarTexts[3],
      ElementsName.AdminAlertsSidebarTexts[3]
    );

    await this.page.waitForTimeout(1000);

    console.log("🔍 Validating Alert Preview text...");
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_alert_sidebar_Alert_preview_text,
      ElementsName.AdminAlertsTexts[0],
      ElementsName.AdminAlertsTexts[0]
    );

    console.log("🔍 Validating Email Subject text...");
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_alert_sidebar_Email_Subject_text,
      ElementsName.AdminAlertsTexts[1],
      ElementsName.AdminAlertsTexts[1]
    );

    console.log("🔍 Validating Email Content text...");
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_alert_sidebar_Email_Content_text,
      ElementsName.AdminAlertsTexts[2],
      ElementsName.AdminAlertsTexts[2]
    );

    console.log("🔍 Validating Add Recipients label...");
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_alert_sidebar_Add_Recipients_label,
      ElementsName.AdminAlertsSidebarTexts[4],
      ElementsName.AdminAlertsSidebarTexts[4]
    );

    await this.page.waitForTimeout(1000);

    console.log("🔍 Validating Email Address label...");
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_alert_sidebar_Email_address_1_Label,
      ElementsName.AdminAlertsSidebarTexts[5],
      ElementsName.AdminAlertsSidebarTexts[5]
    );

    console.log("✍️ Entering email address: test@example.com");
    await this.webElementActionClass.Send_Keys(
      this.locatorsPage.admin_Accounts_alert_sidebar_Email_address_1_Input,
      recipients
    );
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_alert_sidebar_Email_add_Button);
    await this.page.waitForTimeout(1000);
    await this.locatorsPage.succsessMessageAdmin.first().waitFor({ state: "visible", timeout: 20000 });
    console.log("✅ addAdminAlerts flow completed successfully!");
  }



  async verifyAddedAdminAlert(recipients: string) {
    await this.page.waitForTimeout(2000);
    console.log("▶️ Starting verifyAddedAdminAlert flow...");
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Accounts_alert_sidebar_Email_address_1_input, recipients);
    await this.page.waitForTimeout(1000);
    console.log("✅ verifyAddedAdminAlert flow completed successfully!");
    console.log("Deleting Created Group Zone...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Edit_Team_Delete_Button_First);
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_alert__Delete_Button);
    await this.page.waitForTimeout(1000);
    await this.locatorsPage.succsessMessageAdmin.first().waitFor({ state: "visible", timeout: 20000 });
    await this.page.waitForTimeout(2000);

  }

  async verifyAccountPreBookingQuestionsLabels() {
    await this.page.waitForTimeout(2000);
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Pre_booking_Questions, ElementsName.Admin_Navigation_Menu.Pre_booking_questions_menu);
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Parking_Spaces_Header_text, ElementsName.PreBookingQuestionsLabelTexts, "Pre Booking Questions Table Headers")
  }

  async verifyAddPreBookingQuestionsButton() {
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_header, "Add question", "Add Question Header");
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_labels, ElementsName.AdminAccountsGeneralSecurityQuestionsAddQuestionNewButtonLabels, "Add Question New Button Labels");

    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_topic_input, "Automation Topic");
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_editor_area, "Topic");

    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_zone_button);
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_mandatory_checkbox_2);
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_labels.first());
    await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_status_select, "active");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_add_button);
    await this.locatorsPage.succsessMessageAdmin.first().waitFor({ state: "visible", timeout: 20000 });
    await this.page.waitForTimeout(2000);
  }

  async EditPreBookingQuestions() {
    console.log("🕒 Starting EditPreBookingQuestions...");

    await this.page.waitForTimeout(1000);

    console.log("🔍 Filtering question with keyword: Topic");
    await this.webElementActionClass.Send_Keys(
      this.locatorsPage.admin_Accounts_question_filter_input,
      "Topic"
    );

    console.log("✏️ Clicking on Edit button for the first question...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Edit_Button_First
    );

    await this.page.waitForTimeout(1000);

    console.log("📝 Updating question text to: Topic1");
    await this.webElementActionClass.Send_Keys(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_editor_area,
      "Topic1"
    );

    console.log("💾 Clicking on Update button...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_update_button
    );

    console.log("✅ Waiting for success message after update...");
    await this.locatorsPage.succsessMessageAdmin
      .first()
      .waitFor({ state: "visible", timeout: 20000 });

    await this.page.waitForTimeout(2000);

    console.log("🔍 Filtering question with updated keyword: Topic1");
    await this.webElementActionClass.Send_Keys(
      this.locatorsPage.admin_Accounts_question_filter_input,
      "Topic1"
    );

    console.log("🗑️ Deleting the updated question...");
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Edit_Team_Delete_Button_First
    );

    await this.page.waitForTimeout(1000);

    console.log("⚠️ Confirming delete action...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_delete_button
    );

    await this.page.waitForTimeout(1000);

    console.log("✅ Waiting for success message after delete...");
    await this.locatorsPage.succsessMessageAdmin
      .first()
      .waitFor({ state: "visible", timeout: 20000 });

    await this.page.waitForTimeout(2000);

    console.log("🎉 EditPreBookingQuestions completed successfully.");
  }
  async verifyAccountPostBookingQuestionsLabels() {
    await this.page.waitForTimeout(2000);
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Post_booking_Questions, ElementsName.Admin_Navigation_Menu.Post_booking_questions_menu);
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Parking_Spaces_Header_text, ElementsName.PostBookingQuestionsLabelTexts, "Post Booking Questions Table Headers")
  }

  async verifyAddPostBookingQuestionsButton() {
    console.log("🕒 Starting verifyAddPostBookingQuestionsButton...");

    await this.page.waitForTimeout(1000);

    console.log("➕ Clicking 'Add new question' button...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button
    );

    console.log("🔍 Verifying popup header text: 'Add new question'");
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Accounts_general_Security_Post_questions_add_question_new_button_header,
      "Add new question",
      "Add new Question Header"
    );

    console.log("✅ Validating labels inside 'Add Question' popup...");
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_labels,
      ElementsName.PostBookingQuestionsLabelPopup,
      "Add Question New Button Labels"
    );

    console.log("📝 Typing Topic: 'Automation Topic'");
    await this.webElementActionClass.Send_Keys(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_topic_input,
      "Automation Topic"
    );

    await this.page.waitForTimeout(1000);

    console.log("📝 Typing Question: 'Topic'");
    await this.webElementActionClass.Send_Keys(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_question_input,
      "Topic"
    );

    console.log("🎚️ Enabling toggle: 'Answer Required'");
    await this.reusablePageClass.toggleSwitchById(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_ans_required_toggle,
      "Answer Required",
      "on"
    );

    console.log("📂 Selecting second option from Answer Type dropdown...");
    await this.reusablePageClass.selectSecondOptionFromDropdown(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_ans_type_select
    );

    console.log("📝 Entering Answer: 'Answer1'");
    await this.webElementActionClass.Send_Keys(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_ans_input,
      "Answer1"
    );

    console.log("📌 Clicking Zone selection button...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_zone_button
    );

    await this.page.waitForTimeout(1000);

    console.log("☑️ Checking mandatory checkbox (2nd one)...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_mandatory_checkbox_2
    );

    await this.page.waitForTimeout(1000);

    console.log("🎯 Clicking one of the label options...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_labels.first()
    );

    console.log("💾 Clicking 'Add' button to save new Post Booking Question...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_add_post_question_new_button_add_button
    );

    // console.log("✅ Waiting for success message...");
    // await this.locatorsPage.succsessMessageAdmin.first().waitFor({ state: "visible", timeout: 20000 });

    await this.page.waitForTimeout(2000);

    console.log("🎉 verifyAddPostBookingQuestionsButton completed successfully.");
  }

  async EditPostBookingQuestions() {
    console.log("🕒 Starting EditPostBookingQuestions...");

    console.log("✏️ Clicking on Edit button for the first question...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Edit_Button_First
    );

    await this.page.waitForTimeout(1000);

    console.log("📝 Updating question text to: Topic1");
    await this.webElementActionClass.Send_Keys(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_topic_input,
      "Topic Updated"
    );

    console.log("💾 Clicking on Update button...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Accounts_add_post_question_new_button_add_button);
    await this.page.waitForTimeout(2000);


    // console.log("✅ Waiting for success message after update...");
    // await this.locatorsPage.succsessMessageAdmin
    //   .first()
    //   .waitFor({ state: "visible", timeout: 20000 });
    await this.page.reload()

    await this.page.waitForTimeout(4000);


    console.log("🗑️ Deleting the updated question...");
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Edit_Team_Delete_Button_First
    );

    await this.page.waitForTimeout(1000);

    console.log("⚠️ Confirming delete action...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_general_Security_questions_add_question_new_button_delete_button
    );

    await this.page.waitForTimeout(1000);

    console.log("✅ Waiting for success message after delete...");
    await this.locatorsPage.succsessMessageAdmin
      .first()
      .waitFor({ state: "visible", timeout: 20000 });

    await this.page.waitForTimeout(2000);
  }


}