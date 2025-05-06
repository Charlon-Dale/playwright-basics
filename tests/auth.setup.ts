import { test as setup } from "@playwright/test";
import { STORAGE_STATE } from "../playwright.config.ts";
import { LoginPage } from "../tests/pages/login.page.ts"; // Page Object Model Design Pattern

import { expect } from "@playwright/test";
//npx playwright test auth.setup.ts --repeat-each=100 --workers=10 -x

/**
 * This is a setup file for the login test. It will navigate to the login page, fill in the username and password, and click the login button.
 */
setup("Do Login", async ({ page }) => {
  //   let loginPage: LoginPage;
  //   loginPage = new LoginPage(page);
  //   await loginPage.navigateTo();

  //   await loginPage.login(
  //     process.env.SAUCE_USERNAME!,
  //     process.env.SAUCE_PASSWORD!
  //   );

  await page
    .locator('[data-test="username"]')
    .fill(process.env.SAUCE_USERNAME!);
  await page
    .locator('[data-test="password"]')
    .fill(process.env.SAUCE_PASSWORD!);
  await page.locator('[data-test="login-button"]').click();

  await page.waitForURL("https://www.saucedemo.com/inventory.html");

  await page.locator("text=Swag Labs").waitFor({ state: "visible" });
  //   await expect(page.locator("text=Swag Labs")).toBeVisible();

  //   await LoginPage.verifyLoginSuccess();

  await page.context().storageState({ path: STORAGE_STATE });
});
