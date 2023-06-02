import {
  generateRandomAccount,
  generateIncrementalAccount,
} from './account-generator.js';
import hugeList from '../input-data/millionList.js';

import * as fs from 'fs';
let guessedJson = fs.readFileSync('./data/guessed.json', 'utf-8');
let guessed = JSON.parse(guessedJson);

function guessAnAddress() {
  let hexNumber = '00000000'; // Starting with all zeros
  let counter = 0;
  const topAccountsMap = new Map();

  hugeList.forEach((item, index) =>
    topAccountsMap.set(item.toUpperCase(), index)
  );

  while (
    hexNumber !==
    '00000000000000000000000000000000000000000000000000000000FFFFFFFF'
  ) {
    hexNumber = (BigInt('0x' + hexNumber) + BigInt(1))
      .toString(16)
      .padStart(64, '0')
      .toUpperCase();
    counter++;
    let randomAccount = generateRandomAccount();
    let incrementalAccount = generateIncrementalAccount(hexNumber);
    // console.log('randomAccount ', randomAccount);
    // console.log('-----------------------------------------');
    // console.log('hexNumber: ', hexNumber);
    // console.log('incrementalAccount ', incrementalAccount);
    // console.log('-----------------------------------------');

    // if (i === 4567) randomAccount.address = '0xa04d81f5c75cc159a72548caed8bb77192715bc8'

    // if (topAccountsMap.has(randomAccount.address.toUpperCase())) {
    //   console.log({
    //     address: randomAccount.address,
    //     pk: randomAccount.privateKey,
    //     index: topAccountsMap.get(randomAccount.address.toUpperCase()),
    //   });
    //   guessed.push({
    //     address: randomAccount.address,
    //     pk: randomAccount.privateKey,
    //     index: topAccountsMap.get(randomAccount.address.toUpperCase()),
    //   });
    //   guessedJson = JSON.stringify(guessed);
    //   fs.writeFileSync('./data/guessed.json', guessedJson, 'utf-8');

    //   return {
    //     address: randomAccount.address,
    //     pk: randomAccount.privateKey,
    //     index: topAccountsMap.get(randomAccount.address.toUpperCase()),
    //   };
    // }
    // i % 10000 === 0 ? console.log(i, randomAccount.address) : null;

    if (topAccountsMap.has(incrementalAccount.address.toUpperCase())) {
      console.log({
        address: incrementalAccount.address,
        pk: incrementalAccount.privateKey,
        index: topAccountsMap.get(incrementalAccount.address.toUpperCase()),
      });
      guessed.push({
        address: incrementalAccount.address,
        pk: incrementalAccount.privateKey,
        index: topAccountsMap.get(incrementalAccount.address.toUpperCase()),
      });
      guessedJson = JSON.stringify(guessed);
      fs.writeFileSync('./data/guessed.json', guessedJson, 'utf-8');

      return {
        address: incrementalAccount.address,
        pk: incrementalAccount.privateKey,
        index: topAccountsMap.get(incrementalAccount.address.toUpperCase()),
      };
    }
    counter % 10000 === 0
      ? console.log(counter, incrementalAccount.address)
      : null;
  }
}
guessAnAddress();
