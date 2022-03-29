import Web3 from 'web3';
import axios from 'axios';

let web3 = new Web3('ws://localhost:8545');
const account = '0xdcc703c0E500B653Ca82273B7BFAd8045D85a470';

axios
  .get(
    `https://api.covalenthq.com/v1/1/address/${account}/transactions_v2/?key=ckey_23bae6f6a8d44c73b23c43e40ac`
  )
  .then(function (response) {
    // handle success
    const txFilteredArray = [];
    const address = response.data.data.address;
    response.data.data.items.forEach((item) => {
      if (item['from_address'] === address) {
        txFilteredArray.push(item['tx_hash']);
      }
    });
    const promises = txFilteredArray.map(
      async (tx) =>
        await web3.eth.getTransaction(tx).then((res) => {
          return { txHash: res.hash, rVal: res.r, from: res.from };
        })
    );
    const rParams = Promise.all(promises).then(function (results) {
      return results;
    });
    rParams.then((res) => {
      // test if duplicate
      // res = [
      //   ...res,
      //   {
      //     txHash: 'whatevs',
      //     rVal: '0xc74df5350df67290f01f68bbb80448faf7734bc059c7ad52ede0cb0268903bcd',
      //     from: 'whatevs',
      //   },
      // ];
      const rVals = res.map((item) => item.rVal);
      const duplicates = rVals.filter(
        (item, index) => rVals.indexOf(item) !== index
      );
      if (duplicates.length > 0) {
        console.log('Found duplicate r! ', duplicates);
      } else {
        console.log(
          'Number of sent transactions from this account: ',
          rVals.length
        );
        console.log('No duplicate r found!');
      }
    });
  })
  .catch(function (error) {
    // handle error
    console.log('error: ', error.error);
  });

web3.eth.getBalance(account).then(console.log);
