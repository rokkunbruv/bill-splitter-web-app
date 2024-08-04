import React, { useState, useEffect } from 'react';
import { Drawer, Box, Typography, IconButton, Button } from '@mui/material';
import { ReactComponent as DecreaseQty } from '../icons/decrease.svg';
import { ReactComponent as IncreaseQty } from '../icons/increase.svg';

const SplitDetailDrawer = ({ open, onClose, itemName, user, quantity, onQuantityChange, maxQuantity }) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    useEffect(() => {
        if (open) {
            setCurrentQuantity(quantity);
            console.log(`Drawer opened. Initial quantity: ${quantity}, Max quantity: ${maxQuantity}`);
        }
    }, [open, quantity, maxQuantity]);

    const handleIncrease = () => {
        console.log(`Increasing. Current: ${currentQuantity}, Max: ${maxQuantity}`);
        if (currentQuantity < maxQuantity) {
            setCurrentQuantity(prev => {
                const newValue = Math.min(maxQuantity, prev + 1);
                console.log(`Increased to: ${newValue}`);
                return newValue;
            });
        }
    };

    const handleDecrease = () => {
        console.log(`Decreasing. Current: ${currentQuantity}`);
        setCurrentQuantity(prev => {
            const newValue = Math.max(0, prev - 1);
            console.log(`Decreased to: ${newValue}`);
            return newValue;
        });
    };

    const handleDone = () => {
        onQuantityChange(currentQuantity);
        onClose();
    };

    return (
        <Drawer anchor='bottom' open={open} onClose={onClose}>
            <Box sx={{ padding:'2rem 2rem 2rem 1.5rem' , display: 'flex', flexDirection: 'column', gap: 5}}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '5rem'}}>
                    <Typography variant="h7" fontWeight='bold' padding={1.3} fontSize= '30px'>{user}</Typography>
                </Box>
                <Box display="flex" flexDirection="row" gap={0} alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>
                        <IconButton 
                            aria-label="decrease" 
                            // onClick={handleDecrease}
                            onClick={() => {
                                console.log('Decrease clicked');
                                handleDecrease();
                            }}
                            disabled={currentQuantity <= 0}
                        >
                            <DecreaseQty width="30" height="30"/>
                        </IconButton>
                        <Typography variant="h4">{currentQuantity}</Typography>
                        <IconButton 
                            aria-label="increase" 
                            // onClick={handleIncrease}
                            onClick={() => {
                                console.log('Increase clicked');
                                handleIncrease();
                            }}
                            disabled={currentQuantity >= maxQuantity}
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