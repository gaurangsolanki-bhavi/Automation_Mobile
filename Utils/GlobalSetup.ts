import { chromium, FullConfig } from "@playwright/test";
import fs from "fs";
import path from "path";

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Create a new page and navigate to a default URL if needed
  const page = await context.newPage();

  // Ensure storage state is saved
  await context.storageState({ path: "storageState.json" });

  // Close only the context, not the entire browser
  await context.close();
  await browser.close();

  console.log("Global setup completed. Storage state saved.");
  // 🧾 Extract environment info
  const project = config.projects[0];
  const use = project.use;
  const ENV = (process.env.ENV || '') as keyof typeof use;

  const envDetails = `
🔧 Test Environment Details
────────────────────────────
🧭 ENVIRMENT    : ${ENV}
🧭 BROWSER      : ${use.browserName}
⏱️  TIMESTAMP    : ${new Date().toISOString()}
`;

  // 📝 Save to a file for Jenkins email/logging
  fs.writeFileSync(path.join("env-details.txt"), envDetails.trim());

  // 🔄 Log to console for Jenkins pipeline logs
  console.log(envDetails);

   // 🆕 Create test-data.json with random/fresh data
  const testData = {
    zone: `Zone_${Math.floor(1000 + Math.random() * 9000)}`,
    env: ENV,
    browser: use.browserName,
    createdAt: new Date().toISOString(),
  };

  fs.writeFileSync(
    path.join("globalTestData.json"),
    JSON.stringify(testData, null, 2) // pretty-print JSON
  );

  //console.log("✅ Test data JSON created:", testData);

}

export default globalSetup;