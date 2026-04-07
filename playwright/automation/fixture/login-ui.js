import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/ui/LoginPage.js';
import { LoginData } from '../data/login.data.js';

export const test = base.extend({
    LoginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.gotoLoginPage();
        const data = LoginData();
        await loginPage.fillLoginForm(data.email, data.password);
        await loginPage.login();
        await expect(loginPage.success).toBeVisible();
        await use(page);
    },

});

export const expect = base.expect;