import request from 'umi-request';

import { getToken } from '../utils';

/**
 * Sign out service.
 *
 * @param params - Parmas of sign out service.
 * @returns Response of sign out service.
 */
export async function SignOutService(): Promise<API.SignOutResponse> {
  try {
    const res = await request<API.SignOutResponse>('/auth/signout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Sign out failed.');
  }
}
