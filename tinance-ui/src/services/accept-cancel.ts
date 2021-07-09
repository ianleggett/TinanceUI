import { getToken, request } from '../utils';

/**
 * Accept cancel service.
 *
 * @param params - Params of accept cancel service.
 * @returns Response of accept cancel service.
 */
export async function AcceptCancelService(
  params?: API.AcceptCancelParams,
): Promise<API.AcceptCancelResponse> {
  try {
    const res = await request<API.AcceptCancelResponse>('/v1/acceptcancel.json', {
      method: 'POST',
      params,
      data: {},
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Accept cancel failed.');
  }
}
