const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const [platform, name] = process.argv.slice(2);

if (!platform || !name) {
  console.error('❌ Usage: npm run test:android:sauce android <test-name>');
  process.exit(1);
}

function findSpecFileOrFolder(dir, testName) {
  const fullCandidatePath = path.join(dir, testName);
  if (fs.existsSync(fullCandidatePath) && fs.lstatSync(fullCandidatePath).isFile()) {
    return fullCandidatePath;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
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

// Sauce Labs Android run
function runSauceAndroidTest(testName) {
  const root = process.cwd();
  const testDir = path.join(root, 'Tests', 'mobile', 'android');
  const foundPath = findSpecFileOrFolder(testDir, testName);

  if (!foundPath) {
    console.error(`❌ Android test '${testName}' not found in ${testDir}`);
    process.exit(1);
  }

  const relativePath = path.relative(root, foundPath);
  const configFile = `wdio.android.sauce.conf.ts`;
  const command = `npx wdio run ${configFile} --spec ${relativePath}`;

  console.log(`🚀 Running on Sauce Labs: ${command}`);
  execSync(command, { stdio: 'inherit' });
}

if (platform === 'android') {
  runSauceAndroidTest(name);
} else {
  console.error('❌ Only Android supported for Sauce run right now.');
  process.exit(1);
}
