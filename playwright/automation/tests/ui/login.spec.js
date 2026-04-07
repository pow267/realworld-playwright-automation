import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/ui/LoginPage';
import { RegisterPage } from '../../pages/ui/RegisterPage';
import { InvalidLoginUI, NegativeLoginUI } from '../../data/login.data.js';
import { RegisterData } from '../../data/register.data.js';

test.describe('Kiểm tra chức năng Login', () => {
    let loginPage;
    let registerPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        registerPage = new RegisterPage(page);
    });

    test('LoginUI-TC01: Đăng nhập thành công', async ({ page }) => {
        await registerPage.gotoRegisterPage();
        await expect(page).toHaveURL(/register/);
        const data = RegisterData();
        await registerPage.fillRegisterForm(data.username, data.email, data.password);
        await registerPage.signUp();
        await expect(registerPage.success).toBeVisible();

        await loginPage.logout();

        await loginPage.gotoLoginPage();
        await expect(page).toHaveURL(/login/);
        await loginPage.fillLoginForm(data.email, data.password);
        await loginPage.login();
        await expect(loginPage.success).toBeVisible();
    });

    for (let data of InvalidLoginUI()) {
        test(`${data.case}`, async ({ page }) => {
            await loginPage.goto();
            await loginPage.gotoLoginPage();
            await loginPage.fillLoginForm(data.email, data.password);

            for (let field of data.field) {
                const input = await page.locator(`input[name="${field.name}"]`);
                const validity = await input.evaluate(el => ({
                    valueMissing: el.validity.valueMissing,
                    typeMismatch: el.validity.typeMismatch,
                }));
                expect(validity[field.expected]).toBe(true);
            }
            await expect(loginPage.loginButton).toBeVisible();
            await expect(page).toHaveURL(/login/);
        });
    }

    for (let data of NegativeLoginUI()) {
        test(`${data.case}`, async ({ page }) => {
            await loginPage.goto();
            await loginPage.gotoLoginPage();
            await loginPage.fillLoginForm(data.email, data.password);
            await loginPage.login();
            await expect(page.getByText(data.expected)).toBeVisible();
            await expect(loginPage.loginButton).toBeVisible();
            await expect(page).toHaveURL(/login/);
        });
    }
});