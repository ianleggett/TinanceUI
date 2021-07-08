import { getToken, request } from '../utils';

/**
 * Update user service.
 *
 * @param params - Params of update user service.
 * @returns Response of update user service.
 */
export async function UpdateUserService(
  params?: API.UpdateUserParams,
): Promise<API.UpdateUserResponse> {
  try {
    const res = await request<API.UpdateUserResponse>('/v1/updateuser.json', {
      method: 'POST',
      data: params,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Update user failed.');
  }
}
