import { getToken, request } from '../utils';

/**
 * Update bank details service.
 *
 * @param params - Params of update bank details service.
 * @returns Response of update bank details service.
 */
export async function UpdateBankDetailsService(
  params?: API.UpdateBankDetailsParams,
): Promise<API.UpdateBankDetailsResponse> {
  try {
    const res = await request<API.UpdateBankDetailsResponse>('/v1/updatebankdetails.json', {
      method: 'POST',
      data: params,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Update bank details failed.');
  }
}
