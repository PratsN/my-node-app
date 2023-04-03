import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import "../Styles/Login.css";
import Footer from "./Footer";
import Header from "./Header";
import { useSnackbar } from "notistack";

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState("");
  let [loginDetails, setLoginDetails] = useState({
    password: "",
    email: "",
  });

  const validation = () => {
    if (!loginDetails.email) {
      setError("Please enter your Email.");
      return false;
    }
    if (!loginDetails.password) {
      setError("Please enter your Password.");
      return false;
    }
    setError("");
    return true;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    let isValid = validation();
    e.preventDefault();
    if (isValid) {
      axiosInstance
        .post("/login", loginDetails)
        .then((response) => {
          if (response.status === 200) {
            if (response.data && response.data.token) {
              localStorage.setItem(
                "authToken",
                JSON.stringify(response.data.token)
              );
              enqueueSnackbar("Login succesfully", { variant: "success" });
              navigate("/dashboard");
            }
            localStorage.setItem("username", response.data.firstName);
            // console.log("response ", response.data);
          }
        })
        .catch((err) => {
          console.log("ERR :: ", err.response.data.err);
          let error_message = err.response.data.err;
          enqueueSnackbar(error_message, { variant: "warning" });
        });
    }
  };

  return (
    <div>
      <Header hasHiddenAuthButtons={false}></Header>
      <Box className="hero-login">
        <Stack spacing={2} className="form">
          <h2 className="title">Login to Personal Account!</h2>
          <TextField
            required
            id="email"
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            placeholder="Enter Email..."
            onChange={(e) => handleInput(e)}
            value={loginDetails.email}
            fullWidth
          />

          <TextField
            required
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            fullWidth
            placeholder="Enter a password..."
            onChange={(e) => handleInput(e)}
            value={loginDetails.password}
          />
          <div>{error ? <small className="warning">{error}</small> : ""}</div>
          <a className="link" href="/forgot">
            Forgot Password ?
          </a>

          <Button className="button" variant="contained" onClick={handleSubmit}>
            Log in
          </Button>
          <p className="secondary-action">
            Don't have an account?{" "}
            <a className="link" href="/signup">
              Register now
            </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </div>
  );
};

export default Login;
