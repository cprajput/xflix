import { Box, AppBar, Toolbar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/images/logo.png";

const SimpleHeader = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
            <img
              src={logo}
              height="35px"
              width="90px"
              alt="XFlix"
              style={{ borderRadius: "8px" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SimpleHeader;
