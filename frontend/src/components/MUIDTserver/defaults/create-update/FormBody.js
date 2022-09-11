import React from "react";
import TextField from "@mui/material/TextField";
// TODO Definir el tipo de datos para formData, [{label:,name:,default:,options:}]
// TODO Permitir persistencia
// TODO Preparar otros tipos de datos

const FormBody = ({ formData, values, setValues }) => {
  const handleChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };
  return (
    <>
      {formData
        ? formData.map((item, index) => (
            <TextField
              {...item.options}
              key={index}
              label={item.label}
              name={item.name}
              value={values[item.name]}
              onChange={handleChange}
            />
          ))
        : null}
    </>
  );
};

export default FormBody;
