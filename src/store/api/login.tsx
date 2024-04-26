// Middleware
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import {
  ChangePasswordResponseParams,
  LoginApiParams,
  LoginApiResponseParams,
} from "./types";
import { baseUrl } from "@src/constants/dimensions";
import apiMiddleware from "./apiMiddleware";

export const commonApi = apiMiddleware.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<LoginApiResponseParams, LoginApiParams>({
      query: ({ ...patch }) => ({
        url: "auth/login",
        method: "POST",
        body: patch,
      }),
    }),
    passwordChange: builder.mutation<void, ChangePasswordResponseParams>({
      query: ({ id, ...rest }) => ({
        url: `auth/change-password/${id}`,
        method: "PUT",
        body: { id, ...rest },
      }),
    }),
  }),
  overrideExisting: true, // Tüm mevcut uç noktalarını geçersiz kıl
});
export const { useLazyLoginQuery, usePasswordChangeMutation } = commonApi;
