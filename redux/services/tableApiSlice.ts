import { Table } from "../../../types";
import { apiSlice } from "./apiSlice";

const TABLE_URL = "api/tables";

interface TableData {
  numberOfGuests: number;
  status: string;
  number: number;
}

interface IUpdateTableData {
  data: TableData;
  tableId: string;
}

const apiSliceWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Tables"],
});

export const tableApiSlice = apiSliceWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getTables: builder.query<Table[], null>({
      query: () => {
        return {
          url: `${TABLE_URL}/`,
          method: "GET",
          credentials: "include",
        };
      },
      // transformResponse: (res: Table[]): Table[] =>
      //   res.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
      providesTags: ["Tables"],
    }),
    getTableById: builder.query({
      query: (tableId: string) => {
        return {
          url: `${TABLE_URL}/${tableId}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Tables"],
    }),
    createTable: builder.mutation({
      query: (data: TableData) => {
        return {
          url: `${TABLE_URL}`,
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: ["Tables"],
    }),
    updateTable: builder.mutation({
      query: ({ data, tableId }: IUpdateTableData) => {
        return {
          url: `${TABLE_URL}/${tableId}`,
          method: "PUT",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: ["Tables"],
    }),
    deleteTable: builder.mutation({
      query: (tableId: string | undefined) => {
        return {
          url: `${TABLE_URL}/${tableId}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["Tables"],
    }),
  }),
});

export const {
  useGetTablesQuery,
  useCreateTableMutation,
  useDeleteTableMutation,
  useGetTableByIdQuery,
  useUpdateTableMutation,
} = tableApiSlice;
