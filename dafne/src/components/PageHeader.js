import { AppBar, Box, Container, Divider, Tab, Tabs, Toolbar, Typography, styled } from '@mui/material'
import { makeStyles } from "@mui/styles";
import React from 'react'
import HeaderBreadcrumbs from './HeaderBreadcrumbs';

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#fff",
        boxShadow: 'none',
        paddingTop: theme.spacing(2)
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

const AssetStatistic = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),

    '& > :first-child': {
        marginBottom: theme.spacing(1),
    },
    '& > :last-child': {

    },
}));


const PageHeader = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
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
                            value={value}
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value="one" label="Processes" />
                            <Tab value="two" label="Models" />
                            <Tab value="three" label="Data" />
                        </Tabs>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default PageHeader