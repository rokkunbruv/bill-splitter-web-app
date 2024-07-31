import React, { useState } from 'react';
import { Box, Button, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import SignInBG from '../../Backgrounds/SignInBG.svg'; 
import { ReactComponent as BackIcon } from '../../icons/BackIconLight.svg';
import { Link } from 'react-router-dom';
import { ReactComponent as Visibility } from '../../icons/PasswordVisible.svg';
import { ReactComponent as VisibilityOff } from '../../icons/PasswordInvisible.svg';

const ResetPasswordPage = () => {
    const [showPassword, setShowPassword] = useState({ new: false, confirm: false });

    const handleClickShowPassword = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                    fontSize: '35px',
                    color: '#FDF8F8',
                }}
            >
                Reset password
            </Typography>
            <Typography
                variant='h7'
                sx={{
                    fontWeight: 400,
                    fontSize: '15px',
                    color: '#FDF8F8',
                }}
            >
                Create a new password
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
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '400px',
                }}
            >
                <TextField 
                    id="new-password"
                    type={showPassword.new ? 'text' : 'password'}
                    placeholder="Enter new password"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => handleClickShowPassword('new')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword.new ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    variant="standard" 
                    fullWidth
                    margin="normal"
                    sx={{ maxWidth: '100%' }}
                />

                <TextField 
                    id="confirm-password"
                    type={showPassword.confirm ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => handleClickShowPassword('confirm')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword.confirm ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    variant="standard" 
                    fullWidth
                    margin="normal"
                    sx={{ maxWidth: '100%' }}
                />

                <Box sx={{
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',                
                    height: '5vh'
                }}>
                    <Button component={Link} to={`/password-success`} variant="contained" color="secondary" style={{
                        boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                        borderRadius: '15px',
                        width: '120px',
                        color: '#070F2B', 
                        backgroundColor:'#BCC0D6', 
                        marginTop: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        backgroundColor: '#535C91',
                        color: '#FDF8F8',
                        '&:hover': {backgroundColor: '#BCC0D6'},
                        width: '200px'
                        }}>
                        Reset Password
                    </Button>
                </Box>
            </Box>
        </div>
    </div>
    );
};

export default ResetPasswordPage;
