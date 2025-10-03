// wdio.shared.conf.ts
// import type { Options } from '@wdio/types';
// import '@wdio/globals'
// import allure from '@wdio/allure-reporter';
// import fs from 'fs';
// import path from 'path';


// const specVideoMap: Record<string, string> = {};

// declare global {
//   var currentTestTitle: string | undefined;
// }

// // Global object to hold logs per test
// const testLogs: { [testTitle: string]: string[] } = {};
// const originalConsoleLog = console.log;

// // Override console.log to capture logs
// console.log = function (...args: any[]) {
//   const msg = args.map(String).join(' ');

//   const testTitle = (globalThis as any).currentTestTitle ?? '__GLOBAL__';
//   if (!testLogs[testTitle]) {
//     testLogs[testTitle] = [];
//   }
//   testLogs[testTitle].push(msg);

//   originalConsoleLog.apply(console, args);
// };

// export const config: Options.Testrunner = {
//   maxInstances: 1,
//   runner: 'local',
//   path: '/',
//   hostname: '127.0.0.1',
//   port: 4723,
//   logLevel: 'error',
//   framework: 'mocha',
//   reporters: [
//     ['allure', {
//       outputDir: 'allure-results',
//       disableWebdriverStepsReporting: true,
//       disableWebdriverScreenshotsReporting: true,
//     }]
//   ],
//   mochaOpts: {
//     ui: 'bdd',
//     timeout: 400000,
//   },
//   capabilities: [],

//   onPrepare: async() => {
//     const originalLog = console.log;
//     const fsExtra = require('fs-extra');

//     console.log = (...args) => {
//       const updatedArgs = args.map(arg =>
//         typeof arg === 'string'
//           ? arg.replace(/\[.*?\.(app|apk|ipa) (iOS|Android) #\d+-\d+\]/g, '[Mobile App]')
//           : arg
//       );
//       originalLog(...updatedArgs);
//     };

//     const allureDir = path.resolve('./allure-results');
//     const videoDir = path.resolve('./videos');

//     if (fsExtra.existsSync(allureDir)) {
//       fsExtra.emptyDirSync(allureDir);
//       console.log('[WDIO] Cleared allure-results folder.');
//     }

//     if (fsExtra.existsSync(videoDir)) {
//       fsExtra.emptyDirSync(videoDir);
//       console.log('[WDIO] Cleared videos folder.');
//     }
//   },

//   before: async function (capabilities, specs) {
//     const specFilePath = specs[0];
//     const specFileName = path.basename(specFilePath);

//     if (!specVideoMap[specFileName]) {
//       await driver.startRecordingScreen();
//       specVideoMap[specFileName] = 'started';
//       console.log(`[VIDEO] Started recording for ${specFileName}`);
//     }
//   },

//   beforeTest: async function (test) {
//     globalThis.currentTestTitle = test.title;
//   },

//   afterTest: async function (test, context, { error, passed }) {
//     const specFile = path.basename(test.file || 'unknown.spec.ts');
//     const videoDir = path.resolve('./videos');
//     const videoFile = specFile.replace(/\.[jt]s$/, '') + '.webm';
//     const videoPath = path.join(videoDir, videoFile);

//     // Screenshot on failure
//     if (!passed) {
//       const screenshot = await browser.takeScreenshot();
//       allure.addAttachment('Failure Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
//     }

//     // Console logs
//     const logs = testLogs[test.title]?.join('\n') || 'No logs captured.';
//     allure.addAttachment('Console Logs', logs, 'text/plain');

//     const globalLogs = testLogs['__GLOBAL__']?.join('\n');
//     if (globalLogs) {
//       allure.addAttachment('Global Console Logs', globalLogs, 'text/plain');
//     }

//     // Stop and save video if it's not saved yet
//     if (specVideoMap[specFile] === 'started') {
//       const videoBase64 = await driver.stopRecordingScreen();

//       if (!fs.existsSync(videoDir)) {
//         fs.mkdirSync(videoDir, { recursive: true });
//       }

//       fs.writeFileSync(videoPath, videoBase64, 'base64');
//       console.log(`[VIDEO] Saved video for ${specFile} → ${videoPath}`);

//       const videoBuffer = fs.readFileSync(videoPath);
//       allure.addAttachment('Spec Video', videoBuffer, 'video/webm');

//       specVideoMap[specFile] = 'saved';
//     }

//     delete globalThis.currentTestTitle;
//   },
// };

import type { Options } from '@wdio/types';
import '@wdio/globals';
import allure from '@wdio/allure-reporter';
import fs from 'fs';
import path from 'path';
import AppCrashHandler from './Utils/AppCrashHandler';

// wdio.shared.conf.ts (top of the file)
let isAppCrashed = false;

declare global {
  var currentTestTitle: string | undefined;
}

// Global object to hold logs per test
const testLogs: { [testTitle: string]: string[] } = {};
const originalConsoleLog = console.log;

// Override console.log to capture logs
console.log = function (...args: any[]) {
  const msg = args.map(String).join(' ');

  const testTitle = (globalThis as any).currentTestTitle;
  if (!testLogs[testTitle]) {
    testLogs[testTitle] = [];
  }
  testLogs[testTitle].push(msg);
  originalConsoleLog.apply(console, args);
};

export const config: WebdriverIO.Config = {
  maxInstances: 1,
  runner: 'local',
  path: '/',
  hostname: '127.0.0.1',
  port: 4723,
  logLevel: 'error',
  framework: 'mocha',
  reporters: [
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }]
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 400000,
    bail: true
  },
  capabilities: [],

  onPrepare: async() => {
    const originalLog = console.log;
    const fsExtra = require('fs-extra');

    console.log = (...args) => {
      const updatedArgs = args.map(arg =>
        typeof arg === 'string'
          ? arg.replace(/\[.*?\.(app|apk|ipa) (iOS|Android) #\d+-\d+\]/g, '[Mobile App]')
          : arg
      );
      originalLog(...updatedArgs);
    };

    const allureDir = path.resolve('./allure-results');
    const videoDir = path.resolve('./videos');

    if (fsExtra.existsSync(allureDir)) {
      fsExtra.emptyDirSync(allureDir);
      console.log('[WDIO] Cleared allure-results folder.');
    }

    if (fsExtra.existsSync(videoDir)) {
      fsExtra.emptyDirSync(videoDir);
      console.log('[WDIO] Cleared videos folder.');
    }
  },


  beforeTest: async function (test) {
    globalThis.currentTestTitle = test.title;
    if (!testLogs[test.title]) {
      testLogs[test.title] = [];
    }

    await driver.startRecordingScreen({
      timeLimit: 180, // restart every 3 min to avoid cutoff
      videoType: 'libx264',
    });
    console.log(`[VIDEO] Started recording for test: ${test.title}`);
  },

  afterTest: async function (test, context, { error, passed }) {
    try {
      const videoBase64 = await driver.stopRecordingScreen();
      const safeName = test.title.replace(/\W+/g, '_');
      const videoDir = path.resolve('./videos');
      const videoPath = path.join(videoDir, `${safeName}.mp4`);

      if (!fs.existsSync(videoDir)) {
        fs.mkdirSync(videoDir, { recursive: true });
      }

      fs.writeFileSync(videoPath, videoBase64, 'base64');
      console.log(`[VIDEO] Saved video for test "${test.title}" → ${videoPath}`);

      // Attach to Allure
      const videoBuffer = fs.readFileSync(videoPath);
      allure.addAttachment(`Video - ${test.title}`, videoBuffer, 'video/mp4');
    } catch (err) {
      console.error(`[VIDEO] Error saving video for test "${test.title}":`, err);
    }

    // Screenshot on failure
    if (!passed) {
      const screenshot = await browser.takeScreenshot();
      allure.addAttachment(
        'Failure Screenshot',
        Buffer.from(screenshot, 'base64'),
        'image/png'
      );
    }

    // Logs
    const logs = testLogs[test.title]?.join('\n') || 'No logs captured.';
    allure.addAttachment('Console Logs', logs, 'text/plain');
    delete globalThis.currentTestTitle;

    //  📱 Check app state (only if session still active)
    if (browser.isAndroid || browser.isIOS) {
        const bundleId = browser.isAndroid
            ? 'ie.jemstone.ronspot'
            : 'ie.jemstone.ronspot';

        const state = await AppCrashHandler.checkAppRunning(bundleId);

        if (state === 0 || state === 1) {
            console.error(`❌ App crash detected → state=${state}`);
            // fail test if needed
            // throw new Error(`App crashed: state=${state}`);
        }
    }
  },
  after: async function () {
    console.log('[WDIO] Finished run, videos attached per test.');
  },
};