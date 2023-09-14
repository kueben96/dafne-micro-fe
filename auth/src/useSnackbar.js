// useSnackbar.js

import { useState } from 'react';

const useSnackbar = () => {
    const [message, setMessage] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isError, setIsError] = useState(false);

    const showSnackbar = ({ message, isError = true }) => {
        setMessage(message);
        setIsError(isError);
        setSnackbarOpen(true);
    };

    const closeSnackbar = () => {
        setMessage(null);
        setIsError(false);
        setSnackbarOpen(false);
    };

    return {
        message,
        snackbarOpen,
        isError,
        showSnackbar,
        closeSnackbar,
    };
};

export default useSnackbar;
