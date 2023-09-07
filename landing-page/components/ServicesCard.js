import React, { useState, useEffect } from 'react';
import { Typography, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';

const ServicesCard = () => {
    const theme = useTheme();


    const paragraphStyle = {
        color: theme.palette.secondary.main
    };
    const blueStyle = {
        color: theme.palette.primary.main
    };

    return (
        <>
            <Typography variant="h2">NextJS Component Heading </Typography>
            <Typography style={paragraphStyle}>Loreim kdadnaskndasnd</Typography>
            <Typography style={blueStyle}>Loreim kdadnaskndasnd</Typography>

        </>
    );
};

export default ServicesCard;
