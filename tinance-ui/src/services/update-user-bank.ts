import { getToken, request } from '../utils';

/**
 * Update user bank service.
 *
 * @param params - Params of update user bank service.
 * @returns Response of update user bank service.
 */
export async function UpdateUserBankService(
  params: API.UpdateUserBankParams,
): Promise<API.UpdateUserBankResponse> {
  try {
    const res = await request<API.UpdateUserBankResponse>('/v1/updateuserbank.json', {
      method: 'POST',
      data: params,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Update user bank failed.');
  }
}
