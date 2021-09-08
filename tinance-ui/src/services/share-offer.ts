import { getToken, request } from '../utils';

/**
 * Share offer with email service.
 *
 * @param params - Params of share offer with email service.
 * @returns Response of share offer with email service.
 */
export async function ShareOfferService(
  params: API.ShareOfferParams,
): Promise<API.ShareOfferResponse> {
  try {
    // TODO: Change service url after I check swagger ui
    const res = await request<API.ShareOfferResponse>('/v1/shareoffer.json', {
      method: 'POST',
      params,
      data: {},
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message || 'Share offer with email failed.');
  }
}
