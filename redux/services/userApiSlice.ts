import { User } from "@/types";
import { apiSlice } from "./apiSlice";

const USERS_URL = "api/users";

interface IUpdateUserData {
  values: User;
  userId: string;
}

const apiSliceWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Users"],
});

export const userApiSlice = apiSliceWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], null>({
      query: () => {
        return {
          url: `${USERS_URL}/`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Users"],
    }),
    getCurrentUser: builder.query({
      query: () => {
        return {
          url: `${USERS_URL}/current-user`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Users"],
    }),
    getUserById: builder.query({
      query: (userId: string) => {
        return {
          url: `${USERS_URL}/${userId}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Users"],
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
      invalidatesTags: ["Users"],
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
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (userId: string) => {
        return {
          url: `${USERS_URL}/${userId}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetCurrentUserQuery,
} = userApiSlice;
