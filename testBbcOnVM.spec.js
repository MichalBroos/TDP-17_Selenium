const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");

describe("Testing BBC", function () {
    this.timeout(10000);
  
    let driver;
  
    // Makes a new driver window before each test
    beforeEach(async function () {
      driver = await new Builder().forBrowser("chrome").build();
      driver.manage().setTimeouts({ implicit: 5000 });
    });
  
    // Closes the driver after each test
    afterEach(async function () {
      driver.close();
    });
  
    // VM compatible test (redirect from .co.uk to .com + different elements)
    it("should contain Welcome header text", async function () {
      // Going to the BBC page
      driver.get("https://www.bbc.com");

      // cookies consent
      driver.findElement(By.className("fc-button fc-cta-consent fc-primary-button")).click();
  
      // Declaring my variables before accessing them
      let headerElement;
      let headerText;
  
      // Act
      // Finding the element I am interested in
      headerElement = await driver.findElement(
        By.xpath("/html/body/div[8]/div/section[2]/h2/span")
      );
  
      // Saving the getText() value of the element
      headerText = await headerElement.getText();
  
      // Assert
      assert.equal(headerText, "Welcome to BBC.com");
    });
  });
  