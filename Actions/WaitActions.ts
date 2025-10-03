import { Page, Locator } from "@playwright/test";

export default class WaitActions {
  constructor(public page: Page) {}
  /**
   * Waits for the specified element to become visible within a timeout of 30 seconds.
   * Logs an error message if the element does not become visible in time.
   * @param element - Locator of the element to wait for.
   */

  async waitForElementVisible(element: Locator) {
    try {
      await element.waitFor({ state: "visible", timeout: 60000 });
    } catch (error) {
      console.error(`Element not visible: ${element}, ${error}`);
      throw error; // ✅ correctly rethrows the original error
    }
  }

  /**
   * Waits for the specified element to disappear (hidden state).
   * Logs a message when the element disappears, or an error if it fails.
   * @param element - Locator of the element to wait for.
   */

  async WaitUntilElementToDisappear_hidden(element: Locator) {
    await element.waitFor({ state: "hidden" , timeout: 60000});
    console.log("Element disappeared");
  }

  /**
   * Waits until the specified element disappears (hidden and detached from the DOM).
   * This method has a 30 sec timeout (30000 ms) and logs a message when the element is fully detached.
   * @param element - Locator of the element to wait for.
   */

  async WaitUntilElementToDisappear(element: Locator) {
    // Wait until the element is detached from the DOM, with a maximum wait of 30 sec (30000 ms)
    await element.waitFor({ state: "hidden", timeout: 30000 });
    await element.waitFor({ state: "detached", timeout: 30000 });
    console.log("Element completely disappeared (detached from the DOM)");
  }

  async waitForNetworkIdleOrTimeout(timeout: number = 15000) {
    try {
        await Promise.race([
            this.page.waitForLoadState('networkidle'),
            new Promise((resolve) => setTimeout(resolve, timeout)) // Timeout in 7 seconds
        ]);
        console.log('Network idle or timeout reached.');
    } catch (error) {
        console.warn('Network did not become idle within the time limit.');
    }
}

}
