import React from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/home/Home";
import Video from "../pages/video/Video";

const RouteConfig = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/video/*" element={<Video />} />
      </Route>
    </Routes>
  );
};

export default RouteConfig;
