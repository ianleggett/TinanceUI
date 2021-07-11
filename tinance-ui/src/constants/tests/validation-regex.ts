export const validationRegex = {
  password: {
    key: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$',
    value: '6 characters, 1 or more letters & 1 numeric',
  },
  phone: {
    key: '\\+{0,1}[0-9]{2,4}\\s{0,1}[0-9]{10,20}',
    value: '+country code (10 to 20 digits)',
  },
  username: { key: '[0-9a-zA-Z]{7,20}', value: '7 to 20 alpha numeric characters' },
  email: {
    key: '^[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\\.){1,125}[a-zA-Z]{2,63}$',
    value: 'standard email address',
  },
  country: { key: '[A-Z]{3}', value: '3 uppercase characters' },
};
