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
