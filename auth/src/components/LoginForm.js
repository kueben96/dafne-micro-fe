import { Box, TextField, Typography, Button } from '@mui/material';
import React, { useState } from 'react'
import { formStyles } from '../styles/authStyles'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { grey, red } from '@mui/material/colors';
const LoginForm = () => {
    const classes = formStyles()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }));
        console.log(formData)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateFormData()) {
            // Submit the form data to Keycloak for user registration
            console.log(formData);
        }
    };

    return (

        <Box className={classes.formContainer}>
            <LockOpenIcon style={{ fontSize: 90, }} color='primary' variant='filled' />
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