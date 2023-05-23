import React from 'react';
import { Box, IconButton, Theme, Typography, styled } from '@mui/material';
import { useTheme } from '@emotion/react';


const CardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
});

const Card = styled(Box)(({ theme }: { theme: Theme }) => ({
  flex: 1,
  border: `1px solid ${theme.palette?.gray?.light}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  background: theme.palette?.common?.white,
}));

const Header = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  borderBottom: `1px solid ${theme.palette?.gray?.light}`,
}));

const HeaderTitle = styled(Typography)(({ theme }: { theme: any }) => ({
  fontWeight: 'bold',
  padding: theme.spacing(1, 0),
}));

const ActionButtonContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const ActionButtonIcon = styled(IconButton)(({ theme }: { theme: any }) => ({
  padding: theme.spacing(1),
}));

const Divider = styled(Box)(({ theme }: { theme: any }) => ({
  width: 1,
  height: '100%',
  backgroundColor: theme.palette.gray.light,
}));

const CardContent = styled(Box)(({ theme }: { theme: any }) => ({
  padding: theme.spacing(2),
}));

interface MyCardProps {
  title: string;
  actions?: { icon: React.ReactNode }[];
  children?: React.ReactNode;
  flex: number;
}

const MyCard: React.FC<MyCardProps> = ({ title, actions, children, flex }) => {
  const theme = useTheme();
  return (
    <Card style={{ flex }}>
      <Header>
        <HeaderTitle>{title}</HeaderTitle>
        {actions && (
          <ActionButtonContainer>
            {actions.map((action, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Divider />}
                <ActionButtonIcon>{action.icon}</ActionButtonIcon>
              </React.Fragment>
            ))}
          </ActionButtonContainer>
        )}
      </Header>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default MyCard;



export const MyCardRow: React.FC = () => {
    return (
      <CardContainer>
        <MyCard title="Settings overview" flex={4} />
        <MyCard title="Metric Score" flex={2} />
        <MyCard title="Quality Report" flex={4} />
      </CardContainer>
    );
  };