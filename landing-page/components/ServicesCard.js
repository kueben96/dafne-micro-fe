import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
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
        </>
    );
};

export default ServicesCard;
