import { test, expect } from '@playwright/test';
// npx playwright test toHaveScreenshot.spec.ts --project iphone12 --update-snapshots
test('Example Visual Testing', async ({ page }) => {

  //await page.setViewportSize({ width: 1920, height: 1080 });
  // - you can try this to other website https://www.saucedemo.com/
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
  await expect(page).toHaveScreenshot('labs-home.png', {
    maxDiffPixels: 100,
    threshold: 0.50,
    animations: 'disabled',
  });
});
