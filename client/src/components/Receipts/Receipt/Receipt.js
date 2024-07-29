import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteReceipt } from '../../../actions/receipts';
import { Link } from 'react-router-dom';

const Receipt = ({ receipt }) => {
    const dispatch = useDispatch();

    return (
        <Card sx={{ padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '15px', height: '100%', position: 'relative', marginBottom: '10px'}}>
            <Typography variant='h6'>{receipt.event}</Typography>
            {receipt.usersWithItems.map((user, index) => (
                <CardContent key={index} sx={{ border: 'solid', borderWidth: "1px", padding: 1, marginBottom: '5px', borderRadius: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography variant="body2" color="textSecondary">{user.userName}</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant="body2" color="textSecondary">Bill: {user.bill.toFixed(2)}</Typography>
                </CardContent>
            ))}
            <CardContent sx={{ border: 'solid', borderWidth: "1px", padding: 1, marginTop: '5px', borderRadius: '5px' }}>
                <Typography variant="body2" color="textSecondary" gutterBottom>Total: {receipt.gptCopy.total_cost.toFixed(2)}</Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/split-receipt/${receipt._id}`} size="small" color="primary">
                    Split
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deleteReceipt(receipt._id))}>
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default Receipt;
