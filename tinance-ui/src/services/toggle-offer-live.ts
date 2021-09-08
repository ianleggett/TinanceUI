import { getToken, request } from '../utils';

/**
 * Toggle offer live service.
 *
 * @param params - Params of toggle offer live service.
 * @returns Response of toggle offer live service.
 */
export async function ToggleOfferLiveService(
  params: API.ToggleOfferLiveParams,
): Promise<API.ToggleOfferLiveResponse> {
  try {
    const res = await request<API.ToggleOfferLiveResponse>('/v1/toggleLive.json', {
      method: 'POST',
      params,
      data: {},
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message || 'Toggle offer live failed.');
  }
}
