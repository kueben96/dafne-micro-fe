import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import DataSourceSelectionComponent from './DataSourceSelectionComponent'


export const StepSummaryField = ({ label }) => {
    return (

        <TextField
            value={label}
            InputProps={{
                endAdornment: (
                    <Box component="span" sx={{ color: 'success.main' }}>
                        ✓
                    </Box>
                ),
                // sx: {
                //     '& .MuiInputBase-input': {
                //         padding: '4px',
                //     },
                // },
            }}
            sx={{
                mb: 3,

            }}
            disabled
            fullWidth
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

export const DropDownSelectionStep = ({ selectionItems, setSelectedHook }) => {

    const [value, setValue] = useState('')


    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setValue(selectedValue);
        setSelectedHook(selectedValue);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="model-select-label">Model</InputLabel>
            <Select
                labelId="model-select-label"
                id="model-select"
                value={value}
                label="Model"
                onChange={handleChange}
            >
                {selectionItems && selectionItems.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                        {option.label}
                    </MenuItem>

                ))}
            </Select>
        </FormControl>
    );
}
