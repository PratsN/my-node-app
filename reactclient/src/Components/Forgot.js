import { Button, Stack, TextField } from "@mui/material";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Box } from "@mui/system";
import React, { useState } from "react";
import "../Styles/Login.css";
import axiosInstance from "../utils/axiosInstance";
import { isLower, isUpper } from "../lib/stringValidator";
import { useSnackbar } from "notistack";
// import validator from "validator";

const Forgot = () => {
  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [error, setError] = useState("");
  let [forgot, setForgot] = useState({
    password: "",
    email: "",
  });

  const validation = () => {
    if (!forgot.email) {
      setError("Please enter your Email.");
      return false;
    }
    if (!forgot.password) {
      setError("Please enter your Password.");
      return false;
    }
    setError("");
    return true;
  };

  //   forgot.email = id;
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForgot({ ...forgot, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = validation();
    if (isValid) {
      if (
        !isUpper(forgot.password) ||
        !isLower(forgot.password) ||
        forgot.password.length < 8
      ) {
        enqueueSnackbar(
          "Password should contain atleast one uppercase, one lowercase , length must be greater or equal to 8 and it should be alphanumeric",
          { variant: "warning" }
        );
        return;
      }

      axiosInstance
        .post("/forgot", forgot)
        .then((response) => {
          if (response.status === 200) {
            navigate("/login");
            enqueueSnackbar("Password Changed succesfully", {
              variant: "success",
            });
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
      <Box className="hero-login">
        <Stack spacing={2} className="form">
          <h2 className="title">Reset Password</h2>
          <TextField
            required
            id="email"
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            placeholder="Enter Email..."
            onChange={(e) => handleInput(e)}
            value={forgot.email}
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
            value={forgot.password}
          />
          <div>{error ? <small className="warning">{error}</small> : ""}</div>

          <Button className="button" variant="contained" onClick={handleSubmit}>
            RESET
          </Button>
          <a className="link" href="/login">
            Login
          </a>
        </Stack>
      </Box>
    </div>
  );
};

export default Forgot;
