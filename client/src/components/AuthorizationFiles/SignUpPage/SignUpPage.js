import React from 'react';
import { Box, Button, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import SignUpBG from '../../Backgrounds/SignUpBG.svg'; 
import { ReactComponent as NameIcon } from '../../icons/NameIcon.svg';
import { ReactComponent as EmailIcon } from '../../icons/EmailIcon.svg';
import { ReactComponent as PasswordIcon } from '../../icons/PasswordIcon.svg';
import { ReactComponent as Visibility } from '../../icons/PasswordVisible.svg';
import { ReactComponent as VisibilityOff } from '../../icons/PasswordInvisible.svg';
import { ReactComponent as BackIcon } from '../../icons/BackIconDark.svg';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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
                className="scroll-left"  // Apply the animation class here
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
                    alignItems: 'flex-end', // Aligns the box to the bottom of the screen
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
                        maxWidth: '10000px',
                        padding: '3rem',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        height: '52vh',
                        marginBottom: '-3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start', // Align items to the top within the box
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
                            variant="standard" 
                            fullWidth
                            margin="normal"
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
                            variant="standard" 
                            fullWidth
                            margin="normal"
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
                            variant="standard" 
                            fullWidth
                            margin="normal"
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
                            variant="standard" 
                            fullWidth
                            margin="normal"
                            sx={{ maxWidth: '100%' }}
                        />
                    </Box>
                    <Box sx={{
                        marginTop:'10px'
                    }}>
                        <Button component={Link} to={`/verify-email`} variant="contained" color="secondary" style={{
                            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                            borderRadius: '15px',
                            width: '120px',
                            color: '#070F2B', 
                            backgroundColor:'#BCC0D6', 
                            marginTop: '10px',
                            '&:hover': {backgroundColor: '#BCC0D6'}
                            }}>
                            Sign up
                        </Button>
                    </Box>
                    <Box sx ={{
                        display:'flex',
                        flexDirection: 'row',
                        gap: '0 rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '20px'
                    }}>
                        <Typography variant='h7' sx={{
                             marginTop: '0.5rem', 
                        }}>
                            Already have an account?
                        </Typography>
                        <Button component={Link} to={`/sign-in-page`} variant="text" color="secondary" 
                            style={{ 
                            color: '#535C91',
                            margin:'10px 0 0 0',
                            fontWeight: 'bold',
                            '&:hover': {backgroundColor: '#535C91'}
                            }}>
                        Sign in
                    </Button>
                    </Box>
                </div>
            </div>
        </>
    );
};

export default SignUpPage;
