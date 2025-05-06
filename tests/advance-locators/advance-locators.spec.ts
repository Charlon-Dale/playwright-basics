import { test, expect } from "@playwright/test";

test.describe("Pokemon Table Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8080/table");
  });

  test("Should show pokemon data in table", async ({ page }) => {

    const firstRow = page.locator('[data-testid^="pokemon-row-"]').first(); // ^ = starts with
    await firstRow.waitFor({ state: 'visible' });
    await expect(firstRow).toBeVisible();
    
    // Get the last row
    const lastRow = page.locator('[data-testid^="pokemon-row-"]').last();
    await lastRow.waitFor({ state: 'visible' });
    await expect(lastRow).toBeVisible();
    
    // Get the 5th row (nth(4) because counting starts at 0) 
    // Chaining of Locators - fifthrow and cells variable 
    const fifthRow = page.locator('[data-testid^="pokemon-row-"]').nth(4);
    await fifthRow.waitFor({ state: 'visible' });
    await expect(fifthRow).toBeVisible();
    const cells = await fifthRow.locator('td').allTextContents();
    const formattedOutput = cells.join(' | ');
    console.log('Row cells:', formattedOutput);
  });
  
  test('Should filter pokemon when searching', async ({ page }) => {
    // Find search box and type "pikachu"
    await page.locator('[data-testid="search-input"]').fill('pikachu');
    
    // Check only matching rows show
    const rows = page.locator('[data-testid^="pokemon-row-"]');
    await rows.waitFor({ state: 'visible' });
    await expect(rows).toHaveCount(1);
    await expect(rows).toHaveText(/Pikachu/); // Use Regex to match a particular Text
  });
  test('Should sort by name when clicking header', async ({ page }) => {
    
    await page.locator('[data-testid="name-header"]').click();
    
    // Get name from first row after sorting
    const firstRow = page.locator('[data-testid^="pokemon-row-"]').first();
    const firstName = await firstRow.locator('[data-testid^="name-cell-"]').textContent();
    
    // Get name from last row after sorting
    const lastRow = page.locator('[data-testid^="pokemon-row-"]').last();
    const lastName = await lastRow.locator('[data-testid^="name-cell-"]').textContent();
    
    // Check names are in order (A should come before Z)
    if (firstName !== null && lastName !== null) {
      expect(firstName < lastName).toBe(true);
    } else {
      throw new Error('First name or last name is null');
    }
  });

  test('Should change pages correctly', async ({ page }) => {
    // Go to next page
    await page.locator('[data-testid="next-page-button"]').click();
    await expect(page.locator('[data-testid="page-info"]')).toContainText('Page 2');
    
    // Go back to first page
    await page.locator('[data-testid="prev-page-button"]').click();
    await expect(page.locator('[data-testid="page-info"]')).toContainText('Page 1');
    
    // Go to page 5 using number button
    await page.locator('[data-testid="page-5-button"]').click();
    await expect(page.locator('[data-testid="page-info"]')).toContainText('Page 5');
  });

  test('Should let you change items per page', async ({ page }) => {
    // Change to show 25 items per page
    await page.locator('[data-testid="items-per-page-select"]').selectOption('25');
    
    // Check 25 rows are visible
    const rows = page.locator('[data-testid^="pokemon-row-"]');
    await expect(rows).toHaveCount(25);
  });
});
