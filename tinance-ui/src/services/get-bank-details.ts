import { getToken, request } from '../utils';

/**
 * Get bank details service.
 *
 * @returns Response of get bank details service.
 */
export async function GetBankDetailsService(): Promise<API.GetBankDetailsResponse> {
  try {
    const res = await request<API.GetBankDetailsResponse>('/v1/getbankdetails.json', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Get bank details failed.');
  }
}
