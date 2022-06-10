const BasePage = require("./basePage");

class OrdersPage extends BasePage {
    get ordersTable() { return await $("table#productCartTables tbody");};

    async getProductName() {
        return await (await this.ordersTable.$(" .product-name")).getText();
    };

    async getQuantity() {
        const quantity = await (await this.ordersTable.$(" .quantity")).getText();
        return +quantity;
    };

    async getPrice() {
        const price = await (await this.ordersTable.$("  td:nth-child(4) > p")).getText();
        return +price;
    };

    async getTotal() {
        const total = await (await this.ordersTable.$("  td:nth-child(5) > p")).getText();
        return +total;
    };

    async clickOnPlaceOrderBtn() {
        await (await $("//button[contains(text(),'Place Order')]")).click();
    };

};

module.exports = new OrdersPage();