import { test } from "@playwright/test";

test.describe("Spec File B run in Parallel", () => { // run test cases in parallel
test('Test B 1', async ({ page }) => { 
    console.log("Test B 1"); });
test('Test B 2', async ({ page }) => { 
    console.log("Test B 2"); });
});