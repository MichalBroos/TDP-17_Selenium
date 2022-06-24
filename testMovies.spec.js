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

    it("navbar has the correct links (text) on /", async () => {
        await driver.get("http://localhost:3000/");
        // tagName deprecated, selenium docs - use css instead
        // const a = await driver.findElement(By.tagName("a"));
        // let a = [];
        // await driver.findElements(By.css("a"))
        //     .then(links => {
        //         for (let link of links) {
        //             a.push(link.getAttribute('outerHTML'));
        //         }
        //     });
        // await Promise.all(a).then(vals => console.log(vals))
            // .then(html => console.log(html));
        // console.log("arr", a);
        // console.log("arr:", links[0].getAttribute('innerHTML').then((s) => s));

        // await driver.findElements(By.css("a"))
        //     .then(links => links.forEach(link => link.getAttribute('outerHTML').then(html => a.push((html)))));

        // await driver.findElements(By.css("a"))
        //     .then(links => Promise.all(links).then(vals => a.push(vals)));

        // await driver.findElements(By.css("a"))
        // // then resolves Promise and links should then be array of webelements
        //     .then(links => {
        //         for (let i = 0; i < links.length; i++) {
        //             // for each webelement, call getAttributes which returns Promise<string>
        //             links[i].getAttribute('outerHTML').then(html => {
        //                 // then resolves Promise, html is string wanted, log works, push doesn't
        //                 console.log(html);
        //                 a.push(html);
        //             });
        //         }
        //     });

        // solution
        let expected = "getAll, add, getById";
        let promises = [];
        await driver.findElements(By.css("a"))
            .then(links => {
                for (let link of links) {
                    promises.push(link.getText());
                }
            });
        let actual = (await Promise.all(promises)).join(", ");
        assert.equal(actual, expected);
    });

    it("should have 3 links (a tags) on /", async () => {
        const expectedLength = 3;
        await driver.get("http://localhost:3000/");
        await driver.findElements(By.css("a"))
            .then(links => assert.equal(links.length, expectedLength));
    });

    it("should have 3 links (a tags) on /add", async () => {
        const expectedLength = 3;
        await driver.get("http://localhost:3000/add");
        await driver.findElements(By.css("a"))
            .then(links => assert.equal(links.length, expectedLength));
    });

    it("should have 3 links (a tags) on /getbyid", async () => {
        const expectedLength = 3;
        await driver.get("http://localhost:3000/getbyid");
        await driver.findElements(By.css("a"))
            .then(links => assert.equal(links.length, expectedLength));
    });

    it("navbar has the correct links (text) on /add", async () => {
        let expected = "getAll, add, getById";
        let promises = [];
        await driver.get("http://localhost:3000/add");
        await driver.findElements(By.css("a"))
            .then(links => {
                for (let link of links) {
                    promises.push(link.getText());
                }
            });
        let actual = (await Promise.all(promises)).join(", ");
        assert.equal(actual, expected);
    });

    it("navbar has the correct links (text) on /getbyid", async () => {
        let expected = "getAll, add, getById";
        let promises = [];
        await driver.get("http://localhost:3000/getbyid");
        await driver.findElements(By.css("a"))
            .then(links => {
                for (let link of links) {
                    promises.push(link.getText());
                }
            });
        let actual = (await Promise.all(promises)).join(", ");
        assert.equal(actual, expected);
    });

    it("navbar has the correct links (href) on /", async () => {
        let expected = "/, /add, /getbyid"
        let promises = [];
        await driver.get("http://localhost:3000/");
        await driver.findElements(By.css("a"))
            .then(links => {
                for (let link of links) {
                    promises.push(link.getAttribute("href"));
                }
            });
        let actual = (await Promise.all(promises))
                        .map(s => s.substring(s.lastIndexOf("/"))).join(", ");
        assert.equal(actual, expected);
    });

    it("navbar has the correct links (href) on /add", async () => {
        let expected = "/, /add, /getbyid"
        let promises = [];
        await driver.get("http://localhost:3000/add");
        await driver.findElements(By.css("a"))
            .then(links => {
                for (let link of links) {
                    promises.push(link.getAttribute("href"));
                }
            });
        let actual = (await Promise.all(promises))
                        .map(s => s.substring(s.lastIndexOf("/"))).join(", ");
        assert.equal(actual, expected);
    });

    it("navbar has the correct links (href) on /getbyid", async () => {
        let expected = "/, /add, /getbyid"
        let promises = [];
        await driver.get("http://localhost:3000/getbyid");
        await driver.findElements(By.css("a"))
            .then(links => {
                for (let link of links) {
                    promises.push(link.getAttribute("href"));
                }
            });
        let actual = (await Promise.all(promises))
                        .map(s => s.substring(s.lastIndexOf("/"))).join(", ");
        assert.equal(actual, expected);
    });
});

// potential test "should have 3 links in navbar on /"
// delete - base on assumption a movie is in already
