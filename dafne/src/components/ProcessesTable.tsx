import React from 'react';
import { DataGrid, GridCellParams, GridColDef, GridRowsProp, GridRowsState, GridSlotsComponent, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, Link, Theme, Typography, styled, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { EmptyRowsImage } from '../assets/images';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: 400,
        width: '100%',
        '& .cell': {
            textAlign: 'center',
        },
    },
    columnHeaders: {
        background: theme.palette.gray?.lighter,
    },
}));

const CustomNoRowsOverlay = () => {
    const theme = useTheme()
    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }} className="empty-rows" >
            <img style={{ maxWidth: '100%', maxHeight: '100%', }} src={EmptyRowsImage} alt="empty rows" />
            <Typography variant='subtitle1' sx={{ padding: theme.spacing(1) }}>No data generation processes started yet</Typography>
            <Button variant='contained' color='secondary' >Generate your first dataset</Button>
        </Box>
    )
}

interface ProcessesTableProps {
    columns: GridColDef[];
    rows?: GridRowsProp;
}


const ProcessesTable: React.FC<ProcessesTableProps> = ({ rows, columns }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <DataGrid
                rows={rows ?? []}
                columns={columns}
                slots={{
                    noRowsOverlay: CustomNoRowsOverlay,
                }}
                classes={{ columnHeaders: classes.columnHeaders }}
            />
        </Box>
    );
};

export default ProcessesTable;
