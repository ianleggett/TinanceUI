export type AppLang = 'en-US' | 'zh-CN' | 'zh-TW';

export const appConfig = {
  title: 'Trade Finance',
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

export type AppConfig = typeof appConfig;
