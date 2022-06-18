import puppeteer from 'puppeteer';
import * as fs from 'fs';
const routeTopAccounts = 'accounts/';
const targetSelectorTopAccounts =
  '#ContentPlaceHolder1_divTable > table > tbody > tr > td > a';

const routeGenesisAccounts = '/txs?block=0&p=';
const targetSelectorGenesisAccounts =
  '#paywall_mask > table > tbody > tr > td > span > a';

let accountsArrayjson = fs.readFileSync('genesis-accounts.json', 'utf-8');
let result = JSON.parse(accountsArrayjson);

async function scrape(route, query) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  for (let i = 170; i <= 178; i++) {
    await page.goto(`https://etherscan.io/${route}${i}`);
    let addressesByPage = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          '#paywall_mask > table > tbody > tr > td > span > a',
        ),
        (element) => element.textContent,
      ),
    );

    addressesByPage.forEach((item) => result.push(item));

    accountsArrayjson = JSON.stringify(result);
    fs.writeFileSync('genesis-accounts.json', accountsArrayjson, 'utf-8');
  }
  console.log(result);
  browser.close();
}
await scrape(routeGenesisAccounts);
