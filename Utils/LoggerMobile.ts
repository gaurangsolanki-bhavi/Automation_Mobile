export default class Logger {
  
  static startTest(testName: string, describeTitle: string) {
    console.log("-----------------------------------------------------");
    console.log(`📌 Test Suite: ${describeTitle} 📌`);
    console.log(`▶️   Start Test With Mobile Login ▶️`);
    console.log(`🔹 ${testName} 🔹`);
    console.log("-----------------------------------------------------");
  }

  static passTest(testName: string, describeTitle: string) {
    console.log("-----------------------------------------------------");
    console.log(`📌 Test Suite: ${describeTitle} 📌`);
    console.log(`✅ PASS Test Successfully ✅`);
    console.log(`🔹 ${testName} 🔹`);
    console.log("-----------------------------------------------------");
  }

  static failTest(testName: string, describeTitle: string) {
    console.log("-----------------------------------------------------");
    console.log(`📌 Test Suite: ${describeTitle} 📌`);
    console.error(`❌ ${testName} Test failed:`);
    console.log(`❌ Failed Test :${testName} 🔹`);
    console.log("-----------------------------------------------------");
  }
}
