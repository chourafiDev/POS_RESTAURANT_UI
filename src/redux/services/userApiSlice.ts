import { User } from "../../../types";
import { apiSlice } from "./apiSlice";

const USERS_URL = "api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], null>({
      query: () => {
        return {
          url: `${USERS_URL}/`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    createUser: builder.mutation({
      query: (data: User) => {
        return {
          url: `${USERS_URL}/create-user`,
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    deleteUser: builder.mutation({
      query: (userId: string) => {
        return {
          url: `${USERS_URL}/${userId}`,
          method: "DELETE",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation, useDeleteUserMutation } = userApiSlice;
