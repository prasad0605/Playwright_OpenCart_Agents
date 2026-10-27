import { expect, Locator, Page } from '@playwright/test';
import { LogoutPage } from './LogoutPage';

export class MyAccountPage {
    private readonly page: Page;

    // Locators
    private readonly accountHeading: Locator;
    private readonly accountMenu: Locator;
    private readonly accountDropdown: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.accountHeading = page.locator('#content')
            .getByRole('heading', { name: 'My Account', exact: true });
        this.accountMenu = page.getByTitle('My Account');
        this.accountDropdown = page.locator('li.dropdown').filter({ has: this.accountMenu });
    }

    /**
     * Verifies that the authenticated My Account dashboard is displayed.
     * @returns Promise<boolean> - true if the account dashboard is displayed
     */
    async isMyAccountPageExists(): Promise<boolean> {
        await expect(this.accountHeading).toBeVisible();
        return true;
    }

    /**
     * Logs the customer out through the account menu.
     * @returns Promise<LogoutPage> - Logout confirmation page object
     */
    async logout(): Promise<LogoutPage> {
        try {
            await this.accountMenu.click();
            await this.accountDropdown.getByRole('link', { name: 'Logout', exact: true }).click();
            return new LogoutPage(this.page);
        } catch (error) {
            console.log(`Error logging out the customer: ${error}`);
            throw error;
        }
    }
}
