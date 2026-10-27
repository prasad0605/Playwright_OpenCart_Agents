import { expect, Locator, Page } from '@playwright/test';
import { HomePage } from './HomePage';

export class LogoutPage {
    private readonly page: Page;

    // Locators
    private readonly logoutHeading: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.logoutHeading = page.getByRole('heading', { name: 'Account Logout', exact: true });
        this.continueButton = page.getByRole('link', { name: 'Continue', exact: true });
    }

    /**
     * Verifies that the logout confirmation page is displayed.
     * @returns Promise<boolean> - true if logout succeeded
     */
    async isLogoutPageExists(): Promise<boolean> {
        await expect(this.logoutHeading).toBeVisible();
        return true;
    }

    /**
     * Returns to the storefront after logout.
     * @returns Promise<HomePage> - Storefront home page object
     */
    async continueToHome(): Promise<HomePage> {
        await this.continueButton.click();
        return new HomePage(this.page);
    }
}
