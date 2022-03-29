import axios from 'axios';
import * as fs from 'fs';
let hasTransactionsjson = fs.readFileSync('acounts-with-txs.json', 'utf-8');
let hasTransactions = JSON.parse(hasTransactionsjson);
let accountsjson = fs.readFileSync('accounts05.json', 'utf-8');
const addresses = JSON.parse(accountsjson);
let index = 0;
function getTransactions() {
  if (index > addresses.length) return;
  try {
    axios
      .get(
        `https://api.covalenthq.com/v1/1/address/${addresses[index].address}/transactions_v2/?key=ckey_23bae6f6a8d44c73b23c43e40ac`,
      )
      .then(function (response) {
        const { data } = response.data;
        const { items } = data;
        let accountHasTransactions = items.length > 0;
        if (accountHasTransactions) {
          hasTransactions.push({
            addressWithTransactions: data.address,
          });
          hasTransactionsjson = JSON.stringify(hasTransactions);
          fs.writeFileSync(
            'acounts-with-txs.json',
            hasTransactionsjson,
            'utf-8',
          );
        }
        console.log('index: ', index);
        console.log(data.address);
        console.log(accountHasTransactions);
        console.log('================');
      })
      .catch((error) => console.log(error.response.data.error));
  } catch (error) {
    console.log(error);
  }

  setTimeout(getTransactions, 300);

  index++;
}
getTransactions();
