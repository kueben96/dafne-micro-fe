import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, Link, Typography, styled, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles'
import EmptyRowsImage from '../assets/images/empty-image.png';
import ProcessStatus from './ProcessStatus';


const columns = [
    {
        field: 'id',
        headerName: 'Process ID',
        flex: 1,
        headerClassName: 'header-cell',
    },
    {
        field: 'service',
        headerName: 'Service',
        flex: 1,
        headerClassName: 'header-cell',
    },
    {
        field: 'metric',
        headerName: 'Metric',
        flex: 1,
        headerClassName: 'header-cell',
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,

        headerClassName: 'header-cell',
        renderCell: (params) => {
            const { value } = params;
            return <ProcessStatus status={value} />;
        }
    },
    {
        field: 'score',
        headerName: 'Score',
        description: 'Shows the performance of the process',
        type: 'number',
        flex: 0.5,
        headerClassName: 'header-cell',
    },
    {
        field: 'dateCreated',
        headerName: 'Created',
        type: 'date',
        flex: 1,
        headerClassName: 'header-cell',
    },
    {
        field: 'actions',
        headerName: 'Action',
        flex: 1,
        headerClassName: 'header-cell',
        renderCell: (params) => (
            <>
                <StyledLink underline="none" href="#">Delete</StyledLink>
                <StyledLink underline="none" href="#">Details</StyledLink>
            </>
        ),

    },
];

const rows = [
    { id: "ahdskessi23ns", service: 'Reproduction', metric: 'ML Taks', status: 'Completed', score: 0.96, dateCreated: new Date('2022-04-01') },
    { id: "dserw2343244", service: 'Reproduction', metric: 'ML Taks', status: 'Error', score: 0.96, dateCreated: new Date('2022-04-01') },
    { id: "02377832hjsad", service: 'Reproduction', metric: 'ML Taks', status: 'Running', score: 0.96, dateCreated: new Date('2022-04-01') },
    { id: "9023903khs", service: 'Reproduction', metric: 'ML Taks', status: 'Paused', score: 0.96, dateCreated: new Date('2022-04-01') },
];

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
}));



const useStyles = makeStyles((theme) => ({
    root: {
        height: 400,
        width: '100%',
        '& .cell': {
            textAlign: 'center',
        },
    },
    columnHeaders: {
        background: theme.palette.grey['100'],
    },
}));

const CustomNoRowsOverlay = () => {
    const theme = useTheme()
    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }} className="empty-rows" >
            <img sx={{ maxWidth: '100%', maxHeight: '100%', }} src={EmptyRowsImage} alt="empty rows" />
            <Typography variant='subtitle1' sx={{ padding: theme.spacing(1) }}>No data generation processes started yet</Typography>
            <Button variant='contained' color='secondary' >Generate your first dataset</Button>
        </Box>
    )
}

const ProcessesTable = () => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <DataGrid
                rows={rows}
                columns={columns}

                className={classes.grid}
                components={{
                    Toolbar: GridToolbar,
                    Header: (props) => (
                        <div className="cell header-cell">
                            <span>{props.column.headerName}</span>
                        </div>
                    ),
                }}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                slots={{
                    noRowsOverlay: CustomNoRowsOverlay,
                }}
                classes={{ columnHeaders: classes.columnHeaders }}

            />
        </Box>
    );
};

export default ProcessesTable;
