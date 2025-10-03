import { test as base, BrowserContext, Page, TestInfo } from '@playwright/test';
import { chromium } from '@playwright/test';
import Logger from './LoggerWeb';

export let context: BrowserContext;
export let page: Page;

type MyFixtures = {
  sharedContext: BrowserContext;
  sharedPage: Page;
};

const test = base.extend<MyFixtures>({
  sharedContext: async ({ }, use) => {
    const browser = await chromium.launch();
    context = await browser.newContext({
      storageState: 'storageState.json',
      recordVideo: {
        dir: './TestResults/Videos',
        size: { width: 1366, height: 768 },
      }
    });
    await use(context);
  },

  sharedPage: async ({ sharedContext }, use) => {
    page = await sharedContext.newPage();
    await use(page);
  },
});

// Store original console.log globally
const originalConsoleLog = console.log;

// Track console override per worker
const logMap = new Map<number, typeof console.log>();

test.beforeEach(async ({ }, testInfo: TestInfo) => {
  const titlePath = testInfo.titlePath;
  const testName = titlePath.at(-1) ?? 'Unnamed Test';
  const describeTitle = titlePath.slice(1, -1).join(' > ') || 'Unnamed Describe';

  Logger.startTest(testName, describeTitle);

  const workerId = testInfo.workerIndex + 1;
  const prefix = `[Worker ${workerId}]`;

  // Save original console if not already done for this worker
  if (!logMap.has(workerId)) {
    logMap.set(workerId, console.log);
  }

  // Override console.log with worker-specific prefix
  console.log = (...args: any[]) => {
    const needsPrefix = typeof args[0] !== 'string' || !args[0].startsWith(prefix);
    const finalArgs = needsPrefix ? [prefix, ...args] : args;
    logMap.get(workerId)?.(...finalArgs);
  };
});

// test.afterEach(async ({ }, testInfo: TestInfo) => {
//   const workerId = testInfo.workerIndex + 1;

//   // Restore original log for this worker
//   if (logMap.has(workerId)) {
//     console.log = originalConsoleLog;
//   }

//   const titlePath = testInfo.titlePath;
//   const testName = titlePath.at(-1) ?? 'Unnamed Test';
//   const describeTitle = titlePath.slice(1, -1).join(' > ') || 'Unnamed Describe';

//   if (testInfo.status === 'passed') {
//     Logger.passTest(testName, describeTitle);
//   } else {
//     Logger.failTest(testName, describeTitle, testInfo.error);
//   }
// });

test.afterEach(async ({ }, testInfo: TestInfo) => {
  const workerId = testInfo.workerIndex + 1;

  // Restore original log for this worker
  if (logMap.has(workerId)) {
    console.log = originalConsoleLog;
  }

  const titlePath = testInfo.titlePath;
  const testName = titlePath.at(-1) ?? 'Unnamed Test';
  const describeTitle = titlePath.slice(1, -1).join(' > ') || 'Unnamed Describe';

  if (testInfo.status === 'passed') {
    Logger.passTest(testName, describeTitle);
  } else {
    Logger.failTest(testName, describeTitle, testInfo.error);
  }

  // ✅ Attach video (if recorded)
  const video = await page.video();
  if (video) {
    const videoPath = await video.path();
    testInfo.attachments.push({
      name: 'video',
      path: videoPath,
      contentType: 'video/webm',
    });
  }

 // await page.close(); // Clean up page between tests
});

export { test };
