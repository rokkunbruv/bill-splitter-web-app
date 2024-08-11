import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { getReceipts } from '../../actions/receipts';
import Receipt from '../Receipts/Receipt/Receipt';

const ReceiptList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const receipts = useSelector((state) => state.receipts);

    const token = localStorage.getItem("token");

    useEffect(() => {
        dispatch(getReceipts(token));
    }, [dispatch]);

    // redirects to getting started page when user isn't authenticated
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("token");
        
        if (!isAuthenticated) {
            navigate("/");
        }
    });

    return (
        <div>
            {/* <Typography>Split History</Typography> */}
            {!receipts.length ? <CircularProgress /> : (
                <Grid container spacing={1}>
                    {receipts.map((receipt) => (
                        <Grid key={receipt._id} item xs={12}>
                            <Receipt receipt={receipt} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
}

export default ReceiptList;