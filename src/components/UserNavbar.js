import * as React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import GoogleTranslateComponent from "./GoogleTranslateComponent";

export default function UserNavbar() {
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
            />
          </div>
          <div>
            <h2>WIKIMEDIA</h2>
            <p style={{ fontFamily: "Times New Roman" }}>
              The User Encyclopedia
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <GoogleTranslateComponent />
        </div>
      </div>
    </div>
  );
}
