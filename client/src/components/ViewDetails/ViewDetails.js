import React from "react";
import { SwipeableDrawer, Box, Typography, IconButton, Button, AppBar, BottomNavigation, CardContent } from '@mui/material';
import { getReceipts } from '../../actions/receipts';

const ViewDetails = ({open, onClose, receipt, dispatch, deleteReceipt}) => {
    return(
        <>details--himuon paning drawer nlng AAAA</>
        // <SwipeableDrawer
        //     anchor="bottom"
        //     open={open}
        //     onClose={onClose}
        //     onOpen={() => {}}
        //     sx={{
        //         '& .MuiDrawer-paper': {
        //             height: '100%',  // Make the drawer fit the screen
        //             width: '100%',
        //             display: 'flex',
        //             flexDirection: 'column',
        //             justifyContent: 'center',
        //             alignItems: 'center',
        //             margin: 0,
        //             gap: 1
        //         },
        //     }}
        // >
        //     <AppBar
        //         sx={{
        //             width: '100%',
        //             height: '10%',
        //             bgcolor: '#C8C7E0',
        //             margin: '0 0 37.5rem 0',
        //             display: 'flex',
        //             flexDirection: 'row',
        //             alignItems: 'center',
        //             justifyContent: 'center',
        //             position: 'fixed',
        //             zIndex: 1,
        //             color: '#070F2B',
        //             gap: 2,
        //             padding: 2 
        //         }}
        //     >
        //         <IconButton onClick={onClose} sx={{position: 'absolute', left: 16}}>
        //             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                 <path fill-rule="evenodd" clip-rule="evenodd" d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z" fill="black"/>
        //                 <path d="M12 19L5 12L12 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        //             </svg>
        //         </IconButton>
        //         <Typography variant='h7' fontWeight='bold' fontSize='33px' textAlign='center'>Split Details</Typography>
        //     </AppBar>

        //     <Box
        //         sx={{ width: 250, padding: 2, margin: '5rem 0 0 0' }}
        //         role="presentation"
        //     >
        //         {receipt.usersWithItems.map((user, index) => (
        //         <CardContent key={index} sx={{ border: 'solid', borderWidth: "1px", padding: 1, marginBottom: '5px', borderRadius: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        //             <Typography variant="body2" color="textSecondary">{user.userName}</Typography>
        //             <Box sx={{ flexGrow: 1 }} />
        //             <Typography variant="body2" color="textSecondary">Bill: {user.bill.toFixed(2)}</Typography>
        //         </CardContent>
        //         ))}

        //         <Button component={Link} to={`/split-receipt/${receipt._id}`} size="small" color="primary">
        //             Split
        //         </Button>
        //         <Button size="small" color="primary" onClick={() => dispatch(deleteReceipt(receipt._id))}>
        //             <DeleteIcon fontSize='small' />
        //             Delete
        //         </Button>
        //     </Box>

        //     <BottomNavigation
        //         sx={{
        //             position: 'fixed',
        //             bottom: -10,
        //             left: 0,
        //             right: 0,
        //             bgcolor: '#C8C7E0',
        //             zIndex: 1201,  // Ensure it is above other content
        //         }}
        //     >
        //     </BottomNavigation>
        // </SwipeableDrawer>  
    );
};

export default ViewDetails;