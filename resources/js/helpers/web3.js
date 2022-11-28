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

function listenForChange() {
  window.ethereum.on("accountsChanged", async (accounts) => {
    store.dispatch("web3/setWallet", accounts[0]);
  });
}
