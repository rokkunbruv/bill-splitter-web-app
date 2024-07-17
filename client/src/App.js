import React from 'react';
import { Container, AppBar, Typography, Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import ReceiptList from './components/ReceiptList/ReceiptList';
import AddReceipt from './components/AddReceipt/AddReceipt';
import SplitReceipt from './components/SplitReceipt/SplitReceipt';
import FinalSplit from './components/FinalSplit/FinalSplit';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Members from './components/Members/Members';
import BottomNavigator from './components/BottomNavigator/BottomNavigator';

const App = () => {
  return (
    <Router>
      <Container maxWidth="lg">
        <AppBar position='static' color='inherit' sx={{ borderRadius: 15, margin: '30px 0', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Typography component={Link} to="/" variant="h2" align='center' sx={{ color: 'rgba(0,183,255, 1)', textDecoration: 'none', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', letterSpacing: '0.1em', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }} >
            BillSplit
          </Typography>
        </AppBar>
        <Box sx={{ pb: 7 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-receipt" element={<AddReceipt />} />
            <Route path="/split-receipt/:id" element={<SplitReceipt />} />
            <Route path="/final-split/:id" element={<FinalSplit />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/members" element={<Members />} />
            <Route path="/receipts" element={<ReceiptList />} />
          </Routes>
        </Box>
        <BottomNavigator />
      </Container>
    </Router>
  );
};

export default App;