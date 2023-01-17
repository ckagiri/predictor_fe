import {
  CREATE,
  DELETE,
  DELETE_MANY,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE,
  UPDATE_MANY,
} from './dataFetchActions';
import { DataProviderFn, DataProvider } from '../types';

const defaultDataProvider = () => Promise.resolve();
defaultDataProvider.create = () => Promise.resolve(null);
defaultDataProvider.delete = () => Promise.resolve(null);
defaultDataProvider.deleteMany = () => Promise.resolve(null);
defaultDataProvider.getList = () => Promise.resolve(null);
defaultDataProvider.getMany = () => Promise.resolve(null);
defaultDataProvider.getManyReference = () => Promise.resolve(null);
defaultDataProvider.getOne = () => Promise.resolve(null);
defaultDataProvider.update = () => Promise.resolve(null);
defaultDataProvider.updateMany = () => Promise.resolve(null);

const fetchMap: { [key: string]: any } = {
  create: CREATE,
  delete: DELETE,
  deleteMany: DELETE_MANY,
  getList: GET_LIST,
  getMany: GET_MANY,
  getManyReference: GET_MANY_REFERENCE,
  getOne: GET_ONE,
  update: UPDATE,
  updateMany: UPDATE_MANY,
};

interface ConvertedDataProvider extends DataProvider {
  (type: string, resource: string, params: any): Promise<any>;
}

/**
 * Turn a function-based dataProvider to an object-based one
 *
 * @param {Function} dataProviderFn A dataProvider function (type, resource, params) => Promise<any>
 *
 * @returns {Object} A dataProvider that core-admin can use
 */
const convertDataProviderFn = (
  dataProviderFn: DataProviderFn
): ConvertedDataProvider => {
  const proxy = new Proxy(defaultDataProvider, {
      get(_, name) {
          return (resource: string, params: any) => {
              if (Object.keys(fetchMap).includes(name.toString())) {
                  const fetchType = fetchMap[name.toString()] as any;
                  return dataProviderFn(fetchType, resource, params);
              }

              return dataProviderFn(name.toString(), resource, params);
          };
      },
      apply(_, __, args) {
          return dataProviderFn.apply(dataProviderFn, args as any);
      },
  });

  return proxy as any;
};

export default convertDataProviderFn;
