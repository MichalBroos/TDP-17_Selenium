const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");

describe("Test Movies FE", function () {
    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    afterEach(async () => {
        await driver.quit();
    });

    it("should have the correct h1 on /", async () => {
        await driver.get("http://localhost:3000/");
        const h1 = await driver.findElement(By.xpath("/html/body/div/h1")).getText();
        assert.equal(h1, "Movies FE + BE");
    });
});
