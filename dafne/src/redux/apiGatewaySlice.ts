import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IJob } from '../types';

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
        fetchAllJobs: builder.query<IJob[], void>({
            query: () => 'job',
        }),
        getJobDetailById: builder.query({
            query: job_id => `/job/${job_id}`,
        }),
        // TODO: delete job by id
        getJobStatusById: builder.query({
            query: job_id => `/job/${job_id}/status`,
        }),
    }),
})

export const {
    useFetchDatasetsQuery,
    useFetchAllJobsQuery,
    useGetJobDetailByIdQuery,
    useGetJobStatusByIdQuery
} = apiGatewaySlice
