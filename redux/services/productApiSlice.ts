import { Product } from "@/types";
import { apiSlice } from "./apiSlice";

const PRODUCTS_URL = "api/products";

interface IUpdateProductData {
  values: Product;
  productId: string;
}

const apiSliceWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Products"],
});

export const productApiSlice = apiSliceWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: (data) => {
        const { title, category, min_price, max_price } = data;
        console.log("min_price");
        console.log("min_price", min_price);
        return {
          url: `${PRODUCTS_URL}/menu?title=${title}&category=${category}&min_price=${min_price}&max_price=${max_price}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    getProducts: builder.query({
      query: () => {
        return {
          url: `${PRODUCTS_URL}/`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (productId: string) => {
        return {
          url: `${PRODUCTS_URL}/${productId}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (data: Product) => {
        return {
          url: `${PRODUCTS_URL}`,
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ values, productId }: IUpdateProductData) => {
        return {
          url: `${PRODUCTS_URL}/${productId}`,
          method: "PUT",
          body: values,
          credentials: "include",
        };
      },
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (productId: string) => {
        return {
          url: `${PRODUCTS_URL}/${productId}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetMenuQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} = productApiSlice;
