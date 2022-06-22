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
        const homeH1 = await driver.findElement(By.xpath("/html/body/div/h1")).getText();
        assert.equal(homeH1, "Movies FE + BE");
    });

    it("getAll link from / stays on /", async () => {
        await driver.get("http://localhost:3000/");
        const url1 = await driver.getCurrentUrl()
        // getAll link in navbar
        await driver.findElement(By.xpath("/html/body/div/a[1]")).click();
        const url2 = await driver.getCurrentUrl()
        console.log(url1, "?", url2);
        assert.equal(url1, url2);
    });

    it("getAll link from /add does not stay on /add", async () => {
        await driver.get("http://localhost:3000/add");
        const url1 = await driver.getCurrentUrl()
        // getAll link in navbar
        await driver.findElement(By.xpath("/html/body/div/a[1]")).click();
        const url2 = await driver.getCurrentUrl()
        console.log(url1, "?", url2);
        assert.notEqual(url1, url2);
    });

    it("getAll link from /getbyid ends on /", async () => {
        await driver.get("http://localhost:3000/getbyid");
        const url1 = "http://localhost:3000/"
        // getAll link in navbar
        await driver.findElement(By.xpath("/html/body/div/a[1]")).click();
        const url2 = await driver.getCurrentUrl()
        console.log(url1, "?", url2);
        assert.equal(url1, url2);
    });
});
