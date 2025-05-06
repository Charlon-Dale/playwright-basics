import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  // Locators
  public readonly usernameInput: Locator;
  public readonly passwordInput: Locator;
  public readonly loginButton: Locator;
  public readonly swagLabsHeader: Locator;
  public readonly errorMessage: Locator;

  constructor(public readonly page: Page) {
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.swagLabsHeader = page.locator('text=Swag Labs');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigates to the login page.
   */
  async navigateTo(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Performs login with the provided username and password.
   * @param username - The username to login with.
   * @param password - The password to login with.
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Verifies that the login was successful by checking the header.
   */
  async verifyLoginSuccess(): Promise<void> {
    await this.page.addStyleTag({
      content: `
        *, *::before, *::after {
          transition: none !important;
          animation: none !important;
        }
      `
    });
    await expect(this.swagLabsHeader).toBeVisible();
    await expect(this.swagLabsHeader).toHaveText('Swag Labs');
  }

  /**
   * Verifies that the login error message is displayed and matches the expected message.
   * @param expectedErrorMessage - The expected error message.
   */
  async verifyLoginError(expectedErrorMessage: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedErrorMessage);
  }
}