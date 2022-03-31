import axios from 'axios';

// const address = '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8';

async function getOutTxsByAddress(address) {
  return axios
    .get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999999&page=1&offset=10000&sort=asc&apikey=PSAQ8QWCN9H4U1C9P756VJYWRMZEV45776`,
    )
    .then((response) => {
      const outTxsArr = response.data.result
        .map((item) => {
          if (item.from === address) {
            return item.hash;
          } else {
            return null;
          }
        })
        .filter((item) => item !== null);
      return { address, outTxsHashes: outTxsArr, outTxs: outTxsArr.length };
    })
    .catch((error) => console.log(error));
}

export default getOutTxsByAddress;
