import axios from 'axios';

async function getOutTxsByAddress(address) {
  return axios
    .get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999999&page=1&offset=10000&sort=asc&apikey=PSAQ8QWCN9H4U1C9P756VJYWRMZEV45776`,
    )
    .then((response) => {
      const outTxsArr = response.data.result
        .map((item) => {
          if (item.from.toUpperCase() === address.toUpperCase()) {
            return item.hash;
          } else {
            return null;
          }
        })
        .filter((item) => item !== null);
      console.log({
        address,
        outTxsHashes: outTxsArr,
        outTxs: outTxsArr.length,
      });
      return { address, outTxsHashes: outTxsArr, outTxs: outTxsArr.length };
    })
    .catch((error) => console.log(error));
}
export default getOutTxsByAddress;
