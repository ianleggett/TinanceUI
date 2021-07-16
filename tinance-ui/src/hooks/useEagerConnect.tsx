import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

import { injected } from '../connectors';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);
  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      console.log('useEagerConnect:', { active, isAuthorized });
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate, active]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
