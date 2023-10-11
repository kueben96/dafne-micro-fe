import { Box, Button, InputBase, Theme, styled, useTheme } from '@mui/material';
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { selectJobs } from '../redux/features/userSlice';
import { JobState } from '../types/enums';

const SearchBox = styled(Box)<{ theme: Theme }>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.palette.gray?.light}`,
    borderRadius: 0,
}));

const SearchInput = styled(InputBase)(({ theme }) => {
    return {
        marginLeft: theme.spacing(1),
        flex: 1,
        fontSize: theme.typography.body1.fontSize,
    }
});


const SearchIconWrapper = styled(Box)<{ theme: Theme }>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(6),
    height: '100%',
    borderLeft: `1px solid ${theme.palette?.gray?.light}`,
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
        backgroundColor: theme.palette.common?.white,
    },
}));

interface StyledFilterBadgeProps {
    selected?: boolean;
    theme: Theme;
}

const StyledFilterBadge = styled(Box)<StyledFilterBadgeProps>(({ selected, theme }) => ({
    borderRadius: "20px",
    height: "100%",
    width: "100%",
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette?.common?.white,
    marginLeft: theme.spacing(1),
    padding: theme.spacing(0.2, 1),
    backgroundColor: selected ? theme.palette.secondary?.main : theme.palette.gray?.light,
}));

interface FilterButtonProps {
    theme: Theme;
    selected: boolean;
    count: number;
    label: string;
    children: React.ReactNode;
    onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ theme, selected, count, children, ...rest }) => (
    <StyledFilterButton className={selected ? 'selected' : ''} {...rest}>
        {children}
        <StyledFilterBadge selected={selected} theme={theme}>{count}</StyledFilterBadge>
    </StyledFilterButton>
);

// TODO: implement table toolbar search functionality

const TableToolBar: React.FC<{
    selectedFilter: string;
    handleFilterJobs: (filter: string) => void
}> = ({ handleFilterJobs }) => {

    const theme = useTheme()

    const [selected, setSelected] = useState(0);
    const userJobs = useSelector(selectJobs)
    const allCounts = userJobs?.length ?? 0;
    const runningCounts = userJobs?.filter(job => job.status === JobState.Running).length ?? 0;
    const completedCounts = userJobs?.filter(job => job.status === JobState.Completed).length ?? 0;

    const filters = [
        { label: 'All', state: JobState.All, count: allCounts },
        { label: 'Running', state: JobState.Running, count: runningCounts },
        { label: 'Completed', state: JobState.Completed, count: completedCounts },
    ];

    const handleFilterClick = (index: number) => {
        setSelected(prevSelected => {
            if (prevSelected === index) {
                return prevSelected;
            }
            return index;
        });
        handleFilterJobs(filters[index].state)
    };
    const buttonStyles = {
        fontSize: theme.typography.body1
    };



    return (
        <Box display="flex" flexDirection="row" justifyContent="space-between" sx={{ fontSize: theme.typography.body1 }}>
            <Box display="flex" flexDirection="row" sx={{ backgroundColor: theme.palette.gray?.lighter, borderRadius: "3px" }}>
                {filters.map((filter, index) => (
                    <FilterButton
                        theme={theme}
                        key={index}
                        selected={selected === index}
                        count={filter.count}
                        label={filter.label}
                        onClick={() => handleFilterClick(index)}
                    >{filter.label}</FilterButton>
                ))}
            </Box>
            <SearchBox theme={theme}>
                <SearchInput placeholder="Search..." />
                <SearchIconWrapper theme={theme}>
                    <SearchIcon style={{ color: theme.palette.gray?.light }} />
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