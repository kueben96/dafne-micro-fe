import { Box } from '@mui/material';
import { makeStyles, styled } from '@mui/styles'

export const pageHeaderStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#fff",
        boxShadow: 'none',
        paddingTop: theme.spacing(2)
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

export const drawerStyles = makeStyles((theme) => ({
    drawer: {
        width: theme.layout.drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: theme.layout.drawerWidth,
        marginTop: theme.mixins.toolbar.minHeight,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export const ContentPaper = styled(Box)(({ theme }) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2, 0),
    background: theme.palette.neutral.white,
}));



export const SizedBoxVertical = styled(Box)(({ theme, space }) => ({
    marginBottom: theme.spacing(space),
}));
export const SizedBoxHorizontal = styled(Box)(({ theme, space }) => ({
    marginRight: theme.spacing(space),
}));


