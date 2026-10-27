import { expect, Locator, Page } from '@playwright/test';
import { ShoppingCartPage } from './ShoppingCartPage';

export class ProductPage {
    private readonly page: Page;

    // Locators
    private readonly quantityField: Locator;
    private readonly addToCartButton: Locator;
    private readonly addedToCartMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.quantityField = page.locator('#input-quantity');
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart', exact: true });
        this.addedToCartMessage = page.getByText('Success: You have added', { exact: false });
    }

    /**
     * Verifies that product details and the expected price are displayed.
     * @param productName - Expected product name
     * @param productPrice - Expected product price
     * @returns Promise<boolean> - true if the details are displayed
     */
    async areProductDetailsDisplayed(productName: string, productPrice: string): Promise<boolean> {
        const productHeading = this.page.getByRole('heading', { name: productName, exact: true });
        const price = this.page.locator('#content').getByText(productPrice, { exact: true });
        await expect(productHeading).toBeVisible();
        await expect(price).toBeVisible();
        return true;
    }

    /**
     * Adds the requested product quantity to the cart.
     * @param quantity - Quantity to add
     */
    async addToCart(quantity: string): Promise<void> {
        await this.quantityField.fill(quantity);
        await this.addToCartButton.click();
        await this.addedToCartMessage.waitFor({ state: 'visible' });
    }

    /**
     * Opens the cart from the add-to-cart confirmation.
     * @returns Promise<ShoppingCartPage> - Shopping cart page object
     */
    async openShoppingCart(): Promise<ShoppingCartPage> {
        await this.page.getByRole('link', { name: 'shopping cart', exact: true }).click();
        return new ShoppingCartPage(this.page);
    }
}
