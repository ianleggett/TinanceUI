import { request } from '../utils';

/**
 * Get network profile service.
 *
 * @returns Response of get network profile service.
 */
export async function GetNetworkProfileService(): Promise<PublicData.NetworkProfile> {
  try {
    const res = await request<PublicData.NetworkProfile>('/v1/public/getnetworkprofile.json');

    return res;
  } catch (error) {
    throw new Error(error.message || 'Get network profile failed.');
  }
}
