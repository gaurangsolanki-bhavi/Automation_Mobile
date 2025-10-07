import { config as shared } from './wdio.shared.conf';
import { execSync } from 'child_process';
import path from 'path';

// Utility: Get first connected Android device via ADB
function getConnectedDevice(): string {
  try {
    const output = execSync('adb devices')
      .toString()
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.endsWith('\tdevice'))
      .map(line => line.split('\t')[0]);

    if (output.length === 0) {
      console.error('❌ No connected Android devices found via ADB.');
      process.exit(1);
    }

    return output[0];
  } catch (err) {
    console.error('❌ Failed to execute adb devices command:', err);
    process.exit(1);
  }
}

// Utility: Get Android platform version for a given device ID
function getPlatformVersion(deviceId: string): string {
  try {
    const version = execSync(`adb -s ${deviceId} shell getprop ro.build.version.release`)
      .toString()
      .trim();
    return version;
  } catch (err) {
    console.error(`❌ Failed to get platform version for device ${deviceId}:`, err);
    process.exit(1);
  }
}

const dynamicDeviceName = getConnectedDevice();
const dynamicPlatformVersion = getPlatformVersion(dynamicDeviceName);
const appPath = path.join(__dirname, 'apps', 'app-debug.apk');

export const config = {
  ...shared,
  specs: ['./Tests/mobile/android/**/*.ts'],
  maxInstances: 1,
  capabilities: [
    {
      platformName: 'Android',
      'appium:platformVersion': dynamicPlatformVersion,
      'appium:deviceName': dynamicDeviceName,
      'appium:automationName': 'UiAutomator2',
      'appium:appPackage': 'ie.jemstone.ronspot',
      'appium:appActivity': 'ie.jemstone.ronspot.view.activities.SplashActivity',
      'appium:app': appPath,
      'appium:noReset': true,
      'appium:autoGrantPermissions': true,
      'appium:ignoreHiddenApiPolicyError': true,
      'appium:uiautomator2ServerLaunchTimeout': 120000,
      'appium:adbExecTimeout': 60000,                  // Wait longer for adb commands
      'appium:disableWindowAnimation': true     
    },
  ],
  services: [
    [
      'appium',
      {
        command: 'appium',
        args: {
          address: '127.0.0.1',
          port: 4723,
        },
      },
    ],
  ],
};
