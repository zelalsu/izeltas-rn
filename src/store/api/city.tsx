// Middleware
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { CityApiParamsRequest } from './types';
import { baseUrl } from '@src/constants/dimensions';
import apiMiddleware from './apiMiddleware';

// Constant

export const cityApi = apiMiddleware.injectEndpoints({
  endpoints: (builder) => ({
    city: builder.query<CityApiParamsRequest, void>({
      query: () => ({
        url: 'cities',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true, // Tüm mevcut uç noktalarını geçersiz kıl
});

export const { useLazyCityQuery } = cityApi;
