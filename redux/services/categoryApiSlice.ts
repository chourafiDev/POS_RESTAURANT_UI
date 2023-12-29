import { Category } from "@/types";
import { apiSlice } from "./apiSlice";

const CATEGORY_URL = "api/categories";

interface CategoryData {
  name: string;
  icon: string;
  description: string;
}

interface IUpdateCategoryData {
  data: CategoryData;
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
      //   res.sort((a, b) => {
      //     const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      //     const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      //     return dateB.getTime() - dateA.getTime();
      //   }),
      providesTags: ["Categories"],
    }),
    getCategoryById: builder.query({
      query: (categoryId: any) => {
        console.log("categoryId", categoryId);
        return {
          url: `${CATEGORY_URL}/${categoryId}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation({
      query: (data: CategoryData) => {
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
