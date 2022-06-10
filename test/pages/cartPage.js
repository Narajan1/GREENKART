const BasePage = require("./basePage");

class CartPage extends BasePage {

    async clickOnCartIcon() {
        await(await $("img[alt='Cart']")).click();
    };

    get ProductInPopup() { return await $("div[class='cart-preview active'] ul.cart-items li") };

    async ProductNameInPopup() {
        return await (await this.ProductInPopup.$(".product-name")).getText();
    };

    async ProductPriceInPopup() {
        return await (await this.ProductInPopup.$(".product-price")).getText();
    };

    async ProductTotalPriceInPopup() {
        return await (await this.ProductInPopup.$(".product-total .amount")).getText();
    };

    async ClickOnProceedToCheckoutBtn() {
        await (await $("div.cart-preview.active > div.action-block > button")).click();
    };
};

module.exports = new CartPage();