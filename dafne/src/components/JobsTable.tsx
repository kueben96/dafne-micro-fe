import React, { useEffect } from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { EmptyRowsImage } from '../assets/images';
import { CustomDataGrid, TableCustomBox } from '../assets/theme/dafneStyles';




const CustomNoRowsOverlay = () => {
    const theme = useTheme()
    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }} className="empty-rows" >
            <img style={{ maxWidth: '100%', maxHeight: '100%', }} src={EmptyRowsImage} alt="empty rows" />
            <Typography variant='subtitle1' sx={{ padding: theme.spacing(1) }}>No data generation Jobs started yet</Typography>
            <Button variant='contained' color='secondary' >Generate your first dataset</Button>
        </Box>
    )
}

interface JobsTableProps {
    columns: GridColDef[];
    rows?: GridRowsProp;
    tableType: 'jobs' | 'datasets';
}


const JobsTable: React.FC<JobsTableProps> = ({ rows, columns, tableType }) => {
    const tableRef = React.useRef<HTMLDivElement | null>(null);
    const theme = useTheme();

    useEffect(() => {
        // Create a ResizeObserver to watch for changes in the table container's size.
        const resizeObserver = new ResizeObserver((entries) => {
            // If needed, you can access the new size like this:
            const [entry] = entries;
            const { width, height } = entry.contentRect;
            console.log(`New size: width=${width}, height=${height}`);
        });

        // Attach the ResizeObserver to the table container element.
        if (tableRef.current) {
            resizeObserver.observe(tableRef.current);
        }

        // Clean up the observer when the component unmounts.
        return () => {
            if (tableRef.current) {
                resizeObserver.unobserve(tableRef.current);
            }
        };
    }, []);


    return (
        <TableCustomBox theme={theme} ref={tableRef} height={tableType == "datasets" ? 600 : 400}>
            <CustomDataGrid
                autoHeight
                rows={rows ?? []}
                columns={columns}
                pagination
                pageSizeOptions={[10, 50, 100]}
                initialState={
                    {
                        pagination: {
                            paginationModel: { pageSize: 10 }
                        }
                    }
                }
                slots={{
                    noRowsOverlay: CustomNoRowsOverlay,
                }}
                classes={{ columnHeaders: 'column-headers' }}
            />
        </TableCustomBox>
    );


};

export default JobsTable;
