import { useCallback } from 'react';

import useAuthProvider, { defaultAuthParams } from './useAuthProvider';
import useLogout from './useLogout';
import { useNotify } from '../notification';
import { useBasename } from '../routing';
import { removeDoubleSlashes } from '../routing/useCreatePath';

export const useCheckAuth = (): CheckAuth => {
  const authProvider = useAuthProvider();
  const notify = useNotify();
  const logout = useLogout();
  const basename = useBasename();
  const loginUrl = removeDoubleSlashes(
      `${basename}/${defaultAuthParams.loginUrl}`
  );

  const checkAuth = useCallback(
    (
        params: any = {},
        logoutOnFailure = true,
        redirectTo = loginUrl,
        disableNotification = false
    ) =>
        authProvider.checkAuth(params).catch(error => {
            if (logoutOnFailure) {
                logout(
                    {},
                    error && error.redirectTo
                        ? error.redirectTo
                        : redirectTo
                );
                const shouldSkipNotify =
                    disableNotification ||
                    (error && error.message === false);
                !shouldSkipNotify &&
                    notify(
                        getErrorMessage(error, 'ra.auth.auth_check_error'),
                        { type: 'warning' }
                    );
            }
            throw error;
        }),
    [authProvider, logout, notify, loginUrl]
  );

  return authProvider ? checkAuth : checkAuthWithoutAuthProvider;
}

const checkAuthWithoutAuthProvider = () => Promise.resolve();

/**
 * Check if the current user is authenticated by calling authProvider.checkAuth().
 * Logs the user out on failure.
 *
 * @param {Object} params The parameters to pass to the authProvider
 * @param {boolean} logoutOnFailure Whether the user should be logged out if the authProvider fails to authenticate them. True by default.
 * @param {string} redirectTo The login form url. Defaults to '/login'
 * @param {boolean} disableNotification Avoid showing a notification after the user is logged out. false by default.
 *
 * @return {Promise} Resolved to the authProvider response if the user passes the check, or rejected with an error otherwise
 */
export type CheckAuth = (
  params?: any,
  logoutOnFailure?: boolean,
  redirectTo?: string,
  /** @deprecated to disable the notification, authProvider.checkAuth() should return an object with an error property set to true */
  disableNotification?: boolean
) => Promise<any>;

const getErrorMessage = (error: { message: string; } | string, defaultMessage: string) =>
  typeof error === 'string'
      ? error
      : typeof error === 'undefined' || !error.message
      ? defaultMessage : error.message
