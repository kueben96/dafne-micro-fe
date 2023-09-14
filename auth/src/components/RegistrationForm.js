import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, styled, TextField, Typography, Snackbar, Alert } from '@mui/material'
import React, { useState } from 'react'
import { formContainerStyles } from '../styles/authStyles';
import { registerUser } from '../authService';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: 'Jenny',
        lastName: 'Smith',
        email: 'jenny.smith@test.com',
        password: '',
        repeatPassword: '',
        jobTitle: 'Scientist',
        industry: 'Research',
        agreedToTerms: false,
    });

    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const industryOptions = ['Urban Planning', 'Urban Design', 'Data Science', 'Consulting', 'Software Development', 'Research']

    const [formErrors, setFormErrors] = useState({});

    const validateFormData = () => {
        const errors = {};

        if (!formData.firstName.trim()) {
            errors.firstName = 'First Name is required';
        }

        if (!formData.lastName.trim()) {
            errors.lastName = 'Last Name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Invalid email address';
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        } else if (formData.password !== formData.repeatPassword) {
            errors.repeatPassword = 'Passwords do not match';
        }
        if (!formData.agreedToTerms) {
            errors.agreedToTerms = 'You must agree to the terms and conditions';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const handleInputChange = (event) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }));
        if (event.target.name === 'agreedToTerms') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [event.target.name]: event.target.checked,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)
        if (validateFormData()) {
            // Submit the form data to Keycloak for user registration

            try {
                const token = await registerUser(
                    {
                        email: formData.email,
                        firstName: formData.firstName,
                        industry: formData.industry,
                        jobTitle: formData.jobTitle,
                        lastName: formData.lastName,
                    }
                );
                localStorage.setItem('jwtToken', token);
                // Dispatch a custom event to notify other microfrontends
                window.dispatchEvent(new CustomEvent('jwtReceived', { detail: token }));
            } catch (error) {
                setError(error.message);
                setSnackbarOpen(true);
            }
            console.log(formData)
        }
    };

    return (

        <Box sx={formContainerStyles}>
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
                    error={formErrors.firstName}
                    helperText={formErrors.firstName}
                    required
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    margin="normal"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={formErrors.lastName}
                    helperText={formErrors.lastName}
                    required
                />
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={formErrors.email}
                    helperText={formErrors.email}
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    margin="normal"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={formErrors.password}
                    helperText={formErrors.password}
                    required
                />
                <TextField
                    fullWidth
                    label="Repeat Password"
                    margin="normal"
                    type="password"
                    name="repeatPassword"
                    value={formData.repeatPassword}
                    onChange={handleInputChange}
                    error={formErrors.repeatPassword}
                    helperText={formErrors.repeatPassword}
                    required
                />
                <TextField
                    fullWidth
                    label="Job Title"
                    margin="normal"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    error={formErrors.jobTitle}
                    helperText={formErrors.jobTitle}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Industry</InputLabel>
                    <Select label="Industry" name="industry" value={formData.industry} onChange={handleInputChange}>
                        {industryOptions.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText error={formErrors.industry}>{formErrors.industry}</FormHelperText>
                </FormControl>
                <FormControl fullWidth margin="normal" error={!!formErrors.agreedToTerms}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.agreedToTerms}
                                onChange={handleInputChange}
                                name="agreedToTerms"
                                color="primary"
                            />
                        }
                        label="I agree to the terms and conditions"
                    />
                    {!!formErrors.agreedToTerms && (
                        <FormHelperText>{formErrors.agreedToTerms}</FormHelperText>
                    )}
                </FormControl>

                <Box mt={2} display="flex" justifyContent="flext-start" sx={{ width: '100%' }}>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
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

export default RegistrationForm