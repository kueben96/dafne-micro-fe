export enum JobStatus {
    Queued = "queued",
    Running = "running",
    Completed = "completed",
    Error = "error",
}

export enum JobType {
    Reproduction = "reproduction",
}
export enum ReproductionModel {
    CTGAN = "ctgan-pamela",
    TVAE = "tvae-pamela",
}
export enum ReproductionMetric {
    WeightedStatistics = "weightedstatistics-pamela",
}

export const mapStatusToReadable = (status: string): string => {
    switch (status) {
        case JobStatus.Queued:
            return "Queued";
        case JobStatus.Running:
            return "Running";
        case JobStatus.Completed:
            return "Completed";
        case JobStatus.Error:
            return "Error";
        default:
            return "Unknown";
    }
};

export const mapServiceTypeToReadable = (type: string): string => {
    switch (type) {
        case JobType.Reproduction:
            return "Reproduction";
        // Add other type mappings as needed
        default:
            return "Unknown";
    }
};
