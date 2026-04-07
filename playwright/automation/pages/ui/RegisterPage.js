export class RegisterPage {
    constructor(page) {
        this.page = page;

        this.urlRegister = this.page.getByRole('link', { name: 'Sign up' });
        this.yournameInput = this.page.getByRole('textbox', { name: 'Your Name' });
        this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.signUpButton = this.page.getByRole('button', { name: 'Sign up' });
        this.success = this.page.getByRole('button', { name: 'Your Feed' });
        this.errorMessage = this.page.getByText('Email already exists.. try');
    }

    async gotoRegisterPage() {
        await this.page.goto('http://localhost:3000');
        await this.urlRegister.click();
    }

    async fillRegisterForm(yourname, email, password) {
        await this.yournameInput.fill(yourname);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async signUp() {
        await this.signUpButton.click();
    }
}