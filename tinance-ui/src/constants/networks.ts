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

export const ECSROW_BY_NETWORK: {
  [key: number]: string;
} = {
  [Networks.UnknownNet]: '',
  [Networks.MainNet]: '',
  [Networks.Rinkeby]: '',
  [Networks.Kovan]: '0x25b605D31B85a38c34c0a94cC26ceB6817f86E0D',
  [Networks.Local]: '0xBAF535eB7000A6b5Ea29f7D287574cb3a072DDE6',
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
  [Networks.UnknownNet]: [
    {
      address: '',
      symbol: 'USDT',
      name: 'USDT',
      decimals: 2,
      abi: ERC20ABI,
    },
  ],
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
      address: '0xa2d7D534ea1952cB9C24334464E1289A7C460F4d', // was '0xd0e03ce5e1917dad909a5b7f03397b055d4ae9c6',
      symbol: 'USDT',
      name: 'USDT',
      decimals: 2,
      abi: ERC20ABI,
    },
  ],
  [Networks.Local]: [
    {
      address: '0x39404Ef8E4Eb45242930A0c469d0aC5D9F8Dba64',
      symbol: 'USDT',
      name: 'USDT',
      decimals: 2,
      abi: ERC20ABI,
    },
  ],
};
