import React from 'react';
import { Typography } from '@mui/material';
import Form from '../Form/Form';

const AddReceipt = () => {
    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom>Add New Receipt</Typography>
            <Form />
        </div>
    );
}

export default AddReceipt;