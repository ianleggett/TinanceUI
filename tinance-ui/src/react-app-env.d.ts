/// <reference types="react-scripts" />

declare namespace PublicData {
  interface PublicProfile {
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
  interface Model {
    id: number;
    buyer: boolean;
    complete: boolean;
    created: number;
    custRef: any;
    exchRate: number;
    expiry: number[];
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
    };
    procStatus: 'IN_PROGRESS';
    remainCryptoAmt: number;
    updated: number;
    userId: number;
    userName: string;
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

  type GetUserDetailsResponse = User.Model;
  type GetProfilePublicResponse = PublicData.PublicProfile;
  type GetCCYCodesResponse = PublicData.CCYCode[];
  type GetPaymentTypesResponse = PublicData.PaymentType[];

  // TODO: I don't know the name and type of qs.
  interface GetAllOffersParams {
    crypto?: number;
    fiat?: number;
    volume?: number;
    payment?: number;
  }

  type GetAllOffersResponse = Offer.Model[];
}
