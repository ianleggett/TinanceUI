import { request } from '../utils';

/**
 * Reset password service.
 *
 * @param params - Parmas of reset password service.
 * @returns Response of reset password service.
 */
export async function ResetPasswordService(
  params: API.ResetPasswordParams,
): Promise<API.ResetPasswordResponse> {
  try {
    const res = await request<API.ResetPasswordResponse>('/v1/public/publicsetpwd.json', {
      method: 'POST',
      data: params,
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Reset password failed.');
  }
}
