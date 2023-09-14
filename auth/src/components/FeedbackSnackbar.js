import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const FeedbackSnackbar = ({ open, onClose, message, isError }) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={5000}
            onClose={onClose}
        >
            <Alert
                onClose={onClose}
                color={isError ? 'error' : 'success'}
                severity={isError ? 'error' : 'success'}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default FeedbackSnackbar;
