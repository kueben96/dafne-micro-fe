import { Box, Container, Typography } from '@mui/material'

import React from 'react'
import TableToolBar from '../../../components/TableToolBar';
import { ContentPaper, SizedBoxVertical } from '../../../assets/theme/dafneStyles';
import ProcessesTable from '../../../components/ProcessesTable';

const ProcessesView = () => {

    return (
        <>
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

export default ProcessesView