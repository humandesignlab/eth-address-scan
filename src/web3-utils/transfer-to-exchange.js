import Web3 from 'web3';
import abi from '../../abis/Erc20.json';
const web3 = new Web3('ws://localhost:8545');

let now = new Date();
let nowPlus1Hr = now.setHours(now.getHours() + 1);

const account = '0xfc18f2115dde7aaf6e924de7e2395cc17decfb00';
const pk = 'a52680e83a4ea7a40e2a46e5f627bab129ebe8fc96071793c2dd5330dc18939b';
const tokenAddress = '0x3845badAde8e6dFF049820680d1F14bD3903a5d0';
const ftxAddress = '0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2';

// Get ERC20 Token contract instance
let contract = new web3.eth.Contract(abi, tokenAddress);
// calculate ERC20 token amount
const value = '982475000000000000';
const transfer = contract.methods.transfer(ftxAddress, value);
const encodedABI = transfer.encodeABI();

var tx = {
  from: ftxAddress,
  to: account,
  gas: '250000',
  gasPrice: '34520515323',
  data: encodedABI,
  value: value,
};

var signedTx = await web3.eth.accounts.signTransaction(tx, pk);

web3.eth
  .sendSignedTransaction(signedTx.rawTransaction)
  .on('transactionHash', function (hash) {
    console.log('hash: ', hash);
  })
  .on('confirmation', function (confirmationNumber, receipt) {
    console.log('confirmationNumber: ', confirmationNumber);
  })
  .on('receipt', function (receipt) {
    console.log('receipt: ', receipt);
  })
  .on('error', function (error, receipt) {
    // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    console.error('Error:', error, 'Receipt:', receipt);
  });
