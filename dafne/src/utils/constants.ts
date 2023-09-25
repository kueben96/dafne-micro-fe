import { InstructionOptionDropdown } from "../types";

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

type ReproductionStep = 'Set generation settings' | 'Set row number' | 'View results';
export const reproductionStep1: string = 'Set generation settings';
export const reproductionStep2: string = 'Set row number';
export const reproductionStep3: string = 'View results';
export const reproductionHorizontalSteps: ReproductionStep[] = [
    'Set generation settings',
    'Set row number',
    'View results',
];


export const ROUTES = {
    HOME: '/',
    DASHBOARD: {
        INDEX: '/dashboard',
        JOBS: '/dashboard/jobs',
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
