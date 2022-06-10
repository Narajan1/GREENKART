const BasePage = require("./basePage");

class HomePage extends BasePage{

    async getRandomElement(index) { 
        const element = await $(`.products-wrapper > div > :nth-child(${index})`);
        await element.scrollIntoView();
        await element.waitForDisplayed();
        await browser.pause(3000);
    };

    async getElementName(index) {
        return await (await $(`.products-wrapper > div > :nth-child(${index})>h4`)).getText();
    };

    async getElementPrice(index){
        const price = await (await $(`.products-wrapper > div > :nth-child(${index})>p`)).getText();
        return +price;
    };

    async setElementQuantity(index, quantity){ 
        const elementQuantity = await $(`.products-wrapper > div > :nth-child(${index}) input[class='quantity']`)
        await elementQuantity.setValue(quantity);
    };

    async getAddToCartBtnAttr(index) {
        const addbtn = await $(`.products-wrapper > div > :nth-child(${index}) button`);
        return await addbtn.getAttribute('class');
    };

    async ClickOnAddToCartBtn(index) {
        await (await $(`.products-wrapper > div > :nth-child(${index}) button`)).click();
        
    };

    get cartInfoItemsCount() { return  $("//tbody/tr[1]/td[3]/strong")};

    async getcartInfoItemsCountValue(){
        const count = await (await this.cartInfoItemsCount).getText();
        return +count;
    };

    get cartInfoPrice() { return  $("//tbody/tr[2]/td[3]/strong") };

    async getcartInfoPriceValue() {
        const price = await (await this.cartInfoPrice).getText();
        return +price;
    };
};

module.exports = new HomePage();
