import { Breadcrumbs, Link, Typography, styled, Theme } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

const CustomBreadcrumbs = styled(Breadcrumbs)(({ theme }: { theme: Theme }) => ({
  color: theme.palette?.gray?.main,
  fontSize: theme.typography.subtitle1.fontSize,
}));

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const HeaderBreadcrumbs: React.FC = () => {
  const pathname = useLocation().pathname;
  const pathSegments = pathname.split('/').filter(Boolean);
  console.log(pathSegments);

  return (
    <CustomBreadcrumbs aria-label="breadcrumb">
      {pathSegments.slice(0, -1).map((segment, index) => (
        console.log(segment),
        < Link
          key={index}
          underline="hover"
          color="inherit"
          href={'/' + pathSegments.slice(0, index + 1).join('/')}
        >
          {capitalizeFirstLetter(segment)}
        </Link>
      ))
      }
      <Typography variant="subtitle1">{capitalizeFirstLetter(pathSegments[pathSegments.length - 1])}</Typography>
    </CustomBreadcrumbs >
  );
};

export default HeaderBreadcrumbs;
