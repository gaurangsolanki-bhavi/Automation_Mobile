export default class Logger {
  static startTest(testName: string, describeTitle: string) {
    console.log("\n-----------------------------------------------------");
    console.log(`📌 Test Suit: ${describeTitle} 📌`);
    console.log(`▶️   Start Test With Member Login   ▶️`);
    console.log(`🔹 ${testName} 🔹`);
    console.log("-----------------------------------------------------");
  }

  static passTest(testName: string, describeTitle: string) {
    console.log("\n-----------------------------------------------------");
    console.log(`📌 Test Suit: ${describeTitle} 📌`);
    console.log(`✅ PASS Test Successfully ✅`);
    console.log(`🔹${testName} 🔹`);
    console.log("-----------------------------------------------------");
  }

  static failTest(testName: string, describeTitle: string, error: any) {
    console.log("\n-----------------------------------------------------");
    console.log(`📌 Test Suit: ${describeTitle} 📌`);
    console.error(`❌ ${testName} Test failed:`, error?.message || error);
    console.log(`🔹 ${testName} 🔹`);
    console.log("-----------------------------------------------------");
  }
}
