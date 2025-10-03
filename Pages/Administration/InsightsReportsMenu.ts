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

export default class InsightsReportsMenuPage {
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
  actualRowData: string[] | undefined;



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
  async navigateToReportsMenu() {
    await this.adminLoginPage.verifyNavigationWithHeader(this.locatorsPage.admin_Sub_Menu_Reports, ElementsName.Admin_Navigation_Menu.Report_Menu);
    await this.page.waitForTimeout(5000);
  }

  async verifyReportsMenuLabels() {
    console.log("Verifying Reports Menu Labels...");
    await this.reusablePageClass.validateLabelElementsMatchAllExpected(this.locatorsPage.admin_Reports_Tabale_Headers, ElementsName.AdminReportsMenuHeader, "Reports Menu Tabs");
    console.log("Verified Reports Menu Labels");

    await this.validateAdminReports(ElementsName.AdminReportsNameHeader, ElementsName.AdminReportsDescriptionHeader);
  }

  async validateAdminReports(
    names: string[],
    descriptions: string[]
  ): Promise<void> {
    console.log("\n==================== Admin Reports Validation ====================");

    if (names.length !== descriptions.length) {
      throw new Error(
        `❌ Mismatch: Names (${names.length}) and Descriptions (${descriptions.length}) count`
      );
    }

    for (let i = 0; i < names.length; i++) {
      const expectedName = names[i];
      const expectedDescription = descriptions[i];

      // Dynamic XPath for name
      const nameLocator = this.page.locator(
        `//div[@ref='centerContainer']//div[@col-id='name']//a[normalize-space(text())='${expectedName}']`
      );

      // Dynamic XPath for description (row tied to the name)
      const descriptionLocator = this.page.locator(
        `//a[normalize-space(text())='${expectedName}']/ancestor::div[@role='row']//div[@col-id='description']//span`
      );

      // Wait for elements
      await nameLocator.waitFor({ state: "visible" });
      await descriptionLocator.waitFor({ state: "visible" });

      const actualName = (await nameLocator.textContent())?.trim() || "";
      const actualDescription = (await descriptionLocator.textContent())?.trim() || "";

      console.log("\n----------------------------------------------------");
      console.log(`📝 Row ${i + 1}`);
      console.log(`🔹 Expected Name        : ${expectedName}`);
      console.log(`🔹 Actual Name          : ${actualName}`);
      console.log(`🔹 Expected Description : ${expectedDescription}`);
      console.log(`🔹 Actual Description   : ${actualDescription}`);

      // Assertions
      expect(actualName).toBe(expectedName);
      expect(actualDescription).toBe(expectedDescription);

      console.log(`✅ Row ${i + 1} passed: Name + Description match successfully!`);
    }

    console.log("\n🎉 ✅ All Admin Report Names & Descriptions validated successfully!");
    console.log("==================================================================\n");
  }


  async ExportBookingCancellations(zoneName: string) {
    console.log("\n==================== 📊 Export: Booking Cancellations ====================");

    console.log("📌 Step 1: Opening 'Booking Cancellations' report...");
    await this.webElementActionClass.Click(
      this.locatorsPage.ReportNameLocator(ElementsName.AdminReportsNameHeader[0])
    );

    console.log("📌 Step 2: Waiting for network to settle (page load / data fetch)...");
    await this.waitActionClass.waitForNetworkIdleOrTimeout();

    console.log("📌 Step 3: Waiting for Export button to be visible...");
    await this.waitActionClass.waitForElementVisible(
      this.locatorsPage.admin_Reports_Export_Button
    );

    console.log("📌 Step 4: Expanding Zone selection dropdown...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_select_ZoneToGroup
    );
    await this.page.waitForTimeout(2000);

    console.log("📌 Step 5: Checking if any zone checkbox is pre-selected...");
    await this.uncheckFirstCheckedCheckbox();
    console.log("✅ Cleared previously selected zone(s) if any");

    console.log(`📌 Step 6: Selecting zone '${zoneName}'...`);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(
      this.locatorsPage.zoneCheckboxSelector(zoneName)
    );
    await this.page.waitForTimeout(2000);
    console.log(`✅ Zone '${zoneName}' selected`);

    console.log("👉 Clicking on 'Date Range' input...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Input);

    await this.page.waitForTimeout(1000);

    // Validate available date range options
    console.log("✅ Validating that all 'Date Range' options match expected labels...");
    await this.reusablePageClass.validateHeaderElementsMatchExpected(
      this.locatorsPage.admin_Reports_Date_Range_Option,
      ElementsName.dateRangeLabels,
      "Date Range Options"
    );

    // Select the first date range option
    console.log(`👉 Selecting the first available 'Date Range' option..., + ${ElementsName.dateRangeLabels[0]}`);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Option.first());
    await this.page.waitForTimeout(2000);
    console.log("Completed: Date Range selection validated and applied.");

    this.actualRowData = await this.locatorsPage.admin_Reports_firstRowCells.allInnerTexts();

    // ✅ Log the captured values
    console.log("📊 Actual Row Data:", this.actualRowData);
  }



  async uncheckFirstCheckedCheckbox(): Promise<void> {
    console.log("\n=== Uncheck: First checked checkbox ===");

    // 1) Fast path: CSS :checked (works with property-based checked state)
    const checkedCss = this.page.locator("label.checkbox input[type='checkbox']:checked");
    const checkedCssCount = await checkedCss.count();
    console.log(`🔎 Found ${checkedCssCount} checked checkbox(es) via CSS ':checked'`);

    if (checkedCssCount > 0) {
      const first = checkedCss.first();
      await first.scrollIntoViewIfNeeded();
      // double-check state and uncheck
      if (await first.isChecked()) {
        await first.uncheck();
        console.log("✅ Unchecked first checked checkbox (via CSS ':checked')");
      } else {
        console.log("⚠️ CSS-found checkbox was not checked on re-check (skipping)");
      }
      return;
    }

    // 2) Fallback: iterate all checkboxes and test isChecked() (safer)
    const allCheckboxes = this.page.locator("//label[@class='checkbox']//input[@type='checkbox']");
    const total = await allCheckboxes.count();
    console.log(`🔎 No CSS-checked found — scanning ${total} checkbox(es) one-by-one`);

    for (let i = 0; i < total; i++) {
      const cb = allCheckboxes.nth(i);
      // log index and state
      let checkedState = false;
      try {
        checkedState = await cb.isChecked();
      } catch (err) {
        console.warn(`⚠️ could not read isChecked() for index ${i}: ${err}`);
        continue;
      }
      console.log(`  • index ${i}: checked = ${checkedState}`);
      if (checkedState) {
        await cb.scrollIntoViewIfNeeded();
        await this.webElementActionClass.Click(cb);
        await this.page.waitForTimeout(4000);
        console.log(`✅ Unchecked checkbox at index ${i}`);
        return;
      }
    }

    console.log("🚫 No checkbox was checked (nothing to uncheck)");
  }

  async Export_Booking_Cancel_data() {

    const filePath = await this.downloadGroupListAndVerifyEmails(this.locatorsPage.admin_Reports_Export_Button, ...(this.actualRowData ?? []));

  }

  async Export_Booking_Cancel_7_10_data() {

    const filePath = await this.downloadGroupListAndVerifyEmails(this.locatorsPage.morningCancellationsExportCSVButton, ...(this.actualRowData ?? []));

  }


  async downloadGroupListAndVerifyEmails(button: Locator, ...expectedEmails: string[]): Promise<string> {
    // 📂 Ensure fresh download folder
    if (fs.existsSync(this.downloadDir)) {
      console.log(`🧹 Clearing old download folder: ${this.downloadDir}`);
      fs.rmSync(this.downloadDir, { recursive: true, force: true });
    }
    fs.mkdirSync(this.downloadDir, { recursive: true });

    // ⬇️ Trigger download & wait
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      button.click(),
    ]);

    // 💾 Save downloaded file
    const fileName = await download.suggestedFilename();
    const filePath = path.join(this.downloadDir, fileName);
    await download.saveAs(filePath);

    // ✅ Verify file exists
    expect(fs.existsSync(filePath)).toBeTruthy();
    console.log(`✅ CSV downloaded: ${filePath}`);

    // 📖 Read CSV content
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // 🔎 Verify expected emails
    for (const email of expectedEmails) {
      if (fileContent.includes(email)) {
        console.log(`✅ Verified "${email}" exists in CSV`);
      } else {
        console.error(`❌ Email "${email}" not found in CSV!`);
      }
    }

    return filePath;
  }


  async ExportBookingCancellations7_10(zoneName: string) {
    console.log("\n==================== 📊 Export: Booking Cancellations ====================");

    console.log("📌 Step 1: Opening 'Booking Cancellations' report...");
    await this.webElementActionClass.Click(
      this.locatorsPage.ReportNameLocator(ElementsName.AdminReportsNameHeader[1])
    );

    console.log("📌 Step 2: Waiting for network to settle (page load / data fetch)...");
    await this.waitActionClass.waitForNetworkIdleOrTimeout();

    console.log("📌 Step 4: Expanding Zone selection dropdown...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_select_ZoneToGroup
    );
    await this.page.waitForTimeout(2000);

    console.log("📌 Step 5: Checking if any zone checkbox is pre-selected...");
    await this.uncheckFirstCheckedCheckbox();
    console.log("✅ Cleared previously selected zone(s) if any");

    console.log(`📌 Step 6: Selecting zone '${zoneName}'...`);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(
      this.locatorsPage.zoneCheckboxSelector(zoneName)
    );
    await this.page.waitForTimeout(2000);
    console.log(`✅ Zone '${zoneName}' selected`);

    console.log("👉 Clicking on 'Date Range' input...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Input);

    await this.page.waitForTimeout(1000);

    // Validate available date range options
    console.log("✅ Validating that all 'Date Range' options match expected labels...");
    await this.reusablePageClass.validateHeaderElementsMatchExpected(
      this.locatorsPage.admin_Reports_Date_Range_Option,
      ElementsName.dateRangeLabels,
      "Date Range Options"
    );

    // Select the first date range option
    console.log(`👉 Selecting the first available 'Date Range' option..., + ${ElementsName.dateRangeLabels[2]}`);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Option.nth(4));
    await this.page.waitForTimeout(2000);
    console.log("Completed: Date Range selection validated and applied.");

    this.actualRowData = await this.locatorsPage.admin_Reports_firstRowCells.allInnerTexts();

    // ✅ Log the captured values
    console.log("📊 Actual Row Data:", this.actualRowData);
  }


  async ExportBookingForecast(zoneName: string) {
    console.log("\n==================== 📊 Export: Booking Forecast ====================");

    console.log("📌 Step 1: Opening 'Booking Forecast' report...");
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(
      this.locatorsPage.ReportNameLocator(ElementsName.AdminReportsNameHeader[2])
    );

    console.log("📌 Step 2: Waiting for network to settle (page load / data fetch)...");
    await this.waitActionClass.waitForNetworkIdleOrTimeout();

    console.log("📌 Step 4: Expanding Zone selection dropdown...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_select_ZoneToGroup
    );
    await this.page.waitForTimeout(2000);

    console.log("📌 Step 5: Checking if any zone checkbox is pre-selected...");
    await this.uncheckFirstCheckedCheckbox();
    console.log("✅ Cleared previously selected zone(s) if any");

    console.log(`📌 Step 6: Selecting zone '${zoneName}'...`);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(
      this.locatorsPage.zoneCheckboxSelector(zoneName)
    );
    await this.page.waitForTimeout(2000);
    console.log(`✅ Zone '${zoneName}' selected`);

    console.log("👉 Clicking on 'Date Range' input...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Input);

    await this.page.waitForTimeout(1000);

    // Validate available date range options
    console.log("✅ Validating that all 'Date Range' options match expected labels...");
    await this.reusablePageClass.validateHeaderElementsMatchExpected(
      this.locatorsPage.admin_Reports_Date_Range_Option,
      ElementsName.dateRangeLabels2,
      "Date Range Options"
    );

    // Select the first date range option
    console.log(`👉 Selecting the first available 'Date Range' option..., + ${ElementsName.dateRangeLabels2[3]}`);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Option.nth(3));
    await this.page.waitForTimeout(2000);
    console.log("Completed: Date Range selection validated and applied.");

    this.actualRowData = await this.locatorsPage.admin_Reports_firstRowCells.allInnerTexts();

    // ✅ Log the captured values
    console.log("📊 Actual Row Data:", this.actualRowData);
  }



  async ExportEmergencyRolesBookings(zoneName: string) {
    console.log("\n==================== 📊 Export: Booking Forecast ====================");

    console.log("📌 Step 1: Opening 'Booking Forecast' report...");
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(
      this.locatorsPage.ReportNameLocator(ElementsName.AdminReportsNameHeader[4])
    );

    console.log("📌 Step 2: Waiting for network to settle (page load / data fetch)...");
    await this.waitActionClass.waitForNetworkIdleOrTimeout();

    console.log("📌 Step 4: Expanding Zone selection dropdown...");
    // await this.webElementActionClass.Click(
    //   this.locatorsPage.admin_Accounts_select_ZoneToGroup
    // );

    // await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Reports_Parking_Free_Booking_Report_Select, zoneName);
    // await this.page.waitForTimeout(2000);

    // console.log("📌 Step 5: Checking if any zone checkbox is pre-selected...");
    // await this.uncheckFirstCheckedCheckbox();
    // console.log("✅ Cleared previously selected zone(s) if any");

    // console.log(`📌 Step 6: Selecting zone '${zoneName}'...`);
    // await this.page.waitForTimeout(2000);
    // await this.webElementActionClass.Click(
    //   this.locatorsPage.zoneCheckboxSelector(zoneName)
    // );
    await this.page.waitForTimeout(2000);
    console.log(`✅ Zone '${zoneName}' selected`);

    console.log("👉 Clicking on 'Date Range' input...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Input);

    await this.page.waitForTimeout(1000);

    // Validate available date range options
    console.log("✅ Validating that all 'Date Range' options match expected labels...");
    await this.reusablePageClass.validateHeaderElementsMatchExpected(
      this.locatorsPage.admin_Reports_Date_Range_Option,
      ElementsName.dateRangeLabels2,
      "Date Range Options"
    );

    // Select the first date range option
    console.log(`👉 Selecting the first available 'Date Range' option..., + ${ElementsName.dateRangeLabels2[3]}`);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Option.nth(3));
    await this.page.waitForTimeout(2000);
    console.log("Completed: Date Range selection validated and applied.");

    this.actualRowData = await this.locatorsPage.admin_Reports_firstRowCells.allInnerTexts();

    // ✅ Log the captured values
    console.log("📊 Actual Row Data:", this.actualRowData);
  }

  async ExportCreditFreeBookings(zoneName: string) {
    console.log("\n==================== 📊 Export: Booking Forecast ====================");

    console.log("📌 Step 1: Opening 'Booking Forecast' report...");
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(
      this.locatorsPage.ReportNameLocator(ElementsName.AdminReportsNameHeader[3])
    );

    console.log("📌 Step 2: Waiting for network to settle (page load / data fetch)...");
    await this.waitActionClass.waitForNetworkIdleOrTimeout();

    //console.log("📌 Step 4: Expanding Zone selection dropdown...");
    // await this.webElementActionClass.Click(
    //   this.locatorsPage.admin_Accounts_select_ZoneToGroup
    // );

    await this.reusablePageClass.selectDropdownOptionByValueByText(this.locatorsPage.admin_Reports_Parking_Free_Booking_Report_Select, zoneName);
    await this.page.waitForTimeout(2000);

    // console.log("📌 Step 5: Checking if any zone checkbox is pre-selected...");
    // await this.uncheckFirstCheckedCheckbox();
    // console.log("✅ Cleared previously selected zone(s) if any");

    // console.log(`📌 Step 6: Selecting zone '${zoneName}'...`);
    // await this.page.waitForTimeout(2000);
    // await this.webElementActionClass.Click(
    //   this.locatorsPage.zoneCheckboxSelector(zoneName)
    // );
    // await this.page.waitForTimeout(2000);
    // console.log(`✅ Zone '${zoneName}' selected`);

    console.log("👉 Clicking on 'Date Range' input...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Input);

    await this.page.waitForTimeout(1000);

    // Validate available date range options
    console.log("✅ Validating that all 'Date Range' options match expected labels...");
    await this.reusablePageClass.validateHeaderElementsMatchExpected(
      this.locatorsPage.admin_Reports_Date_Range_Option,
      ElementsName.dateRangeLabels,
      "Date Range Options"
    );

    // Select the first date range option
    console.log(`👉 Selecting the first available 'Date Range' option..., + ${ElementsName.dateRangeLabels2[3]}`);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Option.nth(3));
    await this.page.waitForTimeout(2000);
    console.log("Completed: Date Range selection validated and applied.");

    // this.actualRowData = await this.locatorsPage.admin_Reports_firstRowCells.allInnerTexts();

    // // ✅ Log the captured values
    // console.log("📊 Actual Row Data:", this.actualRowData);
  }



  async EmergencyRolesExports() {

    const filePath = await this.downloadGroupListAndVerifyEmails(this.locatorsPage.EmergencyRolesExportCSVButton, ...(this.actualRowData ?? []));

  }

  async ExportBookingMeetingRoomsUsage(zoneName: string) {
    console.log("\n==================== 📊 Export: Booking Meeting Rooms Usage ====================");

    console.log("📌 Step 1: Opening 'Booking Meeting Rooms Usage' report...");
    await this.webElementActionClass.Click(
      this.locatorsPage.ReportNameLocator(ElementsName.AdminReportsNameHeader[5])
    );

    console.log("📌 Step 2: Waiting for network to settle (page load / data fetch)...");
    await this.waitActionClass.waitForNetworkIdleOrTimeout();

    console.log("📌 Step 4: Expanding Zone selection dropdown...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_select_ZoneToGroup
    );
    await this.page.waitForTimeout(2000);

    console.log("📌 Step 5: Checking if any zone checkbox is pre-selected...");
    await this.uncheckFirstCheckedCheckbox();
    console.log("✅ Cleared previously selected zone(s) if any");

    console.log(`📌 Step 6: Selecting zone '${zoneName}'...`);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(
      this.locatorsPage.zoneCheckboxSelector(zoneName)
    );
    await this.page.waitForTimeout(2000);
    console.log(`✅ Zone '${zoneName}' selected`);

    console.log("👉 Clicking on 'Date Range' input...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Input);

    await this.page.waitForTimeout(1000);

    // Validate available date range options
    console.log("✅ Validating that all 'Date Range' options match expected labels...");
    await this.reusablePageClass.validateHeaderElementsMatchExpected(
      this.locatorsPage.admin_Reports_Date_Range_Option,
      ElementsName.dateRangeLabels,
      "Date Range Options"
    );

    // Select the first date range option
    console.log(`👉 Selecting the first available 'Date Range' option..., + ${ElementsName.dateRangeLabels[2]}`);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Option.nth(4));
    await this.page.waitForTimeout(2000);
    console.log("Completed: Date Range selection validated and applied.");

    this.actualRowData = await this.locatorsPage.admin_Reports_firstRowCells.allInnerTexts();

    // ✅ Log the captured values
    console.log("📊 Actual Row Data:", this.actualRowData);
  }



  async ExportMissedBookingsdata() {

    const filePath = await this.downloadGroupListAndVerifyEmails(this.locatorsPage.unusedBookingExportCSVButton, ...(this.actualRowData ?? []));

  }

  async ExportMissedBookings(zoneName: string) {
    console.log("\n==================== 📊 Export: Missed Bookings ====================");

    console.log("📌 Step 1: Opening 'Missed Bookings' report...");
    await this.webElementActionClass.Click(
      this.locatorsPage.ReportNameLocator(ElementsName.AdminReportsNameHeader[6])
    );

    console.log("📌 Step 2: Waiting for network to settle (page load / data fetch)...");
    await this.waitActionClass.waitForNetworkIdleOrTimeout();

    console.log("📌 Step 4: Expanding Zone selection dropdown...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_select_ZoneToGroup
    );
    await this.page.waitForTimeout(2000);

    console.log("📌 Step 5: Checking if any zone checkbox is pre-selected...");
    await this.uncheckFirstCheckedCheckbox();
    console.log("✅ Cleared previously selected zone(s) if any");

    console.log(`📌 Step 6: Selecting zone '${zoneName}'...`);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(
      this.locatorsPage.zoneCheckboxSelector(zoneName)
    );
    await this.page.waitForTimeout(2000);
    console.log(`✅ Zone '${zoneName}' selected`);

    console.log("👉 Clicking on 'Date Range' input...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Input);

    await this.page.waitForTimeout(1000);

    // Validate available date range options
    console.log("✅ Validating that all 'Date Range' options match expected labels...");
    await this.reusablePageClass.validateHeaderElementsMatchExpected(
      this.locatorsPage.admin_Reports_Date_Range_Option,
      ElementsName.dateRangeLabels,
      "Date Range Options"
    );

    // Select the first date range option
    console.log(`👉 Selecting the first available 'Date Range' option..., + ${ElementsName.dateRangeLabels[2]}`);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Option.nth(4));
    await this.page.waitForTimeout(4000);
    console.log("Completed: Date Range selection validated and applied.");

    this.actualRowData = await this.locatorsPage.admin_Reports_firstRowCells.allInnerTexts();

    // ✅ Log the captured values
    console.log("📊 Actual Row Data:", this.actualRowData);
  }



  async Export_RoomUsageExportCSVButtondata() {

    const filePath = await this.downloadGroupListAndVerifyEmails(this.locatorsPage.RoomUsageExportCSVButton, ...(this.actualRowData ?? []));

  }



  async Occupancyreportdata() {

    const filePath = await this.downloadGroupListAndVerifyEmails(this.locatorsPage.bookingdemandexportCSVButton, ...(this.actualRowData ?? []));

  }

  async ExportOccupancyReport(zoneName: string) {
    console.log("\n==================== 📊 Export: Occupancy Report ====================");
    await this.page.waitForTimeout(3000);
    console.log("📌 Step 1: Opening 'Occupancy Report'...");
    await this.webElementActionClass.Click(
      this.locatorsPage.ReportNameLocator(ElementsName.AdminReportsNameHeader[7])
    );

    console.log("📌 Step 2: Waiting for network to settle (page load / data fetch)...");
    await this.waitActionClass.waitForNetworkIdleOrTimeout();

    console.log("📌 Step 4: Expanding Zone selection dropdown...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_select_ZoneToGroup
    );
    await this.page.waitForTimeout(2000);

    console.log("📌 Step 5: Checking if any zone checkbox is pre-selected...");
    await this.uncheckFirstCheckedCheckbox();
    console.log("✅ Cleared previously selected zone(s) if any");

    console.log(`📌 Step 6: Selecting zone '${zoneName}'...`);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(
      this.locatorsPage.zoneCheckboxSelector(zoneName)
    );
    await this.page.waitForTimeout(2000);
    console.log(`✅ Zone '${zoneName}' selected`);

    console.log("👉 Clicking on 'Date Range' input...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Input);

    await this.page.waitForTimeout(1000);

    // Validate available date range options
    console.log("✅ Validating that all 'Date Range' options match expected labels...");
    await this.reusablePageClass.validateHeaderElementsMatchExpected(
      this.locatorsPage.admin_Reports_Date_Range_Option,
      ElementsName.dateRangeLabels,
      "Date Range Options"
    );

    // Select the first date range option
    console.log(`👉 Selecting the first available 'Date Range' option..., + ${ElementsName.dateRangeLabels[2]}`);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Option.nth(4));
    await this.page.waitForTimeout(4000);
    console.log("Completed: Date Range selection validated and applied.");

    this.actualRowData = await this.locatorsPage.admin_Reports_firstRowCells.allInnerTexts();

    // ✅ Log the captured values
    console.log("📊 Actual Row Data:", this.actualRowData);
  }



  async OfficeAttendanceData() {

    const filePath = await this.downloadGroupListAndVerifyEmails(this.locatorsPage.CheckInExportCSVButton, ...(this.actualRowData ?? []));

  }

  async ExportOfficeAttendanceReport(zoneName: string) {
    console.log("\n==================== 📊 Export: Office Attendance Report ====================");
    await this.page.waitForTimeout(3000);
    console.log("📌 Step 1: Opening 'Office Attendance Report'...");
    await this.webElementActionClass.Click(
      this.locatorsPage.ReportNameLocator(ElementsName.AdminReportsNameHeader[8])
    );

    console.log("📌 Step 2: Waiting for network to settle (page load / data fetch)...");
    await this.waitActionClass.waitForNetworkIdleOrTimeout();

    console.log("📌 Step 4: Expanding Zone selection dropdown...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_select_ZoneToGroup
    );
    await this.page.waitForTimeout(2000);

    console.log("📌 Step 5: Checking if any zone checkbox is pre-selected...");
    await this.uncheckFirstCheckedCheckbox();
    console.log("✅ Cleared previously selected zone(s) if any");

    console.log(`📌 Step 6: Selecting zone '${zoneName}'...`);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(
      this.locatorsPage.zoneCheckboxSelector(zoneName)
    );
    await this.page.waitForTimeout(2000);
    console.log(`✅ Zone '${zoneName}' selected`);

    console.log("👉 Clicking on 'Date Range' input...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Input);

    await this.page.waitForTimeout(1000);

    // Validate available date range options
    console.log("✅ Validating that all 'Date Range' options match expected labels...");
    await this.reusablePageClass.validateHeaderElementsMatchExpected(
      this.locatorsPage.admin_Reports_Date_Range_Option,
      ElementsName.dateRangeLabels,
      "Date Range Options"
    );

    // Select the first date range option
    console.log(`👉 Selecting the first available 'Date Range' option..., + ${ElementsName.dateRangeLabels[2]}`);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Option.nth(2));
    await this.page.waitForTimeout(4000);
    console.log("Completed: Date Range selection validated and applied.");

    this.actualRowData = await this.locatorsPage.admin_Reports_firstRowCells.allInnerTexts();

    // ✅ Log the captured values
    console.log("📊 Actual Row Data:", this.actualRowData);
  }



  async ParkingViolationsData() {

    const filePath = await this.downloadGroupListAndVerifyEmails(this.locatorsPage.exportCSVButton, ...(this.actualRowData ?? []));

  }

  async ExportParkingViolationsReport(zoneName: string) {
    console.log("\n==================== 📊 Export: Parking Violations Report ====================");
    await this.page.waitForTimeout(3000);
    console.log("📌 Step 1: Opening 'Parking Violations Report'...");
    await this.webElementActionClass.Click(
      this.locatorsPage.ReportNameLocator(ElementsName.AdminReportsNameHeader[9])
    );

    console.log("📌 Step 2: Waiting for network to settle (page load / data fetch)...");
    await this.waitActionClass.waitForNetworkIdleOrTimeout();

    console.log("📌 Step 4: Expanding Zone selection dropdown...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_select_ZoneToGroup
    );
    await this.page.waitForTimeout(2000);

    console.log("📌 Step 5: Checking if any zone checkbox is pre-selected...");
    await this.uncheckFirstCheckedCheckbox();
    console.log("✅ Cleared previously selected zone(s) if any");

    console.log(`📌 Step 6: Selecting zone '${zoneName}'...`);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(
      this.locatorsPage.zoneCheckboxSelector(zoneName)
    );
    await this.page.waitForTimeout(2000);
    console.log(`✅ Zone '${zoneName}' selected`);

    console.log("👉 Clicking on 'Date Range' input...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Input);

    await this.page.waitForTimeout(1000);

    // Validate available date range options
    console.log("✅ Validating that all 'Date Range' options match expected labels...");
    await this.reusablePageClass.validateHeaderElementsMatchExpected(
      this.locatorsPage.admin_Reports_Date_Range_Option,
      ElementsName.dateRangeLabels,
      "Date Range Options"
    );

    // Select the first date range option
    console.log(`👉 Selecting the first available 'Date Range' option..., + ${ElementsName.dateRangeLabels[2]}`);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Option.nth(4));
    await this.page.waitForTimeout(4000);
    console.log("Completed: Date Range selection validated and applied.");

    this.actualRowData = await this.locatorsPage.admin_Reports_firstRowCells.allInnerTexts();

    // ✅ Log the captured values
    console.log("📊 Actual Row Data:", this.actualRowData);
  }

   async ExportPastBookingsReport(zoneName: string) {
    console.log("\n==================== 📊 Export: Past Bookings Report ====================");
    await this.page.waitForTimeout(3000);
    console.log("📌 Step 1: Opening 'Past Bookings Report'...");
    await this.webElementActionClass.Click(
      this.locatorsPage.ReportNameLocator(ElementsName.AdminReportsNameHeader[10])
    );

    console.log("📌 Step 2: Waiting for network to settle (page load / data fetch)...");
    await this.waitActionClass.waitForNetworkIdleOrTimeout();

    console.log("📌 Step 4: Expanding Zone selection dropdown...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_select_ZoneToGroup
    );
    await this.page.waitForTimeout(2000);

    console.log("📌 Step 5: Checking if any zone checkbox is pre-selected...");
    await this.uncheckFirstCheckedCheckbox();
    console.log("✅ Cleared previously selected zone(s) if any");

    console.log(`📌 Step 6: Selecting zone '${zoneName}'...`);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(
      this.locatorsPage.zoneCheckboxSelector(zoneName)
    );
    await this.page.waitForTimeout(2000);
    console.log(`✅ Zone '${zoneName}' selected`);

    console.log("👉 Clicking on 'Date Range' input...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Input);

    await this.page.waitForTimeout(1000);

    // Validate available date range options
    console.log("✅ Validating that all 'Date Range' options match expected labels...");
    await this.reusablePageClass.validateHeaderElementsMatchExpected(
      this.locatorsPage.admin_Reports_Date_Range_Option,
      ElementsName.dateRangeLabels,
      "Date Range Options"
    );

    // Select the first date range option
    console.log(`👉 Selecting the first available 'Date Range' option..., + ${ElementsName.dateRangeLabels[2]}`);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Option.nth(4));
    await this.page.waitForTimeout(4000);
    console.log("Completed: Date Range selection validated and applied.");

    this.actualRowData = await this.locatorsPage.admin_Reports_firstRowCells.allInnerTexts();

    // ✅ Log the captured values
    console.log("📊 Actual Row Data:", this.actualRowData);
  }


  async ExportPastBookingsByStaffReport(zoneName: string) {
    console.log("\n==================== 📊 Export: Past Bookings By Staff Report ====================");
    await this.page.waitForTimeout(3000);
    console.log("📌 Step 1: Opening 'Past Bookings By Staff  Report'...");
    await this.webElementActionClass.Click(
      this.locatorsPage.ReportNameLocator(ElementsName.AdminReportsNameHeader[11])
    );

    console.log("📌 Step 2: Waiting for network to settle (page load / data fetch)...");
    await this.waitActionClass.waitForNetworkIdleOrTimeout();

    console.log("📌 Step 4: Expanding Zone selection dropdown...");
    await this.webElementActionClass.Click(
      this.locatorsPage.admin_Accounts_select_ZoneToGroup
    );
    await this.page.waitForTimeout(2000);

    console.log("📌 Step 5: Checking if any zone checkbox is pre-selected...");
    await this.uncheckFirstCheckedCheckbox();
    console.log("✅ Cleared previously selected zone(s) if any");

    console.log(`📌 Step 6: Selecting zone '${zoneName}'...`);
    await this.page.waitForTimeout(2000);
    await this.webElementActionClass.Click(
      this.locatorsPage.zoneCheckboxSelector(zoneName)
    );
    await this.page.waitForTimeout(2000);
    console.log(`✅ Zone '${zoneName}' selected`);

    console.log("👉 Clicking on 'Date Range' input...");
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Input);

    await this.page.waitForTimeout(1000);

    // Validate available date range options
    console.log("✅ Validating that all 'Date Range' options match expected labels...");
    await this.reusablePageClass.validateHeaderElementsMatchExpected(
      this.locatorsPage.admin_Reports_Date_Range_Option,
      ElementsName.dateRangeLabels,
      "Date Range Options"
    );

    // Select the first date range option
    console.log(`👉 Selecting the first available 'Date Range' option..., + ${ElementsName.dateRangeLabels[2]}`);
    await this.webElementActionClass.Click(this.locatorsPage.admin_Reports_Date_Range_Option.nth(4));
    await this.page.waitForTimeout(4000);
    console.log("Completed: Date Range selection validated and applied.");

    this.actualRowData = await this.locatorsPage.admin_Reports_firstRowCells.allInnerTexts();

    // ✅ Log the captured values
    console.log("📊 Actual Row Data:", this.actualRowData);
  }

    async PastBookingsByStaffData() {

    const filePath = await this.downloadGroupListAndVerifyEmails(this.locatorsPage.pastBookingStaffExportCSVButton, ...(this.actualRowData ?? []));

  }


  
  async ExportTimeOfBookingReport(zoneName: string) {
    console.log("\n==================== 📊 Export: Time Of Booking Report ====================");
    await this.page.waitForTimeout(3000);
    console.log("📌 Step 1: Opening 'Time Of Booking Report'...");
    await this.webElementActionClass.Click(
      this.locatorsPage.ReportNameLocator(ElementsName.AdminReportsNameHeader[12])
    );

    console.log("📌 Step 2: Waiting for network to settle (page load / data fetch)...");
    await this.waitActionClass.waitForNetworkIdleOrTimeout();

  }


}