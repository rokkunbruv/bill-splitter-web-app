import React, { useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Button, Grid, Box, TextField } from '@mui/material';
import { getReceipts } from '../../actions/receipts';

import YippieDrawer from '../YippieDrawer/YippieDrawer';

const FinalSplit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [yippieDrawerOpen, setYippieDrawerOpen] = useState(false);
    const receipt = useSelector((state) => state.receipts.find((r) => r._id === id));

    useEffect(() => {
        if (!receipt) {
            dispatch(getReceipts());
        }
    }, [dispatch, receipt]);

    if (!receipt) return 'Loading...';

    // Check if usersWithItems exists and is an array
    const usersWithItems = Array.isArray(receipt.usersWithItems) ? receipt.usersWithItems : [];

    const handleYippieDrawerOpen = () => {
        setYippieDrawerOpen(true);
    };

    const handleYippieDrawerClose = () => {
        setYippieDrawerOpen(false);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Final Split: {receipt.event}</Typography>
            <Grid container spacing={3}>
                {usersWithItems.map((user, index) => {
                    // Calculate total for each user
                    const userTotal = Array.isArray(user.items) 
                        ? user.items.reduce((total, item) => total + (item.quantity * item.price), 0)
                        : 0;

                    return (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{user.userName || `User ${index + 1}`}</Typography>
                                    <Typography variant="h5" color="primary">
                                        Total: ${userTotal.toFixed(2)}
                                    </Typography>
                                    {Array.isArray(user.items) && user.items.map((item, itemIndex) => {
                                        const itemTotal = item.quantity * item.price;
                                        return (
                                            <Typography key={itemIndex}>
                                                {item.name}: ${itemTotal.toFixed(2)} 
                                                ({item.quantity || 0} x ${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'})
                                            </Typography>
                                        );
                                    })}
                                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.4rem'}}>
                                        <Typography>Share</Typography>
                                        <TextField id="outlined-number"
                                                    type="number"
                                                    placeholder="Enter Amount"
                                                    size="small"
                                                    color="secondary"
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <Button onClick={handleYippieDrawerOpen} variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Finish
            </Button>
            <YippieDrawer
                open={yippieDrawerOpen}
                onClose={handleYippieDrawerClose}
            />
        </div>
    );
};

export default FinalSplit;