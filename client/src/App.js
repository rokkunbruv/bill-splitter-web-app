import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';

import { getReceipts } from './actions/receipts';
import Receipts from './components/Receipts/Receipts';
import Form from './components/Form/Form';


const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReceipts());
    },[dispatch]);

    return (
       <Container maxWidth="lg">
            <AppBar position='static' color='inherit' sx={{ borderRadius: 15, margin: '30px 0', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="h2" align='center' sx={{ color: 'rgba(0,183,255, 1)', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', letterSpacing: '0.1em', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }} >//BillSplit</Typography>
            </AppBar>
            <Grow in>
                <Container> 
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Receipts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
       </Container>
    );
}

export default App;