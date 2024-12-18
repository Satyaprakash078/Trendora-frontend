import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseUrl";

const reviewsApi= createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/reviews`,
         credentials: 'include'
    }),
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
        //add a review
        AddReview: builder.mutation({
            query: (reviewData) => ({
                url:'/post-review',
                method: 'POST',
                body: reviewData
            }),
            invalidatesTags: (result,error,{postId})=>[{type:"Reviews",id:postId}],
        }),
        // get reviews count
        GetReviewsCount: builder.query({
            query: (postId) => ({
                url: `/total-reviews`,
            }),
        }),
        //get reviews by Id
        GetReviewsById: builder.query({
            query: (userId) => ({
                url: `/${userId}`,
            }),
            providesTags:(result)=>result ? [{type:"Reviews",id:result[0]?.email}] : []
        }),
    }),
})
export const {useAddReviewMutation,useGetReviewsByIdQuery,
    useGetReviewsCountQuery}= reviewsApi;
    export default reviewsApi;