import { Box, Button } from '@mui/material';
import { makeStyles, styled } from '@mui/styles'

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


export const SizedBoxVertical = styled(Box)(({ theme, space }) => ({
    marginBottom: theme.spacing(space),
}));
export const SizedBoxHorizontal = styled(Box)(({ theme, space }) => ({
    marginRight: theme.spacing(space),
}));


