import { Page, Locator, expect, Download } from "@playwright/test";
import { test } from "../Utils/GlobalFixture";
import * as path from "path";
import * as fs from "fs";
import LocatorsPage from "../Pages/Locators";
import WebElementPage from "./WebElementActions";
import WaitActionPage from "./WaitActions";
import * as XLSX from 'xlsx';


let runningTestClassName: string, result: string;

export default class ReusableActions {
  private locatorsPage: LocatorsPage;
  private webElementPage: WebElementPage;
  private waitActionPage: WaitActionPage;
  constructor(public page: Page) {
    this.locatorsPage = new LocatorsPage(page);
    this.webElementPage = new WebElementPage(page);
    this.waitActionPage = new WaitActionPage(page);
  }

  /**
   * Get User Data from Excel file
   */

  async getTestData(sheetName: string, excelPath: string): Promise<any[]> {
    const workbook = XLSX.readFile(excelPath);
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      throw new Error(`Sheet "${sheetName}" not found in file "${excelPath}"`);
    }
    return XLSX.utils.sheet_to_json(sheet);
  }


  /**
 * Get user by index
 */
  async getUserByIndex(sheetName: string, excelPath: string, index: number): Promise<any> {
    const users = await this.getTestData(sheetName, excelPath);
    if (index >= users.length) {
      throw new Error(`Index ${index} is out of range. Total users: ${users.length}`);
    }
    return users[index];
  }

  /**
   * Delete the pdf in created directory
   */

  async deleteFiles(dirPath: string) {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        console.error(`failed to read directory: ${err}`);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`failed to delete file $(filepath): ${err}`);
          } else {
            console.log(`Deleted file: ${filePath}`);
          }
        });
      });
    });
  }

  async getTextMessage(element: Locator): Promise<string> {
    await this.page.waitForTimeout(4000);
    return await element.innerText();
  }
  /**
  * Get timestamp
  */
  async getTimestamp() {
    const now = new Date();
    const datePart = now.toISOString().replace(/T/, "-").replace(/:/g, "-").split(".")[0];
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); // Ensure milliseconds are 3 digits
    return `${datePart}-${milliseconds}`;
  }
  /**
  * Generate random number
  */
  async generateRandomNumber(length: number) {
    const min = Math.pow(10, length - 1); // Minimum value with the specified length
    const max = Math.pow(10, length) - 1; // Maximum value with the specified length
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
