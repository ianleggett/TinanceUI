import { getToken, request } from '../utils';

/**
 * Rate trade service.
 *
 * @param params - Params of rate trade service.
 * @returns Response of rate trade service.
 */
export async function RateTradeService(
  params: API.RateTradeParams,
): Promise<API.RateTradeResponse> {
  try {
    const res = await request<API.RateTradeResponse>('/v1/ratetrade.json', {
      method: 'POST',
      params,
      data: {},
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message || 'Rate trade failed.');
  }
}
