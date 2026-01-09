import { Product } from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
    }),
    getCategories: builder.query<string[], void>({
      query: () => "/products/categories",
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductQuery,
} = productsApi;
