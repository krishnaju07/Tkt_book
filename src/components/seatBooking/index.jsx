import React, { useState, useEffect } from "react";
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

const moviesList = [
  { title: "Singapore Saloon(200)", price: 200 },
  { title: "Leo(100)", price: 100 },
  {title : "Jailer(150)" ,price : 150}
];

const totalRows = 6;
const seatsPerRow = 8;

const generateSeats = () =>
  Array.from({ length: totalRows * seatsPerRow }, (_, index) => index + 1);

export default function Index() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState({});
  const [currentMovie, setCurrentMovie] = useState(null);
  const [seats, setSeats] = useState(generateSeats());
  const [errorMessage, setErrorMessage] = useState("");

  console.log(currentMovie,selectedSeats,occupiedSeats);

  useEffect(() => {
    setSelectedSeats([]);
    setSeats(generateSeats());
    setErrorMessage("");
  }, [currentMovie]);

  const sumTicketPrice = () => {
    return selectedSeats.length * (currentMovie ? currentMovie.price : 0);
  };

  const isSeatOccupied = (seatNumber) =>
    occupiedSeats[currentMovie?.title]?.includes(seatNumber) || false;

  const handleSeatClick = (seatNumber) => {
    if (!currentMovie) {
      setErrorMessage("Please select a movie first.");
      return;
    }

    if (isSeatOccupied(seatNumber)) {
      return;
    }

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      } else {
        return [...prevSelectedSeats, seatNumber];
      }
    });

    setErrorMessage("");
  };

  const handleBookClick = () => {
    if (!currentMovie) {
      setErrorMessage("Please select a movie first.");
      return;
    }

    setOccupiedSeats((prevOccupiedSeats) => ({
      ...prevOccupiedSeats,
      [currentMovie?.title]: [
        ...(prevOccupiedSeats[currentMovie?.title] || []),
        ...selectedSeats,
      ],
    }));

    setSelectedSeats([]);
    setErrorMessage("");
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: "flex", flexDirection: "row" }}>
          <Typography sx={{ color: "violet" }}>Select a Movie:</Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={moviesList}
            getOptionLabel={(option) => option.title}
            onChange={(event, newValue) => setCurrentMovie(newValue)}
            value={currentMovie}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Movie" fullWidth />
            )}
          />
        </Grid>

        {errorMessage && (
          <Grid item xs={12}>
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          </Grid>
        )}

        <Grid item xs={12}>
          <Paper>
            <List sx={{ display: "flex", flexDirection: "row" }}>
              <ListItem>
                <CheckBoxOutlineBlankIcon
                  sx={{ color: "white", backgroundColor: "#e4e6d5" }}
                />
                <ListItemText primary="N/A" />
              </ListItem>
              <ListItem>
                <CheckBoxOutlineBlankIcon sx={{ color: "#3480ba" }} />
                <ListItemText primary="Selected" />
              </ListItem>
              <ListItem>
                <CheckBoxOutlineBlankIcon sx={{ color: "lightblack",backgroundColor:'lightgray' }} />
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
                    checked={
                      selectedSeats.includes(seatNumber) ||
                      isSeatOccupied(seatNumber)
                    }
                    onChange={() => handleSeatClick(seatNumber)}
                    sx={{
                      color: selectedSeats.includes(seatNumber)
                        ? "green"
                        : isSeatOccupied(seatNumber)
                        ? "black"
                        : "default",
                    }}
                    disabled={isSeatOccupied(seatNumber)}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h7">{`You have Selected ${
            selectedSeats.length || 0
          } for a price of ${sumTicketPrice()}`}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleBookClick}>
            Book
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
