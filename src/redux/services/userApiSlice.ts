import { User } from "../../../types";
import { apiSlice } from "./apiSlice";

const USERS_URL = "api/users";

interface IUpdateUserData {
  values: User;
  userId: string;
}

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
    getUserById: builder.query({
      query: (userId: string) => {
        return {
          url: `${USERS_URL}/${userId}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    createUser: builder.mutation({
      query: (data: User) => {
        return {
          url: `${USERS_URL}/create`,
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    updateUser: builder.mutation({
      query: ({ values, userId }: IUpdateUserData) => {
        console.log("data", { values, userId });
        return {
          url: `${USERS_URL}/${userId}`,
          method: "PUT",
          body: values,
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

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = userApiSlice;
