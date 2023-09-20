import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useRef, useState } from 'react'
import DataSourceSelectionComponent from './DataSourceSelectionComponent'
import { InstructionOptionDropdown } from '../../types';

interface StepSummaryFieldProps {
  label: string | null;
}

export const StepSummaryField: React.FC<StepSummaryFieldProps> = ({ label = '' }) => {
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
  );
};


interface DataSourceSelectionStepProps {
  setSelectedSource: React.Dispatch<React.SetStateAction<{ variant: string; file: File | null }>>;
}

export const DataSourceSelectionStep: React.FC<DataSourceSelectionStepProps> = ({ setSelectedSource }) => {

  // TODO: implement data catalogue selection
  const [selected, setSelected] = useState('catalogue');
  const [selectedFileCatalogue, setSelectedFileCatalogue] = useState<File>(new File([''], 'DemoDataset.csv'));
  const [selectedFileUpload, setSelectedFileUpload] = useState<File | null>(null);

  const handleCatalogueSelection = () => {
    setSelectedFileCatalogue(new File([''], 'Catalogue Change.csv'));
    setSelected('catalogue');
    setSelectedSource({
      variant: 'catalogue',
      file: selectedFileCatalogue,
    });
  };

  const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    setSelectedFileUpload(file);
    setSelected('upload');
    setSelectedSource({
      variant: 'upload',
      file: file ?? null,
    });
  };
  const openFileInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = handleFileUpload;
    input.click();
  };

  return (
    <Box display="flex" flexDirection="row">
      <DataSourceSelectionComponent
        variant="catalogueSelection"
        onClick={handleCatalogueSelection}
        selected={selected === 'catalogue'}
        selectedFileNameCatalogue={selectedFileCatalogue?.name}
      />
      <DataSourceSelectionComponent
        variant="computerSelection"
        onClick={openFileInput}
        selected={selected === 'upload'}
        selectedFileNameComputer={selectedFileUpload?.name}
      />
    </Box>
  );
}

interface DropDownSelectionStepProps {
  selectionItems: InstructionOptionDropdown[];
  setSelectedHook: (selectedValue: string) => void;
}

export const DropDownSelectionStep: React.FC<DropDownSelectionStepProps> = ({ selectionItems, setSelectedHook }) => {
  const [value, setValue] = useState('');

  const handleChange = (event: SelectChangeEvent<string>) => {
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
        {selectionItems &&
          selectionItems.map((option, index) => (
            <MenuItem key={index} value={option.apiName}>
              {option.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export const ParameterSettingsStep: React.FC = () => {
  const [value, setValue] = useState('default');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="default" control={<Radio />} label="Default Settings" />
        <FormControlLabel value="advanced" control={<Radio />} label="Advanced parameters" />
      </RadioGroup>
    </FormControl>
  );
};

interface RowNumberSelectionStepProps {
  defaultRowNumber: number;
  setSelectedRowNumber: (rowNumber: number) => void;
}

export const RowNumberSelectionStep: React.FC<RowNumberSelectionStepProps> = ({
  defaultRowNumber,
  setSelectedRowNumber,
}) => {
  const [selectedOption, setSelectedOption] = useState('inherit');
  const [inputValue, setInputValue] = useState(defaultRowNumber.toString());
  const [defaultInputValue, setDefaultInputValue] = useState(defaultRowNumber.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption(value);

    if (value === 'inherit') {
      setInputValue(defaultInputValue);
      setSelectedRowNumber(parseInt(defaultInputValue, 10));
    } else {
      inputRef.current?.focus();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setSelectedRowNumber(parseInt(value, 10));
  };

  const handleInputBlur = () => {
    if (inputValue.trim() === '') {
      setInputValue(defaultInputValue);
      setSelectedOption('inherit');
      setSelectedRowNumber(parseInt(defaultInputValue, 10));
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
          type="number"
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
};
