const page = require("../pages/page");
const homepage = require("../pages/homePage");
const cartpage = require("../pages/cartPage");
const expectChai = require("chai").expect;

describe("Verify the page funcionality", async () => {
    before(async () => {
        page.navigateTo("https://rahulshettyacademy.com/seleniumPractise/#/");
        require('expect-webdriverio').setOptions({ wait: 7000 });
        
    });

    it("should check url", async () => {
        await expect(browser).toHaveUrl("https://rahulshettyacademy.com/seleniumPractise/#/");
    });

    it("should check title", async () => {
        await expect(browser).toHaveTitle("GreenKart - veg and fruits kart");
    });

    it("should check Add to cart functionality", async () => {
        const index = await Math.floor(Math.random() * 30);
        const quantity = await Math.round(Math.random()*10);
        
        const element = await homepage.getRandomElement(index);
        const elementPrice = await homepage.getElementPrice(index);

        const attrOld = await homepage.getAddToCartBtnAttr(index);
        await expectChai(attrOld).to.be.empty;

        const itemCountTotalOld = await homepage.getcartInfoItemsCountValue();
        const itemPriceTotalOld = await homepage.getcartInfoPriceValue();
        await expectChai(itemCountTotalOld).to.be.equal(0);
        await expectChai(itemPriceTotalOld).to.be.equal(0);

        await homepage.setElementQuantity(index, quantity);

        await homepage.ClickOnAddToCartBtn(index);

        const attrNew = await homepage.getAddToCartBtnAttr(index);
        await expectChai(attrNew).to.be.equal('added');

        const itemCountTotal = await homepage.getcartInfoItemsCountValue();
        await expectChai(itemCountTotal).to.be.equal(1);
        const itemPriceTotal = await homepage.getcartInfoPriceValue();
        await expectChai(itemPriceTotal).to.be.equal(elementPrice*quantity);

    });

    it("favs", async () => {
        await cartpage.clickOnCartIcon();
    });
});