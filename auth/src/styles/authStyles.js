import { theme } from '../styles/theme';
import { makeStyles } from '@mui/styles'
import { styled, Toolbar, Paper, Typography, Button } from '@mui/material'

export const formStyles = makeStyles((theme) => ({
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '70%',
        },
        margin: '0 auto',
        alignItems: 'center',
        position: 'relative',

    },
    lockIcon: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(0),
    }
}))

export const CustomToolbar = styled(Toolbar)({
    height: 130,
    marginLeft: 130,
});

export const Logo = styled('img')({
    width: 180, // Set the width of the logo as per your requirement
    cursor: 'pointer',
});

export const LeftContainer = styled(Paper)(({ theme }) => ({
    height: '100%',
    width: '100%',
    background: `linear-gradient(120deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} , ${theme.palette.neutral.white})`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: theme.spacing(25),
}));

export const RightContainer = styled(Paper)({
    height: '100%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
});

export const Header = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.white,
}));

export const Subline = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.subtitle1.fontSize,
    color: theme.palette.neutral.white,
    marginTop: theme.spacing(5),
}));

export const LoginButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(5),
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
}));
