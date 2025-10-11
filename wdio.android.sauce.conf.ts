import { config as shared } from './wdio.shared.conf';

// ===== Sauce Credentials =====
// const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
// const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;

// ===== App & Device Info from Environment (set in GitHub Actions or manually) =====
const APP = process.env.APP || 'sauce-storage:app-debug.apk';
const DEVICE_NAME = process.env.DEVICE_NAME || 'Samsung Galaxy S23 FE';
const PLATFORM_VERSION = process.env.PLATFORM_VERSION || '15.0';
const APPIUM_VERSION = process.env.APPIUM_VERSION || '1.22.3';

export const config = {
  ...shared,

  //
  // ======================
  // Sauce Labs Connection
  // ======================
  // user: SAUCE_USERNAME,
  // key: SAUCE_ACCESS_KEY,
  user: 'gaurang.solanki-601b8',   // ✅ your Sauce Labs username (without oauth- prefix)
  key: 'c57bc15a-b977-400a-a1be-031b197a6f75', // ✅ your Sauce Labs access key
  region: 'eu',
  // hostname: 'ondemand.eu-central-1.saucelabs.com',
  // port: 443,
  // protocol: 'https',
  // path: '/wd/hub',

  //
  // ==================
  // Test Specifications
  // ==================
  specs: [],
  maxInstances: 1,

  //
  // ============
  // Capabilities
  // ============
  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': DEVICE_NAME,
      'appium:platformVersion': PLATFORM_VERSION,
      'appium:automationName': 'UiAutomator2',
      'appium:app': APP,
      'appium:noReset': true,
      'appium:autoGrantPermissions': true,
      'appium:disableWindowAnimation': true,
      'appium:uiautomator2ServerLaunchTimeout': 120000,
      'appium:adbExecTimeout': 60000,

      // ---- Sauce Labs–specific options ----
      'sauce:options': {
        build: process.env.GITHUB_RUN_ID || `local-${new Date().toISOString()}`,
        name: process.env.TEST_NAME || 'Android WDIO Mobile Suite',
        appiumVersion: APPIUM_VERSION,
        idleTimeout: 300,           // seconds
        newCommandTimeout: 240,     // seconds
        capturePerformance: true,
        tags: ['android', 'wdio', 'ci'],
      },
    },
  ],

  //
  // =========
  // Services
  // =========
  services: [
    [
      'sauce',
      {
        sauceConnect: false, // true if you use Sauce Connect for private networks
        region: 'eu'
      },
    ],
  ],

  //
  // =========
  // Logging & Reporting
  // =========
  reporters: shared.reporters,

  //
  // =========
  // Framework
  // =========
  framework: shared.framework,
  mochaOpts: shared.mochaOpts,
};
