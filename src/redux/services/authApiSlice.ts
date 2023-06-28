import { apiSlice } from "./apiSlice";

const AUTH_URL = "api/auth";

interface Data {
  email: string;
  password: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: Data) => {
        return {
          url: `${AUTH_URL}/login`,
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: `${AUTH_URL}/logout`,
          method: "POST",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
