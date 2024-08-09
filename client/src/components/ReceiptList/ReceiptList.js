import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { getReceipts } from '../../actions/receipts';
import Receipt from '../Receipts/Receipt/Receipt';

const ReceiptList = () => {
    const dispatch = useDispatch();
    const receipts = useSelector((state) => state.receipts);

    const token = localStorage.getItem("user");

    useEffect(() => {
        dispatch(getReceipts(token));
    }, [dispatch]);

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