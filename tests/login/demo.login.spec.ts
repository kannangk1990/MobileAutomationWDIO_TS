import { expect } from '@wdio/globals';
import loginPage from '../../src/pages/login.page';

const demoEmail = process.env.DEMO_LOGIN_EMAIL || 'demo@example.com';
const demoPassword = process.env.DEMO_LOGIN_PASSWORD || 'demo-password';

describe('demo app login', () => {
  it('logs in with valid demo credentials', async () => {
    await loginPage.open();
    await loginPage.login(demoEmail, demoPassword);

    await loginPage.expectLoginSuccess();
    await expect(loginPage.successMessage).toHaveText('You are logged in!');
  });
});
