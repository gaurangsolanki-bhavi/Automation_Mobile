import { test, context, page } from "../../../Utils/GlobalFixture";
import { expect } from "@playwright/test";
import ReusablePage from "../../../Pages/Member/ReusablePage"
import ReusableActions from "../../../Actions/ReusableActions";
import UserSet from "../../../test-data/JSON/admin_set_test.json"
import ZoneData from "../../../test-data/JSON/zone_data.json"
import GroupOnePage from "../../../Pages/Member/GroupOne";
import LoginValidationPage from "../../../Pages/Member/LoginValidationPage";


let reusablePageClass: ReusablePage;
let reusableActionsClass: ReusableActions;
let groupOnePage: GroupOnePage;
let loginvalidationPage: LoginValidationPage;
let invalid: any[];
let invalid2: any[];



test.beforeAll(async ({ sharedPage }) => {
  reusablePageClass = new ReusablePage(sharedPage);
  reusableActionsClass = new ReusableActions(sharedPage);
  loginvalidationPage = new LoginValidationPage(sharedPage);
  groupOnePage = new GroupOnePage(sharedPage);
  invalid = await reusableActionsClass.getTestData('invalidUser', ZoneData.ZONE_SET1.XLXS_PATH);
  invalid2 = await reusableActionsClass.getTestData('invalidUser2', ZoneData.ZONE_SET1.XLXS_PATH);
  await reusablePageClass.navigateMemberToUrl(UserSet.SET_1.url);
});

test.afterAll(async () => {

  await page.close();
  await context.close();
});

test.describe(`Verify Member Landing Login page`, () => {

    test(`Test_001: Verifies member login and landing page elements`, async () => {
    try {
      await loginvalidationPage.verifyLandingPageElements();
    } catch (error: any) {
      throw error;
    }
  });

  test(`Test_002: Ensures the 'Login as Admin' button navigates to the admin login page`, async () => {
    try {
      await loginvalidationPage.Login_AsAdminLinkNavigation();
    } catch (error: any) {
      throw error;
    }
  });


  test(`Test_003: Ensures the Terms and Conditions link navigates to the correct page`, async () => {
    try {
       await loginvalidationPage.termAndConditionLinkNavigation();
    } catch (error: any) {
      throw error;
    }
  });



  test(`Test_004: Ensures a member cannot log in with an invalid email`, async () => {
    try {
      await loginvalidationPage.ValidateInvalidUserLogin(invalid);
      await loginvalidationPage.ValidateInValidUserLoginWithoutTermAndCondition(invalid2);
    } catch (error: any) {
      throw error;
    }
  });




});
