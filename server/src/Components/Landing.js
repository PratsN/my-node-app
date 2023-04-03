import "../Styles/Landing.css";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header hasHiddenAuthButtons={true}></Header>
      <Box className="content">
        <div className="landing-text">
          <p className="hero-heading">
            Welcome to User Management Portal !
            <br />
          </p>
        </div>
      </Box>
      <Footer />
    </>
  );
};

export default Landing;
