import * as React from 'react';
import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { History } from 'history';

import { AuthContext, convertAuthProviderFn } from '../auth';
import { ResourceDefinitionContextProvider } from './ResourceDefinitionContext';
import {
  AdminChildren,
  AuthProvider,
  AuthProviderFn,
  DataProvider,
  DataProviderFn,
} from '../types';
import { convertDataProviderFn, DataProviderContext, defaultDataProvider } from '../dataProvider';
import { memoryStore, Store, StoreContextProvider } from '../store';
import { AdminRouter } from '../routing';

export interface CoreAdminContextProps {
  authProvider: AuthProvider | AuthProviderFn;
  basename?: string;
  children?: AdminChildren;
  dataProvider?: DataProvider | DataProviderFn;
  store: Store;
  queryClient?: QueryClient;
  /**
     * @deprecated Wrap Admin inside a Router to change the routing strategy
     */
  history?: History;
}

export const CoreAdminContext = (props: CoreAdminContextProps) => {
  const {
      authProvider,
      basename,
      dataProvider,
      store,
      children,
      history,
      queryClient,
  } = props;

  if (!dataProvider) {
    throw new Error(`Missing dataProvider prop. core requires a valid dataProvider function to work.`);
  }

  const finalQueryClient = useMemo(() => queryClient || new QueryClient(), [
    queryClient,
  ]);

  const finalAuthProvider = useMemo(
      () =>
          authProvider instanceof Function
              ? convertAuthProviderFn(authProvider)
              : authProvider,
      [authProvider]
  );

  const finalDataProvider = useMemo(
    () =>
        dataProvider instanceof Function
            ? convertDataProviderFn(dataProvider)
            : dataProvider,
    [dataProvider]
);

  return (
    <AuthContext.Provider value={finalAuthProvider}>
      <DataProviderContext.Provider value={finalDataProvider}>
        <StoreContextProvider value={store}>
          <QueryClientProvider client={finalQueryClient}>
            <AdminRouter history={history} basename={basename}>
              <ResourceDefinitionContextProvider>
                {children}
              </ResourceDefinitionContextProvider>
            </AdminRouter>
          </QueryClientProvider>
        </StoreContextProvider>
      </DataProviderContext.Provider>
    </AuthContext.Provider>
  );
};

CoreAdminContext.defaultProps = {
  dataProvider: defaultDataProvider,
  store: memoryStore(),
};
