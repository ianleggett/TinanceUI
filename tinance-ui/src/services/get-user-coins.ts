import { getToken, request } from '../utils';

/**
 * Get user coins service.
 *
 * @param params - Params of get user coins service.
 * @returns Response of get user coins service.
 */
export async function GetUserCoinService(
  params: API.GetUserCoinsParams,
): Promise<API.GetUserCoinsResponse> {
  try {
    const res = await request<API.GetUserCoinsResponse>('/v1/getCoin.json', {
      params,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Get user coins failed.');
  }
}
