/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Web3Provider } from '@ethersproject/providers';
import { formatUnits } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import useEtherSWR from 'ether-swr';
import { BigNumber } from 'ethers';

export const TokenBalance = ({
  symbol,
  address,
  decimals,
}: {
  symbol: string;
  address: string;
  decimals: number;
}) => {
  const { account } = useWeb3React<Web3Provider>();

  const { data: balance, mutate } = useEtherSWR([address, 'balanceOf', account], {
    subscribe: [
      // A filter from anyone to me
      {
        name: 'Transfer',
        topics: [null, account],
        on: (
          state: BigNumber,
          fromAddress: string,
          toAddress: string,
          amount: BigNumber,
          event: any,
        ) => {
          console.log('receive', { event });
          const update = state.add(amount);
          mutate(update, false); // optimistic update skip re-fetch
        },
      },
      // A filter from me to anyone
      {
        name: 'Transfer',
        topics: [account, null],
        on: (
          state: BigNumber,
          fromAddress: string,
          toAddress: string,
          amount: BigNumber,
          event: any,
        ) => {
          console.log('send', { event });
          const update = state.sub(amount);
          mutate(update, false); // optimistic update skip re-fetch
        },
      },
    ],
  });

  if (!balance) {
    return <div>...</div>;
  }

  return (
    <div>
      {Number.parseFloat(formatUnits(balance, decimals)).toPrecision(4)} {symbol}
    </div>
  );
};
