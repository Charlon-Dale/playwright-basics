import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;

  // Locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatedPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly welcomeMessage: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // -> Initialize locators
    this.firstNameInput = page.locator('input[id="customer.firstName"]');
    this.lastNameInput = page.locator('input[id="customer.lastName"]');
    this.addressInput = page.locator('input[id="customer.address.street"]');
    this.cityInput = page.locator('input[id="customer.address.city"]');
    this.stateInput = page.locator('input[id="customer.address.state"]');
    this.zipCodeInput = page.locator('input[id="customer.address.zipCode"]');
    this.phoneNumberInput = page.locator('input[id="customer.phoneNumber"]');
    this.ssnInput = page.locator('input[id="customer.ssn"]');
    this.usernameInput = page.locator('input[id="customer.username"]');
    this.passwordInput = page.locator('input[id="customer.password"]');
    this.repeatedPasswordInput = page.locator('input[id="repeatedPassword"]');
    this.registerButton = page.locator('input[value="Register"]');
    this.welcomeMessage = page.locator('h1.title');
    this.logoutLink = page.locator('text=Log Out');
  }

  async navigate() {
    await this.page.goto('https://parabank.parasoft.com/parabank/register.htm');
  }

  // Fill out the registration form
  async fillRegistrationForm(customer: any) {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.addressInput.fill(customer.address);
    await this.cityInput.fill(customer.city);
    await this.stateInput.fill(customer.state);
    await this.zipCodeInput.fill(customer.zipCode);
    await this.phoneNumberInput.fill(customer.phoneNumber);
    await this.ssnInput.fill(customer.ssn);
    await this.usernameInput.fill(customer.username);
    await this.passwordInput.fill(customer.password);
    await this.repeatedPasswordInput.fill(customer.password);
  }

  // Submit the registration form
  async submitRegistrationForm() {
    await this.registerButton.click();
  }

  // Verify the welcome message
  async verifyWelcomeMessage(username: string) {
    await expect(this.welcomeMessage).toContainText(`Welcome ${username}`);
  }

  // Log out
  async logout() {
    await this.logoutLink.click();
  }
}