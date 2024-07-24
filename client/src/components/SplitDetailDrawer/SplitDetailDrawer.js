import React, { useState, useEffect } from 'react';
import { Drawer, Box, Typography as MuiTypography, IconButton, Button } from '@mui/material';
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
            <Box sx={{ padding:'2rem 1rem 2rem 2rem' , display: 'flex', flexDirection: 'column', gap: 2}}>
                <MuiTypography variant="h6" fontWeight='550rem' display='flex' >{user}</MuiTypography>
                <Box display="flex" flexDirection="row" gap={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <IconButton 
                            aria-label="decrease" 
                            onClick={handleDecrease}
                            disabled={hasAdjusted}
                        >
                            <DecreaseQty />
                        </IconButton>
                        <MuiTypography variant="body1">{currentQuantity}</MuiTypography>
                        <IconButton 
                            aria-label="increase" 
                            onClick={handleIncrease}
                            disabled={hasAdjusted}
                        >
                            <IncreaseQty />
                        </IconButton>
                    </Box>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleDone}
                        sx={{ backgroundColor:'#535C91' }}
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
