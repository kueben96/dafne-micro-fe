import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { Typography } from '@mui/material';

const CustomStepIcon = ({ active, completed, icon, theme }) => {

    console.log(active)
    const activeColor = theme.palette.primary.dark;
    const inactiveColor = theme.palette.grey[300];
    const completedColor = theme.palette.primary.dark;
    const borderColor = active ? activeColor : completed ? completedColor : inactiveColor;
    const iconColor = active ? theme.palette.neutral.white : completed ? completedColor : theme.palette.grey.light;
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {completed ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', border: `1px solid ${borderColor}` }}>
                    <CheckIcon style={{ fontSize: 18, color: completedColor }} />
                </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', backgroundColor: active ? activeColor : 'transparent', border: `2px solid ${borderColor}` }}>
                    <Typography variant="body1" style={{ color: iconColor }}>{icon}</Typography>
                </div>
            )}
        </div>
    );
};

export default CustomStepIcon;