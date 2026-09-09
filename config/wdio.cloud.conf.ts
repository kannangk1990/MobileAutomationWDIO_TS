import { sharedConfig, type FrameworkConfig } from './wdio.shared.conf';

const username = process.env.CLOUD_USERNAME;
const accessKey = process.env.CLOUD_ACCESS_KEY;
const platformName = process.env.CLOUD_PLATFORM_NAME || 'Android';
const isIos = platformName.toLowerCase() === 'ios';

if (!username || !accessKey || !process.env.CLOUD_APP_ID) {
  throw new Error(
    'Cloud execution requires CLOUD_USERNAME, CLOUD_ACCESS_KEY, and CLOUD_APP_ID. Copy .env.example to .env and configure them.',
  );
}

export const config: FrameworkConfig = {
  ...sharedConfig,
  protocol: 'https:',
  hostname: 'hub-cloud.browserstack.com',
  port: 443,
  path: '/wd/hub',
  user: username,
  key: accessKey,
  services: [],
  capabilities: [
    {
      platformName,
      'appium:automationName': isIos ? 'XCUITest' : 'UiAutomator2',
      'appium:deviceName':
        process.env.CLOUD_DEVICE_NAME || (isIos ? 'iPhone 16' : 'Google Pixel 9'),
      'appium:platformVersion': process.env.CLOUD_PLATFORM_VERSION || (isIos ? '18' : '15'),
      'appium:app': process.env.CLOUD_APP_ID,
      'bstack:options': {
        projectName: process.env.CLOUD_PROJECT || 'mobile-wdio-ts',
        buildName: process.env.CLOUD_BUILD || 'local-build',
        sessionName: 'mobile smoke test',
        debug: true,
        networkLogs: true,
      },
    },
  ],
};

export default config;
