import { test } from "../shared/base";
import customers from "../../test-data/customers.json";

test.describe("Registration Test Suites",{ tag: ["@Data-Driven", "@Regression", "@Sprint-1", "@High-Priority"] },() => {
    
    test.beforeEach(async ({ registrationPage }) => {
        await registrationPage.navigate();
    });

    test("Should Register multiple customers and Assert Welcome username", {tag: "@Happy-Path"}, async ({ registrationPage }) => {
      for (const customer of customers) {
        await test.step(`Register and verify customer: ${customer.username}`, async () => {
          // Fill out the registration form
          await registrationPage.fillRegistrationForm(customer);

          // Submit the form
          await registrationPage.submitRegistrationForm();

          // Verify the welcome message
          await registrationPage.verifyWelcomeMessage(customer.username);

          // Log out and go back to the registration page
          await registrationPage.logout();
          await registrationPage.navigate();
        });
      }
    });
  }
);
