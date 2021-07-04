import { request } from '../utils';

/**
 * Forgot password service.
 *
 * @param params - Parmas of forgot password service.
 * @returns Response of forgot password service.
 */
export async function ForgotPasswordService(
  params: API.ForgotPasswordParams,
): Promise<API.ForgotPasswordResponse> {
  try {
    const res = await request<API.ForgotPasswordResponse>('/v1/public/forgotPwd.json', {
      method: 'POST',
      params,
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Forgot password failed.');
  }
}
