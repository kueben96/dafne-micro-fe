import { AppBar, Breadcrumbs, Link, Toolbar, Typography } from '@mui/material'
import { makeStyles } from "@mui/styles";
import React from 'react'
import PageHeader from '../components/PageHeader';

const useStyles = makeStyles((theme) => ({
    appBar: {
        // backgroundColor: "#fff",
        // color: "#333",
        // boxShadow: "none",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

// TODO: PageHeader with BreadCrumb
const ProcessesPage = (props) => {
    const classes = useStyles();
    return (
        <PageHeader title="Dashboard" />
    )
}

export default ProcessesPage