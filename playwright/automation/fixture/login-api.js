import { test as base, request as playwrightRequest } from '@playwright/test';
import { LoginAPI } from '../pages/api/login-api.js';

export const test = base.extend({


    userToken: async ({ request }, use) => {
        const loginAPI = new LoginAPI(request);
        const token = await loginAPI.getToken('test@gmail.com', '123456');
        await use(token);
    },
});

export const expect = base.expect;