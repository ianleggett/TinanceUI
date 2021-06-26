export const appConfig = {
  title: 'Trade Finance',
  logo: '/logo192.png',
  maxWidth: 'lg' as 'lg' | 'xs' | 'sm' | 'md' | 'xl' | false,
  privacy: 'https://tinance.techiaz.com/privacy',
  terms: 'https://tinance.techiaz.com/terms',
  ccyCodes: [] as PublicData.CCYCode[],
  paymentTypes: [] as PublicData.PaymentType[],
};

export type AppConfig = typeof appConfig;
