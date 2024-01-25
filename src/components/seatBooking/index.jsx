import React, { useState } from "react";
import {
  Autocomplete,
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const moviesList = ["The Godfather", "Pulp Fiction"];

export default function Index() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const totalRows = 6;
  const seatsPerRow = 8;

  const seats = Array.from(
    { length: totalRows * seatsPerRow },
    (_, index) => index + 1
  );

  const handleSeatClick = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      } else {
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };

  console.log("sososososs", seats);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: "flex", flexDirection: "row" }}>
          <Typography sx={{ color: "violet" }}>Select a Movie:</Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={moviesList}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Movie" fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Paper>
            <List sx={{ display: "flex", flexDirection: "row" }}>
              <ListItem>
                <CheckBoxOutlineBlankIcon
                  sx={{ color: "white", backgroundColor: "gray" }}
                />
                <ListItemText primary="N/A" />
              </ListItem>
              <ListItem>
                <CheckBoxOutlineBlankIcon sx={{ color: "green" }} />
                <ListItemText primary="Selected" />
              </ListItem>
              <ListItem>
                <CheckBoxOutlineBlankIcon sx={{ color: "black" }} />
                <ListItemText primary="Occupied" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper>
            <List style={{ display: "flex", flexWrap: "wrap" }}>
              {seats.map((seatNumber) => (
                <ListItem
                  key={seatNumber}
                  style={{
                    width: "12.5%",
                    boxSizing: "border-box",
                    padding: "8px",
                  }}
                >
                  <Checkbox
                    checked={selectedSeats.includes(seatNumber)}
                    onChange={() => handleSeatClick(seatNumber)}
                    sx={{
                      color: selectedSeats.includes(seatNumber)
                        ? "green"
                        : "black",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h7">{`You have Selected ${selectedSeats} for a price of `}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained">Book</Button>
        </Grid>
      </Grid>
    </>
  );
}