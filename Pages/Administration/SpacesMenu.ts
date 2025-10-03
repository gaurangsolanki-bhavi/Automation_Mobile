import { Locator, Page, expect } from "@playwright/test";
import WaitActionClass from "../../Actions/WaitActions";
import WebElementActionClass from "../../Actions/WebElementActions";
import LocatorsPage from "../Locators";
import ReusableActionClass from "../../Actions/ReusableActions";
import ReusablePage from "../Member/ReusablePage";
import ElementsName from "../../test-data/JSON/Elements_Name.json";
import Path from "../../test-data/JSON/zone_data.json";
import AdminLoginPage from "../Administration/AdminLogin"
import dayjs from "dayjs";


let timeStamp;

export default class SpacesMenuPage {
  private waitActionClass: WaitActionClass;
  private webElementActionClass: WebElementActionClass;
  private reusableActionClass: ReusableActionClass;
  private locatorsPage: LocatorsPage;
  private reusablePageClass: ReusablePage;
  private adminLoginPage: AdminLoginPage;
  public randomSpotName: string | undefined;





  constructor(public page: Page) {
    // Initialize class objects
    this.waitActionClass = new WaitActionClass(page);
    this.webElementActionClass = new WebElementActionClass(page);
    this.reusableActionClass = new ReusableActionClass(page);
    this.locatorsPage = new LocatorsPage(page);
    this.reusablePageClass = new ReusablePage(page);
    this.adminLoginPage = new AdminLoginPage(page);
  }
  async navigateToZoneAndMapMenu() {
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Main_Menu_Spaces);
    console.log("Verifying Spaces Sub Menus Navigations...");
    console.log("\n");
    await this.page.waitForTimeout(2000);
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Zones_and_Maps, ElementsName.Admin_Navigation_Menu.Zones_and_maps_menu);
  }

  async zoneAndMapPageElements() {
    console.log('--- Validating Zone & Map Page Elements ---');
    console.log('Checking visibility of "Add Zone" button...');
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_and_space_Add_zone_button, ElementsName.Zone_Maps.Add_Zone_Btn)
    console.log('Checking visibility of "Export Zone" button...');

    console.log('\n')
    console.log('Clicking on "All Zones Count"...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_and_space_List_all_Zone_count)
    await this.page.waitForTimeout(1000);
    const All_zone_cont_page = await this.locatorsPage.admin_Spaces_Zone_and_space_List_all_Zone_count.getAttribute('data-activeststus')
    console.log(`Zone count from UI attribute (data-activeststus): ${All_zone_cont_page}`);
    console.log('Fetching and listing all zones...');
    console.log('---------------------------------');
    const All_Zone_Count = await this.printElementsWithIndex(this.locatorsPage.admin_Spaces_Zone_and_space_List_all_Zone, ElementsName.Zone_Maps.List_Of_All_ZOne)
    console.log(`Actual number of zones listed: ${All_Zone_Count}`);
    console.log('Validating that zone count matches expected...');
    expect(All_zone_cont_page).toBe(String(All_Zone_Count));
    console.log('✅ Zone count matches as expected.');
    console.log('\n')
    console.log('Clicking on "Active Zones Count"...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_and_space_List_all_Zone_Active_count)
    await this.page.waitForTimeout(3000);
    const Active_zone_cont_page = await this.locatorsPage.admin_Spaces_Zone_and_space_List_all_Zone_Active_count.getAttribute('data-activeststus')
    console.log(`Active Zone count from UI attribute (data-activeststus): ${Active_zone_cont_page}`);
    console.log('Fetching and listing Active zones...');
    console.log('---------------------------------');
    const Active_Zone_Count = await this.printElementsWithIndex(this.locatorsPage.admin_Spaces_Zone_and_space_List_all_Zone, ElementsName.Zone_Maps.List_Of_Active_ZOne)
    console.log(`Actual number of Active zones listed: ${Active_Zone_Count}`);
    console.log('Validating that Active  zone count matches expected...');
    expect(Active_zone_cont_page).toBe(String(Active_Zone_Count));
    console.log('✅ Active  Zone count matches as expected.');
    console.log('\n')
    console.log('Clicking on "InActive Zones Count"...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_and_space_List_all_Zone_INActive_count)
    await this.page.waitForTimeout(3000);
    const INActive_zone_cont_page = await this.locatorsPage.admin_Spaces_Zone_and_space_List_all_Zone_INActive_count.getAttribute('data-activeststus')
    console.log(`Inactive Zone count from UI attribute (data-activeststus): ${INActive_zone_cont_page}`);
    console.log('Fetching and listing Inactive zones...');
    console.log('---------------------------------');
    const inActive_Zone_Count = await this.printElementsWithIndex(this.locatorsPage.admin_Spaces_Zone_and_space_List_all_Zone, ElementsName.Zone_Maps.List_Of_InActive_ZOne)
    console.log(`Actual number of inactive zones listed: ${inActive_Zone_Count}`);
    console.log('Validating that inactive  zone count matches expected...');
    expect(INActive_zone_cont_page).toBe(String(inActive_Zone_Count));
    console.log('✅ Inactive  Zone count matches as expected.');
    console.log('\n')
    console.log('------------------------------------');
    console.log('Final Assertion Zone Count: Active + Inactive = Total');
    const activeZoneCountValue = Active_zone_cont_page ? Number(Active_zone_cont_page) : 0;
    const inActiveZoneCountValue = INActive_zone_cont_page ? Number(INActive_zone_cont_page) : 0;
    const calculatedTotal = activeZoneCountValue + inActiveZoneCountValue;
    console.log(`Calculated total (Active + Inactive): ${calculatedTotal}`);
    // Make sure allZoneCount is defined and a number
    const allZoneCount = All_zone_cont_page ? Number(All_zone_cont_page) : 0;
    console.log(`Total zone count from list: ${allZoneCount}`);
    expect(calculatedTotal).toBe(allZoneCount);
    console.log('✅ Verified: Active + Inactive zone count equals Total zone count.');
    console.log('------------------------------------');
  }

  async verifyingZoneHeader() {
    await this.validateHeaderElementsMatchExpected(this.locatorsPage.admin_Spaces_Zone_and_space_Header_Name, ElementsName.zoneTableHeaders, ElementsName.Zone_Maps.zoneTableHeaderselm)
  }

  async verifyingSpotHeader() {
    await this.validateHeaderElementsMatchExpected(this.locatorsPage.admin_Spaces_Spot_Header_Name, ElementsName.SpotTableHeaders, ElementsName.Zone_Maps.SpotTableHeaderselm)
  }


  async printElementsWithIndex(locator: Locator, element: string) {
    await this.waitActionClass.waitForElementVisible(locator.first());
    const count = await locator.count();
    console.log("List of ", count, element)
    for (let i = 0; i < count; i++) {
      const text = await locator.nth(i).textContent();
      console.log(`${i + 1}: ${text?.trim()}`);
    }
    return count;
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

  async verifyingGeneralLabels() {
    await this.validateLabelElementsMatchExpected(this.locatorsPage.admin_Spaces_Spot_General_Labels, ElementsName.GeneralLabelTexts, ElementsName.Zone_Maps.GeneralLabelsTexts)
  }

  async validateLabelElementsMatchExpected(locator: Locator, expectedHeaders: string[], label: string): Promise<void> {
    const count = await locator.count() - 1;
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

  async SearchZoneAndVerifyZoneDetails(zoneName: string) {
    await this.searchAndClickZone(this.locatorsPage.admin_Wifi_Checking_Integration_Search_Box, zoneName)
  }

  async generalSpotHoverText() {
    await this.validateMultipleHoverPopupsWithExpectedText(this.locatorsPage.admin_Spaces_Spot_General_hover_texts, ElementsName.GeneralHoverTexts, ElementsName.Zone_Maps.GeneralHoverTexts)
  }

  async validateMultipleHoverPopupsWithExpectedText(hoverTargets: Locator, expectedTexts: string[], label: string
  ) {
    const count = await hoverTargets.count() - 1;
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


  async searchAndClickZone(inputElem: Locator, zoneName: string) {
    console.log('Clicking on "All Zones Count"...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_and_space_List_all_Zone_count)
    await this.page.waitForTimeout(3000);
    console.log(`🔍 Searching for zone: "${zoneName}"`);

    await this.webElementActionClass.Send_Keys(inputElem, zoneName)
    await this.page.waitForTimeout(3000); // optional wait for debounce
    // Wait for results to appear
    const firstResult = this.locatorsPage.admin_Spaces_Zone_and_space_first_zone_link;
    const text = (await firstResult.textContent())?.trim();
    console.log(`✅ Clicking on first result: "${text}"`);
    await this.webElementActionClass.Click(firstResult)
    await this.page.waitForTimeout(1000);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_and_space_Zone_First_Edit_input_value, ElementsName.Zone_Maps.Zone_Name_input_value)
    const inputZoneName = await this.locatorsPage.admin_Spaces_Zone_and_space_Zone_First_Edit_input_value.getAttribute('value')
    console.log(`🧪 Asserting zone name... Expected: "${zoneName}" | Actual: "${inputZoneName}"`);
    expect(inputZoneName).toContain(zoneName);
  }

  async validateAddZonePopupElements() {
    console.log('Validating "Add Zone" Popup Elements...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_and_space_Add_zone_button);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Popup, ElementsName.Zone_Maps.Add_Zone_Popup_element);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Popup_text01, ElementsName.Space_Popup_Expected.Add_Zone_Popup_text01, ElementsName.Zone_Maps.Popup_Title_Header);

    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Popup_Zone_Name_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Zone_Name_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Zone_Name_Elem);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Popup_Zone_Name_input, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Zone_Name_Elem);

    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Popup_Zone_type_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Zone_Type_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Zone_Type_Elem);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Popup_Zone_type_input, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Zone_Type_Elem);

    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Popup_Map_type_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Map_Type_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Map_Type_Elem);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Popup_Map_type_input, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Map_Type_Elem);

    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Popup_Time_zone_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Time_Zone_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Time_Zone_Elem);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Popup_Time_zone_input, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Time_Zone_Elem);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_toggel_text, ElementsName.Space_Popup_Expected.Zone_toggled, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Time_Zone_Elem);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Complete_button, ElementsName.Space_Popup_Expected.Add_Zone_Popup_complete_button);
  }

  async validateAddZonePopupToggledOn() {
    console.log('Turn on Advanced Toggle on for "Add Zone" Popup Elements...');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_Zone_Add_zone_toggel, ElementsName.Space_Popup_Expected.Zone_toggled_Elem, 'on');
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Steps, ElementsName.Expected_Steps[1], ElementsName.Zone_Maps.Steps);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggeled_Header_text1, ElementsName.Space_Popup_Expected.Add_Zone_Popup_toggled_text01, ElementsName.Zone_Maps.Popup_Title_Header);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggeled_Header_text2, ElementsName.Space_Popup_Expected.Add_Zone_Popup_toggled_text02, ElementsName.Zone_Maps.Popup_Title_Header);

    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Zone_Name_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Zone_Name_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Zone_Name_Elem);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Zone_Name_input, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Zone_Name_Elem);

    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Zone_Type_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Type_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Zone_Type_Elem);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Zone_Type_input, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Zone_Type_Elem);

    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Map_type_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Map_Type_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Map_Type_Elem);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Map_type_input, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Map_Type_Elem);

    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_file_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_toggled_File_text03, ElementsName.Zone_Maps.file_elem);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_file_input, ElementsName.Zone_Maps.file_elem);

    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Next_button, ElementsName.Zone_Maps.Next_button);
    await this.addZonePopupStep1();
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Next_button);
    await this.page.waitForTimeout(2000);
    await this.addZonePopupStep2();
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Next_button_step2);
    await this.addZonePopupStep3();
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Next_button_step3);
    await this.addZonePopupStep4();
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Next_button_step4);
    await this.addZonePopupStep5();
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Next_button_step5);
    await this.addZonePopupStep6();
    console.log('\n');
    console.log('Clicking Back on  and Verifying "Add Zone" Popup Elements...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Back_button_step6);
    await this.addZonePopupStep5();
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Back_button_step5);
    await this.addZonePopupStep4();
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Back_button_step4);
    await this.addZonePopupStep3();
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Back_button_step3);
    await this.addZonePopupStep2();
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Back_button_step2);
    await this.addZonePopupStep1();
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_Add_zone_Popup_Close_Button);
  }

  async addZonePopupStep1() {
    console.log('Fill The Data on Form Step1 Popup Elements...');
    const Random = await this.reusablePageClass.generateRandomNumber();
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Zone_Name_input, 'Zone' + Random);
    await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Zone_Type_input_dropdown, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Zone_Type_Elem);
    await this.page.waitForTimeout(1000);
    await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Map_type_input_dropdown, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Map_Type_Elem);
    await this.page.waitForTimeout(1000);

  }
  async addZonePopupStep2() {
    console.log('Verifying Steps 2 "Add Zone" Popup Elements...');
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Steps, ElementsName.Expected_Steps[2], ElementsName.Zone_Maps.Steps);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Header_Step2, ElementsName.Space_Popup_Expected.Add_Zone_Popup_toggled_Header_Step2, ElementsName.Zone_Maps.Popup_Title_Header);
    const hoverText = await this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step2.getAttribute('aria-label');
    await this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step2.hover();
    await this.reusablePageClass.verifySuccessToastMatche(hoverText, ElementsName.Space_Popup_Expected.Add_Zone_Popup_toggled_Header_Hover_text_Step2);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Allow_re_booking_after_cancellation_label, ElementsName.Space_Popup_Expected.Allow_re_booking_after_cancellation_Label, ElementsName.Space_Popup_Expected.Allow_re_booking_after_cancellation_Label);
    await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Allow_re_booking_after_cancellation_input, ElementsName.Space_Popup_Expected.Allow_re_booking_after_cancellation_Label);

  }
  async addZonePopupStep3() {
    console.log('Verifying Steps 3 "Add Zone" Popup Elements...');
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Steps, ElementsName.Expected_Steps[3], ElementsName.Zone_Maps.Steps);
    await this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step3.hover();
    const hoverText = await this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step3.getAttribute('aria-label');
    await this.reusablePageClass.verifySuccessToastMatche(hoverText, ElementsName.Space_Popup_Expected.Add_Zone_Popup_toggled_Header_Step3);
    await this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Back_button_step3.hover();
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Credit_system_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Credit_system_label, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Credit_system_label);
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Credit_system_input, ElementsName.Space_Popup_Expected.Add_Zone_Popup_Credit_system_label, 'on');
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Booking_cost_label, ElementsName.Space_Popup_Expected.Booking_cost_Label, ElementsName.Space_Popup_Expected.Booking_cost_Label);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Back_button_step3, ElementsName.Zone_Maps.Back_button);
    await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Booking_cost_input, ElementsName.Space_Popup_Expected.Booking_cost_Label);

    await this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step3_2.hover();
    const hoverText2 = await this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step3_2.getAttribute('aria-label');
    await this.reusablePageClass.verifySuccessToastMatche(hoverText2, ElementsName.Space_Popup_Expected.Add_Zone_Popup_toggled_Header_Step3_2);
    await this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Back_button_step3.hover();
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Credit_refund_Cancel_before_label, ElementsName.Space_Popup_Expected.Credit_refund_Cancel_before_label, ElementsName.Space_Popup_Expected.Credit_refund_Cancel_before_label);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Credit_refund_Adjust_time_slider_label, ElementsName.Space_Popup_Expected.Credit_refund_Adjust_time_slider_label, ElementsName.Space_Popup_Expected.Credit_refund_Adjust_time_slider_label);


    await this.page.on('console', msg => {
      if (msg.type() === 'log') {
        console.log(`[Browser Console]: ${msg.text()}`);
      }
    });
    // Adjust the slider to 10% as per the requirement + right and - left handle)
    await this.setSliderValueByPercentage('#slider-range', 0, 10);
    await this.setSliderValueByPercentage('#slider-range', 1, 15);
    await this.page.waitForTimeout(2000);

    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Credit_refund_No_refund_label, ElementsName.Space_Popup_Expected.Credit_refund_No_refund_label, ElementsName.Space_Popup_Expected.Credit_refund_No_refund_label);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Credit_refund_Full_refund_label, ElementsName.Space_Popup_Expected.Credit_refund_Full_refund_label, ElementsName.Space_Popup_Expected.Credit_refund_Full_refund_label);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Credit_refund_Half_refund_label, ElementsName.Space_Popup_Expected.Credit_refund_Half_refund_label, ElementsName.Space_Popup_Expected.Credit_refund_Half_refund_label);

  }

  async addZonePopupStep4() {
    console.log('Verifying Steps 4 "Add Zone" Popup Elements...');
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Steps, ElementsName.Expected_Steps[4], ElementsName.Zone_Maps.Steps);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Enable_email_reminders_Label, ElementsName.Space_Popup_Expected.Email_reminders_label, ElementsName.Space_Popup_Expected.Email_reminders_label);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step4, ElementsName.Space_Popup_Expected.Add_Zone_Popup_toggled_Header_Step4, ElementsName.Space_Popup_Expected.Email_reminders_label);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Enable_booking_reminders_button, ElementsName.Zone_Maps.Enable_booking_reminders_button);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Disable_booking_reminders_button, ElementsName.Zone_Maps.Disable_booking_reminders_button);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_ToggledBlock_last_minute_bookings_label_txt, ElementsName.Space_Popup_Expected.Block_last_minute_bookings, ElementsName.Space_Popup_Expected.Block_last_minute_bookings);
    const hoverText = await this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step_2.getAttribute('aria-label');
    await this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step_2.hover();
    await this.reusablePageClass.verifySuccessToastMatche(hoverText, ElementsName.Space_Popup_Expected.Add_Zone_Popup_toggled_Header_Hover_text_Step4);
    await this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Next_button_step4.hover();
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_Zone_Add_zone_ToggledBlock_last_minute_bookings_toggeled, ElementsName.Space_Popup_Expected.Block_last_minute_bookings, 'on');
    await this.page.waitForTimeout(2000);
    await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_Spaces_Zone_Add_zone_ToggledBlock_last_minute_bookings_input, ElementsName.Space_Popup_Expected.Block_last_minute_bookings);

  }

  async addZonePopupStep5() {
    console.log('Verifying Steps 5 "Add Zone" Popup Elements...');
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Steps, ElementsName.Expected_Steps[5], ElementsName.Zone_Maps.Steps);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_waitlist_position_label_txt, ElementsName.Space_Popup_Expected.Show_waitlist_position_label, ElementsName.Space_Popup_Expected.Show_waitlist_position_label);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step5, ElementsName.Space_Popup_Expected.Add_Zone_Popup_toggled_Header_Step5, ElementsName.Space_Popup_Expected.Show_waitlist_position_label);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_waitlist_position_on_button, ElementsName.Space_Popup_Expected.Show_waitlist_position_label);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_waitlist_position_off_button, ElementsName.Space_Popup_Expected.Hide_position_in_waitlist_label);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Show_bookings_to_users_Label, ElementsName.Space_Popup_Expected.Show_bookings_to_users_label);
    await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Show_bookings_to_users_Select, ElementsName.Space_Popup_Expected.Show_bookings_to_users_label);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Unlock_90th_day_Label, ElementsName.Space_Popup_Expected.Unlock_90th_day_label);
    await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_random_book_time_type_Select, ElementsName.Space_Popup_Expected.Unlock_90th_day_label);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Unlock_90th_day_at_label, ElementsName.Space_Popup_Expected.Unlock_90th_day_at_label, ElementsName.Space_Popup_Expected.Unlock_90th_day_at_label);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Unlock_90th_day_at_input, '08:00');

  }

  async addZonePopupStep6() {
    console.log('Verifying Steps 6 "Add Zone" Popup Elements...');
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Steps, ElementsName.Expected_Steps[6], ElementsName.Zone_Maps.Steps);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Administrator_access_label, ElementsName.Space_Popup_Expected.Administrator_access_label, ElementsName.Space_Popup_Expected.Administrator_access_label);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Next_button_step6, ElementsName.Zone_Maps.Complete);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Add_zone_Toggled_Back_button_step6, ElementsName.Zone_Maps.Back_button);
    await this.page.waitForTimeout(2000);
  }


  async setSliderValueByPercentage(
    sliderSelector: string,
    handleIndex: number,
    targetPercentage: number
  ) {
    await this.page.evaluate(
      (args) => {
        const [selector, index, percent] = args as [string, number, number];

        const slider = document.querySelector(selector) as HTMLElement;
        if (!slider) throw new Error('Slider element not found');

        const totalWidth = slider.offsetWidth;
        const value = Math.round((percent / 100) * totalWidth);

        const $slider = (window as any).$ ? (window as any).$(slider) : null;
        if (!$slider || !$slider.slider) {
          console.error('❌ jQuery UI slider not found or not initialized.');
          return;
        }

        const currentValues = $slider.slider("option", "values");
        if (Array.isArray(currentValues)) {
          currentValues[index] = value;
          $slider.slider("option", "values", currentValues);
          console.log(`✅ Updated slider handle ${index} to value ${value}`);
        } else {
          $slider.slider("value", value);
          console.log(`✅ Updated single-handle slider to value ${value}`);
        }
      },
      [sliderSelector, handleIndex, targetPercentage]
    );
  }

  async dragSliderHandleByPercentage(
    sliderSelector: string,      // e.g. '#slider-range-for-next-day'
    handleIndex: number,         // 0 or 1
    targetPercentage: number     // 0 to 100
  ): Promise<void> {
    const slider = this.page.locator(sliderSelector);
    const handle = slider.locator('.ui-slider-handle.ui-corner-all.ui-state-default').nth(handleIndex);

    await slider.waitFor({ state: 'visible' });
    await handle.waitFor({ state: 'visible' });

    const sliderBox = await slider.boundingBox();
    const handleBox = await handle.boundingBox();

    if (!sliderBox || !handleBox) {
      throw new Error('Could not get bounding boxes for slider or handle');
    }

    const targetX = sliderBox.x + (sliderBox.width * targetPercentage) / 100;
    const currentX = handleBox.x + handleBox.width / 2;
    const centerY = handleBox.y + handleBox.height / 2;

    console.log(`Dragging handle ${handleIndex} from X=${currentX.toFixed(1)} to X=${targetX.toFixed(1)}`);

    await this.page.mouse.move(currentX, centerY);
    await this.page.mouse.down();
    await this.page.mouse.move(targetX, centerY, { steps: 15 });
    await this.page.mouse.up();

    await this.page.waitForTimeout(300);
  }






  async setSliderValueByPercentagesingle(
    sliderLocator: Locator,
    targetPercentage: number
  ) {
    await sliderLocator.evaluate((slider, percent) => {
      const inputSlider = slider as HTMLInputElement;
      const min = parseFloat(inputSlider.min || "0");
      const max = parseFloat(inputSlider.max || "100");
      const newValue = Math.round(((percent / 100) * (max - min)) + min);
      inputSlider.value = String(newValue);
      inputSlider.dispatchEvent(new Event('input', { bubbles: true }));
      inputSlider.dispatchEvent(new Event('change', { bubbles: true }));
      console.log(`✅ Slider set to ${newValue} (${percent}%)`);
    }, targetPercentage);
  }



  async SpotGeneralTabsElements() {
    console.log('\n');
    console.log('Verifying Spot General Tabs Elements...');
    console.log('---------------------------------------');
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_and_space_Zone_First_Edit_input_value, ElementsName.Zone_Maps.Zone_Name_input_value)
    const inputZoneName = await this.locatorsPage.admin_Spaces_Zone_and_space_Zone_First_Edit_input_value.getAttribute('value')
    console.log(`Selected Zone name: "${inputZoneName}"`);
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_Zone_Active_zone_Toggled_Type_input, ElementsName.GeneralLabelTexts[1], 'on');
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_type_Dropdown, ElementsName.GeneralLabelTexts[2])
    const selectedZoneType = await this.locatorsPage.admin_Spaces_Zone_type_Dropdown.textContent();
    console.log(`Selected Zone type: "${selectedZoneType}"`);
    const selectedZoneType2 = await this.locatorsPage.admin_Spaces_Zone_type_Dropdown_2.getAttribute('aria-disabled');
    console.log(`Zone type Dropdown is Disabled: "${selectedZoneType2}"`);
    expect(selectedZoneType2).toBe('true');
    await this.reusablePageClass.selectOptionFromDropdown(this.locatorsPage.admin_Spaces_Zone_Map_configuration_Dropdown, 0, ElementsName.GeneralLabelTexts[3]);
    await this.reusablePageClass.selectDropdownOptionByValue(this.locatorsPage.admin_Spaces_Zone_Timezone_Dropdown, 'Asia/Kolkata', ElementsName.GeneralLabelTexts[4]);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Update_button, ElementsName.Zone_Maps.Update_Btn)
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Cancel_button, ElementsName.Zone_Maps.Cancel_Btn)
    //await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Zone_Cancel_button);
  }

  async ZoneDisplayTabsElements() {
    console.log('Verifying Zone Display Tabs Elements...');
    console.log('-----------------------------------------');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Space_zone_Display_Tab_Button);
    console.log('👉 Clicked on Display Tab');
    await this.reusablePageClass.selectOptionFromDropdown(this.locatorsPage.admin_Spaces_Zone_Display_colour_Dropdown, 0, ElementsName.DisplayLabelTexts[1]);
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_Zone_Display_position_Toggle, ElementsName.DisplayLabelTexts[2], 'off');
    await this.setMapFontSize(10)
    await this.locatorsPage.admin_Spaces_Zone_Display_File_Upload.setInputFiles(Path.ZONE_SET1.IMGPATH);

    this.page.on('console', msg => {
      if (msg.type() === 'log') {
        console.log(`[🧠 Browser Console]: ${msg.text()}`);
      }
    });
    await this.setSliderValueByPercentagesingle(this.locatorsPage.admin_Space_zone_Display_map_zoom_level_Scroller, 50); // Set slider to 70%
    console.log('Slider interaction triggered (target:%)');
    await this.page.waitForTimeout(1000);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Update_button, ElementsName.Zone_Maps.Update_Btn)
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Cancel_button, ElementsName.Zone_Maps.Cancel_Btn)
    console.log('Completed Zone Display Tabs Elements validation.\n');
  }

  async verifyingDisplayLabels() {
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Spaces_Spot_Display_Labels, ElementsName.DisplayLabelTexts, ElementsName.Zone_Maps.DisplayLabelsText)
  }
  async DisplaySpotHoverText() {
    await this.reusablePageClass.validateMultipleHoverPopupsWithExpectedText(this.locatorsPage.admin_Spaces_Spot_Display_hover_texts, ElementsName.DisplayHoverTexts, ElementsName.Zone_Maps.DisplayLabelsText)
  }

  async setMapFontSize(expectedSize: number = 20): Promise<void> {
    console.log('\n⚙️  [Action] Setting Map Font Size...');
    console.log('---------------------------------------');
    console.log(`🎯 Target Font Size: ${expectedSize}`);

    const inputLocator = this.locatorsPage.admin_Spaces_Map_Fontsize_Input;
    const plusButton = this.locatorsPage.admin_Spaces_Map_Fontsize_Plus_Button;
    const minusButton = this.locatorsPage.admin_Spaces_Map_Fontsize_Minus_Button;

    // Wait until input is ready
    await inputLocator.waitFor({ state: 'visible' });
    const currentValueText = await inputLocator.inputValue();
    const currentValue = parseInt(currentValueText, 10);

    console.log(`🔍 Current Font Size: ${currentValue}`);

    if (isNaN(currentValue)) {
      throw new Error('❌ Unable to read font size. Input value is not a number.');
    }

    const diff = expectedSize - currentValue;
    if (diff === 0) {
      console.log(`✅ Font size is already at desired value: ${expectedSize}`);
      return;
    }

    const buttonToClick = diff > 0 ? plusButton : minusButton;
    const direction = diff > 0 ? 'Increasing' : 'Decreasing';
    const steps = Math.abs(diff);

    console.log(`🔁 ${direction} font size by ${steps} step(s)...`);

    for (let i = 0; i < steps; i++) {
      await buttonToClick.scrollIntoViewIfNeeded();
      await buttonToClick.click();
      await this.page.waitForTimeout(200); // allow time for value to update

      const updatedValue = parseInt(await inputLocator.inputValue(), 10);
      console.log(`  Step ${i + 1}: Font size = ${updatedValue}`);
    }

    const finalValue = parseInt(await inputLocator.inputValue(), 10);
    console.log(`📦 Final Font Size Set To: ${finalValue}`);

    if (finalValue !== expectedSize) {
      throw new Error(`❌ Font size mismatch. Expected ${expectedSize}, but got ${finalValue}`);
    }

    console.log(`✅ Font size successfully set from ${currentValue} → ${expectedSize}`);
  }

  async ZoneRemindersTabsElements() {
    console.log('Verifying Zone Reminders Tabs Elements...');
    console.log('-----------------------------------------');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Space_zone_Reminders_Tab_Button);
    console.log('👉 Clicked on Reminders Tab\n');
    console.log('----------------------------------------------');
    console.log(`Verifying and Select ${ElementsName.ReminderLabelTexts[0]} Dropdowns...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spaces_hourlyBookings_SendReminders_Dropdown, 'No', `${ElementsName.ReminderLabelTexts[0]} ${ElementsName.ReminderColumnHeaderLabel[0]}`);
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spaces_dailyBookings_SendReminders_Dropdown, 'No', `${ElementsName.ReminderLabelTexts[0]} ${ElementsName.ReminderColumnHeaderLabel[1]}`);
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spaces_scheduledBookings_SendReminders_Dropdown, 'No', `${ElementsName.ReminderLabelTexts[0]} ${ElementsName.ReminderColumnHeaderLabel[2]}`);

    console.log('----------------------------------------------');
    console.log(`Verifying and Select ${ElementsName.ReminderLabelTexts[1]} Dropdowns...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spaces_hourlyBookings_ReminderFrequency_Dropdown, 'Same day as the booking', `${ElementsName.ReminderLabelTexts[1]} ${ElementsName.ReminderColumnHeaderLabel[0]}`);
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spaces_dailyBookings_ReminderFrequency_Dropdown, '1 day before the booking', `${ElementsName.ReminderLabelTexts[1]} ${ElementsName.ReminderColumnHeaderLabel[1]}`);
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spaces_scheduledBookings_ReminderFrequency_Dropdown, '1 day before the booking', `${ElementsName.ReminderLabelTexts[1]} ${ElementsName.ReminderColumnHeaderLabel[2]}`);

    console.log('----------------------------------------------');
    console.log(`Verifying and Select ${ElementsName.ReminderLabelTexts[2]} Dropdown and Elements...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spaces_hourlyBookings_ReminderFrequency_Dropdown, 'Same day as the booking', `${ElementsName.ReminderLabelTexts[2]} ${ElementsName.ReminderColumnHeaderLabel[0]}`);
    console.log('Set All Day Reminder time :11:30 ');
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Spaces_dailyBookings_Remindertime_input, '11:30');
    console.log('Set All Day Reminder time :12:30 ');
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Spaces_scheduledBookings_Remindertime_input, '12:30');


    console.log('----------------------------------------------');
    console.log(`Verifying ${ElementsName.ReminderLabelTexts[3]} Toggle buttons...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_hourly_ConfirmationRequiredInReminder_toggle, `${ElementsName.ReminderLabelTexts[3]} ${ElementsName.ReminderColumnHeaderLabel[0]}`, 'on');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_daily_ConfirmationRequiredInReminder_toggle, `${ElementsName.ReminderLabelTexts[3]} ${ElementsName.ReminderColumnHeaderLabel[1]}`, 'on');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_scheduled_daily_ConfirmationRequiredInReminder_toggle, `${ElementsName.ReminderLabelTexts[3]} ${ElementsName.ReminderColumnHeaderLabel[2]}`, 'on');


    console.log('----------------------------------------------');
    console.log(`Verifying and Select ${ElementsName.ReminderLabelTexts[4]} Dropdowns...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spaces_hourlyBookings_ConfirmationRequiredWithin_Dropdown, '2 hours', `${ElementsName.ReminderLabelTexts[4]} ${ElementsName.ReminderColumnHeaderLabel[0]}`);
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spaces_dailyBookings_ConfirmationRequiredWithin_Dropdown, '2 hours', `${ElementsName.ReminderLabelTexts[4]} ${ElementsName.ReminderColumnHeaderLabel[1]}`);
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spaces_scheduledBookings_ConfirmationRequiredWithin_Dropdown, '2 hours', `${ElementsName.ReminderLabelTexts[4]} ${ElementsName.ReminderColumnHeaderLabel[2]}`);

    console.log('----------------------------------------------');
    console.log(`Verifying ${ElementsName.ReminderLabelTexts[5]} Toggle buttons...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_daily_BookingEndReminder_toggle, `${ElementsName.ReminderLabelTexts[5]} ${ElementsName.ReminderColumnHeaderLabel[0]}`, 'on');

    console.log('----------------------------------------------');
    console.log(`Verifying and Select ${ElementsName.ReminderLabelTexts[6]} Dropdowns...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spaces_dailyBookings_BookingEndReminderTime_Dropdown, '10 minutes before the end', `${ElementsName.ReminderLabelTexts[6]} ${ElementsName.ReminderColumnHeaderLabel[0]}`);

    await this.page.waitForTimeout(1000);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Update_button, ElementsName.Zone_Maps.Update_Btn)
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Cancel_button, ElementsName.Zone_Maps.Cancel_Btn)
    console.log('Completed Zone Reminders Tabs Elements validation.\n');

  }


  async verifyingRemindersLabels() {
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Spaces_Spot_Reminder_Labels, ElementsName.ReminderLabelTexts, ElementsName.Zone_Maps.ReminderLabelsText)
  }
  async RemindersSpotHoverText() {
    await this.reusablePageClass.validateMultipleHoverPopupsWithExpectedText(this.locatorsPage.admin_Spaces_Spot_Reminder_hover_texts, ElementsName.ReminderHoverTexts, ElementsName.Zone_Maps.ReminderLabelsText)
  }
  async verifyingRemindersColumnHeaders() {
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Spaces_Spot_Reminder_Column_Header, ElementsName.ReminderColumnHeaderLabel, ElementsName.Zone_Maps.ReminderLabelsText)
  }
  async ZoneCreditsTabsElements() {
    console.log('Verifying Zone Credits Tabs Elements...');
    console.log('-----------------------------------------');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spaces_Spot_Credit_Tab_Button);
    console.log('👉 Clicked on Credits Tab\n');
    console.log('----------------------------------------------');
    console.log(`Verifying ${ElementsName.CreditsLabelTexts[0]} Toggle buttons...`);
    console.log('----------------------------------------------\n');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_credit_system_check_toggle, ElementsName.CreditsLabelTexts[0], 'on');
    console.log('----------------------------------------------');
    console.log(`Verifying and Select ${ElementsName.CreditsLabelTexts[1]} Dropdowns...`);
    console.log('----------------------------------------------\n');
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spaces_Booking_Cost_Dropdown, '1 credit (recommended)', ElementsName.CreditsLabelTexts[1]);
    console.log('----------------------------------------------');
    console.log(`Verifying and Select ${ElementsName.CreditsLabelTexts[2]} Days`);
    console.log('----------------------------------------------\n');
    await this.uncheckOnlyGivenOrCurrentDay();
    await this.selectOnlyGivenOrCurrentDay();
    await this.checkAllDays();

    console.log('----------------------------------------------');
    console.log(`Verifying slider ${ElementsName.CreditsLabelTexts[3]} `);
    console.log('----------------------------------------------\n');

    await this.page.on('console', msg => {
      if (msg.type() === 'log') {
        console.log(`[Browser Console]: ${msg.text()}`);
      }
    });
    await this.dragSliderHandleByPercentage('#slider-range-for-next-day', 1, 90);

    const style = await this.page.locator('#slider-range-for-next-day .ui-slider-handle').nth(1).getAttribute('style');
    console.log('👉 After drag, handle style is:', style);

    console.log('----------------------------------------------');
    console.log(`Verifying slider ${ElementsName.CreditsLabelTexts[4]} `);
    console.log('----------------------------------------------\n');

    await this.page.on('console', msg => {
      if (msg.type() === 'log') {
        console.log(`[Browser Console]: ${msg.text()}`);
      }
    });
    // Adjust the slider to 10% as per the requirement + right and - left handle)
    await this.dragSliderHandleByPercentage('#slider-range', 0, 10);
    await this.dragSliderHandleByPercentage('#slider-range', 1, 15);
    await this.page.waitForTimeout(2000);

    console.log('----------------------------------------------');
    console.log(`Verifying ${ElementsName.CreditsLabelTexts[5]} Toggle buttons...`);
    console.log('----------------------------------------------\n');

    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_CreditRefundDuringCurrentRefill_toggle, ElementsName.CreditsLabelTexts[5], 'on');



  }

  async verifyingCreditsLabels() {
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Spaces_Spot_Credit_Labels, ElementsName.CreditsLabelTexts, ElementsName.Zone_Maps.CreditsLabelsText)
  }
  async CreditsSpotHoverText() {
    await this.reusablePageClass.validateMultipleHoverPopupsWithExpectedText(this.locatorsPage.admin_Spaces_Spot_Credit_hover_texts, ElementsName.CreditsHoverTexts, ElementsName.Zone_Maps.CreditsLabelsText)
  }



  /**
    * Selects only the specified day checkbox (like 'Monday'), or current day if not provided.
    * Logs each action clearly to the console.
    */
  async selectOnlyGivenOrCurrentDay(selectedDay?: string): Promise<void> {
    const dayMap: Record<number, { title: string; inputId: string }> = {
      0: { title: 'Sunday', inputId: 'cb7' },
      1: { title: 'Monday', inputId: 'cb1' },
      2: { title: 'Tuesday', inputId: 'cb2' },
      3: { title: 'Wednesday', inputId: 'cb3' },
      4: { title: 'Thursday', inputId: 'cb4' },
      5: { title: 'Friday', inputId: 'cb5' },
      6: { title: 'Saturday', inputId: 'cb6' },
    };

    // Use provided day or default to current weekday
    const targetDayTitle = selectedDay ?? dayMap[new Date().getDay()].title;

    console.log(`\n🧠 Target day to select: "${targetDayTitle}"`);
    console.log('🔄 Toggling checkboxes...\n');

    for (const { title, inputId } of Object.values(dayMap)) {
      const checkbox = this.page.locator(`input#${inputId}`);
      const label = this.page.locator(`label[title="${title}"]`);
      const isChecked = await checkbox.isChecked();

      if (title === targetDayTitle && !isChecked) {
        await label.click();
        console.log(`✅ Checked: ${title}`);
      } else if (title !== targetDayTitle && isChecked) {
        await label.click();
        console.log(`🚫 Unchecked: ${title}`);
      } else {
        console.log(`⏭️ No change needed: ${title} (${isChecked ? 'already checked' : 'already unchecked'})`);
      }
    }
    await this.page.waitForTimeout(2000);
    console.log(`\n🎯 Final result: Only "${targetDayTitle}" is selected.\n`);
  }

  /**
   * Unchecks only the given day (like 'Monday'), or current day if not provided.
   * All other checkboxes remain as-is.
   */
  async uncheckOnlyGivenOrCurrentDay(selectedDay?: string): Promise<void> {
    const dayMap: Record<number, { title: string; inputId: string }> = {
      0: { title: 'Sunday', inputId: 'cb7' },
      1: { title: 'Monday', inputId: 'cb1' },
      2: { title: 'Tuesday', inputId: 'cb2' },
      3: { title: 'Wednesday', inputId: 'cb3' },
      4: { title: 'Thursday', inputId: 'cb4' },
      5: { title: 'Friday', inputId: 'cb5' },
      6: { title: 'Saturday', inputId: 'cb6' },
    };

    // Use provided day or default to current weekday
    const targetDayTitle = selectedDay ?? dayMap[new Date().getDay()].title;

    console.log(`\n🧠 Target day to uncheck: "${targetDayTitle}"`);
    console.log('🔄 Checking checkbox states...\n');

    for (const { title, inputId } of Object.values(dayMap)) {
      if (title !== targetDayTitle) continue;

      const checkbox = this.page.locator(`input#${inputId}`);
      const label = this.page.locator(`label[title="${title}"]`);
      const isChecked = await checkbox.isChecked();

      if (isChecked) {
        await label.click();
        console.log(`🚫 Unchecked: ${title}`);
      } else {
        console.log(`⏭️ Already unchecked: ${title}`);
      }

      break; // No need to loop further
    }
    await this.page.waitForTimeout(2000);
    console.log(`\n🎯 Final result: "${targetDayTitle}" is now unchecked.\n`);
  }

  /**
   * Checks all days (Sunday to Saturday) if not already checked.
   */
  async checkAllDays(): Promise<void> {
    const dayMap: Record<number, { title: string; inputId: string }> = {
      0: { title: 'Sunday', inputId: 'cb7' },
      1: { title: 'Monday', inputId: 'cb1' },
      2: { title: 'Tuesday', inputId: 'cb2' },
      3: { title: 'Wednesday', inputId: 'cb3' },
      4: { title: 'Thursday', inputId: 'cb4' },
      5: { title: 'Friday', inputId: 'cb5' },
      6: { title: 'Saturday', inputId: 'cb6' },
    };

    console.log(`\n🚀 Checking all day checkboxes...`);

    for (const { title, inputId } of Object.values(dayMap)) {
      const checkbox = this.page.locator(`input#${inputId}`);
      const label = this.page.locator(`label[title="${title}"]`);
      const isChecked = await checkbox.isChecked();

      if (!isChecked) {
        await label.click();
        console.log(`✅ Checked: ${title}`);
      } else {
        console.log(`⏭️ Already checked: ${title}`);
      }
    }

    console.log(`\n🎉 All days are now checked.\n`);
  }

  async selectCheckinOptionIfNotSelectedOnlyOne(zoneName?: string): Promise<void> {
    const nameToUse = zoneName ?? 'Wi-Fi';

    const allCheckedCheckboxes = this.page.locator(
      `//li[contains(@class, 'active')]//input[@type="checkbox"]`
    );
    const targetCheckbox = this.page.locator(
      `//label[contains(normalize-space(), "${nameToUse}")]//input[@type="checkbox"]`
    );
    const targetLabelActive = this.page.locator(
      `//li[contains(@class, 'active')]//label[contains(normalize-space(), "${nameToUse}")]`
    );

    // Open dropdown
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Space_zone_Checkin_tab_checkin_Tab_dropdown_Button
    );
    await this.page.waitForTimeout(1000);

    // Wait for target checkbox
    await targetCheckbox.waitFor({ state: 'attached', timeout: 5000 });

    // --- Step 1: Snapshot all checked checkboxes before unchecking ---
    const checkedElements = await allCheckedCheckboxes.elementHandles();
    // --- Step 1: Keep unchecking until only target remains ---
    while (true) {
      const checkedElements = await allCheckedCheckboxes.elementHandles();

      // Find any checkbox that's not our target
      const nonTarget = await Promise.all(
        checkedElements.map(async handle => {
          const labelText = await handle.evaluate(
            el => (el instanceof Element ? el.closest('label')?.innerText.trim() : '') || ''
          );
          return labelText.includes(nameToUse) ? null : { handle, labelText };
        })
      );

      const toUnselect = nonTarget.find(x => x !== null);

      // If no other checked boxes left → exit loop
      if (!toUnselect) break;

      console.log(`Unselecting: ${toUnselect.labelText}`);
      await toUnselect.handle.evaluate((el: HTMLInputElement) => el.click());
      await this.page.waitForTimeout(3000); // let DOM update before next check
    }


    // --- Step 2: Ensure target is selected ---
    const isActive = await targetLabelActive.isVisible();
    if (!isActive) {
      console.log(`"${nameToUse}" is NOT selected. Selecting now...`);
      await targetCheckbox.check();
      await this.page.waitForTimeout(300);
    } else {
      console.log(`"${nameToUse}" is already selected.`);
    }

    // --- Step 3: Submit ---
    // await this.webElementActionClass.Click(
    //   this.locatorsPage.admin_Space_zone_Checkin_tab_checkin_Tab_Submit_Button
    // );

    await this.page.waitForTimeout(3000);
    await this.page.keyboard.press('Escape');
  }


  async ZoneCheckinTabsElements() {
    console.log('Verifying Zone Checkin Tabs Elements...');
    console.log('----------------------------------------------');

    console.log('----------------------------------------------');
    console.log(`Verifying ${ElementsName.CheckinLabelTexts[6]} Toggle buttons...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_hourly_hourlyCheckInReminder_toggle, `${ElementsName.CheckinLabelTexts[6]} ${ElementsName.ReminderColumnHeaderLabel[0]}`, 'on');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_daily_dailyCheckInReminder_toggle, `${ElementsName.CheckinLabelTexts[6]} ${ElementsName.ReminderColumnHeaderLabel[1]}`, 'on');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_scheduledCheckInReminder_toggle, `${ElementsName.CheckinLabelTexts[6]} ${ElementsName.ReminderColumnHeaderLabel[2]}`, 'on');


    console.log('----------------------------------------------');
    console.log(`Verifying and Select ${ElementsName.CheckinLabelTexts[7]} Dropdown and Elements...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spaces_hourlyCheckInReminderTime_Dropdown, 'On start time', `${ElementsName.CheckinLabelTexts[7]} ${ElementsName.ReminderColumnHeaderLabel[0]}`);
    console.log('Set All Day Reminder time :11:30 ');
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Spaces_dailyCheckInReminderTimeText_input, '11:30');
    console.log('Set All Day Reminder time :12:30 ');
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Spaces_scheduledCheckInReminderTimeText_input, '12:30');
    console.log('Completed Zone Checkin Tabs Elements validation.\n');

    console.log('----------------------------------------------');
    console.log(`Verifying ${ElementsName.CheckinLabelTexts[8]} Toggle buttons...`);
    console.log('----------------------------------------------');
    //await this.page.waitForTimeout(3000);
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_hourlyAutoRelease_toggle, `${ElementsName.CheckinLabelTexts[8]} ${ElementsName.ReminderColumnHeaderLabel[0]}`, 'on');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_dailyAutoReleaser_toggle, `${ElementsName.CheckinLabelTexts[8]} ${ElementsName.ReminderColumnHeaderLabel[1]}`, 'on');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spaces_scheduledAutoRelease_toggle, `${ElementsName.CheckinLabelTexts[8]} ${ElementsName.ReminderColumnHeaderLabel[2]}`, 'on');

    console.log('----------------------------------------------');
    console.log(`Verifying and Select ${ElementsName.CheckinLabelTexts[9]} Dropdowns...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spaces_hourlyAutoReleaseAfter_Dropdown, '1 hour after start time', `${ElementsName.CheckinLabelTexts[9]} ${ElementsName.ReminderColumnHeaderLabel[0]}`);
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spaces_daily_dailyCheckInReminder_Dropdown, '1 hour after start time', `${ElementsName.CheckinLabelTexts[9]} ${ElementsName.ReminderColumnHeaderLabel[1]}`);
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spaces_scheduledCheckInReminder_Dropdown, '1 hour after start time', `${ElementsName.CheckinLabelTexts[9]} ${ElementsName.ReminderColumnHeaderLabel[2]}`);

    await this.page.waitForTimeout(1000);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Update_button, ElementsName.Zone_Maps.Update_Btn)
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Cancel_button, ElementsName.Zone_Maps.Cancel_Btn)
    console.log('Completed Zone Checkin Tabs Elements validation.\n');
  }


  async verifyingCheckinLabels() {
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Spaces_Spot_checkin_Labels, ElementsName.CheckinLabelTexts, ElementsName.Zone_Maps.CheckingLabelsText)
  }
  async CheckinSpotHoverText() {
    await this.reusablePageClass.validateMultipleHoverPopupsWithExpectedText(this.locatorsPage.admin_Spaces_Spot_checkin_hover_texts, ElementsName.CheckinHoverTexts, ElementsName.Zone_Maps.CheckingLabelsText)
  }
  async verifyingCheckinColumnHeaders() {
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Spaces_Spot_Checkin_Column_Header, ElementsName.ReminderColumnHeaderLabel, ElementsName.Zone_Maps.CheckingLabelsText)
  }



  async ZoneAdvancedSettingsTabsElements() {
    console.log('----------------------------------------------');
    console.log(`Verifying ${ElementsName.AdvancedSettingsLabelTexts[0]} Toggle buttons...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Space_zone_Advanced_Settings_AllowLiftRestriction_toggle, ElementsName.AdvancedSettingsLabelTexts[0], 'on');

    console.log('----------------------------------------------');
    console.log(`Verifying ${ElementsName.AdvancedSettingsLabelTexts[1]} Toggle buttons...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Space_zone_Advanced_Settings_Swipecardaccess_toggle, ElementsName.AdvancedSettingsLabelTexts[1], 'off');

    console.log('----------------------------------------------');
    console.log(`Verifying ${ElementsName.AdvancedSettingsLabelTexts[2]} Toggle buttons...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Space_zone_Advanced_Settings_new_bookable_day_respects_office_closures_toggle, ElementsName.AdvancedSettingsLabelTexts[2], 'on');

    console.log('----------------------------------------------');
    console.log(`Verifying and Select ${ElementsName.AdvancedSettingsLabelTexts[3]} Dropdown and Elements...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Space_zone_Advanced_Settings_FlgInstanceRelease_Dropdown, 'After 1 hour', ElementsName.CheckinLabelTexts[7]);

    console.log('----------------------------------------------');
    console.log(`Verifying and Select ${ElementsName.AdvancedSettingsLabelTexts[5]}  Toggle buttons...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Space_zone_Advanced_Settings_minimum_advance_reservation_check_toggle, ElementsName.AdvancedSettingsLabelTexts[5], 'on');

    console.log('----------------------------------------------');
    console.log(`Verifying and Select ${ElementsName.AdvancedSettingsLabelTexts[4]} Dropdown and Elements...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Space_zone_Advanced_Settings_NoBookingsBefore_Dropdown, '1 day before', ElementsName.AdvancedSettingsLabelTexts[4]);

    console.log('Set Allow next-day bookings until time :11:30 ');
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Space_zone_Advanced_Settings_randomBookTime_input, '11:30');

    console.log('----------------------------------------------');
    console.log(`Verifying and Select ${ElementsName.AdvancedSettingsLabelTexts[6]} Dropdown and Elements...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Space_zone_Advanced_Settings_randomBookTimeType_Dropdown, 'Random time every day', ElementsName.AdvancedSettingsLabelTexts[6]);

    console.log('----------------------------------------------');
    console.log(`Verifying ${ElementsName.AdvancedSettingsLabelTexts[8]} Toggle buttons...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Space_zone_Advanced_Settings_daily_booking_limit_check_toggle, ElementsName.AdvancedSettingsLabelTexts[7], 'on');

    console.log(`Set ${ElementsName.AdvancedSettingsLabelTexts[8]} : 1 `);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Space_zone_Advanced_Settings_DailyBookingLimit_input, '1');

    console.log('----------------------------------------------');
    console.log(`Verifying ${ElementsName.AdvancedSettingsLabelTexts[9]} Toggle buttons...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Space_zone_Advanced_Settings_SocialDistancing_toggle, ElementsName.AdvancedSettingsLabelTexts[8], 'on');

    await this.page.waitForTimeout(1000);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Update_button, ElementsName.Zone_Maps.Update_Btn)
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Cancel_button, ElementsName.Zone_Maps.Cancel_Btn)
    console.log('Completed Zone Advanced Settings Tabs Elements validation.\n');
  }

  async verifyingAdvancedSettingsLabels() {
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Space_zone_Advanced_Settings_tab_label, ElementsName.AdvancedSettingsLabelTexts, ElementsName.Zone_Maps.AdvancedSettingsLabel)
  }

  async verifyingPrivacyLabels() {
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Space_zone_Privacy_tab_label, ElementsName.PrivacyLabelTexts, ElementsName.Zone_Maps.PrivacyLabel)
  }

  async PrivacySpotHoverText() {
    await this.reusablePageClass.validateMultipleHoverPopupsWithExpectedText(this.locatorsPage.admin_Space_zone_Privacy_tab_label_Hover, ElementsName.PrivacyLabelHoverTexts, ElementsName.Zone_Maps.PrivacyLabel)
  }

  async ZonePrivacyTabsElements() {
    console.log('----------------------------------------------');
    console.log(`Verifying ${ElementsName.PrivacyLabelTexts[0]} Elements...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Space_zone_Privacy_tab_BookingsViewableByStaff_Dropdown, 'Yes, first name initial plus last name', ElementsName.PrivacyLabelTexts[0]);
    console.log('----------------------------------------------');
    console.log(`Verifying ${ElementsName.PrivacyLabelTexts[1]} Toggle buttons...`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Space_zone_Privacy_tab_AccessToSearchAllZones_toggle, ElementsName.PrivacyLabelTexts[1], 'on');

    await this.page.waitForTimeout(1000);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Update_button, ElementsName.Zone_Maps.Update_Btn)
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spaces_Zone_Cancel_button, ElementsName.Zone_Maps.Cancel_Btn)
    console.log('Completed Zone Privacy Tabs Elements validation.\n');
  }

  async verifySpacesSubMenuNavigation() {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Main_Menu_Spaces);
    console.log("Verifying Spaces Sub Menus Navigations...");
    console.log("\n");
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Zones_and_Maps, ElementsName.Admin_Navigation_Menu.Zones_and_maps_menu);
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Parking_Spaces, ElementsName.Admin_Navigation_Menu.Parking_spaces_menu);
  }


  async parkingSpacesElements(parkingzone: string) {

    console.log(`Verifying and Selecting Parking Zone Elements...: ${parkingzone}\n`);
    console.log('----------------------------------------------');
    console.log(`Selecting Parking Zone From Dropdown: ${parkingzone}`);
    console.log('----------------------------------------------');
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Parking_Spaces_zone_id_Dropdown, parkingzone);
    await this.page.waitForTimeout(2000);
    console.log('Completed Parking Zone Elements validation.\n');

  }
  async verifyingparkingSpacesLabels() {
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Parking_Spaces_Header_text, ElementsName.ParkingSpaceLabelTexts, "Parking Space Table Headers")
  }

  async AddparkingSpot(parkingzone: string) {
    console.log('Adding Parking Spot...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Parking_Spaces_Add_Parking_Space_Button);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Parking_Spaces_Add_Parking_Space_Popup, ElementsName.Space_Popup_Expected.Creating_a_new_parking_space)
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Parking_Spaces_Add_Parking_Space_Popup2, ElementsName.Space_Popup_Expected.Complete_the_fields)
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Parking_Spaces_Add_Parking_Space_Popup3, ElementsName.Space_Popup_Expected.If_using_a_map)
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Parking_Spaces_Add_Parking_Space_popup_label, ElementsName.ParkingSpaceInputLabelTexts, ElementsName.Space_Popup_Expected.Creating_a_new_parking_space)
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Parking_Spaces_car_park_id_Dropdown, parkingzone);
    this.randomSpotName = await this.reusablePageClass.generateRandomNumberSpot();
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Parking_Spaces_parking_number_input, this.randomSpotName);
    console.log("Clicked on Spaces Side Menu bar sub Add Parking spaces Button");

    // Open Vehicle Size dropdown
    console.log("Opening 'Vehicle Size' dropdown...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Add_spot_Vehicle_size_dropdown);

    // Check 'Select All' if not already checked for Vehicle Size
    if (!(await this.locatorsPage.selectAllCheckbox_Vehicle_size.isChecked())) {
      console.log("'Select All' for Vehicle Size is currently unchecked. Checking now...");
      await this.locatorsPage.selectAllCheckbox_Vehicle_size.check();
    } else {
      console.log("✔ 'Select All' for Vehicle Size is already checked. Skipping...");
    }

    // Open Fuel Types dropdown
    console.log("Opening 'Fuel Types' dropdown...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Add_spot_Fuel_types_dropdown);

    // Check 'Select All' if not already checked for Fuel Types
    if (!(await this.locatorsPage.selectAllCheckbox_Fuel_types.isChecked())) {
      console.log("'Select All' for Fuel Types is currently unchecked. Checking now...");
      await this.locatorsPage.selectAllCheckbox_Fuel_types.check();
    } else {
      console.log("'Select All' for Fuel Types is already checked. Skipping...");
    }

    // Small wait to allow UI update
    console.log("Waiting 1 second for UI update...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Sub_Add_Parking_spaces_Complete_Btn);
    //await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
    console.log(`Spot added successfully`);
    await this.page.waitForTimeout(2000);
    console.log("Vehicle Size and Fuel Types selection process completed!");
    await this.locatorsPage.admin_Parking_Spaces_name_filter_input.waitFor({ state: "visible", timeout: 15000 });
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Parking_Spaces_name_filter_input, this.randomSpotName);
    await this.page.waitForTimeout(3000);
    await this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first.waitFor({ state: "visible", timeout: 15000 });
    await this.page.waitForTimeout(5000);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first, this.randomSpotName, "Created Parking Spot Name");
  }

  async EditParkingSpot(restuser: string) {
    console.log("\n=== 🛠 Starting Edit Parking Spot Flow ===\n");

    console.log("\nClicking on the first created parking spot...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first);

    console.log("\nWaiting for sidebar to be visible...");
    await this.page.waitForTimeout(1000);
    console.log("✅ Sidebar opened successfully\n");

    console.log("\nFetching space number from sidebar...");
    const parkingSpaceOnSidebar = await this.locatorsPage.admin_Spot_SideBar_Space_number_input_value_2.getAttribute('value');
    console.log(`ℹ️ Space Number displayed: '${parkingSpaceOnSidebar}'\n`);

    console.log("\nVerifying Space Number label & value...");
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Spot_SideBar_Space_number_label,
      ElementsName.EditSpotLabeles[0],
      ElementsName.EditSpotLabeles[0]
    );
    expect(parkingSpaceOnSidebar?.trim()).toBe(this.randomSpotName?.trim());
    console.log("✅ Space Number verification passed\n");

    console.log("\nVerifying Space Size label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Space_size_label, ElementsName.EditSpotLabeles[1], ElementsName.EditSpotLabeles[1]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Space_size_hover, ElementsName.EditSpotHoverTexts[1], ElementsName.EditSpotLabeles[1]);
    console.log("✅ Space Size verified\n");

    console.log("\nSelecting all Vehicle Sizes if not selected...");
    await this.reusablePageClass.selectAllIfNotSelected(this.locatorsPage.admin_Spot_SideBar_Select_All_button, this.locatorsPage.admin_Spot_SideBar_Select_All_checkbox);
    console.log("✅ Vehicle Sizes selection check completed\n");

    console.log("\nVerifying Fuel Types label & hover...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Fuel_types_label, ElementsName.EditSpotLabeles[2], ElementsName.EditSpotLabeles[2]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Fuel_types_hover, ElementsName.EditSpotHoverTexts[2], ElementsName.EditSpotLabeles[2]);
    console.log("✅ Fuel Types verified\n");

    console.log("\nSelecting all Fuel Types if not selected...");
    await this.reusablePageClass.selectAllIfNotSelected(this.locatorsPage.admin_Spot_SideBar_Fuel_Types_Select_All_button, this.locatorsPage.admin_Spot_SideBar_Fuel_Types_Select_All_checkbox);
    console.log("✅ Fuel Types selection check completed\n");

    console.log("\nVerifying Accessibility label & hover...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Accessibility_label, ElementsName.EditSpotLabeles[3], ElementsName.EditSpotLabeles[3]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Accessibility_hover, ElementsName.EditSpotHoverTexts[3], ElementsName.EditSpotLabeles[3]);
    console.log("✅ Accessibility verified\n");

    console.log("\nVerifying Vehicle Sharing label & hover...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Vehicle_sharing_label, ElementsName.EditSpotLabeles[4], ElementsName.EditSpotLabeles[4]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Vehicle_sharing_hover, ElementsName.EditSpotHoverTexts[4], ElementsName.EditSpotLabeles[4]);
    console.log("✅ Vehicle Sharing verified\n");

    console.log("\nVerifying Ranking Value label & hover...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Ranking_value_label, ElementsName.EditSpotLabeles[5], ElementsName.EditSpotLabeles[5]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Ranking_value_hover, ElementsName.EditSpotHoverTexts[5], ElementsName.EditSpotLabeles[5]);
    console.log("✅ Ranking Value verified\n");

    console.log("\nVerifying Available Days label & hover...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Available_days_label, ElementsName.EditSpotLabeles[6], ElementsName.EditSpotLabeles[6]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Available_days_hover, ElementsName.EditSpotHoverTexts[6], ElementsName.EditSpotLabeles[6]);
    console.log("✅ Available Days verified\n");

    console.log("\nVerifying Available From label & hover...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Available_from_label, ElementsName.EditSpotLabeles[7], ElementsName.EditSpotLabeles[7]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Available_from_hover, ElementsName.EditSpotHoverTexts[7], ElementsName.EditSpotLabeles[7]);
    console.log("✅ Available From verified\n");

    console.log("\nVerifying Booking Period label & hover...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Booking_period_label, ElementsName.EditSpotLabeles[8], ElementsName.EditSpotLabeles[8]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Booking_period_hover, ElementsName.EditSpotHoverTexts[8], ElementsName.EditSpotLabeles[8]);
    console.log("✅ Booking Period verified\n");

    console.log("\nChecking default Booking Period radio selection...");
    await this.page.mouse.move(500, 300);
    await this.verifyBookingPeriodDefaults(this.locatorsPage.admin_Spot_SideBar_All_day_radio, this.locatorsPage.admin_Spot_SideBar_Hourly_radio);
    console.log("✅ Booking Period default check completed\n");

    console.log("\nVerifying Status label & hover...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Status_label, ElementsName.EditSpotLabeles[9], ElementsName.EditSpotLabeles[9]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Status_hover, ElementsName.EditSpotHoverTexts[9], ElementsName.EditSpotLabeles[9]);
    console.log("✅ Status verified\n");

    console.log("\nSetting Status dropdown to 'Active'...");
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spot_SideBar_Status_dropdown, 'Inactive (permanent)', ElementsName.EditSpotLabeles[10]);
    console.log("✅ Status set to Active\n");

    await this.sideBarConfigureButton();
    await this.selectNextDayDatePicker();

    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Cancel_button);
    console.log("\nVerifying Restrict Bookings By Users label & hover...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Restrict_bookings_by_users_label, ElementsName.EditSpotLabeles[10], ElementsName.EditSpotLabeles[10]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Restrict_bookings_by_users_hover, ElementsName.EditSpotHoverTexts[10], ElementsName.EditSpotLabeles[10]);
    console.log("✅ Restrict Bookings By Users verified\n");

    console.log("\nToggling Restrict Bookings By Users ON...");
    await this.page.mouse.move(500, 300);
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spot_SideBar_Restrict_bookings_by_users_toggle, ElementsName.EditSpotHoverTexts[10], 'on');
    await this.page.waitForTimeout(1000);

    console.log("✅ Restrict Bookings By Users toggled ON\n");


    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Restrict_bookings_by_users_button);

    await this.setCheckboxState(this.locatorsPage.admin_Spot_SideBar_Enable_Day_Restrictions_Checkbox, true);
    await this.selectEmployeeForToday(restuser);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Restriction_Cancel_Button);

    console.log("\nChecking Submit & Close button visibility...");
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spot_SideBar_Submit_button, ElementsName.Zone_Maps.Update_Btn);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spot_SideBar_Close_button, ElementsName.Zone_Maps.Cancel_Btn);
    console.log("✅ Submit & Close buttons are visible\n");

    console.log("\nClosing sidebar...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Close_button);
    console.log("✅ Sidebar closed\n");

    console.log("\n=== ✅ Edit Parking Spot Flow Completed Successfully ===\n");
  }

  async sideBarConfigureButton() {
    console.log("✅ Sidebar Configure button clicked\n");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Configure_button);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Status_modal, ElementsName.Space_Popup_Expected.Permanent_inactivity_dates, ElementsName.Space_Popup_Expected.Permanent_inactivity_dates);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Status_modal_text, ElementsName.Status_text[0], ElementsName.Status_text[0]);

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

  async verifyBookingPeriodDefaults(allDayRadio: Locator, hourlyRadio: Locator) {
    console.log("Verifying Booking Period default selections...");



    // Wait until visible
    //await this.locatorsPage.admin_Spot_SideBar_All_day_radio.waitFor({ state: "visible", timeout: 5000 });
    //await this.locatorsPage.admin_Spot_SideBar_Hourly_radio.waitFor({ state: "visible", timeout: 5000 });

    // Verify "All day" is selected
    const isAllDayChecked = await this.locatorsPage.admin_Spot_SideBar_All_day_radio.isChecked();
    if (!isAllDayChecked) {
      throw new Error("❌ 'All day' radio button is NOT selected by default.");
    }
    console.log("✅ 'All day' radio button is selected by default.");

    // Verify "Hourly" is disabled
    const isHourlyDisabled = await hourlyRadio.isDisabled();
    if (!isHourlyDisabled) {
      throw new Error("❌ 'Hourly' radio button is NOT disabled.");
    }
    console.log("✅ 'Hourly' radio button is disabled as expected.");
  }


  async deleteParkingSpot() {
    console.log('🗑️ Starting Delete Parking Spot process...');

    console.log("🔍 Waiting for 'Name Filter' input to be visible...");
    await this.locatorsPage.admin_Parking_Spaces_name_filter_input.waitFor({ state: "visible", timeout: 15000 });

    console.log(`⌨️ Entering parking spot name in filter: "${this.randomSpotName || ''}"`);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Parking_Spaces_name_filter_input, this.randomSpotName || '');
    await this.page.waitForTimeout(3000);

    console.log('📄 Waiting for created parking spot to appear in the list...');
    await this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first.waitFor({ state: "visible", timeout: 15000 });
    await this.page.waitForTimeout(2000);

    console.log('✅ Verifying that the correct parking spot name is displayed...');
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first,
      this.randomSpotName || '',
      "Created Parking Spot Name"
    );

    console.log('🖱️ Clicking on Delete Parking Spot button...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Parking_Spaces_Delete_Parking_Space_Button_first);
    await this.page.waitForTimeout(2000);

    console.log('💬 Waiting for delete confirmation dialog...');
    await this.locatorsPage.admin_Parking_Spaces_Cancel_input_text_button.waitFor({ state: "visible", timeout: 15000 });
    await this.page.waitForTimeout(2000);

    console.log('📌 Clicking on Cancel input text box to activate it...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Parking_Spaces_Cancel_input_text_button);

    console.log('⌨️ Typing confirmation text: "DELETE ALL BOOKINGS"');
    await this.reusablePageClass.typeString("DELETE ALL BOOKINGS");
    await this.page.waitForTimeout(1000);

    console.log('✅ Clicking Confirm Delete button...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Confirm_deleted_button);
    console.log('⏳ Waiting for deletion to complete...');
    await this.page.waitForTimeout(500);
    await this.locatorsPage.succsessMessageAdmin.first().waitFor({ state: "visible", timeout: 20000 });
    await this.page.waitForTimeout(5000);

    console.log('🎯 Parking Spot deletion process completed successfully.');
  }


  async deskSpacesElements(deskzone: string) {

    console.log(`Verifying and Selecting Desk Zone Elements...: ${deskzone}\n`);
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Desks, ElementsName.Admin_Navigation_Menu.Desks_menu);
    console.log('----------------------------------------------');
    console.log(`Selecting Desk Zone From Dropdown: ${deskzone}`);
    console.log('----------------------------------------------');
    //await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Desk_Spaces_zone_id_Dropdown, deskzone);
    await this.page.waitForTimeout(2000);
    console.log('Completed Parking Zone Elements validation.\n');

  }
  async verifyingdeskSpacesLabels() {
    //await this.page.waitForTimeout(3000);
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Parking_Spaces_Header_text, ElementsName.DeskTitleTexts, "Desk Space Table Headers")
  }


  async AdddeskSpot(parkingzone: string) {
    console.log('Adding Desk Spot...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_Desk_Add_desk_button);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spot_Desk_Add_desk_Popup_header_text, ElementsName.Space_Popup_Expected.Creating_a_new_desk_space)
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Parking_Spaces_Add_Parking_Space_Popup2, ElementsName.Space_Popup_Expected.Complete_the_fields_Desk)
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Parking_Spaces_Add_Parking_Space_Popup3, ElementsName.Space_Popup_Expected.If_using_a_map)
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Parking_Spaces_Add_Parking_Space_popup_label, ElementsName.ParkingSpaceInputLabelTexts, ElementsName.Space_Popup_Expected.Creating_a_new_desk_space)
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Parking_Spaces_car_park_id_Dropdown, parkingzone);
    this.randomSpotName = await this.reusablePageClass.generateRandomNumberSpot();
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Parking_Spaces_parking_number_input, this.randomSpotName);
    console.log("Clicked on Spaces Side Menu bar sub Add Desk spaces Button");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Sub_Add_Parking_spaces_Complete_Btn);
    //await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
    console.log(`Spot added successfully`);
    await this.page.waitForTimeout(2000);
    await this.locatorsPage.admin_Parking_Spaces_name_filter_input.waitFor({ state: "visible", timeout: 15000 });
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Parking_Spaces_name_filter_input, this.randomSpotName);
    await this.page.waitForTimeout(3000);
    await this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first.waitFor({ state: "visible", timeout: 15000 });
    await this.page.waitForTimeout(5000);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first, this.randomSpotName, "Created Desk Spot Name");

  }

  async EditDeskSpot(restuser: string) {
    console.log("\n=== 🛠 Starting Edit Desk Spot Flow ===\n");

    console.log("\nClicking on the first created Desk spot...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first);

    console.log("\nWaiting for sidebar to be visible...");
    await this.page.waitForTimeout(2000);
    console.log("✅ Sidebar opened successfully\n");

    console.log("\nFetching space number from sidebar...");
    const parkingSpaceOnSidebar = await this.locatorsPage.admin_Spot_SideBar_Space_number_input_value_2.getAttribute('value');
    console.log(`ℹ️ Space Number displayed: '${parkingSpaceOnSidebar}'\n`);

    console.log("\nVerifying Space Number label & value...");
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Spot_SideBar_Space_number_label,
      ElementsName.EditSpotLabeles[0],
      ElementsName.EditSpotLabeles[0]
    );
    expect(parkingSpaceOnSidebar?.trim()).toBe(this.randomSpotName?.trim());
    console.log("✅ Space Number verification passed\n");

    console.log("\nVerifying Space Size label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Space_number_label, ElementsName.EditSpotLabeles[0], ElementsName.EditSpotLabeles[0]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Space_number_hover, ElementsName.EditDeskSpotHoverTexts1[0], ElementsName.EditDeskSpotHoverTexts1[0]);
    console.log("✅ Space Size verified\n");


    console.log("\nVerifying Ranking Value label & hover...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Ranking_value_label, ElementsName.EditSpotLabeles[5], ElementsName.EditSpotLabeles[5]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Ranking_value_hover, ElementsName.EditDeskSpotHoverTexts1[1], ElementsName.EditDeskSpotHoverTexts1[1]);
    console.log("✅ Ranking Value verified\n");

    console.log("\nVerifying Available Days label & hover...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Available_days_label, ElementsName.EditSpotLabeles[6], ElementsName.EditSpotLabeles[6]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Available_days_hover, ElementsName.EditDeskSpotHoverTexts1[2], ElementsName.EditDeskSpotHoverTexts1[2]);
    console.log("✅ Available Days verified\n");

    console.log("\nVerifying Available From label & hover...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Available_from_label, ElementsName.EditSpotLabeles[7], ElementsName.EditSpotLabeles[7]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Available_from_hover, ElementsName.EditDeskSpotHoverTexts1[3], ElementsName.EditDeskSpotHoverTexts1[3]);
    console.log("✅ Available From verified\n");

    console.log("\nVerifying Booking Period label & hover...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Booking_period_label, ElementsName.EditSpotLabeles[8], ElementsName.EditSpotLabeles[8]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Booking_period_hover, ElementsName.EditDeskSpotHoverTexts1[4], ElementsName.EditDeskSpotHoverTexts1[4]);
    console.log("✅ Booking Period verified\n");

    console.log("\nChecking default Booking Period radio selection...");
    await this.page.mouse.move(500, 300);
    await this.verifyBookingPeriodDefaults(this.locatorsPage.admin_Spot_SideBar_All_day_radio, this.locatorsPage.admin_Spot_SideBar_Hourly_radio);
    console.log("✅ Booking Period default check completed\n");

    console.log("\nVerifying Status label & hover...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Status_label, ElementsName.EditSpotLabeles[9], ElementsName.EditSpotLabeles[9]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Status_hover, ElementsName.EditDeskSpotHoverTexts1[5], ElementsName.EditSpotLabeles[5]);
    console.log("✅ Status verified\n");

    console.log("\nSetting Status dropdown to 'Active'...");
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spot_SideBar_Status_dropdown, 'Inactive (permanent)', ElementsName.EditSpotLabeles[10]);
    console.log("✅ Status set to Active\n");
    await this.sideBarConfigureButton();
    await this.selectNextDayDatePicker();

    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Cancel_button);

    console.log("\nVerifying Restrict Bookings By Users label & hover...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Restrict_bookings_by_users_label, ElementsName.EditSpotLabeles[10], ElementsName.EditSpotLabeles[10]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Restrict_bookings_by_users_hover, ElementsName.EditDeskSpotHoverTexts1[6], ElementsName.EditDeskSpotHoverTexts1[6]);
    console.log("✅ Restrict Bookings By Users verified\n");

    console.log("\nToggling Restrict Bookings By Users ON...");
    await this.page.mouse.move(500, 300);
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spot_SideBar_Restrict_bookings_by_users_toggle, ElementsName.EditSpotHoverTexts[10], 'on');
    await this.page.waitForTimeout(1000);
    console.log("✅ Restrict Bookings By Users toggled ON\n");

    console.log("✅ Restrict Bookings By Users toggled ON\n");


    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Restrict_bookings_by_users_button);

    await this.setCheckboxState(this.locatorsPage.admin_Spot_SideBar_Enable_Day_Restrictions_Checkbox, true);
    await this.selectEmployeeForToday(restuser);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Restriction_Cancel_Button);



    console.log("\nChecking Submit & Close button visibility...");
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spot_SideBar_Submit_button, ElementsName.Zone_Maps.Update_Btn);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spot_SideBar_Close_button, ElementsName.Zone_Maps.Cancel_Btn);
    console.log("✅ Submit & Close buttons are visible\n");

    console.log("\nClosing sidebar...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Close_button);
    console.log("✅ Sidebar closed\n");

    console.log("\n=== ✅ Edit Parking Spot Flow Completed Successfully ===\n");
  }

  async deleteDeskSpot() {
    console.log('🗑️ Starting Delete Desk Spot process...');

    console.log("🔍 Waiting for 'Name Filter' input to be visible...");
    await this.locatorsPage.admin_Parking_Spaces_name_filter_input.waitFor({ state: "visible", timeout: 15000 });

    console.log(`⌨️ Entering Desk spot name in filter: "${this.randomSpotName || ''}"`);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Parking_Spaces_name_filter_input, this.randomSpotName || '');
    await this.page.waitForTimeout(3000);

    console.log('📄 Waiting for created Desk spot to appear in the list...');
    await this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first.waitFor({ state: "visible", timeout: 15000 });
    await this.page.waitForTimeout(2000);

    console.log('✅ Verifying that the correct Desk spot name is displayed...');
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first,
      this.randomSpotName || '',
      "Created Desk Spot Name"
    );

    console.log('🖱️ Clicking on Delete Desk Spot button...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Parking_Spaces_Delete_Parking_Space_Button_first);
    await this.page.waitForTimeout(2000);

    console.log('💬 Waiting for delete confirmation dialog...');
    await this.locatorsPage.admin_Parking_Spaces_Cancel_input_text_button.waitFor({ state: "visible", timeout: 15000 });
    await this.page.waitForTimeout(2000);

    console.log('📌 Clicking on Cancel input text box to activate it...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Parking_Spaces_Cancel_input_text_button);

    console.log('⌨️ Typing confirmation text: "DELETE ALL BOOKINGS"');
    await this.reusablePageClass.typeString("DELETE ALL BOOKINGS");
    await this.page.waitForTimeout(1000);

    console.log('✅ Clicking Confirm Delete button...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Confirm_deleted_button);
    console.log('⏳ Waiting for deletion to complete...');
    await this.page.waitForTimeout(500);
    await this.locatorsPage.succsessMessageAdmin.first().waitFor({ state: "visible", timeout: 20000 });
    await this.page.waitForTimeout(5000);

    console.log('🎯 Desk Spot deletion process completed successfully.');
  }

  async meetingSpacesElements(meetingRoomZone: string) {

    console.log(`Verifying and Selecting Meeting Room Elements...: ${meetingRoomZone}\n`);
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Meeting_Rooms, ElementsName.Admin_Navigation_Menu.Meeting_rooms_menu);
    console.log('----------------------------------------------');
    console.log(`Selecting Meeting Room Zone From Dropdown: ${meetingRoomZone}`);
    console.log('----------------------------------------------');
    //await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Desk_Spaces_zone_id_Dropdown, deskzone);
    await this.page.waitForTimeout(2000);
    console.log('Completed Meeting Room Zone Elements validation.\n');


  }
  async verifyingmeetingSpacesLabels() {
    //await this.page.waitForTimeout(3000);
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Parking_Spaces_Header_text, ElementsName.MeetingRoomTitleTexts, "Meeting Room Table Headers")
  }

  async AddMeetingSpot(parkingzone: string) {
    console.log('Adding Meeting Room Spot...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_Desk_Add_desk_Meeting_Room_button);
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Spot_Add_Meeting_Popup_header_text, ElementsName.Space_Popup_Expected.Creating_a_new_meeting_room)
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Parking_Spaces_Add_Parking_Space_Popup2, ElementsName.Space_Popup_Expected.Complete_the_fields_Desk)
    await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_Parking_Spaces_Add_Parking_Space_Popup3, ElementsName.Space_Popup_Expected.If_using_a_map)
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Spot_Add_Meeting_Popup_label, ElementsName.MeetingSpaceInputLabelTexts, ElementsName.Space_Popup_Expected.Creating_a_new_meeting_room)
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Parking_Spaces_car_park_id_Dropdown, parkingzone);
    this.randomSpotName = await this.reusablePageClass.generateRandomNumberSpot();
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Parking_Spaces_parking_number_input, this.randomSpotName);
    console.log("Clicked on Spaces Side Menu bar sub Add Meeting spaces Button");
    console.log("Entering Meeting Room Capacity : 10");
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Spot_Add_Meeting_Popup_capacity_input, '10');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Sub_Add_Parking_spaces_Complete_Btn);
    // //await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
    console.log(`Spot added successfully`);
    await this.page.waitForTimeout(2000);
    await this.locatorsPage.admin_Spot_Add_Meeting_Popup_room_name_input.waitFor({ state: "visible", timeout: 15000 });
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Spot_Add_Meeting_Popup_room_name_input, this.randomSpotName ?? '');
    await this.page.waitForTimeout(3000);
    await this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first.waitFor({ state: "visible", timeout: 15000 });
    await this.page.waitForTimeout(5000);
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first, this.randomSpotName, "Created Meeting Room Spot Name");

  }

  async EditMeetingSpot(restuser: string) {
    console.log("\n=== 🛠 Starting Edit Meeting Room Spot Flow ===\n");

    console.log("\nClicking on the first created Meeting Room spot...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first);

    console.log("\nWaiting for sidebar to be visible...");
    await this.page.waitForTimeout(1000);
    console.log("✅ Sidebar opened successfully\n");

    console.log("\nFetching space number from sidebar...");
    const parkingSpaceOnSidebar = await this.locatorsPage.admin_Spot_Add_Meeting_Popup_room_name_input_room_name.getAttribute('value');
    console.log(`ℹ️ Space Number displayed: '${parkingSpaceOnSidebar}'\n`);

    expect(parkingSpaceOnSidebar?.trim()).toBe(this.randomSpotName?.trim());
    console.log("✅ Room Name verification passed\n");

    console.log("\nVerifying Room Name label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Room_name_label, ElementsName.EditMeetingRoomLabels[0], ElementsName.EditMeetingRoomLabels[0]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Room_name_hover, ElementsName.EditMeetingRoomLabelsHover[0], ElementsName.EditMeetingRoomLabelsHover[0]);
    console.log("✅ Room Name verified\n");

    console.log("\nVerifying Room Capacity label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Room_capacity_label, ElementsName.EditMeetingRoomLabels[1], ElementsName.EditMeetingRoomLabels[1]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Room_capacity_hover, ElementsName.EditMeetingRoomLabelsHover[1], ElementsName.EditMeetingRoomLabelsHover[1]);
    console.log("✅ Room Capacity verified\n");

    console.log("\nVerifying Available Days label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Available_days_label, ElementsName.EditMeetingRoomLabels[2], ElementsName.EditMeetingRoomLabels[2]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Available_days_hover, ElementsName.EditMeetingRoomLabelsHover[2], ElementsName.EditMeetingRoomLabelsHover[2]);
    console.log("✅ Available Days verified\n");

    console.log("\nVerifying Room Available Time label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Room_available_time_label, ElementsName.EditMeetingRoomLabels[3], ElementsName.EditMeetingRoomLabels[3]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Room_available_time_hover, ElementsName.EditMeetingRoomLabelsHover[3], ElementsName.EditMeetingRoomLabelsHover[3]);
    console.log("✅ Room Available Time verified\n");

    console.log("\nVerifying Start Booking Time label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Start_booking_time_label, ElementsName.EditMeetingRoomLabels[4], ElementsName.EditMeetingRoomLabels[4]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Start_booking_time_hover, ElementsName.EditMeetingRoomLabelsHover[4], ElementsName.EditMeetingRoomLabelsHover[4]);
    console.log("✅ Start Booking Time verified\n");

    console.log("\nVerifying End Booking Time label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_End_booking_time_label, ElementsName.EditMeetingRoomLabels[5], ElementsName.EditMeetingRoomLabels[5]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_End_booking_time_hover, ElementsName.EditMeetingRoomLabelsHover[5], ElementsName.EditMeetingRoomLabelsHover[5]);
    console.log("✅ End Booking Time verified\n");

    console.log("\nVerifying Restrict Booking Duration label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Restrict_booking_duration_label, ElementsName.EditMeetingRoomLabels[6], ElementsName.EditMeetingRoomLabels[6]);
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spot_SideBar_Restrict_booking_duration_toggle, ElementsName.EditMeetingRoomLabels[6], 'on');
    await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_Spot_SideBar_Restrict_booking_duration_slot, ElementsName.EditMeetingRoomLabels[6]);

    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Restrict_booking_duration_hover, ElementsName.EditMeetingRoomLabelsHover[6], ElementsName.EditMeetingRoomLabelsHover[6]);
    console.log("✅ Restrict Booking Duration verified\n");

    console.log("\nVerifying External Bookings Via Email label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_External_bookings_via_email_label, ElementsName.EditMeetingRoomLabels[7], ElementsName.EditMeetingRoomLabels[7]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_External_bookings_via_email_hover, ElementsName.EditMeetingRoomLabelsHover[7], ElementsName.EditMeetingRoomLabelsHover[7]);
    console.log("✅ External Bookings Via Email verified\n");

    console.log("\nVerifying Status label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Status_label, ElementsName.EditMeetingRoomLabels[8], ElementsName.EditMeetingRoomLabels[8]);
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spot_SideBar_Status_dropdown, 'Active', ElementsName.EditMeetingRoomLabels[8]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Status_hover, ElementsName.EditMeetingRoomLabelsHover[8], ElementsName.EditMeetingRoomLabelsHover[8]);
    console.log("✅ Status verified\n");

    console.log("\nVerifying Require Organiser Check-in label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Require_organiser_check_in_label, ElementsName.EditMeetingRoomLabels[9], ElementsName.EditMeetingRoomLabels[9]);


    // console.log("\nVerifying Require Meeting Approval label & hover text...");

    // await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Require_meeting_approval_label, ElementsName.EditMeetingRoomLabels[16], ElementsName.EditMeetingRoomLabels[16]);
    // await this.setCheckboxState(this.locatorsPage.admin_Spot_SideBar_Approval_Needed_Checkbox, true);
    // //await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Require_meeting_approval_hover, ElementsName.EditMeetingRoomLabelsHover[16], ElementsName.EditMeetingRoomLabelsHover[16]);
    // console.log("✅ Require Meeting Approval verified\n");
    // await this.page.mouse.move(500, 300);
    // await this.page.waitForTimeout(2000);
    // await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Approval_Needed_Edit_Button);
    // await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Approval_Needed_Modal_Header, ElementsName.Space_Popup_Expected.Approver_list, ElementsName.Space_Popup_Expected.Approver_list);
    // await this.selectApproval(restuser);
    // await this.page.waitForTimeout(2000);



    // Locate the actual hidden checkbox
    const organiserCheckbox = this.locatorsPage.admin_Spot_SideBar_Require_organiser_check_in_check_box;

    // Verify if it's checked
    const isChecked = await organiserCheckbox.isChecked();
    console.log("Checked status before:", isChecked);

    // If not checked, then check it
    if (false == isChecked) {
      await this.locatorsPage.admin_Spot_SideBar_Require_organiser_check_in_check_box_2.click();   // <-- preferred way
      console.log("Checkbox is now checked.");
    }

    // Final assert 
    await expect(organiserCheckbox).toBeChecked();

    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Require_organiser_check_in_hover, ElementsName.EditMeetingRoomLabelsHover[9], ElementsName.EditMeetingRoomLabelsHover[9]);
    console.log("✅ Require Organiser Check-in verified\n");

    console.log("\nVerifying QR code label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_QR_code_label, ElementsName.EditMeetingRoomLabels[10], ElementsName.EditMeetingRoomLabels[10]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_QR_code_hover, ElementsName.EditMeetingRoomLabelsHover[10], ElementsName.EditMeetingRoomLabelsHover[10]);
    console.log("✅ QR code verified\n");
    await this.page.waitForTimeout(2000);
    console.log("\nVerifying Check-in reminder label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Check_in_reminder_label, ElementsName.EditMeetingRoomLabels[11], ElementsName.EditMeetingRoomLabels[11]);
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spot_SideBar_Check_in_reminder_check_toggle, ElementsName.EditMeetingRoomLabels[11], 'on');
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Check_in_reminder_hover, ElementsName.EditMeetingRoomLabelsHover[11], ElementsName.EditMeetingRoomLabelsHover[11]);
    console.log("✅ Check-in reminder verified\n");
    await this.page.waitForTimeout(2000);
    console.log("\nVerifying Check-in reminder time label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Check_in_reminder_time_label, ElementsName.EditMeetingRoomLabels[12], ElementsName.EditMeetingRoomLabels[12]);
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spot_SideBar_Check_in_reminder_time_dropdown, '5 minutes after start time', ElementsName.EditMeetingRoomLabels[12]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Check_in_reminder_time_hover, ElementsName.EditMeetingRoomLabelsHover[12], ElementsName.EditMeetingRoomLabelsHover[12]);
    console.log("✅ Check-in reminder time verified\n");
    await this.page.waitForTimeout(2000);
    console.log("\nVerifying Auto-release label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Auto_release_label, ElementsName.EditMeetingRoomLabels[13], ElementsName.EditMeetingRoomLabels[13]);
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spot_SideBar_Auto_release_check_toggle, ElementsName.EditMeetingRoomLabels[13], 'on');
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Auto_release_hover, ElementsName.EditMeetingRoomLabelsHover[13], ElementsName.EditMeetingRoomLabelsHover[13]);
    console.log("✅ Auto-release verified\n");
    await this.page.waitForTimeout(2000);
    console.log("\nVerifying Auto-release after label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Auto_release_after_label, ElementsName.EditMeetingRoomLabels[14], ElementsName.EditMeetingRoomLabels[14]);
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Spot_SideBar_Auto_release_after_dropdown, '30 minutes after start time', ElementsName.EditMeetingRoomLabels[14]);
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Auto_release_after_hover, ElementsName.EditMeetingRoomLabelsHover[14], ElementsName.EditMeetingRoomLabelsHover[14]);
    console.log("✅ Auto-release after verified\n");
    await this.page.waitForTimeout(2000);
    console.log("\nVerifying Restrict Bookings By Users label & hover text...");
    await this.reusablePageClass.assertTextByXPath(this.locatorsPage.admin_Spot_SideBar_Restrict_bookings_by_users_label, ElementsName.EditMeetingRoomLabels[15], ElementsName.EditMeetingRoomLabels[15]);
    await this.reusablePageClass.toggleSwitchById(this.locatorsPage.admin_Spot_SideBar_Restrict_Bookings_By_Users_Toggle, ElementsName.EditMeetingRoomLabels[15], 'on');
    await this.hoverAndAssert(this.locatorsPage.admin_Spot_SideBar_Restrict_bookings_by_users_hover, ElementsName.EditMeetingRoomLabelsHover[15], ElementsName.EditMeetingRoomLabelsHover[15]);
    console.log("✅ Restrict Bookings By Users verified\n");
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Restrict_bookings_by_users_button);
    await this.setCheckboxState(this.locatorsPage.admin_Spot_SideBar_Enable_Day_Restrictions_Checkbox, true);
    await this.selectEmployeeForToday(restuser);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Restriction_Cancel_Button);
    await this.page.waitForTimeout(3000);
    await this.page.mouse.move(500, 300);

    console.log("\nClosing sidebar...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Close_button);
    console.log("✅ Sidebar closed\n");
    console.log("\n=== ✅ Edit Meeting Room Spot Flow Completed Successfully ===\n");
  }

  async deleteMeetingSpot() {
    console.log('🗑️ Starting Delete Meeting Spot process...');

    console.log("🔍 Waiting for 'Name Filter' input to be visible...");
    await this.locatorsPage.admin_Spot_Add_Meeting_Popup_room_name_input.waitFor({ state: "visible", timeout: 15000 });

    console.log(`⌨️ Entering Meeting spot name in filter: "${this.randomSpotName || ''}"`);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Spot_Add_Meeting_Popup_room_name_input, this.randomSpotName || '');
    await this.page.waitForTimeout(3000);

    console.log('📄 Waiting for created Meeting spot to appear in the list...');
    await this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first.waitFor({ state: "visible", timeout: 15000 });
    await this.page.waitForTimeout(2000);

    console.log('✅ Verifying that the correct Meeting spot name is displayed...');
    await this.reusablePageClass.assertTextByXPath(
      this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first,
      this.randomSpotName || '',
      "Created Meeting Spot Name"
    );

    console.log('🖱️ Clicking on Delete Meeting Spot button...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Parking_Spaces_Delete_Parking_Space_Button_first);
    await this.page.waitForTimeout(2000);

    console.log('💬 Waiting for delete confirmation dialog...');
    await this.locatorsPage.admin_Parking_Spaces_Cancel_input_text_button.waitFor({ state: "visible", timeout: 15000 });
    await this.page.waitForTimeout(2000);

    console.log('📌 Clicking on Cancel input text box to activate it...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Parking_Spaces_Cancel_input_text_button);

    console.log('⌨️ Typing confirmation text: "DELETE ALL BOOKINGS"');
    await this.reusablePageClass.typeString("DELETE ALL BOOKINGS");
    await this.page.waitForTimeout(1000);

    console.log('✅ Clicking Confirm Delete button...');
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Confirm_deleted_button);
    console.log('⏳ Waiting for deletion to complete...');
    await this.page.waitForTimeout(500);
    await this.locatorsPage.succsessMessageAdmin.first().waitFor({ state: "visible", timeout: 20000 });
    await this.page.waitForTimeout(5000);

    console.log('🎯 Meeting Spot deletion process completed successfully.');
  }




  async selectNextDayDatePicker() {
    // Get today's date
    const today = dayjs();
    const nextDay = today.add(1, "day").date(); // next day number only

    console.log(`Selecting next day: ${nextDay}`);

    // Open the datepicker input
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Date_input);

    // Locate next day cell in the datepicker
    const dayLocator = this.page.locator(
      `//div[contains(@class,'datepicker-days')]//td[not(contains(@class,'old')) and not(contains(@class,'new')) and text()='${nextDay}']`
    );
    // Wait and click it
    await dayLocator.first().click();

  }

  async clickRestrictBookingsByUsersEDITButton() {
    console.log("🖱️ Clicking on 'Restrict bookings by users' button...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Restrict_bookings_by_users_button);
    console.log("✅ 'Restrict bookings by users Edit' button clicked\n");

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



  async selectEmployeeForToday(employeeName: string) {
    // 1️⃣ Get today's day (e.g. "saturday")
    const today = dayjs().format("dddd").toLowerCase();
    console.log(`Today is: ${today}`);

    // 2️⃣ Build selector for Bootstrap Select (button that triggers dropdown)
    const dropdownButton = this.page.locator(`#${today}-employeename + .dropdown-toggle`);

    console.log(`Trying to select '${employeeName}' from ${today}'s dropdown`);

    // 3️⃣ Open dropdown
    await dropdownButton.click();

    // 4️⃣ Select the option by its text inside <ul><li>
    const option = this.page.locator(`.dropdown-menu.show li:has-text("${employeeName}")`);
    await option.click();

    // 5️⃣ Assert selection by checking the button text
    const selectedText = await dropdownButton.textContent();
    console.log(`✅ Selected: ${selectedText}`);
    if (!selectedText?.includes(employeeName)) {
      throw new Error(`Failed to select ${employeeName} in ${today}'s dropdown`);
    }

    // Press ESC key globally
    await this.page.keyboard.press("Escape");

  }

  async selectApproval(employeeName: string) {
    // 1️⃣ Get today's day (e.g. "saturday")


    // 2️⃣ Locate the real <select> element
    const selectLocator = this.page.locator(`#approve_employeename`);

    console.log(`Trying to select '${employeeName}'`);

    // 3️⃣ Select option by visible text
    await selectLocator.selectOption({ label: employeeName });

    // 4️⃣ Assert that the value was set correctly
    const selected = await selectLocator.inputValue();
    console.log(`✅ Selected option value: ${selected}`);

    if (!selected) {
      throw new Error(`Failed to select ${employeeName}  dropdown`);
    }

    // 5️⃣ Escape key (to close bootstrap dropdown overlay if still open)
    await this.page.keyboard.press("Escape");
  }

  async convertParkingSpotHourly(parkingzone: string) {
    console.log('Adding Parking Spot...');
    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Parking_Spaces_zone_id_Dropdown, parkingzone);
    //await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 15000 });
    console.log(`Spot added successfully`);
    await this.page.waitForTimeout(4000);
    await this.webElementActionClass.Click(this.locatorsPage.floatingFilterText);
    await this.deselectThirdCheckboxIfSelected();
    await this.page.waitForTimeout(5000);
    // await this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first.waitFor({ state: "visible", timeout: 15000 });

  }

  async EditParkingSpotHourlyConvert(restuser: string) {
    // console.log("\n=== 🛠 Starting Edit Parking Spot Flow ===\n");

    // console.log("\nClicking on the first created parking spot...");
    // await this.webElementActionClass.Click(this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first);

    // console.log("\nWaiting for sidebar to be visible...");
    // await this.page.waitForTimeout(3000);
    // console.log("✅ Sidebar opened successfully\n");

    // await this.webElementActionClass.Click(this.locatorsPage.admin_Hourly);
    // console.log("✅ Booking Period default check completed\n");


    // console.log("\nToggling Restrict Bookings By Users ON...");
    // await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Submit_button);
    // await this.page.waitForTimeout(1000);
    // console.log("\n=== ✅ Edit Parking Spot Flow Completed Successfully ===\n");

    let count = 1;

while (count <= 100) {
  console.log(`\n===================== 🚀 Iteration ${count} / 100 =====================`);

  try {
    console.log("\n=== 🛠 Starting Edit Parking Spot Flow ===\n");

    console.log("👉 Clicking on the first created parking spot...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Parking_Spaces_Created_parking_spot_first);

    console.log("⏳ Waiting for sidebar to be visible...");
    await this.page.waitForTimeout(3000); // Better: use waitForSelector if possible
    console.log("✅ Sidebar opened successfully");

    console.log("👉 Clicking on 'Hourly' radio button...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Hourly);
    console.log("✅ Booking Period default check completed");

    console.log("👉 Clicking on 'Submit' to apply changes...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Submit_button);

    await this.page.waitForTimeout(1000);
    console.log("✅ Submit successful");

    console.log(`=== ✅ Edit Parking Spot Flow Completed Successfully (Iteration ${count}) ===\n`);
    await this.page.waitForTimeout(4000);
  } catch (error) {
    console.error(`❌ Error during iteration ${count}:`, error);
  }

  count++;

  // Optional delay between iterations
  await this.page.waitForTimeout(500); // 0.5 seconds
}
  }

  

  async verifyBookingPeriodDefaultsClickHourly(allDayRadio: Locator, hourlyRadio: Locator) {
    console.log("Verifying Booking Period default selections...");

    // Check if "All day" radio is selected
    const isAllDayChecked = await allDayRadio.isChecked();
    if (isAllDayChecked) {
      console.log("✅ 'All day' radio button is selected by default.");
    } else {
      console.log("❌ 'All day' radio button is NOT selected by default.");
    }

    // Check if "Hourly" is disabled
    const isHourlyDisabled = await hourlyRadio.isDisabled();

    if (isHourlyDisabled) {
      console.log("✅ 'Hourly' radio button is disabled as expected.");
    } else {
      console.log("⚠️ 'Hourly' radio button is enabled. Clicking it now...");
      await hourlyRadio.click();
      console.log("✅ Clicked 'Hourly' radio button.");
    }
  }



  async deselectThirdCheckboxIfSelected() {
    const checkbox = this.page.locator('(//div[@ref="eCheckbox"]//div//input)[3]');

    // Wait for the checkbox to be visible
    await checkbox.waitFor({ state: 'visible' });

    // Check if the checkbox is selected
    const isChecked = await checkbox.isChecked();

    if (isChecked) {
      await checkbox.click();
      console.log('Checkbox was selected. Now deselected.');
    } else {
      console.log('Checkbox is already unselected. No action taken.');
    }
  }

}