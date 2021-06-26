import { request } from '../utils';

/**
 * Get payment types service.
 *
 * @returns Response of get payment types service.
 */
export async function GetPaymentTypesService(): Promise<API.GetPaymentTypesResponse> {
  try {
    const res = await request<API.GetPaymentTypesResponse>('/v1/public/paymenttypes.json');

    return res;
  } catch (error) {
    throw new Error(error.message || 'Get payment types failed.');
  }
}
