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
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
      'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '15',
      'appium:appPackage': process.env.ANDROID_APP_PACKAGE,
      'appium:appActivity': process.env.ANDROID_APP_ACTIVITY || '.MainActivity',
      'appium:autoGrantPermissions': true,
      'appium:newCommandTimeout': 180,
      ...localAppCapability(appPath),
    },
  ],
};

export default config;
