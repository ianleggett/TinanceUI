import ERC20ABI from './ERC20.abi.json';

export const Networks = {
  UnknownNet: 0,
  MainNet: 1,
  Ropsten: 3,
  Rinkeby: 4,
  Goerli: 5,
  Kovan: 42,
  Local: 1337,
};
export interface IERC20 {
  symbol: string;
  address: string;
  decimals: number;
  name: string;
  abi: any;
}
