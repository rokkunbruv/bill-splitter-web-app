import React, { useState } from 'react';
import { Card, CardActions, CardContent, Button, Typography, Box, Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useDispatch } from 'react-redux';
import { deleteReceipt } from '../../../actions/receipts';

const Receipt = ({ receipt, setCurrentId }) => {
    const dispatch = useDispatch();
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
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
                <CardContent key={index} sx={{ border: 'solid', borderWidth: "1px", padding: 1, marginBottom: '5px', borderRadius: '5px', display: 'flex', flexDirection: 'row' }}>
                    <Typography variant="body2" color="textSecondary" gutterBottom>{user}</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant="body2" color="textSecondary" gutterBottom>Bill: 0.00</Typography>
                </CardContent>
            ))}
            <Typography variant='body2'>Receipt</Typography>
            {receipt.gptResponse.items.map((item, index) => (
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
                    <Button sx={{ position: 'absolute', top: '5px', right: '5px', minWidth: 'auto', padding: '5px' }}
                        aria-controls={`simple-menu-${index}`}
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                    <Menu
                        id={`simple-menu-${index}`}
                        anchorEl={menuAnchorEl}
                        keepMounted
                        open={Boolean(menuAnchorEl)}
                        onClose={handleMenuClose}
                    >
                        {receipt.users.map((user, userIndex) => (
                            <MenuItem key={`menu-item-${userIndex}`} onClick={handleMenuClose}>
                                {user}
                            </MenuItem>
                        ))}
                    </Menu>
                </CardContent>
            ))}
            <CardContent sx={{ border: 'solid', borderWidth: "1px", padding: 1, marginTop: '5px', borderRadius: '5px' }}>
                <Typography variant="body2" color="textSecondary" gutterBottom>Total: {receipt.gptResponse.total_cost.toFixed(2)}</Typography>
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
