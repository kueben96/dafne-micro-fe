import { Box } from '@mui/material'
import React from 'react'
import DataSourceSelectionComponent from './DataSourceSelectionComponent'

export const DataSourceSelectionStep = ({ handleFileUpload, handleCatalogueSelection, selectedFileUpload, selectedFileCatalogue }) => {



    const [selected, setSelected] = React.useState(null);

    const handleCatalogueClick = () => {
        setSelected(true);
        setSelectedFile("catalogue_file_name");
        handleCatalogueSelection() // replace with actual file name
    };

    const handleUploadClick = () => {
        handleFileUpload()
        setSelected(false);
        setSelectedFile("uploaded_file_name");
    };

    return (
        <Box display="flex" flexDirection="row" >
            <DataSourceSelectionComponent variant="catalogueSelection" onClick={handleCatalogueSelection} selected={selected} selectedFileCatalogue={selectedFileCatalogue} />
            <DataSourceSelectionComponent variant="computerSelection" onClick={handleFileUpload} selected={selected} selectedFileComputer={selectedFileUpload} />
        </Box>
    )
}

