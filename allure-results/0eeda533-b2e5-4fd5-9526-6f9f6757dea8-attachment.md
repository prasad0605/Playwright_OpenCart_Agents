# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\customer-shopping-journey.spec.ts >> Customer registration through shopping cart journey @master @sanity @end-to-end @web
- Location: tests\web\customer-shopping-journey.spec.ts:18:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | /**
  2  |  * Test Case: Register, sign in, and complete a customer shopping journey
  3  |  *
  4  |  * Tags: @master @sanity @end-to-end @web
  5  |  *
  6  |  * Steps:
  7  |  * 1) Open the storefront and register a unique customer.
  8  |  * 2) Verify registration and log out.
  9  |  * 3) Log in again with the new customer's credentials.
  10 |  * 4) Search for MacBook and open its product details.
  11 |  * 5) Add one item to the cart and validate the cart contents and total.
  12 |  */
  13 | 
  14 | import { test, expect } from '../../fixtures/pageFixtures';
  15 | import { RandomDataUtil } from '../../utils/dataGenerator';
  16 | import { Helper } from '../../utils/helper';
  17 | 
  18 | test('Customer registration through shopping cart journey @master @sanity @end-to-end @web', async ({
  19 |     homePage,
  20 |     registerPage,
  21 |     loginPage,
  22 |     myAccountPage,
  23 |     logoutPage,
  24 |     searchResultsPage,
  25 |     productPage,
  26 |     shoppingCartPage,
  27 | }) => {
  28 |     const customer = RandomDataUtil.generateCustomerRegistrationData();
  29 |     const expectedProduct = Helper.getProductDetails();
  30 | 
  31 |     await test.step('1) Open the storefront and register a unique customer', async () => {
  32 |         expect(await homePage.isHomePageExists()).toBeTruthy();
  33 |         await homePage.openRegistration();
  34 |         expect(await registerPage.isRegisterPageExists()).toBeTruthy();
  35 |         await registerPage.completeRegistration(customer);
  36 |         expect(await registerPage.isAccountCreated()).toBeTruthy();
  37 |     });
  38 | 
  39 |     await test.step('2) Log out of the newly created customer account', async () => {
  40 |         await myAccountPage.logout();
  41 |         expect(await logoutPage.isLogoutPageExists()).toBeTruthy();
  42 |         await logoutPage.continueToHome();
  43 |     });
  44 | 
  45 |     await test.step('3) Log in again with the generated customer credentials', async () => {
  46 |         await homePage.openLogin();
> 47 |         expect(await loginPage.isLoginPageExists()).toBeTruthy();
     |                                                     ^ Error: expect(received).toBeTruthy()
  48 |         await loginPage.login(customer.email, customer.password);
  49 |         expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
  50 |     });
  51 | 
  52 |     await test.step('4) Search for MacBook and open its product details', async () => {
  53 |         await homePage.searchProduct(expectedProduct.productName);
  54 |         expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();
  55 |         expect(await searchResultsPage.isProductDisplayed(expectedProduct.productName)).toBeTruthy();
  56 |         await searchResultsPage.openProduct(expectedProduct.productName);
  57 |         expect(await productPage.areProductDetailsDisplayed(
  58 |             expectedProduct.productName,
  59 |             expectedProduct.totalPrice,
  60 |         )).toBeTruthy();
  61 |     });
  62 | 
  63 |     await test.step('5) Add the product to the cart and verify the cart values', async () => {
  64 |         await productPage.addToCart(expectedProduct.productQuantity);
  65 |         await productPage.openShoppingCart();
  66 | 
  67 |         expect(await shoppingCartPage.isShoppingCartPageExists()).toBeTruthy();
  68 |         expect(await shoppingCartPage.isProductDisplayed(expectedProduct.productName)).toBeTruthy();
  69 |         expect(await shoppingCartPage.getProductQuantity(expectedProduct.productName))
  70 |             .toBe(expectedProduct.productQuantity);
  71 |         expect(await shoppingCartPage.getProductPrice(expectedProduct.productName))
  72 |             .toBe(expectedProduct.totalPrice);
  73 |         expect(await shoppingCartPage.getCartTotal()).toBe(expectedProduct.totalPrice);
  74 |     });
  75 | 
  76 |     console.log('✅ Customer registration, authentication, and shopping journey completed successfully.');
  77 | });
  78 | 
```