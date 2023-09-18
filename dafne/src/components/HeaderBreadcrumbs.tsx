import { Breadcrumbs, Link, Typography, styled, Theme } from '@mui/material';
import React from 'react';

const CustomBreadcrumbs = styled(Breadcrumbs)(({ theme }: { theme: Theme }) => ({
  color: theme.palette?.gray?.main,
  fontSize: theme.typography.subtitle1.fontSize,
}));

// TODO: add links with props
const HeaderBreadcrumbs: React.FC = () => {
  return (
    <CustomBreadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Dashboard
      </Link>
      <Typography variant="subtitle1">Jobs</Typography>
    </CustomBreadcrumbs>
  );
};

export default HeaderBreadcrumbs;
