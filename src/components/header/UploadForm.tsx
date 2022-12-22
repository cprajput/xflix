import * as React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogContent,
  FormHelperText,
  Box,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import dayjs from "dayjs";
import { uploadVideoApi } from "../../apis/home.api";
import { HomeContext } from "../../context/Context";
import { IFormData } from "../../models/header.model";
import { TRequest } from "../../models/home.model";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

interface IFormErrors {
  videoLink: string;
  imageLink: string;
  title: string;
}
const UploadForm: React.FC<IProps> = (props) => {
  const { open, handleClose } = props;

  const {
    handleUpdateVideos,
    handleUpdateOriginalVideos,
    videos,
    originalVideos,
  } = React.useContext(HomeContext);

  const [formData, setFormData] = React.useState<IFormData>({
    videoLink: "",
    previewImage: "",
    title: "",
    genre: "Education",
    contentRating: "7+",
    releaseDate: dayjs(new Date()).format("DD MMM YYYY"),
  });
  const [uploadStatus, setUploadStatus] = React.useState<TRequest>("idle");

  const [errors, setErrors] = React.useState<IFormErrors>({
    videoLink: "",
    imageLink: "",
    title: "",
  });

  const isValidUrl = (urlString: string) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  const validateFormData = () => {
    const { videoLink, previewImage, title } = formData;

    const errorsCopy = { ...errors };
    let error = true;

    if (!videoLink || !isValidUrl(`https://${videoLink}`)) {
      errorsCopy.videoLink = "Invalid link";
      error = false;
    }

    if (!previewImage || !isValidUrl(previewImage)) {
      errorsCopy.imageLink = "Invalid link";
      error = false;
    }

    if (!title || title.length < 4) {
      errorsCopy.title = "Title must have at least 4 characters";
      error = false;
    }
    setErrors(errorsCopy);
    return error;
  };

  const handleFormDataChange = (value: string, key: keyof IFormData) => {
    const formDataCopy = { ...formData };
    formDataCopy[key] = value;
    setFormData(formDataCopy);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (validateFormData()) {
      try {
        setUploadStatus("pending");

        const response = await uploadVideoApi(formData);

        handleUpdateVideos([...videos, response]);
        handleUpdateOriginalVideos([...originalVideos, response]);
        setUploadStatus("fulfilled");
        handleClose();
      } catch {
        setUploadStatus("rejected");
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mx: 3,
          mt: 2,
        }}
      >
        <Typography variant="h6">Upload Video</Typography>
        <IconButton size="small" onClick={handleClose}>
          <CloseIcon sx={{ fontSize: "16px" }} />
        </IconButton>
      </Box>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Video Link"
            helperText={
              errors.videoLink || "This link will be used to  derive the video"
            }
            size="small"
            sx={{ my: 2, width: "100%" }}
            value={formData.videoLink}
            onChange={(e) => {
              handleFormDataChange(e.target.value, "videoLink");
            }}
            error={!!errors.videoLink}
            required
          />

          <TextField
            label="Thumbnail Image Link"
            helperText={
              errors.imageLink ||
              "This link will be used to  preview the thumbnail image"
            }
            size="small"
            sx={{ my: 2, width: "100%" }}
            value={formData.previewImage}
            onChange={(e) => {
              handleFormDataChange(e.target.value, "previewImage");
            }}
            error={!!errors.imageLink}
            required
          />

          <TextField
            label="Title"
            helperText={
              errors.title ||
              "The title will be the representation text for video"
            }
            size="small"
            sx={{ my: 2, width: "100%" }}
            onChange={(e) => {
              handleFormDataChange(e.target.value, "title");
            }}
            error={!!errors.title}
            required
          />

          <FormControl fullWidth size="small" sx={{ my: 2 }}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={formData.genre}
              label="Genre"
              onChange={(e) => {
                handleFormDataChange(e.target.value, "genre");
              }}
            >
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
              <MenuItem value="Lifestyle ">Lifestyle</MenuItem>
            </Select>
            <FormHelperText>
              Genre will help in categorizing your videos
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth size="small" sx={{ my: 2 }}>
            <InputLabel id="ageGroup-label">
              Suitable age group for the clip
            </InputLabel>
            <Select
              labelId="ageGroup-label"
              id="ageGroup-select"
              value={formData.contentRating}
              label="Suitable age group for the clip"
              onChange={(e) => {
                handleFormDataChange(e.target.value, "contentRating");
              }}
            >
              <MenuItem value="7+">7+</MenuItem>
              <MenuItem value="12+">12+</MenuItem>
              <MenuItem value="16+">16+</MenuItem>
              <MenuItem value="18+ ">18+</MenuItem>
            </Select>
            <FormHelperText>
              This will be used to filter videos on age group suitability
            </FormHelperText>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["day", "month", "year"]}
              label="Release date"
              inputFormat="DD/MM/YYYY"
              value={formData.releaseDate}
              onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format("DD MMM YYYY");

                handleFormDataChange(formattedDate, "releaseDate");
              }}
              renderInput={(params) => (
                <TextField
                  size="small"
                  sx={{ my: 2 }}
                  {...params}
                  helperText="This will be user to sort videos"
                />
              )}
            />
          </LocalizationProvider>

          <Box sx={{ display: "flex" }}>
            <LoadingButton
              variant="contained"
              sx={{ mr: 1 }}
              size="small"
              startIcon={<FileUploadIcon />}
              type="submit"
              loading={uploadStatus === "pending"}
              loadingPosition="start"
            >
              Upload
            </LoadingButton>
            <Button
              variant="outlined"
              size="small"
              onClick={handleClose}
              disabled={uploadStatus === "pending"}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default UploadForm;
