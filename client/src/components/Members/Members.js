import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button, Paper, Box, Drawer, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addMember, getMembers } from '../../actions/members';
import { useNavigate } from 'react-router-dom';

import {ReactComponent as FriendIcon} from '../icons/friendIcon.svg';
import {ReactComponent as AddFriendIcon} from '../icons/addFriendIcon.svg';

const Members = () => {
    const [newMember, setNewMember] = useState('');
    const dispatch = useDispatch();
    const members = useSelector((state) => state.members);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        dispatch(getMembers(token));
    }, [dispatch]);

    // redirects to getting started page when user isn't authenticated
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("token");
        
        if (!isAuthenticated) {
            navigate("/");
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMember.trim()) {
            dispatch(addMember(newMember));
            setNewMember('');
        }
    };

    const handleAddNewFriend = () => {
        setDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ padding: 1.5, marginTop: 4 }}>
                    <Box sx={{
                                display: 'flex', 
                                flexDirection: 'row', 
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                    >
                        <Box sx={{
                                display: 'flex', 
                                flexDirection: 'row', 
                                alignItems: 'center',
                                gap: 0.75
                            }}
                        >
                            <FriendIcon/>
                            <Typography variant="h7" fontSize='30px' fontWeight='bold'gutterBottom sx={{marginTop: 1.35}}>
                                Friends
                            </Typography>
                        </Box>
                        <IconButton onClick={handleAddNewFriend} sx={{marginTop: 1}}> <AddFriendIcon width="25px" height="25px"/> </IconButton>
                    </Box>
                    <List>
                        {members.map((member, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={member.name} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Container>

            <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={handleCloseDrawer}
                sx={{
                    '& .MuiDrawer-paper': {
                        height: '30%',  // Make the drawer fit the screen
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 0,
                        gap: 1,
                        borderRadius: '10px'
                    },
                }}
            >
                <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Enter name"
                        value={newMember}
                        onChange={(e) => setNewMember(e.target.value)}
                        sx={{ marginBottom: 1 }}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{backgroundColor: '#535C91', textTransform: 'none'}}>
                        Add Friend
                    </Button>
                </Box>
            </Drawer>
        </>
    );
};

export default Members;