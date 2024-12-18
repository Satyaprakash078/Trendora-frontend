import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseUrl";

// Log baseURL to confirm it's correct
//console.log(getBaseURL());

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/auth`,
        credentials: 'include', // This sends cookies with requests, helpful for sessions
    }),
    tagTypes:["User"],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: '/register',
                method: "POST",
                body: newUser
            }),
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: "POST",
                body: credentials
            }),
        }),
        logoutUser :builder.mutation({
            query: () => ({
                url: '/logout',
                method: "POST",       
            }),
        }),
        getUser:builder.query({
            query: () => ({
                url: '/users',
                method: "GET",
            }),
            refetchOnMount:true,
            invalidatesTags:["User"],
        }),
        deleteUser:builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags:["User"],
        }),
        updateUserRole: builder.mutation({
            query: ({userId,role}) => ({
                url: `/users/${userId}`,
                method: "PUT",
                body:{role},
            }),
            refetchOnMount:true,
            invalidatesTags:["User"],
        }),
        editProfile: builder.mutation({
            query: (profileData) => ({
                url: `/edit-profile`,
                method: "PATCH",
                body:profileData,
            }),
        }),    
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation,useGetUserQuery,
               useLogoutUserMutation,useDeleteUserMutation,
               useUpdateUserRoleMutation,useEditProfileMutation} = authApi;
