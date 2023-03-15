import { theme } from '../styles/theme';
import { makeStyles } from '@mui/styles'
import { styled, Toolbar } from '@mui/material'

export const formStyles = makeStyles((theme) => ({
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '60%',
        },
        margin: '0 auto',
        alignItems: 'center',
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