import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, CircularProgress, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { getReceipts } from '../../actions/receipts';
import Receipt from '../Receipts/Receipt/Receipt';

import NoSplit from '../ReceiptList/NoSplit.png';
import CelebrationTwoToneIcon from '@mui/icons-material/CelebrationTwoTone';

const ReceiptList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const receipts = useSelector((state) => state.receipts);
    const [loading, setLoading] = useState(true);  // Loading state

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchReceipts = async () => {
            await dispatch(getReceipts(token));
            setLoading(false);  // Set loading to false once data is fetched
        };

        fetchReceipts();
    }, [dispatch, token]);

    // Redirects to getting started page when user isn't authenticated
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("token");
        
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [navigate]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (receipts.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                 <img src={CelebrationTwoToneIcon} alt="No Split Img" width="100px" height="100px" />
                <Typography variant="h6">You didn't split any bills yet!</Typography>
            </Box>
        );
    }

    return (
        <div>
            {/* <Typography>Split History</Typography> */}
            <Grid container spacing={1}>
                {receipts.map((receipt) => (
                    <Grid key={receipt._id} item xs={12}>
                        <Receipt receipt={receipt} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default ReceiptList;
