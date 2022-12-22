import { Box, Divider, Skeleton } from "@mui/material";
import React from "react";
import HomeLoader from "./HomeLoader";

const VideoLoader = () => {
  return (
    <Box>
      <Box sx={{ py: 2 }}>
        <Skeleton
          sx={{ height: "60vh", width: "100%" }}
          animation="wave"
          variant="rectangular"
        />
      </Box>

      <Divider />

      <HomeLoader />
    </Box>
  );
};

export default VideoLoader;
