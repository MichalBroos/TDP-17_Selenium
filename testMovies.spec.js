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
        const url1 = await driver.getCurrentUrl();
        // getAll link in navbar
        await driver.findElement(By.xpath("/html/body/div/a[1]")).click();
        const url2 = await driver.getCurrentUrl();
        console.log(url1, "?", url2);
        assert.equal(url1, url2);
    });

    it("getAll link from /add does not stay on /add", async () => {
        await driver.get("http://localhost:3000/add");
        const url1 = await driver.getCurrentUrl();
        // getAll link in navbar
        await driver.findElement(By.xpath("/html/body/div/a[1]")).click();
        const url2 = await driver.getCurrentUrl();
        console.log(url1, "?", url2);
        assert.notEqual(url1, url2);
    });

    it("getAll link from /getbyid ends on /", async () => {
        await driver.get("http://localhost:3000/getbyid");
        const url1 = "http://localhost:3000/";
        // getAll link in navbar
        await driver.findElement(By.xpath("/html/body/div/a[1]")).click();
        const url2 = await driver.getCurrentUrl();
        console.log(url1, "?", url2);
        assert.equal(url1, url2);
    });

    it("adding a movie redirects to /", async () => {
        const homeUrl = "http://localhost:3000/";
        await driver.get(`${homeUrl}add`);
        // Title input box
        await driver.findElement(By.name("title")).sendKeys("testAdd");
        // Submit button
        await driver.findElement(By.xpath("/html/body/div/form/button[1]")).click();
        // pause after submit redirect so getCurrentUrl doesn't run too early
        await driver.sleep(500);
        const endUrl = await driver.getCurrentUrl();
        console.log(homeUrl, "?", endUrl);
        assert.equal(homeUrl, endUrl);
    });

    it("cancel on /add redirects to /", async () => {
        const homeUrl = "http://localhost:3000/";
        await driver.get(`${homeUrl}add`);
        // Cancel button
        await driver.findElement(By.xpath("/html/body/div/form/button[2]")).click();
        // pause after cancel redirect so getCurrentUrl doesn't run too early
        await driver.sleep(500);
        const endUrl = await driver.getCurrentUrl();
        console.log(homeUrl, "?", endUrl);
        assert.equal(homeUrl, endUrl);
    });

    it("cancel on /getbyid redirects to /", async () => {
        const homeUrl = "http://localhost:3000/";
        await driver.get(`${homeUrl}getbyid`);
        // Cancel button
        await driver.findElement(By.xpath("/html/body/div/form/button[2]")).click();
        // pause after cancel redirect so getCurrentUrl doesn't run too early
        await driver.sleep(500);
        const endUrl = await driver.getCurrentUrl();
        console.log(homeUrl, "?", endUrl);
        assert.equal(homeUrl, endUrl);
    });

    it("/getbyid shows no movie on load", async () => {
        await driver.get("http://localhost:3000/getbyid");
        const result = await driver.findElement(By.xpath("/html/body/div/p")).getText();
        assert.match(result, /No movie with the given id found/);
    });

    it("/getbyid doesn't throw error when invalid id searched", async () => {
        // unsure how to write this test, it isn't right because throwing error explicitly
        // in the backend doesn't make this fail = test not working
        assert.doesNotThrow(async () => {
            await driver.get("http://localhost:3000/getbyid");
            // Id input box
            await driver.findElement(By.name("id")).sendKeys("invalidId");
            // Submit button
            await driver.findElement(By.xpath("/html/body/div/form/button[1]")).click();
        });
    });

    it("/getbyid shows no movie when invalid id searched", async () => {
        await driver.get("http://localhost:3000/getbyid");
        // Id input box
        await driver.findElement(By.name("id")).sendKeys("invalidId");
        // Submit button
        await driver.findElement(By.xpath("/html/body/div/form/button[1]")).click();
        // Search result
        const result = await driver.findElement(By.xpath("/html/body/div/p")).getText();
        assert.match(result, /No movie with the given id found/);
    });

    it("should have the correct h2 on /add", async () => {
        await driver.get("http://localhost:3000/add");
        const addH2 = await driver.findElement(By.xpath("/html/body/div/h2")).getText();
        assert.equal(addH2, "Add a new movie");
    });

    it("should have the correct h2 on /getbyid", async () => {
        await driver.get("http://localhost:3000/getbyid");
        const getByIdH2 = await driver.findElement(By.xpath("/html/body/div/h2")).getText();
        assert.equal(getByIdH2, "Search by id");
    });
});

// potential test "should have 3 links in navbar on /"
// delete - base on assumption a movie is in already
