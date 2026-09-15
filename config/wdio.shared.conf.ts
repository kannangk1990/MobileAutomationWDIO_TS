import 'dotenv/config';
import path from 'node:path';
import type { Options } from '@wdio/types';

export const androidAppPath = process.env.ANDROID_APP_PATH || process.env.MOBILE_APP_PATH;
export const iosAppPath = process.env.IOS_APP_PATH || process.env.MOBILE_APP_PATH;

export type FrameworkConfig = Options.Testrunner & {
  capabilities: WebdriverIO.Capabilities[];
  autoCompileOpts: {
    autoCompile: boolean;
    tsNodeOpts: {
      transpileOnly: boolean;
      project: string;
    };
  };
};

export const sharedConfig: FrameworkConfig = {
  runner: 'local',
  specs: [path.resolve(process.cwd(), 'tests/**/*.ts')],
  exclude: [],
  maxInstances: 1,
  logLevel: (process.env.LOG_LEVEL as Options.Testrunner['logLevel']) || 'info',
  bail: 0,
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,
  framework: 'mocha',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: './tsconfig.json',
    },
  },
  services: [],
  capabilities: [],
  afterTest: async (_test, _context, result) => {
    if (!result.passed) {
      await browser.takeScreenshot();
    }
  },
};

export function localAppCapability(app: string | undefined): Record<string, string> {
  return app ? { 'appium:app': app } : {};
}
