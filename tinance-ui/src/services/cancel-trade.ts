import { getToken, request } from '../utils';

/**
 * Cancel trade service.
 *
 * @param params - Params of cancel trade service.
 * @returns Response of cancel trade service.
 */
export async function CancelTradeService(
  params: API.CancelTradeParams,
): Promise<API.CancelTradeResponse> {
  try {
    const res = await request<API.CancelTradeResponse>('/v1/canceltrade.json', {
      method: 'POST',
      params,
      data: {},
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Cancel trade failed.');
  }
}
