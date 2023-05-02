import { AppBar, Box, Container, Divider, Icon, IconButton, Tab, Tabs, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import HeaderBreadcrumbs from './HeaderBreadcrumbs';
import { pageHeaderStyles } from '../styles/dafneStyles';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';



const PageHeader = (props) => {

    const classes = pageHeaderStyles()
    const [isEditable, setIsEditable] = useState(false);
    const [title, setTitle] = useState(props.title);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleTitleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setIsEditable(false);
            // TODO: handle state/session object of process instance
            // props.onTitleChange(title);
        }
    };

    const handleEditClick = () => {
        setIsEditable(true);
    };

    const handleCancelClick = () => {
        setIsEditable(false);
        setTitle(props.title);
    };

    const handleSaveClick = () => {
        setIsEditable(false);
        // TODO: handle state/session object of process instance
        //   props.onTitleChange(title);
    };


    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Container>
                    <Box display="flex" flexDirection="column" sx={{ flexGrow: 1 }}>
                        <Box>
                            <HeaderBreadcrumbs />
                        </Box>
                        <Box display="flex" flexDirection="row" alignItems="center">
                            {isEditable ? (
                                <>
                                    <TextField
                                        autoFocus
                                        margin="none"
                                        value={title}
                                        onChange={handleTitleChange}
                                        onKeyPress={handleTitleKeyPress}
                                        onBlur={handleCancelClick}
                                        sx={{ width: '70%' }}
                                    />
                                    <IconButton onClick={handleSaveClick}>
                                        <CheckOutlinedIcon sx={{ padding: '1px' }} />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h4" fontWeight="bold" component="div" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                                        {title}
                                    </Typography>
                                    <IconButton onClick={handleEditClick}>
                                        <BorderColorOutlinedIcon sx={{ padding: '1px' }} />
                                    </IconButton>
                                </>
                            )}
                        </Box>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default PageHeader