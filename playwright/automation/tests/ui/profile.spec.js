import { test, expect } from '@playwright/test';
import { ProfileUserPage } from '../../pages/ui/ProfileUserPage';
import { LoginPage } from '../../pages/ui/LoginPage';
import { RegisterPage } from '../../pages/ui/RegisterPage';
import { RegisterData } from '../../data/register.data.js';
import { ProfilesData, InvalidProfilesData, passwordChangeData } from '../../data/profiles.data.js';

test.describe('Kiểm tra chức năng Profiles', () => {
    let profileUserPage;
    let loginPage;
    let registerPage;

    test.beforeEach(async ({ page }) => {
        profileUserPage = new ProfileUserPage(page);
        loginPage = new LoginPage(page);
        registerPage = new RegisterPage(page);
    });

    test('ProfileUI-TC01: Kiểm tra chức năng Profile', async ({ page }) => {
        await registerPage.gotoRegisterPage();
        await expect(page).toHaveURL(/register/);
        const data = RegisterData();
        await registerPage.fillRegisterForm(data.username, data.email, data.password);
        await registerPage.signUp();
        await expect(registerPage.success).toBeVisible();

        await loginPage.openMenuProfile();

        await profileUserPage.gotoProfile();
        await expect(page).toHaveURL(`#/profile/${data.username}`);
        await expect(page.getByRole('heading', { name: `${data.username}` })).toBeVisible();
    });

    test('ProfileUI-TC02: vào setting và update Profile thành công', async ({ page }) => {
        await registerPage.gotoRegisterPage();
        await expect(page).toHaveURL(/register/);
        const data = RegisterData();
        await registerPage.fillRegisterForm(data.username, data.email, data.password);
        await registerPage.signUp();
        await expect(registerPage.success).toBeVisible();

        await loginPage.openMenuProfile();

        await profileUserPage.gotoProfile();
        await expect(page).toHaveURL(`#/profile/${data.username}`);
        await expect(page.getByRole('heading', { name: `${data.username}` })).toBeVisible();

        await profileUserPage.settingProfile();

        await expect(page).toHaveURL(`#/settings`);
        const dataUpdate = ProfilesData();
        await profileUserPage.fillProfileForm(dataUpdate.username, dataUpdate.email);

        await Promise.all([
            page.waitForResponse(res =>
                res.url().includes('/api/user') && res.request().method() === 'PUT' && res.status() === 200
            ),
            await profileUserPage.updateProfile()
        ]);

        await loginPage.openMenuProfile();

        await profileUserPage.gotoProfile();
        await expect(page).toHaveURL(`#/profile/${dataUpdate.username}`);
        await expect(page.getByRole('heading', { name: `${dataUpdate.username}` })).toBeVisible();
    });

    for (let data of InvalidProfilesData()) {
        test(`${data.case}`, async ({ page }) => {
            await registerPage.gotoRegisterPage();
            await expect(page).toHaveURL(/register/);
            const dataRegister = RegisterData();
            await registerPage.fillRegisterForm(dataRegister.username, dataRegister.email, dataRegister.password);
            await registerPage.signUp();
            await expect(registerPage.success).toBeVisible();

            await loginPage.openMenuProfile();

            await profileUserPage.gotoProfile();
            await expect(page).toHaveURL(`#/profile/${dataRegister.username}`);

            await Promise.all([
                page.waitForURL('**/#/settings'),
                profileUserPage.settingProfile()
            ]);

            await profileUserPage.fillProfileForm(data.username, data.email, data.password);
            await profileUserPage.updateProfile();

            for (let field of data.field) {
                const form = page.locator('form');
                const input = form.locator(`[name="${field.name}"]`);
                const validity = await input.evaluate((el, expected) => el.validity[expected], field.expected);
                expect(validity).toBe(true);
            }
            await expect(page).toHaveURL(`#/settings`);
            await expect(profileUserPage.updateButton).toBeVisible();
            await expect(profileUserPage.updateButton).not.toBeHidden();

        });
    }

    for (let dataPassword of passwordChangeData()) {
        test(`${dataPassword.case}`, async ({ page }) => {
            await registerPage.gotoRegisterPage();
            await expect(page).toHaveURL(/register/);
            const data = RegisterData();
            await registerPage.fillRegisterForm(data.username, data.email, data.password);
            await registerPage.signUp();
            await expect(registerPage.success).toBeVisible();

            await loginPage.openMenuProfile();

            await profileUserPage.gotoProfile();
            await expect(page).toHaveURL(`#/profile/${data.username}`);
            await expect(page.getByRole('heading', { name: `${data.username}` })).toBeVisible();

            await profileUserPage.settingProfile();
            await expect(page).toHaveURL(`#/settings`);
            await profileUserPage.fillProfilePassword(dataPassword.password);

            await Promise.all([
                page.waitForResponse(res =>
                    res.url().includes('/api/user') && res.request().method() === 'PUT' && res.status() === 200
                ),
                await profileUserPage.updateProfile()
            ]);

            await expect(profileUserPage.updateButton).toBeHidden();

            await loginPage.logout();

            await loginPage.gotoLoginPage();
            await expect(page).toHaveURL(/login/);

            const validLoginPassword = dataPassword.password === "" ? data.password : dataPassword.password;

            await loginPage.fillLoginForm(data.email, validLoginPassword);
            await loginPage.login();
            await expect(page).toHaveURL('#/')
            await expect(loginPage.success).toBeVisible();
        });
    }
});