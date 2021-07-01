import type { Resource } from 'i18next';

import enUS from './en-us';
import zhCN from './zh-cn';
import zhTW from './zh-tw';

const resources: Resource = {
  ...enUS,
  ...zhCN,
  ...zhTW,
};

export default resources;
