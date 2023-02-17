import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_CHECK,
  AUTH_ERROR,
  AUTH_GET_PERMISSIONS,
} from './types';
import { AuthProvider, AuthProviderFn } from '../types';

/**
* Turn a function-based authProvider to an object-based one
* @param {Function} authProviderFn An authProvider function (type, params) => Promise<any>
*
* @returns {Object} An authProvider that core can use
*/
export default (authProviderFn: AuthProviderFn): AuthProvider => {
  const authProvider = (...args: any) => authProviderFn.apply(null, args);
  authProvider.login = (params: any) => authProviderFn(AUTH_LOGIN, params);
  authProvider.logout = (params: any) => authProviderFn(AUTH_LOGOUT, params);
  authProvider.checkAuth = (params: any) => authProviderFn(AUTH_CHECK, params);
  authProvider.checkError = (error: any) => authProviderFn(AUTH_ERROR, error);
  authProvider.getPermissions = (params: any) =>
    authProviderFn(AUTH_GET_PERMISSIONS, params);
  return authProvider;
};
