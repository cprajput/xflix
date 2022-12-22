import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { TRequest } from "../../models/home.model";
import { getAllVideosApi } from "../../apis/home.api";
import { useNavigate } from "react-router-dom";
import { HomeContext } from "../../context/Context";
import MovieCard from "../../components/MovieCard";

const Home = () => {
  const { videos, handleUpdateVideos, handleUpdateOriginalVideos } =
    useContext(HomeContext);

  const [fetchVideosStatus, setFetchVideosStatus] = useState<TRequest>("idle");
  const navigate = useNavigate();

  const handleOpenVideo = useCallback(
    (videoId: string) => {
      navigate(`/video/${videoId}`);
    },
    [navigate]
  );

  useEffect(() => {
    async function getData() {
      setFetchVideosStatus("pending");
      try {
        const data = await getAllVideosApi();

        handleUpdateVideos(data);
        handleUpdateOriginalVideos(data);
        setFetchVideosStatus("fulfilled");
      } catch (e) {
        setFetchVideosStatus("rejected");
      }
    }

    getData();
  }, [handleUpdateOriginalVideos, handleUpdateVideos]);

  return (
    <Box>
      <Box component="section" id="videos" sx={{ p: 2 }}>
        {fetchVideosStatus === "pending" && <CircularProgress />}

        {fetchVideosStatus === "rejected" && (
          <Typography>Something went wrong. Failed to fetch videos.</Typography>
        )}

        {fetchVideosStatus === "fulfilled" && (
          <Grid container spacing={2}>
            {videos.length ? (
              videos.map((video) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
                  <MovieCard
                    details={video}
                    handleOpenVideo={handleOpenVideo}
                  />
                </Grid>
              ))
            ) : (
              <Typography>No Videos Available.</Typography>
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Home;
