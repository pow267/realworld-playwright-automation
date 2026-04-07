export class RegisterAPI {
    constructor(request) {
        this.request = request;
    }

    async register(yourname, email, password) {
        return await this.request.post('api/users', {
            data: {
                user: {
                    username: yourname,
                    email: email,
                    password: password
                }
            }
        });
    }
}