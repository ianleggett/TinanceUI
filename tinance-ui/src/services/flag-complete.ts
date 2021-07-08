import { getToken, request } from '../utils';

/**
 * Flag complete service.
 *
 * @param params - Params of flag complete service.
 * @returns Response of flag complete service.
 */
export async function FlagCompleteService(
  params: API.FlagCompleteParams,
): Promise<API.FlagCompleteResponse> {
  try {
    const res = await request<API.FlagCompleteResponse>('/v1/flagcomplete.json', {
      method: 'POST',
      params,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Flag complete failed.');
  }
}