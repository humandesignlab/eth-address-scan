import * as fs from 'fs';
import getDuplicatedRParam from './dup-r-finder.js';
//const address = '0x73bceb1cd57c711feac4224d062b0f6ff338501e';
let genesisAccountsJson = fs.readFileSync('genesis-accounts2.json', 'utf-8');
let genesisAccounts = JSON.parse(genesisAccountsJson);

for await (let address of genesisAccounts) {
  console.log(await getDuplicatedRParam(address));
}
