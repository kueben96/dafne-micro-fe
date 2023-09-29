import React from 'react'
import { useFetchDatasetsQuery } from '../../redux/apiGatewaySlice';
import JobsTable from '../../components/JobsTable';
import { GridColDef } from '@mui/x-data-grid';
import { ContentPaper, StyledLink } from '../../assets/theme/dafneStyles';
import { Container } from '@mui/material';
import { IDatasetItem, IDatasets } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const DataView: React.FC<{ dataSets: IDatasets }> = ({ dataSets }) => {

    interface DatasetsRowData {
        id: string;
        name: string;
        path: string;
        type: string;
        size: number;
        lastModified: Date;
    }

    const DatasetsRows: DatasetsRowData[] = dataSets
        ? (Object.keys(dataSets) as (keyof IDatasets)[]).flatMap((datasetType) => {
            const datasetItems = dataSets[datasetType];;
            if (Array.isArray(datasetItems)) {
                return datasetItems.map((dataset) => ({
                    id: uuidv4(),
                    name: dataset.path,
                    path: dataset.path,
                    type: datasetType,
                    size: dataset.size,
                    lastModified: new Date(dataset.lastModified),
                }));
            }
            return [];
        })
        : [];

    console.log(DatasetsRows)



    // const DatasetsRows = Object.keys(dataSets).map((key) => {
    //     return {
    //         name: 
    //         path: dataSets[key].path,
    //         type: key,
    //         size: dataSets[key].size,
    //         lastModified: dataSets[key].lastModified,
    //     }
    // }

    const DatasetsColumns: GridColDef<DatasetsRowData>[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
        },
        {
            field: 'path',
            headerName: 'Path',
            flex: 1,
        },
        {
            field: 'type',
            headerName: 'Type',
            flex: 1,
            // TODO: renderCell with ChipWithIcon for public/private
        },
        {
            field: 'size',
            headerName: 'Lenght [Rows]',
            type: 'number',
            flex: 0.5,
        },
        {
            field: 'lastModified',
            headerName: 'Last Modified',
            type: 'date',
            flex: 1,
        },
        {
            field: 'actions',
            headerName: 'Action',
            flex: 1,
            headerClassName: 'header-cell',
            renderCell: () => (
                <>
                    <StyledLink underline="none" href="#">Delete</StyledLink>
                    <StyledLink underline="none" href="#">Details</StyledLink>
                </>
            ),

        },

    ];



    return (
        <ContentPaper>
            <Container>

                <JobsTable
                    tableType='datasets'
                    columns={DatasetsColumns}
                    rows={DatasetsRows}
                />
            </Container>
        </ContentPaper>
    )
}

export default DataView