import { test, expect } from "@playwright/test";
//npx playwright test user-mngt.spec.ts --project chromium --repeat-each=30 --workers=10 -x
test.describe("User Management Test Suite", { tag: ['@Regression', '@Functional', '@Sprint-1'] }, () => {
  test.beforeEach("Navigate to Test URL", async ({ page }) => {
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    await page.getByRole("textbox", { name: "Username" }).fill("Admin");
    await page.getByRole("textbox", { name: "Password" }).fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();
  });
  test.afterEach("Do Logout", async ({ page }) => {
    await page.getByRole('banner').getByRole('img', { name: 'profile picture' }).click()
    //page.getByRole('banner')
    //await page.getByText('WtlOuZMVPaTest 12Test 52 Bravi').click()
    await page.getByRole('menuitem', { name: 'Logout' }).click();
  });

  test("Sidebar Navigations are Visible", { tag: '@UI-Testing' }, async ({ page }) => {
    test.step('Admin Sidebar is Visible', async () => {
      await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();
    });
    await test.step('PIM Sidebar is Visible', async () => {
      await expect(page.getByRole("link", { name: "PIM" })).toBeVisible();
    });  
    
  });

  test("Navigate to Admin", {
    tag: '@Smoke',
  }, async ({ page }) => {
    await page.getByRole("link", { name: "Admin" }).click();
    await expect(
      page.getByLabel("Topbar Menu").getByRole("list")
    ).toContainText("User Management");
  });
});