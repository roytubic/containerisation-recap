import puppeteer from'puppeteer';

async function getDebtAmount() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://worlddebtclocks.com/newzealand');
	const textSelector = await page.waitForSelector('#world > div > div > div > div:nth-child(3) > div > span.debt');
  	const debtAmount = await textSelector?.evaluate(el => el.textContent);
	await browser.close();
	return debtAmount
}

export { getDebtAmount };