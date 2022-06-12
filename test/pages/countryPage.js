const BasePage = require("./basePage");

class CountryPage extends BasePage {

    async DropDownMenu() {
        return await $(".wrapperTwo div select");
    };

    async clickOnDdMenu() {
        await (await this.DropDownMenu()).click();
    }

    async selectDropDownOption() {
        const menu = await this.DropDownMenu();
        await menu.selectByVisibleText('Armenia');
    };

    async getSelectedOption() {
        return await $(".wrapperTwo div select option:nth-child(10)");
    };

    async clickOnSelectedOption() {
        const country = await this.getSelectedOption();
        await country.click();
    };

    async getCheckBox() {
        return await $(".chkAgree");
    };

    async clickOnCheckBox() {
        await (await this.getCheckBox()).click();
    };
    
    async clickOnProceedBtn() {
        await (await $("//button")).click();
    };

    async successMassage() {
        return await $("//*[contains(text(),'Thank')]");
    };

};

module.exports = new CountryPage();
