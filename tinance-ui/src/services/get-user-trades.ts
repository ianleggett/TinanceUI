import { request } from '../utils';

/**
 * Get public user trades service.
 *
 * @param params - Params of get public user trades service.
 * @returns Response of get public user trades service.
 */
export async function GetUserTradesService(
  params: API.GetUserTradesParams,
): Promise<API.GetUserTradesResponse> {
  try {
    const res = await request<API.GetUserTradesResponse>('/v1/public/userTrades.json', {
      params,
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Get public user trades failed.');
  }
}
