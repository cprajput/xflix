import { Card, CardContent, Skeleton } from "@mui/material";
import React from "react";

const CardLoader = () => {
  return (
    <Card sx={{ width: "100%" }}>
      <Skeleton sx={{ height: 160 }} animation="wave" variant="rectangular" />

      <CardContent>
        <React.Fragment>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </React.Fragment>
      </CardContent>
    </Card>
  );
};

export default CardLoader;
