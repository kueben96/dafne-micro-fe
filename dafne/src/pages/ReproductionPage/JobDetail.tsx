import React, { useState } from 'react'
import { ContentBox, ContentPaper, SizedBoxHorizontal } from '../../assets/theme/dafneStyles'
import { Box, Button, IconButton, Typography, styled, useTheme } from '@mui/material';
import { MetricScoreCard, QualityReportCard, SettingsOverviewCard } from './SummaryCard';
import JobsTable from '../../components/JobsTable';
import { HeaderEditable, HeaderSize } from '../../components/PageHeader';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';


// TODO: implement Editing Job Name and Table Name
const CardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  width: '100%',
});


const columns = [
  {
    field: 'id',
    headerName: 'Job ID',
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

const JobDetail: React.FC = () => {

  const [tableName, setTablename] = useState('MySyntheticDataset.csv');

  return (
    <>
      <JobSummary />
      <ContentPaper>
        <ContentBox>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Box display="flex" flexDirection="column">
              <Typography variant='body1' color="gray.main">Preview</Typography>
              <HeaderEditable title={tableName} headerSize={HeaderSize.SmallHeader} />
            </Box>
            <Box > {/* Updated line */}
              <Button
                sx={{ fontSize: 14, padding: '4px', alignSelf: 'flex-start', textTransform: 'capitalize' }}
                variant="outlined"
                startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 10, padding: 0 }} />}
              >
                Download
              </Button>
              <IconButton><OpenWithSharpIcon /></IconButton>
            </Box>
          </Box>
          <JobsTable columns={columns} />
        </ContentBox>
      </ContentPaper>
    </>

  )
}

export default JobDetail

const JobSummary: React.FC = () => {
  const theme = useTheme();
  return (
    <ContentBox>
      <CardContainer>
        <SettingsOverviewCard />
        <SizedBoxHorizontal theme={theme} space={0.5} />
        <MetricScoreCard />
        <SizedBoxHorizontal theme={theme} space={0.5} />
        <QualityReportCard />
      </CardContainer>
    </ContentBox>
  )
}