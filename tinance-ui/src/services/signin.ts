import { request } from '../utils';

/**
 * Sign in service.
 *
 * @param params - Parmas of sign in service.
 * @returns Response of sign in service.
 */
export async function SignInService(params: API.SignInParams): Promise<API.SignInResponse> {
  try {
    const res = await request<API.SignInResponse>('/auth/signin', {
      method: 'POST',
      data: params,
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Sign in failed.');
  }
}
