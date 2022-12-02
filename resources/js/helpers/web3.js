import { ethers } from "ethers";

import ERC20ABI from "./abis/ERC20.js";
import store from "../store/store";

export async function getProvider() {
  let provider;

  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    listenForChange();
  } else {
    provider = undefined;
  }

  return provider;
}

function listenForChange() {
  window.ethereum.on("accountsChanged", async (accounts) => {
    store.dispatch("web3/setWallet", accounts[0]);
    const network = await store.getters["web3/provider"].getNetwork();
  });

  window.ethereum.on("networkChanged", async (networkId) => {
    store.commit("web3/setChainId", networkId);
  });
}

/**
 * getContract
 * @param {string} address
 * @returns
 */
export async function getContract(address) {
  return new ethers.Contract(
    address,
    ERC20ABI,
    store.getters["web3/provider"].getSigner()
  );
}

/**
 *
 * @param {Obj} | buyAddr, sellAddr, sellAmount
 * @returns
 */
export async function getQuote(swapData) {
  let amount;
  const response = await fetch(
    `https://fantom.api.0x.org/swap/v1/quote?buyToken=${swapData.buyAddr}&sellToken=${swapData.sellAddr}&sellAmount=${swapData.sellAmount}&feeRecipient=0xc7BF7E22eD98404dE1802d0d0d1844BE21394685&buyTokenPercentageFee=0.005`
  );

  const data = await response.json();

  if (data.hasOwnProperty("orders")) {
    const buyAmount = ethers.utils.formatUnits(
      data.buyAmount,
      swapData.buyDecimals
    );

    amount = buyAmount;
  } else {
    amount = 0;
  }

  return amount;
}
