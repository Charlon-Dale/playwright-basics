import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.getByText("Swag Labs")).toBeVisible();
  await expect(page.locator('[data-test="primary-header"]')).toContainText(
    "Swag Labs"
  );
  await page.screenshot({
    path: "test/screenshots/login-success.png",
    fullPage: true,
  });
});
