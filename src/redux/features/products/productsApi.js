import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseUrl";


const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/products`,
        credentials: 'include' // This sends cookies with requests, helpful for sessions
    }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        //get all products
        getProducts: builder.query({
            query: ({ category, color, minPrice, maxPrice, page = 1, limit = 10 }) => {
                const queryParams = new URLSearchParams({
                    category: category || '',
                    color: color || '',
                    minPrice: minPrice || 0,
                    maxPrice: maxPrice || '',
                    page: page.toString(),
                    limit: limit.toString(),
                }).toString();
                return `/?${queryParams}` // e.g- /?category=electronics&minPrice=100&page=2&limit=20
            },
            providesTags: ['Products'],
        }),
        //get a product by slug
        getProductBySlug: builder.query({
            query: (slug) => `/${slug}`, // e.g- /1
            providesTags: (result, error, slug) => [{ type: "Products", slug }]
        }),
        //add product
        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/create-product',
                method: 'POST',
                body: newProduct,
                credentials: 'include'
            }),
            invalidatesTags: ['Products'],
        }),
        //get related products
        getRelatedProducts: builder.query({
            query: (id) => `/related-products/${id}`,
        }),
        //update product
        updateProduct: builder.mutation({
            query: ({id, ...updatedBody}) => ({       //rest parameters tkes the remaning args
                url: `/update-product/${id}`,
                method: 'PATCH',
                body: updatedBody,
                credentials: 'include',
            }),
            invalidatesTags: ['Products'],
        }),
        //delete product
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: (result, error, id) => [{ type: "Products", id }],
        }),
    }),
})

export const {useAddProductMutation,useDeleteProductMutation,
             useGetProductBySlugQuery,useGetProductsQuery,
             useGetRelatedProductsQuery,useUpdateProductMutation} = productsApi;
           
  export default productsApi;