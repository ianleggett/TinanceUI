import ERC20ABI from './ERC20.abi.json';

export const Networks = {
  MainNet: 1,
  Ropsten: 3,
  Rinkeby: 4,
  Goerli: 5,
  Kovan: 42,
};

export interface IERC20 {
  symbol: string;
  address: string;
  decimals: number;
  name: string;
  abi: any;
}

export const TOKENS_BY_NETWORK: {
  [key: number]: IERC20[];
} = {
  [Networks.MainNet]: [
    {
      address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
      symbol: 'USDT',
      name: 'USDT',
      decimals: 2,
      abi: ERC20ABI,
    },
  ],
  [Networks.Rinkeby]: [
    {
      address: '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa',
      symbol: 'USDT',
      name: 'USDT',
      decimals: 2,
      abi: ERC20ABI,
    },
  ],
  [Networks.Kovan]: [
    {
      address: '0xd0e03ce5e1917dad909a5b7f03397b055d4ae9c6',
      symbol: 'USDT',
      name: 'USDT',
      decimals: 2,
      abi: ERC20ABI,
    },
  ],
};
