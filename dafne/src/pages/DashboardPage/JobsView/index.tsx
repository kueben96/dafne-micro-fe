import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import TableToolBar from '../../../components/TableToolBar';
import { ContentPaper, SizedBoxVertical, StyledLink } from '../../../assets/theme/dafneStyles';
import JobsTable from '../../../components/JobsTable';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { JobsRowData, IJob } from '../../../types';
import JobStatus from '../../../components/ProcessStatus';
import { JobState } from '../../../types/enums';
import { useSelector } from 'react-redux';
import { selectJobs } from '../../../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';

interface JobsViewProps {
    userJobs?: IJob[];
}

const JobsColumns = (navigate: (url: string) => void): GridColDef<JobsRowData>[] => [
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
        },
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
        renderCell: (params: GridCellParams) => {
            const { id } = params;
            return (
                <>
                    <StyledLink underline="none" href="#">
                        Delete
                    </StyledLink>
                    <StyledLink
                        underline="none"
                        href="#"
                        onClick={() => {
                            console.log(id)
                            navigate(`/dashboard/jobs/${id}`);
                        }}
                    >
                        Details
                    </StyledLink>
                </>
            );
        },
    },
];

const JobsView: React.FC<JobsViewProps> = () => {
    const userJobsArray: IJob[] = useSelector(selectJobs) ?? [];
    const [selectedFilter, setSelectedFilter] = useState('all');

    const JobsRows: JobsRowData[] = userJobsArray.map(job => {
        const { jobId, createdAt, instruction, status, type } = job;
        const metric = instruction.metrics.map(metric => metric.metric).join(', ');
        const model = instruction.model.weightsPath
            ? instruction.model.identifier + ',' + instruction.model.weightsPath
            : instruction.model.identifier;
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

    const navigate = useNavigate();
    const filterJobs = (filter: string) => {
        if (filter === JobState.All) {
            return JobsRows;
        }
        return JobsRows.filter(job => job.status === filter);
    };

    const filteredJobs = filterJobs(selectedFilter);
    return (
        <>
            <ContentPaper>
                <Container>
                    <Box display="flex" flexDirection="column">
                        <TableToolBar handleFilterJobs={setSelectedFilter} selectedFilter={selectedFilter} />
                        <SizedBoxVertical space={2} />
                        <JobsTable
                            columns={JobsColumns(navigate)}
                            rows={filteredJobs}
                            tableType={'jobs'}
                        />
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
};

export default JobsView;
