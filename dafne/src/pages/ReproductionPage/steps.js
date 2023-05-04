import { Box, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Tooltip, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
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

export const ParameterSettingsStep = () => {
    return (
        <FormControl>

            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                <FormControlLabel value="default" control={<Radio />} label="Default Settings" />
                <FormControlLabel value="advanced" control={<Radio />} label="Advanced parameters" />
            </RadioGroup>
        </FormControl>
    );
}

export const RowNumberSelectionStep = ({ defaultRowNumber, setSelectedRowNumber }) => {

    const [selectedOption, setSelectedOption] = useState('inherit');
    const [inputValue, setInputValue] = useState(defaultRowNumber);
    const [defaultInputValue, setDefaultInputValue] = useState(defaultRowNumber);
    const inputRef = useRef(null);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);

        if (value === 'inherit') {
            setInputValue(defaultInputValue);
            setSelectedRowNumber(defaultInputValue);
        } else {
            inputRef.current.focus();
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setSelectedRowNumber(parseInt(value, 10));
    };

    const handleInputBlur = () => {
        if (inputValue.trim() === '') {
            setInputValue(defaultInputValue);
            setSelectedOption('inherit');
            setSelectedRowNumber(defaultInputValue);
        }
    };

    return (
        <Box display="flex" flexDirection="column">
            <Typography>How many rows do you want to generate?</Typography>
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={selectedOption}
                    onChange={handleChange}
                >
                    <FormControlLabel value="inherit" control={<Radio />} label="Same size as original dataset" />
                    <FormControlLabel value="custom" control={<Radio />} label="Enter desired row number" />
                </RadioGroup>
                <TextField
                    inputRef={inputRef}
                    type='number'
                    sx={{ maxWidth: 400 }}
                    disabled={selectedOption === 'inherit'}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    inputProps={{ style: { color: selectedOption === 'inherit' ? 'grey' : 'black' } }}
                />
            </FormControl>
        </Box>
    );
}