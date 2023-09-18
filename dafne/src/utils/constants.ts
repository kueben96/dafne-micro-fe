export const modelOptionsReproduction: { value: string; label: string; info: string }[] = [
    { value: 'ctgan', label: 'CTGAN', info: 'Info about CTGAN' },
    { value: 'tvae', label: 'TVAE', info: 'Info about TVAE' }
];
export const metricOptionsReproduction: { value: string; label: string; info: string }[] = [
    { value: 'statistic', label: 'Statistical similarity', info: 'Info about statistic' },
    { value: 'ml-task', label: 'Machine Learning task', info: 'Info about ML' },
    { value: 'logistik', label: 'Logistic detection', info: 'Info about log' },
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
        PATH: '/dashboard',
        JOBS: '/dashboard/jobs',
        DATA: '/dashboard/data',
        MODELS: '/dashboard/models',
    },
    METHODS: {
        PATH: '/methods',
        REPRODUCTION: '/methods/reproduction',
        FUSION: '/methods/fusion',
        RULE_BASED: '/methods/rule-based',
    },
};
