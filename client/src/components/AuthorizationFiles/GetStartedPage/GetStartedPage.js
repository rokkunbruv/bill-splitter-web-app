import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import GetStartedBG from '../../Backgrounds/GetStartedBg.svg'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const GetStartedPage = () => {
    // const navigate = useNavigate();
    // // const SignUpPage = () => {
    //     navigate(`/sign-up-page`);
    // }

    return (
        <div 
            style={{ 
                backgroundImage: `url(${GetStartedBG})`, 
                backgroundSize: 'cover',   // Ensures the image covers the container
                backgroundPosition: 'center',  // Centers the background image
                backgroundRepeat: 'no-repeat', // Prevents repeating the background image
                height: '100vh',   // Full viewport height
                width: '100vw',    // Full viewport width
                position: 'fixed', // Fixed positioning to stay in place
                top: 0,
                left: 0,
                margin: 0,      
                padding: 0,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: '#070F2B'
            }}
        >
            <div
                style={{
                    position: 'absolute', // Absolute positioning within the fixed container
                    bottom: '110px', // Distance from the bottom of the container
                    left: '25px', // Distance from the left of the container
                    display: 'flex',
                    flexDirection: 'column', // Stack Typography and Button vertically
                    alignItems: 'flex-start' // Align items to the start (left side)
                }}>
                <Typography variant='h7' fontWeight='bold' color='#FDF8F8' fontSize='65px'>

                    BillSplit 
                </Typography>
                <Button component={Link} to={`/sign-up-page`} variant="contained" color="secondary" style={{ 
                    backgroundColor:'#9290C3',
                    borderRadius: '15px',
                    marginTop: '10px',
                    fontWeight: 'bold',
                    '&:hover': {backgroundColor: '#9290C3'}
                    }}>
                    Get Started!
                </Button>
            </div>
        </div>
    );
};

export default GetStartedPage;
