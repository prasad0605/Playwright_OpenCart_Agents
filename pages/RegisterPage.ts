import { expect, Locator, Page } from '@playwright/test';
import { CustomerRegistrationData } from '../utils/dataGenerator';

export class RegisterPage {
    private readonly page: Page;

    // Locators
    private readonly firstNameField: Locator;
    private readonly lastNameField: Locator;
    private readonly emailField: Locator;
    private readonly telephoneField: Locator;
    private readonly passwordField: Locator;
    private readonly confirmPasswordField: Locator;
    private readonly privacyPolicyCheckbox: Locator;
    private readonly continueButton: Locator;
    private readonly accountCreatedHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.firstNameField = page.getByLabel('First Name');
        this.lastNameField = page.getByLabel('Last Name');
        this.emailField = page.getByLabel('E-Mail');
        this.telephoneField = page.getByLabel('Telephone');
        this.passwordField = page.getByLabel('Password', { exact: true });
        this.confirmPasswordField = page.getByLabel('Password Confirm');
        this.privacyPolicyCheckbox = page.getByRole('checkbox');
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
        this.accountCreatedHeading = page.getByRole('heading', {
            name: 'Your Account Has Been Created!',
            exact: true,
        });
    }

    /**
     * Verifies that the registration form is displayed.
     * @returns Promise<boolean> - true if the registration page is displayed
     */
    async isRegisterPageExists(): Promise<boolean> {
        await expect(this.page.getByRole('heading', { name: 'Register Account', exact: true }))
            .toBeVisible();
        return true;
    }

    /**
     * Submits the registration form with generated customer data.
     * @param customer - Customer details to register
     */
    async completeRegistration(customer: CustomerRegistrationData): Promise<void> {
        try {
            await this.firstNameField.fill(customer.firstName);
            await this.lastNameField.fill(customer.lastName);
            await this.emailField.fill(customer.email);
            await this.telephoneField.fill(customer.telephone);
            await this.passwordField.fill(customer.password);
            await this.confirmPasswordField.fill(customer.password);
            await this.privacyPolicyCheckbox.check();
            await this.continueButton.click();
        } catch (error) {
            console.log(`Error completing customer registration: ${error}`);
            throw error;
        }
    }

    /**
     * Verifies the account-created confirmation.
     * @returns Promise<boolean> - true if registration succeeded
     */
    async isAccountCreated(): Promise<boolean> {
        await expect(this.accountCreatedHeading).toBeVisible();
        return true;
    }
}
