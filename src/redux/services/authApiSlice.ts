import { apiSlice } from "./apiSlice";

const USERS_URL = "api/auth";

interface Data {
  email: string;
  password: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: Data) => {
        return {
          url: `${USERS_URL}/login`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
