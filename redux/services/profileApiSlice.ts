import { User } from "../../../types";
import { apiSlice } from "./apiSlice";

const PROFILE_URL = "api/profile";

interface IUpdateProfileData {
  values: User;
}

const apiSliceWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Profile"],
});

export const profileApiSlice = apiSliceWithTag.injectEndpoints({
  endpoints: (builder) => ({
    updateCurrentUser: builder.mutation({
      query: (values: IUpdateProfileData) => {
        return {
          url: `${PROFILE_URL}/`,
          method: "PUT",
          body: values,
          credentials: "include",
        };
      },
      invalidatesTags: ["Profile"],
    }),
    updateProfileImage: builder.mutation({
      query: (image: string | ArrayBuffer | null) => {
        return {
          url: `${PROFILE_URL}/image-profile`,
          method: "PUT",
          body: { image },
          credentials: "include",
        };
      },
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useUpdateCurrentUserMutation, useUpdateProfileImageMutation } =
  profileApiSlice;
