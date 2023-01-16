import { ReactNode, ReactElement, ComponentType } from 'react';

/**
 * data types
 */

export type Identifier = string | number;

export interface DataRecord {
  id: Identifier;
  [key: string]: any;
}

export interface SortPayload {
  field: string;
  order: string;
}
export interface FilterPayload {
  [k: string]: any;
}
export interface PaginationPayload {
  page: number;
  perPage: number;
}
export type ValidUntil = Date;

/**
 * dataProvider types
 */
export type DataProvider<ResourceType extends string = string> = {
  getList: <RecordType extends DataRecord = any>(
      resource: ResourceType,
      params: GetListParams
  ) => Promise<GetListResult<RecordType>>;

  getOne: <RecordType extends DataRecord = any>(
      resource: ResourceType,
      params: GetOneParams
  ) => Promise<GetOneResult<RecordType>>;

  getMany: <RecordType extends DataRecord = any>(
      resource: ResourceType,
      params: GetManyParams
  ) => Promise<GetManyResult<RecordType>>;

  getManyReference: <RecordType extends DataRecord = any>(
      resource: ResourceType,
      params: GetManyReferenceParams
  ) => Promise<GetManyReferenceResult<RecordType>>;

  update: <RecordType extends DataRecord = any>(
      resource: ResourceType,
      params: UpdateParams
  ) => Promise<UpdateResult<RecordType>>;

  updateMany: <RecordType extends DataRecord = any>(
      resource: ResourceType,
      params: UpdateManyParams
  ) => Promise<UpdateManyResult<RecordType>>;

  create: <RecordType extends DataRecord = any>(
      resource: ResourceType,
      params: CreateParams
  ) => Promise<CreateResult<RecordType>>;

  delete: <RecordType extends DataRecord = any>(
      resource: ResourceType,
      params: DeleteParams<RecordType>
  ) => Promise<DeleteResult<RecordType>>;

  deleteMany: <RecordType extends DataRecord = any>(
      resource: ResourceType,
      params: DeleteManyParams<RecordType>
  ) => Promise<DeleteManyResult<RecordType>>;

  [key: string]: any;
};

export interface GetListParams {
  pagination: PaginationPayload;
  sort: SortPayload;
  filter: any;
  meta?: any;
}
export interface GetListResult<RecordType extends DataRecord = any> {
  data: RecordType[];
  total?: number;
  pageInfo?: {
      hasNextPage?: boolean;
      hasPreviousPage?: boolean;
  };
}

export interface GetOneParams<RecordType extends DataRecord = any> {
  id: RecordType['id'];
  meta?: any;
}
export interface GetOneResult<RecordType extends DataRecord = any> {
  data: RecordType;
}

export interface GetManyParams {
  ids: Identifier[];
  meta?: any;
}
export interface GetManyResult<RecordType extends DataRecord = any> {
  data: RecordType[];
}

export interface GetManyReferenceParams {
  target: string;
  id: Identifier;
  pagination: PaginationPayload;
  sort: SortPayload;
  filter: any;
  meta?: any;
}
export interface GetManyReferenceResult<RecordType extends DataRecord = any> {
  data: RecordType[];
  total?: number;
  pageInfo?: {
      hasNextPage?: boolean;
      hasPreviousPage?: boolean;
  };
}

export interface UpdateParams<T = any> {
  id: Identifier;
  data: Partial<T>;
  previousData: T;
  meta?: any;
}
export interface UpdateResult<RecordType extends DataRecord = any> {
  data: RecordType;
}

export interface UpdateManyParams<T = any> {
  ids: Identifier[];
  data: T;
  meta?: any;
}
export interface UpdateManyResult<RecordType extends DataRecord = any> {
  data?: RecordType['id'][];
}

export interface CreateParams<T = any> {
  data: T;
  meta?: any;
}
export interface CreateResult<RecordType extends DataRecord = any> {
  data: RecordType;
}

export interface DeleteParams<RecordType extends DataRecord = any> {
  id: RecordType['id'];
  previousData?: RecordType;
  meta?: any;
}
export interface DeleteResult<RecordType extends DataRecord = any> {
  data: RecordType;
}

export interface DeleteManyParams<RecordType extends DataRecord = any> {
  ids: RecordType['id'][];
  meta?: any;
}
export interface DeleteManyResult<RecordType extends DataRecord = any> {
  data?: RecordType['id'][];
}

export type DataProviderResult<RecordType extends DataRecord = any> =
  | CreateResult<RecordType>
  | DeleteResult<RecordType>
  | DeleteManyResult
  | GetListResult<RecordType>
  | GetManyResult<RecordType>
  | GetManyReferenceResult<RecordType>
  | GetOneResult<RecordType>
  | UpdateResult<RecordType>
  | UpdateManyResult;

export type MutationMode = 'pessimistic' | 'optimistic' | 'undoable';
export type OnSuccess = (
  response?: any,
  variables?: any,
  context?: any
) => void;
export type onError = (error?: any, variables?: any, context?: any) => void;
export type TransformData = (
  data: any,
  options?: { previousData: any }
) => any | Promise<any>;

export interface UseDataProviderOptions {
  action?: string;
  fetch?: string;
  meta?: object;
  mutationMode?: MutationMode;
  onSuccess?: OnSuccess;
  onError?: onError;
  enabled?: boolean;
}

export type RecordToStringFunction = (record: any) => string;

export interface ResourceOptions {
  label?: string;
  [key: string]: any;
}

export interface ResourceProps {
  name: string;
  list?: ComponentType<any> | ReactElement;
  create?: ComponentType<any> | ReactElement;
  edit?: ComponentType<any> | ReactElement;
  show?: ComponentType<any> | ReactElement;
  icon?: ComponentType<any>;
  recordRepresentation?: ReactElement | RecordToStringFunction | string;
  options?: ResourceOptions;
  children?: ReactNode;
}

export type ResourceElement = ReactElement<ResourceProps>;
export type RenderResourcesFunction = (
    permissions: any
) =>
    | ReactNode // (permissions) => <><Resource /><Resource /><Resource /></>
    | Promise<ReactNode> // (permissions) => fetch().then(() => <><Resource /><Resource /><Resource /></>)
    | ResourceElement[] // // (permissions) => [<Resource />, <Resource />, <Resource />]
    | Promise<ResourceElement[]>; // (permissions) => fetch().then(() => [<Resource />, <Resource />, <Resource />])
export type AdminChildren = RenderResourcesFunction | ReactNode;