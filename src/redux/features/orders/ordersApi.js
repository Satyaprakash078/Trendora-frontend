import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseUrl";

const orderApi= createApi({
    reducerPath: 'orderApi',    
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/orders`,
        credentials: 'include'
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        getOrdersByEmail: builder.query({
            query: (email) => ({
                url:  `${email}`,
                method: 'GET',
            }),
            providesTags:['Order'],
               
        }),
        getOrdersById: builder.query({
            query: (orderId) => ({
                url: `/order/${orderId}`,
                method: 'GET',
            }),
            providesTags:['Order']
        }),
        getAllOrders:builder.query({
            query: () => ({
                url: '',
                method: 'GET'
            }),
            providesTags:['Order']
        }),
        updateOrderStatus:builder.mutation({
            query: ({ id, status }) => ({
                url: `/update-order-status/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidateTags : ['Order'],
        }),
        deleteOrder:builder.mutation({
            query: (orderId) => ({
                url: `/delete-order/${orderId}`,
                method: 'DELETE',
            }),
            invalidatesTags : ['Order']
        }),
    }),
})

export const {useGetOrdersByEmailQuery,useGetOrdersByIdQuery,useGetAllOrdersQuery,
              useDeleteOrderMutation,useUpdateOrderStatusMutation}= orderApi;
export default orderApi;