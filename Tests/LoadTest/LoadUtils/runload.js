import { execSync } from 'child_process';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testFileName = process.argv[2];
if (!testFileName) {
  console.error('Usage: node runload.js <TestFileName.js or full path>');
  process.exit(1);
}

const isFullPath = testFileName.includes('\\') || testFileName.includes('/');
const testPath = isFullPath ? testFileName : join(__dirname, '..', testFileName);

// Validate test file exists
if (!fs.existsSync(testPath)) {
  console.error(`Test file does not exist: ${testPath}`);
  process.exit(1);
}

let testFailed = false;

console.log(`Running k6 test: ${testPath}`);

try {
  execSync(`k6 run "${testPath}"`, { stdio: 'inherit' });
} catch (error) {
  console.error('K6 test failed or thresholds breached.');
  testFailed = true;
}

// Always run appendSummary
try {
  const summaryScript = join(__dirname, 'appendSummary.js');
  if (!fs.existsSync(summaryScript)) {
    throw new Error(`appendSummary.js not found at ${summaryScript}`);
  }

  console.log('Running appendSummary.js...');
  execSync(`node "${summaryScript}" "${testFileName}" "${testFailed}"`, { stdio: 'inherit' });
} catch (error) {
  console.error('Error while appending summary:', error.message);
}

if (testFailed) {
  process.exit(1);
}
