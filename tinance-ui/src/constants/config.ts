export const appConfig = {
  title: 'Trade Finance',
  logo: '/logo192.png',
  maxWidth: 'lg' as 'lg' | 'xs' | 'sm' | 'md' | 'xl' | false,
  privacy: 'https://tinance.techiaz.com/privacy',
  terms: 'https://tinance.techiaz.com/terms',
  ccyCodes: [] as PublicData.CCYCode[],
  paymentTypes: [] as PublicData.PaymentType[],
  userTrades: [] as PublicData.UserTrade[],
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
