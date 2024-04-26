import { UserInfoParams } from "../types";
import apiMiddleware from "./apiMiddleware";
import { useSellerPaginateQuery } from "@src/store/api/seller";
import { LoginApiResponseParams } from "./types";
import { UserGetInfoType } from "@src/screens/DrawerScreen/ProfilScreen/SettingChange/types";

// Constant

export const usersApi = apiMiddleware.injectEndpoints({
  endpoints: (builder) => ({
    getByUser: builder.query<UserGetInfoType, { id: string }>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "User", id: result?.data.id }],
    }),

    updateUser: builder.mutation<void, UserGetInfoType>({
      query: ({ data: { id, ...rest } }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: true,
});

export const { useUpdateUserMutation, useGetByUserQuery } = usersApi;
