const puppeteer = require('puppeteer')

describe("My first Setup Testing",()=>{
    let browser

    beforeEach(async () => {
        browser = await puppeteer.launch({headless: true})
    })

    it("Ensure puppeteer is launching",async()=>{
        const page = await browser.newPage();
    });

    afterEach(async () => {
        await browser.close();
    })
});