import React from "react";
import Drawer from "@mui/material/Drawer";
import { Box, List, ListItem, ListItemButton, Typography } from "@mui/material";

const SideBar = () => {
  return (
    <div>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <Typography variant="h6">TO DO LOGO</Typography>
        </Box>
        <List>
          <ListItem>
            <ListItemButton>
              <Typography>users</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default SideBar;
