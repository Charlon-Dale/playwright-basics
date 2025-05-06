// @ts-check
import { defineConfig, devices } from "@playwright/test";
import type { GitHubActionOptions } from "@estruyf/github-actions-reporter";

import path from "path";
import dotenv from "dotenv";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
dotenv.config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export const STORAGE_STATE = path.join(__dirname, "./.auth/user.json");

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: process.env.CI ? "blob" : "html",
  // reporter: [
  //   ["html"],
  //   ["list"],
  //   [
  //     "@estruyf/github-actions-reporter",
  //     <GitHubActionOptions>{
  //       title: "TAPH Playwright Mastery - Test Report",
  //       useDetails: true,
  //       showError: true,
  //     },
  //   ],
  // ],
  // reporter:[['html',{
  //   open: 'never',
  //   outputFile:'playwright-report'
  // }]]

  reporter: [
    [
      "playwright-html",
      {
        testFolder: "tests",
        title: "Playwright Test Report",
        project: "Playwright Mastery Class",
        release: "1.0.0",
        testEnvironment: "Labs Preview",
        embedAssets: true,
        embedAttachments: true,
        outputFolder: "playwright-report",
        minifyAssets: true,
        startServer: true,
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'http://localhost:3000/',
    //viewport: { width: 1920, height: 1080 },
    /*
    launchOptions: {
      args: ["--start-maximized"],
    },*/
    //bypassCSP: true,
    baseURL: "https://www.saucedemo.com",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    //video: 'retain-on-failure'
    video: "retain-on-failure",
    //screenshot: 'only-on-failure'
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: "**/*.setup.ts",
    },
    {
      name: "e2e",
      dependencies: ["setup"],
      use: {
        storageState: STORAGE_STATE,
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },
    {
      name: "api",
      testMatch: "**/*.api.spec.ts",
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://www.saucedemo.com",
      },
    },
    /*
    {
        name: 'iPhone12',
        use: { ...devices['iPhone 12'] },
    },*/
    //{
    //  name: 'firefox',
    //  use: { ...devices['Desktop Firefox'] },
    //},
    //{
    //  name: 'webkit',
    // use: { ...devices['Desktop Safari'] },
    //},
    //{
    //  name: 'Google-Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    //},
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
  ],
  snapshotPathTemplate:
    "test-screenshots/__screenshots__/{testFilePath}/{arg}{ext}",
  /* Run your local dev server before starting the tests */
  /*
  webServer: {
    command: `cd ${path.resolve(__dirname, 'labs-app')} && npm run build && npm run start`,
    url: "http://127.0.0.1:3000/",
    reuseExistingServer: !process.env.CI,
  },*/

  /* Configure projects for major mobile browsers */
});
