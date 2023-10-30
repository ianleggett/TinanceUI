import { getToken, request } from '../utils';

/**
 * Sign out service.
 *
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
    localStorage.clear();
    return res;
  } catch (error: any) {
    throw new Error(error.message || 'Sign out failed.');
  }
}
