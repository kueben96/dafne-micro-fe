import { Box, Container, Divider, Tab, Tabs, Toolbar, Typography, styled } from '@mui/material'
import React from 'react'
import HeaderBreadcrumbs from './HeaderBreadcrumbs';
import { PageHeaderAppBar } from '../assets/theme/dafneStyles';
import { IUser } from '../types';
import userSlice from '../redux/features/userSlice';

const AssetStatistic = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),

    '& > :first-of-type': {
        marginBottom: theme.spacing(0.5),
    },
    '& > :last-child': {

    },
}));

interface PageHeaderDashboardProps {
    title: string;
    path: string;
    onChange: (event: React.ChangeEvent<{}>, newValue: string) => void;
    user: IUser;
    jobsCount: number;
    modelsCount: number;
    datasetsCount: number;
}

const PageHeaderDashboard = (props: PageHeaderDashboardProps) => {

    return (
        <PageHeaderAppBar position="static">
            <Toolbar >
                <Container>
                    <Box display="flex" flexDirection="column" sx={{ flexGrow: 1 }}>
                        <Box>
                            <HeaderBreadcrumbs />
                        </Box>
                        <Box>
                            <Typography variant="h3" fontWeight="bold" component="div" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                                {props.title}
                            </Typography>
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                            <Box display="flex" flexDirection="column" >
                                {props.user &&
                                    <>
                                        <Typography>{props.user.firstName + ' ' + props.user.lastName}</Typography>
                                        <Typography variant="subtitle1">{props.user.jobTitle + ' - ' + props.user.industry}</Typography>
                                    </>
                                }

                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Box display="flex" flexDirection="row" >
                                    <AssetStatistic>
                                        <Typography variant="subtitle2">Jobs</Typography>
                                        <Typography>{props.jobsCount}</Typography>
                                    </AssetStatistic>
                                    <Divider orientation="vertical" flexItem />
                                    <AssetStatistic>
                                        <Typography variant="subtitle2">Datasets</Typography>
                                        <Typography>{props.datasetsCount}</Typography>
                                    </AssetStatistic>
                                    <Divider orientation="vertical" flexItem />
                                    <AssetStatistic>
                                        <Typography variant="subtitle2">Models</Typography>
                                        <Typography>{props.modelsCount}</Typography>
                                    </AssetStatistic>
                                </Box>
                            </Box>
                        </Box>
                        <Tabs
                            value={props.path}
                            onChange={props.onChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value="jobs" label="Jobs" sx={{ paddingLeft: 0 }} />
                            <Tab value="models" label="Models" sx={{ paddingLeft: 0 }} />
                            <Tab value="data" label="Data" sx={{ paddingLeft: 0 }} />
                        </Tabs>
                    </Box>
                </Container>
            </Toolbar>
        </PageHeaderAppBar>
    )
}

export default PageHeaderDashboard