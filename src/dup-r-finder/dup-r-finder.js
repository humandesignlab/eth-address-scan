import * as fs from 'fs';
import getOutTxsByAddress from './get-all-out-txs-from-address.js';
import findDupesInData from '../utils/find-dupes-in-data-array.js';
import Web3 from 'web3';
let web3 = new Web3('ws://localhost:8545');

let rDuplicatesJson = fs.readFileSync('r-duplicates.json', 'utf-8');
let rDuplicates = JSON.parse(rDuplicatesJson);

async function getDuplicatedRParam(address) {
  const txHashes = await getOutTxsByAddress(address);

  const { outTxsHashes } = txHashes;

  const promises = outTxsHashes.map(
    async (tx, index) =>
      await web3.eth.getTransaction(tx).then((res) => {
        console.log(`Got ${index + 1} hashes of ${outTxsHashes.length}`);
        return { txHash: res.hash, rVal: res.r, from: res.from };
      }),
  );
  const rParams = Promise.all(promises).then(function (results) {
    return results;
  });
  const result = rParams
    .then((res) => {
      // test if duplicate
      // res = [
      //   ...res,
      // {
      //   txHash:
      //     '0x70e49845b947dfc9b6b2789aedf87f7c88820e63a1d3d06bee01502dc4b11234',
      //   rVal: '0x180c748082ffcc3d0f6febff9ff94974af0a5cc4e2d02dcaa7c40faa400c4099',
      //   from: '0xBE0eB53F46cd790Cd13851d5EFf43D12404d3309',
      // },
      // {
      //   txHash:
      //     '0x70e49845b947dfc9b6b2789aedf87f7c88820e63a1d3d06bee01502dc4b11098',
      //   rVal: '0x180c748082ffcc3d0f6febff9ff94974af0a5cc4e2d02dcaa7c40faa400c4099',
      //   from: '0xBE0eB53F46cd790Cd13851d5EFf43D12404d3309',
      // },
      // {
      //   txHash:
      //     '0xe4ef8c7912685ccc032c0b38fae892842b6fc47cf63134caa6680f95dfe924cf',
      //   rVal: '0x59a424df0da6379a2fd77454916bb61fbba8f1579d71935305a123a676393b81',
      //   from: '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8',
      // },
      // {
      //   txHash:
      //     '0x27831e96495e85f73772feb471715b7572381754220018e36bc9e8f55ff1bc7f',
      //   rVal: '0x92b1072fe76bdc823ec9740811047c9dc3f1b0027f1af85620daaf6bda624279',
      //   from: '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8',
      // },
      // {
      //   txHash:
      //     '0x70e49845b947dfc9b6b2789aedf87f7c88820e63a1d3d06bee01502dc4b116bd',
      //   rVal: '0x180c748082ffcc3d0f6febff9ff94974af0a5cc4e2d02dcaa7c40faa400c7068',
      //   from: '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8',
      // },
      // ];
      const rVals = res.map((item) => item.rVal);
      const dupRVals = findDupesInData(rVals);
      const duplicates = dupRVals.map((_, index) =>
        res.filter((item) => item.rVal === dupRVals[index]),
      );

      if (duplicates.length > 0) {
        console.log(`Found duplicates for address ${address}.`);
        duplicates.forEach((item) => {
          rDuplicates[item[0].rVal] = item;
        });
        rDuplicatesJson = JSON.stringify(rDuplicates);
        fs.writeFileSync('r-duplicates.json', rDuplicatesJson, 'utf-8');
        return duplicates;
      } else {
        console.log(`No duplicate r found for address ${address}.`);
        return duplicates;
      }
    })
    .catch(function (error) {
      console.log('error: ', error.error);
      return error.error;
    });

  return result;
}

export default getDuplicatedRParam;
