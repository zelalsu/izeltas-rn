import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@src/constants/dimensions';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const language_id = getState().language.id;
    headers.set('Accept', 'application/json');
    if (language_id) {
      headers.set('active-language', `${language_id}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  return result;
};

const apiMiddleware = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: '',
  keepUnusedDataFor: 0,
  tagTypes: ['User'],

  endpoints: () => ({}),
});

export default apiMiddleware;
