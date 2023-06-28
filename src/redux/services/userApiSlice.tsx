import { User } from "../../../types";
import { apiSlice } from "./apiSlice";

const USERS_URL = "api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useCreateUserMutation } = userApiSlice;
