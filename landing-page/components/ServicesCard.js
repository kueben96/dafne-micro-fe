import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import dynamic from 'next/dynamic';

const RemoteButton = dynamic(() => import('theme/ReactButton'), {
    ssr: false,
});

const ServicesCard = () => {
    const theme = useTheme();
    const [themeLoaded, setThemeLoaded] = useState(false);

    useEffect(() => {
        // Check if the theme.palette.secondary.main is available
        if (theme?.palette.secondary.main) {
            setThemeLoaded(true);
        }
    }, [theme]);

    const paragraphStyle = {
        color: theme.palette.secondary.main
    };

    return (
        <p style={paragraphStyle}>Loreim kdadnaskndasnd</p>
    );
};

export default ServicesCard;
