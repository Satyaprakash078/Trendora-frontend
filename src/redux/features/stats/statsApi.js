import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseUrl";

const statsApi= createApi({
    reducerPath: 'statsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/stats`,
        credentials: 'include'
    }),
    tagTypes: ['Stats'],
    endpoints: (builder) => ({
        getUserStats: builder.query({
            query: (email) => `/user-stats/${email}`,
            providesTags: ['Stats'],
        }),
        getAdminStats: builder.query({
            query: () => `/admin-stats`,
            providesTags: ['Stats'],
        }),
    }),
})

export const {useGetAdminStatsQuery,useGetUserStatsQuery}= statsApi;
export default statsApi;