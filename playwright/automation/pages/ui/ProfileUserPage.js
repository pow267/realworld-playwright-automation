export class ProfileUserPage {
    constructor(page) {
        this.page = page;

        this.profileLink = this.page.getByRole('link', { name: 'Profile' });
        this.settingProfileLink = this.page.locator('.row').locator('a[href="#/settings"]');
        this.yournameInput = this.page.getByRole('textbox', { name: 'Your Name' });
        this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.updateButton = this.page.getByRole('button', { name: 'Update Settings' });
        this.favoritedArticlesLink = this.page.getByRole('link', { name: 'Favorited Articles' });
        this.listArticle = this.page.locator('.article-preview');
    }

    async goto() {
        await this.page.goto('/#');
    }

    async gotoProfile() {
        await this.profileLink.click();
    }

    async settingProfile() {
        await this.settingProfileLink.click();
    }

    async fillProfileForm(username, email) {
        await this.yournameInput.fill(username);
        await this.emailInput.fill(email);
    }

    async fillProfilePassword(password) {
        await this.passwordInput.fill(password);
    }

    async updateProfile() {
        await this.updateButton.click();
    }

    async favoriteProfile() {
        await this.favoritedArticlesLink.click();
    }
}