/// <reference types="react-scripts" />

declare namespace PublicData {
  interface CCYCode {
    id: number;
    name: string;
    enable: boolean;
    ccyType: string;
    description: string;
    timestamp: number;
    tokenCtrAddress: string;
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

  interface UserProfile {
    cid: number;
    blurb: string;
    username: string;
    email: string;
    phone: string;
    feedback: number;
    tradecount: number;
    disable: boolean;
    verified: boolean;
    msg_mailshot: boolean;
    msg_updates: boolean;
    lastseen: string;
  }

  interface UserTrade extends Reacord<string, any> {}
}

declare namespace User {
  interface Model {
    id: number;
    blurb?: string;
    username: string;
    email: string;
    countryISO: string;
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
    payDetails: [
      {
        id: number;
        payType: PublicData.PaymentType;
        field1value: string;
        field2value: string;
        field3value: string;
        field4value: string;
        field5value: string;
        timesUsed: number;
        usernotes: string;
        updated: string;
      },
    ];
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

  interface Model {
    id: number;
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
    paymentDetails: {
      id: number;
      payType: PublicData.PaymentType;
      field1value: string;
      field2value: string;
      field3value: string;
      field4value: string;
      field5value: string;
      timesUsed: number;
      updated: number;
      usernotes: string;
    }[];
    procStatus: Status;
    remainCryptoAmt: number;
    updated: number;
    userDetails: {
      blurb?: string;
      cid: number;
      countryISO: string;
      feedback: number;
      token?: string;
      tradecount: number;
      username: string;
    };
    userId: number;
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
    | 'FIATSENT'
    | 'UNKNOWN';

  interface Model {
    id: number;
    contractId: string;
    numericOrderId: number;
    parentOrderId: string;
    buyerId: number;
    buyerAddress: string;
    sellerId: number;
    sellerAddress: string;
    fromccy: PublicData.CCYCode;
    fromAmount: number;
    toccy: PublicData.CCYCode;
    toAmount: number;
    cryptoAmount: number;
    cryptoFee: number;
    fee: number;
    status: Status;
    archive?: any;
    auditList: any[];
    bankfundflag?: any;
    cancelRequest?: any;
    completedHash?: any;
    depositHash?: any;
    created: string;
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

  interface SignInResponse extends ErrorResponse {
    token: string;
    userId: number;
    username: string;
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
    email: string;
    username: string;
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

  interface GetUserDetailsResponse extends BaseResponse, User.Model {}

  type GetCCYCodesResponse = PublicData.CCYCode[];
  type GetPaymentTypesResponse = PublicData.PaymentType[];
  type GetProfilePublicResponse = PublicData.UserProfile;
  type GetUserTradesResponse = PublicData.UserTrade[];

  interface GetAllOffersParams {
    buy?: boolean;
    sell?: boolean;
    fromccyid?: number;
    toccyid?: number;
    payTypes?: number[];
    status?: Offer.Status[];
    fromamt?: number;
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
    payType?: {
      payTypeId: number;
      field1value: string;
      field2value: string;
      field3value: string;
      field4value: string;
      field5value: string;
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
  }

  interface DepositCryptoResponse extends BaseResponse {}

  interface FlagCompleteParams {
    oid: string;
    txn: string;
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

  interface UpdateUserParams {
    userid: number;
    countryISO?: string;
    phone?: string;
    email?: string;
    username?: string;
  }

  interface UpdateUserResponse extends BaseResponse {}
}
