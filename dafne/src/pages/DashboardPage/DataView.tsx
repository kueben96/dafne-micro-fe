import React from 'react'
import { useFetchDatasetsQuery } from '../../redux/apiGatewaySlice';
import JobsTable from '../../components/JobsTable';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { ContentPaper, StyledLink } from '../../assets/theme/dafneStyles';
import { Chip, Container } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { DatasetType, getFileNameFromPath } from '../../types/enums';
import FaceIcon from '@mui/icons-material/Face';
import PublicIcon from '@mui/icons-material/Public';
import { useSelector } from 'react-redux';
import { selectDatasets } from '../../redux/features/userSlice';

const DataViewComponent: React.FC<{
    isDialog?: boolean,
    setSelectedRowPath?: (path: string) => void
}>
    = ({ isDialog, setSelectedRowPath }) => {
        const dataSets = useSelector(selectDatasets) ?? [];
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
                id: dataset.objectName,
                name: getFileNameFromPath(dataset.objectName),
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
                flex: 1.2,
            },
            {
                field: 'path',
                headerName: 'Path',
                flex: 1,
            },
            {
                field: 'type',
                headerName: 'Origin',
                flex: 1,
                renderCell: (params: GridCellParams) => {
                    const { value } = params;
                    return (
                        <>
                            {value === DatasetType.User && (
                                <Chip variant="outlined" color="secondary" icon={<FaceIcon />} label='User' />
                            )}
                            {value === DatasetType.Public && (
                                <Chip variant="outlined" color="primary" icon={<PublicIcon />} label="Public" />
                            )}
                        </>
                    );

                }
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
            <>
                {isDialog ? (
                    <JobsTable
                        tableType='dialog'
                        columns={DatasetsColumns}
                        rows={DatasetsRows}
                        setSelectedRowId={setSelectedRowPath}
                    />
                ) : (
                    <ContentPaper>
                        <Container>
                            <JobsTable
                                tableType='dataset'
                                columns={DatasetsColumns}
                                rows={DatasetsRows}
                            />
                        </Container>
                    </ContentPaper>
                )}
            </>
        );
    }

export default DataViewComponent
