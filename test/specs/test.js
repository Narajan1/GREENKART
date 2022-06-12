const page = require("../pages/page");
const homepage = require("../pages/homePage");
const popuppage = require("../pages/popupPage");
const cartpage = require("../pages/cartPage");
const countryPage = require("../pages/countryPage");
const expectChai = require("chai").expect;

describe("Verify the page funcionality", async () => {

    const index = await Math.floor(Math.random() * 30);
    const quantity = await Math.round(Math.random()*10);

    before(async () => {

        // Navigate to "https://rahulshettyacademy.com/seleniumPractise/#/" page
        page.navigateTo("https://rahulshettyacademy.com/seleniumPractise/#/");
        require('expect-webdriverio').setOptions({ wait: 7000 });
        
    });

    //Assert page is opened (url)
    it("should check url", async () => {
        await expect(browser).toHaveUrl("https://rahulshettyacademy.com/seleniumPractise/#/");
    });

    //Assert page is opened (title)
    it("should check title", async () => {
        await expect(browser).toHaveTitle("GreenKart - veg and fruits kart");
    });

    //Add any element in any quantity to the cart 
    //Assert Items and Price are shown as expected in the cart info (top right)
    it("should check Add to popup functionality", async () => {
                
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
    //Click on the cart icon
    //Assert the same product is shown on the opened overlay
    it("should check popup overlay functionality", async () => {
        await popuppage.clickOnCartIcon();
        const productsList = await popuppage.AllProductsCount(); 
        await expect(productsList).toBeDisplayed();
        await expectChai(productsList.length).to.be.eq(1);
        
        const productName = await popuppage.ProductNameInPopup();
        const productPrice = +(await popuppage.ProductPriceInPopup());
        const productTotalAmount = +(await popuppage.ProductTotalPriceInPopup());

        const elNameHompage = await homepage.getElementName(index);
        await expectChai(productName).to.be.equal(elNameHompage);
        
        const elPriceHomepage = await homepage.getElementPrice(index);
        await expectChai(productPrice).to.be.equal(elPriceHomepage);

        //This 2 assertions below are valid if there is a just 1 product added
        const elTotalAmountHomepage = await homepage.getcartInfoPriceValue();
        await expectChai(productTotalAmount).to.be.equal(elTotalAmountHomepage);
        await expectChai(productTotalAmount).to.be.equal(elPriceHomepage*quantity);

    });

    //Click on "Proceed to checkout" button
    //Assert cart page is opened
    //Asset only one item is shown in the cart
    it("should check cart page functionality", async () => {
        await popuppage.ClickOnProceedToCheckoutBtn();
        await expect(browser).toHaveUrl("https://rahulshettyacademy.com/seleniumPractise/#/cart");

        const table = await cartpage.ordersTable();
        expectChai(table.length).to.be.equal(1);

        
    });

    //Click on "Place Order"
    //Check "Terms & Conditions" checkbox
    it("should check country page functionality", async () => {
        await cartpage.clickOnPlaceOrderBtn();
        await expect(browser).toHaveUrl("https://rahulshettyacademy.com/seleniumPractise/#/country");

        await countryPage.clickOnDdMenu();
        await countryPage.selectDropDownOption();
        const selectedOption = await countryPage.getSelectedOption();

        expectChai(await selectedOption.isDisplayed()).to.be.true;
        await countryPage.clickOnSelectedOption();

        await countryPage.clickOnCheckBox();
        const checkbox = await countryPage.getCheckBox();
        await expect(checkbox).toBeChecked();
    });

    //Click on "Proceed" button
    //Assert Success message is shown
    it("should check success message", async () => {
        await countryPage.clickOnProceedBtn();
        let successMassage = countryPage.successMassage();
        await expect(successMassage).toBeDisplayed();
    });
    
});