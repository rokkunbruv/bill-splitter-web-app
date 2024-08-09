// /components/BottomNavigator/BottomNavigator.js
import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, Button } from '@mui/material';
import {ReactComponent as HomeIconDefault} from '../icons/home.svg';
import {ReactComponent as HomeIconSelected} from '../icons/homeSelected.svg';
import {ReactComponent as AddIconDefault} from '../icons/add.svg';
import {ReactComponent as HistoryIconDefault} from '../icons/history.svg';
import {ReactComponent as HistoryIconSelected} from '../icons/historySelected.svg';
import {ReactComponent as ProfileDefault} from '../icons/profile1.svg';
import {ReactComponent as GroupIconDefault} from '../icons/group.svg';
import {ReactComponent as GroupIconSelected} from '../icons/groupSelected.svg';
import { useNavigate } from 'react-router-dom';
import '../BottomNavigator/styles.css';

const BottomNavigator = () => {
    const [value, setValue] = React.useState(0);
    const [showNewButtons, setShowNewButtons] = React.useState(false);
    const navigate = useNavigate();

    const handleNavigation = (newValue) => {
        setValue(newValue);
        setShowNewButtons(false);
        switch (newValue) {
            case 0:
                navigate('/');
                break;
            case 1:
                navigate('/receipts');
                break;
            case 2:
                //navigate('/add-receipt');
                setShowNewButtons(!showNewButtons);
                break;
            case 3:
                navigate('/members');
                break;
            case 4:
                navigate('/profile');
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
                <BottomNavigation value={value} onChange={(event, newValue) => handleNavigation(newValue)} className='bottom-nav-action'>
                    <BottomNavigationAction label="Home"  icon={value === 0 ? <HomeIconSelected /> : <HomeIconDefault />} className={value === 0 ? 'HomeIconSelected' : 'HomeIconDefault'} />
                    <BottomNavigationAction label="History" icon={value === 1 ? <HistoryIconSelected /> : <HistoryIconDefault />} className={value === 1 ? 'HistoryIconSelected' : 'HistoryIconDefault'} />
                    <BottomNavigationAction icon={<AddIconDefault />} className='AddIcon'/>
                    <BottomNavigationAction label="Friends" icon={value === 3 ? <GroupIconSelected /> : <GroupIconDefault />} />
                    <BottomNavigationAction label="Profile" icon={<ProfileDefault />} className='ProfileIcon'/>
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