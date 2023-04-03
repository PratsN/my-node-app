import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Avatar, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import "../Styles/Header.css";

const Header = ({ hasHiddenAuthButtons }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const logout = () => {
    localStorage.removeItem("username");
    enqueueSnackbar("You have Logged off successfully", {
      variant: "success",
    });
    navigate("/");
  };

  //login button logic

  const login_btn = (
    <Stack spacing={2} direction="row" alignItems="center">
      <button className="login-btn" onClick={() => navigate("/login")}>
        LOGIN
      </button>
      <button className="login-btn" onClick={() => navigate("/signup")}>
        SIGNUP
      </button>
    </Stack>
  );

  //user login button display to avatar , name and logout button
  const logout_btn = (
    <Stack spacing={2} direction="row" alignItems="center">
      <Avatar
        sx={{ backgroundColor: "orange" }}
        src="avatar.png"
        alt={localStorage.getItem("username")}
      />
      <p>{localStorage.getItem("username")}</p>
      <button className="login-btn" onClick={logout}>
        LOGOUT
      </button>
    </Stack>
  );
  //header logic to toggle between login and logout state

  const alternate_header = localStorage.getItem("username")
    ? [logout_btn]
    : [login_btn];

  return (
    <>
      <div className="header">
        <Box className="logo">UM - UserManagement</Box>
        {hasHiddenAuthButtons && alternate_header}
      </div>
    </>
  );
};

export default Header;
