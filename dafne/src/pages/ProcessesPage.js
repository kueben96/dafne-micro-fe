import { AppBar, Badge, Box, Button, Container, IconButton, InputBase, Typography, styled } from '@mui/material'

import React, { useState } from 'react'
import PageHeader from '../components/PageHeader';
import { useTheme } from '@emotion/react';
import TableToolBar from '../components/TableToolBar';
import { SizedBoxVertical } from '../styles/dafneStyles';
import ProcessesTable from '../components/ProcessesTable';


const ContentPaper = styled(Box)(({ theme }) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2, 0),
    background: theme.palette.neutral.white,
}));




const ProcessesPage = (props) => {


    const theme = useTheme()

    return (
        <>
            <PageHeader title="Dashboard" />
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