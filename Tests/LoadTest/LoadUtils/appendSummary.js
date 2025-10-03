const fs = require('fs');
const path = require('path');

const summaryFolder = '.';
const masterFile = 'master_summary.csv';

const files = fs
  .readdirSync(summaryFolder)
  .filter(f => f.startsWith('summary_') && f.endsWith('.csv'))
  .sort();

if (files.length === 0) {
  console.log('No summary files found.');
  process.exit(0);
}

let masterContent = '';
let masterHeader = '';
const defaultHeader = 'TestNameID,Date,Time,Users,PassPercent,FailPercent';

// Normalize function to ignore whitespace/case issues
const normalizeHeader = header =>
  header.trim().replace(/\s+/g, '').toLowerCase();

if (fs.existsSync(masterFile)) {
  masterContent = fs.readFileSync(masterFile, 'utf-8').trim();
  masterHeader = masterContent.split('\n')[0];
} else {
  masterHeader = defaultHeader;
  fs.writeFileSync(masterFile, masterHeader + '\n');
}

for (const file of files) {
  const filePath = path.join(summaryFolder, file);
  const content = fs.readFileSync(filePath, 'utf-8').trim();
  const lines = content.split('\n');

  const fileHeader = lines[0].trim();
  const dataLines = lines.slice(1);

  if (normalizeHeader(fileHeader) !== normalizeHeader(masterHeader)) {
    console.warn(`⚠️ Skipping ${file} due to header mismatch:\n  Expected: ${masterHeader}\n  Found:    ${fileHeader}`);
    continue;
  }

  fs.appendFileSync(masterFile, dataLines.join('\n') + '\n');
  fs.unlinkSync(filePath);
}
