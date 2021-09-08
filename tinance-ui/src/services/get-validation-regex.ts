import { request } from '../utils';

/**
 * Get validation regex service.
 *
 * @returns Response of get validation regex service.
 */
export async function GetValidationRegexService(): Promise<API.GetValidationRegexResponse> {
  try {
    const res = await request<API.GetValidationRegexResponse>('/v1/public/validationregex.json');

    return res;
  } catch (error: any) {
    throw new Error(error.message || 'Get validation regex failed.');
  }
}
