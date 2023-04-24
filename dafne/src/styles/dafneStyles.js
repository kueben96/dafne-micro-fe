import { makeStyles } from '@mui/styles'

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
