import { test } from "../shared/base";
import { attachScreenshot } from "../shared/helpers.ts";

const LOGIN_SUCCESS_SCREENSHOT = "login_success_screenshot";
const LOGIN_FAILURE_SCREENSHOT = "login_failure_screenshot";
const LOGIN_ERROR_MESSAGE =
  "Epic sadface: Username and password do not match any user in this service";

test.describe("Login Test Suite", { tag: "@RegressionTesting" }, () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateTo();
  });

  test("Should successfully login", async ({ loginPage }, testInfo) => {
    await test.step("Login with valid credentials", async () => {
      await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
      );
    });

    await test.step("Verify login success", async () => {
      await loginPage.verifyLoginSuccess();
    });

    await test.step("Take and attach screenshot", async () => {
      await attachScreenshot(
        loginPage.page,
        testInfo,
        LOGIN_SUCCESS_SCREENSHOT
      );
    });
  });

  test("Should unsuccessfully login", async ({ loginPage }, testInfo) => {
    await test.step("Login with invalid credentials", async () => {
      await loginPage.login("invalid_user", "wrong_password");
    });

    await test.step("Verify login error message", async () => {
      await loginPage.verifyLoginError(LOGIN_ERROR_MESSAGE);
    });

    await test.step("Take and attach screenshot", async () => {
      await attachScreenshot(
        loginPage.page,
        testInfo,
        LOGIN_FAILURE_SCREENSHOT
      );
    });
  });
});
