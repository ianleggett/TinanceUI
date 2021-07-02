import Cookies from 'js-cookie';

export const DEFAULT_TOKEN_KEY = 'token';

const cache = localStorage; // or sessionStorage

/**
 * Get user token string from cookie or cache.
 *
 * @param key - User token key, default is 'token'
 * @returns User token string
 */
export function getToken(key: string = DEFAULT_TOKEN_KEY): string {
  return Cookies.get(key) ?? cache.getItem(key) ?? '';
}

/**
 * Save user token string to cookie and cache.
 *
 * @param token - User token string
 * @param key - User token key, default is 'token'
 */
export function saveToken(token: string, key: string = DEFAULT_TOKEN_KEY): void {
  Cookies.set(key, token);
  cache.setItem(key, token);
}

/**
 * Remove user token string from cookie and cache.
 *
 * @param key - User token key, default is 'token'
 */
export function clearToken(key: string = DEFAULT_TOKEN_KEY): void {
  Cookies.remove(key);
  cache.removeItem(key);
}

/**
 * Save expiry time of token string to cache.
 *
 * @param millisecond - Millisecond from now
 * @param key - Token expiry time key, default is 'expiry_time'
 */
export function saveTokenExpiryTime(millisecond: number, key: string = 'expiry_time'): void {
  cache.setItem(key, (Date.now() + millisecond).toString());
}

/**
 * Get expiry time of token string from cache.
 *
 * @param key - Token expiry time key, default is 'expiry_time'
 */
export function getTokenExpiryTime(key: string = 'expiry_time'): number {
  const expiryTimeStr = cache.getItem(key);
  return expiryTimeStr ? Number.parseInt(expiryTimeStr, 10) : 0;
}

/**
 * Remove expiry time of token string from cache.
 *
 * @param key - Token expiry time key, default is 'expiry_time'
 */
export function clearTokenExpiryTime(key: string = 'expiry_time'): void {
  cache.removeItem(key);
}
