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
  alert,
}) => {
  const _onOpen = async (setValues) => {
    try {
      const { data: response } = await api({
        url,
        requestType: "GET",
        params: { type: "basic" },
      });
      setValues(response.data);
    } catch (error) {
      const _response = error.response?.data;
      alert({
        msg: _response?.data?.error || "Request failed",
        severity: "error",
      });
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
        alert,
      }}
    />
  );
};

export default Update;
