import { getToken, request } from '../utils';

/**
 * Get user wallet service.
 *
 * @param params - Params of get user wallet service.
 * @returns Response of get user wallet service.
 */
export async function GetUserWalletService(): Promise<API.GetUserWalletResponse> {
  try {
    const res = await request<API.GetUserWalletResponse>('/v1/getuserwallet.json', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message || 'Get user wallet failed.');
  }
}
