import { apiSlice } from "./apiSlice";

const ORDERS_URL = "api/orders";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ startDate, endDate }) => {
        return {
          url: `${ORDERS_URL}?startDate=${startDate}&endDate=${endDate}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApiSlice;
