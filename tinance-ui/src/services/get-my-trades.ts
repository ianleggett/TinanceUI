import { getToken, request } from '../utils';

/**
 * Get my trades service.
 *
 * @param params - Params of get my trades service.
 * @returns Response of get my trades service.
 */
export async function GetMyTradesService(
  params: API.GetMyTradesParams = {},
): Promise<API.GetMyTradesResponse> {
  try {
    const res = await request<API.GetMyTradesResponse>('/v1/getmytrades.json', {
      method: 'POST',
      data: params,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message || 'Get my trades failed.');
  }
}
