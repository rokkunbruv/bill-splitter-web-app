import React, { useState, useEffect } from 'react';
import { Drawer, Box, Typography, IconButton, Button, TextField, Container } from '@mui/material';
import { ReactComponent as DecreaseQty } from '../icons/decrease.svg';
import { ReactComponent as IncreaseQty } from '../icons/increase.svg';

const SplitDetailDrawer = ({ open, onClose, itemName, user, quantity, onQuantityChange }) => {
    const [hasAdjusted, setHasAdjusted] = useState(false);
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    // Reset quantity when drawer is opened for a different user/item
    useEffect(() => {
        if (open) {
            setCurrentQuantity(quantity);
            setHasAdjusted(false); 
        }
    }, [open, quantity]);

    const handleIncrease = () => {
        if (!hasAdjusted) {
            setCurrentQuantity(prev => prev + 1);
            setHasAdjusted(false);
        }
        // add condition to show warning message when the set quantity exceeds original quantity
    };

    const handleDecrease = () => {
        if (!hasAdjusted) {
            setCurrentQuantity(prev => Math.max(0, prev - 1));
            setHasAdjusted(false);
        }
    };

    const handleDone = () => {
        onQuantityChange(currentQuantity);
        onClose();
    };

    return (
        <Drawer anchor='bottom' open={open} onClose={onClose}>
            <Box sx={{ padding:'2rem 2rem 2rem 1.5rem' , display: 'flex', flexDirection: 'column', gap: 5}}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '5rem'}}>
                    <Typography variant="h6" fontWeight='550' padding={1.3}>{user}</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '1.2rem'}}>
                            <Typography>To pay</Typography>
                            <Typography fontWeight='bold'>0.00</Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.4rem'}}>
                            <Typography>Share</Typography>
                            <TextField id="outlined-number"
                                        type="number"
                                        placeholder="Enter Amount"
                                        size="small"
                                        color="secondary"
                            />
                        </Box>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" gap={0} alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>
                        <IconButton 
                            aria-label="decrease" 
                            onClick={handleDecrease}
                            disabled={hasAdjusted}
                        >
                            <DecreaseQty width="30" height="30"/>
                        </IconButton>
                        <Typography variant="h4">{currentQuantity}</Typography>
                        <IconButton 
                            aria-label="increase" 
                            onClick={handleIncrease}
                            disabled={hasAdjusted}
                        >
                            <IncreaseQty width="30" height="30"/>
                        </IconButton>
                    </Box>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleDone}
                        sx={{ backgroundColor:'#535C91', margin: '0 0 0 2rem', '&:hover':{backgroundColor: '#535C91'} }}
                        fullWidth
                    >
                        Done
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default SplitDetailDrawer;
