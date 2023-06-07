import React from 'react'
import { ContentBox, SizedBoxHorizontal } from '../../assets/theme/dafneStyles'
import { Box, Container, styled } from '@mui/material';
import { MetricScoreCard, QualityReportCard, SettingsOverviewCard, SummaryCard } from './SummaryCard';

const CardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  width: '100%',
});
const ProcessDetail: React.FC = () => {
  return (
    <ContentBox>
      <CardContainer>
        <SettingsOverviewCard />
        <SizedBoxHorizontal space={0.5} />
        <MetricScoreCard />
        <SizedBoxHorizontal space={0.5} />
        <QualityReportCard />
      </CardContainer>
    </ContentBox>
  )
}

export default ProcessDetail