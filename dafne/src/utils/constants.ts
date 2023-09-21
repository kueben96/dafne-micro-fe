import { InstructionOptionDropdown } from "../types";

export const metricKeyNameMappings: Record<string, string> = {
    logisticDetection: "Logistic detection",
    mlefficacy: "MLEfficacy",
    standard: "Standard",
};

export function getMetricDisplayName(keyName: string, metricIdentifier?: string) {
    const mappedName = metricKeyNameMappings[keyName];
    if (mappedName) {
        return mappedName;
    }
    return `${keyName} - ${metricIdentifier}`;
}

export const modelOptionsReproduction: InstructionOptionDropdown[] = [
    { value: 'ctgan', label: 'CTGAN', info: 'Info about CTGAN', apiName: 'ctgan-pamela' },
    { value: 'tvae', label: 'TVAE', info: 'Info about TVAE', apiName: 'tvae-pamela' }
];
export const metricOptionsReproduction: InstructionOptionDropdown[] = [
    { value: 'statistic', label: 'Statistical similarity', info: 'Info about statistic', apiName: 'weightedstatistics-pamela' },
    { value: 'ml-task', label: 'Machine Learning task', info: 'Info about ML', apiName: 'mltask-pamela' },
    { value: 'logistik', label: 'Logistic detection', info: 'Info about log', apiName: 'logistik-pamela' },
];

export const JWT_TOKEN_KEY = 'jwtToken';
export const USER_LOGOUT_EVENT_KEY = 'userLogout';

export const reproductionEpochCount: number = 15;
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
