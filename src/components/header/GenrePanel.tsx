import React, { useContext } from "react";
import {
  Box,
  MenuItem,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import ButtonWrapper from "./ButtonWrapper";
import { HomeContext } from "../../context/Context";
import { Autocomplete } from "@mui/lab";

const GenrePanel = () => {
  const { details, setDetails, handleSort, handleFilterByGenre } =
    useContext(HomeContext);
  const { genres } = details;

  const theme = useTheme();
  const isTabletOrAbove = useMediaQuery(theme.breakpoints.up("md"));

  const handleSelectGenre = (value: string | string[]) => {
    let newValues: string[] = [...details.genres];
    if (Array.isArray(value)) {
      newValues = value;
    } else {
      if (newValues.includes(value)) {
        newValues = newValues.filter((item) => item !== value);
      } else {
        newValues.push(value);
      }
    }

    setDetails((prev) => {
      return { ...prev, genres: value === "all" ? [] : newValues };
    });

    handleFilterByGenre(newValues);
  };

  const handleSortBy = (value: "viewCount" | "releaseDate") => {
    setDetails((prev) => ({ ...prev, sortBy: value }));
    handleSort(value);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: { sm: "flex", xs: "block" },
          width: { xs: "100%", sm: "unset" },
        }}
      >
        {isTabletOrAbove ? (
          <Box
            component="section"
            id="genre"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <ButtonWrapper
                label={`All Genre`}
                value="all"
                handleClick={handleSelectGenre}
                selected={!genres.length}
              />
              <ButtonWrapper
                label={`Education`}
                value="Education"
                handleClick={handleSelectGenre}
                selected={genres.includes("Education")}
              />
              <ButtonWrapper
                label={`Sports`}
                value="Sports"
                handleClick={handleSelectGenre}
                selected={genres.includes("Sports")}
              />
              <ButtonWrapper
                label={`Comedy`}
                value="Comedy"
                handleClick={handleSelectGenre}
                selected={genres.includes("Comedy")}
              />
              <ButtonWrapper
                label={`Lifestyle`}
                value="Lifestyle"
                handleClick={handleSelectGenre}
                selected={genres.includes("Lifestyle")}
              />
            </Box>
          </Box>
        ) : (
          <Autocomplete
            multiple
            id="genre-select"
            options={["Education", "Sports", "Comedy", "Lifestyle"]}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select Genres"
                placeholder="Select Genres"
              />
            )}
            sx={{
              mx: { xs: 0, sm: 1 },
              minWidth: 200,
              my: { xs: 2, sm: 0 },
              width: { xs: "100%", sm: "unset" },
            }}
            size="small"
            limitTags={2}
            value={details.genres}
            onChange={(_e, newValues) => handleSelectGenre(newValues)}
          />
        )}

        <FormControl
          size="small"
          sx={{ minWidth: 100, width: { xs: "100%", sm: "unset" } }}
        >
          <InputLabel id="sort-select-label">Sort By</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={details.sortBy || ""}
            label="Sort By"
            onChange={(e) =>
              handleSortBy(e.target.value as "viewCount" | "releaseDate")
            }
          >
            <MenuItem value="viewCount"> View Count</MenuItem>
            <MenuItem value="releaseDate">Release Date</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default GenrePanel;
