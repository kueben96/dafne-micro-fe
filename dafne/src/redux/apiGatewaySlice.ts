import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICreateServiceInstruction, IJob, IJobStatus, IMetric, IModel } from '../types';
import { mapServiceTypeToReadable, mapStatusToReadable } from '../types/enums';

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
            transformResponse: (response: IJob[]) => {
                return response.map(job => {
                    return {
                        ...job,
                        // status: mapStatusToReadable(job.status),
                        type: mapServiceTypeToReadable(job.type)
                    }
                })
            }
        }),
        getJobDetailById: builder.query<IJob, void>({
            query: job_id => `/job/${job_id}`,
        }),
        // TODO: delete job by id
        getJobStatusById: builder.query<IJobStatus, string>({
            query: job_id => `/job/${job_id}/status`,
        }),
        getModels: builder.query<IModel[], void>({
            query: () => 'model',
        }),
        getMetrics: builder.query<IMetric[], void>({
            query: () => 'metric',
        }),
        createServiceWithInstruction: builder.mutation<string, ICreateServiceInstruction>({
            query: (instructionObject) => ({
                url: 'service/create',
                method: 'POST',
                body: instructionObject,
                headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
                },
            }),
        }),

    }),
})

export const {
    useFetchDatasetsQuery,
    useFetchAllJobsQuery,
    useGetJobDetailByIdQuery,
    useGetJobStatusByIdQuery,
    useGetMetricsQuery,
    useGetModelsQuery,
    useCreateServiceWithInstructionMutation
} = apiGatewaySlice




