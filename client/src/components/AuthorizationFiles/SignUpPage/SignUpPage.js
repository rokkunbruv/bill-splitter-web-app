import React, { useState } from 'react';
import { Box, Button, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import SignUpBG from '../../Backgrounds/SignUpBG.svg'; 
import { ReactComponent as NameIcon } from '../../icons/NameIcon.svg';
import { ReactComponent as EmailIcon } from '../../icons/EmailIcon.svg';
import { ReactComponent as PasswordIcon } from '../../icons/PasswordIcon.svg';
import { ReactComponent as Visibility } from '../../icons/PasswordVisible.svg';
import { ReactComponent as VisibilityOff } from '../../icons/PasswordInvisible.svg';
import { ReactComponent as BackIcon } from '../../icons/BackIconDark.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { signup, verifyEmail } from '../../../actions/auth';
import { SIGNUP_SUCCESS, VERIFY_EMAIL_SUCCESS } from '../../../types/auth';



const SignUpPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const handleName = (event) => {
        setName(event.target.value);
    }

    const [email, setEmail] = useState('');
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const [password, setPassword] = useState('');
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const [confirmPassword, setConfirmPassword] = useState('');
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await dispatch(signup(name, email, password, confirmPassword));

        if (response.type === SIGNUP_SUCCESS) {
            const sendEmail = await dispatch(verifyEmail(email));

            if (sendEmail.type === VERIFY_EMAIL_SUCCESS){
                navigate(`/verify-email`);
            } else {
                if (response.error) {
                    setError(response.error);
                } else {
                    setError('An unexpected error has occurred.');
                }
            }
        } else {
            if (response.error) {
                setError(response.error);
            } else {
                setError('An unexpected error has occurred.');
            }
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                            opacity: 1;
                        }
                    }

                    .scroll-left {
                        animation: scrollLeft 0.18s ease-out;
                    }
                `}
            </style>
            
            <div 
                className="scroll-left"
                style={{ 
                    backgroundImage: `url(${SignUpBG})`, 
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
                    backgroundColor: '#070F2B'
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
                    <IconButton component={Link} to={`/`}
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
                            fontSize: '33px',
                            color: '#FDF8F8',
                        }}
                    >
                        Create an account ✨
                    </Typography>
                    <Typography
                        variant='h7'
                        sx={{
                            fontWeight: 400,
                            fontSize: '15px',
                            color: '#FDF8F8',
                        }}
                    >
                        Welcome! Please enter your details.
                    </Typography>
                </header>

                <div
                    style={{
                        backgroundColor: '#FDF8F8',
                        borderRadius: '50px',
                        width: '80%',
                        maxWidth: '1000px',
                        padding: '3rem',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        height: '52vh',
                        marginBottom: '-3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        opacity: 0.9,
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
                            placeholder="Enter full name"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <NameIcon/>
                                    </InputAdornment>
                                ),
                            }} 
                            value={name}
                            onChange={handleName}
                            variant="standard" 
                            fullWidth
                            margin="normal"
                            error={!!error}
                            sx={{ maxWidth: '100%' }}
                        />

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

                        <TextField 
                            id="confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'} 
                            placeholder="Confirm Password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon/>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }} 
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            variant="standard" 
                            fullWidth
                            margin="normal"
                            error={!!error}
                            sx={{ maxWidth: '100%' }}
                        />
                    </Box>
                    <Box sx={{ marginTop: '10px' }}>
                        <Button 
                            component={Link} 
                            to={`/verify-email`} 
                            variant="contained" 
                            color="secondary" 
                            onClick={handleSubmit} 
                            style={{
                                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                                borderRadius: '15px',
                                width: '120px',
                                color: '#070F2B', 
                                backgroundColor:'#BCC0D6', 
                                marginTop: '10px',
                                '&:hover': { backgroundColor: '#BCC0D6' },
                                textTransform: 'none',
                                fontWeight: 'bold'
                            }}
                        >
                            Sign up
                        </Button>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '0 rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '20px'
                    }}>
                        <Typography 
                            variant='h7' 
                            sx={{ marginTop: '0.5rem' }}
                        >
                            Already have an account?
                        </Typography>
                        <Button 
                            component={Link} 
                            to={`/sign-in-page`} 
                            variant="text" 
                            color="secondary" 
                            style={{ 
                                color: '#535C91',
                                margin: '10px 0 0 0',
                                fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#535C91' },
                                textTransform: 'none'
                            }}
                        >
                            Sign in
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
                </div>
            </div>
        </>
    );
};

export default SignUpPage;