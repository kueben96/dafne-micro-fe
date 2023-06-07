import React from 'react';
import { Box, IconButton, Theme, Typography, styled } from '@mui/material';
import { SizedBoxVertical } from '../../assets/theme/dafneStyles';
import { CircularProgressWithLabel } from '../../components/CicularProgressWithLabel';


const Card = styled(Box)(({ theme }: { theme: Theme }) => ({
  flex: 1,
  border: `1px solid ${theme.palette?.gray?.lighter}`,
  borderRadius: 1,
  overflow: 'hidden',
  background: theme.palette?.common?.white,
}));

const Header = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  borderBottom: `1px solid ${theme.palette?.gray?.lighter}`,
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

interface SummaryCardProps {
  title: string;
  actions?: { icon: React.ReactNode }[];
  children?: React.ReactNode;
  flex: number;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, actions, children, flex }) => {
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
      <CardContent style={{ height: '100%' }}>{children}</CardContent>
    </Card>
  );
};


export const SettingsOverviewCard: React.FC = () => {
  return (
    <SummaryCard title="Settings overview" flex={4}>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" >
        <Box display={'flex'} flexDirection={'column'} alignItems={'start'}>
          <Typography variant="body2" color="gray.main">Rows number</Typography>
          <SizedBoxVertical space={0.5} />
          <Typography variant="h6">1798</Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'start'}>
          <Typography variant="body2" color="gray.main">Source Dataset</Typography>
          <Typography variant="h6">DemoDataset.csv</Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'start'}>
          <Typography variant="body2" color="gray.main">Model</Typography>
          <Typography variant="h6">CTGAN</Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'start'}>
          <Typography variant="body2" color="gray.main">Parameters</Typography>
          <Typography variant="h6">Default</Typography>
        </Box>
      </Box>
    </SummaryCard>
  );
};

export const MetricScoreCard: React.FC = () => {
  return (
    <SummaryCard title="Metric Score" flex={2}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
        <Typography variant='h6'>Statistical Similarity</Typography>
        <SizedBoxVertical space={1} />
        <CircularProgressWithLabel value={95} />
      </Box>
    </SummaryCard>
  );
};

export const QualityReportCard: React.FC = () => {
  return (
    <SummaryCard title="Quality Report" flex={2}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
        <Typography variant='h6'>To be defined</Typography>
      </Box>
    </SummaryCard>
  );
};

