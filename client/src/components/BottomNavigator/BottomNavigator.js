// /components/BottomNavigator/BottomNavigator.js
import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import {ReactComponent as HomeIconDefault} from '../icons/home.svg';
import {ReactComponent as HomeIconSelected} from '../icons/homeSelected.svg';
import {ReactComponent as AddIconDefault} from '../icons/add.svg';
import {ReactComponent as HistoryIconDefault} from '../icons/history.svg';
import {ReactComponent as HistoryIconSelected} from '../icons/historySelected.svg';
import {ReactComponent as ProfileDefault} from '../icons/profile1.svg';
import {ReactComponent as GroupIconDefault} from '../icons/group.svg';
import {ReactComponent as GroupIconSelected} from '../icons/groupSelected.svg';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

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
            <BottomNavigation value={value} onChange={(event, newValue) => handleNavigation(newValue)} className='bottom-nav-action'>
                <BottomNavigationAction label="Home"  icon={value === 0 ? <HomeIconSelected /> : <HomeIconDefault />} className={value === 0 ? 'HomeIconSelected' : 'HomeIconDefault'} />
                <BottomNavigationAction label="History" icon={value === 1 ? <HistoryIconSelected /> : <HistoryIconDefault />} className={value === 1 ? 'HistoryIconSelected' : 'HistoryIconDefault'} />
                <BottomNavigationAction icon={<AddIconDefault />} className='AddIcon'/>
                <BottomNavigationAction label="Members" icon={value === 3 ? <GroupIconSelected /> : <GroupIconDefault />} />
                <BottomNavigationAction label="Profile" icon={<ProfileDefault />} className='ProfileIcon'/>
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNavigator;