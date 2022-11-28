import { ethers } from "ethers";

import store from "../store/store";

export async function setProvider() {
  let provider;

  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const walletAddress = await provider.listAccounts();
    store.dispatch("web3/setWallet", walletAddress[0]);
    listenForChange();
  } else {
    provider = undefined;
  }

  store.dispatch("web3/setProvider", provider);

  return provider;
}

/**
 *
 * @param {Obj} | buyAddr, sellAddr, sellAmount
 * @returns
 */
export async function getQuote(swapData) {
  let amount;
  console.log(swapData);

  const response = await fetch(
    `https://fantom.api.0x.org/swap/v1/quote?buyToken=${swapData.buyAddr}&sellToken=${swapData.sellAddr}&sellAmount=${swapData.sellAmount}&feeRecipient=0xc7BF7E22eD98404dE1802d0d0d1844BE21394685&buyTokenPercentageFee=0.01`
  );

  const data = await response.json();

  if (data.hasOwnProperty("orders")) {
    const ordersLength = data.orders.length;

    const buyAmount = ethers.utils.formatUnits(
      data.orders[ordersLength - 1].makerAmount,
      swapData.decimals
    );

    amount = buyAmount;
  } else {
    amount = 0;
  }

  return amount;
}

function listenForChange() {
  window.ethereum.on("accountsChanged", async (accounts) => {
    store.dispatch("web3/setWallet", accounts[0]);
  });
}
