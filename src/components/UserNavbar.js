import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useAuth } from "../context/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import axios from "axios";
import GoogleTranslateComponent from "../pages/GoogleTranslateComponent";



export default function UserNavbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const storedAuth = JSON.parse(localStorage.getItem("auth")) || {};
  const token = storedAuth.token;
  const [isHovered, setIsHovered] = useState([false, false]);
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [header, setHeader] = useState("");

  useEffect(() => {
    // Reset hover effect when location changes
    setIsHovered([false, false]);
  }, [location]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    // Check if the user is an admin and redirect accordingly
    if (auth?.user?.user?.role === "1") {
      navigate("/admin-login");
    } else {
      navigate("/");
    }

    logout();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoClick = () => {
    if (token) {
      navigate(`/dashboard/${token}`);
    }
  };

  const handleChangePassword = () => {
    const id = JSON.parse(localStorage.getItem("auth"))._id;

    navigate(`/change-password/${id}/${token}`);
  };

  const fetchHeader = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/profile");
      setHeader(response.data.header);
    } catch (error) {
      console.error("Error fetching header:", error);
    }
  };

  
  useEffect(() => {
    fetchHeader(); // Fetch the header when the component mounts
  }, []);

  
  return (
    <div className="flex w-full justify-center shadow-md">
      <div className=" h-[12vh] flex items-center justify-between w-[95vw]">
        <div className="flex gap-4 ">
          <div>
            <img
              src="https://en.wikipedia.org/static/images/icons/wikipedia.png"
              alt="Logo"
              style={{
                width: "60px",
                height: "60px",
                cursor: "pointer",
              }}
              onClick={handleLogoClick}
            />
          </div>
          <div>
            <Typography
              variant="h6"
              sx={{ color: "black" }}
              onClick={handleLogoClick}
            >
              {header && <span>{header}</span>}
            </Typography>
            <p style={{fontFamily:"Times New Roman"}}>The User Encyclopedia</p>
          </div>
        </div>
      
        <div>
          {auth?.token ? (
          
            <div className="flex gap-2 items-center">
                <GoogleTranslateComponent/>
              {"          "}
              <Button
                variant={isHovered[1] ? "contained" : "outlined"}
                onMouseEnter={() => setIsHovered([false, true])}
                onMouseLeave={() => setIsHovered([false, false])}
                style={{
                  "&:hover": { backgroundColor: "#your-hover-color" },
                  height:"30px"
                }}
                onClick={handleLogout}
              >
                {" "}
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button
                variant={isHovered[0] ? "contained" : "outlined"}
                onMouseEnter={() => setIsHovered([true, false])}
                onMouseLeave={() => setIsHovered([false, false])}
                style={{
                  "&:hover": { backgroundColor: "#your-hover-color" },
                }}
              >
                <Link to="/" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </Button>

              <Button
                variant={isHovered[1] ? "contained" : "outlined"}
                onMouseEnter={() => setIsHovered([false, true])}
                onMouseLeave={() => setIsHovered([false, false])}
                style={{
                  "&:hover": { backgroundColor: "#your-hover-color" },
                }}
              >
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Signup
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      
    </div>
  );
}