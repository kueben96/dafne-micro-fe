import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JWT_TOKEN_KEY, USER_LOGOUT_EVENT_KEY } from "../../utils/constants";
import jwt_decode from "jwt-decode";
import { IJob, IJobsRowData, IUser } from "../../types";

interface _DecodedToken {
    email: string;
    firstName: string;
    lastName: string;
    industry: string;
    jobTitle: string;
}

// Define the initial state
interface UserState {
    user: IUser | null;
    token: string | null;
    jobs: IJobsRowData[] | null;
}

const initialState: UserState = {
    user: null,
    token: null,
    jobs: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            const token = action.payload;

            if (token) {
                try {
                    // Parse the token and extract user information
                    var decodedToken: _DecodedToken = jwt_decode(token);
                    const { email, firstName, lastName, industry, jobTitle } = decodedToken;

                    const _id = 1; // Replace with the user's id from your authentication system
                    const user: IUser = {
                        _id,
                        email,
                        firstName,
                        lastName,
                        industry,
                        jobTitle,
                    };

                    // Update the state with the user object and token
                    state.user = user;
                    state.token = token;
                } catch (error) {
                    if (error instanceof Error) {
                        console.error('An error occurred:', error.message);
                    } else {
                        console.error('An unknown error occurred:', error);
                    }
                }
            }
        },

        logOut: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem(JWT_TOKEN_KEY);
            window.dispatchEvent(new CustomEvent(USER_LOGOUT_EVENT_KEY))
        },
        setUserJobs: (state, action: PayloadAction<IJob[]>) => {
            // TODO: irgendwo auch das ganze objekt storen für detaiL?

            const jobs = action.payload;
            const userJobsRow: IJobsRowData[] = jobs.map((job) => {
                const { jobId, createdAt, instruction, status, type } = job;
                const { identifier } = instruction.metrics[0];

                const score = 0.98;

                const dateCreated = new Date(createdAt).toISOString();
                return {
                    id: jobId,
                    service: type,
                    metric: identifier,
                    status,
                    score,
                    dateCreated,
                };
            });
            state.jobs = userJobsRow;
        }
    },
});

export const { setUser, logOut, setUserJobs } = userSlice.actions;

export default userSlice.reducer;
