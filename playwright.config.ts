import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import * as fs from 'fs';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
// Create report directory if not exists
const reportsDir = './TestResults/Reports';
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Generate timestamp for unique report folder
function getTimestamp() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = String(now.getFullYear()).slice(-2); // Get last two digits of year

  return `${hours}-${minutes}-${seconds}-${day}-${month}-${year}`;
}

const timestamp = getTimestamp();
const reportFolder = path.join(reportsDir, `report-${timestamp}`);

const isHeadless = process.env.HEADLESS
  ? process.env.HEADLESS === 'true' // if HEADLESS is passed, use its value
  : false;

export default defineConfig({
  testDir: './Tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  retries: 1,
  workers: 4,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 15000
  },
  timeout: 120 * 2000,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //globalSetup: 'myCustomHook',
  reporter: [['html', { outputFolder: reportFolder, open: 'never' }],
  ],


  globalSetup: "./Utils/GlobalSetup.ts",
  globalTeardown: './Utils/GlobalTeardown',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 0,
    browserName: 'chromium',
    channel: 'chrome',
    headless: isHeadless,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'off',
    baseURL: '',

    //viewport: isHeadless ? { width: 1920, height: 1080 }:null ,//Local_run
    viewport: isHeadless ? { width: 1920, height: 1080 } : { width: 1920, height: 1080 },
    launchOptions: {
      args: isHeadless ? [] : ['--window-size=1920,1080', '--disable-gpu'],
      //args: ['--start-maximized'],  //Local_run
    },

    screenshot: 'only-on-failure',

    video: {
      mode: 'on',
      size: {
        width: 1920,
        height: 1080
      },
    },
  },

});
