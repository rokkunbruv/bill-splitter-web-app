import React from 'react';
import { Button, Grid } from '@mui/material';

const NumberPad = ({ onClick }) => {
  const buttons = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 9,
    'C', 0 
  ];

  return (
    <Grid container spacing={1} style={{ maxWidth: '90%', margin: 'auto' }}>
      {buttons.map((button) => (
        <Grid item xs={4} key={button}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => onClick(button)}
            style={{ 
              height: '10vh', 
              fontSize: '8vw', 
              borderRadius: '15px', 
              backgroundColor: '#535C91',
            }}
          >
            {button}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default NumberPad;