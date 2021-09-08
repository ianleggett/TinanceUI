import { request } from '../utils';

/**
 * Sign up service.
 *
 * @param params - Parmas of sign up service.
 * @returns Response of sign up service.
 */
export async function SignUpService(params: API.SignUpParams): Promise<API.SignUpResponse> {
  try {
    const res = await request<API.SignUpResponse>('/v1/public/usersignup.json', {
      method: 'POST',
      data: params,
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message || 'Sign up failed.');
  }
}
