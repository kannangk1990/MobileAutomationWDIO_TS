import 'dotenv/config';
import path from 'node:path';
import type { Options } from '@wdio/types';

export const appPath = process.env.MOBILE_APP_PATH || undefined;

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
  reporters: ['spec'],
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
};

export function localAppCapability(app: string | undefined): Record<string, string> {
  return app ? { 'appium:app': app } : {};
}
