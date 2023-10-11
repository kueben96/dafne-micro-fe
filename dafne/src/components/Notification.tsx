import * as React from 'react';
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarCloseReason } from '@mui/base/useSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNotification } from '../useNotification';
import { AlertColor, Box, IconButton, Snackbar, Typography, useTheme } from '@mui/material';
import { NotificationActions } from '../redux/features/notificationsSlice';


const Notification = () => {

    const notifications = useSelector((state: RootState) => state.notifications.notifications);
    const dispatch = useDispatch()

    const theme = useTheme();

    const handleClose = (_: any, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        // Dispatch an action to remove the first notification in the list
        if (notifications.length > 0) {
            dispatch(NotificationActions.removeNotification(notifications[0].id!));
        }
    }

    const getIcon = (type: AlertColor) => {
        const iconStyle = { marginRight: theme.spacing(3), marginLeft: theme.spacing(1) };
        switch (type) {
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
    const getVerticalPosition = (index: number) => {
        const basePosition = 4;
        const verticalPosition = basePosition + index * 6.5;
        return `${verticalPosition}rem`;
    };



    return (
        <React.Fragment>
            {notifications.map((notification, index) => (
                <Snackbar
                    key={notification.id}
                    autoHideDuration={notification.timeout}
                    open={true}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    sx={{
                        backgroundColor: theme.palette.background?.paper,
                        display: "flex",
                        marginTop: getVerticalPosition(index),
                        borderRadius: 0.5,
                        boxShadow: 3,
                        padding: theme.spacing(2, 1),
                        maxWidth: 300,
                    }}
                >
                    <Box display="flex" flexDirection="row">
                        {getIcon(notification.type)}
                        <Box display="flex" flexDirection="column">
                            <Typography variant='h6'>{notification.header}</Typography>
                            <Typography variant='body1'>
                                {notification.message}
                            </Typography>
                        </Box>
                        <IconButton onClick={() => dispatch(NotificationActions.removeNotification(notification.id!))} sx={{ alignSelf: "start" }}>
                            <CloseIcon sx={{ color: theme.palette.gray?.light }} />
                        </IconButton>
                    </Box>
                </Snackbar>
            ))}
        </React.Fragment>
    );
}

export default Notification;



