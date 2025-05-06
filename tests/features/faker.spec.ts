import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/registration.page';
import { generateCustomerData } from '../shared/fakerUtils';

test.describe('Parabank Registration with Faker.js', () => {
  let registrationPage: RegistrationPage;
  
  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigate();
  });

  test.afterEach(async () => {
    await registrationPage.logout();
  });

  test('Should Register a customer and Assert Welcome username', async () => {
    const customer = generateCustomerData();

    await test.step(`Register and verify customer: ${customer.username}`, async () => {

    await registrationPage.fillRegistrationForm(customer);

    await registrationPage.submitRegistrationForm();
    
    await registrationPage.verifyWelcomeMessage(customer.username);
    console.log(customer.username);
  });
  });
});