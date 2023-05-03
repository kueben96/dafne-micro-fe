import React from 'react'
import StorageSharpIcon from '@mui/icons-material/StorageSharp';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { Box, Typography, useTheme } from '@mui/material';

const CustomIcon = ({ icon, theme }) => {
    const IconComponent = icon;
    return <IconComponent sx={{ color: theme.palette.primary.dark }} />;
};

const DataSourceSelectionComponent = ({ variant, selected, onClick }) => {
    const theme = useTheme()

    const handleClick = () => {
        console.log('handle click')
        if (onClick) {
            console.log('onClickAbailable')
            onClick();
        }
    };

    const getIcon = () => {
        if (variant === 'catalogueSelection') {
            return <CustomIcon icon={StorageSharpIcon} theme={theme} />;
        } else if (variant === 'computerSelection') {
            return <CustomIcon icon={FileUploadRoundedIcon} theme={theme} />;
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
            return 'Selected: DemoData.csv';
        } else if (variant === 'computerSelection') {
            return 'Upload your own data set (.csv, .xlsx, .xls and json types are supported)';
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
                border: `1px solid ${theme.palette.primary.dark}`,
                backgroundColor: selected ? `${theme.palette.primary.main}20` : `${theme.palette.grey.lighter}40`,
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

export default DataSourceSelectionComponent