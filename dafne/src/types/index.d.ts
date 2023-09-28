import { JobState, JobType } from "./enums";

declare module '*.jpg';
declare module "*.png" {
    const value: any;
    export default value;
}

declare module 'theme/theme';
declare module 'react-dom/client'

interface IUser {
    _id: string;
    email: string;
    preferred_username: string;
    firstName: string;
    lastName: string;
    industry: string;
    jobTitle: string;
}


// TODO: missing properties from getModel like params 
interface IModel {
    name: string;
    type_name: string;
    image: string;
    mount_path: string;
    params: Record<string, any>;
    weightsPath: string | null;
    endpoints: Record<string, any>;
    creator: string;
    description: string;
    id: number;
    identifier: string;
    created_at: string;
}

interface IModelInstruction {
    identifier: string;
    weightsPath?: string | null;
    params?: Record<string, any> | null;
}


interface IMetric {
    endpoints: Record<string, string>;
    created_at: string;
    creator: string;
    description: string;
    id: number;
    identifier: string;
    image: string;
    mount_path: string;
    name: string;
    params: Record<string, unknown>;
    target_port: number;
    type_name: string;
}

type JobsRowData = {
    id: string;
    service: string;
    model: string;
    metric: string;
    status: string;
    score: number;
    dateCreated: Date;
}

interface IJob {
    createdAt: string;
    finishedAt: string;
    instruction: ICreateServiceInstruction;
    jobId: string;
    jobName: string; // Added to match the "jobName" field in the response
    result?: {
        newModelIdentifier: string;
        resultDataPath: string;
        score: number;
        weightsPath: string;
    };
    resultQueue: string;
    status: JobState;
    topic: string;
    type: string;
    userId: string;
    workQueue: string;
}

interface IJobStatus {
    job: IJob;
    lastMessage: string;
    run: number;
    runs: number;
    status: JobState;
    taskNum: number;
}

interface IMetricServiceInstruction {
    identifier: string;
    metric: string;
    params: Record<string, unknown>;
}

type InstructionOptionDropdown = {
    value: string;
    label: string;
    info: string;
    identifier: string;
};

interface ICreateServiceInstruction {
    epochs: number;
    metrics: IMetricServiceInstruction[];
    model: IModelInstruction;
    name: string;
    paths: {
        download: {
            bucket: string;
            path: string;
        };
        upload: {
            bucket: string;
            path: string;
        };
    };
    weightsPath?: string;
    runs: number;
    sample: number;
}
