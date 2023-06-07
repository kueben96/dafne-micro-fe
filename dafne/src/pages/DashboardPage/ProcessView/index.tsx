import { Box, Container, Link, Typography, styled } from '@mui/material'

import React from 'react'
import TableToolBar from '../../../components/TableToolBar';
import { ContentPaper, SizedBoxVertical } from '../../../assets/theme/dafneStyles';
import ProcessesTable from '../../../components/ProcessesTable';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import ProcessStatus from '../../../components/ProcessStatus';

interface ProcessesRowData {
    id: string;
    service: string;
    metric: string;
    status: string;
    score: number;
    dateCreated: Date;
}
const processesColumns: GridColDef<ProcessesRowData>[] = [
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
        renderCell: (params: GridCellParams) => {
            const { value } = params;
            return <ProcessStatus status={value as string} />;
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
        renderCell: () => (
            <>
                <StyledLink underline="none" href="#">Delete</StyledLink>
                <StyledLink underline="none" href="#">Details</StyledLink>
            </>
        ),

    },
];

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary?.main,
    marginRight: theme.spacing(2),
}));


const processesRows: ProcessesRowData[] = [
    { id: "ahdskessi23ns", service: 'Reproduction', metric: 'ML Taks', status: 'Completed', score: 0.96, dateCreated: new Date('2022-04-01') },
    { id: "dserw2343244", service: 'Reproduction', metric: 'ML Taks', status: 'Error', score: 0.96, dateCreated: new Date('2022-04-01') },
    { id: "02377832hjsad", service: 'Reproduction', metric: 'ML Taks', status: 'Running', score: 0.96, dateCreated: new Date('2022-04-01') },
    { id: "9023903khs", service: 'Reproduction', metric: 'ML Taks', status: 'Paused', score: 0.96, dateCreated: new Date('2022-04-01') },
];


const ProcessesView = () => {

    return (
        <>
            <ContentPaper>
                <Container>
                    <Box display="flex" flexDirection="column">
                        <TableToolBar />
                        <SizedBoxVertical space={2} />
                        <ProcessesTable columns={processesColumns} rows={processesRows} />
                    </Box>
                </Container>
            </ContentPaper>
            <ContentPaper>
                <Container>
                    <Box>
                        <Typography variant="h3">Quicklinks</Typography>
                    </Box>
                </Container>
            </ContentPaper>
        </>
    )
}

export default ProcessesView