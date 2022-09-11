import React from "react";
import EditIcon from "@mui/icons-material/Edit";
//
import api from "@utils/Api";
import Create from "./Create";

const Update = ({
  url,
  formData = [],
  title = "Update",
  toolLabel = "Update",
  okButtonLabel = "Update",
  cancelButtonLabel = "Cancel",
  afterSubmit,
  onClose,
}) => {
  const _onOpen = async (setValues) => {
    try {
      //TODO show info
      const { data: response } = await api({
        url,
        requestType: "GET",
      });
      setValues(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Create
      {...{
        url,
        requestType: "PUT",
        formData,
        title,
        toolLabel,
        Icon: EditIcon,
        okButtonLabel,
        cancelButtonLabel,
        afterSubmit,
        onOpen: _onOpen,
        onClose,
      }}
    />
  );
};

export default Update;
