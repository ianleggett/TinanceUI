import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useEffect, useState } from 'react';

import { Networks } from '../constants';

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    Networks.MainNet, // Mainet
    Networks.Ropsten, // Ropsten
    Networks.Rinkeby, // Rinkeby
    Networks.Goerli, // Goerli
    Networks.Kovan, // Kovan
    Networks.Local, // Local
  ],
});

export function useEagerConnect(): any {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);
  useEffect(() => {
    injectedConnector.isAuthorized().then((isAuthorized: boolean) => {
      console.log('useEagerConnect:', { active, isAuthorized });
      if (isAuthorized) {
        activate(injectedConnector, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress = false): any {
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    if (suppress) {
      return () => {};
    }
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error) {
      const handleChainChanged = (chainId: string) => {
        console.log('chainChanged', chainId);
        activate(injectedConnector);
      };

      const handleAccountsChanged = (accounts: any[]) => {
        console.log('accountsChanged', accounts);
        if (accounts.length > 0) {
          activate(injectedConnector);
        }
      };

      const handleNetworkChanged = (networkId: string) => {
        console.log('networkChanged', networkId);
        activate(injectedConnector);
      };

      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }

    return () => {};
  }, [active, error, suppress, activate]);
}
