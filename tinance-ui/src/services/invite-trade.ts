import { getToken, request } from '../utils';

/**
 * Invite trade service.
 *
 * @param params - Params of invite trade service.
 * @returns Response of invite trade service.
 */
export async function InviteTradeService(
  params: API.InviteTradeParams,
): Promise<API.InviteTradeResponse> {
  try {
    const res = await request<API.InviteTradeResponse>('/v1/invitetrade.json', {
      method: 'POST',
      params,
      data: {},
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message || 'Invite trade failed.');
  }
}
