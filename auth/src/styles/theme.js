import { createTheme } from '@mui/material'

export const theme = createTheme({
    components: {
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
                    color: theme.palette.primary,
                    '&.MuiButton-containedPrimary': {
                        color: theme.palette.common.white,
                    },
                }),
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                }
            }
        }
    },
    palette: {
        type: 'light',
        primary: {
            dark: '#3C9085',
            main: '#6CC1B5',
            light: '#A9DBD4',
            lighter: '#E2F3F1'
        },
        secondary: {
            dark: '#C2631E',
            main: '#E08542',
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
})