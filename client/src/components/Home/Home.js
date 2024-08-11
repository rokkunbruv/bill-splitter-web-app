import React, { useEffect } from 'react';
// import { BottomNavigation, BottomNavigationAction, Paper, Box } from '@mui/material';
// import {ReactComponent as HomeIconDefault} from '../icons/home.svg';
// import {ReactComponent as HomeIconSelected} from '../icons/homeSelected.svg';
// import {ReactComponent as AddIconDefault} from '../icons/add.svg';
// import {ReactComponent as HistoryIconDefault} from '../icons/history.svg';
// import {ReactComponent as HistoryIconSelected} from '../icons/historySelected.svg';
// import {ReactComponent as ProfileDefault} from '../icons/profile1.svg';
// import {ReactComponent as GroupIconDefault} from '../icons/group.svg';
// import {ReactComponent as GroupIconSelected} from '../icons/groupSelected.svg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    
    // redirects to getting started page when user isn't authenticated
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("token");
        
        if (!isAuthenticated) {
            navigate("/");
        }
    });
};

export default Home;
