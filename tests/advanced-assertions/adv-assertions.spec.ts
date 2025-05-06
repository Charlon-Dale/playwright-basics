/***
 * Auto-retrying assertions - are the most commonly used in Playwright because they handle asynchronous behavior gracefully.
 * Non-retrying assertions - are useful when you need immediate checks without waiting.
 * Negating matchers - are great for ensuring something is not true.
 * Soft assertions - are helpful when you want to continue execution even if some assertions fail.
 * Custom expect messages improve the readability of test failures.
 *
 * */
import { test, expect } from "@playwright/test";

test("Advanced assertions example with Sauce Demo", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  // 1. Auto-retrying assertion
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();

  // 2. Non-retrying assertion + negating matchers
  const UsernameField = page.locator('[data-test="username"]');
  expect(UsernameField).not.toBeNull();

  // 3. Negating matcher
  await expect(page.getByRole("button", { name: "Login" })).not.toHaveText("Sign In");

  // 4. Soft assertions
  await expect.soft(page.getByPlaceholder("Username")).toBeVisible();
  await expect.soft(page.getByPlaceholder("Password")).toBeVisible();

  // 5. Custom expect message
  await expect
  (page.getByText("Accepted usernames are:")
  ,'Expected the page to display the "Accepted usernames" text')
  .toBeVisible();

  // Continue with other actions
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  // Verify login success
  await expect(page.getByText("Products")).toBeVisible();

  // non-retrying assertions
  expect(page.getByText("$29.99")).not.toBeEmpty();

  //auto-retrying
  const value1 = page.getByText("$29.99");
  expect(value1).toHaveText("$29.99");

   // non-retrying assertions
  const value = await page.getByText("$29.99").textContent();
  const stringValue = value;
  console.log(stringValue);
  expect(stringValue).toHaveLength(6);
});

  