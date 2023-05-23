// export const isStepOptional = (step) => {
//     return step === 1;
// };

export const isStepSkipped = (step: number, skipped: Set<number>): boolean => {
    return skipped.has(step);
};

export const isStepCompleted = (step: number, completed: Set<number>): boolean => {
    return completed.has(step);
};
