import { expect, Locator, Page } from '@playwright/test';


export class UserManagementPage {
  // Page and locators
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly usernameField: Locator;
 

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' })
    this.passwordInput = page.getByRole('textbox', { name: 'Password' })
    this.loginButton = page.getByRole('button', { name: 'Login' })
    this.usernameField = page.getByRole('textbox').nth(2)
  }

  // Navigate to the login page
  async navigateTo(): Promise<void> {
    await this.page.goto('/');
  }
  // Perform add User
  async addUser(user: any): Promise<void> {
      await this.usernameField.fill(user.username);
  }

  // Verify successful login by checking the header
  async verifyLoginSuccess(): Promise<void> {

  }

  // Verify login error message
  async verifyLoginError(expectedErrorMessage: string): Promise<void> {

  }
}