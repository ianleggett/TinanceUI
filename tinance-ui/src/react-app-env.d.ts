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

declare namespace API {
  interface ErrorResponse {
    path: string;
    status: number;
    timestamp: number;
    error?: string;
    message?: string;
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

  interface SignOutResponse {
    statusCode: number;
    msg: 'string';
  }

  interface GetUserTradesParams {
    uid: number;
  }

  interface GetProfilePublicParams {
    uid: number;
  }

  type GetUserDetailsResponse = User.Model;
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

  type GetAllOffersResponse = Offer.Model[];
  type GetMyOffersResponse = Offer.Model[];

  interface GetAddUpdateOrderParams {
    fromccyid: number;
    fromamt: number;
    toccyid: number;
    toamt: number;
    expiry: string;
    payDetail?: {
      payTypeId: number;
      field1name: string; // Bank Name
      field2name: string; // Sort Code
      field3name: string; // Account Number
      field4name: string; // IBAN
      field5name: string; // Country
    };
  }

  type GetAddUpdateOrderResponse = Offer.Model;
}
