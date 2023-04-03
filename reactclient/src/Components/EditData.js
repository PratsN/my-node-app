import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { Button, inputClasses } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
const EditData = ({ id }) => {
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  let [error, setError] = useState("");
  const [input, setInput] = useState({
    name: "",
    city: "",
    occupation: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const validation = () => {
    if (!input.name) {
      setError("Please enter your Name.");
      return false;
    }
    if (!input.city) {
      setError("Please enter your city.");
      return false;
    }
    if (!input.occupation) {
      setError("Please enter your occupation.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = validation();
    if (isValid) {
      axiosInstance
        .patch(`/table/${id}`, input)
        .then((response) => {
          if (response.status === 200) {
            enqueueSnackbar("User Deatils Updated succesfully", {
              variant: "success",
            });
            window.location.reload();
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
    <div>
      <IconButton aria-label="update" onClick={handleClickOpen}>
        <RateReviewIcon sx={{ color: "dodgerblue" }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update User Details</DialogTitle>
        <DialogContent
          sx={{
            minWidth: 300,
            padding: 4,
          }}
        >
          <TextField
            sx={{
              minWidth: 250,
              margin: 1,
            }}
            required
            id="Name"
            label="Name"
            variant="standard"
            title="Name"
            name="name"
            placeholder="What should we call you ?"
            onChange={handleInput}
            value={input.name}
            fullWidth
          />

          <TextField
            sx={{
              minWidth: 250,
              margin: 1,
            }}
            required
            id="City"
            label="City"
            variant="standard"
            title="City"
            name="city"
            placeholder="Where do you live ?"
            onChange={handleInput}
            value={input.city}
            fullWidth
          />

          <TextField
            sx={{
              minWidth: 250,
              margin: 1,
            }}
            required
            id="Occupation"
            label="Occupation"
            variant="standard"
            title="Occupation"
            name="occupation"
            placeholder="What do you do ?"
            fullWidth
            onChange={handleInput}
            value={input.occupation}
          />
          <div>{error ? <small className="warning">{error}</small> : ""}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditData;
