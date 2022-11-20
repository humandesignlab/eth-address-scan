import * as fs from 'fs';
import topAccounts from '../input-data/scrape-nov-22.js';
import tornadoWithdraws from '../input-data/tornado-withdraws.js';

function searchAddressInFile(address, fileName) {
  let readFileToLookInto = fs.readFileSync(
    `./src/merged-data/${fileName}.json`,
    'utf-8',
  );
  let arrayFromFileToLookInto = JSON.parse(readFileToLookInto);

  if (typeof address === 'string') {
    const index = arrayFromFileToLookInto.findIndex(
      (item) => item.address.toUpperCase() === address.toUpperCase(),
    );
    return { index: index, account: arrayFromFileToLookInto[index] };
  } else {
    const res = address.map((account, index) => {
      console.log(`${index} of ${address.length}`);
      return arrayFromFileToLookInto.findIndex(
        (item) => item.address.toUpperCase() === account.toUpperCase(),
      );
    });
    return { index: res.filter((item) => item !== -1) };
  }
}
console.log(searchAddressInFile(topAccounts, 'mergedData'));
