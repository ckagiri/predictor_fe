import { stringify } from 'query-string';
import { fetchUtils, DataProvider } from './core';

/**
 *
 * @example
 *
 * getList     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * getOne      => GET http://my.api.url/posts/123
 * getMany     => GET http://my.api.url/posts?filter={id:[123,456,789]}
 * update      => PUT http://my.api.url/posts/123
 * create      => POST http://my.api.url/posts
 * delete      => DELETE http://my.api.url/posts/123
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default (
  apiUrl: string,
  httpClient = fetchUtils.fetchJson,
  countHeader: string = 'Content-Range'
): DataProvider => ({
  getList: (resourcePath, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const rangeStart = (page - 1) * perPage;
    const rangeEnd = page * perPage - 1;

    const query = {
      sort: JSON.stringify([field, order].filter(v => v !== undefined)),
      range: JSON.stringify([rangeStart, rangeEnd]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resourcePath}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      return {
        data: json,
        total: json.length,
      }
    });
  },

  getOne: (resourcePath, params) =>
    httpClient(`${apiUrl}/${resourcePath}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resourcePath, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resourcePath}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: (resourcePath, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const rangeStart = (page - 1) * perPage;
    const rangeEnd = page * perPage - 1;

    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([rangeStart, rangeEnd]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resourcePath}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      return {
        data: json,
        total: json.length,
      }
    });
  },

  update: (resourcePath, params) =>
    httpClient(`${apiUrl}/${resourcePath}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  // doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
  updateMany: (resourcePath, params) =>
    Promise.all(
      params.ids.map(id =>
        httpClient(`${apiUrl}/${resourcePath}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        })
      )
    ).then(responses => ({ data: responses.map(({ json }) => json.id) })),

  create: (resourcePath, params) =>
    httpClient(`${apiUrl}/${resourcePath}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  delete: (resourcePath, params) =>
    httpClient(`${apiUrl}/${resourcePath}/${params.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'text/plain',
      }),
    }).then(({ json }) => ({ data: json })),

  // doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: (resourcePath, params) =>
    Promise.all(
      params.ids.map(id =>
        httpClient(`${apiUrl}/${resourcePath}/${id}`, {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'text/plain',
          }),
        })
      )
    ).then(responses => ({
      data: responses.map(({ json }) => json.id),
    })),
});
