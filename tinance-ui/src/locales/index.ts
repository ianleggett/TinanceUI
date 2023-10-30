import type { Resource } from 'i18next';

import enUS from './en-us';
import viVN from './vi-vn';
import zhCN from './zh-cn';
import zhTW from './zh-tw';

const resources: Resource = {
  ...enUS,
  ...viVN,
  ...zhCN,
  ...zhTW,
};

export default resources;
