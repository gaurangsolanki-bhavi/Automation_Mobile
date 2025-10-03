import {Page, Locator} from "@playwright/test"
import waitAction from "./WaitActions";

export default class WebElementActions extends waitAction {
    constructor(public page: Page) {
        super(page)
    }
    /**
    * Clicks on the specified element after ensuring it is visible.
    * @param element - Locator of the element to click.
    */

  async Click(element: Locator) {
    await this.waitForElementVisible(element);
    await element.click();
  }
  /**
   * Forcefully clicks on the specified element, bypassing any visibility checks.
   * Useful for clicking elements that might be obscured or not fully visible.
   * @param element - Locator of the element to force-click.
   */

  async Force_Click(element: Locator) {
    await this.waitForElementVisible(element);
    await element.click({ force: true });
  }

  async LeftClick(element: Locator) {
    await element.waitFor({ state: 'visible', timeout: 5000 });
    await element.click({ button: 'left' }); // 'left' is default, but can be added explicitly
    console.log('Left-clicked on element');
  }

  /**
    * Fills the specified text locator with the provided text after ensuring it is visible.
    * @param textLocator - Locator of the input field to fill.
    * @param text - The text to enter into the input field.
    */

  async Send_Keys(textLocator: Locator, text: string) {
    await this.waitForElementVisible(textLocator);
    await textLocator.fill(text);

  }
}