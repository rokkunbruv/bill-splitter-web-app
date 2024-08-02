import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Button, Grid, Box, TextField, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Slider from 'react-slick';
import { getReceipts, updateReceiptSplit, createReceipt } from '../../actions/receipts';
import { getMembers } from '../../actions/members';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ReactComponent as RoundedArrowLeft } from '../icons/roundedArrowLeft.svg';
import { ReactComponent as RoundedArrowRight } from '../icons/roundedArrowRight.svg';
import QuantityDrawer from '../SplitDetailDrawer/SplitDetailDrawer';

const SplitReceipt = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const receipt = useSelector((state) => state.receipts.find((r) => r._id === id));
    const members = useSelector((state) => state.members);

    const [splitItems, setSplitItems] = useState({});
    const [splitDrawerOpen, setSplitDrawerOpen] = useState(false);
    const [selectedItemName, setSelectedItemName] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [receiptData, setReceiptData] = useState({ event: '', users: [] });

    useEffect(() => {
        dispatch(getMembers());
    }, [dispatch]);

    useEffect(() => {
        if (!receipt) {
            dispatch(getReceipts());
        } else {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createReceipt(receiptData));
        clear();
        navigate('/');
    };

    const clear = () => {
        setReceiptData({ event: '', uploadedFile: '', users: [] });
    };

    const handleMemberSelectChange = (e) => {
        const { value } = e.target;
        setSelectedMembers(value);
        setReceiptData({ ...receiptData, users: value });
    };

    const handleQuantityChange = (itemName, user, value) => {
        const maxQuantity = receipt.gptCopy.items.find(item => item.name === itemName).quantity;
        const adjustedQuantity = Math.min(Math.max(0, value), maxQuantity);
        setSplitItems(prev => ({
            ...prev,
            [itemName]: {
                ...prev[itemName],
                [user]: adjustedQuantity
            }
        }));
    };

    const handleSplitDrawerOpen = (itemName, user, currentQuantity) => {
        setSelectedItemName(itemName);
        setSelectedUser(user);
        setQuantity(currentQuantity);
        setSplitDrawerOpen(true);
    };

    const handleSplitDrawerClose = () => {
        setSplitDrawerOpen(false);
    };

    const handleQuantityUpdate = (newQuantity) => {
        handleQuantityChange(selectedItemName, selectedUser, newQuantity);
        handleSplitDrawerClose();
    };

    const handleSplitReceipt = () => {
        const usersSplit = selectedMembers.reduce((acc, user) => {
            acc[user] = { items: [], total: 0 };
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

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <RoundedArrowLeft />,
        nextArrow: <RoundedArrowRight />,
    };

    if (!receipt) return 'Loading...';

    return (
        <div style={{ padding: '1.5rem' }}>
            <Typography variant="h4" gutterBottom>Split Receipt: {receipt.event}</Typography>

            <Paper sx={{ padding: 2 }}>
                <form autoComplete='on' noValidate onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Select Members</InputLabel>
                        <Select
                            multiple
                            value={selectedMembers}
                            onChange={handleMemberSelectChange}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {members.map((member) => (
                                <MenuItem key={member._id} value={member.name}>
                                    {member.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </form>
            </Paper>

            <Slider {...sliderSettings} style={{ m: 1, display: 'flex', flexDirection: 'row', padding: '0 0.1rem 0 0.1rem' }}>
                {receipt.gptCopy.items.map((item) => (
                    <div key={item.name} style={{ padding: '0 1rem' }}>
                        <Card sx={{ margin: 1 }}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography>Price: ${item.price.toFixed(2)} | Quantity: {item.quantity}</Typography>
                                <Grid container spacing={2}>
                                    {selectedMembers.map((user) => (
                                        <Grid item xs={12} sm={6} md={4} key={user}>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                fullWidth
                                                onClick={() => handleSplitDrawerOpen(item.name, user, splitItems[item.name]?.[user] || 0)}
                                            >
                                                {user}: {splitItems[item.name]?.[user] || 0}
                                            </Button>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </Slider>

            <Button variant="contained" color="primary" onClick={handleSplitReceipt} sx={{ mt: 6, backgroundColor: '#535C91', opacity: 0.85, '&:hover': { backgroundColor: '#535C91', opacity: 1, fontFamily: 'Urbanist' } }} fullWidth>
                Continue
            </Button>
            <QuantityDrawer
                open={splitDrawerOpen}
                onClose={handleSplitDrawerClose}
                itemName={selectedItemName}
                user={selectedUser}
                quantity={quantity}
                onQuantityChange={handleQuantityUpdate}
            />
        </div>
    );
};

export default SplitReceipt;
