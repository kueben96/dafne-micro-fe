import { useTheme } from '@emotion/react';
import { Box, Button, InputBase, styled } from '@mui/material';
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

const SearchBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 0,
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: theme.typography.medium.fontSize,
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
    borderRadius: "3px",
    margin: theme.spacing(0.3),
    cursor: 'pointer',
    padding: theme.spacing(0.5),
    '&:hover': {
        backgroundColor: 'transparent',
    },
    '&.selected': {
        backgroundColor: theme.palette.neutral.white,
    },
}));
const StyledFilterBadge = styled(Box)(({ theme, selected }) => ({
    borderRadius: "20px",
    height: "100%",
    width: "100%",
    fontSize: theme.typography.medium,
    color: theme.palette.neutral.white,
    marginLeft: theme.spacing(1),
    padding: theme.spacing(0.2, 1),
    backgroundColor: selected ? theme.palette.secondary.main : theme.palette.grey.light,

}));

const FilterButton = ({ selected, count, children, label, ...rest }) => (
    <StyledFilterButton className={selected ? 'selected' : ''} {...rest}>
        {children}
        <StyledFilterBadge selected={selected}>{count}</StyledFilterBadge>
    </StyledFilterButton>
);


const TableToolBar = (props) => {

    const theme = useTheme()

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
    const buttonStyles = {
        fontSize: theme.typography.medium
    };



    return (
        <Box display="flex" flexDirection="row" justifyContent="space-between" sx={{ fontSize: theme.typography.medium }}>
            <Box display="flex" flexDirection="row" sx={{ backgroundColor: theme.palette.grey.lighter, borderRadius: "3px" }}>
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
                <Button sx={{ ...buttonStyles, marginRight: theme.spacing(0.5) }} variant="outlined"><DeleteIcon /></Button>
                <Button sx={buttonStyles} variant="contained"
                    startIcon={<AddIcon />}>
                    Add new
                </Button>

            </Box>

        </Box>
    )
}

export default TableToolBar