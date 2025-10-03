import { error } from 'console';
import Logger from './LoggerMobile';

const logMap = new Map<number, typeof console.log>();
const originalConsoleLog = console.log;

beforeEach(function () {
  // const workerId = parseInt(process.env.WDIO_WORKER_ID || '0', 10) + 1;

  const testName = this.currentTest?.title || 'Unnamed Test';
  const describeTitle = this.currentTest?.parent?.title || 'Unnamed Describe';

  Logger.startTest(testName, describeTitle);

  // const prefix = `[Worker ${workerId}]`;

  // if (!logMap.has(workerId)) {
  //   logMap.set(workerId, console.log);
  // }

  // console.log = (...args: any[]) => {
  //   const needsPrefix = typeof args[0] !== 'string' || !args[0].startsWith(prefix);
  //   const finalArgs = needsPrefix ? [prefix, ...args] : args;
  //   logMap.get(workerId)?.(...finalArgs);
  // };
});

afterEach(function () {

  const testName = this.currentTest?.title || 'Unnamed Test';
  const describeTitle = this.currentTest?.parent?.title || 'Unnamed Describe';

  if (this.currentTest?.state === 'failed') {
    Logger.failTest(testName, describeTitle);
  } else if (this.currentTest?.state === 'passed') {
    Logger.passTest(testName, describeTitle);
  } else {
    console.log(`ℹ️ Test "${testName}" ended in unknown state: ${this.currentTest?.state}`);
  }

  const workerId = parseInt(process.env.WDIO_WORKER_ID || '0', 10) + 1;
  if (logMap.has(workerId)) {
    console.log = originalConsoleLog;
  }
});
