import { expect } from '@wdio/globals';

describe('mobile session', () => {
  it('starts a mobile automation session', async () => {
    await expect(browser.isMobile).toBe(true);
  });
});
