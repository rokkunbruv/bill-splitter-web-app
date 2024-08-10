import React, { useEffect } from 'react';
import { Drawer, Card, Box, Typography, IconButton, Grid, AppBar } from '@mui/material';
import { ReactComponent as CloseIcon } from '../icons/closeIcon.svg';
import { useNavigate } from 'react-router-dom';

const ViewDetails = ({ open, onClose, receipt, shareAmounts }) => {
    const navigate = useNavigate();
    
    // redirects to getting started page when user isn't authenticated
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("token");
        
        if (!isAuthenticated) {
            navigate("/");
        }
    });

    const usersWithItems = Array.isArray(receipt.usersWithItems) ? receipt.usersWithItems : [];

    // Calculate total bill
    const totalBill = usersWithItems.reduce((total, user) => {
        const userTotal = Array.isArray(user.items)
            ? user.items.reduce((userTotal, item) => userTotal + (item.quantity * item.price), 0)
            : 0;
        return total + userTotal;
    }, 0);

    // Calculate total shared amount
    const shareAmountsArray = Object.values(shareAmounts);
    const totalSharedAmount = shareAmountsArray.reduce((total, amount) => total + parseFloat(amount) || 0, 0);

    // Calculate total change
    const totalChange = totalSharedAmount - totalBill;

    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            sx={{ '& .MuiDrawer-paper': { 
                    width: '100%',
                    height: '100%'
                }}}
        >
            <Box sx={{ padding: 2 }}>
            <AppBar
                    sx={{
                        width: '100%',
                        height: '10%',
                        bgcolor: '#C8C7E0',
                        margin: '0 0 37.5rem 0',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'fixed',
                        zIndex: 1,
                        color: '#070F2B',
                        gap: 2,
                        padding: 2 
                    }}
                >
                    <IconButton onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h7" gutterBottom>View Details</Typography>
                </AppBar>
                <Grid container spacing={2} sx={{ marginTop: 8 }}>
                    <Grid item xs={12}>
                        <Card sx={{
                                padding: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'left',
                                justifyContent: 'center',
                                fontSize: '22px',
                                fontWeight: 'bold'
                            }}
                        >
                            <Typography variant="h7"sx={{ textAlign: 'left', fontSize: '30px'}}>{receipt.event}</Typography>
                            <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Typography variant="h7" sx={{opacity: '0.5'}}>Total Bill</Typography>
                                <Typography variant="h7">{totalBill.toFixed(2)}</Typography>
                            </Box>
                            <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Typography variant="h7" sx={{opacity: '0.5'}}>Total Share</Typography>
                                <Typography variant="h7">{totalSharedAmount.toFixed(2)}</Typography>
                            </Box>
                            <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Typography variant="h7" sx={{opacity: '0.5'}}>Total Change</Typography>
                                <Typography variant="h7">{totalChange.toFixed(2)}</Typography>
                            </Box>
                            <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Typography variant="h7" sx={{opacity: '0.5'}}>Status</Typography>
                                <Typography variant="h7" color= 'success.main'>(Status diri!)</Typography>
                            </Box>
                        </Card>
                    </Grid>

                    <Card sx={{
                                padding: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
                                justifyContent: 'flex-start',
                                fontSize: '22px',
                                fontWeight: 'bold',
                                gap: 2,
                                width: '95%',
                                marginLeft: 2,
                                marginTop: 2
                            }}
    
                    >
                        <Typography variant="h7"sx={{ textAlign: 'left', fontSize: '30px'}}>Member Report</Typography>
                        {usersWithItems.map((user, index) => {
                            const userTotal = Array.isArray(user.items)
                                ? user.items.reduce((total, item) => total + (item.quantity * item.price), 0)
                                : 0;
                            const userShare = parseFloat(shareAmounts[index]) || 0;
                            const userChange = userShare - userTotal;

                            return (
                                <Grid item xs={12} key={index}>
                                    <Card sx={{ padding: 2, boxShadow: 3, borderRadius: '8px' }}>
                                        <Typography variant="h7" fontWeight='bold' fontSize='20px'>{user.userName || `User ${index + 1}`}</Typography>
                                        {Array.isArray(user.items) && user.items.map((item, itemIndex) => (
                                            <Typography key={itemIndex}>
                                                {item.name}: ${item.quantity * item.price} ({item.quantity} x ${item.price.toFixed(2)})
                                            </Typography>
                                        ))}
                                        <Typography variant="h7" fontWeight='bold' fontSize='20px' color="primary">
                                            Total: ${userTotal.toFixed(2)}
                                        </Typography>
                                        <Typography>Share: ${userShare.toFixed(2)}</Typography>
                                        <Typography>Change: ${userChange.toFixed(2)}</Typography>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Card>
                </Grid>
            </Box>
        </Drawer>
    );
};

export default ViewDetails;
