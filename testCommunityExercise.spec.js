const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");

describe("Test automationpractice.com", function () {
    // increase if timeout exceeded (default of 2000 not enough)
    this.timeout(30000);

    let driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        // to avoid ElementNotInteractableError: element not interactable,
        // e.g. pop-up not rendered yet -> can't click a button in it
        // might need to increase if website too slow
        driver.manage().setTimeouts({ implicit: 2000 });
    });

    afterEach(async () => {
        await driver.quit();
    });

    it("should have the correct item in basket", async () => {
        await driver.get("http://automationpractice.com/index.php");
        // T-SHIRTS category
        await driver.findElement(By.xpath("/html/body/div/div[1]/header/div[3]/div/div/div[6]/ul/li[3]/a")).click();
        // first T-shirt item
        await driver.findElement(By.xpath("/html/body/div/div[2]/div/div[3]/div[2]/ul/li/div/div[2]/h5/a")).click();
        // T-shirt name on the item screen
        const itemName = await driver.findElement(
            By.xpath("/html/body/div/div[2]/div/div[3]/div/div/div/div[3]/h1")).getText();
        // Add to cart button
        await driver.findElement(
            By.xpath("/html/body/div/div[2]/div/div[3]/div/div/div/div[4]/form/div/div[3]/div/p/button/span")).click();
        // Proceed to checkout button in pop-up
        await driver.findElement(
            By.xpath("/html/body/div/div[1]/header/div[3]/div/div/div[4]/div[1]/div[2]/div[4]/a")).click();
            // or By.className("btn btn-default button button-medium")
        // item name in basket
        const itemNameInBasket = await driver.findElement(
            By.xpath("/html/body/div/div[2]/div/div[3]/div/div[2]/table/tbody/tr/td[2]/p/a")).getText();
        // assert
        assert.equal(itemName, itemNameInBasket);
    });
});
