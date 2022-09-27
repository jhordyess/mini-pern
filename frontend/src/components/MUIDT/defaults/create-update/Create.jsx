import React from "react";
import AddIcon from "@mui/icons-material/Add";
//
import Toolbar from "../../Toolbar";
import FormBody from "./FormBody";
import api from "@utils/Api";

const _default = (formData = []) => {
  let obj = {};
  formData.forEach((value) => {
    obj[value.name] = value.default;
  });
  return obj;
};

const Create = ({
  url,
  requestType = "POST",
  formData = [],
  title = "New",
  toolLabel = "New",
  Icon = AddIcon,
  okButtonLabel = "Save",
  cancelButtonLabel = "Cancel",
  afterSubmit,
  onOpen = null,
  onClose = null,
  alert,
}) => {
  const defaults = _default(formData);

  const [values, setValues] = React.useState(defaults);

  const onSubmit = async () => {
    try {
      const { data: response } = await api({
        url,
        params: values,
        requestType,
      });
      alert({
        msg: response?.data?.message,
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

  const _onOpen = async () => {
    if (onOpen) await onOpen(setValues);
  };

  const _onClose = async () => {
    setValues(defaults);
    if (onClose) await onClose();
  };

  return (
    <Toolbar
      {...{
        title,
        toolLabel,
        Icon,
        okButtonLabel,
        cancelButtonLabel,
        onSubmit,
        onOpen: _onOpen,
        onClose: _onClose,
      }}
      FormBody={
        <FormBody formData={formData} values={values} setValues={setValues} />
      }
    />
  );
};

export default Create;
