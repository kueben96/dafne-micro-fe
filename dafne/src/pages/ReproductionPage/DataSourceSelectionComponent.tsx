import React from 'react';
import StorageSharpIcon from '@mui/icons-material/StorageSharp';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { Box, Typography, useTheme, Theme } from '@mui/material';

interface DataSourceSelectionComponentProps {
  // TODO: ENUM HERE
  variant: 'catalogueSelection' | 'computerSelection';
  selected: boolean;
  onClick: () => void;
  selectedFileNameCatalogue?: string;
  selectedFileNameComputer?: string;
  disabled?: boolean;
}

const CustomIcon: React.FC<{ icon: React.ElementType; theme: Theme, disabled?: boolean }> = ({ icon: IconComponent, theme, disabled }) => {
  return (
    <IconComponent
      sx={{
        color: disabled ? theme?.palette?.gray?.light : theme?.palette?.primary?.dark,
      }}
    />)
};

const DataSourceSelectionComponent: React.FC<DataSourceSelectionComponentProps> = ({
  variant,
  selected,
  onClick,
  selectedFileNameCatalogue,
  selectedFileNameComputer = 'Upload your own data set (.csv, .xlsx, .xls and json types are supported)',
  disabled = false,
}) => {

  const theme = useTheme();
  const disabledColor = `1px solid ${theme?.palette?.gray?.light}20`

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const getIcon = () => {
    if (variant === 'catalogueSelection') {
      return <CustomIcon icon={StorageSharpIcon} theme={theme} disabled={disabled} />;
    } else if (variant === 'computerSelection') {
      return <CustomIcon icon={FileUploadRoundedIcon} theme={theme} disabled={disabled} />;
    } else {
      return null;
    }
  };

  const getTitle = () => {
    if (variant === 'catalogueSelection') {
      return 'Select source dataset';
    } else if (variant === 'computerSelection') {
      return 'Click or drag file to this area to upload';
    } else {
      return '';
    }
  };

  const getSubtitle = () => {
    if (variant === 'catalogueSelection') {
      return `Selected: ${selectedFileNameCatalogue}`;
    } else if (variant === 'computerSelection') {
      return selectedFileNameComputer;
    } else {
      return '';
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 1,
        width: 400,
        margin: theme.spacing(0.5),
        padding: theme.spacing(4, 1),
        border: disabled ? disabledColor : `1px solid ${theme?.palette?.primary?.dark}`,
        backgroundColor: disabled
          ? disabledColor // Use gray background if disabled
          : selected
            ? `${theme?.palette?.primary?.main}20`
            : `${theme?.palette?.gray?.lighter}50`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      {getIcon()}
      <Typography>{getTitle()}</Typography>
      <Typography variant="subtitle1">{getSubtitle()}</Typography>
    </Box>
  );
};

export default DataSourceSelectionComponent;
