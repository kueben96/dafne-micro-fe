import { AppBar, Box, Container, Divider, Icon, IconButton, Tab, Tabs, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import HeaderBreadcrumbs from './HeaderBreadcrumbs';
import { SizedBoxVertical, pageHeaderStyles } from '../assets/theme/dafneStyles';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

// TODO: Dialogue for save, edit and cancel

const PageHeader = (props) => {
    const classes = pageHeaderStyles();
    const [isEditable, setIsEditable] = useState(false);
    const [originalTitle, setOriginalTitle] = useState(props.title);
    const [title, setTitle] = useState(props.title);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleTitleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSaveClick();
        }
    };

    const handleEditClick = () => {
        setIsEditable(true);
    };


    const handleCancelClick = () => {
        if (title !== originalTitle) {
            if (window.confirm("Discard changes to title?")) {
                setTitle(originalTitle);
                setIsEditable(false);
            }
        } else {
            setIsEditable(false);
        }
    };

    const handleSaveClick = () => {
        if (title !== originalTitle) {
            setTitle(title);
            setOriginalTitle(title);
        }
        setIsEditable(false);
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
                                        sx={{ width: "70%" }}
                                    />
                                    <IconButton onClick={handleSaveClick}>
                                        <CheckOutlinedIcon sx={{ padding: "1px" }} />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <Typography
                                        variant="h4"
                                        fontWeight="bold"
                                        component="div"
                                        sx={{ paddingTop: 1, paddingBottom: 1 }}
                                    >
                                        {title}
                                    </Typography>
                                    <IconButton onClick={handleEditClick}>
                                        <BorderColorOutlinedIcon sx={{ padding: "1px" }} />
                                    </IconButton>
                                </>
                            )}
                        </Box>
                        <Typography variant="small">Follow the steps to generate a synthetic dataset from an already existing dataset</Typography>
                        <SizedBoxVertical space={2} />
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default PageHeader;
