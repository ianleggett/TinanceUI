export type AppLang = 'en-US' | 'zh-CN' | 'zh-TW' | 'vi-VN';

export const appConfig = {
  title: 'Trusted Finance',
  logo: '/logo192.png',
  lang: 'en-US' as AppLang,
  maxWidth: 'lg' as 'lg' | 'xs' | 'sm' | 'md' | 'xl' | false,
  ccyCodes: [] as PublicData.CCYCode[],
  paymentTypes: [] as PublicData.PaymentType[],
};

export const offerStatusMap: Record<Offer.Status, string> = {
  CREATED: 'Created',
  CANCELLED: 'Cancelled',
  COMPLETE: 'Completed',
  DELETED: 'Deleted',
  EDIT: 'Edited',
  EXPIRED: 'Expired',
  IN_PROGRESS: 'In Progress',
  UNKNOWN: 'Unknown',
};

export const countryCodes = {
  US: {
    name: 'United States',
    code: '001',
  },
  UK: {
    name: 'United Kingdom',
    code: '044',
  },
  VN: {
    name: 'Vietnam',
    code: '084',
  },
  CN: {
    name: 'China',
    code: '086',
  },
};

export type AppConfig = typeof appConfig;
