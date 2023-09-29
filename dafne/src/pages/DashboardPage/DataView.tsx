import React from 'react'
import { useFetchDatasetsQuery } from '../../redux/apiGatewaySlice';
import JobsTable from '../../components/JobsTable';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { ContentPaper, StyledLink } from '../../assets/theme/dafneStyles';
import { Container } from '@mui/material';
import { IDatasetItem, } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { DatasetType } from '../../types/enums';

const DataView: React.FC<{ dataSets: IDatasetItem[] }> = ({ dataSets }) => {

    interface DatasetsRowData {
        id: string;
        name: string;
        path: string;
        type: DatasetType;
        size: number;
        lastModified: Date;
    }

    const DatasetsRows: DatasetsRowData[] = dataSets.map((dataset) => {
        return {
            id: uuidv4(),
            name: dataset.objectName,
            path: dataset.objectName,
            type: dataset.bucketName,
            size: dataset.size,
            lastModified: new Date(dataset.lastModified),
        }
    })




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
            renderCell: (params: GridCellParams) => (
                <>

                    <StyledLink underline="none" href="#">View</StyledLink>
                    {params.row.type == DatasetType.User &&
                        <StyledLink underline="none" href="#">Delete</StyledLink>
                    }
                </>
            )


        }

    ];



    return (
        <ContentPaper>
            <Container>

                <JobsTable
                    tableType='dataset'
                    columns={DatasetsColumns}
                    rows={DatasetsRows}
                />
            </Container>
        </ContentPaper>
    )
}

export default DataView