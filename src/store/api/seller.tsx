// Middleware
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { SellerApiResponseParams, SellerGetAllParams } from './types';
import { baseUrl } from '@src/constants/dimensions';
import apiMiddleware from './apiMiddleware';

// Constant

export const sellerApi = apiMiddleware.injectEndpoints({
  endpoints: (builder) => ({
    seller: builder.query<SellerGetAllParams, void>({
      query: () => ({
        url: 'sellers',
        method: 'GET',
      }),
    }),
    sellerPaginate: builder.query<SellerApiResponseParams, { page: number }>({
      query: ({ page }) => ({
        url: `sellers/get-by-paginated?page=${page}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useSellerPaginateQuery, useLazySellerQuery } = sellerApi;
