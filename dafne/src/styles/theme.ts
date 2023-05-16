import { Palette, PaletteColorOptions, createTheme } from '@mui/material'
import { FontStyleOptions, Variant, TypographyOptions } from '@mui/material/styles/createTypography'
import { CSSProperties } from '@mui/styles'

declare module '@mui/material/styles' {
    interface SimplePaletteColorOptions {
        lighter?: string,
        regular?: string,
    }
    interface PaletteOptions {
        gray?: PaletteColorOptions,
    }
    interface ThemeOptions {
        layout?: {
            drawerWidth?: number;
        };
    }
}
export const theme = createTheme({
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
                        color: theme.palette.common.white,
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
})