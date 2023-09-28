export const metricKeyNameMappings: Record<string, string> = {
    logisticDetection: "Logistic detection",
    mlefficacy: "MLEfficacy",
    standard: "Statistical Similarity",
};

export function getMetricDisplayName(keyName: string, metricIdentifier?: string) {
    const mappedName = metricKeyNameMappings[keyName];
    if (mappedName) {
        return mappedName;
    }
    return `${keyName} - ${metricIdentifier}`;
}


export const JWT_TOKEN_KEY = 'jwtToken';
export const USER_LOGOUT_EVENT_KEY = 'userLogout';

export const reproductionHorizontalSteps: string[] = [
    'Set generation settings',
    'Set output data preferences',
    'Train Model',
];


export const ROUTES = {
    HOME: '/',
    DASHBOARD: {
        INDEX: '/dashboard',
        JOBS: '/dashboard/jobs',
        JOB_DETAIL: '/dashboard/jobs/:id',
        DATA: '/dashboard/data',
        MODELS: '/dashboard/models',
    },
    METHODS: {
        INDEX: '/methods',
        REPRODUCTION: '/methods/reproduction',
        FUSION: '/methods/fusion',
        RULE_BASED: '/methods/rule-based',
    },
};
