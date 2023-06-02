import crypto from 'crypto';
import Web3 from 'web3';
const web3 = new Web3('ws://localhost:8545');

export default function generateAccount() {
    const pk = crypto.randomBytes(32).toString('hex');
    const addressFromPk = web3.eth.accounts.privateKeyToAccount(`0x${pk}`);

    return addressFromPk
}

