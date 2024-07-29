import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import {ReactComponent as ProfileIcon} from '../icons/profile1.svg';
import {ReactComponent as EditIcon} from '../icons/edit.svg';

const Profile = () => {
  return (
    <div>
      {/* <Typography>Profile</Typography> */}
      <Box sx={{position: 'center', display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <ProfileIcon style={{width: '8rem', height: '8rem', margin: '3rem 0 0 0'}} />   
          <Box sx={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Typography variant='h5' fontWeight='bold' margin="1rem">UserName</Typography>
            <EditIcon />
          </Box>
          <Box sx={{width: '90%', height: '90%', display:'flex', flexDirection: 'column', margin: '1rem', gap: '0.2rem'}}>
            <Box sx={{display:'flex', flexDirection: 'row', justifyContent: "space-between", gap: 'auto' }}>
              <Typography variant='h7' fontWeight="bold" sx={{opacity: 0.5}}>Email</Typography>
              <Typography variant='h7' fontWeight="bold">username@gmail.com</Typography>
            </Box>

            <Box sx={{display:'flex', flexDirection: 'row', justifyContent: "space-between", gap: 'auto' }}>
              <Typography variant='h7' fontWeight="bold" sx={{opacity: 0.5}}>Phone Number</Typography>
              <Typography variant='h7' fontWeight="bold" >(+63) XXX XXX XXXX</Typography>
            </Box>

            <Box sx={{display:'flex', flexDirection: 'row', justifyContent: "space-between", gap: 'auto' }} >
              <Typography variant='h7' fontWeight="bold" sx={{opacity: 0.5}}>Country</Typography>
              <Typography variant='h7' fontWeight="bold">Country</Typography>
            </Box>
          </Box>
      </Box>      
    </div>
  );
};

export default Profile;
