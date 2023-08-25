'use client'
import { createTheme } from '@mui/material';
import React, { createContext, useState, useEffect } from 'react'
const PaletteContext = createContext(null);

console.log("in context")

const _createTheme = async () => {
    try {
        const sharedPalette = await import('theme/palette');
        const palette = sharedPalette.default;

        const customTheme = createTheme({
            palette: palette ?? {
                primary: {
                    dark: '#3C9085',
                    main: '#6CC1B5',
                },
            },
        });
        return { theme: customTheme, palette };
    } catch (error) {
        console.error('Error loading shared palette', error);
        return { theme: null, palette: null };
    }
};


const PaletteProvider = ({ children }) => {

    const [palette, setPalette] = useState();
    const [theme, setTheme] = useState();

    React.useEffect(() => {
        const fetchTheme = async () => {
            const { theme, palette } = await _createTheme();
            setTheme(theme);
            setPalette(palette);
        };

        fetchTheme();
    }, []);

    const value = { palette, theme }

    return (
        <PaletteContext.Provider value={value}>
            {children}
        </PaletteContext.Provider>
    )
}

const usePalette = () => {
    return React.useContext(PaletteContext);
};

export { PaletteProvider, PaletteContext, usePalette }