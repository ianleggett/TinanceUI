import { string } from 'yup/lib/locale';

declare namespace API {
  interface SignInParams {
    username: string;
    password: string;
  }

  interface ErrorResponse {
    errorMessage?: string;
  }

  interface SignInResponse extends ErrorResponse {
    token: string;
    // TODO: replace with User.Model?
    // profile: User.Model;
    username: string;
  }

  interface SignOutResponse extends ErrorResponse {
    statusCode: number;
    msg: 'string';
  }
}
