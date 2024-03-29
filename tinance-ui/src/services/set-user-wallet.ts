import { getToken, request } from '../utils';

/**
 * Set user wallet service.
 *
 * @param params - Parmas of set user wallet service.
 * @returns Response of set user wallet service.
 */
export async function SetUserWaletService(
  params: API.SetUserWalletParams,
): Promise<API.SetUserWalletResponse> {
  try {
    const res = await request<API.SetUserWalletResponse>('/v1/setuserwallet.json', {
      method: 'POST',
      data: params,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message || 'Set user wallet failed.');
  }
}
