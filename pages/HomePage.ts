import { expect, Locator, Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { SearchResultsPage } from './SearchResultsPage';

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly accountMenu: Locator;
    private readonly accountDropdown: Locator;
    private readonly searchField: Locator;
    private readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.accountMenu = page.getByTitle('My Account');
        this.accountDropdown = page.locator('li.dropdown').filter({ has: this.accountMenu });
        this.searchField = page.getByPlaceholder('Search');
        this.searchButton = page.locator('#search').getByRole('button');
    }

    /**
     * Verifies that the storefront home page is displayed.
     * @returns Promise<boolean> - true if the home page is displayed
     */
    async isHomePageExists(): Promise<boolean> {
        await expect(this.page.getByText('Featured', { exact: true })).toBeVisible();
        return true;
    }

    /**
     * Opens the account menu and navigates to registration.
     * @returns Promise<RegisterPage> - Registration page object
     */
    async openRegistration(): Promise<RegisterPage> {
        await this.accountMenu.click();
        await this.accountDropdown.getByRole('link', { name: 'Register', exact: true }).click();
        return new RegisterPage(this.page);
    }

    /**
     * Opens the account menu and navigates to login.
     * @returns Promise<LoginPage> - Login page object
     */
    async openLogin(): Promise<LoginPage> {
        await this.accountMenu.click();
        await this.accountDropdown.getByRole('link', { name: 'Login', exact: true }).click();
        return new LoginPage(this.page);
    }

    /**
     * Searches the catalog for a product.
     * @param productName - Product name to search for
     * @returns Promise<SearchResultsPage> - Search results page object
     */
    async searchProduct(productName: string): Promise<SearchResultsPage> {
        await this.searchField.fill(productName);
        await this.searchButton.click();
        return new SearchResultsPage(this.page);
    }
}
