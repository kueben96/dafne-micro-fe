export const modelOptionsReproduction = [
    { value: 'ctgan', label: 'CTGAN', info: 'Info about CTGAN' },
    { value: 'tvae', label: 'TVAE', info: 'Info about TVAE' }
]
export const metricOptionsReproduction = [
    { value: 'statistic', label: 'Statistical similarity', info: 'Info about statistic' },
    { value: 'ml-task', label: 'Machine Learning task', info: 'Info about ML' },
    { value: 'logistik', label: 'Logistic detection', info: 'Info about log' },
]
export const reproductionEpochCount = 15;
export const reproductionStep1 = 'Set generation settings';
export const reproductionStep2 = 'Set row number'
export const reproductionStep3 = 'View results'
export const reproductionHorizontalSteps = [reproductionStep1, reproductionStep2, reproductionStep3];