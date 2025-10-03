import { Locator, Page, expect } from "@playwright/test";
import WaitActionClass from "../../Actions/WaitActions";
import WebElementActionClass from "../../Actions/WebElementActions";
import LocatorsPage from "../Locators";
import ReusableActionClass from "../../Actions/ReusableActions";
import ReusablePage from "../Member/ReusablePage";
import ElementsName from "../../test-data/JSON/Elements_Name.json"

let timeStamp;

export default class AdminLoginPage {
  private waitActionClass: WaitActionClass;
  private webElementActionClass: WebElementActionClass;
  private reusableActionClass: ReusableActionClass;
  private locatorsPage: LocatorsPage;
  private reusablePageClass: ReusablePage;



  constructor(public page: Page) {
    // Initialize class objects
    this.waitActionClass = new WaitActionClass(page);
    this.webElementActionClass = new WebElementActionClass(page);
    this.reusableActionClass = new ReusableActionClass(page);
    this.locatorsPage = new LocatorsPage(page);
    this.reusablePageClass = new ReusablePage(page);
  }


  //   * Clicks on the main menu sidebar to open it if it's not already open.

  async clickOnMenuSideBar() {
    await this.verifySideMenuOpend();
    //await this.webElementActionClass.Click(this.locatorsPage.menu_side_bar);
    console.log("Clicked on Side Menu bar");
  }
  /**
   * Clicks on the admin profile icon.
   * Includes a hardcoded wait for demonstration purposes.
   */

  async clickOnProfileIcon() {
    await this.webElementActionClass.Click(this.locatorsPage.icon_admin_btn);
    console.log("Verify The Admin Profile Icon");
    await this.page.waitForTimeout(2000)
  }

  /**
    * Clicks on the "Spaces" main menu item in the sidebar.
    */
  async clickOnMenuSideBarSpaces() {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Main_Spaces);
    console.log("Clicked on Spaces Side Menu bar");
  }

  /**
  * Clicks on the "Parking Spaces" sub-menu item under "Spaces" in the sidebar.
  */

  async clickOnMenuSideBarSpacesSubParkingspaces() {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Sub_Parking_spaces);
    console.log("Clicked on Spaces Side Menu bar sub menu Parking spaces");
  }

  // async clickOnMenuInsight_LiveView() {
  //   await this.webElementActionClass.Click(this.locatorsPage.admin_Main_Menu_Insights);
  //   await this.webElementActionClass.Click(this.locatorsPage.admin_Sub_Menu_Live_view);
  //   console.log("Clicked on Insights Side Menu bar sub menu Live view");
  // }

  async clickOnMenuInsight_LiveView() {
    const isInsightsExpanded = await this.locatorsPage.admin_Live_View_Default.isVisible();

    if (!isInsightsExpanded) {
      await this.webElementActionClass.Click(this.locatorsPage.admin_Main_Menu_Insights);
      await this.webElementActionClass.Click(this.locatorsPage.admin_Sub_Menu_Live_view);
      console.log("Clicked on Insights Side Menu bar sub menu Live view");
    }


  }

  /**
   * Clicks on the "Desk Spaces" sub-menu item under "Spaces" in the sidebar.
   */

  async clickOnMenuSideBarSpacesSubDeskspaces() {
    await this.webElementActionClass.Click(this.locatorsPage.admin_Sub_Desks_spaces);
    console.log("Clicked on Spaces Side Menu bar sub menu Desks spaces");
  }

  /**
   * Adds multiple parking spots based on the provided count.
   * Includes logic for selecting a zone, entering a random spot number,
   * and selecting vehicle and fuel types.
   * @param count - The number of parking spots to add.
   */

  async addMultipleSpots(count: number) {
    for (let i = 0; i < count; i++) {
      console.log(`Adding spot ${i + 1} of ${count}`);
      await this.webElementActionClass.Click(this.locatorsPage.admin_Sub_Add_Parking_spaces_Btn);
      console.log("Clicked on Spaces Side Menu bar sub Add Parking spaces Button");
      // Select Zone
      await this.page.locator("//select[@id='car_park_id']").selectOption({ index: 1 }); // Change selector based on HTML

      // Enter random spot number
      const randomSpot = `P-${Math.floor(1000 + Math.random() * 9000)}`;
      //await this.page.locator('input[placeholder="Enter spot number"]').fill(randomSpot);
      await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Aad_spot_input, randomSpot);

      await this.webElementActionClass.Click(this.locatorsPage.admin_Add_spot_Vehicle_size_dropdown);
      // Select all checkbox if not selected
      if (!(await this.locatorsPage.selectAllCheckbox_Vehicle_size.isChecked())) {
        await this.locatorsPage.selectAllCheckbox_Vehicle_size.check();
      }

      await this.webElementActionClass.Click(this.locatorsPage.admin_Add_spot_Fuel_types_dropdown);
      // Select all checkbox if not selected
      if (!(await this.locatorsPage.selectAllCheckbox_Fuel_types.isChecked())) {
        await this.locatorsPage.selectAllCheckbox_Fuel_types.check();
      }
      // Click Complete
      await this.webElementActionClass.Click(this.locatorsPage.admin_Sub_Add_Parking_spaces_Complete_Btn);

      // Verify popup message
      // const popup = this.page.locator('.toast-message'); // adjust selector as needed
      // await expect(popup).toBeVisible({ timeout: 5000 });
      //console.log(`Spot ${i + 1} added successfully`);
      await this.page.waitForTimeout(3000)
    }

  }

  /**
  * Adds multiple desk spots based on the provided count.
  * Includes logic for selecting a zone and entering a random desk number.
  * @param count - The number of desk spots to add.
  */

  async addMultipleDeskSpots(count: number) {
    for (let i = 0; i < count; i++) {
      console.log(`Adding spot ${i + 1} of ${count}`);
      await this.webElementActionClass.Click(this.locatorsPage.admin_Sub_Add_desk_Btn);
      console.log("Clicked on Spaces Side Menu bar sub Add Desks Button");
      // Select Zone
      await this.page.locator("//select[@id='car_park_id']").selectOption({ index: 1 }); // Change selector based on HTML

      // Enter random spot number
      const randomSpot = `Desk-${Math.floor(1000 + Math.random() * 9000)}`;
      //await this.page.locator('input[placeholder="Enter spot number"]').fill(randomSpot);
      await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_Aad_spot_input, randomSpot);


      // Click Complete
      await this.webElementActionClass.Click(this.locatorsPage.admin_Sub_Add_Parking_spaces_Complete_Btn);

      await this.page.waitForTimeout(3000)
    }

  }
  /**
    * Verifies that the currently displayed calendar date in the UI matches the actual current system date.
    * Also verifies that the previous day is disabled and the next day is active and visible.
    */

  async verifyCurrentCalendarDate() {
    // Replace with the actual selector for the header showing "June 2025"
    await this.verifyGreetingMatchesTime()
    await this.reusablePageClass.verifyElementIsVisible(this.locatorsPage.icon_admin_btn, ElementsName.Admin_Dashboard.Admin_Profile_Icon);
    await this.reusablePageClass.verifyElementIsVisible(this.locatorsPage.admin_contry_dropdown, ElementsName.Admin_Dashboard.Country_Language_Btn_admin);
    console.log("\n");
    console.log("Verifying Current Calendar Date in Admin Live View Dashboard...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Live_View_DatePicker);
    const calendarHeader = await this.locatorsPage.admin_Live_View_DatePicker_Month_Year // adjust as needed
    const activeDayCell = await this.locatorsPage.admin_Live_View_DatePicker_Currunt_Active_Date

    // Extract calendar UI values
    const headerText = (await calendarHeader.textContent())?.trim(); // "June 2025"
    console.log('Actual Month/Year :' + headerText)
    const activeDayText = (await activeDayCell.textContent())?.trim(); // "4"
    console.log('Actual Currunt Date : ' + activeDayText)
    // Get actual current date from system
    const today = new Date();
    const expectedMonthYear = today.toLocaleString('default', { month: 'long', year: 'numeric' }); // "June 2025"
    const expectedDay = today.getDate().toString(); // "4"

    // Assertions
    expect(headerText).toBe(expectedMonthYear);
    expect(activeDayText).toBe(expectedDay);

    console.log(`✅ Verified Calendar Current Active Date: ${expectedMonthYear} ${expectedDay}`);

    const prevDay = today.getDate() - 1;
    const nextDay = today.getDate() + 1;

    // Safely filter previous day which is disabled
    const prevDayLocator = this.page.locator('td.disabled.day').filter({ hasText: prevDay.toString() });

    // Assert visibility of the first matching element
    const isPrevDayVisible = await prevDayLocator.first().isVisible();
    expect(isPrevDayVisible).toBeTruthy();
    console.log(`🔍 Previous Day (${prevDay}) is disabled and visible: ${isPrevDayVisible}`);

    // You can do the same for next day if needed:
    const nextDayLocator = this.page.locator('td.day:not(.disabled)').filter({ hasText: nextDay.toString() });
    const isNextDayVisible = await nextDayLocator.first().isVisible();
    expect(isNextDayVisible).toBeTruthy();
    console.log(`🔍 Next Day (${nextDay}) is active and visible: ${isNextDayVisible}`);
    await this.page.keyboard.press('Escape');

    console.log("<<================================================================>>");

  }

  /**
 * Selects an admin zone from a dropdown.
 * Can select by option text, index, or a default index if no specific option is provided.
 * @param optionText - Optional text of the option to select.
 * @param index - Optional index of the option to select.
 * @param defaultIndex - The default index to select if no specific option or index is provided. Defaults to 0.
 */

  async selectAdminZone(optionText?: string, index?: number, defaultIndex: number = 0) {
    await this.page.waitForTimeout(1000);
    await this.reusablePageClass.verifyElementIsVisible(this.locatorsPage.admin_Live_View_Default, ElementsName.Admin_Dashboard.LiveView)
    const dropdownSelector = "select#car_park_id_dashboard";

    // Get all options
    const options = await this.page.$$eval(`${dropdownSelector} option`, (elements) =>
      elements.map(option => option.textContent?.trim() || '')
    );
    console.log("\n");
    console.log("*****************************");
    console.log("Select Available Admin Zones:");
    console.log("*****************************");
    for (let i = 0; i < options.length; i++) {
      console.log(`Zone ${i + 1}: ${options[i]}`);
    }

    // Get the currently selected option
    const currentlySelected = await this.page.$eval(`${dropdownSelector} option:checked`, (option) =>
      option.textContent?.trim() || 'N/A'
    );
    console.log("\n");
    console.log(`Default Selected Admin Zone: ${currentlySelected}`);

    let selectedText = optionText && options.includes(optionText) ? optionText :
      index !== undefined && index >= 0 && index < options.length ? options[index] :
        options[defaultIndex];

    if (currentlySelected === selectedText) {
      console.log("\n");
      console.log(`"${selectedText}" is already selected. Skipping selection.`);
      console.log("<<================================================================>>");
      return;
    }
    console.log("\n");
    console.log(`Selecting Admin Zone: ${selectedText}`);
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
  * Checks if the filter panel is collapsed and, if so, opens it.
  * Then extracts and logs the text content of various filter icons (Available, Bookings, Violations, Waitlist)
  * along with their associated percentages or counts.
  */

  async isFilterCollapsedAndElementsHiddenOrAbsent() {
    const isCollapsed = await this.locatorsPage.admin_Filter_Collapse.isVisible();
    console.log("\n");
    console.log(`Verifying Filter panel...........`);

    if (isCollapsed) {
      console.log("\n");
      console.log(`Filter collapsed present: ${isCollapsed}`);
      console.log(`Opening the filter panel...`);
      await this.webElementActionClass.Click(this.locatorsPage.admin_Filter_Btn);
      await this.page.waitForTimeout(1000); // optional: wait for animation/transition
    } else {
      console.log("\n");
      console.log(`Filter panel is already opened`);
    }


    const [filterName, percentage] = await this.extractCleanedTextFromElement(this.locatorsPage.admin_Filter_Avilable_Icons);
    console.log("\n");
    console.log(`Filter Availability Is Display With %: ${filterName} ${percentage}`);
    const [filterName1, percentage1] = await this.extractCleanedTextFromElement(this.locatorsPage.admin_Filter_Book_Icons);
    console.log("\n");
    console.log(`Filter Bookings Is Display With %: ${filterName1} ${percentage1}`);
    const [filterName2, percentage2] = await this.extractCleanedTextFromElement(this.locatorsPage.admin_Filter_Report_Icons);
    console.log("\n");
    console.log(`Filter Violations Is Display With Count: ${filterName2} ${percentage2}`);
    const [filterName3, percentage3] = await this.extractCleanedTextFromElement(this.locatorsPage.admin_Filter_Waitlist_Icons);
    console.log("\n");
    console.log(`Filter Waitlist Is Display With Count: ${filterName3} ${percentage3}`);
    console.log("<<================================================================>>");
  }

  /**
 * Extracts and cleans text content from a given Playwright Locator.
 * It handles multiple lines and trims whitespace.
 * @param locator - The Playwright Locator to extract text from.
 * @returns A Promise that resolves to an array of cleaned strings.
 */

  async extractCleanedTextFromElement(locator: Locator): Promise<string[]> {
    const rawTexts = await locator.allTextContents();

    const cleanedTexts = rawTexts.map(text =>
      text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
    );

    return cleanedTexts.flat();
  }

  /**
 * Opens the sidebar by clicking on the first available spot, verifies its content,
 * and then closes the sidebar.
 * Throws an error if the spot link is not visible or the sidebar doesn't open/close as expected.
 */

  async validateSpotSidebarAndBookingPopups() {
    // Check if element is visible
    console.log("\n");
    console.log("Verifying the Spot Edit Side Bar.....");
    if (await this.locatorsPage.admin_First_Available_Spot.count() > 0) {
      if (await this.locatorsPage.admin_First_Available_Spot.isVisible()) {
        // Click it
        const admin_First_Available_Spot_edit = await this.locatorsPage.admin_First_Available_Spot.innerText()
        await this.webElementActionClass.Click(this.locatorsPage.admin_First_Available_Spot);
        console.log("Clicking on First Available Spot..", admin_First_Available_Spot_edit);
        // Wait for sidebar to be visible (opened)
        await this.waitActionClass.waitForElementVisible(this.locatorsPage.admin_Spot_SideBar_Header)
        console.log("Side bar is opened...");
        await this.page.waitForTimeout(1000)
        const Parking_space_on_sideBar = await this.locatorsPage.admin_Spot_SideBar_Space_number_input_value.getAttribute('value')
        console.log('Space Number Value Display in Side bar :', Parking_space_on_sideBar);
        console.log('Veifying Space Number Value And selected Spot Name..');
        expect(Parking_space_on_sideBar?.trim()).toBe(admin_First_Available_Spot_edit?.trim());
        // Verify sidebar is open
        if (!(await this.locatorsPage.admin_Spot_SideBar_Header.isVisible())) {
          throw new Error('Sidebar did not open after clicking first spot link.');
        }

        // Click the close button

        await this.webElementActionClass.Click(this.locatorsPage.admin_Spot_SideBar_Close_Icon);
        console.log("Verifying Side bar is Closed...");
        // Wait for sidebar to be hidden (closed)
        //await this.waitActionClass.WaitUntilElementToDisappear_hidden(this.locatorsPage.admin_Spot_SideBar_Header)

        // // Verify sidebar is closed
        // if (await this.locatorsPage.admin_Spot_SideBar_Header.isVisible()) {
        //   throw new Error('Sidebar did not close after clicking close button.');
        // }
        const admin_First_Available_Spot = await this.locatorsPage.admin_First_Available_Spot.innerText()
        console.log("Clicking on First Available Spot..", admin_First_Available_Spot);
        await this.webElementActionClass.waitForElementVisible(this.locatorsPage.admin_First_Spot_ThreeDots);
        await this.webElementActionClass.Click(this.locatorsPage.admin_First_Spot_ThreeDots);
        await this.webElementActionClass.waitForElementVisible(this.locatorsPage.admin_First_spot_popup_header);
        const PopupElementHeader = await this.locatorsPage.admin_First_spot_popup_header.innerText();
        console.log("Verifying Popup Header Text:", PopupElementHeader);
        expect(PopupElementHeader).toContain(admin_First_Available_Spot);
        console.log("\n");
        console.log("Verifying First Spot Popup Elements...");
        await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_spot_popup_edit_button, ElementsName.Admin_Dashboard.Edit_spaces);
        await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_spot_popup_history_button, ElementsName.Admin_Dashboard.Space_history);
        await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_spot_popup_book_button, ElementsName.Admin_Dashboard.Book_Space_btn);
        await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_First_popup_cross_icon, ElementsName.Admin_Dashboard.First_pop_up_cross_icon);
        console.log("\n");
        console.log("Verifying Second Spot Popup Elements... Cliking on Book Button");
        await this.webElementActionClass.Click(this.locatorsPage.admin_spot_popup_book_button);
        await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_second_popup_cross_icon, ElementsName.Admin_Dashboard.Second_pop_up_cross_icon);
        await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_second_popup_cancel_button, ElementsName.Admin_Dashboard.Second_pop_up_cancel_button);
        await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_second_popup_guest_tab_button, ElementsName.Admin_Dashboard.Second_pop_up_guest_tab_button);
        await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_spot_second_popup_search_user_input, ElementsName.Admin_Dashboard.Second_pop_up_employee_search_input);
        await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_spot_second_popup_Default_employee_button, ElementsName.Admin_Dashboard.Default_Employee_Btn);
        await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_spot_second_popup_BookSpot_button, ElementsName.Admin_Dashboard.Second_pop_up_Book_space_btn);
        console.log("Popup Elements Verified Successfully clicking on second popup cross icon to close it");
        await this.webElementActionClass.Click(this.locatorsPage.admin_second_popup_cancel_button);



      } else {
        throw new Error('First spot link is not visible.');
      }
    } else {
      throw new Error('First spot link element not found.');
    }
    console.log("<<================================================================>>");
  }
  /**
  * Verifies that the greeting message displayed on the page matches the expected greeting
  * based on the current system time (Good Morning, Good Afternoon, or Good Evening).
  * @returns A Promise that resolves to void.
  */

  async verifyGreetingMatchesTime() {
    const greetingText = await this.page.locator("//h2[contains(text(), 'Good')]").textContent();

    const trimmedGreeting = greetingText?.trim() || '';

    const currentHour = new Date().getHours();
    let expectedGreeting = '';

    if (currentHour >= 5 && currentHour < 12) {
      expectedGreeting = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      expectedGreeting = 'Good afternoon';
    } else {
      expectedGreeting = 'Good Evening';
    }
    console.log("\n");
    console.log("Verifying Greeting Text:", expectedGreeting)
    //expect(trimmedGreeting).toContain(expectedGreeting);
  }


  async verifySideMenuOpend() {

    const isCollapsed = await this.locatorsPage.admin_menu_sidebar_open.isVisible();
    console.log("\n");
    console.log(`Verifying Side Bar Main Menu panel...........`);

    if (isCollapsed) {
      console.log("\n");
      console.log(`Side Bar Main Menu panel is already opened`);
    } else {
      console.log("\n");
      console.log(`Side Bar Main Menu panel collapsed present: ${isCollapsed}`);
      console.log(`Opening the Side Bar Main Menu panel...`);
      await this.webElementActionClass.Click(this.locatorsPage.menu_side_bar);
      await this.page.waitForTimeout(1000); // optional: wait for animation/transition
    }
  }
  /**
 * Navigates by clicking on a given locator and verifies that the displayed header matches the expected header.
 * @param navigationLocator - The Playwright Locator for the navigation element to click.
 * @param expectedHeader - The expected header text after navigation.
 */

  async verifyNavigationWithHeader(navigationLocator: Locator, expectedHeader: string): Promise<void> {
    // Wait and click on the navigation element
    console.log("Verifying Admin Navigations Menu...", expectedHeader);
    await this.webElementActionClass.waitForElementVisible(navigationLocator);
    await this.webElementActionClass.Click(navigationLocator);
    //console.log(`Clicked on navigation: ${await navigationLocator.innerText()}`);
    // Wait for the expected header to be visible
    await this.webElementActionClass.waitForElementVisible(this.locatorsPage.admin_Sub_Menu_Header);
    const header = await this.locatorsPage.admin_Sub_Menu_Header.innerText();
    console.log(`Expected Header: ${expectedHeader}`);
    console.log(`Actual Header: ${header}`);
    console.log("Verifying Header Text:", expectedHeader)
    expect(header).toBe(expectedHeader);
    console.log("\n");
  }

  /**
  * Orchestrates the verification of all main and sub-menu navigations within the Admin panel.
  * It systematically clicks through each menu item and asserts that the correct header is displayed.
  */

  async Verifying_Admin_Navigations() {
    console.log("Verifying Admin All Main And Sub Menu Navigations...");
    console.log("\n");
    // Click on the menu sidebar
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Reports, ElementsName.Admin_Navigation_Menu.Report_Menu);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Main_Menu_Bookings);
    console.log("Verifying Bookings Sub Menus Navigations...");
    console.log("\n");
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Space_Bookings, ElementsName.Admin_Navigation_Menu.Space_bookings_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Room_Bookings, ElementsName.Admin_Navigation_Menu.Room_bookings_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Scheduler, ElementsName.Admin_Navigation_Menu.Scheduler_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Closing_Dates, ElementsName.Admin_Navigation_Menu.Closing_dates_menu);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Main_Menu_Spaces);
    console.log("Verifying Spaces Sub Menus Navigations...");
    console.log("\n");
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Zones_and_Maps, ElementsName.Admin_Navigation_Menu.Zones_and_maps_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Parking_Spaces, ElementsName.Admin_Navigation_Menu.Parking_spaces_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Desks, ElementsName.Admin_Navigation_Menu.Desks_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Meeting_Rooms, ElementsName.Admin_Navigation_Menu.Meeting_rooms_menu);
    //await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Bulk_Actions, ElementsName.Admin_Navigation_Menu.Bulk_actions_menu);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Main_Menu_Users);
    console.log("Verifying Users Sub Menus Navigations...");
    console.log("\n");
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Employees, ElementsName.Admin_Navigation_Menu.Employees_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Login_Methods, ElementsName.Admin_Navigation_Menu.Login_methods_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Administrators, ElementsName.Admin_Navigation_Menu.Administrators_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Group_Settings, ElementsName.Admin_Navigation_Menu.Group_settings_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Team_Permissions, ElementsName.Admin_Navigation_Menu.Team_permissions_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Health_and_Safety, ElementsName.Admin_Navigation_Menu.Health_and_safety_menu);
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Main_Menu_Account);
    console.log("Verifying Account Sub Menus Navigations...");
    console.log("\n");
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_General_Settings, ElementsName.Admin_Navigation_Menu.General_settings_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Email_Templates, ElementsName.Admin_Navigation_Menu.Email_templates_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Notification_Templates, ElementsName.Admin_Navigation_Menu.Notification_templates_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Admin_alerts, ElementsName.Admin_Navigation_Menu.Admin_alerts_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Pre_booking_Questions, ElementsName.Admin_Navigation_Menu.Pre_booking_questions_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Post_booking_Questions, ElementsName.Admin_Navigation_Menu.Post_booking_questions_menu);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Integrations, ElementsName.Admin_Navigation_Menu.Integrations_menu);

  }

  async bookSpotForUserViaLiveDashboard(Employee: string) {
    await this.releaseAllBookedSpotLiveDashboard();
    console.log("\n");
    console.log("Booking First Available Spot for user from Live Dashboard...");
    await this.page.waitForTimeout(2000);
    if (await this.locatorsPage.admin_First_Available_Spot.count() > 0) {
      if (await this.locatorsPage.admin_First_Available_Spot.isVisible()) {
        const admin_First_Available_Spot_edit = await this.locatorsPage.admin_First_Available_Spot.innerText()
        console.log("Clicking on First Available Spot..", admin_First_Available_Spot_edit);
        await this.webElementActionClass.waitForElementVisible(this.locatorsPage.admin_First_Spot_ThreeDots);
        await this.webElementActionClass.Click(this.locatorsPage.admin_First_Spot_ThreeDots);
        await this.webElementActionClass.waitForElementVisible(this.locatorsPage.admin_First_spot_popup_header);
        const PopupElementHeader = await this.locatorsPage.admin_First_spot_popup_header.innerText();
        console.log("Verifying Popup Header Text:", PopupElementHeader);
        expect(PopupElementHeader).toContain(admin_First_Available_Spot_edit);
        await this.webElementActionClass.Click(this.locatorsPage.admin_spot_popup_book_button);
        console.log("Clicked on Book Button from Book Spot FirstPopup");
        await this.webElementActionClass.waitForElementVisible(this.locatorsPage.admin_spot_second_popup_header);
        const PopupElementHeader2 = await this.locatorsPage.admin_spot_second_popup_header.innerText();
        console.log("Verifying Second Popup Header Text:", PopupElementHeader2);
        expect(PopupElementHeader2).toContain(admin_First_Available_Spot_edit);
        await this.page.waitForTimeout(2000);
        await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_spot_second_popup_Default_employee_button, ElementsName.Admin_Dashboard.Default_Employee_Btn);
        await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_spot_second_popup_search_user_input, Employee);
        console.log("Searching for Employee:", Employee);
        await this.page.waitForTimeout(3000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('Enter');
        console.log("select Vehicle for Booking Spot");
        await this.page.waitForTimeout(2000);
        await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_spot_second_popup_vehicle_type_Dropdown);
        await this.webElementActionClass.Click(this.locatorsPage.admin_spot_second_popup_BookSpot_button);
        console.log("Clicked on Book Spot Button from Book Spot Second Popup");
        console.log("\n");
        await this.page.waitForTimeout(2000);
        await this.webElementActionClass.waitForElementVisible(this.locatorsPage.admin_First_Booked_Spot);
        const BookedSpot = await this.locatorsPage.admin_First_Booked_Spot.innerText();
        console.log("Verifying Booked Spot:", BookedSpot);
        expect(BookedSpot).toContain(admin_First_Available_Spot_edit);
        await this.webElementActionClass.waitForElementVisible(this.locatorsPage.admin_First_Booked_Spot_Details_User_name);
        const BookedSpotUserName = await this.locatorsPage.admin_First_Booked_Spot_Details_User_name.innerText();
        console.log("Verifying Booked Spot User Name:", BookedSpotUserName);
        expect(BookedSpotUserName).toContain(Employee);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
        console.log("Success message displayed for Booking Spot", admin_First_Available_Spot_edit);
        await this.reusablePageClass.verifyAdminSuccessToastMatchesSpot(this.locatorsPage.succsessMessage.first(), admin_First_Available_Spot_edit);
        await this.page.waitForTimeout(1000);
      }

    }

  }

  async bookSpotForUserViaLiveDashboard_Map_Layout(Employee: string) {
    await this.releaseAllBookedSpotLiveDashboard_Map_Layout();
    console.log("\n");
    console.log("Booking First Available Spot for user from Live Dashboard...");
    await this.page.waitForTimeout(2000);
    if (await this.locatorsPage.admin_All_Available_Spots_Map.count() > 0) {
      if (await this.locatorsPage.admin_All_Available_Spots_Map.first().isVisible()) {
        const admin_First_Available_Spot_edit = await this.locatorsPage.admin_All_Available_Spots_Map.first().innerText()
        console.log("Clicking on First Available Spot..", admin_First_Available_Spot_edit);
        //await this.webElementActionClass.waitForElementVisible(this.locatorsPage.admin_First_Spot_ThreeDots);
        await this.webElementActionClass.Click(this.locatorsPage.admin_All_Available_Spots_Map.first());
        await this.webElementActionClass.waitForElementVisible(this.locatorsPage.admin_First_spot_popup_header);
        const PopupElementHeader = await this.locatorsPage.admin_First_spot_popup_header.innerText();
        console.log("Verifying Popup Header Text:", PopupElementHeader);
        expect(PopupElementHeader).toContain(admin_First_Available_Spot_edit);
        await this.webElementActionClass.Click(this.locatorsPage.admin_spot_popup_book_button);
        console.log("Clicked on Book Button from Book Spot FirstPopup");
        await this.webElementActionClass.waitForElementVisible(this.locatorsPage.admin_spot_second_popup_header);
        const PopupElementHeader2 = await this.locatorsPage.admin_spot_second_popup_header.innerText();
        console.log("Verifying Second Popup Header Text:", PopupElementHeader2);
        expect(PopupElementHeader2).toContain(admin_First_Available_Spot_edit);
        await this.page.waitForTimeout(2000);
        await this.reusablePageClass.assertElementVisible(this.locatorsPage.admin_spot_second_popup_Default_employee_button, ElementsName.Admin_Dashboard.Default_Employee_Btn);
        await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_spot_second_popup_search_user_input, Employee);
        console.log("Searching for Employee:", Employee);
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('Enter');
        console.log("select Vehicle for Booking Spot");
        await this.page.waitForTimeout(2000);
        await this.reusablePageClass.selectSecondOptionFromDropdown(this.locatorsPage.admin_spot_second_popup_vehicle_type_Dropdown);
        await this.webElementActionClass.Click(this.locatorsPage.admin_spot_second_popup_BookSpot_button);
        console.log("Clicked on Book Spot Button from Book Spot Second Popup");
        console.log("\n");
        await this.page.waitForTimeout(1000);
        await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
        console.log("Success message displayed for Booking Spot", admin_First_Available_Spot_edit);
        await this.reusablePageClass.verifyAdminSuccessToastMatchesSpot(this.locatorsPage.succsessMessage.first(), admin_First_Available_Spot_edit);
        await this.page.waitForTimeout(1000);
      }

    }

  }

  async releaseAllBookedSpotLiveDashboard_Map_Layout(): Promise<void> {
    let count;
    count = await this.locatorsPage.admin_All_Booked_Spots_Map.count();


    if (count === 0) {
      console.log('No booked spots found.');
      return;
    }

    console.log(`\n---- Found ${count} booked spots on Live Dashboard. Releasing...`);

    while (count > 0) {
      await this.page.waitForTimeout(3000);
      const spot = await this.locatorsPage.admin_All_Booked_Spots_Map_Spot_Name.nth(0).innerText(); // always pick the first one
      console.log("\n");
      console.log(`----------- Releasing Booked Spot: "${spot}"....`);
      await this.page.waitForTimeout(3000);
      await this.webElementActionClass.Click(this.locatorsPage.admin_All_Booked_Spots_Map.nth(0));
      console.log(`\nClicked on a Cancel bookeing spot button`);
      await this.page.waitForTimeout(2000);
      await this.webElementActionClass.Click(this.locatorsPage.admin_All_Booked_Spots_Live_Release_Button);
      await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
      console.log("Success message displayed for release.");
      console.log(`\nVerifying toast message...for Release Successfully spot: ${spot}`);
      await this.page.waitForTimeout(1000);
      await this.reusablePageClass.verifyAdminReleaseSuccessToastMatchesSpot(this.locatorsPage.succsessMessage.first(), spot);
      console.log(`\nSpot "${spot}" Released Successfully.!`);
      await this.page.waitForTimeout(3000);

      // Re-check how many are left after release
      count = await this.locatorsPage.admin_All_Booked_Spots_Map.count();
    }

    console.log("All hourly booked spots have been released.");
  }

  async releaseAllBookedSpotLiveDashboard(): Promise<void> {
    let count;
    count = await this.locatorsPage.admin_All_Booked_Spots_Live.count();


    if (count === 0) {
      console.log('No booked spots found.');
      return;
    }

    console.log(`\n---- Found ${count} booked spots on Live Dashboard. Releasing...`);

    while (count > 0) {
      await this.page.waitForTimeout(3000);
      const spot = await this.locatorsPage.admin_All_Booked_Spot.nth(0).innerText(); // always pick the first one
      console.log("\n");
      console.log(`----------- Releasing Booked Spot: "${spot}"....`);
      await this.page.waitForTimeout(3000);
      await this.webElementActionClass.Click(this.locatorsPage.admin_All_Booked_Spots_Live.nth(0));
      console.log(`\nClicked on a Cancel bookeing spot button`);
      await this.page.waitForTimeout(2000);
      await this.webElementActionClass.Click(this.locatorsPage.admin_All_Booked_Spots_Live_Release_Button);
      await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
      console.log("Success message displayed for release.");
      console.log(`\nVerifying toast message...for Release Successfully spot: ${spot}`);
      await this.page.waitForTimeout(1000);
      await this.reusablePageClass.verifyAdminReleaseSuccessToastMatchesSpot(this.locatorsPage.succsessMessage.first(), spot);
      console.log(`\nSpot "${spot}" Released Successfully.!`);
      await this.page.waitForTimeout(3000);

      // Re-check how many are left after release
      count = await this.locatorsPage.admin_All_Booked_Spots_Live.count();
    }

    console.log("All hourly booked spots have been released.");
  }

  async navigateToZoneAndMapMenu() {
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Main_Menu_Spaces);
    console.log("Verifying Spaces Sub Menus Navigations...");
    console.log("\n");
    await this.page.waitForTimeout(2000);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Zones_and_Maps, ElementsName.Admin_Navigation_Menu.Zones_and_maps_menu);
  }

  async navigateTOUserAndClearBookings(User: string) {
    await this.page.waitForTimeout(1000);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Main_Menu_Users);
    console.log("Verifying Users Sub Menus Navigations...");
    console.log("\n");
    await this.page.waitForTimeout(2000);
    await this.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Employees, ElementsName.Admin_Navigation_Menu.Employees_menu);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Send_Keys(this.locatorsPage.admin_User_Tab_Email_Filter_Input, User);
    await this.page.waitForTimeout(2000);
    //await this.locatorsPage.admin_User_Tab_Email_Filter_Input.hover();
    await this.webElementActionClass.Click(this.locatorsPage.admin_User_Tab_View_More_Button);
    await this.page.waitForTimeout(2000);
    await this.locatorsPage.admin_User_Tab_Clear_All_Bookings_Button.hover();
    await this.page.waitForTimeout(1000);
    await this.locatorsPage.admin_User_Tab_Clear_All_Bookings_Button.click({ force: true });
    this.page.on('dialog', async dialog => {
      console.log('Dialog message:', dialog.message());
      await dialog.accept(); // or dialog.dismiss()
    });
    await this.locatorsPage.admin_User_Tab_Clear_All_Bookings_Button.click({ force: true });
    await this.webElementActionClass.Click(this.locatorsPage.admin_User_Tab_Clear_All_Bookings_Modal_Header);
    await this.locatorsPage.succsessMessage.first().waitFor({ state: "visible", timeout: 20000 });
    console.log("Success message displayed for release.");

    await this.LogoutAdmin();

  }

async LogoutAdmin() {
  console.log("👉 Clicking on Admin icon button");
  await this.webElementActionClass.Click(this.locatorsPage.icon_admin_btn);

  await this.page.waitForTimeout(1000);
  console.log("✅ Admin menu opened");

  console.log("👉 Clicking on Logout button");
  await this.webElementActionClass.Click(this.locatorsPage.admin_Logutut_btn);

  await this.page.waitForTimeout(3000);
  console.log("✅ Logout successful, waiting for page to settle...");
}

}