import { $ } from '@wdio/globals';

class LoginPage {
  get usernameInput() {
    return $('~login-username');
  }

  get passwordInput() {
    return $('~login-password');
  }

  get submitButton() {
    return $('~login-submit');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.submitButton.click();
  }
}

export default new LoginPage();
