import { getToken, request } from '../utils';

/**
 * Get user details service.
 *
 * @returns Response of get user details service.
 */
export async function GetUserDetailsService(): Promise<API.GetUserDetailsResponse> {
  try {
    const res = await request<API.GetUserDetailsResponse>('/v1/getuserdetails.json', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Get user details failed.');
  }
}
