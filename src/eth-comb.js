import crypto from 'crypto';
import Web3 from 'web3';
const web3 = new Web3('ws://localhost:8545');

import * as fs from 'fs';
let usersjson = fs.readFileSync('accounts.json', 'utf-8');
let targets = JSON.parse(usersjson);

//const targets = [];
let counter = 0;
export async function comb() {
  counter++;
  console.log(counter);
  for (let i = 0; i < 100; i++) {
    const pk = crypto.randomBytes(32).toString('hex');
    const addresFromPk = web3.eth.accounts.privateKeyToAccount(pk);
    const addressBalance = await web3.eth.getBalance(addresFromPk.address);

    if (addressBalance !== '0') {
      targets.push({
        privateKey: pk,
        address: addresFromPk.address,
        balance: addressBalance,
      });
      usersjson = JSON.stringify(targets);
      fs.writeFileSync('accounts.json', usersjson, 'utf-8');
      console.log('Fish caught!!');
    }
  }

  setTimeout(comb, 3000);
}
