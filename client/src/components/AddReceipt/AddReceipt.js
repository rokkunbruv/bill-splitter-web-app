import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from '../Form/Form';

const AddReceipt = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [imageData, setImageData] = useState(location.state?.imageData || null);

    useEffect(() => {
        // This effect will run when the component mounts or when location.state changes
        if (location.state?.imageData) {
            setImageData(location.state.imageData);
        }
    }, [location.state]);

    const handleTakePhoto = () => {
        navigate('/take-photo');
    };

    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom>Add New Receipt</Typography>
            {imageData ? (
                <div>
                    <img src={imageData} alt="Captured receipt" style={{ maxWidth: '100%', marginBottom: '20px' }} />
                    <Button variant="contained" color="primary" onClick={() => setImageData(null)}>
                        Remove Photo
                    </Button>
                </div>
            ) : (
                <Button variant="contained" color="primary" onClick={handleTakePhoto}>
                    Take Photo
                </Button>
            )}
            <Form imageData={imageData} />
        </div>
    );
}

export default AddReceipt;