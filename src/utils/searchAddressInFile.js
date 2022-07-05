import * as fs from 'fs';

function searchAddressInFile(address, fileName) {
  let readFileToLookInto = fs.readFileSync(
    `./src/merged-data/${fileName}.json`,
    'utf-8',
  );
  let arrayFromFileToLookInto = JSON.parse(readFileToLookInto);

  if (typeof address === 'string') {
    const index = arrayFromFileToLookInto.findIndex(
      (item) => item.address === address,
    );
    return { index: index, account: arrayFromFileToLookInto[index] };
  } else {
    const res = address.map((address) =>
      arrayFromFileToLookInto.findIndex((item) => item.address === address),
    );
    return { index: res.filter((item) => item !== -1) };
  }
}

console.log(
  searchAddressInFile(
    '0x1dcC7f61C24A91eb00E26A56730c0879c275958A',
    'mergedData',
  ),
);
