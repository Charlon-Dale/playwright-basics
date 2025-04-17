import { test, expect } from "@playwright/test";

// Test Case / Scenario / Specification / Test Idea

//Thinking process for test automation
// Arrange / Act / Assert
// PW Tests runs in parallel
//#1 Rule: When running tests in parallel, tests should be able to run independently.

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(
    "Fast and reliable end-to-end testing for modern web apps | Playwright"
  );
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
