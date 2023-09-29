export enum JobState {
    Queued = "queued",
    Running = "running",
    Completed = "completed",
    Error = "error",
}
export enum DatasetType {
    User = "userbucket",
    Public = "publicdataset",
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
        case JobState.Queued:
            return "Queued";
        case JobState.Running:
            return "Running";
        case JobState.Completed:
            return "Completed";
        case JobState.Error:
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
export const mapModelToReadable = (type: string): string => {
    switch (type) {
        case ReproductionModel.CTGAN:
            return "CTGAN";
        case ReproductionModel.TVAE:
            return "TVAE";
        // Add other type mappings as needed
        default:
            return type;
    }
};

export function getFileNameFromPath(path: string) {
    const parts = path.split('/');
    return parts[parts.length - 1];
}

