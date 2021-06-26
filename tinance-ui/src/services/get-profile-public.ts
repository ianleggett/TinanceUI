import { request } from '../utils';

/**
 * Get public user profile service.
 *
 * @returns Response of get public user profile service.
 */
export async function GetProfilePublicService(): Promise<API.GetProfilePublicResponse> {
  try {
    const res = await request<API.GetProfilePublicResponse>('/v1/public/getprofilepublic.json');

    return res;
  } catch (error) {
    throw new Error(error.message || 'Get public user profile failed.');
  }
}
