/* import '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';
import { Status } from 'allure-js-commons';

export default class AppCrashHandler {

    static async checkAppRunning(bundleId: string) {
        try {
            const appState = await driver.queryAppState(bundleId);
            if (appState === 0 || appState === 1) {
                const errMsg = `❌ App has crashed during execution! (${bundleId})`;

                // // Take screenshot
                // const screenshot = await driver.takeScreenshot();
                // allureReporter.addAttachment(
                //     'App Crash Screenshot', 
                //     Buffer.from(screenshot, 'base64'), 
                //     'image/png'
                // );

                // // Add step with proper Status enum
                // allureReporter.addStep(errMsg, {}, Status.FAILED);

                throw new Error(errMsg);
            }
        } catch (err: any) {
            const errMsg = `❌ App crash detected: ${err.message}`;
            // try {
            //     const screenshot = await driver.takeScreenshot();
            //     allureReporter.addAttachment(
            //         'App Crash Screenshot', 
            //         Buffer.from(screenshot, 'base64'), 
            //         'image/png'
            //     );
            // } catch {}

            // allureReporter.addStep(errMsg, {}, Status.FAILED);
            throw new Error(errMsg);
        }
    }
} */


// import '@wdio/globals';

// export default class AppCrashHandler {

//     static async checkAppRunning(bundleId: string) {
//         let appState: number;

//         try {
//             appState = await driver.queryAppState(bundleId);
//         } catch (err: any) {
//             // If queryAppState fails, treat it as crash
//             throw new Error(`❌ App crash detected (queryAppState failed): ${err.message}`);
//         }

//         // Check if app is not running
//         if (appState === 0 || appState === 1) {
//             throw new Error(`❌ App has crashed during execution! (${bundleId})`);
//         }
//     }
// }

// import '@wdio/globals';

// export default class AppCrashHandler {
//    static async checkAppRunning(bundleId: string): Promise<void> {
//   if (!driver || !driver.sessionId) {
//     return; // ✅ no active session, skip check
//   }

//   if (driver.isAndroid) {
//     await driver.isAppInstalled(bundleId); // this will throw if crash
//   } else if (driver.isIOS) {
//     await driver.activateApp(bundleId);
//   }
//     }
// }

import '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';

export default class AppCrashHandler {

    /**
     * Check if app is running and throw error if crashed
     */
    static async checkAppRunning(bundleId: string): Promise<number | null> {
        try {
            if (!browser || !browser.sessionId) return null; // session ended → skip

            const state = await browser.queryAppState(bundleId);

            // Map numeric state to readable string
            const stateMap: Record<number, string> = {
                0: 'UNKNOWN',
                1: 'NOT_RUNNING',
                2: 'BACKGROUND_SUSPENDED',
                3: 'RUNNING_IN_BACKGROUND',
                4: 'RUNNING_IN_FOREGROUND',
            };

            const stateName = stateMap[state] || 'UNKNOWN';
            console.log(`[APP STATE] ${bundleId} → ${state} (${stateName})`);

            return state;
        } catch (err: unknown) {
            if (err instanceof Error) {
                if (err.message.includes('invalid session id') || err.message.includes('terminated')) {
                    console.warn('[APP STATE] Skipped check: session already ended');
                    return null;
                }
                console.error(`[APP STATE] Error checking app: ${err.message}`);
            } else {
                console.error('[APP STATE] Unknown error while checking app:', err);
            }
            return null;
        }
    }
}
