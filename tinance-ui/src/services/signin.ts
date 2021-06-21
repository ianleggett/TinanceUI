import request from 'umi-request';

/**
 * Sign in service.
 *
 * @param params - Parmas of sign in service.
 * @returns Response of sign in service.
 */
export async function SignInService(params: API.SignInParams): Promise<API.SignInResponse> {
  const formData = new FormData();
  const { username, password } = params;

  formData.set('username', username);
  formData.set('password', password);
  formData.set('grant_type', 'password');

  try {
    const token = await request<API.SignInResponse>('/auth/signin', {
      method: 'POST',
      data: formData,
    });

    return token;
  } catch (error) {
    throw new Error(error.message || 'Sign in failed.');
  }
}
