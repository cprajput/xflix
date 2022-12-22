import { Box } from "@mui/system";
import React, { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import SimpleHeader from "../components/header/SimpleHeader";

const AppLayout = () => {
  const location = useLocation();

  const pathName = useMemo(() => {
    return location.pathname.split("/")[1];
  }, [location.pathname]);

  return (
    <Box sx={{ minWidth: 350 }}>
      {pathName === "video" ? <SimpleHeader /> : <Header />}
      <Box sx={{ p: { xs: 1, md: 2 } }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
