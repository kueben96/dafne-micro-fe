import { Box, TextField, Typography, Button, useTheme } from '@mui/material';
import React, { useState } from 'react'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { formContainerStyles } from '../styles/authStyles';
import { useEffect } from 'react';
const LoginForm = () => {

    useEffect(() => {
        // fetch('https://jsonplaceholder.typicode.com/todos/1')
        //     .then(response => response.json())
        //     .then(json => console.log(json))
        fetch('http://localhost:8086/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "http://localhost:8086"
            },
            body: JSON.stringify({
                user: "user",
                user_pass: "user_pass",
            }),
        })
            .then(response => console.log(response))
    }, []); // The empty dependency array means this effect runs once, like componentDidMount

    const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

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
        // handleLogin().then(response => console.log(response.json()))
        // TODO: validate form data
        // if (validateFormData()) {
        //     // Submit the form data to Keycloak for user registration
        // }
        // Store the JWT token in the localStorage
        localStorage.setItem('jwtToken', fakeToken);

        // Dispatch a custom event to notify other microfrontends
        window.dispatchEvent(new CustomEvent('jwtReceived', { detail: fakeToken }));

    };

    // // create async function for handle login 
    // const handleLogin = async () => {
    //     const response = await fetch('http://localhost:8086/api/login', {
    //         method: 'POST',
    //         mode: 'no-cors', // no-cors, *cors, same-origin
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             "Access-Control-Allow-Origin": "*"
    //         },
    //         body: JSON.stringify({
    //             user: "user",
    //             user_pass: "user_pass",
    //         }),
    //     })
    //     return response
    // }




    // useEffect(() => {
    //     fetch('http://localhost:8086/api/login', {
    //         method: 'POST',
    //         mode: 'no-cors', // no-cors, *cors, same-origin
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             "Access-Control-Allow-Origin": "*"
    //         },
    //         body: JSON.stringify({
    //             user: "user",
    //             user_pass: "user_pass",
    //         }),
    //     }).then(response => console.log(response.json()))
    // }, [])

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
        </Box>
    )
}

export default LoginForm