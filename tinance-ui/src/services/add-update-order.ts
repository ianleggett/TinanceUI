import { getToken, request } from '../utils';

/**
 * Add update order service.
 *
 * @param params - Params of add update order service.
 * @returns Response of add update order service.
 */
export async function AddUpdateOrderService(
  params: API.GetAddUpdateOrderParams,
): Promise<API.GetAddUpdateOrderResponse> {
  try {
    const res = await request<API.GetAddUpdateOrderResponse>('/v1/addupdateorder.json', {
      method: 'POST',
      data: params,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Get add update order failed.');
  }
}
