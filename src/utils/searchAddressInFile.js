import * as fs from 'fs';

function searchAddressInFile(address, fileName) {
  let readFile = fs.readFileSync(`${fileName}.json`, 'utf-8');
  let arrayFromFile = JSON.parse(readFile);
  const index = arrayFromFile.findIndex((item) => item.address === address);
  return { index: index, account: arrayFromFile[index] };
}

console.log(
  searchAddressInFile(
    '0x957cD4Ff9b3894FC78b5134A8DC72b032fFbC464',
    'accounts11',
  ),
);
