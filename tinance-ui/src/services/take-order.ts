import { getToken, request } from '../utils';

/**
 * Take order service.
 *
 * @param params - Params of take order service.
 * @returns Response of take order service.
 */
export async function TakeOrderService(
  params: API.TakeOrderParams,
): Promise<API.TakeOrderResponse> {
  try {
    const res = await request<API.TakeOrderResponse>('/v1/takeorder.json', {
      method: 'POST',
      data: params,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message || 'Take order failed.');
  }
}
