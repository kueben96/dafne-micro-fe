import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const withErrorHandling = (WrappedComponent) => {
    return function WithErrorHandling(props) {
        const [error, setError] = useState(null);
        const [successMessage, setSuccessMessage] = useState(null);
        const [snackbarOpen, setSnackbarOpen] = useState(false);

        const handleSnackbarClose = () => {
            setSnackbarOpen(false);
        };

        const showError = (errorMessage) => {
            setError(errorMessage);
            setSnackbarOpen(true);
        };

        const showSuccessMessage = (message) => {
            setSuccessMessage(message);
            setSnackbarOpen(true);
        };

        return (
            <>
                <WrappedComponent
                    {...props}
                    showError={showError}
                    showSuccessMessage={showSuccessMessage}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={snackbarOpen}
                    autoHideDuration={5000}
                    onClose={handleSnackbarClose}
                >
                    {error && (
                        <Alert
                            onClose={handleSnackbarClose}
                            severity="error"
                            sx={{ width: '100%' }}
                        >
                            {error}
                        </Alert>
                    )}
                    {successMessage && (
                        <Alert
                            onClose={handleSnackbarClose}
                            severity="success"
                            sx={{ width: '100%' }}
                        >
                            {successMessage}
                        </Alert>
                    )}
                </Snackbar>
            </>
        );
    };
};

export default withErrorHandling;
