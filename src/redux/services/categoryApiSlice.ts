import { Category } from "../../../types";
import { apiSlice } from "./apiSlice";

const CATEGORY_URL = "api/categories";

interface IUpdateCategoryData {
  data: Category;
  categoryId: string;
}

const apiSliceWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Categories"],
});

export const categoryApiSlice = apiSliceWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], null>({
      query: () => {
        return {
          url: `${CATEGORY_URL}/`,
          method: "GET",
          credentials: "include",
        };
      },
      // transformResponse: (res: Category[]): Category[] =>
      //   res.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
      providesTags: ["Categories"],
    }),
    getCategoryById: builder.query({
      query: (categoryId: string) => {
        console.log("categoryId", categoryId);
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
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ data, categoryId }: IUpdateCategoryData) => {
        return {
          url: `${CATEGORY_URL}/${categoryId}`,
          method: "PUT",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId: string) => {
        return {
          url: `${CATEGORY_URL}/${categoryId}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["Categories"],
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
