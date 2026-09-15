# Demo Login Requirement

## User story

As a user of the mobile demo application, I want to submit valid login details so that I can reach the secure area.

## Acceptance criteria

1. Given the login screen is displayed, the user can enter a valid username and password.
2. When the user submits the credentials, the application navigates to the secure area.
3. The secure area displays a visible confirmation that login succeeded.
4. The test must use stable accessibility identifiers where they are available.
5. The test must run against the Android demo app and keep the test intent reusable for iOS.

## Test data

Use non-production demo credentials supplied by the application or test environment. Do not hard-code real credentials.

## Expected workflow

Requirements to Tests -> WDIO Test Author -> Cross-Platform Reviewer

If execution fails, use Mobile Debugger before the final review.
