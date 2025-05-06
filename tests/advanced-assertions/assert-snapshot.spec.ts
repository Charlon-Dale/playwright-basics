import { test, expect } from '@playwright/test';

test('Assert Aria Snapshot', async ({ page }) => {
  const loginURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
  await page.goto(loginURL);
  await expect(page).toHaveURL(loginURL);
  const loginPage = page.locator('#app');
  await expect(loginPage).toMatchAriaSnapshot(`
    - paragraph: "Username : Admin"
    - paragraph: "Password : admin123"
    - text:  Username
    - textbox "Username"
    - text:  Password
    - textbox "Password"
    - button "Login"
    - paragraph: Forgot your password?
    `);
});