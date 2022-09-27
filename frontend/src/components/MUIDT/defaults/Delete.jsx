import React from "react";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteIcon from "@mui/icons-material/Delete";
//
import Toolbar from "../Toolbar";
import api from "@utils/Api";

const Delete = ({
  url,
  ids = [],
  title = "Delete",
  toolLabel = "Delete",
  okButtonLabel = "Continue",
  cancelButtonLabel = "Cancel",
  afterSubmit,
  onClose,
  alert,
}) => {
  const onSubmit = async () => {
    try {
      const { data: response } = await api({
        url,
        params: { ids },
        requestType: "DELETE",
      });
      alert({
        msg: response?.data?.message || "Deleted",
        severity: "success",
      });
      if (afterSubmit) await afterSubmit();
    } catch (error) {
      const _response = error.response?.data;
      alert({
        msg: _response?.data?.error || "Request failed",
        severity: "error",
      });
    }
  };

  return (
    <Toolbar
      {...{
        title,
        toolLabel,
        Icon: DeleteIcon,
        okButtonLabel,
        cancelButtonLabel,
        onSubmit,
        onClose,
      }}
      FormBody={
        <DialogContentText>
          Are you sure to delete {ids.length} item
          {ids.length > 1 ? "s" : ""}? Please confirm.
        </DialogContentText>
      }
    />
  );
};

export default Delete;
