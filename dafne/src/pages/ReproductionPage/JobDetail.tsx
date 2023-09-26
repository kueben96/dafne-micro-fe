import React, { useEffect, useState } from 'react'
import { ContentBox, ContentPaper, SizedBoxHorizontal } from '../../assets/theme/dafneStyles'
import { Box, Button, IconButton, Typography, styled, useTheme } from '@mui/material';
import { MetricScoreCard, QualityReportCard, SettingsOverviewCard } from './SummaryCard';
import JobsTable from '../../components/JobsTable';
import { HeaderEditable, HeaderSize } from '../../components/PageHeader';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useGetJobStatusByIdQuery } from '../../redux/apiGatewaySlice';
import { IJobStatus } from '../../types';
import { mapModelToReadable } from '../../types/enums';


// TODO: implement Editing Job Name and Table Name
const CardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  width: '100%',
});


const JobDetail: React.FC = () => {

  const [rows, setRows] = useState<GridRowsProp>([]);
  const [cols, setCols] = useState<GridColDef[]>([]); // Initialize cols as an empty array

  const { data: jobStatus, isLoading, error } = useGetJobStatusByIdQuery("userxyz_12345")
  if (jobStatus) {
    console.log(jobStatus)
  }


  useEffect(() => {
    // Fetch data from demo.json (assuming it's in the public directory)
    fetch('http://localhost:8086/demopkl_sample_100.json')
      .then((response) => {
        console.log('Response status:', response);
        return response.json();
      })
      .then((data) => {
        console.log('JSON Data:', data);
        // Assuming the first row of data contains column names
        const [columnNames, ...rowData] = data;
        setCols(columnNames.map((colName: any) => ({ field: colName, headerName: colName })) as GridColDef[]);
        const formattedRows = rowData.map((row: { [x: string]: any; }, index: any) => ({
          id: index, // You can use a unique identifier here
          ...columnNames.reduce((acc: { [x: string]: any; }, colName: string | number, colIndex: string | number) => {
            acc[colName] = row[colIndex];
            return acc;
          }, {}),
        }));
        setRows(formattedRows);
        console.log('Formatted Rows:', rows);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);



  return (
    <>

      {isLoading && <div>Loading Job Status...</div>}
      {jobStatus &&
        <>
          <JobSummary jobStatus={jobStatus} />
          <ContentPaper>
            <ContentBox>
              <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Box display="flex" flexDirection="column">
                  <Typography variant='body1' color="gray.main">Preview</Typography>
                  <HeaderEditable title={jobStatus.job.instruction.model.paths.upload.path} headerSize={HeaderSize.SmallHeader} />
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
              <JobsTable columns={cols} rows={rows} />
            </ContentBox>
          </ContentPaper>
        </>
      }
    </>

  )
}

export default JobDetail

const JobSummary: React.FC<{ jobStatus: IJobStatus }> = ({ jobStatus }) => {
  const theme = useTheme();
  const sampleNumber = jobStatus.job.instruction.model.sample;
  const sourceData = jobStatus.job.instruction.model.paths.download.path;
  const model = mapModelToReadable(jobStatus.job.instruction.model.identifier);
  //TODO: update with metric score when response is updated
  const metric = 92;
  return (
    <ContentBox>
      <CardContainer>
        <SettingsOverviewCard rowNumber={sampleNumber} sourceDataset={sourceData} model={model} />
        <SizedBoxHorizontal theme={theme} space={0.5} />
        <MetricScoreCard metricScore={metric} />
        <SizedBoxHorizontal theme={theme} space={0.5} />
        <QualityReportCard />
      </CardContainer>
    </ContentBox>
  )
}