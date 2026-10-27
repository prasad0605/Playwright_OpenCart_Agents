import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    // Locators
    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.emailField = page.getByLabel('E-Mail Address');
        this.passwordField = page.getByLabel('Password', { exact: true });
        this.continueButton = page.getByRole('button', { name: 'Login', exact: true });
    }

    /**
     * Verifies that the login form is displayed.
     * @returns Promise<boolean> - true if the login page is displayed
     */
    async isLoginPageExists(): Promise<boolean> {
        await expect(this.page.getByRole('heading', { name: 'Returning Customer', exact: true }))
            .toBeVisible();
        return true;
    }

    /**
     * Logs in with the supplied customer credentials.
     * @param email - Registered customer email
     * @param password - Registered customer password
     */
    async login(email: string, password: string): Promise<void> {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.continueButton.click();
    }
}
