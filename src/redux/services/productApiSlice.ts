import { Product } from "../../../types";
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
    getProducts: builder.query<Product[], null>({
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
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} = productApiSlice;
