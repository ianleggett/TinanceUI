import { getToken, request } from '../utils';

/**
 * Toggle offer live service.
 *
 * @param params - Params of toggle offer live service.
 * @returns Response of toggle offer live service.
 */
export async function DeleteOfferService(
  params: API.DeleteOfferParams,
): Promise<API.DeleteOfferResponse> {
  try {
    const res = await request<API.DeleteOfferResponse>('/v1/deleteoffer.json', {
      method: 'POST',
      params,
      data: {},
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Toggle offer live failed.');
  }
}
