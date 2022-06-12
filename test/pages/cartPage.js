const BasePage = require("./basePage");

class CartPage extends BasePage {
    /*async applyBtn() {
        return await $(".promoBtn");
    };*/

    async ordersTable() {
        return await $$("table#productCartTables tbody");
    };

    async getProductName() {
        const name = await this.ordersTable();
        return await (await name.$(" .product-name").getText());
    };

    async getQuantity() {
        const quant = await this.ordersTable();
        const quantity = await (await quant.$(" .quantity")).getText();
        return +quantity;
    };

    async getPrice() {
        const pr = await this.ordersTable()
        const price = await (await pr.$("  td:nth-child(4) > p")).getText();
        return +price;
    };

    async getTotal() {
        const tot = await this.ordersTable();
        const total = await (await tot.$("  td:nth-child(5) > p")).getText();
        return +total;
    };

    async clickOnPlaceOrderBtn() {
        await (await $("//button[contains(text(),'Place Order')]")).click();
    };

};

module.exports = new CartPage();