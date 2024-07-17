import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';

import Receipt from './Receipt/Receipt';


const Receipts = ({ setCurrentId }) => {
    const receipts = useSelector((state) => state.receipts);

    console.log(receipts);

    return (
       !receipts.length ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
            {receipts.map((receipt) =>(
                <Grid key={receipt._id} item xs={12} sm={6}> 
                    <Receipt receipt={receipt} setCurrentId={setCurrentId}/>
                </Grid>
            ))}
        </Grid>
       )
    );
}

export default Receipts;