import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import {
  getAllVideosApi,
  getVideoDetailsApi,
  updateVideoApi,
} from "../../apis/home.api";
import { IVideos, TRequest } from "../../models/home.model";
import MovieCard from "../../components/MovieCard";

const Video = () => {
  const [currentVideo, setCurrentVideo] = useState<IVideos | null>(null);
  const [videos, setVideos] = useState<IVideos[]>([]);
  const [fetchVideosStatus, setFetchVideosStatus] = useState<TRequest>("idle");
  const [fetchAllVideosStatus, setFetchAllVideosStatus] =
    useState<TRequest>("idle");

  const location = useLocation();
  const navigate = useNavigate();

  const pathName = useMemo(() => {
    return location.pathname.split("/")[2];
  }, [location.pathname]);

  const handleOpenVideo = useCallback(
    (videoId: string) => {
      navigate(`/video/${videoId}`);
    },
    [navigate]
  );

  const handleVotes = async (type: "upVote" | "downVote") => {
    if (currentVideo) {
      let currentVideoCopy = { ...currentVideo };

      if (currentVideoCopy.votes) {
        const { upVotes, downVotes } = currentVideoCopy.votes;
        currentVideoCopy = {
          ...currentVideoCopy,
          votes: {
            upVotes: type === "upVote" ? upVotes + 1 : upVotes,
            downVotes: type === "downVote" ? downVotes + 1 : downVotes,
          },
        };
      } else {
        currentVideoCopy = {
          ...currentVideoCopy,
          votes: {
            upVotes: type === "upVote" ? 1 : 0,
            downVotes: type === "downVote" ? 1 : 0,
          },
        };
      }

      updateVideoApi({
        vote: type,
        change: "increase",
        videoId: currentVideo._id,
      });

      setCurrentVideo(currentVideoCopy);
    }
  };

  useEffect(() => {
    async function getData() {
      setFetchVideosStatus("pending");

      Promise.allSettled([
        getAllVideosApi(),
        getVideoDetailsApi(pathName),
      ]).then((result) => {
        if (result[0].status === "fulfilled") {
          setVideos(result[0].value);
          setFetchAllVideosStatus("fulfilled");
        } else {
          setFetchAllVideosStatus("rejected");
        }

        if (result[1].status === "fulfilled") {
          setCurrentVideo(result[1].value);
          setFetchVideosStatus("fulfilled");
        } else {
          setFetchVideosStatus("rejected");
        }
      });
    }

    getData();
  }, [pathName]);

  return (
    <Box>
      <Box component="section" id="videoPlayerSection">
        <Box>
          {fetchVideosStatus === "pending" && <CircularProgress />}
          {fetchVideosStatus === "fulfilled" && (
            <iframe
              src={`https://${currentVideo?.videoLink}`}
              title={currentVideo?.title}
              style={{
                width: "100%",
                height: "60vh",
                border: "1px solid black",
                borderRadius: "4px",
              }}
            ></iframe>
          )}
          {fetchVideosStatus === "rejected" && (
            <Typography>
              Something went wrong. Failed to fetch videos.
            </Typography>
          )}
        </Box>

        <Box
          id="videoDetails"
          sx={{ display: "flex", justifyContent: "space-between", py: 2 }}
        >
          {fetchAllVideosStatus === "pending" && <CircularProgress />}
          {fetchAllVideosStatus === "fulfilled" && (
            <>
              <Box>
                <Typography variant="h5">{currentVideo?.title}</Typography>

                <Box sx={{ display: "flex" }}>
                  <Typography
                    variant="caption"
                    sx={{ mr: 2, color: "primary.main" }}
                  >
                    views: {currentVideo?.viewCount}
                  </Typography>
                  <Typography variant="caption">
                    {currentVideo?.releaseDate}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex" }}>
                <Button
                  startIcon={<ThumbUpIcon />}
                  onClick={() => handleVotes("upVote")}
                  sx={{ color: "primary.main" }}
                >
                  {currentVideo?.votes.upVotes}
                </Button>

                <Button
                  startIcon={<ThumbDownAltIcon />}
                  onClick={() => handleVotes("downVote")}
                  sx={{ color: "secondary.main" }}
                >
                  {currentVideo?.votes.downVotes}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />
      <Box component="section" id="otherVideosSection">
        <Grid container spacing={2}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
              <MovieCard details={video} handleOpenVideo={handleOpenVideo} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Video;
