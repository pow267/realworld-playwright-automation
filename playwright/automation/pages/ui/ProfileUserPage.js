export class ProfileUserPage {
    constructor(page) {
        this.page = page;

        this.profileLink = this.page.getByRole('link', { name: 'Profile' });

    }
    async goto() {
        await this.page.goto('/#');
    }
    async gotoProfile() {
        await this.profileLink.click();
    }
}