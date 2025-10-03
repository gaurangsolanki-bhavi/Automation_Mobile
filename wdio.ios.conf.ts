import { config as shared } from './wdio.shared.conf';
import { execSync, spawn } from 'child_process';
import path from 'path';
import { ChildProcess } from 'child_process';

let appiumProcess: ChildProcess;

// 🔍 Get connected real device (via idevice_id)
function getRealDeviceUDID(): string | null {
  try {
    const output = execSync('idevice_id -l').toString().trim().split('\n').filter(Boolean);
    return output.length ? output[0] : null;
  } catch {
    return null;
  }
}

// 🔍 Get booted simulator UDID (via simctl)
function getBootedSimUDID(): string | null {
  try {
    const output = execSync("xcrun simctl list devices | grep Booted").toString();
    const match = output.match(/\(([^)]+)\) \(Booted\)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

// 🧠 Get version using ideviceinfo or simctl
function getIOSPlatformVersion(udid: string, isReal: boolean): string {
  try {
    if (isReal) {
      return execSync(`ideviceinfo -u ${udid} -k ProductVersion`).toString().trim();
    } else {
      const output = execSync(`xcrun simctl list devices`).toString();
      const match = output.match(new RegExp(`${udid} \\(Booted\\).*?\\((.*?)\\)`));
      return match ? match[1] : '17.5'; // fallback to known version if not found
    }
  } catch (err) {
    console.error(`❌ Failed to get iOS version for ${isReal ? 'device' : 'simulator'} ${udid}:`, err);
    process.exit(1);
  }
}

// 📱 Get device name
function getIOSDeviceName(udid: string, isReal: boolean): string {
  try {
    return isReal
      ? execSync(`ideviceinfo -u ${udid} -k DeviceName`).toString().trim()
      : execSync(`xcrun simctl list devices | grep ${udid}`).toString().split('(')[0].trim();
  } catch (err) {
    console.error(`❌ Failed to get device name for ${isReal ? 'device' : 'simulator'} ${udid}:`, err);
    process.exit(1);
  }
}

// ✅ Determine which device is connected
const realUDID = getRealDeviceUDID();
const simUDID = getBootedSimUDID();
const isReal = !!realUDID;
const udid = isReal ? realUDID! : simUDID;

if (!udid) {
  console.error('❌ No real iOS device or booted simulator detected.');
  process.exit(1);
}

const iosPlatformVersion = getIOSPlatformVersion(udid, isReal);
const iosDeviceName = getIOSDeviceName(udid, isReal);

// 📦 Select correct app file
const appPath = path.join(__dirname, 'apps', isReal ? 'RonSpot_Staging.ipa' : 'RonSpot_Staging.app');

export const config = {
  ...shared,
  specs: ['./Tests/mobile/ios/**/*.ts'],
  maxInstances: 1,
  capabilities: [
    {
      'platformName': 'iOS',
      'appium:platformVersion': iosPlatformVersion,
      'appium:deviceName': iosDeviceName,
      'appium:udid': udid,
      'appium:automationName': 'XCUITest',
      'appium:bundleId': 'ie.jemstone.ronspot',
      'appium:app': appPath,
      'appium:noReset': true,
      'appium:autoAcceptAlerts': true,
      'appium:xcodeSigningId': 'iPhone Developer',
      'appium:updatedWDABundleId': 'ie.jemstone.ronspot.WebDriverAgentRunner',
      'appium:usePrebuiltWDA': true,
      'appium:includeSafariInWebviews': true,
      'appium:newCommandTimeout': 3600,
      'appium:connectHardwareKeyboard': true,
      'appium:xcodeOrgId': 'bhawik.lalwani@bhavitechnologies.com',
      'appium:showXcodeLog': true,
      // 'appium:skipServerInstallation': true,
      // 'appium:autoLaunch': false,
      // 'appium:useNewWDA': false,
      'appium:realDevice': isReal,
      // Optional: more stability
      'appium:wdaStartupRetries': 2,
      'appium:wdaStartupRetryInterval': 20000
    },
  ],
  // onPrepare: async () => {
  //   if (!isReal) {
  //     console.log('🚀 Starting Appium server (Simulator only)...');
  //     appiumProcess = spawn('npx', ['appium', '--port', '4723', '--relaxed-security'], {
  //       stdio: 'ignore',
  //       shell: true,
  //     });
 
  //     await new Promise(res => setTimeout(res, 5000));
  //     console.log('✅ Appium server started on port 4723');
  //   } else {
  //     console.log('⚡ Real device detected, expecting Appium to be started externally.');
  //   }
  // },
 
  // onComplete: async () => {
  //   if (!isReal && appiumProcess) {
  //     console.log('🛑 Stopping Appium server (Simulator only)...');
  //     appiumProcess.kill('SIGINT');
  //     console.log('✅ Appium server stopped');
  //   }
  // }
};