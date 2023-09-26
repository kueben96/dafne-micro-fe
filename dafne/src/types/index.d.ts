import { JobState, JobType } from "./enums";

declare module '*.jpg';
declare module "*.png" {
    const value: any;
    export default value;
}

declare module 'theme/theme';
declare module 'react-dom/client'


interface IUser {
    _id: number;
    email: string;
    firstName: string;
    lastName: string;
    industry: string;
    jobTitle: string;
}

interface IModel {
    identifier: string;
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
    metric: string;
    status: string;
    score: number;
    dateCreated: Date;
}

interface IJob {
    createdAt: string;
    instruction: {
        epochs: number;
        metrics: Array<{
            identifier: string;
            metric: string;
            params: Record<string, any>;
        }>;
        model: IModel;
    };
    jobId: string;
    result: string;
    resultQueue: string;
    status: JobState;
    topic: string;
    type: string;
    userId: string;
    workQueue: string;
}

type JobStateType = "queued | running | completed | error"
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
    model: IModel;
}
