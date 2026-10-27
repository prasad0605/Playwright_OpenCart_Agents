/**
 * Test Case: Register, sign in, and complete a customer shopping journey
 *
 * Tags: @master @sanity @end-to-end @web
 *
 * Steps:
 * 1) Open the storefront and register a unique customer.
 * 2) Verify registration and log out.
 * 3) Log in again with the new customer's credentials.
 * 4) Search for MacBook and open its product details.
 * 5) Add one item to the cart and validate the cart contents and total.
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('Customer registration through shopping cart journey @master @sanity @end-to-end @web', async ({
    homePage,
    registerPage,
    loginPage,
    myAccountPage,
    logoutPage,
    searchResultsPage,
    productPage,
    shoppingCartPage,
}) => {
    const customer = RandomDataUtil.generateCustomerRegistrationData();
    const expectedProduct = Helper.getProductDetails();

    await test.step('1) Open the storefront and register a unique customer', async () => {
        expect(await homePage.isHomePageExists()).toBeTruthy();
        await homePage.openRegistration();
        expect(await registerPage.isRegisterPageExists()).toBeTruthy();
        await registerPage.completeRegistration(customer);
        expect(await registerPage.isAccountCreated()).toBeTruthy();
    });

    await test.step('2) Log out of the newly created customer account', async () => {
        await myAccountPage.logout();
        expect(await logoutPage.isLogoutPageExists()).toBeTruthy();
        await logoutPage.continueToHome();
    });

    await test.step('3) Log in again with the generated customer credentials', async () => {
        await homePage.openLogin();
        expect(await loginPage.isLoginPageExists()).toBeTruthy();
        await loginPage.login(customer.email, customer.password);
        expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    });

    await test.step('4) Search for MacBook and open its product details', async () => {
        await homePage.searchProduct(expectedProduct.productName);
        expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();
        expect(await searchResultsPage.isProductDisplayed(expectedProduct.productName)).toBeTruthy();
        await searchResultsPage.openProduct(expectedProduct.productName);
        expect(await productPage.areProductDetailsDisplayed(
            expectedProduct.productName,
            expectedProduct.totalPrice,
        )).toBeTruthy();
    });

    await test.step('5) Add the product to the cart and verify the cart values', async () => {
        await productPage.addToCart(expectedProduct.productQuantity);
        await productPage.openShoppingCart();

        expect(await shoppingCartPage.isShoppingCartPageExists()).toBeTruthy();
        expect(await shoppingCartPage.isProductDisplayed(expectedProduct.productName)).toBeTruthy();
        expect(await shoppingCartPage.getProductQuantity(expectedProduct.productName))
            .toBe(expectedProduct.productQuantity);
        expect(await shoppingCartPage.getProductPrice(expectedProduct.productName))
            .toBe(expectedProduct.totalPrice);
        expect(await shoppingCartPage.getCartTotal()).toBe(expectedProduct.totalPrice);
    });

    console.log('✅ Customer registration, authentication, and shopping journey completed successfully.');
});
