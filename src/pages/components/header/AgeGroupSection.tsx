import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { HomeContext } from "../../../context/Context";
import ButtonWrapper from "./ButtonWrapper";

const AgeGroupSection = () => {
  const { details, setDetails, handleFilterByAgeGroup } =
    useContext(HomeContext);
  const { ageGroup } = details;

  const theme = useTheme();
  const isTabletOrAbove = useMediaQuery(theme.breakpoints.up("md"));

  const handleSelectAgeGroup = (value: string) => {
    setDetails((prev) => ({
      ...prev,
      ageGroup: value,
    }));

    handleFilterByAgeGroup(value);
  };

  return isTabletOrAbove ? (
    <Box
      component="section"
      id="ageGroup"
      sx={{ width: "100%", display: "flex", justifyContent: "center", p: 2 }}
    >
      <ButtonWrapper
        label={`Any Age Group`}
        value="any"
        handleClick={handleSelectAgeGroup}
        selected={ageGroup === "any"}
      />
      <ButtonWrapper
        label={`7+`}
        value="7+"
        handleClick={handleSelectAgeGroup}
        selected={ageGroup === "7+"}
      />
      <ButtonWrapper
        label={`12+`}
        value="12+"
        handleClick={handleSelectAgeGroup}
        selected={ageGroup === "12+"}
      />
      <ButtonWrapper
        label={`16+`}
        value="16+"
        handleClick={handleSelectAgeGroup}
        selected={ageGroup === "16+"}
      />
      <ButtonWrapper
        label={`18+`}
        value="18+"
        handleClick={handleSelectAgeGroup}
        selected={ageGroup === "18+"}
      />
    </Box>
  ) : (
    <FormControl
      size="small"
      sx={{
        minWidth: 100,
        mx: { xs: 0, sm: 1 },
        width: { xs: "100%", sm: "unset" },
      }}
    >
      <InputLabel id="genre-select-label">Age Group</InputLabel>
      <Select
        labelId="genre-select-label"
        id="genre-select"
        value={ageGroup}
        label="Age Group"
        onChange={(e) => handleSelectAgeGroup(e.target.value)}
      >
        <MenuItem value="any">Any</MenuItem>
        <MenuItem value="7+">7+</MenuItem>
        <MenuItem value="12+">12+</MenuItem>
        <MenuItem value="16+">16+</MenuItem>
        <MenuItem value="18+">18+</MenuItem>
      </Select>
    </FormControl>
  );
};

export default AgeGroupSection;
