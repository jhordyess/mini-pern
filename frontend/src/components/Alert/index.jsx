import React from "react";
import MUIAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    handleOpen,
  }));

  const [data, setData] = React.useState({ msg: "", severity: "success" });

  const handleOpen = ({ msg, severity }) => {
    setData({ msg, severity });
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    // setData({ msg: "", severity: "success" });
  };
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <MUIAlert
        onClose={handleClose}
        severity={data.severity}
        sx={{ width: "100%" }}
      >
        {data.msg}
      </MUIAlert>
    </Snackbar>
  );
});

export default Alert;
