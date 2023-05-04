import { Box, TextField } from '@mui/material'
import React from 'react'
import DataSourceSelectionComponent from './DataSourceSelectionComponent'


export const StepSummaryField = (label) => {
    return (
        <TextField
            value={label}
            InputProps={{
                endAdornment: (
                    <Box component="span" sx={{ color: 'success.main' }}>
                        ✓
                    </Box>
                )
            }}
            sx={{ mt: 2 }}
            fullWidth
            disabled
        />
    )
}

export const DataSourceSelectionStep = ({ setSelectedSource }) => {
    const [selected, setSelected] = React.useState('catalogue');
    const [selectedFileCatalogue, setSelectedFileCatalogue] = React.useState("DemoData.csv");
    const [selectedFileUpload, setSelectedFileUpload] = React.useState(null);

    const handleCatalogueSelection = () => {
        setSelectedFileCatalogue('Catalogue Change.csv');
        setSelected('catalogue');
        setSelectedSource({
            variant: 'catalogue',
            file: selectedFileCatalogue
        });
    }

    const handleFileUpload = () => {

        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (event) => {
            setSelectedFileUpload(event.target.files[0]);
            setSelected('upload');
            setSelectedSource({
                variant: 'upload',
                file: event.target.files[0].name
            });
        };
        input.click();

    };

    return (
        <Box display="flex" flexDirection="row" >
            <DataSourceSelectionComponent variant="catalogueSelection" onClick={handleCatalogueSelection} selected={selected === 'catalogue'} selectedFileCatalogue={selectedFileCatalogue} />
            <DataSourceSelectionComponent variant="computerSelection" onClick={handleFileUpload} selected={selected === 'upload'} selectedFileComputer={selectedFileUpload} />
        </Box>
    )
}

