import puppeteer from 'puppeteer';
import * as fs from 'fs';
let accountsArrayjson = fs.readFileSync('ethscan-scrape-res.json', 'utf-8');
let result = JSON.parse(accountsArrayjson);
async function scrape() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  for (let i = 381; i <= 400; i++) {
    await page.goto(`https://etherscan.io/accounts/${i}`);
    let addressesByPage = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          '#ContentPlaceHolder1_divTable > table > tbody > tr > td > a',
        ),
        (element) => element.textContent,
      ),
    );

    addressesByPage.forEach((item) => result.push(item));

    accountsArrayjson = JSON.stringify(result);
    fs.writeFileSync('ethscan-scrape-res.json', accountsArrayjson, 'utf-8');
  }
  console.log(result);
  browser.close();
}
scrape();
