export class Helper {
    static convertPriceToNumber(price: string): number {
        const cleanedValue = price.replace(/[^0-9.]/g, '');
        return Number(cleanedValue);
    }

    static getProductDetails() {
        return {
            productName: 'MacBook',
            productQuantity: '1',
            totalPrice: '$602.00',
        };
    }

    static getLoginDetails() {
        return {
            email: 'pavanol@xyz.com',
            password: 'test@123',
        };
    }
}
