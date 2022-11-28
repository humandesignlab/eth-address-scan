import axios from 'axios';
import * as fs from 'fs';
let positiveBalancesjson = fs.readFileSync('balances.json', 'utf-8');
let positiveBalances = JSON.parse(positiveBalancesjson);
let accountsjson = fs.readFileSync('src/merged-data/mergedData.json', 'utf-8');
const addresses = JSON.parse(accountsjson);
let index = 283260;
async function getBalances() {
  if (index > addresses.length - 1) return;
  await axios
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
      console.log(`index: ${index} of ${addresses.length - 1}`);
      console.log(data.address);
      console.log(hasBalance);
      console.log('response.data.items length: ', items.length);
      console.log('================');
    })
    .catch((error) => console.log(error.response));

  setTimeout(getBalances, 300);

  index++;
}
getBalances();
