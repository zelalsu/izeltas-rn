import apiMiddleware from './apiMiddleware';
import {
  ProductSeriesApiResponseParams,
  ProductTypeApiParams,
  ProductTypeApiResponseParams,
} from './types';

export const productApi = apiMiddleware.injectEndpoints({
  endpoints: (builder) => ({
    product: builder.query<ProductTypeApiParams, void>({
      query: () => ({
        url: 'productTypes',
        method: 'GET',
      }),
    }),
    productTypes: builder.query<ProductTypeApiResponseParams, { page: number }>(
      {
        query: ({ page }) => ({
          url: `productTypes/get-by-paginated?page=${page}`,
          method: 'GET',
        }),
      }
    ),
    productSeries: builder.query<
      ProductSeriesApiResponseParams,
      { page: number }
    >({
      query: ({ page }) => ({
        url: `productSeries/get-by-paginated?page=${page}`,
        method: 'GET',
      }),
    }),
    sellerProductType: builder.query<
      ProductSeriesApiResponseParams,
      { product_type_id: string; page: number }
    >({
      query: ({ product_type_id, page }) => ({
        url: `productSeries/get-by-paginated?product_type_id=${product_type_id}&page=${page}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSellerProductTypeQuery,
  useProductSeriesQuery,
  useProductTypesQuery,
  useLazyProductQuery,
} = productApi;
