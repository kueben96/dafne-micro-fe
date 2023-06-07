import { Box, Container } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { Theme } from '@mui/material/styles';

export const pageHeaderStyles = makeStyles((theme: Theme) => ({
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

export const drawerStyles = makeStyles((theme: Theme) => ({
    drawer: {
        width: theme.layout?.drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: theme.layout?.drawerWidth,
        marginTop: theme.mixins.toolbar.minHeight,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export const ContentPaper = styled(Box)(({ theme }: { theme: Theme }) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2, 0),
    background: theme.palette?.common?.white,
}));
export const ContentBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    margin: theme.spacing(2),

}));

export const SizedBoxVertical = styled(Box)(({ theme, space = 2 }: { theme: Theme, space?: number }) => ({
    marginBottom: theme.spacing(space),
}));

export const SizedBoxHorizontal = styled(Box)(({ theme, space }: { theme: Theme, space: number }) => ({
    marginRight: theme.spacing(space),
}));
