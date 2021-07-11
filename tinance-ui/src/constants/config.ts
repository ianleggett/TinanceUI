import { ccyCodes } from './tests/ccycodes';
import { paymentTypes } from './tests/payment-types';
import { validationRegex } from './tests/validation-regex';

export type AppLang = 'en-US' | 'zh-CN' | 'zh-TW' | 'vi-VN';

const publicUrl = process.env.PUBLIC_URL;

export const appConfig = {
  title: 'Trusted Finance',
  logo: publicUrl && publicUrl !== '/' ? `${publicUrl}/logo192.png` : '/logo192.png',
  lang: 'en-US' as AppLang,
  videoUrl: 'https://s0.easynm.cn/uploads/test-video.mp4',
  maxWidth: 'lg' as 'lg' | 'xs' | 'sm' | 'md' | 'xl' | false,
  // TODO: remove later
  ccyCodes: ccyCodes as PublicData.CCYCode[],
  // TODO: remove later
  paymentTypes: paymentTypes as PublicData.PaymentType[],
  // TODO: remove latter
  validationRegex: validationRegex as Record<string, PublicData.Regex>,
  relativeExpiryTime: 2, // in hours
  feeRate: 0.0015,
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
