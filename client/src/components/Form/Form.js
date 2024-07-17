import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReceipt } from '../../actions/receipts';
import { getMembers } from '../../actions/members';

const Form = () => {
    const [receiptData, setReceiptData] = useState({ event: '', uploadedFile: '', users: [] }); // Changed to 'users' for selected members
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const members = useSelector((state) => state.members);

    useEffect(() => {
        dispatch(getMembers());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update receiptData with selected members and other info
        const updatedReceiptData = { ...receiptData }; // Copy current state
        dispatch(createReceipt(updatedReceiptData));
        clear();
        navigate('/');
    };

    const clear = () => {
        setReceiptData({ event: '', uploadedFile: '', users: [] }); // Clear state properly
    };

    const handleMemberSelectChange = (e) => {
        setReceiptData({ ...receiptData, users: e.target.value });
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <form autoComplete='off' noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">Enter Receipt Info</Typography>
                <TextField 
                    sx={{ marginTop: 2, marginBottom: 2 }} 
                    name="event" 
                    variant='outlined' 
                    label="Event" 
                    fullWidth 
                    value={receiptData.event} 
                    onChange={(e) => setReceiptData({ ...receiptData, event: e.target.value })}
                />
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel>Select Members</InputLabel>
                    <Select
                        multiple
                        value={receiptData.users}
                        onChange={handleMemberSelectChange}
                        renderValue={(selected) => selected.join(',')}
                    >
                        {members.map((member) => (
                            <MenuItem key={member._id} value={member.name}>
                                {member.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div><FileBase type="file" multiple={false} onDone={({ base64 }) => setReceiptData({ ...receiptData, uploadedFile: base64 })}/></div>
                <Button sx={{ marginTop: 2, marginBottom: 2 }} variant="contained" color="primary" size="large" type="submit" fullWidth>
                    Upload
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
