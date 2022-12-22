import axios from "axios";
import { IFormData } from "../models/header.model";
import { IVideos } from "../models/home.model";

const server = "https://xflix-backend-bicn.onrender.com/v1";

export const getAllVideosApi = async () => {
  const response = await axios.get<{ videos: IVideos[] }>(`${server}/videos/`);

  return response.data.videos;
};

export const getVideoDetailsApi = async (videoId: string) => {
  const response = await axios.get<IVideos>(`${server}/videos/${videoId}`);

  return response.data;
};

export const uploadVideoApi = async (video: IFormData) => {
  const response = await axios.post<IVideos>(`${server}/videos`, video);

  return response.data;
};

export const updateVideoApi = async (payload: {
  vote: "upVote" | "downVote";
  change: "increase" | "decrease";
  videoId: string;
}) => {
  const { vote, change, videoId } = payload;
  const response = await axios.patch<IVideos>(
    `${server}/videos/${videoId}/votes/`,
    { vote, change }
  );

  return response.data;
};
