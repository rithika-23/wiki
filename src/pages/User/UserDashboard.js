import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import { Link, useLocation } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WikipediaSearch from "../WikipediaSearch";

const UnauthenticatedDashboard = () => (
  <>
    <h1>Please login to access the dashboard</h1>
    <Link to="/">Click here to login</Link>
  </>
);
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: ` custom-tab-${index}`,
    "aria-controls": ` custom-tabpanel-${index}`,
  };
}

const AuthenticatedDashboard = ({ token }) => {
  return (
    <div>
      <UserNavbar />
     <WikipediaSearch/>
    </div>
  );
};

const Dashboard = () => {
  const location = useLocation();
  const tokenFromUrl = new URLSearchParams(location.search).get("auth");
  const auth = JSON.parse(localStorage.getItem("auth")) || {};

  if (!auth.token && !tokenFromUrl) {
    return <UnauthenticatedDashboard />;
  }

  return <AuthenticatedDashboard token={auth.token || tokenFromUrl} />;
};

export default Dashboard;
