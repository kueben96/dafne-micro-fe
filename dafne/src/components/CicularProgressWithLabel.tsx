import { Box, CircularProgress, CircularProgressProps, Typography, useTheme } from "@mui/material";
import React from 'react'
export function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    const theme = useTheme();
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress sx={{ color: theme.palette.primary?.dark }} variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="body1"
                    component="div"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}
