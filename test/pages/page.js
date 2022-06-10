const BasePage = require("./basePage");

class Page extends BasePage {
    async navigateTo(url) {
        return super.navigateTo(url);
    };
};

module.exports = new Page();