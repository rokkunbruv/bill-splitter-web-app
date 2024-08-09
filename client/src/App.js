import React from 'react';
import { Container, AppBar, Typography, Box, SvgIcon } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import ReceiptList from './components/ReceiptList/ReceiptList';
import AddReceipt from './components/AddReceipt/AddReceipt';
import SplitReceipt from './components/SplitReceipt/SplitReceipt';
import FinalSplit from './components/FinalSplit/FinalSplit';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Members from './components/Members/Members';
import BottomNavigator from './components/BottomNavigator/BottomNavigator';
import TakePhoto from './components/TakePhoto/TakePhoto';
import ViewDetails from './components/ViewDetails/ViewDetails';

import './index.css';

const App = () => {

  return (
    <Router>
      <Container maxWidth="lg" borderRadius='10'>
        <AppBar 
          position='fixed' 
          color='inherit'
          sx={{ height: '4rem', backgroundColor: '#C8C7E0', borderRadius: 0, margin: '0', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '60%'}}>
            <Typography component={Link} to="/" align='center' variant= 'h7' sx={{ color: 'rgba(7, 15, 43, 1)', textDecoration: 'none', fontWeight: '550', fontSize: '2.5rem', letterSpacing: '0.02em' }} >
              BillSplit
            </Typography>
            {/* add notif icon - maka navigate to notif page */}
        </AppBar>
        <Box sx={{ pb: 7, margin:'23% 0 20% 0'}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-receipt" element={<AddReceipt />} />
            <Route path="/split-receipt/:id" element={<SplitReceipt />} />
            <Route path="/final-split/:id" element={<FinalSplit />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/members" element={<Members />} />
            <Route path="/receipts" element={<ReceiptList />} />
            <Route path="/take-photo" element={<TakePhoto />} />
            <Route path="/view-details" element={<ViewDetails />} />
          </Routes>
        </Box>
        <BottomNavigator />
      </Container>
    </Router>
  );
};

export default App;