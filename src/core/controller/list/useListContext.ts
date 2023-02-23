import { useContext, useMemo } from 'react';
import defaults from 'lodash/defaults';

import { ListContext } from './ListContext';
import { DataRecord } from '../../types';
import { ListControllerResult } from './useListController';

/**
 * Hook to read the list controller props from the ListContext.
 *
 * Mostly used within a <ListContext.Provider> (e.g. as a descendent of <List>
 * or <ListBase>).
 *
 * But you can also use it without a <ListContext.Provider>. In this case, it is up to you
 * to pass all the necessary props (see the list below).
 *
 * The given props will take precedence over context values.
 *
 * @typedef {Object} ListControllerProps
 * @prop {Object}   data an array of the list records, e.g. [{ id: 123, title: 'hello world' }, { ... }]
 * @prop {integer}  total the total number of results for the current filters, excluding pagination. Useful to build the pagination controls. e.g. 23
 * @prop {boolean}  isFetching boolean that is true on mount, and false once the data was fetched
 * @prop {boolean}  isLoading boolean that is false until the data is available
 * @prop {string}   resource the resource name, deduced from the location. e.g. 'posts'
 *
 * @returns {ListControllerResult}
 *
 * @see useListController for how it is filled
 *
 * @example // custom list view
 *
 * import { useListContext } from 'react-admin';
 *
 * const MyList = () => {
 *     const { data, isLoading } = useListContext();
 *     if (isLoading) {
 *         return <>Loading...</>;
 *     }
 *     return (
 *         <ul>
 *             {data.map(record => (
 *                 <li key={record.id}>{record.name}</li>
 *             ))}
 *         </ul>
 *     );
 * }
 */
export const useListContext = <RecordType extends DataRecord = any>(
  props?: any
): ListControllerResult<RecordType> => {
  const context = useContext(ListContext);
  // Props take precedence over the context
  // @ts-ignore
  return useMemo(
      () =>
          defaults(
              {},
              props != null ? extractListContextProps(props) : {},
              context
          ),
      [context, props]
  );
};


export default useListContext;

/**
 * Extract only the list controller props
 *
 * @param {Object} props Props passed to the useListContext hook
 *
 * @returns {ListControllerResult} List controller props
 */
const extractListContextProps = ({
  data,
  isFetching,
  isLoading,
  resource,
  total,
}: any) => ({
  data,
  isFetching,
  isLoading,
  resource,
  total,
});