import React from 'react'
import { ContentBox, ContentPaper, SizedBoxHorizontal } from '../../assets/theme/dafneStyles'
import { Box, Container, styled } from '@mui/material';
import { MetricScoreCard, QualityReportCard, SettingsOverviewCard, SummaryCard } from './SummaryCard';
import ProcessesTable from '../../components/ProcessesTable';
import PageHeader from '../../components/PageHeader';

const CardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  width: '100%',
});

const columns = [
  {
    field: 'id',
    headerName: 'Process ID',
    flex: 1,
    headerClassName: 'header-cell',
  },
  {
    field: 'service',
    headerName: 'Service',
    flex: 1,
    headerClassName: 'header-cell',
  },
  {
    field: 'metric',
    headerName: 'Metric',
    flex: 1,
    headerClassName: 'header-cell',
  }
]

const ProcessDetail: React.FC = () => {
  return (
    <>
      <ProcessSummary />
      <ContentPaper>
        <PageHeader title="Processes" />
        <Container>

          <ProcessesTable columns={columns} />
        </Container>

      </ContentPaper>
    </>

  )
}

export default ProcessDetail

const ProcessSummary: React.FC = () => {
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