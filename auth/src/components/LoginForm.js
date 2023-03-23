import { Box, TextField, Typography, Button } from '@mui/material';
import React, { useState } from 'react'
import { formStyles } from '../styles/authStyles'
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
            <form onSubmit={handleSubmit} >
                <Box mt={2} display="flex" justifyContent="flext-start" sx={{ width: '100%' }}>
                    <Typography variant='h4'>Personal Data</Typography>
                </Box>
                <TextField
                    fullWidth
                    label="First Name"
                    margin="normal"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    margin="normal"
                    name="lastName"
                    value={formData.lastName}

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