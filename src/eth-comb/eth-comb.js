// import crypto from 'crypto';
// import Web3 from 'web3';
// const web3 = new Web3('ws://localhost:8545');

import generateAccount from './account-generator.js'

import * as fs from 'fs';
let accountsjson = fs.readFileSync('./src/data/accounts21.json', 'utf-8');
let accounts = JSON.parse(accountsjson);
// let targetsjson = fs.readFileSync('targets.json', 'utf-8');
// let targets = JSON.parse(targetsjson);

//const targets = [];
let counter = 0;
export async function comb() {
  counter++;
  console.log(counter * 100);
  for (let i = 0; i < 100; i++) {

    // const addressBalance = await web3.eth.getBalance(addresFromPk.address);

    // if (addressBalance !== '0') {
    //   targets.push({
    //     privateKey: pk,
    //     address: addresFromPk.address,
    //     balance: addressBalance,
    //   });
    //   targetsjson = JSON.stringify(targets);
    //   fs.writeFileSync('targets.json', targetsjson, 'utf-8');
    //   console.log('Fish caught!!');
    // }
    accounts.push(generateAccount());
    accountsjson = JSON.stringify(accounts);
    fs.writeFileSync('./src/data/accounts21.json', accountsjson, 'utf-8');
  }

  setTimeout(comb, 300);
}
