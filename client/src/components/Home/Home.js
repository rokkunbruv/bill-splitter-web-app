import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, Box } from '@mui/material';
import {ReactComponent as HomeIconDefault} from '../icons/home.svg';
import {ReactComponent as HomeIconSelected} from '../icons/homeSelected.svg';
import {ReactComponent as AddIconDefault} from '../icons/add.svg';
import {ReactComponent as HistoryIconDefault} from '../icons/history.svg';
import {ReactComponent as HistoryIconSelected} from '../icons/historySelected.svg';
import {ReactComponent as ProfileDefault} from '../icons/profile1.svg';
import {ReactComponent as GroupIconDefault} from '../icons/group.svg';
import {ReactComponent as GroupIconSelected} from '../icons/groupSelected.svg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    const handleNavigation = (event, newValue) => {
        setValue(newValue);
        switch(newValue) {
            case 0:
                navigate('/');
                break;
            case 1:
                navigate('/add-receipt');
                break;
            case 2:
                navigate('/receipts');
                break;
            case 3:
                navigate('/members');
                break;
            case 4:
                navigate('/profile');
                break;
            default:
                break;
        }
    };

    return (
        <Box sx={{ pb: 7 }}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation value={value} onChange={handleNavigation}>
                    <BottomNavigationAction label="Home"  icon={value === 1 ? <HomeIconSelected /> : <HomeIconDefault />}  />
                    <BottomNavigationAction label="Receipts" icon={value === 1 ? <HistoryIconSelected /> : <HistoryIconDefault />} />
                    <BottomNavigationAction label="Add" icon={ <AddIconDefault />} />
                    <BottomNavigationAction label="Members" icon={value === 1 ? <GroupIconSelected /> : <GroupIconDefault />} />
                    <BottomNavigationAction label="Profile" icon={<ProfileDefault />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
};

export default Home;
