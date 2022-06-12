const BasePage = require("./basePage");

class PopupPage extends BasePage {

    async clickOnCartIcon() {
        await(await $("img[alt='Cart']")).click();
    };

    async ProductInPopup() { 
        return await $("div[class='cart-preview active'] ul.cart-items li") };

    async ProductNameInPopup() {
        const product = await this.ProductInPopup();
        return await (await product.$(".product-name")).getText();

    };

    async ProductPriceInPopup() {
        const product = await this.ProductInPopup();
        return await (await product.$(".product-price")).getText();
    };

    async ProductTotalPriceInPopup() {
        const product = await this.ProductInPopup();
        return await (await product.$(".product-total .amount")).getText();
    };

    async AllProductsCount() {
        const productsList = await $$("div.cart-preview > div > div > ul li");
        return await productsList;
    }

    /*async ProductQuantity() {
        const product = await this.ProductInPopup();
        const string = await (await $("div.cart-preview > div > div > ul li p.quantity")).getText();
        const quantity = string.split(" ");
        return quantity[0];
        return string;
    }*/

    async ClickOnProceedToCheckoutBtn() {
        await (await $("div.cart-preview.active > div.action-block > button")).click();
    };
};

module.exports = new PopupPage();