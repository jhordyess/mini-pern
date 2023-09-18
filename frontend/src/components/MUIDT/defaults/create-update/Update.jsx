import PropTypes from 'prop-types'
import EditIcon from '@mui/icons-material/Edit'
//
import api from '@/utils/api'
import Create from './Create'

const Update = ({
  url,
  formData = [],
  title = 'Update',
  toolLabel = 'Update',
  okButtonLabel = 'Update',
  cancelButtonLabel = 'Cancel',
  afterSubmit,
  onClose,
  alert
}) => {
  const _onOpen = async setValues => {
    try {
      const { data: response } = await api({
        url,
        requestType: 'GET',
        params: { type: 'basic' }
      })
      setValues(response.data)
    } catch (error) {
      const _response = error.response?.data
      alert({
        msg: _response?.data?.error || 'Request failed',
        severity: 'error'
      })
    }
  }

  return (
    <Create
      {...{
        url,
        requestType: 'PUT',
        formData,
        title,
        toolLabel,
        Icon: EditIcon,
        okButtonLabel,
        cancelButtonLabel,
        afterSubmit,
        onOpen: _onOpen,
        onClose,
        alert
      }}
    />
  )
}

Update.propTypes = {
  url: PropTypes.string.isRequired,
  formData: PropTypes.array.isRequired,
  title: PropTypes.string,
  toolLabel: PropTypes.string,
  okButtonLabel: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  afterSubmit: PropTypes.func,
  onClose: PropTypes.func,
  alert: PropTypes.func.isRequired
}

export default Update
