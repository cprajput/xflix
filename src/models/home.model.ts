export interface IVideos {
  votes: {
    upVotes: number;
    downVotes: number;
  };
  previewImage: string;
  viewCount: number;
  _id: string;
  videoLink: string;
  title: string;
  genre: string;
  contentRating: string;
  releaseDate: string;
}

export type TRequest = "idle" | "pending" | "fulfilled" | "rejected";
