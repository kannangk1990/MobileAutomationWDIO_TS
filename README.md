# Mobile WDIO TypeScript Framework

A cross-platform mobile automation starter using WebdriverIO 9, Appium 3, Mocha, and TypeScript. The same tests can run against a local Android emulator, a local iOS simulator, or a cloud device provider.

## Prerequisites

- Node.js 20.19+ and npm 10+
- Android: Android Studio, SDK Platform Tools (`adb`), an emulator, and an APK/AAB test build
- iOS: Xcode, Command Line Tools, an iOS Simulator, and an `.app` or `.ipa` test build
- Cloud: an account and uploaded app identifier for a provider such as BrowserStack

The framework dependencies are already installed in this directory. For a new checkout, run `npm ci`.

## Quick start

1. Copy `.env.example` to `.env` and set the app path and platform values.
2. Start an Android emulator or iOS simulator.
3. Run `npm run typecheck`.
4. Run `npm run test:android` or `npm run test:ios`.

The example smoke test only verifies that a mobile session starts. Replace it with product behavior tests under `tests/` and page objects under `src/pages/`.

## Practice app

This workspace can use the WebdriverIO Native Demo App while you are learning. Download the current Android APK from the [WebdriverIO native-demo-app releases](https://github.com/webdriverio/native-demo-app/releases), place it under `apps/`, and set `MOBILE_APP_PATH`, `ANDROID_APP_PACKAGE=com.wdiodemoapp`, and `ANDROID_APP_ACTIVITY=.MainActivity` in `.env`. The local `.env` in this workspace is already configured for the installed demo APK. APK files are ignored by Git.

## Local Android

Install the Android SDK and ensure `adb` is available. Create and boot an emulator in Android Studio, then confirm it with `adb devices`. Set `ANDROID_DEVICE_NAME`, `ANDROID_PLATFORM_VERSION`, `ANDROID_APP_PACKAGE`, `ANDROID_APP_ACTIVITY`, and `MOBILE_APP_PATH` in `.env`.

`npm run test:android` starts Appium automatically through the WDIO Appium service. The app may be installed from `MOBILE_APP_PATH`, or you can omit that value when the app is already installed and identified by its package/activity.

## Local iOS

Install Xcode and its simulator runtimes, boot a simulator, and ensure `xcrun simctl list devices` can see it. Set `IOS_DEVICE_NAME`, `IOS_PLATFORM_VERSION`, `IOS_BUNDLE_ID`, and `MOBILE_APP_PATH` in `.env`.

`npm run test:ios` starts Appium with the XCUITest driver. iOS automation requires a macOS host; real devices additionally require signing, provisioning, and a trusted device connection.

## Cloud execution

The cloud profile is BrowserStack-compatible and uses W3C capabilities. Set `CLOUD_USERNAME`, `CLOUD_ACCESS_KEY`, and `CLOUD_APP_ID` in `.env`, then run `npm run test:cloud:android` or `npm run test:cloud:ios`. Set `CLOUD_PLATFORM_NAME`, `CLOUD_DEVICE_NAME`, and `CLOUD_PLATFORM_VERSION` for the chosen device. Keep credentials in environment variables or CI secrets, never in source control.

To use another provider, keep the test and page-object layers unchanged and adapt only `config/wdio.cloud.conf.ts` for that provider's hostname, authentication, app reference, and capability namespace.

## Project layout

```text
config/       WDIO profiles and shared runner defaults
src/pages/    Page objects and reusable screen components
tests/        Mocha specs
.github/      CI workflow
.env.example  Configuration template
```

## Useful commands

```bash
npm run typecheck       # TypeScript validation
npm run lint            # ESLint validation
npm run format:check    # Formatting validation
npm run test:android    # Local Android
npm run test:ios        # Local iOS
npm run test:cloud      # Cloud Android example
npm run appium          # Run Appium manually when debugging
```

## Automation practices built in

- W3C Appium capabilities with platform-specific profiles
- Environment-driven configuration with no secrets in code
- Page objects to keep selectors out of test intent
- Accessibility-id selectors in the example page object
- Explicit waits through WDIO element commands instead of fixed sleeps
- Strict TypeScript and CI typechecking
- Single-instance defaults for device stability; scale out in CI with a device matrix
- Appium logs and WDIO spec output available directly in CI logs
