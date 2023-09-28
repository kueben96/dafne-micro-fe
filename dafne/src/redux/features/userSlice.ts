import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JWT_TOKEN_KEY, USER_LOGOUT_EVENT_KEY } from "../../utils/constants";
import jwt_decode from "jwt-decode";
import { IJob, IUser } from "../../types";
import { RootState } from "../store";

interface _DecodedToken {
    exp: number;
    iat: number;
    jti: string;
    iss: string;
    aud: string;
    sub: string;
    typ: string;
    azp: string;
    session_state: string;
    acr: string;
    realm_access: {
        roles: string[];
    };
    resource_access: {
        [resource: string]: {
            roles: string[];
        };
    };
    scope: string;
    sid: string;
    'da-real-gs'?: string[]; // Made optional since it's not always present
    email_verified: boolean;
    name: string;
    groups: string[];
    preferred_username: string;
    given_name: string;
    family_name: string;
    email: string;
}

// Define the initial state
interface UserState {
    user: IUser | null;
    token: string | null;
    jobs: IJob[] | null;
    jobsCount: number;
    modelsCount: number;
    datasetsCount: number;
}

const initialState: UserState = {
    user: null,
    token: null,
    jobs: null,
    jobsCount: 0,
    modelsCount: 2,
    datasetsCount: 2,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            const token = action.payload;

            if (token) {
                try {
                    var decodedToken: _DecodedToken = jwt_decode(token);
                    console.log(decodedToken);


                    const user: IUser = {
                        _id: "1b839e1a-28df-46ca-96ab-07d922c592fd",
                        email: decodedToken.email,
                        preferred_username: decodedToken.preferred_username,
                        firstName: decodedToken.given_name,
                        lastName: decodedToken.family_name,
                        industry: 'Research',
                        jobTitle: 'Scientist',
                    }
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

        // },
        setUserJobs: (state, action: PayloadAction<IJob[]>) => {
            const jobs = action.payload;
            state.jobs = jobs;
            state.jobsCount = jobs.length;
        },
    },
});

export const { setUser, logOut, setUserJobs } = userSlice.actions;
export const selectJobsCount = (state: RootState) => state.user.jobsCount;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
