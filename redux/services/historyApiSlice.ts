import { apiSlice } from "./apiSlice";

const HISTORY_URL = "api/history";

const apiSliceWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["history"],
});

export const historyApiSlice = apiSliceWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getAllHistories: builder.query({
      query: ({ startDate, endDate }) => {
        return {
          url: `${HISTORY_URL}/?startDate=${startDate}&endDate=${endDate}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["history"],
    }),

    deleteHistory: builder.mutation({
      query: (historyId: string | undefined) => {
        return {
          url: `${HISTORY_URL}/${historyId}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["history"],
    }),

    deleteHistories: builder.mutation({
      query: (historyIds: string[] | undefined) => {
        return {
          url: `${HISTORY_URL}/`,
          method: "POST",
          credentials: "include",
          body: { ids: historyIds },
        };
      },
      invalidatesTags: ["history"],
    }),
  }),
});

export const {
  useGetAllHistoriesQuery,
  useDeleteHistoryMutation,
  useDeleteHistoriesMutation,
} = historyApiSlice;
