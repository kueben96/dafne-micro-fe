import React from 'react';
import NavComponents from './NavComponents';
import { Drawer } from '@mui/material';
import { drawerStyles } from '../assets/theme/dafneStyles';

interface DafneDrawerProps {
  handleDrawerToggle: () => void;
  isNavOpen: boolean;
}

const DafneDrawer: React.FC<DafneDrawerProps> = ({ handleDrawerToggle, isNavOpen }) => {
  const classes = drawerStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isNavOpen}
      onClose={handleDrawerToggle}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <NavComponents />
    </Drawer>
  );
};

export default DafneDrawer;
