import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function Index() {
  const [formData, setformData] = useState({
    user_name: null,
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submittedsss");
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Sign In
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Username"
            name="user_name"
            value={formData.user_name}
            fullWidth
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            fullWidth
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
