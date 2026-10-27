import { expect, Locator, Page } from '@playwright/test';

export class ShoppingCartPage {
    private readonly page: Page;

    // Locators
    private readonly cartHeading: Locator;
    private readonly productTable: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.cartHeading = page.getByRole('heading', { name: /^Shopping Cart/ });
        this.productTable = page.locator('#content table').first();
    }

    /**
     * Verifies that the shopping cart page is displayed.
     * @returns Promise<boolean> - true if the cart page is displayed
     */
    async isShoppingCartPageExists(): Promise<boolean> {
        await expect(this.cartHeading).toBeVisible();
        return true;
    }

    /**
     * Verifies that the requested product appears in the cart.
     * @param productName - Expected product name
     * @returns Promise<boolean> - true if the product appears in the cart
     */
    async isProductDisplayed(productName: string): Promise<boolean> {
        await expect(this.productRow(productName)).toBeVisible();
        return true;
    }

    /**
     * Reads the requested product's quantity from the cart.
     * @param productName - Product name in the cart
     * @returns Promise<string> - Quantity entered in the cart
     */
    async getProductQuantity(productName: string): Promise<string> {
        return this.productRow(productName).locator('input[name^="quantity"]').inputValue();
    }

    /**
     * Reads the unit price for the requested cart product.
     * @param productName - Product name in the cart
     * @returns Promise<string> - Displayed unit price
     */
    async getProductPrice(productName: string): Promise<string> {
        return this.productRow(productName).getByRole('cell').nth(4).innerText();
    }

    /**
     * Reads the applicable total from the cart summary.
     * @returns Promise<string> - Cart total including applicable charges
     */
    async getCartTotal(): Promise<string> {
        return this.page.locator('#content table')
            .nth(1)
            .getByRole('row')
            .last()
            .getByRole('cell')
            .nth(1)
            .innerText();
    }

    private productRow(productName: string): Locator {
        return this.productTable.getByRole('row').filter({ hasText: productName });
    }
}
