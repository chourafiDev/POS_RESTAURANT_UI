import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:8080/",
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});
export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
