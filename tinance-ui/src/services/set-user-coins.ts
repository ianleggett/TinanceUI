import { request } from '../utils';

/**
 * Set user coins service.
 *
 * @param params - Parmas of set user coins service.
 * @returns Response of set user coins service.
 */
export async function SetUserCoinsService(
  params: API.SetUserCoinsParams,
): Promise<API.SetUserCoinsResponse> {
  try {
    const res = await request<API.SetUserCoinsResponse>('/v1/public/setusercoins.json', {
      method: 'POST',
      data: params,
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Set user coins failed.');
  }
}
