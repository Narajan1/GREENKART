module.exports = class BasePage {
    async navigateTo(url) {
        await browser.url("https://rahulshettyacademy.com/seleniumPractise/#/");
        await browser.maximizeWindow();
    };
};