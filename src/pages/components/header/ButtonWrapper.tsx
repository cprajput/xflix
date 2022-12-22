import React from "react";
import { Button } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface IProps {
  label: string;
  value: string;
  StartIcon?: SvgIconComponent | null;
  EndIcon?: SvgIconComponent | null;
  handleClick: (value: string) => void;
  selected?: boolean;
}

const ButtonWrapper: React.FC<IProps> = (props) => {
  const { label, value, StartIcon, EndIcon, handleClick, selected } = props;
  return (
    <Button
      variant={selected ? "contained" : "outlined"}
      sx={{ mx: 1, textTransform: "none" }}
      {...(StartIcon && { startIcon: <StartIcon /> })}
      {...(EndIcon && { endIcon: <EndIcon /> })}
      onClick={() => handleClick(value)}
    >
      {label}
    </Button>
  );
};
ButtonWrapper.defaultProps = {
  StartIcon: null,
  EndIcon: null,
  selected: false,
};

export default ButtonWrapper;
