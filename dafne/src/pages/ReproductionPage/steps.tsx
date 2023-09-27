import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import DataSourceSelectionComponent from './DataSourceSelectionComponent'
import { InstructionOptionDropdown } from '../../types';
import { SizedBoxVertical } from '../../assets/theme/dafneStyles';

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
  setSelectedHook?: React.Dispatch<React.SetStateAction<string>>
  setSelectedMultipleHook?: React.Dispatch<React.SetStateAction<string[]>>
  multipleSelection?: boolean;
}
export const DropDownSelectionStep: React.FC<DropDownSelectionStepProps> = ({
  selectionItems,
  setSelectedHook,
  setSelectedMultipleHook,
  multipleSelection = false,
}) => {
  const [value, setValue] = useState<string[] | string>(multipleSelection ? [] : '');

  const handleChange = (event: SelectChangeEvent<string[] | string>) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    if (setSelectedMultipleHook) {
      setSelectedMultipleHook(selectedValue as string[]);
    } else if (setSelectedHook)
      setSelectedHook(selectedValue as string);
  };

  useEffect(() => {
    if (setSelectedMultipleHook) {
      setSelectedMultipleHook(value as string[]);
    } else if (setSelectedHook)
      setSelectedHook(value as string);
  }, [value, setSelectedHook, setSelectedMultipleHook]);


  return (
    <FormControl fullWidth>
      <InputLabel id="model-select-label">Model</InputLabel>
      <Select
        labelId="model-select-label"
        id="model-select"
        defaultValue={[""]}
        value={value}
        label="Model"
        onChange={handleChange}
        multiple={multipleSelection}
      >
        {selectionItems.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDownSelectionStep;

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

interface OutputDataSelectionStepProps {
  defaultRowNumber: number;
  setSelectedRowNumber: (rowNumber: number) => void;
  outputDatasetName: string; // New prop for output dataset name
  setOutputDatasetName: (name: string) => void; // New prop setter
}

export const OutputDataSelectionStep: React.FC<OutputDataSelectionStepProps> = ({
  defaultRowNumber,
  setSelectedRowNumber,
  outputDatasetName, // New prop
  setOutputDatasetName, // New prop setter
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

  const handleNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setOutputDatasetName(name); // Update output dataset name when input changes
  };

  return (
    <Box display="flex" flexDirection="column">
      <SizedBoxVertical />
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
      <SizedBoxVertical />
      <Typography>Enter name of target dataset</Typography>
      <TextField
        type="text" // Use "text" type for string input
        value={outputDatasetName} // Bind the value to the prop
        sx={{ maxWidth: 400 }}
        onChange={handleNameInputChange} // Handle input changes
      />
    </Box>
  );
};