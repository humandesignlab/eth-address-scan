import generateAccount from "./account-generator.js";
import topAccounts from "../input-data/scrape-nov-22.js";

function guessAnAddress() {
  for (let i = 1; i <= 300000000; i++) {
    let account = generateAccount();

    let index = topAccounts.findIndex(
      (item) => item.toUpperCase() === account.address.toUpperCase()
    );

    let isInArray = topAccounts.find(
      (item) => item.toUpperCase() === account.address.toUpperCase()
    );
    // if (index !== -1) {
    //   console.log("Found!", index);
    //   console.log({ address: account.address, PK: account.privateKey, index })
    //   return { address: account.address, PK: account.privateKey, index };
    // }
    if (isInArray) {
      console.log("Found!");
      console.log({ address: account.address, PK: account.privateKey, index });
      return { address: account.address, PK: account.privateKey, index };
    }

    console.log(i, account.address);
  }
}
guessAnAddress();
