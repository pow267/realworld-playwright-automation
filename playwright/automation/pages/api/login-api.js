export class LoginAPI {
    constructor(request) {
        this.request = request;
    }


    async login(email, password) {
        return await this.request.post('api/users/login', {
            data: {
                user: {
                    email: email,
                    password: password
                }
            }
        });
    }

    async getToken(email, password) {
        const res = await this.login(email, password);
        const body = await res.json();
        return body.user.token;
    }
}