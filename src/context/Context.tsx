import React, { createContext, useCallback, useState } from "react";
import { IVideos } from "../models/home.model";

interface IDetails {
  genres: string[];
  ageGroup: string;
  sortBy: "viewCount" | "releaseDate" | null;
}

interface InitialValues {
  details: IDetails;
  setDetails: React.Dispatch<React.SetStateAction<IDetails>>;
  videos: IVideos[];
  originalVideos: IVideos[];
  handleUpdateVideos: (videosDetails: IVideos[]) => void;
  handleUpdateOriginalVideos: (videosDetails: IVideos[]) => void;
  handleSort: (sortBy: "viewCount" | "releaseDate") => void;
  handleSearch: (value: string) => void;
  handleFilterByGenre: (value: string[]) => void;
  handleFilterByAgeGroup: (value: string) => void;
}

export const HomeContext = createContext({} as InitialValues);

type Props = {
  children?: JSX.Element;
};

const Context: React.FC<Props> = ({ children }) => {
  const [details, setDetails] = useState<IDetails>({
    genres: [],
    ageGroup: "any",
    sortBy: null,
  });
  const [videos, setVideos] = useState<IVideos[]>([]);
  const [originalVideos, setOriginalVideos] = useState<IVideos[]>([]);

  const handleUpdateVideos = useCallback((videosDetails: IVideos[]) => {
    setVideos(videosDetails);
  }, []);

  const handleUpdateOriginalVideos = useCallback((videosDetails: IVideos[]) => {
    setOriginalVideos(videosDetails);
  }, []);

  const handleSort = useCallback(
    (sortBy: "viewCount" | "releaseDate") => {
      if (videos && sortBy) {
        let sortedVideos: IVideos[] = [];
        if (sortBy === "viewCount") {
          sortedVideos = videos.sort((a, b) =>
            a.viewCount > b.viewCount ? 1 : -1
          );
        }

        if (sortBy === "releaseDate") {
          sortedVideos = videos.sort((a, b) =>
            new Date(a.releaseDate).getTime() >
            new Date(b.releaseDate).getTime()
              ? 1
              : -1
          );
        }

        setVideos(sortedVideos);
      }
    },
    [videos]
  );

  const handleSearch = useCallback(
    (searchValue: string) => {
      if (searchValue) {
        let searchResult: IVideos[] = [];
        searchResult = videos.filter((video) =>
          video.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setVideos(searchResult);
      } else {
        let filteredValues = [...originalVideos];

        // filter by content rating
        if (details.ageGroup && details.ageGroup !== "any") {
          filteredValues = filteredValues.filter(
            (video) => details.ageGroup === video.contentRating
          );
        }

        // filter by genre
        if (details.genres.length) {
          filteredValues = filteredValues.filter((video) =>
            details.genres.includes(video.genre)
          );
        }

        // sort

        if (details.sortBy === "viewCount") {
          filteredValues = videos.sort((a, b) =>
            a.viewCount > b.viewCount ? 1 : -1
          );
        }

        if (details.sortBy === "releaseDate") {
          filteredValues = videos.sort((a, b) =>
            new Date(a.releaseDate).getTime() >
            new Date(b.releaseDate).getTime()
              ? 1
              : -1
          );
        }

        setVideos(filteredValues);
      }
    },
    [details.ageGroup, details.genres, details.sortBy, originalVideos, videos]
  );

  const handleFilterByGenre = (values: string[]) => {
    let filteredVideo: IVideos[] = [...originalVideos];

    if (values.length) {
      filteredVideo = originalVideos.filter((video) =>
        values.includes(video.genre)
      );

      if (details.ageGroup !== "any") {
        filteredVideo = filteredVideo.filter(
          (video) => video.contentRating === details.ageGroup
        );
      }
    }

    setVideos(filteredVideo);
  };

  const handleFilterByAgeGroup = (value: string) => {
    let filteredVideo: IVideos[] = [...originalVideos];

    if (value !== "any") {
      filteredVideo = originalVideos.filter(
        (video) => video.contentRating === value
      );

      if (details.genres.length) {
        filteredVideo = filteredVideo.filter((video) =>
          details.genres.includes(video.genre)
        );
      }
    }
    setVideos(filteredVideo);
  };

  return (
    <HomeContext.Provider
      value={{
        details,
        setDetails,
        videos,
        originalVideos,
        handleUpdateVideos,
        handleUpdateOriginalVideos,
        handleSort,
        handleSearch,
        handleFilterByAgeGroup,
        handleFilterByGenre,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default Context;
