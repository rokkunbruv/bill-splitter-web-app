import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Button, TextField, Grid } from '@mui/material';
import { getReceipts, updateReceiptSplit } from '../../actions/receipts';

const SplitReceipt = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const receipt = useSelector((state) => state.receipts.find((r) => r._id === id));
    const [splitItems, setSplitItems] = useState({});

    useEffect(() => {
        if (!receipt) {
            dispatch(getReceipts());
        } else {
            // Initialize splitItems with current receipt data
            const initialSplitItems = receipt.gptCopy.items.reduce((acc, item) => {
                acc[item.name] = (receipt.usersWithItems || []).reduce((userAcc, user) => {
                    userAcc[user.userName] = 0;
                    return userAcc;
                }, {});
                return acc;
            }, {});
            setSplitItems(initialSplitItems);
        }
    }, [dispatch, receipt]);

    if (!receipt) return 'Loading...';

    const handleQuantityChange = (itemName, user, value) => {
        const quantity = Math.min(Math.max(0, parseInt(value) || 0), receipt.gptCopy.items.find(item => item.name === itemName).quantity);
        setSplitItems(prev => ({
            ...prev,
            [itemName]: {
                ...prev[itemName],
                [user]: quantity
            }
        }));
    };

    const handleSplitReceipt = () => {
        const usersSplit = (receipt.usersWithItems || []).reduce((acc, user) => {
            acc[user.userName] = { items: [], total: 0 };
            return acc;
        }, {});

        Object.entries(splitItems).forEach(([itemName, userQuantities]) => {
            const item = receipt.gptCopy.items.find(i => i.name === itemName);
            Object.entries(userQuantities).forEach(([user, quantity]) => {
                if (quantity > 0) {
                    const cost = item.price * quantity;
                    usersSplit[user].items.push({ ...item, quantity, cost });
                    usersSplit[user].total += cost;
                }
            });
        });

        dispatch(updateReceiptSplit(receipt._id, usersSplit));
        navigate(`/final-split/${id}`);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Split Receipt: {receipt.event}</Typography>
            {receipt.gptCopy.items.map((item) => (
                <Card key={item.name} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography>Price: ${item.price.toFixed(2)} | Quantity: {item.quantity}</Typography>
                        <Grid container spacing={2}>
                            {(receipt.usersWithItems || []).map((user) => (
                                <Grid item xs={12} sm={6} md={4} key={user.userName}>
                                    <TextField
                                        label={user.userName}
                                        type="number"
                                        value={splitItems[item.name]?.[user.userName] || ''}
                                        onChange={(e) => handleQuantityChange(item.name, user.userName, e.target.value)}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            ))}
            <Button variant="contained" color="primary" onClick={handleSplitReceipt}>
                Finalize Split
            </Button>
        </div>
    );
};

export default SplitReceipt;