export type AppLang = 'en-US' | 'zh-CN' | 'zh-TW' | 'vi-VN';

const publicUrl = process.env.PUBLIC_URL;

export const appConfig = {
  title: 'Trusted Finance',
  logo: publicUrl && publicUrl !== '/' ? `${publicUrl}/logo192.png` : '/logo192.png',
  lang: 'en-US' as AppLang,
  videoUrl: 'https://www.youtube.com/embed/jsvfcPyu23Q',
  maxWidth: 'lg' as 'lg' | 'xs' | 'sm' | 'md' | 'xl' | false,
  ccyCodes: [] as PublicData.CCYCode[],
  paymentTypes: [] as PublicData.PaymentType[],
  validationRegex: {} as Record<string, PublicData.Regex>,
  networkProfile: undefined as PublicData.NetworkProfile | undefined,
  relativeExpiryTime: 2, // in hours
  feeRate: 0.0015,
  walletConnected: false,
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

export const tradeStatusMap: Record<Trade.Status, string> = {
  ARBITRATE: 'Arbitrate',
  CREATED: 'Created',
  CANCELLED: 'Cancelled',
  CANCEL_REQ: 'Cancelled Request',
  ERROR: 'Error',
  DEPOSIT: 'Deposit',
  FIATSENT: 'Fiat Sent',
  COMPLETED: 'Completed',
  UNKNOWN: 'Unknown',
};

export type AppConfig = typeof appConfig;
