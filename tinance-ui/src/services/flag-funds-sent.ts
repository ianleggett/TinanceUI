import { getToken, request } from '../utils';

/**
 * Flag funds sent service.
 *
 * @param params - Params of Flag funds sent service.
 * @returns Response of Flag funds sent service.
 */
export async function FlagFundsSentService(
  params: API.FlagFundsSentParams,
): Promise<API.FlagFundsSentResponse> {
  try {
    const res = await request<API.FlagFundsSentResponse>('/v1/flagfundssent.json', {
      method: 'POST',
      params,
      data: {},
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message || 'Flag funds sent failed.');
  }
}
