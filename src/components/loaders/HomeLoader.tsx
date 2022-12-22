import { Box, Grid } from "@mui/material";
import React from "react";
import CardLoader from "./CardLoader";

const HomeLoader = () => {
  const createArray = (length: number) => {
    const arr: number[] = [];
    for (let i = 0; i < length; i++) {
      arr.push(i);
    }
    return arr;
  };
  return (
    <Box>
      <Grid container spacing={2}>
        {createArray(12).map((ele) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={ele}>
            <CardLoader />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeLoader;
