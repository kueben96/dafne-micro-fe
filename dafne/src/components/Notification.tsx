import * as React from 'react';
import { styled } from '@mui/system';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarCloseReason } from '@mui/base/useSnackbar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNotification } from '../useNotification';
import { Box, IconButton, Snackbar, Typography, useTheme } from '@mui/material';


const Notification = () => {

    const notification = useSelector((state: RootState) => state.notification);
    const { clearNotification } = useNotification();


    const theme = useTheme();
    const nodeRef = React.useRef(null);

    const handleClose = (_: any, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
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

                    <CheckRoundedIcon
                        sx={{
                            color: 'success.main',
                            flexShrink: 0,
                            width: '1.25rem',
                            height: '1.5rem',
                            marginRight: theme.spacing(3),
                        }}
                    />
                    <Box display="flex" flexDirection="column">
                        <Typography variant='h6'>{notification.header}</Typography>
                        <Typography variant='body1'>
                            {notification.message}
                        </Typography>
                    </Box>
                    <IconButton onClick={clearNotification}>
                        <CloseIcon sx={{ color: theme.palette.gray?.light }} />
                    </IconButton>
                </Box>
            </Snackbar>
        </React.Fragment>

    );
}

export default Notification;



