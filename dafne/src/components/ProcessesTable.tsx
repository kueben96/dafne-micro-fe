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
    const tableRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const handleResize = () => {
            // Your resize handling logic goes here.
            // This function will be called when the table container's size changes.
        };

        // Create a ResizeObserver to watch for changes in the table container's size.
        const resizeObserver = new ResizeObserver((entries) => {
            // Call handleResize whenever the size changes.
            handleResize();

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
        <TableCustomBox ref={tableRef}>
            <CustomDataGrid
                autoHeight
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
