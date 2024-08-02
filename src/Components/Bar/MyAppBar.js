import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const MyAppBar = () => {
  return (
    <div>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6">TO DO LOGO</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MyAppBar;
