import type { Element as WebdriverIOElement } from 'webdriverio';
import * as XLSX from 'xlsx';
import type { ChainablePromiseElement } from 'webdriverio';
import { expect } from 'chai';

export default class BasePage {

  /* async waitForElementAndClick(selector: WebdriverIO.Element | string, timeout = 60000): Promise<void> {
     try {
       const element = typeof selector === 'string' ? await $(selector) : selector;
       const selectorString = typeof selector === 'string' ? selector : await element.selector;
 
       await element.waitForDisplayed({
         timeout,
         interval: 500,
         timeoutMsg: `Element ${selectorString} not visible after ${timeout} ms`,
       });
 
       await element.click();
     } catch (error) {
       console.error(`Failed to click on element "${selector}":`, error);
       throw error;
     }
   } */

  async waitForElementAndClick(selector: WebdriverIO.Element | string, timeout = 60000): Promise<void> {
    try {
      const element = typeof selector === 'string' ? await $(selector) : selector;
      const selectorString = typeof selector === 'string' ? selector : await element.selector;

      // Wait for element to exist in DOM (but not necessarily visible yet)
      await element.waitForExist({ timeout });

      // Try scrolling to element if not visible
      if (!(await element.isDisplayed())) {
        console.log(`🔍 Element ${selectorString} not visible, attempting to scroll...`);
        await this.scrollToElement(element);
      }

      // Wait until it becomes visible
      await element.waitForDisplayed({
        timeout,
        interval: 500,
        timeoutMsg: `Element ${selectorString} not visible after ${timeout} ms`,
      });

      // Click the element
      await element.click();
      //console.log(`✅ Clicked on element: ${selectorString}`);
    } catch (error) {
      const selectorString = typeof selector === 'string' ? selector : (selector as WebdriverIO.Element).selector;
      console.error(`❌ Failed to click on element "${selectorString}":`, error);
      throw error;
    }
  }

  // Dynamic Wait for Element
  async waitForElementVisible(element: WebdriverIO.Element, timeout = 60000) {
    await element.waitForDisplayed({
      timeout,
      timeoutMsg: `Element ${await element.selector} not visible after ${timeout}ms`
    });
  }

  // Send Keys with Clear and Wait
  async clearAndSendKey(element: WebdriverIO.Element, value: string) {
    await this.waitForElementVisible(element);
    await element.clearValue();
    await element.setValue(value);
  }

  async clearAndTypeKey(element: WebdriverIO.Element, value: string) {
    await this.waitForElementVisible(element);

    // Click to focus the field
    await element.click();
    await driver.pause(500); // slight pause for keyboard to open

    // Select all and delete existing text
    await driver.pressKeyCode(123); // Move cursor to end
    for (let i = 0; i < 50; i++) {
      await driver.pressKeyCode(67); // Backspace
    }

    // Type the full text using setValue (should work now after clearing)
    await element.setValue(value);

    await driver.pause(300); // wait for stability

    console.log(`✅ Successfully typed: ${value}`);
  }


  // Tap / Click on Element (Safe Tap)
  async tapElement(element: WebdriverIO.Element) {
    await this.waitForElementVisible(element);
    await element.click();
  }

  // Scroll to Element (Android Mobile using text)
  async scrollToTextAndroid(text: string) {
    await driver.$(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("${text}")`);
  }

  // Scroll to Element (iOS Mobile using text)
  /*async scrollToTextIOS(text: string): Promise<void> {
    await driver.execute('mobile: scroll', {
      direction: 'down',
      predicateString: `label == "${text}" OR name == "${text}" OR value == "${text}"`
    });
  }*/

  async scrollToTextIOS(text: string, direction: 'down' | 'up' | 'left' | 'right'): Promise<void> {
    const deviceName = (driver.capabilities as any)['appium:deviceName'] || '';
    const udid = (driver.capabilities as any)['appium:udid'] || '';
    const isSimulator = udid.startsWith('auto') || deviceName.toLowerCase().includes('simulator');

    const predicate = `label == "${text}" OR name == "${text}" OR value == "${text}"`;

    if (isSimulator) {
      console.log(`🧪 Using mobile: scroll for Simulator (direction: ${direction})...`);
      await driver.execute('mobile: scroll', {
        direction: direction,
        predicateString: predicate,
      });
    } else {
      console.log(`📱 Using swipe + predicate check for Real Device (direction: ${direction})...`);
      const maxSwipes = 10;
      for (let i = 0; i < maxSwipes; i++) {
        const elements = await $$(`-ios predicate string:${predicate}`);
        if (elements.length > 0 && await elements[0].isDisplayed()) {
          console.log(`✅ Found element with text "${text}"`);
          return;
        }

        console.log(`🔄 Swipe attempt ${i + 1}: Element not visible, swiping ${direction}...`);
        await driver.execute('mobile: swipe', { direction: direction });
        await browser.pause(1000);
      }

      throw new Error(`❌ Element with text "${text}" not found after ${maxSwipes} swipes`);
    }
  }

  // Scroll to bottom (iOS Mobile)
  async scrollToBottomIOS(maxScrolls = 10): Promise<void> {
    for (let i = 0; i < maxScrolls; i++) {
      const canScrollMore = await driver.execute('mobile: scroll', {
        direction: 'down',
      });
      await driver.pause(800);
    }
  }

  // Scroll to Element (iOS Mobile)
  async swipeIOS() {
    await driver.execute('mobile: swipe', {
      direction: 'down',
    });
  }

  async scrollToElementIOS(
    targetElement: WebdriverIO.Element,
    direction: 'down' | 'up' | 'left' | 'right'
  ): Promise<void> {
    try {
      const isDisplayed = await targetElement.isDisplayed();

      if (isDisplayed) {
        console.log(`✅ Element is already visible. No scroll needed.`);
        return;
      }

      console.log(`🔄 Scrolling ${direction} to bring element into view...`);
      await driver.execute('mobile: swipe', { direction });

      await browser.pause(1000); // Optional: Allow UI to stabilize
      console.log(`✅ Scroll executed.`);
    } catch (error) {
      console.error('❌ scrollToElementIOS failed:', error);
      throw error;
    }
  }

  /* async isElementDisplayed(element: WebdriverIO.Element, elementName?: string, timeout: number = 60000): Promise<boolean> {
    const name = elementName || element.selector;
    try {
      await element.waitForDisplayed({ timeout });
      const isVisible = await element.isDisplayed();
      if (!isVisible) {
        console.warn(`⚠️ Element ${name} not visible after ${timeout} ms`);
      } else {
        console.log(`✅ Element ${name} is displayed.`);
      }
      return isVisible;
    } catch (error) {
      console.warn(`⚠️ Element ${name} not visible after ${timeout} ms`);
      return false;
    }
  } */

  async isElementDisplayed(element: WebdriverIO.Element, elementName?: string, timeout: number = 60000): Promise<boolean> {
    const name = elementName || (await element.selector);

    try {
      await element.waitForExist({ timeout });
      if (!(await element.isDisplayed())) {
        console.log(`🔍 Element "${name}" not visible, attempting to scroll...`);
        await this.scrollToElement(element);
      }
      await element.waitForDisplayed({ timeout });

      const isVisible = await element.isDisplayed();
      if (!isVisible) {
        console.warn(`⚠️ Element "${name}" not visible after ${timeout} ms`);
      } else {
        console.log(`✅ Element "${name}" is displayed.`);
      }
      return isVisible;
    } catch (error) {
      console.warn(`⚠️ Element "${name}" not visible after ${timeout} ms`);
      return false;
    }
  }

  // Wait for Element to be Clickable
  async waitForClickable(element: WebdriverIO.Element, timeout = 60000) {
    await element.waitForClickable({
      timeout,
      timeoutMsg: `Element ${await element.selector} not clickable after ${timeout}ms`
    });
  }

  // Hide Keyboard (Mobile)
  // async hideKeyboardIfVisible() {
  //   try {
  //     const isShown = await driver.isKeyboardShown();

  //     // Safely access platformName with type assertion
  //     const platformName = (driver.capabilities as WebdriverIO.Capabilities).platformName?.toLowerCase();

  //     if (isShown) {
  //       if (platformName === 'android') {
  //         console.info('Android: Dismissing keyboard using driver.hideKeyboard()');
  //         await driver.hideKeyboard();
  //       } else if (platformName === 'ios') {
  //         console.info('iOS: Dismissing keyboard by tapping outside');
  //         await driver.execute('mobile: tap', { x: 100, y: 100 }); // Adjust if needed
  //       } else {
  //         console.warn(`Unknown platform: ${platformName}`);
  //       }
  //     }
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       console.warn('hideKeyboardIfVisible failed:', err.message);
  //     } else {
  //       console.warn('hideKeyboardIfVisible failed with unknown error:', err);
  //     }
  //   }
  // }

  async hideKeyboardIfVisible() {
  try {
    const isShown = await driver.isKeyboardShown();
    const platformName = (driver.capabilities as WebdriverIO.Capabilities).platformName?.toLowerCase();

    if (isShown && platformName === 'android') {
      console.info('Android: Keyboard is visible, pressing back button to dismiss');
      await driver.back(); // This acts like pressing the back button
      await driver.pause(1000); // Wait to confirm it's closed
    } else if (isShown && platformName === 'ios') {
      console.info('iOS: Dismissing keyboard by tapping outside');
      await driver.execute('mobile: tap', { x: 100, y: 100 });
      await driver.pause(1000);
    }
  } catch (err) {
    console.warn('hideKeyboardIfVisible failed:', err instanceof Error ? err.message : err);
  }
}


  // Swipe on Element (Mobile)
  async swipeOnElement(element: WebdriverIO.Element, flow: 'left' | 'right' | 'up' | 'down') {
    await driver.execute('mobile: swipe', {
      elementId: element.elementId,
      direction: flow,
    });
  }

  async simpleScrollAndroid(
    direction: 'up' | 'down' | 'left' | 'right' = 'down'
  ): Promise<void> {
    const { width, height } = await driver.getWindowSize();

    const startX = width / 2;
    const startY = direction === 'down' ? height * 0.3 : height * 0.7;
    const endY = direction === 'down' ? height * 0.7 : height * 0.3;

    await driver.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: startX, y: startY },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 100 },
          { type: 'pointerMove', duration: 300, x: startX, y: endY },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);

    await driver.releaseActions(); // Clean up
  }

  async assertElementTextEquals(
    actualText: string,
    expectedText: string,
    message?: string
  ): Promise<void> {
    console.log("Actual Text :", actualText)
    console.log("Expected Text :", expectedText)
    const normalizedActual = actualText.trim().toLowerCase();
    const normalizedExpected = expectedText.trim().toLowerCase();
    expect(normalizedActual).to.equal(normalizedExpected, message || `Expected "${normalizedExpected}", but got "${normalizedActual}"`);
    console.log(`✅ Assertion Passed Successfully >> Expected: "${normalizedExpected}", Got: "${normalizedActual}"`);
  }

  async isElementDisplayedForiOS(element: WebdriverIO.Element, elementName?: string, timeout: number = 60000): Promise<boolean> {
    const name = elementName || element.selector;
    try {
      await element.waitForExist({ timeout });
      const isVisible = await element.isExisting();
      if (!isVisible) {
        console.warn(`⚠️ Element ${name} not visible after ${timeout} ms`);
      } else {
        console.log(`✅ Element ${name} is displayed.`);
      }
      return isVisible;
    } catch (error) {
      console.warn(`⚠️ Element ${name} not visible after ${timeout} ms`);
      return false;
    }
  }

  async tapElementByCoordinates(selector: string, elementName?: string): Promise<void> {
    try {
      const name = elementName || selector;

      const element = await $(selector);
      await element.waitForExist({ timeout: 5000 });

      const rect = await driver.getElementRect(element.elementId);
      const x = rect.x + rect.width / 2;
      const y = rect.y + rect.height / 2;

      await driver.execute('mobile: tap', { x, y });

      console.log(`✅ Tapped on ${name} at (${x}, ${y})`);
    } catch (error) {
      console.error(`❌ Failed to tap on element using coordinates: ${error}`);
      throw error;
    }
  }
  async assertElementTextEqualsWithLocator(
    element: WebdriverIO.Element,
    expectedText: string,
    message?: string
  ): Promise<void> {
    const actualText = await element.getText();
    console.log('\n')
    console.log("Verifying ", expectedText, "Element Text....");
    console.log("Actual Text:", actualText);
    console.log("Expected Text:", expectedText);

    expect(actualText).to.equal(
      expectedText,
      message || `❌ Assertion Failed >> Expected: "${expectedText}", but got: "${actualText}"`
    );

    console.log(`✅ Assertion Passed Successfully >> Expected: "${expectedText}", Got: "${actualText}"`);
  }

  async scrollToElement(element: WebdriverIO.Element): Promise<void> {
    const platform = ((driver.capabilities as any).platformName || '').toLowerCase();

    if (await element.isDisplayed()) {
      console.log('✅ Element is already visible, skipping scroll.');
      return;
    }

    const screenSize = await driver.getWindowSize();
    const elementLocation = await element.getLocation();

    const isBelow = elementLocation.y > screenSize.height * 0.8;
    const isAbove = elementLocation.y < screenSize.height * 0.2;
    const scrollDirection = isBelow ? 'up' : isAbove ? 'down' : 'up';

    if (platform === 'android') {
      console.log(`📱 Android scroll ${scrollDirection} to bring element into view...`);
      let attempts = 5;
      while (!(await element.isDisplayed()) && attempts-- > 0) {
        await driver.execute('mobile: swipe', {
          direction: scrollDirection,
          percent: 0.75,
        });
        await browser.pause(500);
      }
    } else if (platform === 'ios') {
      console.log(`🍎 iOS scroll ${scrollDirection} to bring element into view...`);
      let attempts = 5;
      while (!(await element.isDisplayed()) && attempts-- > 0) {
        await driver.execute('mobile: swipe', {
          direction: scrollDirection,
        });
        await browser.pause(500);
      }
    } else {
      console.warn('⚠️ Unsupported platform for scroll:', platform);
    }

    if (!(await element.isDisplayed())) {
      console.warn('⚠️ Element still not visible after scrolling attempts.');
    }
  }

  public async swipeInsideDropdown(): Promise<void> {
    // Step 1: Wait for any dropdown table to appear
    let table: WebdriverIO.Element | null = null;
    for (let i = 0; i < 10; i++) {
      const tables = await $$('//XCUIElementTypeTable');
      for (const t of tables) {
        if (await t.isDisplayed()) {
          table = t;
          break;
        }
      }
      if (table) break;
      console.log(`⏳ Waiting for dropdown table... attempt ${i + 1}`);
      await browser.pause(500); // wait between attempts
    }
    if (!table) {
      throw new Error('❌ Could not find any visible dropdown table');
    }
    console.log('✅ Found visible dropdown table. Scrolling...');
    await driver.execute('mobile: scroll', {
      direction: 'down',
      element: table.elementId,
    });
    await browser.pause(1000);
  }

}