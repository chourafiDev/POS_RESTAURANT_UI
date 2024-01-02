import { apiSlice } from "./apiSlice";

const PAYMENTS_URL = "api/payments";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCheckOutSession: builder.mutation({
      query: (data) => {
        return {
          url: `${PAYMENTS_URL}/create-checkout-session`,
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useCreateCheckOutSessionMutation } = paymentApiSlice;
