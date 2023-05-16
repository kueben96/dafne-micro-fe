import { Breadcrumbs, Link, Typography, styled } from '@mui/material'
import React from 'react'

const CustomBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
    color: theme.palette.gray.main,
    fontSize: theme.typography.subtitle1.fontSize,
}))

// TODO: add links with props
const HeaderBreadcrumbs = (props) => {
    return (
        <CustomBreadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
                Dashboard
            </Link>
            <Typography variant='subtitle1'>Processes</Typography>
        </CustomBreadcrumbs>
    )
}

export default HeaderBreadcrumbs