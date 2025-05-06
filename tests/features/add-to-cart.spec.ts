import { test, expect } from '@playwright/test';

test('View Cart Page', async ({ page }) => {
  await page.goto('/cart.html');
  await page.waitForURL('https://www.saucedemo.com/cart.html');
});

test('Remove item from Cart', async ({ page }) => {
  await page.goto('/inventory.html');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.waitForURL('https://www.saucedemo.com/cart.html');
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="cart-contents-container"]')).toBeVisible();
});
/*
test('test', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/register.htm');
  await page.locator('[id="customer\\.firstName"]').fill('test');
  await page.locator('[id="customer\\.lastName"]').fill('regie');
  await page.locator('[id="customer\\.address\\.street"]').fill('marilao');
  await page.locator('[id="customer\\.address\\.city"]').fill('marilao');
  await page.locator('[id="customer\\.address\\.state"]').fill('bulacan');
  await page.locator('[id="customer\\.address\\.zipCode"]').fill('3019');
  await page.locator('[id="customer\\.phoneNumber"]').fill('123123123');
  await page.locator('[id="customer\\.ssn"]').fill('123456');
  await page.locator('[id="customer\\.username"]').fill('test');
});*/
