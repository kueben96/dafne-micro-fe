import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8086/api/',
    credentials: 'include',
    // add token to headers if it exists for restricted api calls
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("jwtToken")
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers
    }
})

// TODO: BASEQUERY WITH REAUTH

export const apiGatewaySlice = createApi({
    // TODO: implement reauth endpoint, else replace with basequery
    baseQuery: baseQuery,
    tagTypes: ['Jobs', 'User', 'Data', 'Models'],
    endpoints: (builder) => ({
        fetchDatasets: builder.query({
            query: () => 'data',
        }),
        fetchAllJobs: builder.query({
            query: () => 'job',
        }),
    }),
})

export const {
    useFetchDatasetsQuery,
    useFetchAllJobsQuery
} = apiGatewaySlice
