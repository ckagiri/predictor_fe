import { UseQueryOptions } from 'react-query';

import { useGetList, UseGetListHookValue } from '../../dataProvider';
import { DataRecord, ResourceInfo } from '../../types';
import { useNotify } from '../../notification';
import { useResourceContext,  } from '../../core';
import { generatePath, useParams } from 'react-router';

/**
 * Prepare data for the List view
 *
 * @param {Object} props The props passed to the List component.
 *
 * @return {Object} controllerProps Fetched and computed data for the List view
 *
 * @example
 *
 * import { useListController } from 'react-admin';
 * import ListView from './ListView';
 *
 * const MyList = props => {
 *     const controllerProps = useListController(props);
 *     return <ListView {...controllerProps} {...props} />;
 * }
 */
export const useListController = <RecordType extends DataRecord = any>(
    props: ListControllerProps<RecordType> = {}
): ListControllerResult<RecordType> => {
    const {
        queryOptions = {},
    } = props;
    const resourceInfo = useResourceContext();
    const notify = useNotify();
    const { meta, ...otherQueryOptions } = queryOptions;

    if (!resourceInfo) {
        throw new Error(
            `<List> was called outside of a ResourceContext and without a resource prop. You must set the resource prop.`
        );
    }

    const { name, path, source } = resourceInfo;
    const pathParams = useParams();
    const resourcePath = generatePath(path, pathParams);
    const resource: ResourceInfo = { name, path: resourcePath }

    if (source) {
      const { name, path } = source;
      const resourcePath = generatePath(path, pathParams);
      resource.source = { name, path: resourcePath}
    }

    const {
        data,
        total,
        error,
        isLoading,
        isFetching,
        refetch,
    } = useGetList<RecordType>(
        resource,
        {
            meta,
        },
        {
            keepPreviousData: true,
            retry: false,
            onError: (error: { message: any; }) =>
                notify(error?.message || 'Http Error', {
                    type: 'warning',
                    messageArgs: {
                        _: error?.message,
                    },
                }),
            ...otherQueryOptions,
        } as any
    );

    return {
        data: data!,
        error,
        isFetching,
        isLoading,
        refetch,
        resource,
        total: total!,
    };
};

export interface ListControllerProps<RecordType extends DataRecord = any> {
    queryOptions?: UseQueryOptions<{
        data: RecordType[];
        total?: number;
    }> & { meta?: any };
    resource?: ResourceInfo;
}

export interface ListControllerResult<RecordType extends DataRecord = any> {
    data: RecordType[];
    error?: any;
    isFetching: boolean;
    isLoading: boolean;
    refetch: (() => void) | UseGetListHookValue<RecordType>['refetch'];
    resource: ResourceInfo;
    total: number;
}

export const injectedProps = [
    'data',
    'error',
    'isFetching',
    'isLoading',
    'refetch',
    'refresh',
    'resource',
    'total',
];

/**
 * Select the props injected by the useListController hook
 * to be passed to the List children need
 * This is an implementation of pick()
 */
export const getListControllerProps = (props: { [key: string]: any; }) =>
    injectedProps.reduce((acc, key) => ({ ...acc, [key]: props[key] }), {});

/**
 * Select the props not injected by the useListController hook
 * to be used inside the List children to sanitize props injected by List
 * This is an implementation of omit()
 */
export const sanitizeListRestProps = (props: { [key: string]: any; }) =>
    Object.keys(props)
        .filter(propName => !injectedProps.includes(propName))
        .reduce((acc, key) => ({ ...acc, [key]: props[key] }), {});
