import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl =
//   process.env.NODE_ENV === "production"
//     ? "process.env.NEXT_PUBLIC_API_URL"
//     : "http://localhost:8080/";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});
export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
