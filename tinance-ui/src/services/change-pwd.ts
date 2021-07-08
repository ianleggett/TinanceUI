import { getToken, request } from '../utils';

/**
 * Change password service.
 *
 * @param params - Params of change password service.
 * @returns Response of change password service.
 */
export async function ChangePasswordService(
  params: API.ChangePasswordParams,
): Promise<API.ChangePasswordResponse> {
  try {
    const res = await request<API.ChangePasswordResponse>('/v1/changepwd.json', {
      method: 'POST',
      data: params,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Change password failed.');
  }
}
