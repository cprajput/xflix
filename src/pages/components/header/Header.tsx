import * as React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { AppBar, Box, Toolbar, InputBase, Grid, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import GenrePanel from "./GenrePanel";
import AgeGroupSection from "./AgeGroupSection";
import UploadForm from "./UploadForm";
import { HomeContext } from "../../../context/Context";
import logo from "./../../../assets/images/logo.png";
import { debounce } from "../../../utils/utils";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const { handleSearch } = React.useContext(HomeContext);
  const searchRef = React.useRef<string>("");

  const theme = useTheme();
  const isTabletOrAbove = useMediaQuery(theme.breakpoints.up("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container sx={{ mb: { xs: 1, mdd: 0 } }}>
            <Grid item md={3} xs={12}>
              <img
                src={logo}
                height="35px"
                width="90px"
                alt="XFlix"
                style={{ borderRadius: "8px" }}
              />
            </Grid>

            <Grid item md={6} xs={8}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                  ref={searchRef}
                  onChange={debounce(
                    (
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => handleSearch(e.target.value)
                  )}
                />
              </Search>
            </Grid>

            <Grid
              item
              md={3}
              xs={4}
              sx={{ display: "flex", justifyContent: "end" }}
            >
              <Button
                startIcon={<FileUploadOutlinedIcon />}
                sx={{ textTransform: "none" }}
                variant="contained"
                onClick={handleClickOpen}
              >
                Upload
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        {isTabletOrAbove && (
          <>
            <Box component="section">
              <GenrePanel />
            </Box>

            <AgeGroupSection />
          </>
        )}
        {open && <UploadForm open={open} handleClose={handleClose} />}
      </AppBar>

      {!isTabletOrAbove && (
        <Box
          component="section"
          sx={{
            mt: 2,
            display: { sm: "flex", xs: "block" },
            justifyContent: "end",
            mx: 3,
          }}
        >
          <AgeGroupSection />

          <GenrePanel />
        </Box>
      )}
    </Box>
  );
};
export default Header;
