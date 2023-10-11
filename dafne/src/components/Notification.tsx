import * as React from 'react';
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarCloseReason } from '@mui/base/useSnackbar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNotification } from '../useNotification';
import { Box, IconButton, Snackbar, Typography, useTheme } from '@mui/material';
import { SizedBoxVertical } from '../assets/theme/dafneStyles';


const Notification = () => {

    const notification = useSelector((state: RootState) => state.notification);
    const { clearNotification } = useNotification();


    const theme = useTheme();

    const handleClose = (_: any, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
    };

    const getIcon = () => {
        const iconStyle = { marginRight: theme.spacing(3), marginLeft: theme.spacing(1) };
        switch (notification.type) {
            case 'success':
                return <CheckIcon sx={{ ...iconStyle, color: 'success.main' }} />;
            case 'error':
                return <ErrorIcon sx={{ ...iconStyle, color: 'error.main' }} />;
            case 'warning':
                return <WarningIcon sx={{ ...iconStyle, color: 'secondary.main' }} />;
            case 'info':
                return <InfoIcon sx={{ ...iconStyle, color: 'primary.main' }} />;
            default:
                return null;
        }
    };



    return (
        <React.Fragment>
            <Snackbar
                autoHideDuration={notification.timeout}
                open={notification.open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{
                    backgroundColor: theme.palette.background?.paper,
                    display: "flex", marginTop: 5.5,
                    borderRadius: 0.5,
                    boxShadow: 3,
                    padding: theme.spacing(2, 1),
                    maxWidth: 300,
                }}
            >

                <Box display="flex" flexDirection="row">
                    {getIcon()}
                    <Box display="flex" flexDirection="column">
                        <Typography variant='h6'>{notification.header}</Typography>
                        <SizedBoxVertical space={0.5} />
                        <Typography variant='body1'>
                            {notification.message}
                        </Typography>
                    </Box>
                    <IconButton onClick={clearNotification} sx={{ alignSelf: "start" }} >
                        <CloseIcon sx={{ color: theme.palette.gray?.light }} />
                    </IconButton>
                </Box>
            </Snackbar>
        </React.Fragment>

    );
}

export default Notification;



