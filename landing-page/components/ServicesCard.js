import React, { useState, useEffect } from 'react';
import { Typography, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';

const RemoteButton = dynamic(() => import('theme/ReactButton'), {
    ssr: false,
});

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
            <p style={paragraphStyle}>Loreim kdadnaskndasnd</p>
            <p style={blueStyle}>Loreim kdadnaskndasnd</p>
            <Typography color="primary" variant="h1">Hi from ladning </Typography>
        </>
    );
};

export default ServicesCard;
