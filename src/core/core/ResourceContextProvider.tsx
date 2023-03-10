import * as React from 'react';
import { ReactElement } from 'react';
import { ResourceInfo } from '../types';
import { ResourceContext } from './ResourceContext';

/**
 * Create a Resource Context with the resource name
 *
 * Some react-admin components rely on the resource name to be available in the context.
 * This component provides it.
 *
 * If the value is empty, the context is not provided.
 *
 * @param {string} value the resource name
 * @example
 *
 * import { ResourceContextProvider } from 'react-admin';
 *
 * const MyComponent = () => (
 *    <ResourceContextProvider value="posts">
 *       <MyResourceSpecificComponent />
 *   </ResourceContextProvider>
 * );
 */
export const ResourceContextProvider = ({
    children,
    value,
}: {
  children: ReactElement;
  value?: ResourceInfo;
}) =>
  value ? (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  ) : (
    children
  );
