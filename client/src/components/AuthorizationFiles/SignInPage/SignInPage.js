import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import SignInBG from '../../Backgrounds/SignInBG.svg'; 
import { ReactComponent as EmailIcon } from '../../icons/EmailIcon.svg';
import { ReactComponent as PasswordIcon } from '../../icons/PasswordIcon.svg';
import { ReactComponent as Visibility } from '../../icons/PasswordVisible.svg';
import { ReactComponent as VisibilityOff } from '../../icons/PasswordInvisible.svg';
import { ReactComponent as BackIcon } from '../../icons/BackIconDark.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { login } from '../../../actions/auth';
import { LOGIN_SUCCESS } from '../../../types/auth';

const SignInPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // email state
    const [email, setEmail] = useState('');
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    // password state
    const [password, setPassword] = useState('');
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    // error state
    const [error, setError] = useState('');

    // submit login credentials to server
    const handleSubmit = async (event) => {
        setError('');
        event.preventDefault();

        const credentials = btoa(`${email}:${password}`);
        
        const response = await dispatch(login(credentials));

        if (response.type === LOGIN_SUCCESS) {
            localStorage.setItem('user', response.payload.token);
            navigate('/welcome');
        } else {
            if (response.error) {
                setError(response.error);
            } else {
                setError('An unexpected error has occurred.');
            }
        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            <style>
                {`
                    @keyframes scrollLeft {
                        from {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1);
                        }
                    }

                    .scroll-left {
                        animation: scrollLeft 0.18s ease-out;
                    }
                `}
            </style>
            <div 
                className={isMounted ? "scroll-left" : ""}
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
                    alignItems: 'flex-end',
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
                    <IconButton component={Link} to={`/sign-up-page`}
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
                            fontSize: '30px',
                            color: '#FDF8F8',
                        }}
                    >
                        Glad to have you back 💸
                    </Typography>
                    <Typography
                        variant='h7'
                        sx={{
                            fontWeight: 400,
                            fontSize: '15px',
                            color: '#FDF8F8',
                        }}
                    >
                        Please enter account details to sign in.
                    </Typography>
                </header>

                <div
                    style={{
                        backgroundColor: 'rgba(253, 248, 248, 0.8)', // Adjusted for transparency
                        borderRadius: '50px',
                        width: '80%',
                        maxWidth: '10000px',
                        padding: '3rem',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
                        height: '35vh',
                        marginBottom: '-3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
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
                            sx={{ maxWidth: '100%' }}
                        />

                        <TextField 
                            id="password"
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Enter password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon/>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }} 
                            value={password}
                            onChange={handlePassword}
                            variant="standard" 
                            fullWidth
                            margin="normal"
                            error={!!error}
                            sx={{ maxWidth: '100%' }}
                        />

                        <Button component={Link} to={`/forgot-password`} variant="text" color="secondary" 
                            style={{ 
                                color: '#535C91',
                                margin:'10px 0 0 0',
                                fontWeight: 'bold',
                                '&:hover': {backgroundColor: '#535C91'},
                                display:'flex',
                                flexDirection: 'row',
                                gap: '0 rem',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end',
                                marginTop: '0px',
                                textTransform: 'none'
                            }}>
                            Forgot Password?
                        </Button>
                    </Box>
                    <Box sx={{
                        marginTop:'10px'
                    }}>
                        <Button 
                            component={Link} 
                            to={`/welcome`} 
                            variant="contained" 
                            color="secondary" 
                            onClick={handleSubmit}
                            style={{
                            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                            borderRadius: '15px',
                            width: '120px',
                            color: '#070F2B', 
                            backgroundColor:'#BCC0D6', 
                            marginTop: '30px',
                            '&:hover': {backgroundColor: '#BCC0D6'},
                            textTransform: 'none',
                            fontWeight: 'bold'
                        }}>
                            Sign in
                        </Button>
                    </Box>
                    {/* error message */}
                    {error &&
                    <Typography 
                            variant = "h7"
                            color="error"
                            sx={{ 
                                marginTop: '1rem', 
                                fontSize: '15px', 
                                textAlign: 'center' 
                            }}
                        >
                            {error}
                        </Typography>
                    }
                </div>
            </div>
        </>
    );
};

export default SignInPage;