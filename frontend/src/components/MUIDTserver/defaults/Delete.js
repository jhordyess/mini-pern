import React from "react";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteIcon from "@mui/icons-material/Delete";
//
import Toolbar from "./../Toolbar";
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
}) => {
  const onSubmit = async () => {
    try {
      //TODO show message info
      //const { data: response } =
      await api({
        url,
        params: ids,
        requestType: "DELETE",
      });
      // console.log("response", response);
      if (afterSubmit) await afterSubmit();
    } catch (error) {
      console.log("error", error);
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
        //TODO translate
        <DialogContentText>
          Esta apunto de eliminar {ids.length} registro
          {ids.length > 1 ? "s" : ""}. Debe confirmar esta accion.
        </DialogContentText>
      }
    />
  );
};

export default Delete;
