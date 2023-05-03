export const isStepOptional = (step) => {
    return step === 1;
};

export const isStepSkipped = (step, skipped) => {
    return skipped.has(step);
};

export const isStepCompleted = (step, completed) => {
    return completed.has(step);
};
