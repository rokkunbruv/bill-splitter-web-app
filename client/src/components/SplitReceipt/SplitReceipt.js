import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Button, Grid, Box } from '@mui/material';
import Slider from 'react-slick';  // Import react-slick
import { getReceipts, updateReceiptSplit } from '../../actions/receipts';
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
    const [splitItems, setSplitItems] = useState({});
    const [SplitDrawerOpen, setSplitDrawerOpen] = useState(false);
    const [selectedItemName, setSelectedItemName] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [quantity, setQuantity] = useState(0);

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

    // Slick slider settings
    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <RoundedArrowLeft />,
        nextArrow: <RoundedArrowRight />,
    };

    return (
        <div style={{padding: '1.5rem'}}>
            <Typography variant="h4" gutterBottom>Split Receipt: {receipt.event}</Typography>
            <Slider {...sliderSettings} style={{m: 1, display: 'flex', flexDirection: 'row', padding: '0 0.1rem 0 0.1rem'}}>
                {receipt.gptCopy.items.map((item) => (
                    <div key={item.name} style={{padding: '0 1rem'}}>
                        <Card sx={{ margin: 1}}>
                        <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography>Price: ${item.price.toFixed(2)} | Quantity: {item.quantity}</Typography>
                            <Grid container spacing={2}>
                                {(receipt.usersWithItems || []).map((user) => (
                                    <Grid item xs={12} sm={6} md={4} key={user.userName}>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            fullWidth
                                            onClick={() => handleSplitDrawerOpen(item.name, user.userName, splitItems[item.name]?.[user.userName] || 0)}
                                        >
                                            {user.userName}: {splitItems[item.name]?.[user.userName] || 0}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                        </Card>
                    </div>
                ))}
            </Slider>
            <Button variant="contained" color="primary" onClick={handleSplitReceipt} sx={{mt:6, backgroundColor:'#535C91', opacity: 0.85 ,'&:hover': {backgroundColor: '#535C91', opacity: 1, fontFamily: 'Urbanist'}}} fullWidth>
                Continue
            </Button>
            <QuantityDrawer
                open={SplitDrawerOpen}
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
