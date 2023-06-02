import generateAccount from "./account-generator.js";
import hugeList from "../input-data/millionList.js";

import * as fs from 'fs';
let guessedJson = fs.readFileSync('./data/guessed.json', 'utf-8');
let guessed = JSON.parse(guessedJson);

function guessAnAddress() {
  const topAccountsMap = new Map();

  hugeList.forEach((item, index) =>
    topAccountsMap.set(item.toUpperCase(), index)
  );

  for (let i = 1; i <= 500000000; i++) {
    let account = generateAccount();

    // if (i === 14567) account.address = '0xc960aaa543bdd8e6fe610cabae88016d4f9b9c40'

    if (topAccountsMap.has(account.address.toUpperCase())) {
      console.log({
        address: account.address,
        pk: account.privateKey,
        index: topAccountsMap.get(account.address.toUpperCase()),
      });
      guessed.push({
        address: account.address,
        pk: account.privateKey,
        index: topAccountsMap.get(account.address.toUpperCase()),
      });
      guessedJson = JSON.stringify(guessed);
      fs.writeFileSync('./data/guessed.json', guessedJson, 'utf-8');

      return {
        address: account.address,
        pk: account.privateKey,
        index: topAccountsMap.get(account.address.toUpperCase()),
      };
    }
    i % 10000 === 0 ? console.log(i, account.address) : null;
  }
}
guessAnAddress();
