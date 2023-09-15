import { Box, Container, Divider, Tab, Tabs, Toolbar, Typography, styled } from '@mui/material'
import React from 'react'
import HeaderBreadcrumbs from './HeaderBreadcrumbs';
import { PageHeaderAppBar } from '../assets/theme/dafneStyles';

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
    value: string;
    onChange: (event: React.ChangeEvent<{}>, newValue: string) => void;
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
                                <Typography>Hanna Schmidt ab384bjs32</Typography>
                                <Typography variant="subtitle1">Product Manager - Data Analytics</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Box display="flex" flexDirection="row" >
                                    <AssetStatistic>
                                        <Typography variant="subtitle2">Processes</Typography>
                                        <Typography>1</Typography>
                                    </AssetStatistic>
                                    <Divider orientation="vertical" flexItem />
                                    <AssetStatistic>
                                        <Typography variant="subtitle2">Datasets</Typography>
                                        <Typography>2</Typography>
                                    </AssetStatistic>
                                    <Divider orientation="vertical" flexItem />
                                    <AssetStatistic>
                                        <Typography variant="subtitle2">Models</Typography>
                                        <Typography>1</Typography>
                                    </AssetStatistic>
                                </Box>
                            </Box>
                        </Box>
                        <Tabs
                            value={props.value}
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