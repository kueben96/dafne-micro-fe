import { Box, TextField, Typography, Button, useTheme } from '@mui/material';
import React, { useState } from 'react'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { formContainerStyles } from '../styles/authStyles';
import { loginUser } from '../authService';
import useSnackbar from '../useSnackbar';
import FeedbackSnackbar from './FeedbackSnackbar';
import { isIsolationMode } from '../bootstrap';
const LoginForm = () => {

    const theme = useTheme()
    const [formData, setFormData] = useState({
        email: 'jenny.smith@test.com',
        password: 'user_pass',
    });

    const { showSnackbar, closeSnackbar, isError, message, snackbarOpen } = useSnackbar();


    const handleInputChange = (event) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }));

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await loginUser({
                email: formData.email,
                password: formData.password,
            });

            if (isIsolationMode) showSnackbar({ message: 'Login successful', isError: false });



        } catch (error) {
            showSnackbar({ message: error.message, isError: true })
        }
    };


    return (

        <Box sx={formContainerStyles}>
            <LockOpenIcon sx={{
                fontSize: 90,
                color: theme.palette.gray.light,
                position: 'absolute',
                top: theme.spacing(2),
                right: theme.spacing(0)
            }} variant='filled' />
            <form onSubmit={handleSubmit} >
                <Box mt={2} display="flex" justifyContent="flext-start" sx={{ width: '100%' }}>
                    <Typography variant='h4'>Account credentials</Typography>
                </Box>
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    margin="normal"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <Box mt={2} display="flex" justifyContent="flext-start" sx={{ width: '100%' }}>
                    <Button variant="contained" color="primary" type="submit">
                        Login
                    </Button>
                </Box>
            </form>
            <FeedbackSnackbar
                open={snackbarOpen}
                onClose={closeSnackbar}
                message={message}
                isError={isError}
            />
        </Box>
    )
}

export default LoginForm