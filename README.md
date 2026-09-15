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

The demo login test uses the installed Native Demo App flow: Login tab, email, password, LOGIN, and the Success alert. Configure `DEMO_LOGIN_EMAIL` and `DEMO_LOGIN_PASSWORD` in `.env` when using different non-production test data.

## Practice app

This workspace can use the WebdriverIO Native Demo App while you are learning. Download the current Android APK from the [WebdriverIO native-demo-app releases](https://github.com/webdriverio/native-demo-app/releases), place it under `apps/`, and set `ANDROID_APP_PATH`, `ANDROID_APP_PACKAGE=com.wdiodemoapp`, and `ANDROID_APP_ACTIVITY=.MainActivity` in `.env`. The local `.env` in this workspace is already configured for the installed demo APK. APK files are ignored by Git.

## Local Android

Install the Android SDK and ensure `adb` is available. Create and boot an emulator in Android Studio, then confirm it with `adb devices`. Set `ANDROID_DEVICE_NAME`, `ANDROID_PLATFORM_VERSION`, `ANDROID_APP_PACKAGE`, `ANDROID_APP_ACTIVITY`, and `ANDROID_APP_PATH` in `.env`.

`npm run test:android` starts Appium automatically through the WDIO Appium service. The app may be installed from `ANDROID_APP_PATH`, or you can omit that value when the app is already installed and identified by its package/activity.

## Local iOS

Install Xcode and its simulator runtimes, boot a simulator, and ensure `xcrun simctl list devices` can see it. Set `IOS_DEVICE_NAME`, `IOS_PLATFORM_VERSION`, `IOS_BUNDLE_ID`, and `IOS_APP_PATH` in `.env`.

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
npm run report:allure:generate # Generate the Allure HTML report
npm run report:allure   # Generate and open the Allure report
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
- Allure results for every WDIO run and screenshots attached to failed tests

## Verified local demo setup

The WebdriverIO Native Demo App has been verified locally on both simulators:

```bash
npm run test:android -- --spec tests/login/demo.login.spec.ts
npm run test:ios -- --spec tests/login/demo.login.spec.ts
```

The Android demo uses `com.wdiodemoapp` on the Pixel 10a emulator. The iOS simulator demo uses bundle ID `org.wdiodemoapp` on an iPhone 17 simulator. Local app artifacts belong in `apps/` and are ignored by Git. Use `ANDROID_APP_PATH` for an APK and `IOS_APP_PATH` for a simulator `.app`; do not reuse an Android APK for iOS.

## CI behavior

Every push and pull request runs the independent `static-validation` job for typechecking, lint, and formatting. Cloud execution is opt-in: create a repository variable named `RUN_CLOUD_TESTS` with value `true`, then add `CLOUD_USERNAME`, `CLOUD_ACCESS_KEY`, and `CLOUD_APP_ID` as repository secrets. Cloud runs upload `allure-results` and the generated `allure-report` as workflow artifacts, including reports from failed runs.

## Copilot agents

This repository includes focused VS Code custom agents under `.github/agents/`:

- `WDIO Requirements to Tests`: converts pasted requirements, acceptance criteria, Jira issues, or accessible Azure DevOps work-item links into traceable page objects and tests.
- `WDIO Test Author`: creates maintainable TypeScript page objects and Android/iOS test flows.
- `Mobile Debugger`: diagnoses ADB, emulator, Appium, WDIO, selector, and session failures.
- `Mobile Cross-Platform Reviewer`: reviews Android/iOS compatibility, flakiness, selectors, capabilities, and coverage.

Select an agent from the VS Code Chat agent picker. For Jira or Azure DevOps content that requires authentication, paste the requirement and acceptance criteria into chat instead of sharing credentials. Agents never need passwords, tokens, cookies, or `.env` contents.

### Sequential agent workflow

The agents use guided handoffs rather than running as an uncontrolled background chain:

```text
Requirements to Tests -> WDIO Test Author -> Cross-Platform Reviewer
									  \-> Mobile Debugger -> Cross-Platform Reviewer
```

To try the workflow, select `WDIO Requirements to Tests` and ask it to read `docs/examples/requirements/demo-login.md`. It analyzes the requirement without editing code, then automatically hands off to `WDIO Test Author`, which implements and validates the tests. A successful implementation automatically hands off to `Mobile Cross-Platform Reviewer`; if execution fails, choose `Diagnose Test Failure`, which automatically hands the repaired result to the reviewer.
