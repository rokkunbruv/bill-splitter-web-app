// import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, Box, Typography, IconButton, Button, TextField, Container } from '@mui/material';
import { ReactComponent as Confetti } from '../icons/confetti.svg';
import { ReactComponent as CompleteBadge } from '../icons/billCompleteBadge.svg';
import { ReactComponent as CloseIcon } from '../icons/closeIcon.svg';

const YippieDrawer = ({ open, onClose }) => {
    const navigate = useNavigate();
    const backToReceipts = () => {
        navigate(`/receipts`);
    };

    const viewDetails = () => {
        navigate(`/view-details`)
    };

    return (
        <Drawer anchor='bottom' open={open} onClose={onClose} 
            sx={{
                '& .MuiDrawer-paper': {
                    height: '100%',  // Make the drawer fit the screen
                    width: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 0
                },
            }}>
            <Box sx={{width: '100%',  height: '100%',display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem'}}>
                <header
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                        height: '80%',
                        maxHeight: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        position: 'relative',
                        margin: '-15rem 0 26.5rem 0',
                        zIndex: 1,
                    }}
                >
                    <Confetti style={{ width: '100%', maxWidth: '100%', height: '100%', maxHeight: '100%'}} />
                </header>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '100%',
                        height: '65%',
                        margin: '5rem 0',
                        position: 'absolute',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <CompleteBadge style={{ width: '100%', height: '80%'}} />
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2, gap: 1}}>
                        <Typography variant='h4' fontWeight='bold'>Yippie!</Typography>
                        <Typography variant='h7' >Bill split has been completed for:</Typography>
                        <Typography variant='h7' >----basta card sa event keme diri----</Typography>
                    </Box>
                </Box>
                <footer style={{display: 'flex', flexDirection: 'column', margin: '-14rem', gap: '1rem'}}>
                    <Button 
                        variant='contained' 
                        color='secondary' 
                        sx={{backgroundColor: '#535C91', '&:hover': {backgroundColor: '#535C91', fontFamily: 'Urbanist, sans-serif'}}}
                        onClick = {viewDetails}
                    >
                        View Details
                    </Button>
                    <IconButton
                        aria-label="close" 
                        onClick={backToReceipts}
                    >
                        <CloseIcon/>
                    </IconButton>
                </footer>
            </Box>
        </Drawer>
    )
};

export default YippieDrawer;