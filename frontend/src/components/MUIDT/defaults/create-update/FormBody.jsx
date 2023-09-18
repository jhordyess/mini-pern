import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
// TODO Definir el tipo de datos para formData, [{label:,name:,default:,options:}]
// TODO Permitir persistencia
// TODO Preparar otros tipos de datos

const FormBody = ({ formData, values, setValues }) => {
  const handleChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value
    })
  }
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
  )
}

FormBody.propTypes = {
  formData: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  setValues: PropTypes.func.isRequired
}

export default FormBody
