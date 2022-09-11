import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";

const Reload = ({ action }) => {
  return (
    <Tooltip title={"Reload"}>
      <IconButton onClick={action}>
        <CachedIcon />
      </IconButton>
    </Tooltip>
  );
};

export default Reload;
