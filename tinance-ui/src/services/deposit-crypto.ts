import { getToken, request } from '../utils';

/**
 * Deposit crypto service.
 *
 * @param params - Params of deposit crypto service.
 * @returns Response of deposit crypto service.
 */
export async function DepositCryptoService(
  params: API.DepositCryptoParams,
): Promise<API.DepositCryptoResponse> {
  try {
    const res = await request<API.DepositCryptoResponse>('/v1/depositcrypto.json', {
      method: 'POST',
      params,
      data: {},
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Deposit crypto failed.');
  }
}
