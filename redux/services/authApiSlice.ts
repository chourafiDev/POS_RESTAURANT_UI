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
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: `${AUTH_URL}/forgot-password`,
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    resetPassword: builder.mutation({
      query: ({ password, tokenParam }) => {
        return {
          url: `${AUTH_URL}/reset-password/${tokenParam}`,
          method: "PATCH",
          body: { password },
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;
