import React, { useState } from 'react';
import { Box, Button, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import SignInBG from '../../Backgrounds/SignInBG.svg'; 
import { ReactComponent as EmailIcon } from '../../icons/EmailIcon.svg';
import { ReactComponent as BackIcon } from '../../icons/BackIconLight.svg'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendChangePasswordEmail } from '../../../actions/auth';
import { SEND_CHANGE_PASS_EMAIL_SUCCESS } from '../../../types/auth';

const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // email state
    const [email, setEmail] = useState('');
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    // error state
    const [error, setError] = useState('');

    // send change password confirmation email
    const handleSendEmail = async (event) => {
        setError('');
        event.preventDefault();
        
        const response = await dispatch(sendChangePasswordEmail(email));

        if (response.type === SEND_CHANGE_PASS_EMAIL_SUCCESS) {
            navigate('/verify-password-code');
        } else {
            if (response.error) {
                setError(response.error);
            } else {
                setError('An unexpected error has occurred.');
            }
        }
    }

    return (
        <div 
            style={{ 
                backgroundImage: `url(${SignInBG})`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                top: 0,
                left: 0,
                margin: 0,
                padding: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end', // Aligns the box to the bottom of the screen
                backgroundColor: '#FFFFFF'
            }}
        >
        <header
            style={{
                position: 'absolute',
                top: '50px',
                left: '30px',
                margin: 0,
                padding: 0,
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                gap: '2px'
            }}
        >
            <IconButton component={Link} to={`/sign-in-page`}
                style={{
                    padding: 0,
                }}
            >
                <BackIcon width='30px' height='30px'/>
            </IconButton>
            <Typography
                variant='h7'
                sx={{
                    fontWeight: 400,
                    fontSize: '37px',
                    color: '#FDF8F8',
                }}
            >
                Forgot Password? 😓
            </Typography>
            <Typography
                variant='h7'
                sx={{
                    fontWeight: 400,
                    fontSize: '15px',
                    color: '#FDF8F8',
                }}
            >
                Enter email below to reset password.
            </Typography>
        </header>

            <div
                style={{
                    backgroundColor: 'rgba(253, 248, 248, 0)', // Adjust the alpha value (0.5) for desired transparency
                    width: '80%',
                    maxWidth: '10000px',
                    padding: '3rem',
                    height: '60vh',
                    marginBottom: '-3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    opacity: 1,
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        maxWidth: '400px',
                    }}
                >
                    <TextField 
                        id="input-with-icon-textfield" 
                        placeholder="Enter email address"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon/>
                                </InputAdornment>
                            ),
                        }} 
                        value={email}
                        onChange={handleEmail}
                        variant="standard" 
                        fullWidth
                        margin="normal"
                        error={!!error}
                        helperText={error}
                        sx={{ maxWidth: '100%' }}
                    />

                <Box sx={{
                    marginTop:'10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',                
                    height: '5vh'
                }}>
                    <Button 
                        component={Link} 
                        to={`/verify-password-code`} 
                        variant="contained" color="secondary" 
                        onClick={handleSendEmail}
                        style={{
                            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                            borderRadius: '15px',
                            width: '120px',
                            color: '#070F2B', 
                            backgroundColor:'#BCC0D6', 
                            marginTop: '40px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            '&:hover': {backgroundColor: '#BCC0D6'},
                            textTransform: 'none'
                        }}>
                        Send code
                    </Button>
                </Box>
                </Box>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;