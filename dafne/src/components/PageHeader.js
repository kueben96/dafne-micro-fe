import { AppBar, Box, Container, Divider, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import React from 'react'
import HeaderBreadcrumbs from './HeaderBreadcrumbs';
import { pageHeaderStyles } from '../styles/dafneStyles';



const PageHeader = (props) => {
    const classes = pageHeaderStyles()

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Container>
                    <Box display="flex" flexDirection="column" sx={{ flexGrow: 1 }}>
                        <Box>
                            <HeaderBreadcrumbs />
                        </Box>
                        <Box>
                            <Typography variant="h4" fontWeight="bold" component="div" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                                {props.title}
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default PageHeader