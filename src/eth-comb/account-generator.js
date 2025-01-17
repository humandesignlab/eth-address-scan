import crypto from 'crypto';
import Web3 from 'web3';
const web3 = new Web3('ws://localhost:8545');

export function generateRandomAccount() {
  const pk = crypto.randomBytes(32).toString('hex');
  const addresFromPk = web3.eth.accounts.privateKeyToAccount(`0x${pk}`);

  return addresFromPk;
}

export function generateIncrementalAccount(pk) {
  const addresFromPk = web3.eth.accounts.privateKeyToAccount(`0x${pk}`);

  return addresFromPk;
}
