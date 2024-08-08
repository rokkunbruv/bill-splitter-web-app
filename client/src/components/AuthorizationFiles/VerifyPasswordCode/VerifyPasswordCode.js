import React from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import VerifyEmailBG from '../../Backgrounds/VerifyEmailBG.svg'; 
import { ReactComponent as BackIcon } from '../../icons/BackIconLight.svg';
import { Link, useNavigate } from 'react-router-dom';
import NumberPad from '../VerifyEmailPage/Numpad.jsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendChangePasswordEmail, verifyChangePassword } from '../../../actions/auth';
import { VERIFY_CHANGE_PASS_SUCCESS, SEND_CHANGE_PASS_EMAIL_SUCCESS } from '../../../types/auth.js';

const VerifyPasswordCode = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // retrieve saved email
  const email = useSelector(state => state.authReducer.sendChangePassEmail.email);
  
  const [code, setCode] = useState(['', '', '', '', '', '']);
  
  const handlePadClick = (value) => {
    if (value === 'C') {
      setCode(['', '', '', '', '', '']);
    } else if (value === 'Backspace') {
      const newCode = [...code];
      const lastIndex = code.lastIndexOf('');
      if (lastIndex > 0) {
        newCode[lastIndex - 1] = '';
      }
      setCode(newCode);
    } else {
      const nextEmptyIndex = code.findIndex((digit) => digit === '');
      if (nextEmptyIndex !== -1) {
        const newCode = [...code];
        newCode[nextEmptyIndex] = value;
        setCode(newCode);
      }
    }
  };

  // error state
  const [error, setError] = useState('');

  // submit inputted code to be verified
  const handleSubmit = async (event) => {
    setError('');
    event.preventDefault();
    
    const codeString = code.join('');

    const response = await dispatch(verifyChangePassword(codeString));
    console.log(response);

    if (response.type === VERIFY_CHANGE_PASS_SUCCESS) {
      navigate('/reset-password');
    } else {
      if (response.error) {
        setError(response.error);
      } else {
          setError('An unexpected error has occurred.');
      }
    }
  };

  // resend email verification
  const handleResend = async () => {
      setError('');  

      if (!email) {
        console.error('Email not dispatched');
      }

      const response = await dispatch(sendChangePasswordEmail(email));

      if (response.type === SEND_CHANGE_PASS_EMAIL_SUCCESS) {
        // tell the user that the email verif. has been resent on the page
        console.log('Email verification has been resent');
      } else {
        if (response.error) {
          setError(response.error);
        } else {
            setError('An unexpected error has occurred.');
        }
      }
    };

  return (
  <div 
      style={{ 
          backgroundImage: `url(${VerifyEmailBG})`, 
          backgroundSize: 'cover',   // Ensures the image covers the container
          backgroundPosition: 'center',  // Centers the background image
          backgroundRepeat: 'no-repeat', // Prevents repeating the background image
          height: '100vh',   // Full viewport height
          width: '100vw',    // Full viewport width
          position: 'fixed', // Fixed positioning to stay in place
          top: 0,
          left: 0,
          margin: 0,      
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: '#FDF8F8'
      }}
  >
  
      <Box 
          display="flex"
          flexDirection="column"
          alignItems="center"
          height="50vh"
          overflow="hidden"
      >
          <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start" // Aligns content to the top left
          width="100%"
          maxWidth={400}
          padding={4} // Adds some padding around the content
          sx={{
              gap:'10px'
          }}>
          {/* Header Typography */}
          <IconButton component={Link} to={`/sign-up-page`}
                          style={{
                              padding: 0,
                              marginLeft: '10px',
                          }}
                      >
                          <BackIcon width='30px' height='30px'/>
                      </IconButton>
          <Typography
              variant="h7"
              align="left"
              style={{ 
              fontSize: '30px',
              marginLeft: '15px',
              fontWeight: 'bold', 
              marginBottom: 5,
              color: '#FDF8F8'
              }}
          >
              Check your email! ✨
          </Typography>
          <Typography
              variant="h7"
              align="left"
              style={{ 
              marginLeft: '15px',
              fontSize: '15px',
              marginBottom: 20,
              color: '#FDF8F8' 
              }}
          >
              We sent a code to your email address.
          </Typography>
      {/* Input Boxes */}
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%" 
      maxWidth="400px" 
      marginBottom={2}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        flexWrap="wrap" 
      >
        {code.map((digit, index) => (
          <Typography
            key={index}
            variant="h7"
            style={{
              border: `1px solid ${error ? 'red' : '#ccc'}`,
              borderRadius: 10,
              minWidth: '40px', 
              maxWidth: '60px', 
              textAlign: 'center',
              padding: '30px 5px',
              lineHeight: '2px', 
              margin: '0 5px',
              backgroundColor: '#FDF8F8',
              opacity: 0.9,
              boxShadow: '0 4px 8px rgba(0,0,0,0.9)',
            }}
          >
            {digit}
          </Typography>
        ))}
      </Box>

      <Box display="flex" alignItems="center" mb={2}>
        <Typography
          variant="h7"
          style={{
            fontSize: '14px',
            marginRight: 10,
            marginTop: '15px',
            color: '#070F2B',
            fontWeight: 400,
            fontWeight: 'bold'
          }}
        >
          Didn't receive a code?
        </Typography>
        <Button
          variant="text"
          onClick={handleResend}
          style={{
            fontSize: '13px',
            marginTop: '15px',
            color: '#535C91',
            fontWeight: 600,
          }}
        >
          Resend
        </Button>
      </Box>

      <Button
        component={Link} to={`/reset-password`}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ 
          marginTop: 10, 
          backgroundColor: '#BCC0D6', 
          color: '#070F2B', 
          fontWeight: 600 
        }}
      >
        Verify Email
      </Button>
    </Box>
      {/* error message */}
      {error && (
        <Box
          sx={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '1rem' 
          }}
        >
          <Typography 
            variant="h7"
            color="error"
            sx={{ 
              fontSize: '15px', 
              textAlign: 'center' 
            }}
          >
            {error}
          </Typography>
        </Box>
      )}

          {/* NumberPad */}
          <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{ position: 'absolute', bottom: -20, left: 0, right: 0, height: '55vh', backgroundColor: '#070F2B', borderRadius: '15px' }}
          >
              <NumberPad onClick={handlePadClick} />
          </Box>
          </Box>
      </Box>
      </div>
  );
};
  
  export default VerifyPasswordCode;