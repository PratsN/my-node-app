import React, { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useSnackbar } from "notistack";

const AddUser = () => {
  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  let [error, setError] = useState("");
  let [userDetails, setUserDetails] = useState({
    name: "",
    city: "",
    occupation: "",
  });

  const validation = () => {
    if (!userDetails.name) {
      setError("Please enter your Name.");
      return false;
    }
    if (!userDetails.city) {
      setError("Please enter your city.");
      return false;
    }
    if (!userDetails.occupation) {
      setError("Please enter your occupation.");
      return false;
    }
    setError("");
    return true;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = validation();
    if (isValid) {
      axiosInstance
        .post("/table", userDetails)
        .then((response) => {
          if (response.status === 200) {
            enqueueSnackbar("User added succesfully", { variant: "success" });
            navigate("/dashboard");
            console.log("RESPONSE ====> ", response.data);
          }
        })
        .catch((err) => {
          enqueueSnackbar(err, { variant: "warning" });
        });
    }
  };

  return (
    <>
      <Box className="hero-signup">
        <Stack spacing={2} className="form-signup">
          <h2 className="heading-signup">Add new user to Table</h2>
          <div className="form-name">
            <TextField
              required
              id="Name"
              label="Name"
              variant="outlined"
              title="Name"
              name="name"
              placeholder="What should we call you ?"
              onChange={handleInput}
              value={userDetails.name}
              fullWidth
            />
          </div>
          <div className="form-name">
            <TextField
              required
              id="City"
              label="City"
              variant="outlined"
              title="City"
              name="city"
              placeholder="Where do you live ?"
              onChange={handleInput}
              value={userDetails.city}
              fullWidth
            />
          </div>
          <TextField
            required
            id="Occupation"
            label="Occupation"
            variant="outlined"
            title="Occupation"
            name="occupation"
            placeholder="What do you do ?"
            fullWidth
            onChange={handleInput}
            value={userDetails.occupation}
          />
          <div>{error ? <small className="warning">{error}</small> : ""}</div>
          <Button className="button" variant="contained" onClick={handleSubmit}>
            Add User
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default AddUser;
