import { createTheme } from '@mui/material'

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
        subtitle1: {
            fontSize: 12,
            color: '#656565'
        },
        subtitle2: {
            fontSize: 10,
            color: '#656565'
        },
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
                    subtitle1: 'h2',
                    subtitle2: 'h3'
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
        type: 'light',
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
        neutral: {
            black: '#1D201F',
            white: '#FFFFFF',
        },
        grey: {
            regular: '#656565',
            light: '#B9B9B9',
            lighter: '#EDEDED'
        }
    },
    layout: {
        drawerWidth: 240,
    }
})