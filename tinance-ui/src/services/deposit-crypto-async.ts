import { getToken, request } from '../utils';

/**
 * Deposit crypto async service.
 *
 * @param params - Params of deposit crypto async service.
 * @returns Response of deposit crypto async service.
 */
export async function DepositCryptoAsyncService(
  params: API.DepositCryptoParams,
): Promise<API.DepositCryptoResponse> {
  try {
    const res = await request<API.DepositCryptoResponse>('/v1/depositcryptoasync.json', {
      method: 'POST',
      params,
      data: {},
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message || 'Deposit crypto async failed.');
  }
}
