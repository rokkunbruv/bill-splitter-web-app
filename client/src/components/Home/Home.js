import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
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
                    <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                    <BottomNavigationAction label="Add" icon={<AddCircleIcon />} />
                    <BottomNavigationAction label="Receipts" icon={<ListAltIcon />} />
                    <BottomNavigationAction label="Members" icon={<GroupIcon />} />
                    <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
};

export default Home;
