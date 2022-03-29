import * as fs from 'fs';
const accountsjson = fs.readFileSync('accounts.json', 'utf-8');
const addresses = JSON.parse(accountsjson);

function findDupesInData(arr) {
  const duplicates = new Set();

  const result = arr.filter((item) => {
    if (duplicates.has(item.address)) {
      console.log('HAS duplicates', item.address);
      return true;
    }
    duplicates.add(item.address);
    console.log('NOT duplicate');
    return false;
  });
  return result;
}

findDupesInData(addresses);
