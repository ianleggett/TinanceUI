declare namespace API {
  interface SignInParams {
    username: string;
    password: string;
  }

  type SignInResponse = {
    token: string;
    // TODO: replace with User.Model?
    // profile: User.Model;
    username: string;
  };

  interface SignOutResponse {
    statusCode: number;
    msg: 'string';
  }
}
