export class DBControls {
    constructor(request) {
        this.request = request;
    }

    async seedDB() {
        return await this.request.get('api/seed');
    }

    async resetDB() {
        return await this.request.get('api/reset');
    }
}