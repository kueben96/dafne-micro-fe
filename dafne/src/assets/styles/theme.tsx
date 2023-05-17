import { PaletteColorOptions, PaletteOptions, Theme, ThemeOptions, createTheme } from '@mui/material'
// https://xiaominzhu.medium.com/mui-v5-theming-and-styled-utility-react-typescript-c1227cf12918
declare module '@mui/material/styles' {
    interface PaletteColorOptions {
        main: string;
        light?: string;
        lighter?: string;
        dark?: string;
        contrastText?: string;
    }
     interface PaletteOptions  {
        gray?: PaletteColorOptions;
    }
    interface Theme {
        layout?: {
            drawerWidth?: number;
        };
        palette: PaletteOptions;
    }
    interface CustomThemeOptions extends ThemeOptions {
        layout?: {
            drawerWidth?: number;
        },
        palette: PaletteOptions;
        
    }
    export function createTheme(options?: CustomThemeOptions): Theme;
}

const customTheme = createTheme({
    typography: {
        fontSize: 13,
        h1: {
            fontSize: '2.5rem',
        },
        h2: {
            fontSize: '2rem',
        },
        h3: {
            fontSize: '1.5rem',
        },
        h4: {
            fontSize: '1.3rem',
        },
        subtitle1: {
            fontSize: 12,
            color: '#656565'
        },
        subtitle2: {
            fontSize: 10,
            color: '#656565'
        },
        body1: {
            fontSize: 12,
        }

    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#EDEDED',
                },
            },
        },

        MuiTypography: {

            defaultProps: {
                variantMapping: {
                    h1: 'h2',
                    h2: 'h2',
                }
            },
        },
        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    '&.MuiButton-contained': {
                        color: theme.palette?.common?.white,
                    },
                }),
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    color: '#1D201F',
                    backgroundColor: "#fff",
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#6CC1B5',
            dark: '#3C9085',
            light: '#A9DBD4',
            lighter: '#E2F3F1'
        },
        secondary: {
            main: '#E08542',
            dark: '#C2631E',
            light: '#E9A372',
            lighter: '#F1CBB0'
        },
        common: {
            black: '#1D201F',
            white: '#FFFFFF',
        },
        gray: {
            main: '#656565',
            light: '#B9B9B9',
            lighter: '#EDEDED'
        },
        error: {
            main: '#FF4D4F'
        },
        success: {
            main: '#52C41A'
        },
    },
    layout: {
        drawerWidth: 240,
    },
}) as ThemeOptions;

export { customTheme };