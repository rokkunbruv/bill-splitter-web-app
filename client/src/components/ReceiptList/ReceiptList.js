import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { getReceipts } from '../../actions/receipts';
import Receipt from '../Receipts/Receipt/Receipt';

const ReceiptList = () => {
    const dispatch = useDispatch();
    const receipts = useSelector((state) => state.receipts);

    useEffect(() => {
        dispatch(getReceipts());
    }, [dispatch]);

    return (
        <div>
            <Typography>Split History</Typography>
            {!receipts.length ? <CircularProgress /> : (
                <Grid container alignItems="stretch" spacing={5}>
                    {receipts.map((receipt) => (
                        <Grid key={receipt._id} item xs={12} sm={6} md={4}>
                            <Receipt receipt={receipt} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
}

export default ReceiptList;