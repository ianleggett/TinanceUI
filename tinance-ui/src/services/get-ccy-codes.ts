import { request } from '../utils';

/**
 * Get ccy codes service.
 *
 * @returns Response of get ccy codes service.
 */
export async function GetCCYCodesService(): Promise<API.GetCCYCodesResponse> {
  try {
    const res = await request<API.GetCCYCodesResponse>('/v1/public/ccycodes.json');

    return res;
  } catch (error) {
    throw new Error(error.message || 'Get ccy codes failed.');
  }
}
