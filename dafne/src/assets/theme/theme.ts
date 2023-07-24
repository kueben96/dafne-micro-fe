import { ThemeOptions, createTheme } from '@mui/material'
import palette from './palette';

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
        h5: {
            fontSize: '1.1rem',
        },
        h6: {
            fontSize: '1.0rem',
        },
        subtitle1: {
            fontSize: 13,
            color: '#656565'
        },
        subtitle2: {
            fontSize: 10,
            color: '#656565'
        },
        body1: {
            fontSize: 12,
        },
        body2: {
            fontSize: 11,
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
    palette: palette,
    layout: {
        drawerWidth: 240,
    },
}) as ThemeOptions;

export { customTheme };