import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReceipt } from '../../actions/receipts';
import { getMembers } from '../../actions/members';

const Form = ({ imageData }) => {  // Add imageData as a prop
    const [receiptData, setReceiptData] = useState({ 
        event: '', 
        uploadedFile: imageData || '', 
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    
    useEffect(() => {
        dispatch(getMembers(token));
    }, [dispatch]);

    useEffect(() => {
        if (imageData) {
            setReceiptData(prevData => ({ ...prevData, uploadedFile: imageData }));
        }
    }, [imageData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createReceipt(receiptData, token));
        clear();
        navigate(`/home`);
    };

    const clear = () => {
        setReceiptData({ event: '', uploadedFile: '', users: [] });
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <form autoComplete='off' noValidate onSubmit={handleSubmit}>
                <TextField
                    sx={{ marginTop: 2, marginBottom: 2 }}
                    name="event"
                    variant='outlined'
                    label="Event"
                    fullWidth
                    value={receiptData.event}
                    onChange={(e) => setReceiptData({ ...receiptData, event: e.target.value })}
                />
                {!imageData && (
                    <div>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setReceiptData({ ...receiptData, uploadedFile: base64 })}/>
                    </div>
                )}
                {imageData && (
                    <div>
                        <img src={imageData} alt="Captured receipt" style={{ maxWidth: '100%', marginBottom: '20px' }} />
                    </div>
                )}
                <Button sx={{ marginTop: 2, marginBottom: 2 }} variant="contained" color="primary" size="large" type="submit" fullWidth>
                    Upload
                </Button>
            </form>
        </Paper>
    );
};

export default Form;