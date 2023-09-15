import { Box, Drawer, AppBar } from '@mui/material';
import { styled } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

export const PageHeaderAppBar = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    paddingTop: theme.spacing(2),
    '& .MuiToolbar-root': {
        display: "flex",
        justifyContent: "space-between",
    }
}));

export const DrawerCustom = styled(Drawer)(({ theme }: { theme: Theme }) => ({
    width: theme.layout?.drawerWidth,
    flexShrink: 0,
    '.drawer-paper': {
        width: theme.layout?.drawerWidth,
        marginTop: theme.mixins.toolbar.minHeight,
    }
}));

export const ContentPaper = styled(Box)(({ theme }: { theme: Theme }) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2, 0),
    background: theme.palette?.common?.white,
}));
export const ContentBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    margin: theme.spacing(2),

}));

export const SizedBoxVertical = styled(Box)<{
    space?: number;
}>(({ theme, space = 2 }) => ({
    marginBottom: theme.spacing(space),
}));
export const SizedBoxHorizontal = styled(Box)<{
    space?: number;
}>(({ theme, space = 2 }) => ({
    marginRight: theme.spacing(space),
}));


// Jobs Table 

export const TableCustomBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    height: 400,
    width: '100%',
    '& .cell': {
        textAlign: 'center',
    },
    '& .column-headers': {
        background: theme.palette.gray?.lighter,
    },
}));

export const CustomDataGrid = styled(DataGrid)(({ theme }: { theme: Theme }) => ({
    '& .column-headers': {
        background: theme.palette.gray?.lighter,
    },
}));

