import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import GetStartedBG from '../../Backgrounds/GetStartedBg.svg'; 
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyToken } from '../../../actions/auth';

const GetStartedPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // // const SignUpPage = () => {
    //     navigate(`/sign-up-page`);
    // }

    const handleClick = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem("user");

        if (!token) {
            return navigate('sign-in-page');
        }

        const response = await dispatch(verifyToken(token));

        if (response.payload.valid) {
            return navigate('/home');
        } 
        if (!response.payload.valid) {
            return navigate('/sign-up-page');
        }
        console.error('An unexpected error has occurred.');
    }

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
                <Button variant="contained" color="secondary" onClick={handleClick} style={{ 
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
