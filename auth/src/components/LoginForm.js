import { Box, TextField, Typography, Button, useTheme, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { formContainerStyles } from '../styles/authStyles';
import { loginUser } from '../authService';
const LoginForm = () => {

    const theme = useTheme()
    const [formData, setFormData] = useState({
        email: 'user',
        password: 'user_pass',
    });
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const handleInputChange = (event) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }));

    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = await loginUser({
                email: formData.email,
                password: formData.password,
            });

            // Store the JWT token in the localStorage
            localStorage.setItem('jwtToken', token);

            // Dispatch a custom event to notify other microfrontends
            window.dispatchEvent(new CustomEvent('jwtReceived', { detail: token }));
        } catch (error) {
            setError(error.message);
            setSnackbarOpen(true);
            //showSnackBar(error={error.message} severity="error")
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
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={snackbarOpen}
                autoHideDuration={5000}
                color='secondary'
            >
                <Alert color='secondary' onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default LoginForm