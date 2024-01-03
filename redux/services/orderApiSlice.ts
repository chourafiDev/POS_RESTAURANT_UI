import { apiSlice } from "./apiSlice";

const ORDERS_URL = "api/orders";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => {
        return {
          url: `${ORDERS_URL}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApiSlice;
