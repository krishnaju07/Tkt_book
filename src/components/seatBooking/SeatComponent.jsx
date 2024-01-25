import React from 'react';
import { Grid, Paper, List, ListItem, CheckBoxOutlineBlankIcon, ListItemText } from '@mui/material';

const SeatComponent = () => {
  const seats = Array.from({ length: 48 }, (_, index) => index + 1);

  return (
      <Paper>
        sss
        <List style={{ display: 'flex', flexDirection: 'row', padding: 16 }}>
          {seats.map((seatNumber) => (
            <ListItem key={seatNumber} style={{ marginRight: 8 }}>
              <CheckBoxOutlineBlankIcon sx={{ color: 'black' }} />
              <ListItemText primary={`Seat ${seatNumber}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
  );
};

export default SeatComponent;
