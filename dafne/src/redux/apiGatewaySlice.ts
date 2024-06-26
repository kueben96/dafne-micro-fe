/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICreateServiceInstruction, IJob, IJobStatus, IMetric, IModel, IDatasetItem } from '../types';
import { mapServiceTypeToReadable } from '../types/enums';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8086/api/',
    credentials: 'include',
    // TODO: implement reauth endpoint, else replace with basequery
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
        fetchDatasets: builder.query<IDatasetItem[], void>({
            query: () => 'data',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (rawResponse: any) => {
                const parsedResponse: IDatasetItem[] = rawResponse.files.map((dataset: any) => {
                    return {
                        bucketName: dataset._bucket_name,
                        objectName: dataset._object_name,
                        etag: dataset._etag,
                        lastModified: dataset._last_modified,
                        metadata: dataset._metadata,
                        size: dataset._size,
                        storageClass: dataset._storage_class
                    } as IDatasetItem;
                });
                return parsedResponse;
            }
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
                    'Content-Type': 'application/json',
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




