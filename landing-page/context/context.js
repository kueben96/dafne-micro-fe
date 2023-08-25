'use client'
import { createTheme } from '@mui/material';
import React, { createContext, useState } from 'react'
const PaletteContext = createContext(null);

const _createTheme = () => {
    var palette;
    var theme;
    import('theme/palette')
        .then((sharedPalette) => {
            palette = sharedPalette.default;
            const customTheme = createTheme({
                palette: palette ??
                {
                    primary: {
                        dark: '#3C9085',
                        main: '#6CC1B5',
                    }
                }
            });
            theme = customTheme;
            console.log(theme)
        })
        .catch((error) => {
            console.error('Error loading shared palette', error);
        });
    return { theme, palette };
};


const PaletteProvider = ({ children }) => {
    const [palette, setPalette] = useState();
    const [theme, setTheme] = useState();

    React.useEffect(() => {
        const theme = _createTheme();
        setTheme(theme.theme);
        setPalette(theme.palette);
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