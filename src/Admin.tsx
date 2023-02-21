import * as React from 'react';
import { createElement } from 'react';
import { ComponentType } from 'react';
import { CoreAdminContext, CoreAdminContextProps, CoreAdminUI, CoreAdminUIProps, localStorageStore, useNotificationContext } from './core'
/**
 * Main admin component, entry point to the application.
 *
 * Initializes the various contexts (auth, data, i18n, router)
 * and defines the main routes.
 *
 * Expects a list of resources as children, or a function returning a list of
 * resources based on the permissions.
 *
 * @example
 *
 * // static list of resources
 *
 * import {
 *     Admin,
 *     Resource,
 *     ListGuesser,
 *     useDataProvider,
 * } from 'react-admin';
 *
 * const App = () => (
 *     <Admin dataProvider={myDataProvider}>
 *         <Resource name="posts" list={ListGuesser} />
 *     </Admin>
 * );
 *
 * // dynamic list of resources based on permissions
 *
 * import {
 *     Admin,
 *     Resource,
 *     ListGuesser,
 *     useDataProvider,
 * } from 'react-admin';
 *
 * const App = () => (
 *     <Admin dataProvider={myDataProvider}>
 *         {permissions => [
 *             <Resource name="posts" key="posts" list={ListGuesser} />,
 *         ]}
 *     </Admin>
 * );
 *
 * // If you have to build a dynamic list of resources using a side effect,
 * // you can't use <Admin>. But as it delegates to sub components,
 * // it's relatively straightforward to replace it:
 *
 * import * as React from 'react';
import { useEffect, useState } from 'react';
 * import {
 *     AdminContext,
 *     AdminUI,
 *     defaultI18nProvider,
 *     localStorageStore,
 *     Resource,
 *     ListGuesser,
 *     useDataProvider,
 * } from 'react-admin';
 *
 * const store = localStorageStore();
 *
 * const App = () => (
 *     <AdminContext dataProvider={myDataProvider} i18nProvider={defaultI18nProvider} store={store}>
 *         <Resources />
 *     </AdminContext>
 * );
 *
 * const Resources = () => {
 *     const [resources, setResources] = useState([]);
 *     const dataProvider = useDataProvider();
 *     useEffect(() => {
 *         dataProvider.introspect().then(r => setResources(r));
 *     }, []);
 *
 *     return (
 *         <AdminUI>
 *             {resources.map(resource => (
 *                 <Resource name={resource.name} key={resource.key} list={ListGuesser} />
 *             ))}
 *         </AdminUI>
 *     );
 * };
 */
const Notification = () => {
  const { notifications } = useNotificationContext();
  return <span>{JSON.stringify(notifications)}</span>;
};

export const Admin = (props: AdminProps) => {
  const {
    authProvider,
    basename,
    catchAll,
    children,
    dataProvider,
    history,
    layout,
    loading,
    loginPage,
    notification,
    queryClient,
    requireAuth,
    store,
    ready,
    title = 'Ligi Predictor',
  } = props;

  if (loginPage === true && process.env.NODE_ENV !== 'production') {
    console.warn(
      'You passed true to the loginPage prop. You must either pass false to disable it or a component class to customize it'
    );
  }

  return (
    <CoreAdminContext
      authProvider={authProvider}
      basename={basename}
      dataProvider={dataProvider}
      store={store}
      history={history}
      queryClient={queryClient}
    >
      <CoreAdminUI
        layout={layout}
        catchAll={catchAll}
        title={title}
        loading={loading}
        loginPage={loginPage}
        requireAuth={requireAuth}
        ready={ready}
      >
        {children}
      </CoreAdminUI>
      {notification && createElement(notification)}
    </CoreAdminContext>
  );
};

Admin.defaultProps = {
  store: localStorageStore(),
  notification: Notification,
};

export default Admin;

export type CoreAdminProps = CoreAdminContextProps & CoreAdminUIProps;


export interface AdminProps extends CoreAdminProps {
  notification?: ComponentType;
}
