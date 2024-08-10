import React from 'react';
import { Box, Typography } from '@mui/material';
import BillSplitBG from '../../Backgrounds/BillSplitBG.svg'; 
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();

    // Function to handle click events and navigate to "../"
    const handleClick = () => {
        navigate('/home');
    };

    return (
        <div
        onClick={handleClick} // Handle click events on the whole div
            style={{ 
                backgroundImage: `url(${BillSplitBG})`, 
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
                justifyContent: 'center', // Center align horizontally
                alignItems: 'center', // Center align vertically
                backgroundColor: '#FDF8F8',
                cursor: 'pointer' // Change cursor to pointer to indicate clickability
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography 
                    variant='h7' 
                    fontSize='50px' 
                    color='#070F2B'
                    textAlign="center"
                    fontWeight='600'
                >
                    Welcome to
                </Typography>
                <Typography 
                    variant='h7' 
                    fontSize='60px' 
                    fontWeight='bold' 
                    color='#535C91'
                    textAlign="center"
                >
                    BillSplit
                </Typography>
                <Typography 
                    variant='h7' 
                    fontSize='15px' 
                    color='#070F2B'
                    textAlign="center"
                    marginTop='20px'
                >
                    Tagline
                </Typography>
            </Box>
        </div>
    );
};

export default WelcomePage;