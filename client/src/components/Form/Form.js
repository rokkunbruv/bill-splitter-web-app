import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import { createReceipt, updateReceipt } from '../../actions/receipts';

const Form = ({ currentId, setCurrentId }) => {
    const [receiptData, setReceiptData] = useState({ event: '', users: [''], uploadedFile: '' });
    const receipt = useSelector((state) => currentId ? state.receipts.find((p) => p._id === currentId ) : null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (receipt) setReceiptData(receipt);
    }, [receipt]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (currentId) {
            dispatch(updateReceipt(currentId, receiptData));
        } else {
            dispatch(createReceipt(receiptData));
        }
        clear();
    };

    const clear = () => {
        setCurrentId(null);
        setReceiptData({ event: '', users: [''], uploadedFile: '' });
    };

    const handleUserChange = (index, value) => {
        const newUsers = [...receiptData.users];
        newUsers[index] = value;
        setReceiptData({ ...receiptData, users: newUsers });
    };

    const addUserField = () => {
        setReceiptData({ ...receiptData, users: [...receiptData.users, ''] });
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <form autoComplete='off' noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">Enter Receipt Info</Typography>
                <TextField sx={{ marginTop: 2, marginBottom: 2 }} name="event" variant='outlined' label="Event" fullWidth value={receiptData.event} onChange={(e) => setReceiptData({ ...receiptData, event: e.target.value })}/>
                {receiptData.users.map((user, index) => (
                    <TextField key={index} sx={{ marginBottom: 2 }} name={`user-${index}`} variant='outlined' label={`User ${index + 1}`} fullWidth value={user} onChange={(e) => handleUserChange(index, e.target.value)}/>
                ))}
                <IconButton onClick={addUserField}>
                    <AddCircleIcon />
                    <Typography variant="body2">Add user</Typography>
                </IconButton>
                <div><FileBase type="file" multiple={false} onDone={({ base64 }) => setReceiptData({ ...receiptData, uploadedFile: base64 })}/></div>
                <Button sx={{ marginTop: 2, marginBottom: 2 }} variant ="contained" color ="primary" size="large" type="submit" fullWidth>
                    Upload
                </Button>
                <Button variant ="contained" color ="secondary" size="small" onClick={clear} fullWidth>Cancel</Button>
            </form>
        </Paper>
    );
};

export default Form;
