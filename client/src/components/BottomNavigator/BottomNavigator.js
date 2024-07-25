// /components/BottomNavigator/BottomNavigator.js
import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';

const BottomNavigator = () => {
    const [value, setValue] = React.useState(0);
    const [showNewButtons, setShowNewButtons] = React.useState(false);
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
                // navigate('/add-receipt');
                setShowNewButtons(!showNewButtons);
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

    const handleAddReceipt = () => {
        navigate('/add-receipt');
        setShowNewButtons(false);
    };

    const handleTakePhoto = () => {
        navigate('/take-photo');
        setShowNewButtons(false);
    };

    return (
        <div>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation value={value} onChange={(event, newValue) => handleNavigation(newValue)}>
                    <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                    <BottomNavigationAction label="Receipts" icon={<ListAltIcon />} />
                    <BottomNavigationAction label="Add" icon={<AddCircleIcon />} />
                    <BottomNavigationAction label="Members" icon={<GroupIcon />} />
                    <BottomNavigationAction label="Account" icon={<AccountCircleIcon />} />
                </BottomNavigation>
            </Paper>
            {showNewButtons && (
                <div style={{ position: 'fixed', bottom: 60, left: '50%', transform: 'translateX(-50%)' }}>
                    <Button variant="contained" color="primary" style={{ margin: '5px' }} onClick={handleAddReceipt}>
                        Add Receipt
                    </Button>
                    <Button variant="contained" color="secondary" style={{ margin: '5px' }} onClick={handleTakePhoto}>
                        Take a pic
                    </Button>
                </div>
            )}
        </div>
    );
};

export default BottomNavigator;