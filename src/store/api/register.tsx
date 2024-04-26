// Middleware
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import {
  LoginApiParams,
  LoginApiResponseParams,
  RegisterApiParams,
  RegisterResponseApiParams,
} from "./types";
import { baseUrl } from "@src/constants/dimensions";
import apiMiddleware from "./apiMiddleware";

// Constant

export const registerApi = apiMiddleware.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponseApiParams, RegisterApiParams>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
