import puppeteer from 'puppeteer';
import * as fs from 'fs';
const routeTopAccounts = 'accounts/';
const targetSelectorTopAccounts =
  '#ContentPlaceHolder1_divTable > table > tbody > tr > td > a';

const routeGenesisAccounts = '/txs?block=0&p=';
const targetSelectorGenesisAccounts =
  '#paywall_mask > table > tbody > tr > td > span > a';

let accountsArrayjson = fs.readFileSync(
  'src/input-data/scrape-apr-23.json',
  'utf-8',
);
let result = JSON.parse(accountsArrayjson);

async function scrape(route, query) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  for (let i =391; i <= 400; i++) {
    await page.goto(`https://etherscan.io/${route}${i}`);
    let addressesByPage = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          '#ContentPlaceHolder1_divTable > table > tbody > tr > td > a:nth-of-type(2)',
        ),
        (element) => element.getAttribute('data-clipboard-text'),
      ),
    );

    addressesByPage.forEach((item) => result.push(item));

    accountsArrayjson = JSON.stringify(result);
    fs.writeFileSync(
      'src/input-data/scrape-apr-23.json',
      accountsArrayjson,
      'utf-8',
    );
  }
  console.log(result);
  browser.close();
}
scrape(routeTopAccounts);
