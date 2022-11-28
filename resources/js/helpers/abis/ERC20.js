const ERC20ABI = [
  // Some details about the token
  "function name() view returns (string)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",

  // Get the account balance
  "function balanceOf(address) view returns (uint)",

  // Send some of your tokens to someone else
  "function transfer(address to, uint amount)",
  "function approve(address spender, uint256 amount) external returns (bool)",

  "function allowance(address owner, address spender) view returns(uint256)",

  // An event triggered whenever anyone transfers to someone else
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

export default ERC20ABI;
