import { getToken, request } from '../utils';

/**
 * Get my offers service.
 *
 * @param params - Params of get my offers service.
 * @returns Response of get my offers service.
 */
export async function GetMyOffersService(
  params: API.GetMyOffersParams = {},
): Promise<API.GetMyOffersResponse> {
  try {
    const { keyword, ...restParams } = params;
    const res = await request<API.GetMyOffersResponse>('/v1/getmyoffers.json', {
      method: 'POST',
      params: { keyword },
      data: restParams,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Get my offers failed.');
  }
}
