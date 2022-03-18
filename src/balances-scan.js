import axios from 'axios';
import * as fs from 'fs';
let positiveBalancesjson = fs.readFileSync('balances.json', 'utf-8');
let positiveBalances = JSON.parse(positiveBalancesjson);
let accountsjson = fs.readFileSync('accounts.json', 'utf-8');
const addresses = JSON.parse(accountsjson);
let index = 0;
function getBalances() {
  if (index > addresses.length) return;
  try {
    axios
      .get(
        `https://api.covalenthq.com/v1/1/address/${addresses[index].address}/balances_v2/?key=ckey_23bae6f6a8d44c73b23c43e40ac`,
      )
      .then(function (response) {
        const { data } = response.data;
        const { items } = data;
        let hasBalance = items.some((item) => item.balance !== '0');
        if (hasBalance) {
          positiveBalances.push({
            addressWithBalance: data.address,
          });
          positiveBalancesjson = JSON.stringify(positiveBalances);
          fs.writeFileSync('balances.json', positiveBalancesjson, 'utf-8');
        }
        console.log('index: ', index);
        console.log(data.address);
        console.log(hasBalance);
        console.log('================');
      })
      .catch((error) => console.log(error.response.data.error));
  } catch (error) {
    console.log(error.data);
  }

  setTimeout(getBalances, 300);

  index++;
}
getBalances();
