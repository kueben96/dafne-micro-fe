import React from 'react';
import { Box, IconButton, Theme, Typography, styled, useTheme } from '@mui/material';
import { SizedBoxVertical } from '../../assets/theme/dafneStyles';
import { CircularProgressWithLabel } from '../../components/CicularProgressWithLabel';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchIcon from '@mui/icons-material/Search';

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


const Divider = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: 1,
  height: '100%',
  backgroundColor: theme.palette?.gray?.lighter,
  alignSelf: 'stretch',
}));

const CardContent = styled(Box)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(2),
}));

interface SummaryCardProps {
  title: string;
  subtitle?: string;
  actions?: { icon: React.ReactNode }[];
  children?: React.ReactNode;
  flex: number;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, actions, children, flex, subtitle }) => {
  return (
    <Card style={{ flex }}>
      <Header>
        <HeaderTitle variant='subtitle1'>{title}</HeaderTitle>
        {subtitle && (
          <Typography variant='body2' color='gray.main'>{subtitle}</Typography>
        )}
        {actions && (
          <ActionButtonContainer>
            {actions.map((action, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Divider />}
                <IconButton>{action.icon}</IconButton>
              </React.Fragment>
            ))}
          </ActionButtonContainer>
        )}
      </Header>
      <CardContent style={{ height: '100%' }}>{children}</CardContent>
    </Card>
  );
};

interface SettingsOverviewCardProps {
  rowNumber: number;
  sourceDataset: string;
  model: string;
  parameters?: string;
}

export const SettingsOverviewCard: React.FC<SettingsOverviewCardProps> = ({ rowNumber, sourceDataset, model, parameters }) => {
  return (
    <SummaryCard title="Settings overview" flex={4}>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" >
        <Box display={'flex'} flexDirection={'column'} alignItems={'start'}>
          <Typography variant="body2" color="gray.main">Rows number</Typography>
          <SizedBoxVertical space={0.5} />
          <Typography variant="h6">{rowNumber}</Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'start'}>
          <Typography variant="body2" color="gray.main">Source Dataset</Typography>
          <Typography variant="h6">{sourceDataset}</Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'start'}>
          <Typography variant="body2" color="gray.main">Model</Typography>
          <Typography variant="h6">{model}</Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'start'}>
          <Typography variant="body2" color="gray.main">{parameters ?? 'Default'}</Typography>
          <Typography variant="h6">{parameters ?? 'Default'}</Typography>
        </Box>
      </Box>
    </SummaryCard>
  );
};

export const MetricScoreCard: React.FC<{ metricScore?: number }> = ({ metricScore }) => {
  const theme = useTheme();
  return (
    <SummaryCard title="Metric Score" flex={2}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
        <SizedBoxVertical theme={theme} space={1} />
        <CircularProgressWithLabel value={metricScore!} />
      </Box>
    </SummaryCard>
  );
};

export const QualityReportCard: React.FC = () => {
  const actions = [
    { icon: <FileDownloadOutlinedIcon /> },
    { icon: <SearchIcon /> },
  ];
  return (
    <SummaryCard title="Quality Report" actions={actions} flex={2}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
        <Typography variant='h6'>To be defined: indicators and metrics</Typography>
      </Box>
    </SummaryCard>
  );
};

