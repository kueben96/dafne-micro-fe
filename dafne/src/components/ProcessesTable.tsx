import React from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { EmptyRowsImage } from '../assets/images';
import { CustomDataGrid, TableCustomBox } from '../assets/theme/dafneStyles';




const CustomNoRowsOverlay = () => {
    const theme = useTheme()
    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }} className="empty-rows" >
            <img style={{ maxWidth: '100%', maxHeight: '100%', }} src={EmptyRowsImage} alt="empty rows" />
            <Typography variant='subtitle1' sx={{ padding: theme.spacing(1) }}>No data generation processes started yet</Typography>
            <Button variant='contained' color='secondary' >Generate your first dataset</Button>
        </Box>
    )
}

interface ProcessesTableProps {
    columns: GridColDef[];
    rows?: GridRowsProp;
}


const ProcessesTable: React.FC<ProcessesTableProps> = ({ rows, columns }) => {

    return (
        <TableCustomBox>
            <CustomDataGrid
                rows={rows ?? []}
                columns={columns}
                slots={{
                    noRowsOverlay: CustomNoRowsOverlay,
                }}
                classes={{ columnHeaders: 'column-headers' }}
            />
        </TableCustomBox>
    );
};

export default ProcessesTable;
