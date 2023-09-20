import { createSlice } from "@reduxjs/toolkit";
import { ICreateServiceInstruction } from "../../types";
import { JobStatus } from "../../types/enums";


interface JobsState {
    instruction: ICreateServiceInstruction;

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
                path: 'demo.pkl',
            },
            upload: {
                bucket: 'userbucket',
                path: 'sebastian/directory/',
            },
        },
        runs: 2,
        sample: 500,
    }
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