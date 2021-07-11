import { getToken, request } from '../utils';

/**
 * Get user bank service.
 *
 * @returns Response of get user bank service.
 */
export async function GetUserBankService(): Promise<API.GetUserBankResponse> {
  try {
    const res = await request<API.GetUserBankResponse>('/v1/getuserbank.json', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Get user bank failed.');
  }
}
