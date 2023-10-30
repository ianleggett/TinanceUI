import { getToken, request } from '../utils';

/**
 * Update user details service.
 *
 * @param params - Params of update user details service.
 * @returns Response of update user details service.
 */
export async function UpdateUserDetailsService(
  params?: API.UpdateUserDetailsParams,
): Promise<API.UpdateUserDetailsResponse> {
  try {
    const res = await request<API.UpdateUserDetailsResponse>('/v1/updateuserdetails.json', {
      method: 'POST',
      data: params,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message || 'Update user details failed.');
  }
}
