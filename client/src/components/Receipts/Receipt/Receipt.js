import React, { useState } from 'react';
import { Card, CardActions, CardContent, Button, Typography, Box, Menu, MenuItem, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useDispatch } from 'react-redux';
import { deleteReceipt, assignItemToUser } from '../../../actions/receipts';

const Receipt = ({ receipt, setCurrentId }) => {
    const dispatch = useDispatch();
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantities, setQuantities] = useState({});

    const handleMenuOpen = (event, item) => {
        setMenuAnchorEl(event.currentTarget);
        setSelectedItem(item);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
        setSelectedItem(null);
    };

    const handleQuantityChange = (user, value) => {
        const quantity = Math.min(Math.max(1, parseInt(value) || 0), selectedItem.quantity);
        setQuantities({ ...quantities, [user]: quantity });
    };

    const handleAssignItem = (user) => {
        if (selectedItem) {
            const quantity = quantities[user] || 1;
            const itemToAssign = { ...selectedItem, quantity };
            dispatch(assignItemToUser(receipt._id, user, itemToAssign));
        }
        handleMenuClose();
        setQuantities({});
    };

    return (
        <Card sx={{ padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '15px', height: '100%', position: 'relative' }}>
            <Typography variant='h6'>{receipt.event}</Typography>
            <div>
                <Button sx={{ color: 'black', position: 'absolute', top: '20px', right: '20px', border: 'solid', padding: 0, borderRadius: '15px', borderWidth: "1px" }} size="small" onClick={() => setCurrentId(receipt._id)}>
                    <MoreHorizIcon fontSize='medium' />
                </Button>
            </div>
            {receipt.users.map((user, index) => (
                <CardContent key={index} sx={{ border: 'solid', borderWidth: "1px", padding: 1, marginBottom: '5px', borderRadius: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography variant="body2" color="textSecondary">{user}</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant="body2" color="textSecondary">Bill: {receipt.usersWithItems.find(u => u.userName === user)?.bill.toFixed(2) || '0.00'}</Typography>
                </CardContent>
            ))}
            <Typography variant='body2'>Receipt</Typography>
            {receipt.gptCopy.items.map((item, index) => (
                <CardContent key={index} sx={{ border: 'solid', borderWidth: "1px", padding: 1, marginTop: '5px', borderRadius: '5px', position: 'relative' }}>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        {item.name}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="textSecondary">
                            Price: {item.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Quantity: {item.quantity}
                        </Typography>
                    </Box>
                    <Button
                        sx={{ position: 'absolute', top: '5px', right: '5px', minWidth: 'auto', padding: '5px' }}
                        aria-controls={`simple-menu-${index}`}
                        aria-haspopup="true"
                        onClick={(event) => handleMenuOpen(event, item)}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </CardContent>
            ))}
            <Menu
                id="simple-menu"
                anchorEl={menuAnchorEl}
                keepMounted
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
            >
                {receipt.users.map((user, userIndex) => (
                    <MenuItem key={`menu-item-${userIndex}`} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography onClick={() => handleAssignItem(user)}>{user}</Typography>
                        <TextField
                            sx={{ marginLeft: 2, width: '60px' }}
                            type="number"
                            size="small"
                            value={quantities[user] || ''}
                            onChange={(e) => handleQuantityChange(user, e.target.value)}
                            inputProps={{ min: 1, max: selectedItem ? selectedItem.quantity : 1 }}
                        />
                    </MenuItem>
                ))}
            </Menu>
            <CardContent sx={{ border: 'solid', borderWidth: "1px", padding: 1, marginTop: '5px', borderRadius: '5px' }}>
                <Typography variant="body2" color="textSecondary" gutterBottom>Total: {receipt.gptCopy.total_cost.toFixed(2)}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => dispatch(deleteReceipt(receipt._id))}>
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Receipt;
