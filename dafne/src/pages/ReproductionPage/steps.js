import { Box } from '@mui/material'
import React from 'react'
import DataSourceSelectionComponent from './DataSourceSelectionComponent'

export const DataSourceSelectionStep = ({ handleFileUpload, handleCatalogueSelection, selectedFile }) => {
    return (
        <Box display="flex" flexDirection="row" >
            <DataSourceSelectionComponent variant="catalogueSelection" onClick={handleCatalogueSelection} selectedFile={selectedFile} />
            <DataSourceSelectionComponent variant="computerSelection" onClick={handleFileUpload} selectedFile={selectedFile} />
        </Box>
    )
}

