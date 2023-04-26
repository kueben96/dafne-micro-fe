import { AppBar, Badge, Box, Button, Container, IconButton, InputBase, Typography, styled } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react'
import PageHeader from '../components/PageHeader';
import { useTheme } from '@emotion/react';
import { DataGrid } from '@mui/x-data-grid';


const ContentPaper = styled(Box)(({ theme }) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2, 0),
    background: theme.palette.neutral.white,
}));

const SearchBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 0,
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    flex: 1,
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(6),
    height: '100%',
    borderLeft: `1px solid ${theme.palette.grey[300]}`,
}));
const StyledFilterButton = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    backgroundColor: 'transparent',
    borderRadius: theme.shape.borderRadius - 0.5,
    margin: theme.spacing(0.3),
    padding: theme.spacing(1),
    '&:hover': {
        backgroundColor: 'transparent',
    },
    '&.selected': {
        backgroundColor: theme.palette.neutral.white,
    },
}));
const StyledFilterBadge = styled(Box)(({ theme, selected }) => ({
    borderRadius: "50%",
    color: theme.palette.neutral.white,
    marginLeft: theme.spacing(1),
    padding: theme.spacing(0, 0.8),
    backgroundColor: selected ? theme.palette.secondary.main : theme.palette.grey.regular,

}));

const FilterButton = ({ selected, count, children, label, ...rest }) => (
    <StyledFilterButton className={selected ? 'selected' : ''} {...rest}>
        {children}
        {/* <Typography>{label}</Typography> */}
        <StyledFilterBadge selected={selected}>{count}</StyledFilterBadge>
    </StyledFilterButton>
);



const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const ProcessesPage = (props) => {

    const [selected, setSelected] = useState(0);
    const filters = [
        { label: 'All', count: 1 },
        { label: 'Running', count: 0 },
        { label: 'Completed', count: 0 },
    ];

    const handleFilterClick = index => {
        setSelected(prevSelected => {
            if (prevSelected === index) {
                return prevSelected;
            }
            return index;
        });
    };

    const theme = useTheme()

    return (
        <>
            <PageHeader title="Dashboard" />
            <ContentPaper>
                <Container>
                    <Box display="flex" flexDirection="column">
                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                            <Box display="flex" flexDirection="row" sx={{ backgroundColor: theme.palette.grey.lighter }}>
                                {filters.map((filter, index) => (
                                    <FilterButton
                                        key={index}
                                        selected={selected === index}
                                        count={filter.count}
                                        label={filter.label}
                                        onClick={() => handleFilterClick(index)}
                                    >{filter.label}</FilterButton>
                                ))}
                            </Box>
                            <SearchBox {...props}>
                                <SearchInput placeholder="Search..." />
                                <SearchIconWrapper>
                                    <SearchIcon style={{ color: theme.palette.grey['300'] }} />
                                </SearchIconWrapper>
                            </SearchBox>
                            <Box>
                                <Button sx={{ marginRight: theme.spacing(0.5) }} variant="outlined"><DeleteIcon /></Button>
                                <Button variant="contained"
                                    startIcon={<AddIcon />}>
                                    Add new
                                </Button>

                            </Box>

                        </Box>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection
                                disableRowSelectionOnClick

                            />
                        </Box>

                    </Box>
                </Container>
            </ContentPaper>
            <ContentPaper>
                <Container>
                    <Box>
                        <Typography variant="h3">Quicklinks</Typography>
                    </Box>
                </Container>
            </ContentPaper>
        </>
    )
}

export default ProcessesPage