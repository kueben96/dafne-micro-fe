import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICreateServiceInstruction, IMetric, IModel } from "../../types";
import { RootState } from "../store";

interface JobsState {
    instruction: ICreateServiceInstruction;
    availableMetrics: IMetric[] | null;
    availableModels: IModel[] | null;
}

const initialJobsState: JobsState = {
    instruction: {
        epochs: 10,
        metrics: [],
        model: {
            identifier: '',
        },
        name: 'test',
        paths: {
            download: {
                bucket: 'publicdataset',
                path: '/demo-data/news.csv',
            },
            upload: {
                bucket: 'userbucket',
                path: 'sebastian/directory/',
            },
        },
        runs: 2,
        sample: 500,

    },
    availableMetrics: null,
    availableModels: null,
}

const jobsSlice = createSlice({
    name: 'jobs',
    initialState: initialJobsState,
    reducers: {
        setInstruction: (state, action: PayloadAction<ICreateServiceInstruction>) => {
            state.instruction = state.instruction = { ...state.instruction, ...action.payload };
        },
    }
});

export default jobsSlice.reducer;
export const selectInitialPublicDataset
    = (state: RootState) => {
        const dataSet = state.user.datasets?.find(dataset => dataset.bucketName === 'publicdataset');
        return dataSet?.objectName;
    }
export const { setInstruction } = jobsSlice.actions;