import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { disconnect } from 'process';
import React, { useMemo } from 'react';
import { SWRConfig } from 'swr';
import fetcher from 'swr-eth';

import { useEagerConnect } from '../hooks/useEagerConnect';
import { useInactiveListener } from '../hooks/useInactiveListener';
import { Networks, TOKENS_BY_NETWORK } from '../utils';

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    Networks.MainNet, // Mainet
    Networks.Ropsten, // Ropsten
    Networks.Rinkeby, // Rinkeby
    Networks.Goerli, // Goerli
    Networks.Kovan, // Kovan
  ],
});

const doDisconnect = () => {
  injectedConnector.deactivate();
};

export const Wallet = () => {
  const { chainId, account, library, activate, active, connector } = useWeb3React<Web3Provider>();

  // [
  //   [ 0x00001, JSONABI ]
  // ]
  // const ABIs = useMemo(() => {
  //   return (TOKENS_BY_NETWORK[chainId] || []).map<[string, any]>(({ address, abi }) => [
  //     address,
  //     abi,
  //   ]);
  // }, [chainId]);

  const ABIs = TOKENS_BY_NETWORK[Networks.Kovan];

  const doActivate = () => {
    activate(injectedConnector);
  };

  return (
    <div>
      {/* <div>ChainId: {chainId}</div> */}
      <div>Account: {account}</div>
      {active ? (
        <button type="button" onClick={doDisconnect}>
          Disconnect
        </button>
      ) : (
        <button type="button" onClick={doActivate}>
          Connect
        </button>
      )}
    </div>
  );
};
