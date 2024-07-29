import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button, Paper, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addMember, getMembers } from '../../actions/members';

const Members = () => {
    const [newMember, setNewMember] = useState('');
    const dispatch = useDispatch();
    const members = useSelector((state) => state.members);

    useEffect(() => {
        dispatch(getMembers());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMember.trim()) {
            dispatch(addMember(newMember));
            setNewMember('');
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Friends
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Add new friend"
                        value={newMember}
                        onChange={(e) => setNewMember(e.target.value)}
                        sx={{ marginBottom: 1 }}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{backgroundColor: '#535C91'}}>
                        Add Friend
                    </Button>
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
    );
};

export default Members;