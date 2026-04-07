export class LoginPage {
    constructor(page) {
        this.page = page;

        this.urlLogin = this.page.getByRole('link', { name: 'Login' });
        this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.success = this.page.getByRole('button', { name: 'Your Feed' });
        this.menuProfile = this.page.getByRole('banner').getByText('Tester');
        this.logoutButton = this.page.getByRole('link', { name: 'Logout' });
    }
    async goto() {
        this.page.goto('http://localhost:3000');
    }

    async gotoLoginPage() {
        await this.urlLogin.click();
    }

    async fillLoginForm(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async login() {
        await this.loginButton.click();
    }

    async logout() {
        await this.menuProfile.click();
        await this.logoutButton.click();
    }
}