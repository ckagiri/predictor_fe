import * as React from 'react';
import { useMemo } from 'react';
import { QueryClient } from 'react-query';

import { AuthContext, convertAuthProviderFn } from '../auth';
import { ResourceDefinitionContextProvider } from './ResourceDefinitionContext';
import {
  AdminChildren,
  AuthProvider,
  AuthProviderFn,
  DataProvider
} from '../types';

export interface CoreAdminContextProps {
  authProvider?: AuthProvider | AuthProviderFn;
  basename?: string;
  children?: AdminChildren;
  dataProvider?: DataProvider;
  queryClient?: QueryClient;
  /**
     * @deprecated Wrap Admin inside a Router to change the routing strategy
     */
  history?: History;
}

export const CoreAdminContext = (props: CoreAdminContextProps) => {
  const {
      authProvider,
      dataProvider,
      children,
      history,
  } = props;

  if (!dataProvider) {
    throw new Error(`Missing dataProvider prop. Core-admin requires a valid dataProvider function to work.`);
  }

  const finalAuthProvider = useMemo(
      () =>
          authProvider instanceof Function
              ? convertAuthProviderFn(authProvider)
              : authProvider,
      [authProvider]
  );

  return (
    <ResourceDefinitionContextProvider>
      {children}
    </ResourceDefinitionContextProvider>
  );
};

CoreAdminContext.defaultProps = {
};
