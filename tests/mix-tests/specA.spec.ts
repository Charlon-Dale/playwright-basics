import { test } from "@playwright/test";

test.describe.configure({ mode: 'serial' }); // run test cases in sequence
test.describe("Spec File A run in serial mode", () => {
test('Test A 1', async ({ page }) => { console.log("Test A 1"); });
test('Test A2', async ({ page }) => { console.log("Test A 2"); });
});