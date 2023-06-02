import * as fs from 'fs';
let aListJson = fs.readFileSync('./data/aList.json', 'utf-8');
let aList = JSON.parse(aListJson);

function hexIncremental() {
  let hexNumber = '0000'; // Starting with all zeros
  let counter = 0;
  while (hexNumber !== 'FFFF') {
    // Perform operations with the current hexNumber
    // Increment the hexNumber by 1
    hexNumber = (parseInt(hexNumber, 16) + 1)
      .toString(16)
      .padStart(4, '0')
      .toUpperCase();
    counter++;
    aList.push(hexNumber);
    counter % 10000 === 0 ? console.log(counter, hexNumber) : null;
  }
  console.log('Largest hexadecimal number reached!');
  aListJson = JSON.stringify(aList);
  fs.writeFileSync('./data/aList.json', aListJson, 'utf-8');
}

hexIncremental();
