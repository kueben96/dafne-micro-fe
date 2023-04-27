import { Box, useTheme } from '@mui/material';
import React from 'react'

const ProcessStatus = (props) => {
    const theme = useTheme()
    let color = '';
    let label = '';
    switch (props.status) {
        case 'Completed':
            color = theme.palette.success.main
            label = 'Completed'
            break;
        case 'Running':
            color = theme.palette.primary.main;
            label = 'Running';
            break;
        case 'Error':
            color = theme.palette.error.main;
            label = 'Error';
            break;
        case 'Paused':
            color = theme.palette.grey.light;
            label = 'Paused';
            break;
        default:
            color = 'default';
            label = props.status;
            break;
    }
    return (
        <Box display="flex" alignItems="center">
            <Box
                sx={{
                    borderRadius: '50%',
                    backgroundColor: color,
                    height: '7px',
                    width: '7px',
                    marginRight: '10px',
                }}
            ></Box>
            {label}
        </Box>
    );
};

export default ProcessStatus