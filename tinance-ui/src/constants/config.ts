export type AppLang = 'en-US' | 'zh-CN' | 'zh-TW' | 'vi-VN';

const publicUrl = process.env.PUBLIC_URL;

export const appConfig = {
  title: 'Trusted Finance',
  logo: publicUrl && publicUrl !== '/' ? `${publicUrl}/logo192.png` : '/logo192.png',
  lang: 'en-US' as AppLang,
  videoUrl: 'https://www.youtube.com/embed/MC8IygKuq3I',
  maxWidth: 'lg' as 'lg' | 'xs' | 'sm' | 'md' | 'xl' | false,
  ccyCodes: [] as PublicData.CCYCode[],
  paymentTypes: [] as PublicData.PaymentType[],
  validationRegex: {} as Record<string, PublicData.Regex>,
  networkProfile: undefined as PublicData.NetworkProfile | undefined,
  relativeExpiryTime: 2, // in hours
  feeRate: 0.001,
  walletConnected: false,
  networkConfig: {
    brokerPrivateKey: '-removed-for-security',
    buyerfeePct: 0.015,
    escrowCtrAddr: '0xEb13Bb6F98dE43f9f040BD6B6823CcD3339AEB05',
    etherScanPrefix: 'https://etherscan.io/tx/',
    httpService: 'https://mainnet.infura.io/v3/13ba69a445a244859517b9c014a5a297',
    maxEthFee: 0.001,
    sellerfeePct: 0.015,
    usdtcoinCtrAddr: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  } as API.GetNetworkConfigResponse,
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
  REFUND: 'Refund',
  UNKNOWN: 'Unknown',
};

export type AppConfig = typeof appConfig;
