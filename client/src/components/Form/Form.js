import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TextField, Button, Typography, Paper, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import FileBase from 'react-file-base64';
import Webcam from 'react-webcam';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReceipt } from '../../actions/receipts';
import { getMembers } from '../../actions/members';
// import { Link } from 'react-router-dom';

const Form = () => {
    const [receiptData, setReceiptData] = useState({ event: '', uploadedFile: '', users: [] });
    const [fileSelected, setFileSelected] = useState(false);
    const [error, setError] = useState('');
    const [useCamera, setUseCamera] = useState(true); // Default to camera view
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const members = useSelector((state) => state.members);

    useEffect(() => {
        dispatch(getMembers());
    }, [dispatch]);

    useEffect(() => {
        // Para automatic camera on
        setUseCamera(true);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!fileSelected) {
            setError('Please select a file or capture an image before submitting.');
            return;
        }
        //ma update
        const updatedReceiptData = { ...receiptData };
        dispatch(createReceipt(updatedReceiptData));
        clear();
        navigate('/receipts');
    };

    const clear = () => {
        setReceiptData({ event: '', uploadedFile: '', users: [] });
        setFileSelected(false);
        setError('');
    };

    const handleMemberSelectChange = (e) => {
        setReceiptData({ ...receiptData, users: e.target.value });
    };

    const handleFileUpload = ({ base64 }) => {
        setReceiptData({ ...receiptData, uploadedFile: base64 });
        setFileSelected(true);
        setError('');
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
            setReceiptData({ ...receiptData, uploadedFile: imageSrc });
            setFileSelected(true);
            setError('');
        } else {
            setError('Failed to capture image. Please try again.');
        }
    }, [webcamRef, receiptData]);

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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        onClick={() => setUseCamera(!useCamera)}
                        sx={{ marginBottom: 2 }}
                    >
                        {useCamera ? 'Switch to File Upload' : 'Switch to Camera'}
                    </Button>
                    {useCamera ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width="100%"
                                height="auto"
                            />
                            <Button variant="contained" color="primary" onClick={capture} sx={{ marginTop: 2 }}>
                                Capture Photo
                            </Button>
                        </Box>
                    ) : (
                        <div>
                            <FileBase type="file" multiple={false} onDone={handleFileUpload} />
                        </div>
                    )}
                </Box>
                {error && (
                    <Typography color="error" sx={{ marginTop: 2, marginBottom: 2 }}>
                        {error}
                    </Typography>
                )}
                <Button 
                    sx={{ marginTop: 2, marginBottom: 2 }} 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    type="submit" 
                    fullWidth 
                    disabled={!fileSelected}
                >
                    Upload
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
