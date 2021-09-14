/// <reference types="react-scripts" />

declare namespace PublicData {
  interface CCYCode {
    id: number;
    name: string;
    enable: boolean;
    ccyType: string;
    description: string;
    tokenCtrAddress: string;
    updated: string;
  }

  interface PaymentType {
    id: number;
    name: string;
    enabled: boolean;
    field1name: string;
    field2name: string;
    field3name: string;
    field4name: string;
    field5name: string;
  }

  interface BankDetail {
    id: number;
    payType: PaymentType;
    field1value: string;
    field2value: string;
    field3value: string;
    field4value: string;
    field5value: string;
    usernotes: string;
    timesUsed: number;
    updated: number;
  }

  interface UserProfile {
    cid: number;
    blurb: string;
    username: string;
    email: string;
    phone: string;
    feepct: number;
    expirymins: number;
    pollingRate: number;
    feedback: number;
    tradecount: number;
    disable: boolean;
    verified: boolean;
    msg_mailshot: boolean;
    msg_updates: boolean;
    lastseen: string;
  }

  interface UserTrade extends Reacord<string, any> {}

  interface Regex {
    key: string;
    value: string;
  }

  interface NetworkProfile {
    key: string;
    value: string;
  }
}

declare namespace User {
  interface Model {
    cid: number;
    blurb?: string;
    username: string;
    email: string;
    countryISO: string;
    feepct: number;
    expirymins: number; // in minutes
    pollingRate: number; // in seconds
    phone?: string;
    role: 'ROLE_USER' | 'ROLE_ADMIN';
    verified: boolean;
    enabled: boolean;
    timestamp: number;
    msg_mailshot: boolean;
    msg_updates: boolean;
    notes?: string;
    mywallet: {
      id: number;
      coinType: PublicData.CCYCode;
      coinprecision: number;
      walletAddress: string;
    };
    payDetails: PublicData.BankDetail[];
  }
}

declare namespace Offer {
  type Status =
    | 'CREATED'
    | 'CANCELLED'
    | 'COMPLETE'
    | 'DELETED'
    | 'EDIT'
    | 'EXPIRED'
    | 'IN_PROGRESS'
    | 'UNKNOWN';

  interface InvitedUser {
    id: number;
    orderId: string;
    email: string;
  }

  interface Model {
    id: string;
    buyer: boolean;
    complete: boolean;
    created: number;
    custRef: any;
    exchRate: number;
    expiry: number;
    feeAmt: number;
    fromAmount: number;
    toAmount: number;
    fromccy: PublicData.CCYCode;
    toccy: PublicData.CCYCode;
    inProg: boolean;
    live: boolean;
    orderId: string;
    procStatus: Status;
    remainCryptoAmt: number;
    updated: number;
    paymentDetails: PublicData.BankDetail[];
    userDetails: {
      cid: number;
      aveTradeTime: string;
      cid: number;
      countryISO: string;
      feedback: number;
      lastseen: string;
      ratedCount: number;
      ratedScoreTotal: number;
      tradeCancelCount: number;
      tradeCount: number;
      tradeVolume: number;
      tradecount: number;
      username: string;
    };
    userId: number;

    invited?: InvitedUser[];
    cid?: number;
    emailSent?: string;
  }
}

declare namespace Trade {
  type Status =
    | 'ARBITRATE'
    | 'CREATED'
    | 'CANCELLED'
    | 'COMPLETED'
    | 'CANCEL_REQ'
    | 'ERROR'
    | 'DEPOSIT'
    | 'DEPOSITING'
    | 'FIATSENT'
    | 'REFUND'
    | 'UNKNOWN';

  interface Model {
    id: number;
    tradeId: string;
    numericOrderId: number;
    parentOrderId: string;
    buyer: {
      cid: number;
      countryISO: string;
      feedback: number;
      lastseen: string;
      tradecount: number;
      username: string;
    };
    buyerAddress: string;
    buyerRating: number;
    commentAboutSeller?: string;
    seller: {
      cid: number;
      countryISO: string;
      feedback: number;
      lastseen: string;
      tradecount: number;
      username: string;
    };
    sellerBankDetails: PublicData.BankDetail;
    sellerAddress: string;
    sellerRating: number;
    commentAboutBuyer?: string;
    fromccy: PublicData.CCYCode;
    fromAmount: number;
    toccy: PublicData.CCYCode;
    toAmount: number;
    cryptoAmount: number;
    cryptoFee: number;
    sellerFee: number;
    buyerFee: number;
    status: Status;
    archive?: any;
    auditList: any[];
    bankfundflag?: any;
    cancelRequest?: any;
    completedHash?: any;
    depositHash?: any;
    created: string;
    expiry: number;
    sellerBankDetails: PublicData.BankDetail;
  }
}

declare namespace API {
  interface ErrorResponse {
    path: string;
    status: number;
    timestamp: number;
    error?: string;
    message?: string;
  }

  interface BaseResponse {
    statusCode: number;
    msg: string;
  }

  interface SignInParams {
    username: string;
    password: string;
  }

  interface SignInResponse extends ErrorResponse, User.Model {
    token: string;
  }

  interface SignOutResponse extends BaseResponse {}

  interface SignUpParams {
    countryISO: string;
    email: string;
    phone: string;
    username: string;
    validCountry?: boolean;
    validEmail?: boolean;
    validPhone?: boolean;
  }

  interface SignUpResponse extends BaseResponse {}

  interface ForgotPasswordParams {
    email?: string;
    username?: string;
  }

  interface ForgotPasswordResponse extends BaseResponse {}

  interface ResetPasswordParams {
    v: string;
    p: string;
    n?: string;
  }

  interface ResetPasswordResponse extends BaseResponse {}

  interface GetUserTradesParams {
    uid: number;
  }

  interface GetProfilePublicParams {
    uid: number;
  }

  interface GetUserDetailsResponse extends User.Model {}

  type GetCCYCodesResponse = PublicData.CCYCode[];
  type GetPaymentTypesResponse = PublicData.PaymentType[];
  type GetProfilePublicResponse = PublicData.UserProfile;
  type GetUserTradesResponse = PublicData.UserTrade[];
  type GetValidationRegexResponse = Record<string, PublicData.Regex>;

  interface GetAllOffersParams {
    buy?: boolean;
    sell?: boolean;
    fromccyid?: number;
    toccyid?: number;
    payTypes?: number[];
    status?: Offer.Status[];
    fromamt?: number;
    wildcardId?: string;
  }

  interface GetMyOffersParams extends GetAllOffersParams {
    keyword?: string;
  }

  interface GetMyTradesParams {
    status?: Trade.Status[];
    keyword?: string;
  }

  type GetAllOffersResponse = Offer.Model[];
  type GetMyOffersResponse = Offer.Model[];
  type GetMyTradesResponse = Trade.Model[];

  interface GetAddUpdateOrderParams {
    fromccyid: number;
    fromamt: number;
    toccyid: number;
    toamt: number;
    expiry: string;
    orderid?: string;
    payType?: {
      payTypeId: number;
      field1value: string;
      field2value: string;
      field3value: string;
      field4value: string;
      field5value: string;
      usernotes: string;
    };
  }

  interface GetAddUpdateOrderResponse extends BaseResponse, Offer.Model {}

  interface AcceptCancelParams {}
  interface AcceptCancelResponse extends BaseResponse {}

  interface CancelTradeParams {
    oid: string;
  }

  interface CancelTradeResponse extends BaseResponse {}

  interface DepositCryptoParams {
    oid: string;
    txnid?: string;
  }

  interface DepositCryptoResponse extends BaseResponse {}

  interface FlagCompleteParams {
    oid: string;
    txn?: string;
  }

  interface FlagCompleteResponse extends BaseResponse {}

  interface FlagFundsSentParams {
    oid: string;
  }

  interface FlagFundsSentResponse extends BaseResponse {}

  interface TakeOrderParams {
    cryptFee?: number;
    cryptQty?: number;
    ordid: string;
    usrpayid?: number;
  }

  interface TakeOrderResponse extends BaseResponse {}

  interface ChangePasswordParams {
    userid: number;
    oldpwd: string;
    newpwd: string;
  }

  interface ChangePasswordResponse extends BaseResponse {}

  interface UpdateUserDetailsParams {
    cid: number;
    countryISO?: string;
    phone?: string;
    email?: string;
    username?: string;
  }

  interface UpdateUserDetailsResponse extends BaseResponse {}

  type GetUserBankResponse = PublicData.BankDetail;

  interface UpdateUserBankParams {
    payTypeId: number;
    field1value: string;
    field2value: string;
    field3value: string;
    field4value: string;
    field5value: string;
    usernotes: string;
  }

  interface UpdateUserBankResponse extends BaseResponse {}

  interface GetUserWalletResponse extends BaseResponse {
    coinid: number;
    walletAddr: string;
  }

  interface SetUserWalletParams {
    coinid: number;
    walletAddr: string;
  }

  interface SetUserWalletResponse extends BaseResponse {}

  interface ToggleOfferLiveParams {
    oid: string;
    v: boolean;
  }
  interface DeleteOfferParams {
    oid: string;
  }

  interface DeleteOfferResponse extends BaseResponse {}

  interface InviteTradeParams {
    offerid: string;
    emailuser: string;
  }

  interface InviteTradeResponse extends BaseResponse {}

  interface ToggleOfferLiveResponse extends BaseResponse {}

  interface GetNetworkConfigParams {}

  interface GetNetworkConfigResponse {
    brokerPrivateKey: string;
    buyerfeePct: number;
    escrowCtrAddr: string;
    etherScanPrefix: string;
    httpService: string;
    maxEthFee: number;
    sellerfeePct: number;
    buyerfeePct: number;
    sellerGasFee: number;
    buyerGasFee: number;
    usdtcoinCtrAddr: string;
  }

  interface RateTradeParams {
    tradeid: string;
    rating: number;
    comment?: string;
  }

  interface RateTradeResponse extends BaseResponse {}
}

declare interface Window {
  websocket: WebSocket | null;
  stompClient: any | null;
}
