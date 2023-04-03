import Header from "./Header";
import Footer from "./Footer";
import "../Styles/Landing.css";
import { Box } from "@mui/system";
const Landing = () => {
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
