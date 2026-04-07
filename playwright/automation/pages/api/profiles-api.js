export class ProfilesAPI {
    constructor(request){
        this.request = request;
    }

    async getProfile(username){
        return await this.request.get(`api/profiles/${username}`)
    }

    async followProfile(token, username){
        return await this.request.post(`api/profiles/${username}/follow`,{
            headers: {
                'Authorization': `Token ${token}`
            }
        });
    }

    async unFollowProfile(token, username){
        return await this.request.delete(`api/profiles/${username}/follow`,{
            headers: {
                'Authorization': `Token ${token}`
            }
        });
    }
}