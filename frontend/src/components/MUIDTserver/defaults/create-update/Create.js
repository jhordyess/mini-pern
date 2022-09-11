import React from "react";
import AddIcon from "@mui/icons-material/Add";
//
import Toolbar from "./../../Toolbar";
import FormBody from "./FormBody";
import api from "@utils/Api";

const def = (formData = []) => {
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
}) => {
  //TODO review defaults and formData!
  const defaults = def(formData);

  const [values, setValues] = React.useState(defaults);

  const onSubmit = async () => {
    try {
      //TODO show info
      //const { data: response } =
      await api({
        url,
        params: values,
        requestType,
      });
      // console.log("response", response);
      if (afterSubmit) await afterSubmit();
    } catch (error) {
      console.log("error", error);
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
