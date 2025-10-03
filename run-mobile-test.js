const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const [platform, name] = process.argv.slice(2);

if (!platform || !name) {
  console.error('❌ Usage: npm run test <web|ios|android|both|all> <test-name or file>');
  process.exit(1);
}

function checkDevice(platform) {
  if (platform === 'ios') {
    try {
      const realDeviceId = execSync('idevice_id -l').toString().trim();
      if (realDeviceId) {
        console.log(`✅ iOS Real device detected: ${realDeviceId}`);
        process.env.DEVICE_TYPE = 'real';
        return;
      }
    } catch {}

    try {
      const simBooted = execSync("xcrun simctl list devices | grep Booted").toString().trim();
      if (!simBooted) {
        console.error('❌ No connected iOS devices or booted simulators found.');
        process.exit(1);
      } else {
        console.log(`✅ iOS Simulator detected:\n${simBooted}`);
        process.env.DEVICE_TYPE = 'simulator';
        return;
      }
    } catch (err) {
      console.error('❌ Failed to check iOS simulators:', err.message);
      process.exit(1);
    }
  } else if (platform === 'android') {
    try {
      const adbOutput = execSync('adb devices').toString().trim();
      const devices = adbOutput
        .split('\n')
        .slice(1)
        .filter(line => line.trim() && !line.includes('offline'));

      if (devices.length === 0) {
        console.error('❌ No connected Android devices or emulators found via adb.');
        process.exit(1);
      } else {
        console.log(`✅ Android device(s)/emulator(s) detected:\n${devices.join('\n')}`);
        process.env.DEVICE_TYPE = 'android';
      }
    } catch (err) {
      console.error('❌ Failed to check Android devices:', err.message);
      process.exit(1);
    }
  }
}

// 🔍 Look for matching file or folder recursively
function findSpecFileOrFolder(dir, testName) {
  const fullCandidatePath = path.join(dir, testName);
  if (fs.existsSync(fullCandidatePath) && fs.lstatSync(fullCandidatePath).isFile()) {
    return fullCandidatePath;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.toLowerCase().includes(testName.toLowerCase())) {
        return fullPath;
      }
      const nested = findSpecFileOrFolder(fullPath, testName);
      if (nested) return nested;
    } else if (
      entry.isFile() &&
      entry.name.toLowerCase().includes(testName.toLowerCase()) &&
      entry.name.endsWith('.spec.ts')
    ) {
      return fullPath;
    }
  }

  return null;
}

// ▶️ Playwright web test
function runWebTest(testName) {
  const root = process.cwd();
  const testDir = path.join(root, 'Tests', 'Admin'); // ✅ updated from web → Admin
  const foundPath = findSpecFileOrFolder(testDir, testName);

  if (!foundPath) {
    console.error(`❌ Web test '${testName}' not found in ${testDir}`);
    process.exit(1);
  }

  const relativePath = path.relative(root, foundPath);
  const command = `npx playwright test ${relativePath}`;
  console.log(`▶️ Running: ${command}`);
  execSync(command, { stdio: 'inherit' });
}

// ▶️ Appium + WebdriverIO mobile test
function runMobileTest(platform, testName) {
  checkDevice(platform);

  const root = process.cwd();
  const testDir = path.join(root, 'Tests', 'mobile', platform);
  const foundPath = findSpecFileOrFolder(testDir, testName);

  if (!foundPath) {
    console.error(`❌ ${platform.toUpperCase()} test '${testName}' not found in ${testDir}`);
    process.exit(1);
  }

  const specPath = fs.lstatSync(foundPath).isDirectory()
    ? path.join(foundPath, '*.spec.ts')
    : foundPath;

  const relativePath = path.relative(root, specPath);
  const configFile = `wdio.${platform}.conf.ts`;
  const command = `npx wdio run ${configFile} --spec ${relativePath}`;

  console.log(`▶️ Running: ${command}`);
  execSync(command, { stdio: 'inherit' });
}

// 🌐 Main runner
(async () => {
  if (platform === 'all') {
    runWebTest(name);
    runMobileTest('ios', name);
    runMobileTest('android', name);
    return;
  }

  if (platform === 'both') {
    runMobileTest('ios', name);
    runMobileTest('android', name);
    return;
  }

  if (platform === 'web') {
    runWebTest(name);
  } else if (platform === 'ios' || platform === 'android') {
    runMobileTest(platform, name);
  } else {
    console.error('❌ Invalid platform. Use "web", "ios", "android", "both", or "all".');
    process.exit(1);
  }
})();
