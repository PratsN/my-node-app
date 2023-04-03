import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Header from "./Header";
import Footer from "./Footer";
import "../Styles/SignUp.css";
import { useSnackbar } from "notistack";
const SignUp = () => {
  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  let [error, setError] = useState("");
  let [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const validation = () => {
    if (!signUpDetails.firstName) {
      setError("Please enter your First Name.");
      return false;
    }
    if (!signUpDetails.lastName) {
      setError("Please enter your Last Name.");
      return false;
    }
    if (!signUpDetails.email) {
      setError("Please enter your Email ID.");
      return false;
    }
    if (!signUpDetails.password) {
      setError("Please enter your password.");
      return false;
    }
    setError("");
    return true;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSignUpDetails({ ...signUpDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = validation();
    if (isValid) {
      axiosInstance
        .post("/register", signUpDetails)
        .then((response) => {
          if (response.status === 200) {
            enqueueSnackbar("Signup succesfully", { variant: "success" });
            navigate("/login");
            // console.log("RESPONSE ====> ", response.data);
          }
        })
        .catch((err) => {
          //console.log("ERR :: ", err.response.data.err);
          let error_message = err.response.data.err;
          enqueueSnackbar(error_message, { variant: "warning" });
        });
    }
  };

  return (
    <>
      <Header hasHiddenAuthButtons={false}></Header>
      <Box className="hero-signup">
        <Stack spacing={2} className="form-signup">
          <h2 className="heading-signup">Create a new Account</h2>
          <div className="form-name">
            <TextField
              required
              id="first Name"
              label="first Name"
              variant="outlined"
              title="first Name"
              name="firstName"
              placeholder="first Name"
              onChange={handleInput}
              value={signUpDetails.firstName}
              fullWidth
            />
          </div>
          <div className="form-name">
            <TextField
              required
              id="last Name"
              label="last Name"
              variant="outlined"
              title="last Name"
              name="lastName"
              placeholder="last Name"
              onChange={handleInput}
              value={signUpDetails.lastName}
              fullWidth
            />
          </div>
          <TextField
            required
            id="Email address"
            label="Email address"
            variant="outlined"
            title="Email address"
            name="email"
            placeholder="Email address"
            fullWidth
            onChange={handleInput}
            value={signUpDetails.email}
          />

          <TextField
            required
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            fullWidth
            placeholder="Enter a password with minimum 8 characters"
            onChange={handleInput}
            value={signUpDetails.password}
          />
          <div>{error ? <small className="warning">{error}</small> : ""}</div>
          <Button className="button" variant="contained" onClick={handleSubmit}>
            Sign Up
          </Button>
          <p className="secondary-action">
            Already have an account?{" "}
            <a className="link" href="login">
              Login Now
            </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default SignUp;
