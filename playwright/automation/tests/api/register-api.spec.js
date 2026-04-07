import { test, expect } from '@playwright/test';
import { RegisterAPI } from '../../pages/api/register-api.js';
import { RegisterData, InvalidRegisterAPI, NegativeRegister } from '../../data/register.data.js';

test.describe('Kiểm tra Register API', () => {
    let registerAPI;

    test.beforeEach(async ({ request }) => {
        registerAPI = new RegisterAPI(request);
    });

    test('RegisterAPI-TC01: Đăng ký tài khoản thành công', async () => {
        const data = RegisterData();
        const res = await registerAPI.register(data.username, data.email, data.password);
        expect(res).toBeDefined();
        expect(res.status()).toBe(201);

        const body = await res.json();
        expect(body.user.email).toBe(data.email);
        expect(body.user.username).toBe(data.username);
    });

    for (const data of InvalidRegisterAPI()) {
        test(`${data.case}`, async () => {
            const res = await registerAPI.register(data.username, data.email, data.password);
            expect(res).toBeDefined();
            expect(res.status()).toBe(422);
        });
    }

    test('RegisterAPI-TC06: Đăng ký tài khoản với email đã tồn tại', async () => {
        const data = NegativeRegister();
        const res = await registerAPI.register(data.username, data.email, data.password);
        expect(res).toBeDefined();
        expect(res.status()).toBe(422);
    });
});