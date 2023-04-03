import React from "react";
import Header from "./Header";
import UserListing from "./UserListing";
import Footer from "./Footer";
import "../Styles/UserListing.css";

const Dashboard = () => {
  return (
    <>
      <Header hasHiddenAuthButtons={true}></Header>
      <div className="headline">Welcome to User Management Portal</div>
      <UserListing />
      <Footer />
    </>
  );
};

export default Dashboard;
