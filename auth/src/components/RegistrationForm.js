import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

const RegistrationForm = () => {
    return (
        <form>
            <TextField fullWidth label="First Name" margin="normal" />
            <TextField fullWidth label="Last Name" margin="normal" />
            <TextField fullWidth label="Email" margin="normal" type="email" />
            <TextField fullWidth label="Password" margin="normal" type="password" />
            <TextField fullWidth label="Repeat Password" margin="normal" type="password" />
            <FormControl fullWidth margin="normal">
                <InputLabel>Job Title</InputLabel>
                <Select label="Job Title">
                    <MenuItem value="developer">Developer</MenuItem>
                    <MenuItem value="designer">Designer</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" fullWidth color="primary" type="submit">
                Register
            </Button>
        </form>
    )
}

export default RegistrationForm