import { createContext } from 'react';
import { ResourceInfo } from '../types';

/**
 * Context to store the current resource name.
 *
 * Use the useResource() hook to read the context. That's what most components do in core.
 *
 * @example
 *
 * import { useResourceContext } from 'core';
 *
 * const MyCustomEditTitle = props => {
 *     const { name } = useResourceContext(props);
 *
 *     return (
 *         <h1>{name}</h1>
 *     );
 * };
 */
export const ResourceContext = createContext<ResourceInfo>({ name: '', path: ''});