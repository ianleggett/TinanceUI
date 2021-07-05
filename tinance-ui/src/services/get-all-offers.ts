import { request } from '../utils';

/**
 * Get all offers service.
 *
 * @param params - Params of get all offers service.
 * @returns Response of get all offers service.
 */
export async function GetAllOffersService(
  params?: API.GetAllOffersParams,
): Promise<API.GetAllOffersResponse> {
  try {
    const res = await request<API.GetAllOffersResponse>('/v1/public/getoffers.json', {
      method: 'POST',
      params,
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Get all offers failed.');
  }
}
