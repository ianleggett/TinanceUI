import { clearProfile } from './profile';
import { snackbar } from './snackbar';

const cache = localStorage; // or sessionStorage

/**
 * Save user token string to cache.
 *
 * @param token - User token string
 * @param expires - Expires after saving, default is 60 (in min)
 */
export function saveToken(token: string, expires: number = 60): void {
  cache.setItem('expiry_time', (Date.now() + expires * 60_000).toString());
  cache.setItem('token', token);
}

/**
 * Remove user token string from cache.
 */
export function clearToken(): void {
  cache.removeItem('token');
  cache.removeItem('expiry_time');
}

/**
 * Get user token string from cache.
 *
 * @returns User token string
 */
export function getToken(): string {
  const expiryTimeStr = cache.getItem('expiry_time');

  if (!expiryTimeStr) {
    return '';
  }

  if (Number.parseInt(expiryTimeStr, 10) >= Date.now()) {
    return cache.getItem('token') ?? '';
  }

  const event = new CustomEvent('tokenexpired', { bubbles: true });

  clearToken();
  clearProfile();

  document.dispatchEvent(event);
  snackbar.warning('Token is expired, please login');

  return '';
}
