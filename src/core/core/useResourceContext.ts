import { useContext } from 'react';
import { ResourceInfo } from '../types';
import { ResourceContext } from './ResourceContext';

/**
 * Hook to read the resource from the ResourceContext.
 *
 * Must be used within a <ResourceContextProvider> (e.g. as a descendent of <Resource>
 * or any reference related components), or called with a resource prop.
 *
 * @example
 *
 * const ResourceName = (props) => {
 *   const resource = useResourceContext(props);
 *   const getResourceLabel = useGetResourceLabel();
 *   return <>{getResourceLabel(resource.name, 1)}</>;
 * }
 *
 * // use it in a resource context
 * const MyComponent = () => (
 *   <ResourceContextProvider value={{name: posts}}>
 *     <ResourceName />
 *     ...
 *   </ResourceContextProvider>
 * );
 *
 * // override resource via props
 * const MyComponent = () => (
 *   <>
 *     <ResourceName resource={{name: posts}}/>
 *     ...
 *   </>
 * );
 *
 * @returns {ResourceInfo} The resource, e.g. '{ name: posts}'
 */
export const useResourceContext = <
    ResourceInformationsType extends Partial<{ resource: ResourceInfo }>
>(
    props?: ResourceInformationsType
): ResourceInfo => {
    const context = useContext(ResourceContext);
    return (props && props.resource) || (context) ;
};
