import { test, expect } from '@playwright/test';
import { LoginAPI } from '../../pages/api/login-api.js';
import { LoginData, InvalidLoginAPI, NegativeLoginAPI } from '../../data/login.data.js';

test.describe('Test Login API', () => {
    let loginAPI;

    test.beforeEach(async ({ request }) => {
        loginAPI = new LoginAPI(request);
    });

    test('LoginAPI-TC01: Login success', async () => {
        const data = LoginData();
        const loginRes = await loginAPI.login(data.email, data.password);
        expect(loginRes.status()).toBe(200);

        const body = await loginRes.json();
        expect(body.user.email).toBe(data.email);
        expect(body.user.token).toBeDefined();
    });

    for (let data of InvalidLoginAPI()) {
        test(`${data.case}`, async () => {
            const loginRes = await loginAPI.login(data.email, data.password);
            expect([422, 404]).toContain(loginRes.status());
        })
    }

    for (let data of NegativeLoginAPI()) {
        test(`${data.case}`, async () => {
            const loginRes = await loginAPI.login(data.email, data.password);
            expect([422, 404]).toContain(loginRes.status());
        })
    }
});