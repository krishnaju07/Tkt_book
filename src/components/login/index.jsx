import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Grid, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { useHistory, useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  user_name: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d@$!%*#?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number"
    ),
});

const initialValues = {
  user_name: "",
  password: "",
};

export default function Index() {
  let navigate = useNavigate();


  const handleSubmit = (values) => {
    console.log("Form submitted", values);
    navigate("/seatbooking");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Sign In
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Field
                as={TextField}
                label="Username"
                name="user_name"
                fullWidth
                helperText={<ErrorMessage name="user_name" />}
                error={!!(touched.user_name && errors.user_name)}
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                as={TextField}
                type="password"
                label="Password"
                name="password"
                fullWidth
                helperText={<ErrorMessage name="password" />}
                error={!!(touched.password && errors.password)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
