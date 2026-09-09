import {
  appPath,
  localAppCapability,
  sharedConfig,
  type FrameworkConfig,
} from './wdio.shared.conf';

export const config: FrameworkConfig = {
  ...sharedConfig,
  services: [['appium', { command: 'appium', args: { basePath: '/wd/hub' } }]],
  port: 4723,
  path: '/wd/hub',
  capabilities: [
    {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 16',
      'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '18.5',
      'appium:bundleId': process.env.IOS_BUNDLE_ID,
      'appium:newCommandTimeout': 180,
      ...localAppCapability(appPath),
    },
  ],
};

export default config;
