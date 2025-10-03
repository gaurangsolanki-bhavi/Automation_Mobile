
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

function getTimestamp() {
  const now = new Date();
  const datePart = now
    .toISOString()
    .replace(/T/, "-")
    .replace(/:/g, "-")
    .split(".")[0];
  const milliseconds = now.getMilliseconds().toString().padStart(3, "0");
  return `${datePart}-${milliseconds}`;
}

const timestampFolder = getTimestamp();
const logFolder = "./TestData/Logs"; // Folder to store log files

// Ensure log folder exists
if (!fs.existsSync(logFolder)) {
  fs.mkdirSync(logFolder, { recursive: true });
}

const logFilePath = path.join(logFolder, `test-log-${timestampFolder}.txt`);

// Function to log messages into the log file
function logMessage(message: string) {
  console.log(message); // Show message in the terminal
  fs.appendFileSync(logFilePath, message + "\n"); // Save message to file
}


// Global teardown function
export default async function globalTeardown() {
  //generateAllureReport();
}