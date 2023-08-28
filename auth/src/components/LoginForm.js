import { Box, TextField, Typography, Button, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { formStyles } from '../styles/authStyles'
import LockOpenIcon from '@mui/icons-material/LockOpen';
const LoginForm = () => {

    const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

    const classes = formStyles()
    const theme = useTheme()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }));

    };


    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: validate form data
        // if (validateFormData()) {
        //     // Submit the form data to Keycloak for user registration
        // }
        // Store the JWT token in the localStorage
        localStorage.setItem('jwtToken', fakeToken);

        // Dispatch a custom event to notify other microfrontends
        window.dispatchEvent(new CustomEvent('jwtReceived', { detail: fakeToken }));
    };

    return (

        <Box className={classes.formContainer}>
            <LockOpenIcon className={classes.lockIcon} style={{ fontSize: 90, color: theme.palette.gray.light }} variant='filled' />
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
        </Box>
    )
}

export default LoginForm