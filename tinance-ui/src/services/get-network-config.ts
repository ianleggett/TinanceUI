import { getToken, request } from '../utils';

/**
 * Get network config service.
 *
 * @returns Response of get network config service.
 */
export async function GetNetworkConfigService(): Promise<API.GetNetworkConfigResponse> {
  try {
    const res = await request<API.GetNetworkConfigResponse>('/v1/getnetworkconfig.json', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Get network config failed.');
  }
}
