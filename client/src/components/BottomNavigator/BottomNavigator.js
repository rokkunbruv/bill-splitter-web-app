// /components/BottomNavigator/BottomNavigator.js
import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';

const BottomNavigator = () => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    const handleNavigation = (newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigate('/');
                break;
            case 1:
                navigate('/receipts');
                break;
            case 2:
                navigate('/add-receipt');
                break;
            case 3:
                navigate('/members');
                break;
            case 4:
                navigate('/account');
                break;
            default:
                navigate('/');
        }
    };

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation value={value} onChange={(event, newValue) => handleNavigation(newValue)}>
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Receipts" icon={<ListAltIcon />} />
                <BottomNavigationAction label="Add" icon={<AddCircleIcon />} />
                <BottomNavigationAction label="Members" icon={<GroupIcon />} />
                <BottomNavigationAction label="Account" icon={<AccountCircleIcon />} />
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNavigator;