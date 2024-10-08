import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ReactComponent as ProfileIcon } from '../icons/profile1.svg';
import { ReactComponent as EditIcon } from '../icons/edit.svg';
import { ReactComponent as LogOutIcon } from '../icons/LogOutIcon.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { verifyToken } from '../../actions/auth';
import { VERIFY_TOKEN_SUCCESS } from '../../types/auth';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get user details
  const [user, setUser] = useState(useSelector(state => state.authReducer.user.info));
 
  // redirects to getting started page when user isn't authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return navigate("/");
    }

    if (!user) {
      const fetchUser = async () => {
        const response = await dispatch(verifyToken(token));
        
        if (response.type === VERIFY_TOKEN_SUCCESS) {
          setUser(response.payload.user);
        } else {
          if (response.error) {
            console.error(response.error);
            alert(response.error);
          } else {
            console.error('An unexpected error has occurred.');
            alert('An unexpected error has occurred.');
          }
        }
      }

      fetchUser();
    }
  }, [user, navigate, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  }
  
  return (
    <div>
      <Box sx={{position: 'center', display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <ProfileIcon style={{width: '8rem', height: '8rem', margin: '3rem 0 0 0'}} />   
        <Box sx={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Typography variant='h5' fontWeight='bold' margin="1rem">{user?.name || 'UserName'}</Typography>
          <EditIcon />
        </Box>
        <Box sx={{width: '90%', height: '90%', display:'flex', flexDirection: 'column', margin: '1rem', gap: '0.2rem'}}>
          <Box sx={{display:'flex', flexDirection: 'row', justifyContent: "space-between", gap: 'auto' }}>
            <Typography variant='h7' fontWeight="bold" sx={{opacity: 0.5}}>Email</Typography>
            <Typography variant='h7' fontWeight="bold">{user?.email || 'username@email.com'}</Typography>
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

      {/* Logout Button */}
      <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '50px', paddingBottom: '1rem'}}>
        <Button 
          variant="contained" 
          onClick={handleLogout}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '15px',
            backgroundColor: '#BCC0D6',
            color: '#000',
            fontSize: '15px',
            fontWeight: 'bold',
            padding: '0.5rem 1rem',
            textTransform: 'none',
            gap: '0.5rem',
          }}
        >
          <LogOutIcon />
          <Typography variant="h7">Logout</Typography>
        </Button>
      </Box>
    </div>
  );
};

export default Profile;