import { Box, Container, Typography } from '@mui/material'

import React, { useState } from 'react'
import PageHeaderDashboard from '../components/PageHeaderDashboard';
import { useTheme } from '@emotion/react';
import TableToolBar from '../components/TableToolBar';
import { ContentPaper, SizedBoxVertical } from '../styles/dafneStyles';
import ProcessesTable from '../components/ProcessesTable';

const ProcessesPage = () => {


    const theme = useTheme()

    return (
        <>
            <PageHeaderDashboard title="Dashboard" />
            <ContentPaper>
                <Container>
                    <Box display="flex" flexDirection="column">
                        <TableToolBar />
                        <SizedBoxVertical space={2} />
                        <ProcessesTable />
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

export default ProcessesPage