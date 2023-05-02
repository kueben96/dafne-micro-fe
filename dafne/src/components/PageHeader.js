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

    '& > :first-of-type': {
        marginBottom: theme.spacing(0.5),
    },
    '& > :last-child': {

    },
}));


const PageHeaderDashboard = (props) => {
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
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default PageHeaderDashboard