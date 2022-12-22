import * as React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { IVideos } from "../../models/home.model";

interface IProps {
  details: IVideos;
  handleOpenVideo: (videoId: string) => void;
}

const MovieCard: React.FC<IProps> = ({ details, handleOpenVideo }) => {
  const { title, releaseDate, previewImage, _id: videoId, viewCount } = details;

  return (
    <Card sx={{ cursor: "pointer" }} onClick={() => handleOpenVideo(videoId)}>
      <CardMedia
        component="img"
        height="160"
        image={previewImage}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          views : {viewCount}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {releaseDate}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default MovieCard;
