import React from 'react';
import NavComponents from './NavComponents';
import { DrawerCustom } from '../assets/theme/dafneStyles';
import { useTheme } from '@mui/material'


interface DafneDrawerProps {
  handleDrawerToggle: () => void;
  isNavOpen: boolean;
}

const DafneDrawer: React.FC<DafneDrawerProps> = ({ handleDrawerToggle, isNavOpen }) => {
  const theme = useTheme();
  console.log("theme drawer")
  console.log(theme)
  return (
    <DrawerCustom
      theme={theme}
      variant="persistent"
      anchor="left"
      PaperProps={{ className: "drawer-paper" }}
      open={isNavOpen}
      onClose={handleDrawerToggle}   // classes={{
    //   paper: classes.drawerPaper,
    // }}
    >
      <NavComponents />
    </DrawerCustom>
  );
};

export default DafneDrawer;
