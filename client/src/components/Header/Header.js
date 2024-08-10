
import React from 'react';
import { AppBar, Typography } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    const authPaths = [
        "/", "/sign-up-page", "/verify-email", "/sign-in-page",
        "/forgot-password", "/verify-password-code", "/reset-password", "/welcome",
        "/password-success"
    ]

    if (authPaths.some(path => location.pathname === path)) {
        return null;
    }
    
    return (
        <AppBar 
          position='fixed' 
          color='inherit'
          sx={{ height: '4rem', backgroundColor: '#C8C7E0', borderRadius: 0, margin: '0', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '60%'}}>
            <Typography component={Link} to="/" align='center' variant= 'h7' sx={{ color: 'rgba(7, 15, 43, 1)', textDecoration: 'none', fontWeight: '550', fontSize: '2.5rem', letterSpacing: '0.02em' }} >
              BillSplit
            </Typography>
            {/* add notif icon - maka navigate to notif page */}
        </AppBar>
    );
}

export default Header;