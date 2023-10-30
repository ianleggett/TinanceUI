import { request } from '../utils';

/**
 * Get public user profile service.
 *
 * @param params - Params of get public user profile service.
 * @returns Response of get public user profile service.
 */
export async function GetProfilePublicService(
  params: API.GetProfilePublicParams,
): Promise<API.GetProfilePublicResponse> {
  try {
    const res = await request<API.GetProfilePublicResponse>('/v1/public/getprofilepublic.json', {
      params,
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message || 'Get public user profile failed.');
  }
}
