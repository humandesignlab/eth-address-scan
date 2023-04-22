import generateAccount from "./account-generator.js";
import topAccounts from "../input-data/scrape-nov-22.js";

function guessAnAddress() {
  const topAccountsMap = new Map();

  topAccounts.forEach((item, index) =>
    topAccountsMap.set(item.toLocaleUpperCase(), index)
  );

  for (let i = 1; i <= 300000000; i++) {
    let account = generateAccount();

    // if (i === 4567) account.address = '0xa04d81f5c75cc159a72548caed8bb77192715bc8'

    if (topAccountsMap.has(account.address.toUpperCase())) {
      console.log({
        address: account.address,
        pk: account.privateKey,
        index: topAccountsMap.get(account.address.toUpperCase()),
      });
      return {
        address: account.address,
        pk: account.privateKey,
        index: topAccountsMap.get(account.address.toUpperCase()),
      };
    }
    i % 1000 === 0 ? console.log(i, account.address) : null;
  }
}
guessAnAddress();
