// summary.js
export function createHandleSummary(testFileName, usersLength) {
  return function handleSummary(data) {
    const now = new Date();

    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const time = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes} ${hours < 12 ? 'am' : 'pm'}`;
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const date = `${day}/${month}/${year}`;

    const checksMetric = data.metrics.checks || {};
    const passes = checksMetric.passes || (checksMetric.values && checksMetric.values.passes) || 0;
    const fails = checksMetric.fails || (checksMetric.values && checksMetric.values.fails) || 0;

    const totalChecks = passes + fails;
    const passPercent = totalChecks > 0 ? ((passes / totalChecks) * 100).toFixed(2) : '0.00';
    const failPercent = totalChecks > 0 ? ((fails / totalChecks) * 100).toFixed(2) : '0.00';

    const runId = Date.now();
    const csvHeaders = 'TestNameID,Date,Time,Users,PassPercent,FailPercent\n';
    const csvRow = `${testFileName},${date},${time},${usersLength},${passPercent},${failPercent}`;

    const filename = `summary_${runId}.csv`;

    // Print detailed console summary like k6 output
    console.log('\n================ SUMMARY ================\n');
    console.log(`📄 Test: ${testFileName}`);
    console.log(`📅 Date: ${date}`);
    console.log(`⏰ Time: ${time}`);
    console.log(`👥 VUs: ${usersLength}`);
    console.log(`✅ Checks Passed: ${passes}`);
    console.log(`❌ Checks Failed: ${fails}`);
    console.log(`📊 Pass %: ${passPercent}%`);
    console.log(`📉 Fail %: ${failPercent}%\n`);

    console.log('📌 Thresholds:');
    for (const [name, threshold] of Object.entries(data.thresholds || {})) {
      const ok = threshold.ok ? '✓ PASSED' : '✗ FAILED';
      console.log(`  • ${name}: ${ok}`);
    }

    console.log('\n📌 Checks:');
    for (const check of data.root_group.checks) {
      console.log(`  • ${check.name}: ${check.passes}/${check.passes + check.fails} (${((check.passes / (check.passes + check.fails)) * 100).toFixed(1)}%)`);
    }

    console.log('\n=========================================\n');

    return {
      [filename]: csvHeaders + csvRow,
    };
  };
}

// export function createHandleSummary(testFileName, usersLength) {
//   return function handleSummary(data) {
//     const now = new Date();

//     const hours = now.getHours();
//     const minutes = String(now.getMinutes()).padStart(2, '0');
//     const time = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes} ${hours < 12 ? 'am' : 'pm'}`;
//     const day = String(now.getDate()).padStart(2, '0');
//     const month = String(now.getMonth() + 1).padStart(2, '0');
//     const year = now.getFullYear();
//     const date = `${day}/${month}/${year}`;

//     const checksMetric = data.metrics.checks || {};
//     const passes = checksMetric.passes || (checksMetric.values && checksMetric.values.passes) || 0;
//     const fails = checksMetric.fails || (checksMetric.values && checksMetric.values.fails) || 0;

//     const totalChecks = passes + fails;
//     const passPercent = totalChecks > 0 ? ((passes / totalChecks) * 100).toFixed(2) : '0.00';
//     const failPercent = totalChecks > 0 ? ((fails / totalChecks) * 100).toFixed(2) : '0.00';

//     const allThresholds = data?.thresholds || {};

//     // ✅ Fixed logic: Detect both top-level and nested threshold failures
//     const crossed = Object.entries(allThresholds)
//       .filter(([_, t]) => {
//         if (t?.ok === false) return true;
//         if (t?.thresholds) {
//           return Object.values(t.thresholds).some(v => v === false);
//         }
//         return false;
//       })
//       .map(([name]) => name);

//     const crossedStatus = crossed.length > 0 ? crossed.join(', ') : '✓ All thresholds passed';

//     console.log(`📌 Thresholds crossed status: ${crossedStatus}`);

//     const runId = Date.now();
//     const csvHeaders = 'TestNameID,Date,Time,Users,PassPercent,FailPercent,ThresholdStatus\n';
//     const csvRow = `${testFileName},${date},${time},${usersLength},${passPercent},${failPercent},"${crossedStatus}"\n`;

//     const filename = `summary_${runId}.csv`;

//     console.log('\n================ SUMMARY ================\n');
//     console.log(`📄 Test: ${testFileName}`);
//     console.log(`📅 Date: ${date}`);
//     console.log(`⏰ Time: ${time}`);
//     console.log(`👥 VUs: ${usersLength}`);
//     console.log(`✅ Checks Passed: ${passes}`);
//     console.log(`❌ Checks Failed: ${fails}`);
//     console.log(`📊 Pass %: ${passPercent}%`);
//     console.log(`📉 Fail %: ${failPercent}%`);
//     console.log(`📌 Threshold Status: ${crossedStatus}\n`);

//     console.log('📌 Thresholds:');
//     for (const [name, threshold] of Object.entries(allThresholds)) {
//       let ok = threshold.ok;
//       if (typeof ok === 'undefined' && threshold.thresholds) {
//         const failed = Object.values(threshold.thresholds).some(v => v === false);
//         ok = !failed;
//       }
//       const status = ok ? '✓ PASSED' : '✗ FAILED';
//       console.log(`  • ${name}: ${status}`);
//     }

//     console.log('\n📌 Checks:');
//     for (const check of data.root_group.checks || []) {
//       const total = check.passes + check.fails;
//       const rate = total > 0 ? ((check.passes / total) * 100).toFixed(1) : '0.0';
//       console.log(`  • ${check.name}: ${check.passes}/${total} (${rate}%)`);
//     }

//     console.log('\n=========================================\n');

//     return {
//       [filename]: csvHeaders + csvRow,
//     };
//   };
// }
