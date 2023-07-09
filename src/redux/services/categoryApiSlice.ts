import { Category } from "../../../types";
import { apiSlice } from "./apiSlice";

const CATEGORY_URL = "api/categories";

interface IUpdateCategoryData {
  values: Category;
  categoryId: string;
}

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], null>({
      query: () => {
        return {
          url: `${CATEGORY_URL}/`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    getCategoryById: builder.query({
      query: (categoryId: string) => {
        return {
          url: `${CATEGORY_URL}/${categoryId}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    createCategory: builder.mutation({
      query: (data: Category) => {
        return {
          url: `${CATEGORY_URL}/create`,
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    updateCategory: builder.mutation({
      query: ({ values, categoryId }: IUpdateCategoryData) => {
        console.log("data", { values, categoryId });
        return {
          url: `${CATEGORY_URL}/${categoryId}`,
          method: "PUT",
          body: values,
          credentials: "include",
        };
      },
    }),
    deleteCategory: builder.mutation({
      query: (categoryId: string) => {
        return {
          url: `${CATEGORY_URL}/${categoryId}`,
          method: "DELETE",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} = categoryApiSlice;
