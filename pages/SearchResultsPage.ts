import { expect, Locator, Page } from '@playwright/test';
import { ProductPage } from './ProductPage';

export class SearchResultsPage {
    private readonly page: Page;

    // Locators
    private readonly searchHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.searchHeading = page.getByRole('heading', { name: /^Search - / });
    }

    /**
     * Verifies that a product is present in the search results.
     * @param productName - Expected product name
     * @returns Promise<boolean> - true if the product is displayed
     */
    async isProductDisplayed(productName: string): Promise<boolean> {
        await expect(this.page.getByRole('link', { name: productName, exact: true }).last())
            .toBeVisible();
        return true;
    }

    /**
     * Verifies that the product search results page is displayed.
     * @returns Promise<boolean> - true if the results heading is displayed
     */
    async isSearchResultsPageExists(): Promise<boolean> {
        await expect(this.searchHeading).toBeVisible();
        return true;
    }

    /**
     * Opens a matching product from the search results.
     * @param productName - Product name to open
     * @returns Promise<ProductPage> - Product details page object
     */
    async openProduct(productName: string): Promise<ProductPage> {
        await this.page.getByRole('link', { name: productName, exact: true }).last().click();
        return new ProductPage(this.page);
    }
}
