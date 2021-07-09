import Cookie from 'js-cookie';
import type { ResponseError } from 'umi-request';
import { extend } from 'umi-request';

import { snackbar } from './snackbar';

/**
 * Error handler for umi request.
 *
 * @param error - Error response
 * @returns New response
 */
function errorHandler(error: ResponseError<Response>): Response {
  const { data, response } = error;

  if (response && response.status) {
    if (response.status === 401) {
      localStorage.clear();
      Cookie.remove('token');
      window.location.href = '/signin';
    }

    throw error;
  }

  if (!response) {
    snackbar.error("Network error, cant't connect to the server.");
    throw error;
  }

  return response;
}

/** Extended umi request */
export const request = extend({
  errorHandler,
});
