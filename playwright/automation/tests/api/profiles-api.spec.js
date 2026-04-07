import { test, expect } from '../../fixture/login-api.js';
import { ProfilesAPI } from '../../pages/api/profiles-api.js';
import { RegisterAPI } from '../../pages/api/register-api.js';
import { RegisterData } from '../../data/register.data.js';

test.describe('Kiểm tra Profiles API', () => {
    let registerAPI;
    let profilesAPI;

    test.beforeEach(async ({ request }) => {
        registerAPI = new RegisterAPI(request);
        profilesAPI = new ProfilesAPI(request);
    });

    test('Profiles-TC01: Lấy profile từ tài khoản mới tạo', async () => {
        const data = RegisterData();
        const res = await registerAPI.register(data.username, data.email, data.password);
        expect(res.status()).toBe(201);
        const body = await res.json();
        expect(body.user.email).toBe(data.email);
        expect(body.user.username).toBe(data.username);

        const profileRes = await profilesAPI.getProfile(body.user.username);
        expect(profileRes.status()).toBe(200);
        const bodyProfile = await profileRes.json();
        expect(bodyProfile.profile.username).toBe(data.username);
    });

    test('Profiles-TC02: Dùng một tài khoản follow profile tài khoản khác', async ({ userToken }) => {
        const data = RegisterData();
        const res = await registerAPI.register(data.username, data.email, data.password);
        expect(res.status()).toBe(201);
        const body = await res.json();
        expect(body.user.email).toBe(data.email);
        expect(body.user.username).toBe(data.username);

        const followRes = await profilesAPI.followProfile(userToken, body.user.username);
        expect(followRes.status()).toBe(200);
        const bodyFollow = await followRes.json();
        expect(bodyFollow.profile.following).toBe(true);
        expect(bodyFollow.profile.followersCount).toBeGreaterThan(0);
    });

    test('Profiles-TC03: Dùng một tài khoản unfollow profile tài khoản khác', async ({ userToken }) => {
        const data = RegisterData();
        const res = await registerAPI.register(data.username, data.email, data.password);
        expect(res.status()).toBe(201);
        const body = await res.json();
        expect(body.user.email).toBe(data.email);
        expect(body.user.username).toBe(data.username);

        const followRes = await profilesAPI.followProfile(userToken, body.user.username);
        expect(followRes.status()).toBe(200);
        const bodyFollow = await followRes.json();
        expect(bodyFollow.profile.following).toBe(true);
        expect(bodyFollow.profile.followersCount).toBeGreaterThan(0);

        const unFollowProfileRes = await profilesAPI.unFollowProfile(userToken, body.user.username);
        expect(unFollowProfileRes.status()).toBe(200);
        const bodyUnFollow = await unFollowProfileRes.json();
        expect(bodyUnFollow.profile.following).toBe(false);
        expect(bodyUnFollow.profile.followersCount).toBe(0);
    });

});
