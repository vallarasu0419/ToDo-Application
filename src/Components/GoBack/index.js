import { Grid, Stack } from "@mui/material";
import { MdOutlineArrowBack } from "react-icons/md";
import React from "react";

const index = ({ navigate }) => {
  return (
    <Stack
      sx={{
        bgcolor: "#0D51BA",
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      }}
    >
      <Grid container>
        <Grid item xs={1} sm={1} md={1} display={"flex"} alignItems={"center"}>
          <MdOutlineArrowBack
            color={"white"}
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer", marginLeft: "20%" }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default index;
