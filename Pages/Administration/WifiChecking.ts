import { Locator, Page, expect } from "@playwright/test";
import WaitActionClass from "../../Actions/WaitActions";
import WebElementActionClass from "../../Actions/WebElementActions";
import LocatorsPage from "../Locators";
import ReusableActionClass from "../../Actions/ReusableActions";
import ReusablePage from "../Member/ReusablePage";
import ElementsName from "../../test-data/JSON/Elements_Name.json"
import AdminLoginPage from "./AdminLogin"
import SpacesMenuPage from "./SpacesMenu"

let timeStamp;

export default class WifiCheckingPage {
  private waitActionClass: WaitActionClass;
  private webElementActionClass: WebElementActionClass;
  private reusableActionClass: ReusableActionClass;
  private locatorsPage: LocatorsPage;
  private reusablePageClass: ReusablePage;
  private adminLoginPage: AdminLoginPage;
  private spacesMenuPage: SpacesMenuPage;

  constructor(public page: Page) {
    // Initialize class objects
    this.waitActionClass = new WaitActionClass(page);
    this.webElementActionClass = new WebElementActionClass(page);
    this.reusableActionClass = new ReusableActionClass(page);
    this.locatorsPage = new LocatorsPage(page);
    this.reusablePageClass = new ReusablePage(page);
    this.adminLoginPage = new AdminLoginPage(page);
    this.spacesMenuPage = new SpacesMenuPage(page);
  }
  async navigateToAccountAndIntegrationsMenu() {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Main_Menu_Account);
    console.log("Verifying Account Sub Menus Navigations...");
    console.log("\n");
    await this.page.waitForTimeout(2000);
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Integrations, ElementsName.Admin_Navigation_Menu.Integrations_menu);
  }

  async validateWifiCheckingPageElements() {
    console.log("Verifying Wifi Checking Page Elements...");
    console.log("\n");
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_Checking_Add_Integration_Button, ElementsName.Admin_Navigation_Menu.Integrations_menu);

  }

  async verifyingIntegration() {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Checking_Add_Integration_Button);
    await this.page.waitForTimeout(1000);
    await this.validateLabelElementsMatchAllExpectedID(this.locatorsPage.admin_Wifi_Checking_Integration_List, ElementsName.Integrations, ElementsName.Admin_Navigation_Menu.Integrations_menu)
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Checking_Integration_Header, ElementsName.Admin_Navigation_Menu.Integrations_menu, ElementsName.Admin_Navigation_Menu.Integrations_menu)
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_Checking_Integration_Close_Button, ElementsName.NoMap.Close_btn);
  }

  async validateWifiButtonElements(intigration_name: string) {
    console.log("Verifying Wifi Integration button Elements...");
    console.log("\n");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Checking_Integration_Wifi_button);
    await this.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Wifi_Checking_Integration_form1_label, ElementsName.Integrations_form1, ElementsName.Zone_Maps.Integrations_Wifi_Form1)
    console.log("Verifying Type Input Field: Is Readonly and should not be editable.");
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_Checking_Integration_form1_type_input, ElementsName.Integrations_form1[0]);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_Checking_Integration_form1_name_input, ElementsName.Integrations_form1[1]);
    await this.reusablePageClass.selectOptionFromDropdown(this.locatorsPage.admin_Wifi_Checking_Integration_form1_status_dropdown, 0, ElementsName.Integrations_form1[2]);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_Checking_Integration_form1_cancel_button, ElementsName.Zone_Maps.Cancel_Btn);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_Checking_Integration_form1_submit_button, ElementsName.Zone_Maps.Save_button);
    console.log("Verifying Type Name Field Validation: It should not be empty.");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Checking_Integration_form1_submit_button);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Checking_Integration_form1_name_Blank_error_message, ElementsName.Space_Popup_Expected.Wifi_error_message, ElementsName.Space_Popup_Expected.Wifi_error_message);
    console.log("Verifying Create Wifi Integration: It should be created successfully.");
    console.log(`Entering Integration Name: ${intigration_name}`);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Wifi_Checking_Integration_form1_name_input, intigration_name);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Checking_Integration_form1_submit_button);
    await this.page.waitForTimeout(3000);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Wifi_Checking_Integration_Search_Box, intigration_name);
    await this.page.waitForTimeout(2000);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Checking_Integration_First_Row_Type, ElementsName.Integrations[5], ElementsName.Integrations[5]);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Checking_Integration_First_Row_Status, ElementsName.Zone_Maps.Active_Status, ElementsName.Zone_Maps.Active_Status);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_Checking_Integration_Delete_Button_first_integration, ElementsName.Zone_Maps.First_Delete_icon);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_Checking_Integration_Wifi_Button_first_integration, ElementsName.Zone_Maps.First_Wifi_icon);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_Checking_Integration_Wifi_Edit_first_integration, ElementsName.Zone_Maps.First_Edit_icon);
    const firstRowName = await this.locatorsPage.admin_Wifi_Checking_Integration_First_Row_Name.textContent();
    console.log(`Created Integration Name: ${firstRowName}`);
    expect(firstRowName).toBe(intigration_name);
    console.log(`✅ Integration "${intigration_name}" created successfully.`);


  }

  async validateLabelElementsMatchAllExpected(locator: Locator, expectedHeaders: string[], label: string): Promise<void> {
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

   async validateLabelElementsMatchAllExpectedID(locator: Locator, expectedHeaders: string[], label: string): Promise<void> {
    const count = await locator.count();
    console.log('\n')
    console.log(`Validating "${label}" Labels: Found ${count} elements.`);
    console.log('------------------------------------');

    for (let i = 0; i < count; i++) {
      const text = (await locator.nth(i).getAttribute('id'))?.trim();

      console.log(`Label ${i + 1}: "${text}"`);

      if (!text) {
        throw new Error(`❌ Label ${i + 1} text is empty or null.`);
      }
      expect(expectedHeaders).toContain(text);
    }
    console.log(`✅ All "${label}" labels matched expected list.`);
  }


  async verifyingWifiIntegrationIsDisabled() {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Checking_Add_Integration_Button);
    console.log("Verifying WiFi Integration Button is Disabled...");
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_Checking_Integration_Disabled_Button, ElementsName.Space_Popup_Expected.Wifi_Integrations_button_disabled);
  }
  async verifyingDuplicateIntegrationName(intigration_name: string) {
    console.log("Verifying Create Duplicate ActPro Integration: It should be created successfully.");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Checking_Integration_ACTpro_button);
    console.log(`Entering Duplicate ActPro Integration Name: ${intigration_name}`);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Wifi_Checking_Integration_form1_name_input, intigration_name);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Checking_Integration_form1_submit_button);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Checking_Integration_Duplicate_Error_Message, ElementsName.Zone_Maps.Duplicate_Error_Message, ElementsName.Zone_Maps.Duplicate_Error_Message_Label);
    await this.page.waitForTimeout(2000);

  }
  async deleteIntegrationIfAvailableAll() {
    await this.deleteAllIntegrations(this.locatorsPage.admin_Wifi_Checking_Integration_Delete_Button_first_integration, this.locatorsPage.admin_Wifi_Checking_Integration_Delete_Button_on_Popup);
  }
  async verifyingIntegrationTableHeaders() {
    await this.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Wifi_Checking_Integration_Table_Label, ElementsName.IntegrationTableHeaders, ElementsName.Zone_Maps.Integrations_Wifi_Form1)

  }

  async verifyingWifiIntegrationStep2() {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Checking_Integration_Wifi_Button_first_integration);
    console.log("Verifying WiFi Integration Button is Disabled...");
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_Checking_Step2_Aerrow_icon, ElementsName.Space_Popup_Expected.Wifi_checking_Arrow_Icon);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_Checking_Step2_Wifi_img, ElementsName.Space_Popup_Expected.Wifi_checking_img);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Checking_Step2_Header_text, ElementsName.Space_Popup_Expected.Wifi_checking_Step2_text1, ElementsName.Space_Popup_Expected.Wifi_checking_Step2_text1);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Checking_Step2_Header_text_2, ElementsName.Space_Popup_Expected.Wifi_checking_Step2_text2, ElementsName.Space_Popup_Expected.Wifi_checking_Step2_text2);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Checking_Step2_Aerrow_icon);
  }

  async wifiIntigrationMappingScreen() {
    console.log("Verifying WiFi Integration Mapping Screen...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Mapping_Header_text, ElementsName.Space_Popup_Expected.Wifi_mapping_header_txt, ElementsName.Space_Popup_Expected.Wifi_mapping_header_txt);
    await this.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Wifi_default_selected_Mapping_List, ElementsName.Wifi_mapping_List, ElementsName.Space_Popup_Expected.Wifi_mapping_List)
    await this.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Wifi_default_selected_Mapping_List_text, ElementsName.Wifi_mapping_List_text, ElementsName.Space_Popup_Expected.Wifi_mapping_List_text)
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_Mapping_Cancel_btn, ElementsName.Zone_Maps.Cancel_Btn);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_default_selected_Mapping_List.first());
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Mapping_Next_btn);
  }

  async wifiMappingScreen(Mapping_Name: string, ZONE: string, SSID: string) {
    console.log("Verifying WiFi Integration Mapping Screen And Create Wifi Mapping ...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Mapping_Name_label, ElementsName.Zone_Maps.Mapping_name, ElementsName.Zone_Maps.Mapping_name);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Zone_association_label, ElementsName.Zone_Maps.Zone_association, ElementsName.Zone_Maps.Zone_association);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_network_name_label, ElementsName.Zone_Maps.Wifi_Ssid_Name, ElementsName.Zone_Maps.Wifi_Ssid_Name);
    await this.locatorsPage.admin_Wifi_Zone_association_Hover_text.hover();
    const hoverText1 = await this.locatorsPage.admin_Wifi_Zone_association_Hover_text.getAttribute('aria-label');
    await this.reusablePageClass.verifySuccessToastMatche(hoverText1, ElementsName.Zone_Maps.Wi_Fi_mapping_Hover_text01);
    await this.locatorsPage.admin_Wifi_network_name_Hover_text.hover();
    const hoverText2 = await this.locatorsPage.admin_Wifi_network_name_Hover_text.getAttribute('aria-label');
    await this.reusablePageClass.verifySuccessToastMatche(hoverText2, ElementsName.Zone_Maps.Wi_Fi_mapping_Hover_text02);
    await this.locatorsPage.admin_Wifi_Mapping_Name_label.hover();
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Wifi_Mapping_Name_input, Mapping_Name);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Zone_association_inputClick);
    const checkbox = await this.locatorsPage.zoneCheckboxLocator(ZONE);
    await checkbox.check();
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Zone_association_inputClick);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Wifi_network_name_input, SSID);
    await this.page.waitForTimeout(2000);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_network_Cancel_Button, ElementsName.Zone_Maps.Cancel_Btn);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_network_Apply_Button);
    await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
    await this.page.waitForTimeout(3000);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Created_Mapping_Name, Mapping_Name, Mapping_Name);
    console.log('\n')
    console.log("Wi-Fi mapping created successfully:", Mapping_Name);
  }

  async Checking_Mapping_Duplicate(Mapping_Name: string, ZONE: string, SSID: string, ZONE2: string,) {
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Checking_Step2_Aerrow_icon);
    await this.wifiIntigrationMappingScreen();
    console.log("Verifying WiFi Integration Mapping Name And Selected Zone  ...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Mapping_Name_label, ElementsName.Zone_Maps.Mapping_name, ElementsName.Zone_Maps.Mapping_name);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Zone_association_label, ElementsName.Zone_Maps.Zone_association, ElementsName.Zone_Maps.Zone_association);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_network_name_label, ElementsName.Zone_Maps.Wifi_Ssid_Name, ElementsName.Zone_Maps.Wifi_Ssid_Name);
    await this.locatorsPage.admin_Wifi_Zone_association_Hover_text.hover();
    const hoverText1 = await this.locatorsPage.admin_Wifi_Zone_association_Hover_text.getAttribute('aria-label');
    await this.reusablePageClass.verifySuccessToastMatche(hoverText1, ElementsName.Zone_Maps.Wi_Fi_mapping_Hover_text01);
    await this.locatorsPage.admin_Wifi_network_name_Hover_text.hover();
    const hoverText2 = await this.locatorsPage.admin_Wifi_network_name_Hover_text.getAttribute('aria-label');
    await this.reusablePageClass.verifySuccessToastMatche(hoverText2, ElementsName.Zone_Maps.Wi_Fi_mapping_Hover_text02);
    await this.locatorsPage.admin_Wifi_Mapping_Name_label.hover();
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Wifi_Mapping_Name_input, Mapping_Name);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_network_Cancel_Button, ElementsName.Zone_Maps.Cancel_Btn);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Zone_association_inputClick);
    const checkboxLocator = this.locatorsPage.zoneCheckboxLocator(ZONE);
    const isVisible = await checkboxLocator.isVisible().catch(() => false);
    if (!isVisible) {
      console.log('\n')
      console.log(`---------------------------------------------------------------`);
      console.log(`✅ Checkbox for zone "${ZONE}" is either not visible or not present for other mappings.`);
      console.log(`---------------------------------------------------------------`);
    } else {
      throw new Error(`❌ Checkbox for zone "${ZONE}" is visible but should not be.`);
    }
    const checkbox = await this.locatorsPage.zoneCheckboxLocator(ZONE2);
    await checkbox.check();
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Zone_association_inputClick);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Wifi_network_name_input, SSID);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_network_Apply_Button);
    await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.succsessMessage.first(), ElementsName.Zone_Maps.Duplicate_Mapping_Error_Message, ElementsName.Zone_Maps.Duplicate_Error_Message_Label);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_network_Cancel_Button);
    console.log('\n')
    console.log("Wi-Fi mapping duplicate error message verified successfully.");
    await this.page.waitForTimeout(3000);
  }

  async Checking_Mapping_LowerCase(Mapping_Name: string, ZONE: string, SSID: string, ZONE2: string, SSID2: string) {
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Created_Mapping_Name);
    console.log("Verifying WiFi Integration Edit Mapping Name And Selected Zone  ...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Mapping_Name_label, ElementsName.Zone_Maps.Mapping_name, ElementsName.Zone_Maps.Mapping_name);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Zone_association_label, ElementsName.Zone_Maps.Zone_association, ElementsName.Zone_Maps.Zone_association);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_network_name_label, ElementsName.Zone_Maps.Wifi_Ssid_Name, ElementsName.Zone_Maps.Wifi_Ssid_Name);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_Checking_Mapping_Delete_button, ElementsName.Zone_Maps.Delete_Btn);
    await this.locatorsPage.admin_Wifi_Zone_association_Hover_text.hover();
    const hoverText1 = await this.locatorsPage.admin_Wifi_Zone_association_Hover_text.getAttribute('aria-label');
    await this.reusablePageClass.verifySuccessToastMatche(hoverText1, ElementsName.Zone_Maps.Wi_Fi_mapping_Hover_text01);
    await this.locatorsPage.admin_Wifi_network_name_Hover_text.hover();
    const hoverText2 = await this.locatorsPage.admin_Wifi_network_name_Hover_text.getAttribute('aria-label');
    await this.reusablePageClass.verifySuccessToastMatche(hoverText2, ElementsName.Zone_Maps.Wi_Fi_mapping_Hover_text02);
    await this.locatorsPage.admin_Wifi_Mapping_Name_label.hover();
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Wifi_Mapping_Name_input, Mapping_Name);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_network_Cancel_Button, ElementsName.Zone_Maps.Cancel_Btn);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Mapping_Add_another_btn);
    const Lower_ssd = await this.reusablePageClass.toLowerIfAlphaPresent(SSID)
    console.log('---------------------------------------------------------------------------')
    console.log("Checking SSID with case-sensitive comparison after converting to lowercase: ", Lower_ssd);
    console.log('---------------------------------------------------------------------------')
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Wifi_network_name_input_2, Lower_ssd);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_network_Apply_Button);
    await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.succsessMessage.first(), ElementsName.Zone_Maps.Duplicate_Mapping_Error_Message, ElementsName.Zone_Maps.Duplicate_Error_Message_Label);
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Wifi_network_name_input_2, SSID2);
    await this.page.waitForTimeout(6000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_network_Apply_Button);
    await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
    await this.page.waitForTimeout(3000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wi_Fi_network_name_Button);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wi_Fi_network_Name_second_text, SSID2, SSID2);
    console.log('\n')
    console.log("Wi-Fi mapping duplicate error message with lowercase SSID verified successfully.");
    await this.page.waitForTimeout(3000);
  }



  /**
   * Repeatedly deletes all items using the provided delete button locator.
   * Confirms deletion using the provided confirm button locator.
   *
   * @param deleteButtonLocator - Locator pointing to all delete buttons on the page
   * @param confirmButtonLocator - Locator for the confirmation popup/button after delete
   */
  async deleteAllIntegrations(deleteButtonLocator: Locator, confirmButtonLocator: Locator) {
    await this.page.waitForTimeout(5000);
    while (await deleteButtonLocator.count() > 0) {
      const firstButton = deleteButtonLocator.first();
      const isVisible = await firstButton.isVisible().catch(() => false);
      const isEnabled = await firstButton.isEnabled().catch(() => false);
      if (isVisible && isEnabled) {
        console.log("🗑️ Deleting integration...");

        await this.webElementActionClass.Click(firstButton);
        await this.page.waitForTimeout(2000);
        await this.webElementActionClass.Click(confirmButtonLocator);
        console.log("✅ Confirmed deletion.");

        await this.page.waitForTimeout(2000);

      } else {
        console.log("⚠️ First delete button not clickable. Breaking the loop.");
        break;
      }
    }
    await this.page.waitForTimeout(2000);
    console.log("✅ All integrations processed or none left.");
  }

  async Create_Mapping_With_BSSID() {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Checking_Integration_Wifi_Button_first_integration);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Checking_Step2_Aerrow_icon);
    console.log("Verifying WiFi Integration Mapping Screen...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Mapping_Header_text, ElementsName.Space_Popup_Expected.Wifi_mapping_header_txt, ElementsName.Space_Popup_Expected.Wifi_mapping_header_txt);
    await this.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Wifi_default_selected_Mapping_List, ElementsName.Wifi_mapping_List, ElementsName.Space_Popup_Expected.Wifi_mapping_List)
    await this.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Wifi_default_selected_Mapping_List_text, ElementsName.Wifi_mapping_List_text, ElementsName.Space_Popup_Expected.Wifi_mapping_List_text)
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_Mapping_Cancel_btn, ElementsName.Zone_Maps.Cancel_Btn);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_default_selected_Mapping_List.nth(1));
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Mapping_Next_btn);
  }


  async wifiMappingScreenBSSID(Mapping_Name: string, Mapping_Name_2: string, ZONE: string, SSID: string) {
    console.log("Verifying WiFi Integration Mapping Screen And Create Wifi Mapping ...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Mapping_Name_label, ElementsName.Zone_Maps.Mapping_name, ElementsName.Zone_Maps.Mapping_name);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Zone_association_label, ElementsName.Zone_Maps.Zone_association, ElementsName.Zone_Maps.Zone_association);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_BSSID_name_label, ElementsName.Zone_Maps.Wifi_BSsid_Name, ElementsName.Zone_Maps.Wifi_BSsid_Name);
    await this.locatorsPage.admin_Wifi_Zone_association_Hover_text.hover();
    const hoverText1 = await this.locatorsPage.admin_Wifi_Zone_association_Hover_text.getAttribute('aria-label');
    await this.reusablePageClass.verifySuccessToastMatche(hoverText1, ElementsName.Zone_Maps.Wi_Fi_mapping_Hover_text01);
    await this.locatorsPage.admin_Wifi_network_BSSID_Hover_text.hover();
    const hoverText2 = await this.locatorsPage.admin_Wifi_network_BSSID_Hover_text.getAttribute('aria-label');
    await this.reusablePageClass.verifySuccessToastMatche(hoverText2, ElementsName.Zone_Maps.Wi_Fi_mapping_Hover_text03);
    await this.locatorsPage.admin_Wifi_Mapping_Name_label.hover();
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Wifi_Mapping_Name_input, Mapping_Name);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Zone_association_inputClick);
    const checkbox = await this.locatorsPage.zoneCheckboxLocator(ZONE);
    await checkbox.check();
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Zone_association_inputClick);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Wifi_BSSID_input, SSID);
    await this.page.waitForTimeout(2000);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_network_Cancel_Button, ElementsName.Zone_Maps.Cancel_Btn);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_network_Apply_Button);
    await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
    await this.page.waitForTimeout(3000);
    // await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Wifi_Mapping_Name_input, '');
    // await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Wifi_Mapping_Name_input, Mapping_Name_2);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wi_Fi_network_BSSID_name_Button);
    await this.page.waitForTimeout(1000);

    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Created_Mapping_Name, Mapping_Name, Mapping_Name_2);
    console.log('\n')
    console.log("Wi-Fi mapping created successfully:", Mapping_Name_2);
  }

  async Checking_Mapping_LowerCase_BSSID(Mapping_Name: string, ZONE: string, SSID: string, ZONE2: string, BSSID2: string) {
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Created_Mapping_Name);
    console.log("Verifying WiFi Integration Edit Mapping Name And Selected Zone  ...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Mapping_Name_label, ElementsName.Zone_Maps.Mapping_name, ElementsName.Zone_Maps.Mapping_name);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wifi_Zone_association_label, ElementsName.Zone_Maps.Zone_association, ElementsName.Zone_Maps.Zone_association);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_BSSID_name_label, ElementsName.Zone_Maps.Wifi_BSsid_Name, ElementsName.Zone_Maps.Wifi_BSsid_Name);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Wifi_Checking_Mapping_Delete_button, ElementsName.Zone_Maps.Delete_Btn);
    await this.locatorsPage.admin_Wifi_Zone_association_Hover_text.hover();
    const hoverText1 = await this.locatorsPage.admin_Wifi_Zone_association_Hover_text.getAttribute('aria-label');
    await this.reusablePageClass.verifySuccessToastMatche(hoverText1, ElementsName.Zone_Maps.Wi_Fi_mapping_Hover_text01);
    await this.locatorsPage.admin_Wifi_network_BSSID_Hover_text.hover();
    const hoverText2 = await this.locatorsPage.admin_Wifi_network_BSSID_Hover_text.getAttribute('aria-label');
    await this.reusablePageClass.verifySuccessToastMatche(hoverText2, ElementsName.Zone_Maps.Wi_Fi_mapping_Hover_text03);
    await this.page.waitForTimeout(2000);
    await this.locatorsPage.admin_Wifi_Mapping_Name_label.hover();
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_Mapping_BSSID_Add_another_btn);
    const Lower_ssd = await this.reusablePageClass.toUpperIfAlphaPresent(SSID)
    console.log("Checking BSSID with UpperCase: ", SSID);
    console.log('---------------------------------------------------------------------------')
    console.log("Checking BSSID with case-sensitive comparison after converting to Uppercase: ", Lower_ssd);
    console.log('---------------------------------------------------------------------------')
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Wifi_BSSID_input_2, Lower_ssd);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_network_Apply_Button);
    await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.succsessMessage.first(), ElementsName.Zone_Maps.Duplicate_Mapping_Error_Message_BSSID, ElementsName.Zone_Maps.Duplicate_Error_Message_Label);
    await this.page.waitForTimeout(1000);
    console.log('\n')
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Wifi_BSSID_input_2, BSSID2);
    await this.page.waitForTimeout(6000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wifi_network_Apply_Button);
    await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
    await this.page.waitForTimeout(3000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Wi_Fi_network_name_Button_2);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Wi_Fi_BSSID_network_Name_second_text, BSSID2, BSSID2);
    console.log("Wi-Fi mapping duplicate error message with Uppercase BSSID verified successfully.");
    await this.page.waitForTimeout(3000);
  }

  async NavigateZoneCheckWfifichecking() {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Main_Menu_Spaces);
    console.log("Verifying Spaces Sub Menus Navigations...");
    console.log("\n");
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Zones_and_Maps, ElementsName.Admin_Navigation_Menu.Zones_and_maps_menu);
    await this.page.waitForTimeout(2000);

  }
  async NavigateZoneCheckinTAb() {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Space_zone_Checkin_tab);
    console.log("Verifying Cheking Tab");
    console.log("\n");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Space_zone_Checkin_tab_checkin_type_label, ElementsName.Zone_Maps.CheckintypeLabel, ElementsName.Zone_Maps.CheckintypeLabel);
    await this.page.waitForTimeout(2000);


  }
  async selectCheckinOptionIfNotSelected(zoneName?: string): Promise<void> {
    const nameToUse = zoneName ?? 'Wi-Fi'; // default to 'Wi-Fi' if zoneName is undefined

    const activeLocator = this.page.locator(`//li[contains(@class, 'active')]//label[contains(normalize-space(), "${nameToUse}")]`);
    const checkboxLocator = this.page.locator(`//label[contains(normalize-space(), "${nameToUse}")]//input[@type="checkbox"]`);

    await checkboxLocator.waitFor({ state: 'attached', timeout: 5000 });

    await this.webElementActionClass.Click(this.locatorsPage.admin_Space_zone_Checkin_tab_checkin_Tab_dropdown_Button);
    await this.page.waitForTimeout(1000);
    const isActive = await activeLocator.isVisible();
    if (!isActive) {
      console.log(`"${nameToUse}" is NOT selected. Selecting now...`);
      await checkboxLocator.check();
      await this.page.waitForTimeout(1000);
    } else {
      console.log(`"${nameToUse}" is already selected. Skipping...`);
    }
    await this.webElementActionClass.Click(this.locatorsPage.admin_Space_zone_Checkin_tab_checkin_Tab_Submit_Button);
    await this.page.waitForTimeout(3000);
  }

    async NavigateZoneAdvancedSettingsTAb() {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Space_zone_Advanced_Settings_tab_button);
    console.log("Verifying Advanced Settings Tab");
    console.log("\n");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Space_zone_Advanced_Settings_tab_label_first, ElementsName.AdvancedSettingsLabelTexts[0], ElementsName.Zone_Maps.AdvancedSettingsLabel);
    await this.page.waitForTimeout(2000);


  }

    async NavigateZoneprivacyTAb() {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Space_zone_Privacy_tab_button);
    console.log("Verifying Privacy Tab");
    console.log("\n");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Space_zone_Privacy_tab_label_first, ElementsName.PrivacyLabelTexts[0], ElementsName.Zone_Maps.PrivacyLabel);
    await this.page.waitForTimeout(2000);


  }


 





}