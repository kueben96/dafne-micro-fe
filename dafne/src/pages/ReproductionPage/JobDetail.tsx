import React, { useEffect, useState } from 'react'
import { ContentBox, ContentPaper, SizedBoxHorizontal } from '../../assets/theme/dafneStyles'
import { Box, Button, IconButton, Typography, styled, useTheme } from '@mui/material';
import { MetricScoreCard, QualityReportCard, SettingsOverviewCard } from './SummaryCard';
import JobsTable from '../../components/JobsTable';
import { HeaderEditable, HeaderSize } from '../../components/PageHeader';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';


// TODO: implement Editing Job Name and Table Name
const CardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  width: '100%',
});


const JobDetail: React.FC = () => {

  const [tableName, setTablename] = useState('MySyntheticDataset.csv');

  const [rows, setRows] = useState<GridRowsProp>([]);
  const [cols, setCols] = useState<GridColDef[]>([]); // Initialize cols as an empty array


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
          <JobsTable columns={cols} rows={rows} />
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