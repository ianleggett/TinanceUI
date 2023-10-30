export const DEFAULT_PROFILE_KEY = 'profile';

const cache = localStorage; // or sessionStorage

/**
 * Get user profile object from cache.
 *
 * @param key - User profile key, default is 'profile'
 * @returns User profile object
 */
export function getProfile(key: string = DEFAULT_PROFILE_KEY): User.Model | undefined {
  const cachedUser = cache.getItem(key);

  if (!cachedUser) {
    return undefined;
  }

  try {
    return JSON.parse(cachedUser) as User.Model;
  } catch (error: any) {
    console.warn(error.message || 'Parse user profile failed.');
    return undefined;
  }
}

/**
 * Save user profile object to cache.
 *
 * @param user - User profile object
 * @param key - User profile key, default is 'profile'
 */
export function saveProfile(user: User.Model, key: string = DEFAULT_PROFILE_KEY): void {
  cache.setItem(key, JSON.stringify(user));
}

/**
 * Remove user profile object from cache.
 *
 * @param key - User profile key, default is 'profile'
 */
export function clearProfile(key: string = DEFAULT_PROFILE_KEY): void {
  cache.removeItem(key);
}
