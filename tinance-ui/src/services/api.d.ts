declare namespace API {
  interface SignInParams {
    username: string;
    password: string;
  }

  type SignInResponse = string;

  interface SignOutResponse {
    statusCode: number;
    msg: 'string';
  }
}
