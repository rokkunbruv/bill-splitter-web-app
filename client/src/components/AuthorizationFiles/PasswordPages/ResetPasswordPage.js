import React, { useState } from 'react';
import { Box, Button, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import SignInBG from '../../Backgrounds/SignInBG.svg'; 
import { ReactComponent as BackIcon } from '../../icons/BackIconLight.svg';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Visibility } from '../../icons/PasswordVisible.svg';
import { ReactComponent as VisibilityOff } from '../../icons/PasswordInvisible.svg';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../../actions/auth';
import { RESET_PASS_SUCCESS } from '../../../types/auth';

const ResetPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // password state
    const [password, setPassword] = useState('');
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    // confirm password state
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    // error state
    const [error, setError] = useState('');

    // submit new password
    const handleSubmit = async (event) => {
        setError('');
        event.preventDefault();

        let hasError = false;

        if (!password) {
            setError('Password is required');
            hasError = true;
        } else if (!confirmPassword) {
            setError('Confirm password is required');
            hasError = true;
        } else if (password !== confirmPassword) {
            setError('Passwords do not match');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const response = await dispatch(resetPassword(password, confirmPassword));

        if (response.type === RESET_PASS_SUCCESS) {
            navigate('/password-success');
        } else {
            if (response.error) {
                setError(response.error);
            } else {
                setError('An unexpected error has occurred.');
            }
        }
    }
    
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
                    value={password}
                    onChange={handlePassword}
                    variant="standard" 
                    fullWidth
                    margin="normal"
                    sx={{ maxWidth: '100%' }}
                    error={!!error && (error.includes('Password') || error.includes('match'))}
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
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    variant="standard" 
                    fullWidth
                    margin="normal"
                    sx={{ maxWidth: '100%' }}
                    error={!!error && (error.includes('Confirm') || error.includes('match'))}
                />

                <Box sx={{
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',                
                    height: '5vh'
                }}>
                    <Button 
                        component={Link} 
                        to={`/password-success`} 
                        variant="contained" 
                        color="secondary" 
                        onClick={handleSubmit}
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
                            backgroundColor: '#535C91',
                            color: '#FDF8F8',
                            '&:hover': {backgroundColor: '#BCC0D6'},
                            width: '200px'
                        }}>
                        Reset Password
                    </Button>
                </Box>
            </Box>
            {/* error message */}
            {error && 
            <Typography 
                variant="h7"
                color="error" 
                sx={{ 
                    marginTop: '3rem', 
                    textAlign: 'center',
                    fontSize: '15px'
                }}
            >
                {error}
            </Typography>}
        </div>
    </div>
    );
};

export default ResetPasswordPage;