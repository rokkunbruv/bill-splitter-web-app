import React from 'react';
import { Typography } from '@mui/material';
import {ReactComponent as ProfileIcon} from '../icons/profile1.svg'

const Profile = () => {
  return (
    <div>
      <Typography>Profile</Typography>
      <ProfileIcon sx={{width: 300}} />      
    </div>
  );
};

export default Profile;
