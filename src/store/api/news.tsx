// Middleware
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { NewsApiGetParamsRequest, NewsApiParamsRequest } from "./types";
import { baseUrl } from "@src/constants/dimensions";
import apiMiddleware from "./apiMiddleware";

// Constant

export const newsApi = apiMiddleware.injectEndpoints({
  endpoints: (builder) => ({
    news: builder.query<NewsApiParamsRequest, void>({
      query: () => ({
        url: "news",
        method: "GET",
      }),
    }),

    getByNew: builder.query<NewsApiGetParamsRequest, { page: number }>({
      query: ({ page }) => ({
        url: `news/get-by-paginated?page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetByNewQuery, useLazyNewsQuery } = newsApi;

export const { getByNew } = newsApi.endpoints;
