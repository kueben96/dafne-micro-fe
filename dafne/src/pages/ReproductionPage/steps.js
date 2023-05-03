import { Box } from '@mui/material'
import React from 'react'
import DataSourceSelectionComponent from './DataSourceSelectionComponent'

export const DataSourceSelectionStep = ({ setSelectedSource }) => {
    const [selected, setSelected] = React.useState('catalogue');
    const [selectedFileCatalogue, setSelectedFileCatalogue] = React.useState("DemoData.csv");
    const [selectedFileUpload, setSelectedFileUpload] = React.useState(null);

    // TODO: if selected === true -> setSelectedSource()

    const handleCatalogueSelection = () => {
        // TODO: handle catalogue selection d
        setSelectedFileCatalogue('Catalogue Change.csv');
        if (selected !== 'catalogue') {
            setSelected('catalogue');
            setSelectedSource('catalogue', selectedFileCatalogue);
        }
    }

    const handleFileUpload = () => {
        if (selected !== 'upload') {
            const input = document.createElement('input');
            input.type = 'file';
            input.onchange = (event) => {
                setSelectedFileUpload(event.target.files[0]);
                setSelected('upload');
                setSelectedSource('upload', event.target.files[0].name);
            };
            input.click();
        }
    };

    return (
        <Box display="flex" flexDirection="row" >
            <DataSourceSelectionComponent variant="catalogueSelection" onClick={handleCatalogueSelection} selected={selected === 'catalogue'} selectedFileCatalogue={selectedFileCatalogue} />
            <DataSourceSelectionComponent variant="computerSelection" onClick={handleFileUpload} selected={selected === 'upload'} selectedFileComputer={selectedFileUpload} />
        </Box>
    )
}

