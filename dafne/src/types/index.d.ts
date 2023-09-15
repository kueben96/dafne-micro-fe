declare module '*.jpg';
declare module '*.png';
declare module 'theme/theme';
declare module 'react-dom/client'

// User Types
export interface IUser {
    _id: number;
    email: string;
    firstName: string;
    lastName: string;
    industry: string;
    jobTitle: string;
    // TODO: Add related jobs and models if needed
    // TODO: Add Notifications
}

// Job Types

enum JobStatus {
    Queued = "queued",
    Running = "running",
    Completed = "completed",
    Error = "error",
}

interface IJobsRowData {
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
        model: {
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
            runs: number;
            sample: number;
        };
    };
    jobId: string;
    result: string;
    resultQueue: string;
    status: string;
    topic: string;
    type: string;
    userId: string;
    workQueue: string;
}