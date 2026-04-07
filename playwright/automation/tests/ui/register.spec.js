import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/ui/RegisterPage';
import { RegisterData, InvalidRegisterUI, NegativeRegister } from '../../data/register.data';

test.describe('Kiểm tra chức năng đăng ký', () => {
    let registerPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.gotoRegisterPage();
        await expect(page).toHaveURL(/register/);
    });

    test('RegisterUI-TC01: Vào trang Sign Up, điền thông tin và đăng ký thành công', async () => {
        const data = RegisterData();
        await registerPage.fillRegisterForm(data.username, data.email, data.password);
        await registerPage.signUp();
        await expect(registerPage.success).toBeVisible();
    });

    for (let data of InvalidRegisterUI()) {
        test(`${data.case}`, async ({ page }) => {
            await registerPage.fillRegisterForm(data.username, data.email, data.password);
            await registerPage.signUp();

            for (let field of data.field) {
                const input = page.locator(`input[name="${field.name}"]`);
                const validity = await input.evaluate(el => ({
                    valueMissing: el.validity.valueMissing,
                    typeMismatch: el.validity.typeMismatch,
                }));
                expect(validity[field.expected]).toBe(true);
            }
            await expect(registerPage.signUpButton).toBeVisible();
            await expect(registerPage.page).toHaveURL(/register/);
        });
    }

    test('RegisterUI-TC07: Đăng ký thất bại vì email tồn tại', async () => {
        const data = NegativeRegister();
        await registerPage.fillRegisterForm(data.username, data.email, data.password);
        await registerPage.signUp();
        await expect(registerPage.errorMessage).toBeVisible();
        await expect(registerPage.signUpButton).toBeVisible();
        await expect(registerPage.page).toHaveURL(/register/);

    });
});