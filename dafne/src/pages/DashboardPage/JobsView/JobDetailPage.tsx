import React from 'react'
import PageHeader, { HeaderEditable } from '../../../components/PageHeader'
import JobDetail from '../../ReproductionPage/JobDetail'
import { useParams } from 'react-router-dom'
import { PageHeaderAppBar, SizedBoxHorizontal } from '../../../assets/theme/dafneStyles'
import { Box, Container, Toolbar, Typography, useTheme } from '@mui/material'
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs'
import ProcessStatus from '../../../components/ProcessStatus'
import { JobState } from '../../../types/enums'
import { useGetJobStatusByIdQuery } from '../../../redux/apiGatewaySlice'

const JobDetailPage = () => {
    const { id } = useParams<{ id: string }>()
    const title = id ? `${id}` : 'userxyz_12345';
    const theme = useTheme();
    const { data: jobStatus, isLoading, error } = useGetJobStatusByIdQuery("userxyz_12345")


    return (
        <>
            <PageHeaderAppBar sx={{ paddingBottom: theme.spacing(2) }} position="static" >
                <Toolbar>
                    <Container>
                        <Box display="flex" flexDirection="column" sx={{ flexGrow: 1 }}>
                            <Box>
                                <HeaderBreadcrumbs />
                            </Box>
                            <Box display="flex" flexDirection="row" alignItems="center">
                                <Typography
                                    variant='h4'
                                    fontWeight="bold"
                                    component="div"
                                    sx={{ paddingTop: 1, paddingBottom: 1 }}
                                >
                                    {title}

                                </Typography>
                                <SizedBoxHorizontal />
                                {jobStatus &&
                                    <ProcessStatus status={jobStatus.status as JobState} />
                                }

                            </Box>
                            <Typography variant='body2'>
                                Reproduction results
                            </Typography>
                        </Box>
                    </Container>
                </Toolbar>
            </PageHeaderAppBar>
            {
                jobStatus &&
                <JobDetail jobStatus={jobStatus} isLoading={isLoading} />
            }
        </>

    )
}

export default JobDetailPage