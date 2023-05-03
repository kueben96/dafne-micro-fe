import { Box } from '@mui/material'
import React from 'react'
import DataSourceSelectionComponent from './DataSourceSelectionComponent'

export const DataSourceSelectionStep = ({ handleFileUpload, handleCatalogueSelection, selectedFile }) => {

    const [selected, setSelected] = React.useState(null);

    const handleCatalogueClick = () => {
        setSelected(true);
        setSelectedFile("catalogue_file_name");
        handleCatalogueSelection() // replace with actual file name
    };

    const handleUploadClick = () => {
        console.log("clicked file upload")
        handleFileUpload()
        setSelected(false);
        setSelectedFile("uploaded_file_name");
    };

    return (
        <Box display="flex" flexDirection="row" >
            <DataSourceSelectionComponent variant="catalogueSelection" onClick={handleCatalogueClick} selected={selected} selectedFileCatalogue={selectedFile} />
            <DataSourceSelectionComponent variant="computerSelection" onClick={handleUploadClick} selected={selected} selectedFileComputer={selectedFile} />
        </Box>
    )
}

