import { $ } from '@wdio/globals';

class LoginPage {
  get loginTab() {
    return $('~Login');
  }

  get usernameInput() {
    return $('~input-email');
  }

  get passwordInput() {
    return $('~input-password');
  }

  get submitButton() {
    return browser.isAndroid ? $('android=new UiSelector().text("LOGIN")') : $('~LOGIN');
  }

  get successAlert() {
    return browser.isAndroid ? $('android=new UiSelector().text("Success")') : $('~Success');
  }

  get successMessage() {
    return browser.isAndroid
      ? $('android=new UiSelector().text("You are logged in!")')
      : $('~You are logged in!');
  }

  async open(): Promise<void> {
    await this.loginTab.click();
    await this.usernameInput.waitForDisplayed();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.submitButton.click();
  }

  async expectLoginSuccess(): Promise<void> {
    await this.successAlert.waitForDisplayed();
    await this.successMessage.waitForDisplayed();
  }
}

export default new LoginPage();
