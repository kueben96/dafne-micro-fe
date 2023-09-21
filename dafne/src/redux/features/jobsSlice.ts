import { createSlice } from "@reduxjs/toolkit";
import { ICreateServiceInstruction, IMetric, IModel } from "../../types";

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
            name: 'test',
            paths: {
                download: {
                    bucket: 'publicdataset',
                    path: 'demo.pkl',
                },
                upload: {
                    bucket: 'userbucket',
                    path: 'sebastian/directory/',
                },
            },
            runs: 2,
            sample: 500,
        },
    },
    availableMetrics: null,
    availableModels: null,
}

const jobsSlice = createSlice({
    name: 'jobs',
    initialState: initialJobsState,
    reducers: {
        setInstruction: (state, action) => {
            state.instruction = state.instruction = { ...state.instruction, ...action.payload };
        },
    }
});

export default jobsSlice.reducer;
export const { setInstruction } = jobsSlice.actions;