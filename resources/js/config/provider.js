import WalletConnectProvider from "@walletconnect/web3-provider/dist/umd/index.min.js";

export const provider = new WalletConnectProvider({
  infuraId: "ded4b2bc07bd4ce78f5d7db078785e23",
  qrcodeModalOptions: {
    desktopLinks: ["wallet"],
  },
});
