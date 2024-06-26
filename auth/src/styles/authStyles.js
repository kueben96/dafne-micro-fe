import { styled, Toolbar, Paper, Typography, Button } from '@mui/material'


export const formContainerStyles = (theme) => ({
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
});
export const CustomToolbar = styled(Toolbar)({
    height: 130,
    marginLeft: 130,
});

export const Logo = styled('img')({
    width: 180,
    cursor: 'pointer',
});

export const LeftContainer = styled(Paper)(({ theme }) => ({
    height: '100%',
    flex: '0 1 auto',
    background: `linear-gradient(120deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} , ${theme.palette.common.white})`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: theme.spacing(25),
}));

export const RightContainer = styled(Paper)({
    height: '100%',
    flex: '1 0 auto',
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
    color: theme.palette.common.white,
    marginTop: theme.spacing(5),
}));

export const ButtonDaFne = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(5),
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
}));
