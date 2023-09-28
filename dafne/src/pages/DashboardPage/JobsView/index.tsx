import React from 'react';
import { Box, Container, Link, Typography, styled } from '@mui/material'
import TableToolBar from '../../../components/TableToolBar';
import { ContentPaper, SizedBoxVertical } from '../../../assets/theme/dafneStyles';
import JobsTable from '../../../components/JobsTable';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { JobsRowData, IJob } from '../../../types';
import JobStatus from '../../../components/ProcessStatus';
import { JobState } from '../../../types/enums';

interface JobsViewProps {
    userJobs: IJob[];
}

const JobsColumns: GridColDef<JobsRowData>[] = [
    {
        field: 'id',
        headerName: 'Job ID',
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
        field: 'model',
        headerName: 'Model',
        flex: 1,
        headerClassName: 'header-cell',
    },
    {
        field: 'metric',
        headerName: 'Metrics',
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
            return <JobStatus status={value as JobState} />;
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

const JobsView: React.FC<JobsViewProps> = ({ userJobs }) => {

    const JobsRows: JobsRowData[] = userJobs.map(job => {
        const { jobId, createdAt, instruction, status, type } = job;
        const metric = instruction.metrics.map(metric => metric.metric).join(', ');
        const model = instruction.name;
        const score = 0.98;
        const dateCreated = new Date(createdAt);
        return {
            id: jobId,
            service: type,
            model: model,
            metric: metric,
            status,
            score,
            dateCreated,
        };
    });

    return (
        <>
            <ContentPaper>
                <Container>
                    <Box display="flex" flexDirection="column">
                        <TableToolBar />
                        <SizedBoxVertical space={2} />
                        <JobsTable columns={JobsColumns} rows={JobsRows} tableType={'jobs'} />
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
    );
}

export default JobsView;
